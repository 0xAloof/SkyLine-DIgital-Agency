import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Activity,
  ArrowRight,
  ArrowUpRight,
  Award,
  Briefcase,
  CheckCircle2,
  Cloud,
  Code2,
  Compass,
  Cpu,
  FolderGit2,
  Globe,
  GraduationCap,
  Layers,
  MapPin,
  Megaphone,
  Phone,
  PhoneCall,
  Search,
  ShieldCheck,
  Sparkles,
  Terminal,
  Workflow,
  X,
  Zap,
} from 'lucide-react';
import {
  HERO_ORBS,
  FOUNDER_PROFILES,
  TECH_STACK_MARQUEE_ROW_1,
  TECH_STACK_MARQUEE_ROW_2,
  BENTO_SOLUTIONS,
  SHOWCASE_PROJECTS,
  SKYLINE_WHATSAPP_NUMBER,
  SKYLINE_SACHIN_WHATSAPP_NUMBER,
  SKYLINE_CALL_NUMBER,
  SKYLINE_PRIMARY_PHONE_DISPLAY,
  SKYLINE_SACHIN_PHONE_DISPLAY,
  SKYLINE_LOCATION,
  BentoSolutionCard,
  ShowcaseProject,
  HeroOrbNode,
  InteractiveArtifactId,
} from '../data/agencyData';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import {
  WhatsAppBrandBadge,
  GmailBrandIcon,
  TechStackBrandIcon,
} from './BrandIcons';
import { InteractiveArtifactModal } from './InteractiveArtifactModal';
import {
  GeometrySculptureMode,
  getMonochromaticPlatinumPalette,
  computeFibonacciSphereNodes,
  computeMobileAdaptiveConfig,
  stepUseFrameKinematics,
  UseFrameKinematicState,
} from '../utils/heroScene3DConfig';
import {
  useFrame,
  detectSoftwareWebGL,
  disposeSceneGraph,
} from '../utils/useThreeFrame';

export type HeroPageView = 'home' | 'work' | 'who-we-are';

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
  projects?: ShowcaseProject[];
  pageView?: HeroPageView;
}

const getOrbLucideIcon = (orbId: string, className = 'w-3.5 h-3.5') => {
  switch (orbId) {
    case 'ai':
      return <Cpu className={className} />;
    case 'ads':
      return <Megaphone className={className} />;
    case 'saas':
      return <Cloud className={className} />;
    case 'web':
      return <Globe className={className} />;
    case 'seo':
      return <Search className={className} />;
    case 'crm':
      return <Workflow className={className} />;
    case 'local':
    default:
      return <MapPin className={className} />;
  }
};

const SCULPTURE_MODES: { id: GeometrySculptureMode; label: string }[] = [
  { id: 'dual-monolith', label: 'DUAL MONOLITH' },
  { id: 'prism-core', label: 'PRISM CORE' },
  { id: 'geodesic-sphere', label: 'GEODESIC SPHERE' },
];

// Pre-allocated scratch Vector3 at module scope (Zero GC inside useFrame loop)
const _scratchProjVec = new THREE.Vector3();

/**
 * Generates a 100% procedural radial contact shadow CanvasTexture with SRGBColorSpace.
 */
function createContactShadowTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 128;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');
  if (ctx) {
    const grad = ctx.createRadialGradient(64, 64, 6, 64, 64, 60);
    grad.addColorStop(0, 'rgba(9, 9, 11, 0.52)');
    grad.addColorStop(0.55, 'rgba(39, 39, 42, 0.22)');
    grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);
  }
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

interface SceneRefsBundle {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  rootGroup: THREE.Group;
  prismGroup: THREE.Group;
  sphereGroup: THREE.Group;
  outerPrismMat: THREE.MeshStandardMaterial;
  innerPrismMat: THREE.MeshStandardMaterial;
  prismEdgesMat: THREE.LineBasicMaterial;
  collarMat: THREE.MeshStandardMaterial;
  wireframeMat: THREE.LineBasicMaterial;
  outerWireframe: THREE.LineSegments;
  smallNodeMat: THREE.MeshStandardMaterial;
  ringMats: THREE.MeshBasicMaterial[];
  ring1: THREE.Mesh;
  ring2: THREE.Mesh;
  ring3: THREE.Mesh;
  anchorMeshes: THREE.Mesh[];
  contactShadowMesh: THREE.Mesh;
  contactShadowMat: THREE.MeshBasicMaterial;
  hemiLight: THREE.HemisphereLight;
  keyLight: THREE.DirectionalLight;
}

/**
 * Interactive 3D Floating Sphere & Crystalline Prism Sculpture
 * Refactored to use a performant `useFrame` loop (`src/utils/useThreeFrame.ts`) with:
 * - Frame-rate independent exponential damping & 50ms delta clamping
 * - Mobile-adaptive DPR & FOV budgeting + ResizeObserver responsiveness
 * - Automatic visibility & IntersectionObserver pause for mobile battery/thermal efficiency
 * - Composite 9-part procedural prism/sphere model + RoomEnvironment + grounded contact shadow
 * - Recursive GPU resource disposal (`disposeSceneGraph`)
 */
const HeroGeodesicSphere3D: React.FC<{
  activeOrb: HeroOrbNode;
  activeOrbIndex: number;
  onSelectOrb: (idx: number) => void;
}> = ({ activeOrb, activeOrbIndex, onSelectOrb }) => {
  const [sculptureMode, setSculptureMode] = useState<GeometrySculptureMode>('dual-monolith');
  const mountRef = useRef<HTMLDivElement | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const isSoftwareGlRef = useRef<boolean>(false);
  const sceneBundleRef = useRef<SceneRefsBundle | null>(null);
  const orbElsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const activeIdxRef = useRef<number>(activeOrbIndex);
  const modeRef = useRef<GeometrySculptureMode>(sculptureMode);
  activeIdxRef.current = activeOrbIndex;
  modeRef.current = sculptureMode;

  const interactionRef = useRef({
    isDragging: false,
    prevX: 0,
    prevY: 0,
    hoverParallaxX: 0,
    hoverParallaxY: 0,
  });

  const kinematicStateRef = useRef<UseFrameKinematicState>({
    elapsedSeconds: 0,
    curRotX: 0.18,
    curRotY: 0.42,
    targetRotX: 0.18,
    targetRotY: 0.42,
    curPrismScale: 1.0,
    curSphereScale: 1.0,
    floatY: 0,
    prismRotX: 0,
    prismRotY: 0,
    shadowScale: 1.0,
    shadowOpacity: 0.38,
  });

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const isSoftwareGl = detectSoftwareWebGL();
    isSoftwareGlRef.current = isSoftwareGl;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      return;
    }

    rendererRef.current = renderer;
    const width = container.clientWidth || 520;
    const height = container.clientHeight || 285;
    const mobileCfg = computeMobileAdaptiveConfig(
      width,
      window.devicePixelRatio || 1,
      isSoftwareGl
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;
    renderer.setPixelRatio(mobileCfg.pixelRatio);
    renderer.setSize(width, height);

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x09090b, 0.035);

    const camera = new THREE.PerspectiveCamera(
      mobileCfg.cameraFov,
      width / height,
      0.1,
      100
    );
    camera.position.set(0, 0, mobileCfg.cameraZ);

    // Mandatory Studio Environment Reflection (RoomEnvironment + PMREMGenerator)
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    const envTarget = pmremGenerator.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envTarget.texture;
    pmremGenerator.dispose();

    // Studio Warm/Cool Monochromatic Lighting Rig (HemisphereLight + Directional Key + Rim)
    const hemiLight = new THREE.HemisphereLight(0xf8f8f6, 0x27272a, 1.15);
    scene.add(hemiLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(4.5, 5.5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.PointLight(0xd4d4d8, 2.5, 16);
    rimLight.position.set(-4.5, -3.2, 3.5);
    scene.add(rimLight);

    const rootGroup = new THREE.Group();
    scene.add(rootGroup);

    // =========================================================================
    // 1. COMPOSITE FLOATING CRYSTALLINE PRISM (Varied Roughness/Metalness >= 0.25)
    // =========================================================================
    const prismGroup = new THREE.Group();
    rootGroup.add(prismGroup);

    // Part 1: Primary Sculpted Brushed Platinum Octahedron (roughness 0.14, metalness 0.92)
    const outerPrismGeo = new THREE.OctahedronGeometry(0.86, 0);
    const outerPrismMat = new THREE.MeshStandardMaterial({
      color: 0xe4e4e7,
      emissive: 0x18181b,
      emissiveIntensity: 0.28,
      metalness: 0.92,
      roughness: 0.14,
      flatShading: true,
    });
    const outerPrismMesh = new THREE.Mesh(outerPrismGeo, outerPrismMat);
    prismGroup.add(outerPrismMesh);

    // Part 2: Secondary Counter-Faceted Satin Titanium Core (roughness 0.44 — delta 0.30 >= 0.25)
    const innerPrismGeo = new THREE.IcosahedronGeometry(0.68, 0);
    const innerPrismMat = new THREE.MeshStandardMaterial({
      color: 0x71717a,
      metalness: 0.74,
      roughness: 0.44,
      flatShading: true,
      transparent: true,
      opacity: 0.9,
    });
    const innerPrismMesh = new THREE.Mesh(innerPrismGeo, innerPrismMat);
    innerPrismMesh.rotation.set(Math.PI / 4, Math.PI / 4, 0);
    prismGroup.add(innerPrismMesh);

    // Part 3: Equatorial Machined Collar Ring (Secondary Architectural Detail)
    const collarGeo = new THREE.TorusGeometry(0.92, 0.018, 12, isSoftwareGl ? 36 : 64);
    const collarMat = new THREE.MeshStandardMaterial({
      color: 0xd4d4d8,
      metalness: 0.95,
      roughness: 0.12,
    });
    const collarMesh = new THREE.Mesh(collarGeo, collarMat);
    collarMesh.rotation.x = Math.PI / 2;
    prismGroup.add(collarMesh);

    // Part 4: Specular White Facet Edge Bevels
    const prismEdgesGeo = new THREE.EdgesGeometry(outerPrismGeo);
    const prismEdgesMat = new THREE.LineBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.84,
    });
    const prismEdgeLines = new THREE.LineSegments(prismEdgesGeo, prismEdgesMat);
    prismEdgeLines.scale.setScalar(1.015);
    prismGroup.add(prismEdgeLines);

    // =========================================================================
    // 2. GEODESIC SPHERE LATTICE + 360° INSTANCED VERTEX NODES + GYROSCOPIC RINGS
    // =========================================================================
    const sphereGroup = new THREE.Group();
    rootGroup.add(sphereGroup);

    const geoDetail = isSoftwareGl ? 1 : 2;
    const geodesicGeo = new THREE.IcosahedronGeometry(1.52, geoDetail);
    const wireframeGeo = new THREE.WireframeGeometry(geodesicGeo);
    const wireframeMat = new THREE.LineBasicMaterial({
      color: 0xa1a1aa,
      transparent: true,
      opacity: 0.48,
    });
    const geodesicWireframe = new THREE.LineSegments(wireframeGeo, wireframeMat);
    sphereGroup.add(geodesicWireframe);

    const outerGeo = new THREE.IcosahedronGeometry(1.78, 1);
    const outerWireGeo = new THREE.WireframeGeometry(outerGeo);
    const outerWireMat = new THREE.LineBasicMaterial({
      color: 0xd4d4d8,
      transparent: true,
      opacity: 0.22,
    });
    const outerWireframe = new THREE.LineSegments(outerWireGeo, outerWireMat);
    sphereGroup.add(outerWireframe);

    // Part 7: 360° Instanced Spherical Vertex Nodes with Frustum Culling Bounding Sphere
    const posAttr = geodesicGeo.getAttribute('position');
    const uniqueVertices: THREE.Vector3[] = [];
    const seen = new Set<string>();
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);
      const key = `${vx.toFixed(2)},${vy.toFixed(2)},${vz.toFixed(2)}`;
      if (!seen.has(key)) {
        seen.add(key);
        uniqueVertices.push(new THREE.Vector3(vx, vy, vz));
      }
    }

    const smallNodeGeo = new THREE.SphereGeometry(0.035, 8, 8);
    const smallNodeMat = new THREE.MeshStandardMaterial({
      color: 0xf4f4f5,
      emissive: 0x52525b,
      emissiveIntensity: 0.55,
      metalness: 0.85,
      roughness: 0.18,
    });
    const instancedNodes = new THREE.InstancedMesh(
      smallNodeGeo,
      smallNodeMat,
      uniqueVertices.length
    );
    const dummy = new THREE.Object3D();
    uniqueVertices.forEach((v, idx) => {
      dummy.position.copy(v);
      dummy.scale.setScalar(0.9 + (idx % 3) * 0.1);
      dummy.updateMatrix();
      instancedNodes.setMatrixAt(idx, dummy.matrix);
    });
    instancedNodes.instanceMatrix.needsUpdate = true;
    instancedNodes.computeBoundingSphere();
    sphereGroup.add(instancedNodes);

    // Three Inclined Gyroscopic Platinum Orbital Rings
    const ringGroup = new THREE.Group();
    sphereGroup.add(ringGroup);

    const ringMats: THREE.MeshBasicMaterial[] = [];
    const createOrbitRing = (radius: number, rx: number, ry: number, opacity: number) => {
      const rGeo = new THREE.TorusGeometry(radius, 0.0085, 8, isSoftwareGl ? 48 : 88);
      const rMat = new THREE.MeshBasicMaterial({
        color: 0xd4d4d8,
        transparent: true,
        opacity,
      });
      ringMats.push(rMat);
      const rMesh = new THREE.Mesh(rGeo, rMat);
      rMesh.rotation.set(rx, ry, 0);
      return rMesh;
    };

    const ring1 = createOrbitRing(1.94, Math.PI / 2.6, 0.35, 0.42);
    const ring2 = createOrbitRing(2.08, -Math.PI / 3.1, -0.45, 0.28);
    const ring3 = createOrbitRing(1.26, Math.PI / 4, 0.8, 0.36);
    ringGroup.add(ring1, ring2, ring3);

    // =========================================================================
    // 3. 7 CAPABILITY SATELLITE ANCHORS (Fibonacci 360° Sphere Distribution)
    // =========================================================================
    const fibNodes = computeFibonacciSphereNodes(
      HERO_ORBS.map((o) => ({ id: o.id, label: o.label })),
      1.64,
      0.88
    );

    const anchorMeshes: THREE.Mesh[] = [];
    const anchorGeo = new THREE.OctahedronGeometry(0.09, 1);
    fibNodes.forEach((node) => {
      const mat = new THREE.MeshStandardMaterial({
        color: 0xf4f4f5,
        emissive: 0x27272a,
        emissiveIntensity: 0.7,
        metalness: 0.9,
        roughness: 0.14,
      });
      const m = new THREE.Mesh(anchorGeo, mat);
      m.position.set(node.x, node.y, node.z);
      rootGroup.add(m);
      anchorMeshes.push(m);
    });

    // =========================================================================
    // 4. GROUNDED RADIAL CONTACT SHADOW PLANE (Prevents ungrounded floating void)
    // =========================================================================
    const maxAnisotropy = renderer.capabilities.getMaxAnisotropy();
    const shadowTex = createContactShadowTexture(maxAnisotropy);
    const contactShadowGeo = new THREE.PlaneGeometry(3.2, 3.2);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.38,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const contactShadowMesh = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadowMesh.rotation.x = -Math.PI / 2;
    contactShadowMesh.position.y = -2.02;
    scene.add(contactShadowMesh);

    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    sceneBundleRef.current = {
      scene,
      camera,
      rootGroup,
      prismGroup,
      sphereGroup,
      outerPrismMat,
      innerPrismMat,
      prismEdgesMat,
      collarMat,
      wireframeMat,
      outerWireframe,
      smallNodeMat,
      ringMats,
      ring1,
      ring2,
      ring3,
      anchorMeshes,
      contactShadowMesh,
      contactShadowMat,
      hemiLight,
      keyLight,
    };

    // Touch & Pointer Interaction (Smooth Mobile & Desktop Orbit)
    const onPointerDown = (e: PointerEvent) => {
      interactionRef.current.isDragging = true;
      interactionRef.current.prevX = e.clientX;
      interactionRef.current.prevY = e.clientY;
    };
    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
        const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
        if (Math.abs(nx) <= 1.2 && Math.abs(ny) <= 1.2) {
          interactionRef.current.hoverParallaxX = ny * 0.12;
          interactionRef.current.hoverParallaxY = nx * 0.18;
        }
      }
      if (!interactionRef.current.isDragging) return;
      const dx = e.clientX - interactionRef.current.prevX;
      const dy = e.clientY - interactionRef.current.prevY;
      interactionRef.current.prevX = e.clientX;
      interactionRef.current.prevY = e.clientY;
      kinematicStateRef.current.targetRotY += dx * 0.0085;
      kinematicStateRef.current.targetRotX = Math.max(
        -0.68,
        Math.min(0.68, kinematicStateRef.current.targetRotX + dy * 0.0065)
      );
    };
    const onPointerUp = () => {
      interactionRef.current.isDragging = false;
    };

    const domEl = renderer.domElement;
    domEl.style.touchAction = 'pan-y';
    domEl.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });
    window.addEventListener('pointercancel', onPointerUp, { passive: true });

    // Responsive ResizeObserver for Mobile Address-Bar & Orientation Changes
    const syncViewportSize = () => {
      if (!container || !renderer) return;
      const nw = container.clientWidth || 520;
      const nh = container.clientHeight || 285;
      const cfg = computeMobileAdaptiveConfig(
        nw,
        window.devicePixelRatio || 1,
        isSoftwareGl
      );
      camera.fov = cfg.cameraFov;
      camera.position.z = cfg.cameraZ;
      camera.aspect = nw / nh;
      camera.updateProjectionMatrix();
      renderer.setPixelRatio(cfg.pixelRatio);
      renderer.setSize(nw, nh);
    };

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(syncViewportSize);
      resizeObserver.observe(container);
    }
    window.addEventListener('resize', syncViewportSize);

    return () => {
      domEl.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
      window.removeEventListener('resize', syncViewportSize);
      resizeObserver?.disconnect();
      envTarget.dispose();
      disposeSceneGraph(scene);
      renderer?.dispose();
      rendererRef.current = null;
      sceneBundleRef.current = null;
    };
  }, []);

  // Performant `useFrame` Loop (Zero React Re-Renders, Clamped Delta, Exponential Damping)
  useFrame(
    (frame) => {
      const renderer = rendererRef.current;
      const bundle = sceneBundleRef.current;
      const container = mountRef.current;
      if (!renderer || !bundle || !container) return;

      const cw = container.clientWidth || 520;
      const ch = container.clientHeight || 285;
      const mobileCfg = computeMobileAdaptiveConfig(
        cw,
        window.devicePixelRatio || 1,
        frame.isSoftwareGl
      );

      const isDark = document.documentElement.classList.contains('dark');
      const palette = getMonochromaticPlatinumPalette(isDark);

      // Step frame-rate independent kinematics in-place
      const kState = stepUseFrameKinematics(kinematicStateRef.current, frame.delta, {
        isDragging: interactionRef.current.isDragging,
        hoverParallaxX: interactionRef.current.hoverParallaxX,
        hoverParallaxY: interactionRef.current.hoverParallaxY,
        activeOrbIndex: activeIdxRef.current,
        mode: modeRef.current,
        dampingLambda: mobileCfg.dampingLambda,
        maxDeltaSeconds: mobileCfg.maxDeltaSeconds,
      });

      // Apply Monochromatic Silver / Platinum Theme Colors
      bundle.outerPrismMat.color.setHex(palette.prismCoreHex);
      bundle.outerPrismMat.emissive.setHex(palette.prismEmissiveHex);
      bundle.innerPrismMat.color.setHex(palette.prismInnerHex);
      bundle.prismEdgesMat.color.setHex(palette.prismEdgeHex);
      bundle.collarMat.color.setHex(palette.orbitalRingHex);
      bundle.wireframeMat.color.setHex(palette.sphereWireframeHex);
      bundle.wireframeMat.opacity =
        modeRef.current === 'prism-core' ? 0.22 : isDark ? 0.5 : 0.42;
      bundle.smallNodeMat.color.setHex(palette.sphereVertexNodeHex);
      bundle.ringMats.forEach((rm) => rm.color.setHex(palette.orbitalRingHex));
      bundle.hemiLight.color.setHex(palette.hemiSkyHex);
      bundle.hemiLight.groundColor.setHex(palette.hemiGroundHex);
      bundle.keyLight.color.setHex(palette.keyLightHex);
      if (bundle.scene.fog instanceof THREE.FogExp2) {
        bundle.scene.fog.color.setHex(palette.fogHex);
      }

      // Apply damped levitation, rotations, and mode scales
      bundle.rootGroup.position.y = kState.floatY;
      bundle.rootGroup.rotation.y = kState.curRotY;
      bundle.rootGroup.rotation.x = kState.curRotX;

      bundle.prismGroup.rotation.x = kState.prismRotX;
      bundle.prismGroup.rotation.y = kState.prismRotY;
      bundle.prismGroup.scale.setScalar(kState.curPrismScale);
      bundle.sphereGroup.scale.setScalar(kState.curSphereScale);

      bundle.outerWireframe.rotation.y = -kState.curRotY * 0.38;
      bundle.ring1.rotation.z += 0.2 * frame.delta;
      bundle.ring2.rotation.z -= 0.16 * frame.delta;
      bundle.ring3.rotation.x += 0.14 * frame.delta;

      // Grounded Contact Shadow Breathes with Floating Prism Height
      bundle.contactShadowMesh.scale.setScalar(kState.shadowScale);
      bundle.contactShadowMat.opacity = isDark
        ? kState.shadowOpacity * 0.65
        : kState.shadowOpacity;

      // Project 3D Satellite Coordinates to 2D Overlay Badges (Using Pre-Allocated Scratch Vector3)
      bundle.anchorMeshes.forEach((mesh, idx) => {
        const isSelected = activeIdxRef.current === idx;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.color.setHex(
          isSelected ? palette.activeSatelliteHex : palette.inactiveSatelliteHex
        );
        mat.emissive.setHex(
          isSelected ? palette.prismEdgeHex : palette.prismEmissiveHex
        );
        mat.emissiveIntensity = isSelected ? 0.85 : 0.35;
        mesh.scale.setScalar(isSelected ? 1.48 : 1.0);

        const btn = orbElsRef.current[idx];
        if (btn) {
          mesh.getWorldPosition(_scratchProjVec);
          const depthZ = _scratchProjVec.z;
          _scratchProjVec.project(bundle.camera);
          const x = (_scratchProjVec.x * 0.5 + 0.5) * cw;
          const y = (-_scratchProjVec.y * 0.5 + 0.5) * ch;
          const baseScale = (depthZ > 0 ? 1 : 0.84) * mobileCfg.satelliteProjectionScale;
          const activeScale = (isSelected ? 1.12 : 1.0) * mobileCfg.satelliteProjectionScale;
          const opacity = depthZ > -0.35 ? 1 : 0.44;
          btn.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) translate(-50%, -50%) scale(${
            isSelected ? activeScale.toFixed(2) : baseScale.toFixed(2)
          })`;
          btn.style.opacity = isSelected ? '1' : String(opacity);
          btn.style.zIndex = isSelected ? '30' : depthZ > 0 ? '20' : '10';
        }
      });

      renderer.render(bundle.scene, bundle.camera);
    },
    {
      containerRef: mountRef,
      rendererRef,
      isSoftwareGlRef,
    }
  );

  return (
    <div
      data-testid="hero-3d-sphere-prism"
      className="w-full surface-card rounded-3xl p-4 sm:p-5 relative overflow-hidden"
    >
      {/* Top Status & Sculpture Mode Header (Static Monochromatic Indicator — Zero Pulsating Dots) */}
      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 mb-1 border-b border-[var(--border-hairline)]">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[var(--text-primary)]" />
          <span className="font-mono-tech text-[10px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
            3D FLOATING SPHERE &amp; PRISM MONOLITH
          </span>
        </div>

        {/* Interactive Geometry Mode Switcher */}
        <div className="inline-flex items-center gap-1 p-0.5 rounded-full surface-elevated border border-[var(--border-hairline)]">
          {SCULPTURE_MODES.map((m) => {
            const active = sculptureMode === m.id;
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setSculptureMode(m.id)}
                className={`px-2 py-0.5 rounded-full font-mono-tech text-[9px] font-bold tracking-wider transition-all cursor-pointer ${
                  active
                    ? 'bg-[#09090B] text-[#F8F8F6] dark:bg-[#F4F4F5] dark:text-[#09090B] shadow-xs'
                    : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                }`}
              >
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sub-bar telemetry */}
      <div className="flex items-center justify-between text-[10px] font-mono-tech text-[var(--text-muted)] pb-1">
        <span>PLATINUM WEBGL • DRAG OR HOVER TO ORBIT</span>
        <span className="inline-flex items-center gap-1 font-semibold text-[var(--text-primary)]">
          <Activity className="w-3 h-3 text-[var(--text-primary)]" />
          <span>{activeOrb.label} NODE LOCKED</span>
        </span>
      </div>

      {/* 3D WebGL Canvas + Projected 360° Capability Orbs */}
      <div className="relative w-full h-[240px] sm:h-[285px] select-none cursor-grab active:cursor-grabbing">
        <div ref={mountRef} className="w-full h-full" />

        {/* 3D-Projected Capability Satellite Buttons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {HERO_ORBS.map((orb, idx) => {
            const isSelected = activeOrbIndex === idx;
            return (
              <button
                key={orb.id}
                ref={(el) => {
                  orbElsRef.current[idx] = el;
                }}
                type="button"
                onClick={() => onSelectOrb(idx)}
                className={`pointer-events-auto absolute top-0 left-0 px-2.5 py-1 rounded-full font-mono-tech text-[10px] font-bold transition-colors cursor-pointer inline-flex items-center gap-1 border shadow-md ${
                  isSelected
                    ? 'bg-[#09090B] text-[#F4F4F5] dark:bg-[#F4F4F5] dark:text-[#09090B] border-[var(--text-primary)] ring-2 ring-[var(--text-primary)]/25'
                    : 'bg-[var(--bg-surface)] text-[var(--text-primary)] border-[var(--border-strong)] hover:border-[var(--text-primary)]'
                }`}
              >
                <span
                  className={
                    isSelected
                      ? 'text-current'
                      : 'text-[var(--text-secondary)]'
                  }
                >
                  {getOrbLucideIcon(orb.id, 'w-3 h-3')}
                </span>
                <span>{orb.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Single Clean 7-Node Selector Strip (Zero Duplicate Row in Hero) */}
      <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-1.5">
        {HERO_ORBS.map((orb, idx) => {
          const isActive = activeOrbIndex === idx;
          return (
            <button
              key={orb.id}
              type="button"
              onClick={() => onSelectOrb(idx)}
              onMouseEnter={() => onSelectOrb(idx)}
              className={`px-2.5 py-1.5 rounded-xl font-mono-tech text-[10px] font-bold transition-all cursor-pointer inline-flex items-center gap-1.5 border ${
                isActive
                  ? 'btn-platinum-primary shadow-sm scale-105'
                  : 'surface-elevated text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              <span className={isActive ? 'text-current' : 'text-[var(--text-secondary)]'}>
                {getOrbLucideIcon(orb.id, 'w-3 h-3')}
              </span>
              <span>{orb.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/**
 * Pure Code-Engineered Architectural Graphic for the 6 Bento Grid Cards.
 */
const ArchitecturalBentoGraphic: React.FC<{ card: BentoSolutionCard }> = ({ card }) => {
  switch (card.visualType) {
    case 'web-architecture':
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] text-zinc-400 border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-zinc-300" />
              <span>NEXT.JS 15 FULL-STACK CLUSTER</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">99/100 SPEED</span>
          </div>
          <div className="grid grid-cols-3 gap-2 my-auto">
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">EDGE SSR</div>
              <div className="text-sm font-bold text-white mt-0.5">0.4s LCP</div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">POSTGRESQL</div>
              <div className="text-sm font-bold text-white mt-0.5">Pooler HA</div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">SECURITY</div>
              <div className="text-sm font-bold text-white mt-0.5">JWT + RBAC</div>
            </div>
          </div>
          <div className="text-[9px] text-zinc-500 flex justify-between">
            <span>TYPESCRIPT STRICT</span>
            <span className="text-zinc-300">PRODUCTION READY</span>
          </div>
        </div>
      );

    case 'whatsapp-crm':
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-2 text-zinc-200">
              <WhatsAppBrandBadge size="sm" />
              <span>OFFICIAL WHATSAPP CLOUD BOT</span>
            </span>
            <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-200">&lt; 1.2s</span>
          </div>
          <div className="flex items-center justify-between gap-2 my-auto">
            {[
              { tag: 'CAPTURE', name: 'Inbound Lead' },
              { tag: 'RAG AI', name: 'AI Qualifier' },
              { tag: 'SYNCED', name: 'Slot Booked' },
            ].map((item) => (
              <div
                key={item.name}
                className="flex-1 p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-center"
              >
                <div className="text-[9px] text-zinc-500">{item.tag}</div>
                <div className="text-[10px] font-semibold text-zinc-100 mt-0.5">{item.name}</div>
              </div>
            ))}
          </div>
          <div className="text-[9px] text-zinc-400 flex justify-between">
            <span>24/7 AUTO-RESPONSE</span>
            <span className="text-zinc-200">INSTANT WEBHOOK CAPTURE</span>
          </div>
        </div>
      );

    case 'local-gbp':
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <TechStackBrandIcon name="Google Map Pack" className="w-3.5 h-3.5" />
              <span>MAP PACK #TOP RANKING</span>
            </span>
            <span className="text-zinc-300">4.9 ★</span>
          </div>
          <div className="my-auto p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-between">
            <div>
              <div className="text-[10px] font-bold text-white">Top 3 Local "Near Me" Pack</div>
              <div className="text-[9px] text-zinc-400">QR Review Standee + Local Citations</div>
            </div>
            <span className="px-2 py-1 rounded bg-zinc-100 text-zinc-950 text-[10px] font-bold">
              +215% CALLS
            </span>
          </div>
          <div className="text-[9px] text-zinc-400 flex justify-between">
            <span>CLINICS • SALONS • RETAIL</span>
            <span className="text-zinc-200">LOCAL DOMINANCE</span>
          </div>
        </div>
      );

    case 'roas-funnel':
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <TechStackBrandIcon name="Meta Ads" className="w-3.5 h-3.5" />
              <span>META CAPI + GOOGLE ADS</span>
            </span>
            <span className="text-zinc-200">4.4x ROAS</span>
          </div>
          <div className="flex items-end gap-1.5 h-16 my-auto px-2">
            {[35, 48, 62, 75, 95].map((bar, idx) => (
              <div
                key={idx}
                className={`flex-1 rounded-t ${idx === 4 ? 'bg-zinc-100' : 'bg-zinc-700'}`}
                style={{ height: `${bar}%` }}
              />
            ))}
          </div>
          <div className="text-[9px] text-zinc-400 flex justify-between">
            <span>SERVER-SIDE ATTRIBUTION</span>
            <span className="text-zinc-200">-41% AD CAC</span>
          </div>
        </div>
      );

    case 'seo-schema':
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-zinc-800 pb-2">
            <span className="flex items-center gap-1.5 text-zinc-200">
              <Search className="w-3.5 h-3.5 text-zinc-300" />
              <span>TECHNICAL SEO &amp; AEO</span>
            </span>
            <span className="text-zinc-200">+240%</span>
          </div>
          <div className="my-auto p-2.5 rounded-xl bg-zinc-900 border border-zinc-800 text-[10px] text-zinc-300 space-y-1">
            <div className="flex justify-between">
              <span className="text-zinc-500">@type:</span>
              <span className="text-zinc-100">"Organization &amp; LocalBusiness"</span>
            </div>
            <div className="flex justify-between">
              <span className="text-zinc-500">AI Indexing:</span>
              <span className="text-zinc-100">ChatGPT + Perplexity + Google</span>
            </div>
          </div>
          <div className="text-[9px] text-zinc-400 flex justify-between">
            <span>JSON-LD ENTITY GRAPH</span>
            <span className="text-zinc-200">100/100 CWV</span>
          </div>
        </div>
      );

    case 'upi-catalog':
    default:
      return (
        <div className="w-full h-full p-4 bg-[#0D0E12] text-zinc-100 font-mono-tech flex flex-col justify-between">
          <div className="flex items-center justify-between text-[10px] border-b border-zinc-800 pb-2">
            <span className="text-zinc-200">D2C STOREFRONT • 1-TAP UPI CHECKOUT ENGINE</span>
            <span className="px-2 py-0.5 rounded bg-zinc-100 text-zinc-950 font-bold">
              +82% CONVERSION
            </span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-auto">
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">CHECKOUT SPEED</div>
              <div className="text-xs font-bold text-white mt-0.5">1-Tap GPay / PhonePe</div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">ABANDONED CART</div>
              <div className="text-xs font-bold text-white mt-0.5">WhatsApp Auto-Recovery</div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="text-[9px] text-zinc-400">MARKETPLACE FEE</div>
              <div className="text-xs font-bold text-white mt-0.5">Direct D2C Margin</div>
            </div>
          </div>
          <div className="text-[9px] text-zinc-400 flex justify-between">
            <span>INVENTORY &amp; GST BILLING SYNC</span>
            <span className="text-zinc-200">SUB-SECOND PRODUCT CATALOG</span>
          </div>
        </div>
      );
  }
};

/**
 * Pure Code-Engineered Architectural Project Preview for "Our Work" Showcase Cards.
 */
const ArchitecturalProjectMockup: React.FC<{ project: ShowcaseProject }> = ({ project }) => {
  const cat = (project.categoryTag || project.category || 'WEB & SAAS').toUpperCase();
  const clientType = project.clientType || project.locationTag || 'Enterprise Client';
  const impactMetric = project.impactMetric || project.metricsHeadline || '+165% Pipeline';
  const secondaryMetric = project.secondaryMetric || project.accentMetric || '99.98% SLA';

  return (
    <div className="w-full h-full p-5 bg-[#0D0E12] text-zinc-100 flex flex-col justify-between select-none relative overflow-hidden">
      <div className="flex items-center justify-between border-b border-zinc-800 pb-3 z-10">
        <div className="flex items-center gap-2">
          <span className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-100 font-mono-tech text-[10px] font-semibold tracking-wider uppercase">
            {cat}
          </span>
          <span className="font-mono-tech text-[10px] text-zinc-400 truncate max-w-[160px]">
            {clientType}
          </span>
        </div>
        <span className="font-mono-tech text-[10px] px-2.5 py-1 rounded-md bg-zinc-100 text-zinc-950 font-bold">
          {impactMetric}
        </span>
      </div>

      {/* Center Architectural Telemetry Canvas */}
      <div className="my-auto py-3 z-10">
        {cat.includes('LOCAL') ? (
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
              <div className="flex items-center justify-between font-mono-tech text-[9px] text-zinc-400">
                <span>GOOGLE MAP PACK RANK</span>
                <span className="text-zinc-100">#TOP ACROSS 4 CLINICS</span>
              </div>
              <div className="text-xs font-semibold text-white">
                Automated WhatsApp Slot Booking + QR Reviews
              </div>
              <div className="flex items-center gap-2 pt-1 font-mono-tech text-[9px] text-zinc-300">
                <span className="px-2 py-0.5 rounded bg-zinc-800">4.9 ★ Rating</span>
                <span className="px-2 py-0.5 rounded bg-zinc-800">Instant Webhook Capture</span>
              </div>
            </div>
            <div className="col-span-5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="font-mono-tech text-[9px] text-zinc-400">VERIFIED IMPACT</div>
              <div className="font-display text-lg font-extrabold text-white mt-1">
                {secondaryMetric}
              </div>
            </div>
          </div>
        ) : cat.includes('ADS') || cat.includes('COMMERCE') || cat.includes('D2C') ? (
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 p-3 rounded-xl bg-zinc-900 border border-zinc-800">
              <div className="font-mono-tech text-[9px] text-zinc-400 mb-2">
                SERVER-SIDE CAPI + 1-TAP UPI FUNNEL
              </div>
              <div className="flex items-end gap-1.5 h-12">
                {[30, 45, 58, 76, 98].map((h, i) => (
                  <div
                    key={i}
                    className={`flex-1 rounded-t ${i === 4 ? 'bg-zinc-100' : 'bg-zinc-700'}`}
                    style={{ height: `${h}%` }}
                  />
                ))}
              </div>
            </div>
            <div className="col-span-5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="font-mono-tech text-[9px] text-zinc-400">CHECKOUT LIFT</div>
              <div className="font-display text-lg font-extrabold text-white mt-1">
                {secondaryMetric}
              </div>
            </div>
          </div>
        ) : cat.includes('AI') || cat.includes('CRM') ? (
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 p-3 rounded-xl bg-zinc-900 border border-zinc-800 space-y-1.5">
              <div className="flex items-center gap-1.5 font-mono-tech text-[9px] text-zinc-300">
                <WhatsAppBrandBadge size="sm" />
                <span>RAG AI WHATSAPP QUALIFIER</span>
              </div>
              <div className="text-xs text-zinc-200">
                Instant brochure dispatch &amp; automated site-visit calendar sync.
              </div>
            </div>
            <div className="col-span-5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="font-mono-tech text-[9px] text-zinc-400">PIPELINE LIFT</div>
              <div className="font-display text-lg font-extrabold text-white mt-1">
                {secondaryMetric}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-3 items-center">
            <div className="col-span-7 p-3 rounded-xl bg-zinc-900 border border-zinc-800 font-mono-tech text-[10px] space-y-1">
              <div className="text-zinc-400">High-Speed Production Platform</div>
              <div className="text-zinc-100">Latency: 62ms • 99+ Core Web Vitals</div>
              <div className="text-zinc-400">Next.js 15 + PostgreSQL + Edge CDN</div>
            </div>
            <div className="col-span-5 p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-center">
              <div className="font-mono-tech text-[9px] text-zinc-400">RELIABILITY</div>
              <div className="font-display text-lg font-extrabold text-white mt-1">
                {secondaryMetric}
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="flex items-center justify-between border-t border-zinc-800 pt-2.5 font-mono-tech text-[9px] text-zinc-400 z-10">
        <span>ARCHITECTURE VERIFIED</span>
        <span className="text-zinc-200 inline-flex items-center gap-1">
          <span>LAUNCH INTERACTIVE PROTOTYPE</span>
          <ArrowUpRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  projects = SHOWCASE_PROJECTS,
  pageView = 'home',
}) => {
  const [activeOrbIndex, setActiveOrbIndex] = useState<number>(0);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<ShowcaseProject | null>(null);
  const [activeArtifactId, setActiveArtifactId] = useState<InteractiveArtifactId | null>(null);

  // Auto-cycle through all 7 service orbs every 4.0 seconds when idle
  useEffect(() => {
    if (isPaused || pageView !== 'home') return;
    const timer = setInterval(() => {
      setActiveOrbIndex((prev) => (prev + 1) % HERO_ORBS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused, pageView]);

  const activeOrb = HERO_ORBS[activeOrbIndex];
  const displayedProjects = pageView === 'home' ? projects.slice(0, 2) : projects;

  return (
    <div className="relative overflow-hidden">
      {/* =====================================================================
          HOME VIEW ONLY: HERO + TECH MARQUEE + BENTO SUMMARY + CASE STUDY PREVIEW
         ===================================================================== */}
      {pageView === 'home' && (
        <>
          <section className="relative min-h-[calc(100vh-4rem)] pt-10 pb-14 px-4 sm:px-8 lg:px-14 flex flex-col justify-between hero-architectural-bg border-b border-[var(--border-hairline)]">
            <div className="w-full max-w-7xl mx-auto my-auto py-4 lg:py-6">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
                {/* Left Column (6 Cols): Editorial & Architectural Statement */}
                <div className="lg:col-span-6 space-y-6">
                  {/* Zero-Pill Discipline Kicker */}
                  <div className="inline-flex items-center gap-2.5">
                    <span className="w-2 h-2 rounded-full bg-[var(--text-primary)]" />
                    <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[var(--text-primary)] font-bold">
                      SKYLINE DIGITAL AGENCY • INDORE, MP, INDIA
                    </span>
                  </div>

                  {/* Humanized Direct Headline */}
                  <div className="space-y-4">
                    <h1 className="font-display font-extrabold tracking-[-0.03em] leading-[1.12] text-[var(--text-primary)] text-3xl sm:text-5xl xl:text-[3.35rem]">
                      Fast Web Software, WhatsApp Automation, and{' '}
                      <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                        Local Search Growth.
                      </span>
                    </h1>

                    {/* Subheadline */}
                    <p className="font-sans-body text-sm sm:text-base lg:text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed font-normal">
                      We build custom web apps, SaaS platforms, 24/7 WhatsApp booking bots, and Google Maps growth systems for clinics, retail brands, and startups from our engineering desk in Indore.
                    </p>
                  </div>

                  {/* Live Architectural SLA Strip */}
                  <div className="grid grid-cols-3 gap-3 max-w-lg pt-1">
                    {[
                      { metric: '< 85ms', label: 'Edge TTFB Speed' },
                      { metric: '4.4x', label: 'Verified Ad ROAS' },
                      { metric: '#Top', label: 'Google Map Pack' },
                    ].map((stat) => (
                      <div
                        key={stat.label}
                        className="p-3 rounded-2xl surface-elevated border border-[var(--border-hairline)] border-t border-white/15"
                      >
                        <div className="font-display text-lg sm:text-xl font-extrabold text-[var(--text-primary)]">
                          {stat.metric}
                        </div>
                        <div className="font-mono-tech text-[10px] text-[var(--text-muted)] uppercase">
                          {stat.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Action Row: Start Project + 60s Estimator + Sachin Active WhatsApp */}
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => onNavigate('contact')}
                      className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full btn-platinum-primary text-xs sm:text-sm font-bold tracking-wide cursor-pointer"
                    >
                      <span>Start Your Project</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>

                    <button
                      type="button"
                      onClick={() => onNavigate('services')}
                      className="inline-flex items-center gap-2 px-5 py-3.5 rounded-full btn-platinum-secondary text-xs sm:text-sm font-bold cursor-pointer"
                    >
                      <span>60s Price Estimator</span>
                    </button>

                    <a
                      href={`https://wa.me/${SKYLINE_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                        'Hi SkyLine Digital Agency! I want a free audit and proposal for my business.'
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-4 py-3.5 rounded-full btn-whatsapp-official text-xs sm:text-sm font-bold"
                    >
                      <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                      <span>WhatsApp Us</span>
                    </a>
                  </div>
                </div>

                {/* Right Column (6 Cols): Interactive 3D Geodesic Orbital Sphere + Live Service Telemetry Card */}
                <div
                  className="lg:col-span-6 flex flex-col gap-4"
                  onMouseEnter={() => setIsPaused(true)}
                  onMouseLeave={() => setIsPaused(false)}
                >
                  <HeroGeodesicSphere3D
                    activeOrb={activeOrb}
                    activeOrbIndex={activeOrbIndex}
                    onSelectOrb={(idx) => setActiveOrbIndex(idx)}
                  />

                  {/* Sleek Live Service Telemetry Card (Clean Service Category Descriptors) */}
                  <div className="w-full surface-card rounded-3xl p-5 sm:p-6 relative overflow-hidden transition-all duration-300 border-t border-white/15">
                    <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                      <div className="inline-flex items-center gap-2">
                        <span className="px-2.5 py-1 rounded-full font-display text-[10px] font-extrabold uppercase tracking-widest bg-[#18181B] text-[#F4F4F5] dark:bg-[#F4F4F5] dark:text-[#09090B] shadow-xs inline-flex items-center gap-1.5">
                          {getOrbLucideIcon(activeOrb.id, 'w-3 h-3')}
                          <span>
                            {activeOrb.label} • {activeOrb.psychName}
                          </span>
                        </span>
                        <span className="font-mono-tech text-[10px] text-[var(--text-muted)] hidden sm:inline">
                          {activeOrb.psychMeaning}
                        </span>
                      </div>

                      <div className="text-right">
                        <span className="font-display text-lg sm:text-xl font-extrabold text-[var(--text-primary)]">
                          {activeOrb.metric}
                        </span>
                        <span className="font-mono-tech text-[10px] text-[var(--text-muted)] ml-1.5 uppercase">
                          {activeOrb.metricLabel}
                        </span>
                      </div>
                    </div>

                    <h2 className="font-display text-base sm:text-lg font-bold text-[var(--text-primary)] mb-1.5">
                      {activeOrb.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed mb-4">
                      {activeOrb.summary}
                    </p>

                    <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--border-hairline)]">
                      <div className="flex flex-wrap gap-1.5">
                        {activeOrb.deliverables.map((item) => (
                          <span
                            key={item}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg surface-elevated font-mono-tech text-[10px] text-[var(--text-primary)]"
                          >
                            <CheckCircle2 className="w-3 h-3 shrink-0 text-[var(--text-primary)]" />
                            <span>{item}</span>
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveArtifactId(activeOrb.artifactId)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full btn-platinum-secondary font-mono-tech text-[10px] font-bold text-[var(--text-primary)] cursor-pointer"
                        >
                          <span>Launch Live Prototype</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigate('services')}
                          className="inline-flex items-center gap-1 font-display text-xs font-bold text-[var(--text-primary)] hover:opacity-80 cursor-pointer shrink-0"
                        >
                          <span>Explore {activeOrb.label}</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Bottom Metadata Bar (Clean Numbers & Location) */}
            <div className="w-full max-w-7xl mx-auto pt-5 lg:pr-36 border-t border-[var(--border-hairline)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-xs text-[var(--text-secondary)]">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[var(--text-primary)] shrink-0" />
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    BASED IN:
                  </span>
                  <span className="font-medium text-[var(--text-primary)]">
                    {SKYLINE_LOCATION}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-[var(--text-primary)] shrink-0" />
                  <span className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    FOUNDERS CONTACT:
                  </span>
                  <a
                    href={`tel:${SKYLINE_CALL_NUMBER}`}
                    className="font-display font-bold text-[var(--text-primary)] hover:underline"
                  >
                    {SKYLINE_PRIMARY_PHONE_DISPLAY}
                  </a>
                  <span className="text-[#71717A]">•</span>
                  <a
                    href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-display font-bold text-[var(--text-primary)] hover:underline"
                  >
                    {SKYLINE_SACHIN_PHONE_DISPLAY}
                  </a>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => onNavigate('referral')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full badge-platinum font-mono-tech text-[11px] font-semibold cursor-pointer hover:opacity-90 transition-opacity"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                  <span>Refer a Client &amp; Earn 15% Commission</span>
                </button>
              </div>
            </div>
          </section>

          {/* =====================================================================
              2. DUAL-ROW INFINITE TECH & GROWTH MARQUEE (16 ORIGINAL BRAND ICONS)
             ===================================================================== */}
          <section
            aria-label="Technology and Growth Stack"
            className="py-5 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)] overflow-hidden space-y-3"
          >
            <div className="relative flex overflow-hidden">
              <div className="animate-marquee-left flex items-center gap-3 pr-3">
                {[...TECH_STACK_MARQUEE_ROW_1, ...TECH_STACK_MARQUEE_ROW_1].map(
                  (tech, index) => (
                    <div
                      key={`r1-${index}`}
                      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full surface-elevated font-mono-tech text-xs text-[var(--text-primary)] whitespace-nowrap"
                    >
                      <TechStackBrandIcon name={tech} className="w-4 h-4 shrink-0" />
                      <span>{tech}</span>
                    </div>
                  )
                )}
              </div>
            </div>

            <div className="relative flex overflow-hidden">
              <div className="animate-marquee-right flex items-center gap-3 pr-3">
                {[...TECH_STACK_MARQUEE_ROW_2, ...TECH_STACK_MARQUEE_ROW_2].map(
                  (tech, index) => (
                    <div
                      key={`r2-${index}`}
                      className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full surface-card font-mono-tech text-xs text-[var(--text-secondary)] whitespace-nowrap"
                    >
                      <TechStackBrandIcon name={tech} className="w-4 h-4 shrink-0" />
                      <span>{tech}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          </section>

          {/* =====================================================================
              3. 6 CORE SERVICES BENTO SUMMARY (HOME VIEW)
             ===================================================================== */}
          <section
            id="services-summary"
            className="py-20 sm:py-24 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
          >
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
                <div>
                  <div className="inline-flex items-center gap-2.5 mb-3">
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-xs dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 flex items-center justify-center shrink-0">
                      <Layers className="w-4 h-4 text-[var(--text-primary)]" />
                    </div>
                    <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                      WHAT WE ENGINEER &amp; SCALE
                    </span>
                  </div>
                  <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                    Systems We Build and{' '}
                    <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                      Run.
                    </span>
                  </h2>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-sm leading-relaxed">
                    From local clinics and retail stores to high-growth SaaS startups, we build and run the complete software and growth system.
                  </p>
                  <button
                    type="button"
                    onClick={() => onNavigate('services')}
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-platinum-primary text-xs font-bold cursor-pointer shrink-0"
                  >
                    <span>Explore Full Services</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                {BENTO_SOLUTIONS.map((card) => (
                  <div
                    key={card.id}
                    className={`${card.spanClass} surface-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between group relative overflow-hidden border-t border-white/15`}
                  >
                    <div className="space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <span className="font-mono-tech text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                          {card.tag}
                        </span>
                        <span className="px-3 py-1 rounded-full surface-elevated font-mono-tech text-xs font-bold text-[var(--text-primary)]">
                          {card.metric}
                        </span>
                      </div>

                      <div className="relative h-36 sm:h-40 rounded-2xl overflow-hidden border border-[var(--border-hairline)]">
                        <ArchitecturalBentoGraphic card={card} />
                      </div>

                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)] leading-snug pt-1">
                        {card.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        {card.summary}
                      </p>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
                      <div className="flex flex-wrap gap-1.5">
                        {card.deliverables.map((del) => (
                          <span
                            key={del}
                            className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg surface-elevated font-mono-tech text-[10px] text-[var(--text-primary)]"
                          >
                            <CheckCircle2 className="w-3 h-3 text-[var(--text-primary)] shrink-0" />
                            <span>{del}</span>
                          </span>
                        ))}
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => setActiveArtifactId(card.artifactId)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full btn-platinum-secondary font-mono-tech text-[10px] font-bold text-[var(--text-primary)] cursor-pointer"
                        >
                          <span>Launch Live Prototype</span>
                          <ArrowUpRight className="w-3 h-3" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onNavigate('services')}
                          className="inline-flex items-center gap-1 font-display text-xs font-bold text-[var(--text-primary)] group-hover:translate-x-0.5 transition-transform cursor-pointer shrink-0"
                        >
                          <span>Explore Service</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </>
      )}

      {/* =====================================================================
          4. CASE STUDIES SHOWCASE (FEATURED PREVIEW ON HOME | FULL ON OUR WORK)
         ===================================================================== */}
      {(pageView === 'home' || pageView === 'work') && (
        <section
          id="work"
          className={`${
            pageView === 'work' ? 'pt-28 sm:pt-32' : 'py-16 sm:py-24'
          } pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]`}
        >
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14">
              <div>
                <div className="inline-flex items-center gap-2.5 mb-3">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-xs dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 flex items-center justify-center shrink-0">
                    <Code2 className="w-4 h-4 text-[var(--text-primary)]" />
                  </div>
                  <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                    {pageView === 'home'
                      ? 'FEATURED CASE STUDIES PREVIEW'
                      : 'SELECTED CASE STUDIES & INTERACTIVE PROTOTYPES'}
                  </span>
                </div>
                <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                  Live Production Work and{' '}
                  <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                    Interactive Prototypes.
                  </span>
                </h2>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                {pageView === 'home' ? (
                  <button
                    type="button"
                    onClick={() => onNavigate('work')}
                    className="px-5 py-3 rounded-full btn-platinum-primary text-xs font-bold cursor-pointer inline-flex items-center gap-2"
                  >
                    <span>Explore All {projects.length} Case Studies</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                ) : (
                  <>
                    <button
                      type="button"
                      onClick={() => onNavigate('services')}
                      className="px-4 py-2.5 rounded-full btn-platinum-secondary text-xs font-bold cursor-pointer"
                    >
                      Estimate Similar Project
                    </button>
                    <button
                      type="button"
                      onClick={() => onNavigate('contact')}
                      className="px-4 py-2.5 rounded-full btn-platinum-primary text-xs font-bold cursor-pointer"
                    >
                      Request Custom Build
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedProjects.map((project) => (
                <article
                  key={project.id}
                  onClick={() => setSelectedProject(project)}
                  className="surface-card rounded-3xl overflow-hidden flex flex-col justify-between group cursor-pointer border-t border-white/15"
                >
                  <div className="relative h-56 sm:h-60 overflow-hidden border-b border-[var(--border-hairline)]">
                    <ArchitecturalProjectMockup project={project} />
                  </div>

                  <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2.5">
                      <div className="font-mono-tech text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                        {project.clientType || project.locationTag || 'Enterprise Client'}
                      </div>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                        {project.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                        {project.summary || project.architectureSummary}
                      </p>
                    </div>

                    <div className="pt-4 border-t border-[var(--border-hairline)] space-y-3">
                      <div className="flex flex-wrap gap-1.5">
                        {(project.techStack || project.stackPills || []).map((tech: string) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md surface-elevated font-mono-tech text-[10px] text-[var(--text-secondary)]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveArtifactId(project.artifactId || '360-views');
                            }}
                            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl btn-platinum-primary font-mono-tech text-[11px] font-bold cursor-pointer"
                          >
                            <span>Launch Live Interactive Prototype</span>
                            <ArrowUpRight className="w-3.5 h-3.5" />
                          </button>

                          {project.liveSiteUrl && (
                            <a
                              href={project.liveSiteUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl btn-platinum-secondary font-mono-tech text-[11px] font-bold text-[var(--text-primary)]"
                            >
                              <span>Visit Live Site (360views.services)</span>
                              <ArrowUpRight className="w-3.5 h-3.5" />
                            </a>
                          )}
                        </div>

                        <span className="inline-flex items-center gap-1 font-display text-xs font-bold text-[var(--text-primary)] group-hover:underline">
                          <span>Case Details</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </span>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {pageView === 'home' && (
              <div className="mt-12 surface-card rounded-3xl p-6 sm:p-8 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 border-t border-white/15">
                <div className="space-y-1.5 max-w-2xl">
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-bold">
                    READY TO SCALE YOUR REVENUE PIPELINE?
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                    Get a Custom Architecture Blueprint &amp; Fixed-Milestone Proposal Today.
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)]">
                    Use our 60-second project estimator or chat directly with our founding engineers on WhatsApp.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <a
                    href={`https://wa.me/${SKYLINE_SACHIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                      'Hi SkyLine Digital Agency! I would like to discuss a new project.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-3 rounded-full btn-whatsapp-official text-xs font-bold"
                  >
                    <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                    <span>WhatsApp Us</span>
                  </a>
                  <button
                    type="button"
                    onClick={() => onNavigate('contact')}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-platinum-primary text-xs font-bold cursor-pointer"
                  >
                    <span>Book Strategy Call</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* =====================================================================
          5. DEDICATED "WHO WE ARE" SECTION (WHO-WE-ARE VIEW ONLY)
         ===================================================================== */}
      {pageView === 'who-we-are' && (
        <section
          id="who-we-are"
          className="pt-28 sm:pt-32 pb-16 sm:pb-24 px-4 sm:px-8 lg:px-12 border-b border-[var(--border-hairline)] bg-[var(--bg-canvas)]"
        >
          <div className="max-w-7xl mx-auto space-y-16">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <div className="space-y-4 max-w-3xl">
                <div className="inline-flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-xs dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 flex items-center justify-center shrink-0">
                    <Compass className="w-4 h-4 text-[var(--text-primary)]" />
                  </div>
                  <span className="font-mono-tech text-[11px] uppercase tracking-widest font-bold text-[var(--text-primary)]">
                    WHO WE ARE • THE SKYLINE DOCTRINE &amp; FOUNDERS
                  </span>
                </div>

                <h2 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-[var(--text-primary)] leading-[1.12]">
                  Senior-Led Engineering.{' '}
                  <span className="font-serif-editorial italic font-semibold text-[var(--platinum-primary)]">
                    Zero Agency Bloat.
                  </span>
                </h2>
              </div>

              <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md leading-relaxed">
                At SkyLine Digital Agency, you work directly with our founding engineers in Indore, Madhya Pradesh, specializing in high-concurrency Java 21 systems, full-stack Next.js platforms, cryptographic security, and AI growth automation.
              </p>
            </div>

            {/* FOUNDERS & LEAD SYSTEMS ARCHITECTS */}
            <div className="space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="inline-flex items-center gap-2.5 font-mono-tech text-xs uppercase tracking-widest text-[var(--text-primary)] font-bold">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-xs dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 flex items-center justify-center shrink-0">
                    <Terminal className="w-4 h-4 text-[var(--text-primary)]" />
                  </div>
                  <span>MEET OUR FOUNDING ENGINEERS &amp; ARCHITECTS</span>
                </div>
                <span className="font-mono-tech text-[11px] text-[var(--text-muted)] uppercase">
                  {SKYLINE_LOCATION}
                </span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
                {FOUNDER_PROFILES.map((founder) => {
                  const isCallSupported = founder.contactMode === 'whatsapp-and-call';
                  return (
                    <div
                      key={founder.id}
                      className="surface-card rounded-3xl p-6 sm:p-8 flex flex-col justify-between space-y-6 border border-[var(--border-hairline)] border-t border-white/15 hover:border-[var(--border-strong)] transition-all"
                    >
                      <div className="space-y-5">
                        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-[var(--border-hairline)] pb-5">
                          <div className="space-y-1.5">
                            <div className="inline-flex items-center gap-2 font-mono-tech text-[10px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
                              <ShieldCheck className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                              <span>{founder.role}</span>
                            </div>
                            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)] tracking-tight pt-1">
                              {founder.name}
                            </h3>
                            <p className="text-xs font-medium text-[#71717A] dark:text-[#A1A1AA]">
                              {founder.headline}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <a
                              href={`https://wa.me/${founder.whatsappNumber}?text=${encodeURIComponent(
                                `Hi ${founder.name}! I checked your profile on SkyLine Digital Agency and would like to discuss a project.`
                              )}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full btn-whatsapp-official text-[11px] font-bold"
                            >
                              <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                              <span>WhatsApp</span>
                            </a>

                            {isCallSupported && founder.callNumber && (
                              <a
                                href={`tel:${founder.callNumber}`}
                                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full btn-call-black bg-[#000000] text-[#FFFFFF] text-[11px] font-bold"
                              >
                                <PhoneCall className="w-3.5 h-3.5 text-[#FFFFFF]" />
                                <span>Call</span>
                              </a>
                            )}
                          </div>
                        </div>

                        <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                          {founder.summary}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 rounded-2xl surface-elevated border-t border-white/15 text-xs">
                          <div className="space-y-1">
                            <div className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)]">
                              <GraduationCap className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                              <span>BACKGROUND</span>
                            </div>
                            <div className="font-bold text-[var(--text-primary)]">
                              {founder.education}
                            </div>
                            <div className="text-[11px] text-[var(--text-secondary)]">
                              {founder.institution}
                            </div>
                          </div>

                          <div className="space-y-1.5 flex flex-col justify-center">
                            <div className="text-xs font-bold text-[var(--text-primary)]">
                              {founder.phone}
                            </div>
                            <a
                              href={`mailto:${founder.email}`}
                              className="flex items-center gap-1.5 text-[11px] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                            >
                              <GmailBrandIcon size="sm" />
                              <span className="truncate">{founder.email}</span>
                            </a>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
                            <Code2 className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                            <span>LANGUAGES, FRAMEWORKS &amp; CORE ARCHITECTURE</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {[
                              ...founder.languages,
                              ...founder.frameworksAndTools,
                              ...founder.coreConcepts,
                            ].map((skill) => (
                              <span
                                key={skill}
                                className="px-2.5 py-1 rounded-lg surface-elevated font-mono-tech text-[10px] text-[var(--text-primary)] font-medium"
                              >
                                {skill}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2.5">
                          <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
                            <Briefcase className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                            <span>ENGINEERING LEADERSHIP</span>
                          </div>
                          <div className="space-y-2">
                            {founder.experience.map((exp) => (
                              <div
                                key={`${exp.role}-${exp.company}`}
                                className="p-3.5 rounded-2xl surface-elevated space-y-1.5"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <span className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                                    {exp.role} • {exp.company}
                                  </span>
                                  <span className="font-mono-tech text-[10px] px-2 py-0.5 rounded badge-platinum font-semibold">
                                    {exp.period}
                                  </span>
                                </div>
                                <ul className="space-y-1 text-[11px] text-[var(--text-secondary)]">
                                  {exp.highlights.map((h) => (
                                    <li key={h} className="flex items-start gap-1.5">
                                      <CheckCircle2 className="w-3 h-3 text-[var(--text-primary)] shrink-0 mt-0.5" />
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Key Engineering Projects with Live Interactive Prototype Triggers */}
                        <div className="space-y-2.5">
                          <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
                            <FolderGit2 className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                            <span>SIGNATURE SYSTEMS &amp; INTERACTIVE PROTOTYPES</span>
                          </div>
                          <div className="space-y-2.5">
                            {founder.projects.map((proj) => (
                              <div
                                key={proj.name}
                                className="p-3.5 rounded-2xl surface-elevated space-y-2"
                              >
                                <div className="flex flex-wrap items-center justify-between gap-2">
                                  <div className="font-display font-bold text-xs sm:text-sm text-[var(--text-primary)]">
                                    {proj.name} •{' '}
                                    <span className="font-normal text-[var(--text-secondary)]">
                                      {proj.subtitle}
                                    </span>
                                  </div>
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    {proj.liveSiteUrl && (
                                      <a
                                        href={proj.liveSiteUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg btn-platinum-secondary font-mono-tech text-[10px] font-bold"
                                      >
                                        <span>Live Site</span>
                                        <ArrowUpRight className="w-3 h-3" />
                                      </a>
                                    )}
                                    <button
                                      type="button"
                                      onClick={() => setActiveArtifactId(proj.artifactId)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg btn-platinum-primary font-mono-tech text-[10px] font-bold cursor-pointer"
                                    >
                                      <span>Launch Live Prototype</span>
                                      <ArrowUpRight className="w-3 h-3" />
                                    </button>
                                  </div>
                                </div>
                                <div className="font-mono-tech text-[10px] text-[#71717A] dark:text-[#A1A1AA]">
                                  Stack: {proj.stack}
                                </div>
                                <ul className="space-y-1 text-[11px] text-[var(--text-secondary)]">
                                  {proj.highlights.map((h) => (
                                    <li key={h} className="flex items-start gap-1.5">
                                      <CheckCircle2 className="w-3 h-3 text-[var(--text-primary)] shrink-0 mt-0.5" />
                                      <span>{h}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] flex items-center gap-1.5">
                            <Award className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                            <span>VERIFIED CERTIFICATIONS &amp; CREDENTIALS</span>
                          </div>
                          <div className="grid grid-cols-1 gap-1.5">
                            {founder.certifications.map((cert) => (
                              <div
                                key={cert}
                                className="flex items-center gap-2 text-[11px] text-[var(--text-secondary)]"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-[var(--text-primary)] shrink-0" />
                                <span>{cert}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3 text-xs">
                        <span className="inline-flex items-center gap-1.5 font-mono-tech text-[10px] text-[var(--text-muted)]">
                          <MapPin className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                          <span>{founder.location}</span>
                        </span>
                        <span className="font-mono-tech text-[10px] text-[var(--text-primary)] font-semibold">
                          SKYLINE DIGITAL AGENCY
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* 3 Core Doctrine Pillars */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="surface-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6 border-t border-white/15 group">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-sm dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 dark:shadow-inner flex items-center justify-center text-[var(--text-primary)] group-hover:scale-105 transition-transform">
                    <Cpu className="w-5 h-5 text-[var(--text-primary)]" />
                  </div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    DOCTRINE PILLAR • ARCHITECTURE
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    First-Principles Software Architecture
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    We never ship sluggish page-builder templates. Every platform is engineered from scratch on Next.js 15, TypeScript, Java 21, Node.js, and PostgreSQL for sub-second speed and bank-grade reliability.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono-tech text-xs">
                  <span className="text-[var(--text-muted)]">BENCHMARK</span>
                  <span className="font-bold text-[var(--text-primary)]">99/100 Lighthouse SLA</span>
                </div>
              </div>

              <div className="surface-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6 border-t border-white/15 group">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-sm dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 dark:shadow-inner flex items-center justify-center text-[var(--text-primary)] group-hover:scale-105 transition-transform">
                    <Zap className="w-5 h-5 text-[var(--text-primary)]" />
                  </div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    DOCTRINE PILLAR • TRANSPARENCY
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Proof Before Promises
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    Use our interactive 60-second estimator or request a complimentary 15-minute technical and funnel teardown on WhatsApp so you see exact milestones, deliverables, and ROI projections before you pay.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono-tech text-xs">
                  <span className="text-[var(--text-muted)]">SCOPE CLARITY</span>
                  <span className="font-bold text-[var(--text-primary)]">Fixed-Milestone Delivery</span>
                </div>
              </div>

              <div className="surface-card rounded-3xl p-7 sm:p-8 flex flex-col justify-between space-y-6 border-t border-white/15 group">
                <div className="space-y-4">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-b from-white to-zinc-100 border border-zinc-300/80 shadow-sm dark:from-zinc-800/90 dark:to-zinc-950 dark:border-white/15 dark:shadow-inner flex items-center justify-center text-[var(--text-primary)] group-hover:scale-105 transition-transform">
                    <ShieldCheck className="w-5 h-5 text-[var(--text-primary)]" />
                  </div>
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    DOCTRINE PILLAR • REVENUE ENGINE
                  </div>
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-[var(--text-primary)]">
                    Full-Funnel Ownership
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                    A great website without traffic, or traffic without instant WhatsApp follow-up, leaks revenue. We unify your web platform, 24/7 WhatsApp AI bot, Google Map Pack #Top SEO, and Meta/Google CAPI ads under one roof.
                  </p>
                </div>
                <div className="pt-4 border-t border-[var(--border-hairline)] flex items-center justify-between font-mono-tech text-xs">
                  <span className="text-[var(--text-muted)]">CLIENT RIGHTS</span>
                  <span className="font-bold text-[var(--text-primary)]">100% Source Code &amp; Data</span>
                </div>
              </div>
            </div>

            {/* Live Interactive Telemetry Strip */}
            <div className="surface-card rounded-3xl p-6 sm:p-8 grid grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { value: '< 85ms', label: 'Average Edge Page Load', note: 'Next.js 15 + Redis SSR' },
                { value: '< 2s', label: 'WhatsApp AI Lead Reply', note: '24/7 Official Cloud API' },
                { value: '4.4x', label: 'Verified Blended ROAS', note: 'Server-Side Meta CAPI' },
                { value: '100%', label: 'Code & Account Ownership', note: 'Zero Lock-In Retainers' },
              ].map((stat) => (
                <div key={stat.label} className="space-y-1">
                  <div className="font-display text-2xl sm:text-4xl font-extrabold text-[var(--text-primary)] tabular-nums">
                    {stat.value}
                  </div>
                  <div className="font-display text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                    {stat.label}
                  </div>
                  <div className="font-mono-tech text-[11px] text-[var(--text-muted)]">
                    {stat.note}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Case Study Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className="surface-card rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl my-auto border border-[var(--border-strong)]"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-56 sm:h-64 border-b border-[var(--border-hairline)]">
              <ArchitecturalProjectMockup project={selectedProject} />
              <button
                type="button"
                onClick={() => setSelectedProject(null)}
                aria-label="Close Case Study Modal"
                className="absolute top-3 right-3 z-20 p-2 rounded-full bg-zinc-900/90 text-white hover:bg-zinc-800 border border-zinc-700 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] mb-1">
                  {selectedProject.clientType || selectedProject.locationTag} •{' '}
                  {selectedProject.categoryTag || selectedProject.category}
                </div>
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[var(--text-primary)]">
                  {selectedProject.title}
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] mt-2">
                  {selectedProject.summary || selectedProject.architectureSummary}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="surface-elevated rounded-2xl p-4 space-y-1.5">
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)] font-semibold">
                    THE BOTTLENECK
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {selectedProject.challenge ||
                      selectedProject.problemStatement ||
                      'Legacy architecture and manual lead handling limited conversion velocity.'}
                  </p>
                </div>
                <div className="surface-elevated rounded-2xl p-4 space-y-1.5">
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-primary)] font-semibold">
                    THE SKYLINE ARCHITECTURE
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] leading-relaxed">
                    {selectedProject.solution ||
                      selectedProject.architectureSummary ||
                      'Deployed a custom high-speed stack with automated WhatsApp and CRM routing.'}
                  </p>
                </div>
              </div>

              {selectedProject.results && selectedProject.results.length > 0 && (
                <div className="space-y-2">
                  <div className="font-mono-tech text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                    VERIFIED PRODUCTION OUTCOMES
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedProject.results.map((res: string) => (
                      <div
                        key={res}
                        className="flex items-center gap-2.5 p-3 rounded-xl surface-elevated text-xs font-medium text-[var(--text-primary)]"
                      >
                        <CheckCircle2 className="w-4 h-4 text-[var(--text-primary)] shrink-0" />
                        <span>{res}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      const artId = selectedProject.artifactId || '360-views';
                      setSelectedProject(null);
                      setActiveArtifactId(artId);
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full btn-platinum-secondary text-xs font-bold cursor-pointer"
                  >
                    <span>Launch Live Interactive Prototype</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </button>

                  {selectedProject.liveSiteUrl && (
                    <a
                      href={selectedProject.liveSiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full btn-platinum-secondary text-xs font-bold"
                    >
                      <span>Visit 360views.services</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setSelectedProject(null);
                    onNavigate('contact');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full btn-platinum-primary text-xs font-bold cursor-pointer"
                >
                  <span>Build Similar System</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Live Artifact Sandbox Modal */}
      <InteractiveArtifactModal
        artifactId={activeArtifactId}
        onClose={() => setActiveArtifactId(null)}
      />
    </div>
  );
};
