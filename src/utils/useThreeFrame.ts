import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export interface FrameState {
  clock: THREE.Clock;
  delta: number;
  elapsedTime: number;
  isMobile: boolean;
  isSoftwareGl: boolean;
}

export type UseFrameCallback = (state: FrameState) => void;

/**
 * Detects whether the current WebGL context is backed by a software rasterizer
 * (SwiftShader, llvmpipe, softpipe, WARP) from the GPU renderer string.
 */
export function detectSoftwareWebGL(renderer?: THREE.WebGLRenderer | null): boolean {
  try {
    if (renderer) {
      const gl = renderer.getContext();
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param) || '');
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    }

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return true;
    const ext = gl.getExtension('WEBGL_debug_renderer_info');
    const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
    const gpu = String(gl.getParameter(param) || '');
    gl.getExtension('WEBGL_lose_context')?.loseContext();
    return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
  } catch {
    return false;
  }
}

/**
 * Recursively disposes all geometries, materials, and textures inside a Three.js
 * Object3D / Scene hierarchy to prevent GPU memory leaks on mobile and desktop devices.
 */
export function disposeSceneGraph(root: THREE.Object3D | null | undefined): void {
  if (!root) return;

  const disposeMaterial = (mat: THREE.Material) => {
    const anyMat = mat as unknown as Record<string, unknown>;
    const textureKeys = [
      'map',
      'envMap',
      'lightMap',
      'aoMap',
      'emissiveMap',
      'bumpMap',
      'normalMap',
      'displacementMap',
      'roughnessMap',
      'metalnessMap',
      'alphaMap',
      'clearcoatMap',
      'clearcoatNormalMap',
      'clearcoatRoughnessMap',
    ];
    for (const key of textureKeys) {
      const tex = anyMat[key];
      if (tex && typeof (tex as THREE.Texture).dispose === 'function') {
        (tex as THREE.Texture).dispose();
      }
    }
    mat.dispose();
  };

  root.traverse((obj) => {
    const meshOrLine = obj as THREE.Mesh | THREE.LineSegments | THREE.Points;
    if (meshOrLine.geometry && typeof meshOrLine.geometry.dispose === 'function') {
      meshOrLine.geometry.dispose();
    }
    if (meshOrLine.material) {
      if (Array.isArray(meshOrLine.material)) {
        meshOrLine.material.forEach(disposeMaterial);
      } else {
        disposeMaterial(meshOrLine.material);
      }
    }
  });

  root.clear();
}

/**
 * Performant `useFrame` hook for imperative Three.js scenes in React.
 * Features:
 * - Zero React re-render overhead (stores callback in a mutable ref).
 * - Clamped frame delta (`<= 0.05s`) via `THREE.Clock` so tab switches never cause physics jumps.
 * - Automatic pause when tab is hidden (`visibilitychange`) or when canvas scrolls off-screen (`IntersectionObserver`) to save mobile battery & GPU budget.
 * - Hardware GPU `requestAnimationFrame` + Software-WebGL `gl.fenceSync` `afterDraw` pacing.
 */
export function useFrame(
  callback: UseFrameCallback,
  options: {
    containerRef: React.RefObject<HTMLElement | null>;
    rendererRef: React.RefObject<THREE.WebGLRenderer | null>;
    isSoftwareGlRef: React.RefObject<boolean>;
    enabled?: boolean;
  }
): void {
  const savedCallback = useRef<UseFrameCallback>(callback);
  savedCallback.current = callback;

  const { containerRef, rendererRef, isSoftwareGlRef, enabled = true } = options;

  useEffect(() => {
    if (!enabled) return;

    let stopped = false;
    let rafId = 0;
    let timerId = 0;
    let isIntersecting = true;
    let isPageVisible = typeof document !== 'undefined' ? !document.hidden : true;

    const clock = new THREE.Clock();
    const frameState: FrameState = {
      clock,
      delta: 0.016,
      elapsedTime: 0,
      isMobile: typeof window !== 'undefined' ? window.innerWidth < 768 : false,
      isSoftwareGl: Boolean(isSoftwareGlRef.current),
    };

    const afterDraw = (cb: () => void) => {
      const renderer = rendererRef.current;
      const gl = renderer?.getContext() as WebGL2RenderingContext | undefined;
      if (gl && typeof gl.fenceSync === 'function') {
        const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
        gl.flush();
        const poll = () => {
          if (stopped) {
            if (sync) gl.deleteSync(sync);
            return;
          }
          const state = sync && gl.getSyncParameter(sync, gl.SYNC_STATUS);
          if (state === gl.UNSIGNALED) {
            timerId = window.setTimeout(poll, 5);
          } else {
            if (sync) gl.deleteSync(sync);
            timerId = window.setTimeout(cb, 80);
          }
        };
        timerId = window.setTimeout(poll, 5);
      } else {
        timerId = window.setTimeout(() => {
          if (!stopped) rafId = requestAnimationFrame(cb);
        }, 80);
      }
    };

    const scheduleNext = () => {
      if (stopped || !isIntersecting || !isPageVisible) return;
      if (isSoftwareGlRef.current) {
        afterDraw(tick);
      } else {
        rafId = requestAnimationFrame(tick);
      }
    };

    const tick = () => {
      if (stopped || !isIntersecting || !isPageVisible) return;

      const rawDelta = clock.getDelta();
      frameState.delta = Math.max(0.001, Math.min(rawDelta, 0.05));
      frameState.elapsedTime = clock.elapsedTime;
      frameState.isMobile =
        (containerRef.current?.clientWidth || window.innerWidth) < 768;
      frameState.isSoftwareGl = Boolean(isSoftwareGlRef.current);

      savedCallback.current(frameState);

      scheduleNext();
    };

    // Pause clock & loop when page tab is hidden (crucial on mobile browsers)
    const handleVisibilityChange = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) {
        clock.getDelta(); // discard stale delta accumulated while hidden
        cancelAnimationFrame(rafId);
        clearTimeout(timerId);
        rafId = requestAnimationFrame(tick);
      } else {
        cancelAnimationFrame(rafId);
        clearTimeout(timerId);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Pause loop when 3D Hero is scrolled out of the viewport on mobile/desktop
    let observer: IntersectionObserver | null = null;
    if (typeof IntersectionObserver !== 'undefined' && containerRef.current) {
      observer = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          if (!entry) return;
          const wasIntersecting = isIntersecting;
          isIntersecting = entry.isIntersecting;
          if (isIntersecting && !wasIntersecting && isPageVisible) {
            clock.getDelta();
            cancelAnimationFrame(rafId);
            clearTimeout(timerId);
            rafId = requestAnimationFrame(tick);
          }
        },
        { threshold: 0.01 }
      );
      observer.observe(containerRef.current);
    }

    rafId = requestAnimationFrame(tick);

    return () => {
      stopped = true;
      cancelAnimationFrame(rafId);
      clearTimeout(timerId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      observer?.disconnect();
    };
  }, [containerRef, rendererRef, isSoftwareGlRef, enabled]);
}
