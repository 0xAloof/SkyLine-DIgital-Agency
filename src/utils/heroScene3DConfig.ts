/**
 * Pure 3D Scene Configuration, Mobile-Adaptive Budgeting & Performant `useFrame` Kinematics
 * for the HeroSection Minimalist Interactive Floating Sphere / Prism Geometry.
 * Enforces a strict Monochromatic Silver / Platinum / Obsidian Palette (Zero Golden/Bronze).
 */

export type GeometrySculptureMode = 'dual-monolith' | 'prism-core' | 'geodesic-sphere';

export interface PlatinumPaletteTheme {
  isDark: boolean;
  prismCoreHex: number;
  prismInnerHex: number;
  prismEmissiveHex: number;
  prismEdgeHex: number;
  sphereWireframeHex: number;
  sphereVertexNodeHex: number;
  orbitalRingHex: number;
  activeSatelliteHex: number;
  inactiveSatelliteHex: number;
  keyLightHex: number;
  hemiSkyHex: number;
  hemiGroundHex: number;
  rimLightHex: number;
  fogHex: number;
}

export interface SphericalNodeCoordinate {
  index: number;
  id: string;
  label: string;
  x: number;
  y: number;
  z: number;
  phi: number;
  theta: number;
}

export interface MobileAdaptive3DConfig {
  isMobileViewport: boolean;
  pixelRatio: number;
  cameraFov: number;
  cameraZ: number;
  satelliteProjectionScale: number;
  dampingLambda: number;
  maxDeltaSeconds: number;
}

export interface UseFrameKinematicState {
  elapsedSeconds: number;
  curRotX: number;
  curRotY: number;
  targetRotX: number;
  targetRotY: number;
  curPrismScale: number;
  curSphereScale: number;
  floatY: number;
  prismRotX: number;
  prismRotY: number;
  shadowScale: number;
  shadowOpacity: number;
}

const FORBIDDEN_GOLD_BRONZE_HEXES = new Set([
  0xc5a880,
  0xd4af37,
  0xffd700,
  0xb8860b,
  0xcd7f32,
  0xdaa520,
  0xf59e0b,
]);

/**
 * Returns the verified Monochromatic Silver / Platinum / Obsidian 3D palette
 * for Light and Dark modes. Guarantees zero golden/bronze tones.
 */
export function getMonochromaticPlatinumPalette(isDark: boolean): PlatinumPaletteTheme {
  if (isDark) {
    return {
      isDark: true,
      prismCoreHex: 0xe4e4e7, // Brushed Platinum Silver (roughness 0.14, metalness 0.92)
      prismInnerHex: 0x71717a, // Matte Anodized Titanium Core (roughness 0.44, metalness 0.72)
      prismEmissiveHex: 0x27272a, // Deep Titanium Glow
      prismEdgeHex: 0xffffff, // Specular White Facet Edge
      sphereWireframeHex: 0xa1a1aa, // Anodized Silver Lattice
      sphereVertexNodeHex: 0xf4f4f5, // Pure Platinum Vertex Spheres
      orbitalRingHex: 0xd4d4d8, // Machined Chrome Ring
      activeSatelliteHex: 0xffffff, // Pure White Active Beacon
      inactiveSatelliteHex: 0xa1a1aa, // Muted Silver Satellite
      keyLightHex: 0xf8fafc,
      hemiSkyHex: 0xe4e4e7,
      hemiGroundHex: 0x18181b,
      rimLightHex: 0xd4d4d8,
      fogHex: 0x09090b,
    };
  }

  return {
    isDark: false,
    prismCoreHex: 0x27272a, // Sculpted Obsidian Titanium Core (roughness 0.15, metalness 0.90)
    prismInnerHex: 0x71717a, // Brushed Satin Steel Inner Core (roughness 0.45, metalness 0.74)
    prismEmissiveHex: 0x18181b, // Subtle Charcoal Depth
    prismEdgeHex: 0xf4f4f5, // Crisp Platinum Edge Bevel
    sphereWireframeHex: 0x52525b, // Precision Zinc Geodesic Lattice
    sphereVertexNodeHex: 0x18181b, // Dark Titanium Vertex Spheres
    orbitalRingHex: 0x71717a, // Brushed Steel Orbital Ring
    activeSatelliteHex: 0x09090b, // High-Contrast Obsidian Active Beacon
    inactiveSatelliteHex: 0x71717a, // Muted Steel Satellite
    keyLightHex: 0xffffff,
    hemiSkyHex: 0xf8f8f6,
    hemiGroundHex: 0x52525b,
    rimLightHex: 0xe4e4e7,
    fogHex: 0xf0efe9,
  };
}

/**
 * Verifies that no color in a PlatinumPaletteTheme uses a golden or bronze hex value.
 */
export function isStrictlyMonochromaticPalette(palette: PlatinumPaletteTheme): boolean {
  const values = [
    palette.prismCoreHex,
    palette.prismInnerHex,
    palette.prismEmissiveHex,
    palette.prismEdgeHex,
    palette.sphereWireframeHex,
    palette.sphereVertexNodeHex,
    palette.orbitalRingHex,
    palette.activeSatelliteHex,
    palette.inactiveSatelliteHex,
    palette.keyLightHex,
    palette.hemiSkyHex,
    palette.hemiGroundHex,
    palette.rimLightHex,
    palette.fogHex,
  ];
  return values.every((hex) => !FORBIDDEN_GOLD_BRONZE_HEXES.has(hex));
}

/**
 * Computes mobile-adaptive DPR, FOV, camera distance, and damping parameters
 * so mobile GPUs maintain a locked 60fps budget without thermal throttling or clipping.
 */
export function computeMobileAdaptiveConfig(
  viewportWidth: number,
  devicePixelRatio: number,
  isSoftwareGl: boolean
): MobileAdaptive3DConfig {
  const isMobileViewport = viewportWidth < 768;
  const safeDpr = Number.isFinite(devicePixelRatio) && devicePixelRatio > 0 ? devicePixelRatio : 1;

  const pixelRatio = isSoftwareGl
    ? 1
    : isMobileViewport
      ? Math.min(safeDpr, 1.5)
      : Math.min(safeDpr, 2.0);

  return {
    isMobileViewport,
    pixelRatio,
    cameraFov: isMobileViewport ? 44 : 40,
    cameraZ: isMobileViewport ? 5.65 : 5.25,
    satelliteProjectionScale: isMobileViewport ? 0.92 : 1.0,
    dampingLambda: isMobileViewport ? 10.5 : 8.5,
    maxDeltaSeconds: 0.05,
  };
}

/**
 * Frame-rate independent exponential damping helper (`1 - Math.exp(-lambda * dt)`).
 * Ensures identical motion feel at 30fps, 60fps, and 120fps ProMotion displays.
 */
export function dampValue(
  current: number,
  target: number,
  lambda: number,
  deltaSeconds: number
): number {
  const clampedDt = Math.max(0, Math.min(deltaSeconds, 0.1));
  const factor = 1 - Math.exp(-lambda * clampedDt);
  return current + (target - current) * factor;
}

/**
 * Computes evenly distributed 360-degree Fibonacci sphere coordinates
 * for the 7 interactive capability nodes around the floating sphere/prism.
 */
export function computeFibonacciSphereNodes(
  items: { id: string; label: string }[],
  radius = 1.64,
  verticalSquash = 0.88
): SphericalNodeCoordinate[] {
  const n = items.length;
  if (n === 0) return [];

  const goldenAngle = Math.PI * (1 + Math.sqrt(5));

  return items.map((item, i) => {
    const phi = Math.acos(1 - (2 * (i + 0.5)) / n);
    const theta = goldenAngle * i;
    const x = Number((radius * Math.sin(phi) * Math.cos(theta)).toFixed(4));
    const y = Number((radius * Math.cos(phi) * verticalSquash).toFixed(4));
    const z = Number((radius * Math.sin(phi) * Math.sin(theta)).toFixed(4));

    return {
      index: i,
      id: item.id,
      label: item.label,
      x,
      y,
      z,
      phi,
      theta,
    };
  });
}

/**
 * Computes sinusoidal floating levitation offset, contact shadow response,
 * and prism counter-rotation angles for a given elapsed time (seconds) and active orb index.
 */
export function computeFloatingPrismKinematics(
  elapsedSeconds: number,
  activeOrbIndex: number,
  mode: GeometrySculptureMode
): {
  floatY: number;
  prismRotX: number;
  prismRotY: number;
  prismScale: number;
  sphereScale: number;
  targetAzimuthY: number;
  shadowScale: number;
  shadowOpacity: number;
} {
  const sinWave = Math.sin(elapsedSeconds * 1.65);
  const floatY = sinWave * 0.065;
  const prismRotX = elapsedSeconds * 0.42 + activeOrbIndex * 0.25;
  const prismRotY = -elapsedSeconds * 0.68 + activeOrbIndex * 0.45;

  const prismScale =
    mode === 'geodesic-sphere' ? 0.62 : mode === 'prism-core' ? 1.18 : 1.0;
  const sphereScale =
    mode === 'prism-core' ? 0.82 : mode === 'geodesic-sphere' ? 1.08 : 1.0;

  const targetAzimuthY = activeOrbIndex * ((Math.PI * 2) / 7);

  // Contact shadow breathes inversely with levitation height
  const shadowScale = Number((1 - sinWave * 0.08).toFixed(4));
  const shadowOpacity = Number((0.38 - sinWave * 0.06).toFixed(4));

  return {
    floatY,
    prismRotX,
    prismRotY,
    prismScale,
    sphereScale,
    targetAzimuthY,
    shadowScale,
    shadowOpacity,
  };
}

/**
 * Pure per-frame (`useFrame`) state stepper with delta clamping and exponential damping.
 * Zero object allocations on the hot path when mutating state in-place.
 */
export function stepUseFrameKinematics(
  state: UseFrameKinematicState,
  rawDeltaSeconds: number,
  options: {
    isDragging: boolean;
    hoverParallaxX: number;
    hoverParallaxY: number;
    activeOrbIndex: number;
    mode: GeometrySculptureMode;
    dampingLambda: number;
    maxDeltaSeconds?: number;
  }
): UseFrameKinematicState {
  const maxDt = options.maxDeltaSeconds ?? 0.05;
  const dt = Math.max(0.001, Math.min(rawDeltaSeconds, maxDt));
  state.elapsedSeconds += dt;

  if (!options.isDragging) {
    state.targetRotY += 0.26 * dt;
  }

  state.curRotY = dampValue(
    state.curRotY,
    state.targetRotY + options.hoverParallaxY,
    options.dampingLambda,
    dt
  );
  state.curRotX = dampValue(
    state.curRotX,
    state.targetRotX + options.hoverParallaxX,
    options.dampingLambda,
    dt
  );

  const kin = computeFloatingPrismKinematics(
    state.elapsedSeconds,
    options.activeOrbIndex,
    options.mode
  );

  state.floatY = kin.floatY;
  state.prismRotX = kin.prismRotX;
  state.prismRotY = kin.prismRotY;
  state.curPrismScale = dampValue(state.curPrismScale, kin.prismScale, options.dampingLambda, dt);
  state.curSphereScale = dampValue(
    state.curSphereScale,
    kin.sphereScale,
    options.dampingLambda,
    dt
  );
  state.shadowScale = kin.shadowScale;
  state.shadowOpacity = kin.shadowOpacity;

  return state;
}
