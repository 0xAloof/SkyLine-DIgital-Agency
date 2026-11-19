import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import {
  Activity,
  ArrowUpRight,
  Cloud,
  Cpu,
  Eye,
  FolderKanban,
  GitBranch,
  Globe,
  Layers,
  MapPin,
  Megaphone,
  MessageSquare,
  Quote,
  Search,
  ShoppingBag,
  Sparkles,
} from 'lucide-react';
import {
  HERO_ORBS,
  SHOWCASE_PROJECTS,
  VERIFIED_REVIEWS,
  FOUNDER_PROFILES,
  InteractiveArtifactId,
  ShowcaseProject,
  ClientReview,
} from '../data/agencyData';
import { PageId } from './Navbar';
import {
  WhatsAppBrandBadge,
  WhatsAppLogoIcon,
  GmailBrandIcon,
  OfficialTechStackFloatingBar,
} from './BrandIcons';
import { InteractiveArtifactModal } from './InteractiveArtifactModal';
import {
  SculptureMode,
  UseFrameKinematicState,
  computeFibonacciSphereNodes,
  computeMobileAdaptiveConfig,
  getMonochromaticPlatinumPalette,
  stepUseFrameKinematics,
} from '../utils/heroScene3DConfig';
import {
  detectSoftwareWebGL,
  disposeSceneGraph,
  useFrame,
} from '../utils/useThreeFrame';

interface HeroSectionProps {
  pageView?: 'home' | 'work' | 'who-we-are';
  onNavigate?: (pageId: PageId) => void;
  projects?: ShowcaseProject[];
  testimonials?: ClientReview[];
}

interface HeroCapabilityShowcaseItem {
  id: string;
  orbIndex: number;
  shortTitle: string;
  cyclingHeadline: string;
  badge: string;
  priceTag: string;
  accentHex: string;
  accentTextClass: string;
  summary: string;
  deliverables: string[];
  artifactId: InteractiveArtifactId;
  miniPreviewTitle: string;
  miniPreviewStat: string;
  miniPreviewSub: string;
}

const HERO_CAPABILITY_CARDS: HeroCapabilityShowcaseItem[] = [
  {
    id: 'web-saas',
    orbIndex: 0,
    shortTitle: 'Web & SaaS',
    cyclingHeadline: 'Custom SaaS Portals.',
    badge: 'NEXT.JS 15 • TYPESCRIPT • POSTGRESQL',
    priceTag: '₹10,000+ (Negotiable)',
    accentHex: '#18181B',
    accentTextClass: 'text-[var(--text-primary)]',
    summary:
      'High-speed business websites, custom admin portals, and multi-tenant SaaS dashboards engineered for instant mobile load.',
    deliverables: [
      'Next.js 15 + React 19 Full-Stack Architecture',
      'Role-Based Admin & GST Billing Portals',
      '30-Day Free Post-Launch Support & Full Code Ownership',
    ],
    artifactId: '360-views',
    miniPreviewTitle: '360° Spatial & SaaS Engine',
    miniPreviewStat: 'Instant Mobile Load',
    miniPreviewSub: 'Live Interactive Client Portals',
  },
  {
    id: 'whatsapp-ai',
    orbIndex: 1,
    shortTitle: 'WhatsApp AI',
    cyclingHeadline: '24/7 AI Lead Capture.',
    badge: 'OFFICIAL META WHATSAPP CLOUD API',
    priceTag: '₹10,000+ (Negotiable)',
    accentHex: '#18181B',
    accentTextClass: 'text-[var(--text-primary)]',
    summary:
      'Automated 24/7 WhatsApp booking bots that reply to inquiries in seconds, send PDF brochures, and lock appointment slots.',
    deliverables: [
      'Instant Catalog & PDF Brochure Dispatch',
      'Automated Slot Booking & Reminder Flows',
      'One-Click Human Sales Team Handover',
    ],
    artifactId: 'nexaprop-crm',
    miniPreviewTitle: 'WhatsApp AI Booking Flow',
    miniPreviewStat: '24/7 Instant Replies',
    miniPreviewSub: 'Automated Lead & Slot Capture',
  },
  {
    id: 'local-seo',
    orbIndex: 2,
    shortTitle: 'Local Search SEO',
    cyclingHeadline: 'Local Search Growth.',
    badge: 'GOOGLE MAP PACK #TOP • REVIEW AUTOMATION',
    priceTag: '₹10,000+ (Negotiable)',
    accentHex: '#18181B',
    accentTextClass: 'text-[var(--text-primary)]',
    summary:
      'Complete Google Business Profile optimization, local search ranking, and automated digital WhatsApp review links for clinics & stores.',
    deliverables: [
      'Google Map Pack Ranking for High-Intent Queries',
      'Automated Post-Visit WhatsApp Review Links',
      'Direct Call & Appointment Conversion Funnel',
    ],
    artifactId: 'auracare-local',
    miniPreviewTitle: 'AuraCare Clinic Map Pack',
    miniPreviewStat: '+240% Monthly Bookings',
    miniPreviewSub: '4.9★ Digital Review Pipeline',
  },
  {
    id: 'd2c-commerce',
    orbIndex: 4,
    shortTitle: 'D2C Commerce',
    cyclingHeadline: 'High-ROAS D2C Stores.',
    badge: '1-TAP UPI CHECKOUT • META CAPI',
    priceTag: '₹10,000+ (Negotiable)',
    accentHex: '#18181B',
    accentTextClass: 'text-[var(--text-primary)]',
    summary:
      'Conversion-engineered D2C storefronts with 1-Tap UPI checkout (GPay, PhonePe, Paytm), custom box builders, and WhatsApp cart recovery.',
    deliverables: [
      '1-Tap GPay / PhonePe / Paytm UPI Intent Flow',
      'Automated WhatsApp Abandoned Cart Recovery',
      'Server-Side Meta CAPI + GA4 Attribution',
    ],
    artifactId: 'aa-chocolates-d2c',
    miniPreviewTitle: 'A&A Artisan D2C Checkout',
    miniPreviewStat: '1-Tap UPI Intent',
    miniPreviewSub: 'Custom Hamper Builder + Cart Sync',
  },
];

const VISION_STATEMENT_WORDS =
  'We are a team of engineers and creators, blending custom software, AI automation, and clean design to build digital systems that turn visitors into paying customers.'.split(
    ' '
  );

const SACHIN_WHATSAPP_DIRECT =
  'https://wa.me/918959144686?text=Hi%20SkyLine%20Team%2C%20I%20visited%20your%20website%20and%20want%20to%20discuss%20a%20project.';

const FIBONACCI_SPHERE_NODES = computeFibonacciSphereNodes(
  HERO_ORBS.map((o) => ({ id: o.id, label: o.label })),
  1.52,
  0.88
);

function renderHeroOrbIcon(orbId: string, className = 'w-3.5 h-3.5 shrink-0') {
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
      return <GitBranch className={className} />;
    case 'local':
    default:
      return <MapPin className={className} />;
  }
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onNavigate,
  projects = SHOWCASE_PROJECTS,
  testimonials = VERIFIED_REVIEWS,
}) => {
  const [activeCardIndex, setActiveCardIndex] = useState<number>(0);
  const [activeOrbIndex, setActiveOrbIndex] = useState<number>(0);
  const [sculptureMode, setSculptureMode] = useState<SculptureMode>('dual-monolith');
  const [activeArtifact, setActiveArtifact] = useState<InteractiveArtifactId | null>(null);
  const [isAutoCycling, setIsAutoCycling] = useState<boolean>(true);
  const [illuminatedWordCount, setIlluminatedWordCount] = useState<number>(12);
  const [hoveredVisionIndex, setHoveredVisionIndex] = useState<number | null>(null);
  const [revealedFounderId, setRevealedFounderId] = useState<string>('sachin-sahu');

  const activeCard = HERO_CAPABILITY_CARDS[activeCardIndex] || HERO_CAPABILITY_CARDS[0];
  const activeOrb = HERO_ORBS[activeOrbIndex] || HERO_ORBS[0];

  // Refs for Three.js WebGL Stage & 3D-Projected Floating Capability Pills
  const mountRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rootGroupRef = useRef<THREE.Group | null>(null);
  const prismMeshRef = useRef<THREE.Mesh | null>(null);
  const innerCoreRef = useRef<THREE.Mesh | null>(null);
  const geodesicGroupRef = useRef<THREE.Group | null>(null);
  const orbNodeMeshesRef = useRef<THREE.Mesh[]>([]);
  const floatingPillElsRef = useRef<(HTMLButtonElement | null)[]>([]);
  const contactShadowElRef = useRef<HTMLDivElement | null>(null);
  const isSoftwareGlRef = useRef<boolean>(false);
  const scratchVecRef = useRef<THREE.Vector3>(new THREE.Vector3());

  const isDraggingRef = useRef<boolean>(false);
  const prevPointerRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const hoverParallaxRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
  const visionRef = useRef<HTMLDivElement | null>(null);

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

  // Auto-cycle the dynamic headline and active orb node unless user paused it
  useEffect(() => {
    if (!isAutoCycling) return;
    const timer = window.setInterval(() => {
      setActiveCardIndex((prev) => (prev + 1) % HERO_CAPABILITY_CARDS.length);
      setActiveOrbIndex((prev) => (prev + 1) % HERO_ORBS.length);
    }, 4200);
    return () => window.clearInterval(timer);
  }, [isAutoCycling]);

  // Rotate 3D sphere smoothly toward the selected orb node
  const selectHeroOrb = (orbIdx: number) => {
    setIsAutoCycling(false);
    setActiveOrbIndex(orbIdx);
    const matchingCardIdx = HERO_CAPABILITY_CARDS.findIndex((c) => c.orbIndex === orbIdx);
    if (matchingCardIdx >= 0) {
      setActiveCardIndex(matchingCardIdx);
    }
    const fib = FIBONACCI_SPHERE_NODES[orbIdx];
    if (fib) {
      kinematicStateRef.current.targetRotY = -Math.atan2(fib.x, fib.z);
      kinematicStateRef.current.targetRotX = Math.max(-0.48, Math.min(0.48, fib.y * 0.24));
    }
  };

  // Initialize Exact Monochromatic Three.js WebGL Geodesic Sphere with Vertex Dots + Faceted Crystalline Prism Monolith
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 330;
    const isSoftware = detectSoftwareWebGL();
    isSoftwareGlRef.current = isSoftware;
    const adaptive = computeMobileAdaptiveConfig(
      window.innerWidth,
      window.devicePixelRatio || 1,
      isSoftware
    );

    const isDarkInitial = document.documentElement.classList.contains('dark');
    const palette = getMonochromaticPlatinumPalette(isDarkInitial);

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      adaptive.cameraFov,
      width / Math.max(1, height),
      0.1,
      100
    );
    camera.position.set(0, 0.06, adaptive.cameraZ);
    cameraRef.current = camera;

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftware,
        alpha: true,
        powerPreference: 'high-performance',
      });
      renderer.setSize(width, height);
      renderer.setPixelRatio(adaptive.pixelRatio);
      container.innerHTML = '';
      container.appendChild(renderer.domElement);
      rendererRef.current = renderer;
    } catch {
      rendererRef.current = null;
    }

    // Studio Lighting for High-Contrast Faceted Prism Shading (Matches Reference Images)
    const ambientLight = new THREE.AmbientLight(palette.hemiSkyHex, 1.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(palette.keyLightHex, 2.65);
    keyLight.position.set(4.5, 6.2, 5.5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(palette.rimLightHex, 1.85);
    rimLight.position.set(-5.2, -3.5, 3.8);
    scene.add(rimLight);

    const fillLight = new THREE.PointLight(palette.hemiGroundHex, 1.45, 16);
    fillLight.position.set(3.2, -2.8, 3.5);
    scene.add(fillLight);

    // Root Group for 3D Core
    const rootGroup = new THREE.Group();
    rootGroup.position.set(0, 0.06, 0);
    scene.add(rootGroup);
    rootGroupRef.current = rootGroup;

    // 1. Inner Faceted Crystalline Prism Monolith (8 Multi-Tone Facets + Crisp High-Contrast Edge Lines)
    const prismGeo = new THREE.OctahedronGeometry(0.88, 0).toNonIndexed();
    const applyPrismFacetColors = (geom: THREE.BufferGeometry, darkTheme: boolean) => {
      const facetHexes = darkTheme
        ? [0xf4f4f5, 0x71717a, 0xd4d4d8, 0x3f3f46, 0xa1a1aa, 0x52525b, 0xe4e4e7, 0x27272a]
        : [0x18181b, 0x71717a, 0x27272a, 0xd4d4d8, 0x3f3f46, 0xa1a1aa, 0x09090b, 0x52525b];
      const posCount = geom.getAttribute('position').count;
      const colors = new Float32Array(posCount * 3);
      const tmpColor = new THREE.Color();
      for (let i = 0; i < posCount; i += 3) {
        const faceIndex = Math.floor(i / 3) % facetHexes.length;
        tmpColor.setHex(facetHexes[faceIndex]);
        for (let v = 0; v < 3; v++) {
          colors[(i + v) * 3] = tmpColor.r;
          colors[(i + v) * 3 + 1] = tmpColor.g;
          colors[(i + v) * 3 + 2] = tmpColor.b;
        }
      }
      geom.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    };
    applyPrismFacetColors(prismGeo, isDarkInitial);

    const prismMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
    });
    const prismMesh = new THREE.Mesh(prismGeo, prismMat);
    rootGroup.add(prismMesh);
    prismMeshRef.current = prismMesh;

    const prismEdgesGeo = new THREE.EdgesGeometry(new THREE.OctahedronGeometry(0.89, 0));
    const prismEdgesMat = new THREE.LineBasicMaterial({
      color: isDarkInitial ? 0xffffff : 0xf4f4f5,
      transparent: true,
      opacity: 0.95,
    });
    const prismEdges = new THREE.LineSegments(prismEdgesGeo, prismEdgesMat);
    prismMesh.add(prismEdges);

    // Counter-Rotating Inner Faceted Core
    const innerCoreGeo = new THREE.OctahedronGeometry(0.56, 0).toNonIndexed();
    applyPrismFacetColors(innerCoreGeo, !isDarkInitial);
    const innerCoreMat = new THREE.MeshBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
    });
    const innerCore = new THREE.Mesh(innerCoreGeo, innerCoreMat);
    rootGroup.add(innerCore);
    innerCoreRef.current = innerCore;

    // 2. Outer 360° Geodesic Wireframe Sphere + Solid Vertex Dots at Every Vertex
    const geodesicGroup = new THREE.Group();
    rootGroup.add(geodesicGroup);
    geodesicGroupRef.current = geodesicGroup;

    const sphereRadius = 1.52;
    const sphereGeo = new THREE.IcosahedronGeometry(sphereRadius, 2);
    const sphereMat = new THREE.MeshBasicMaterial({
      color: palette.sphereWireframeHex,
      wireframe: true,
      transparent: true,
      opacity: 0.42,
    });
    const sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
    geodesicGroup.add(sphereMesh);

    // Extract unique vertices of the IcosahedronGeometry and place a solid vertex sphere dot at every vertex
    const posAttr = sphereGeo.getAttribute('position');
    const uniqueVertexMap = new Map<string, THREE.Vector3>();
    for (let i = 0; i < posAttr.count; i++) {
      const vx = posAttr.getX(i);
      const vy = posAttr.getY(i);
      const vz = posAttr.getZ(i);
      const key = `${vx.toFixed(3)},${vy.toFixed(3)},${vz.toFixed(3)}`;
      if (!uniqueVertexMap.has(key)) {
        uniqueVertexMap.set(key, new THREE.Vector3(vx, vy, vz));
      }
    }

    const vertexDotGeo = new THREE.SphereGeometry(0.036, 10, 10);
    const vertexDotMat = new THREE.MeshBasicMaterial({
      color: palette.sphereVertexNodeHex,
    });
    uniqueVertexMap.forEach((vPos) => {
      const dotMesh = new THREE.Mesh(vertexDotGeo, vertexDotMat);
      dotMesh.position.copy(vPos);
      geodesicGroup.add(dotMesh);
    });

    // Two Tilted 3D Orbital Rings Orbiting the Geodesic Sphere
    const ringGeo1 = new THREE.TorusGeometry(1.86, 0.009, 12, 100);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: palette.orbitalRingHex,
      transparent: true,
      opacity: 0.48,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 2.35;
    ringMesh1.rotation.y = -Math.PI / 7;
    geodesicGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(1.78, 0.008, 12, 96);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: palette.orbitalRingHex,
      transparent: true,
      opacity: 0.34,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = Math.PI / 3.1;
    ringMesh2.rotation.y = Math.PI / 3.4;
    geodesicGroup.add(ringMesh2);

    // 7 Anchor Node Meshes for 3D-to-2D Floating Capability Pill Projection
    const createdNodes: THREE.Mesh[] = [];
    const anchorGeo = new THREE.SphereGeometry(0.06, 12, 12);
    FIBONACCI_SPHERE_NODES.forEach((pt) => {
      const anchorMat = new THREE.MeshBasicMaterial({
        color: palette.activeSatelliteHex,
      });
      const nodeMesh = new THREE.Mesh(anchorGeo, anchorMat);
      nodeMesh.position.set(pt.x, pt.y, pt.z);
      geodesicGroup.add(nodeMesh);
      createdNodes.push(nodeMesh);
    });
    orbNodeMeshesRef.current = createdNodes;

    // Live Theme Sync when user switches Light / Dark mode
    const applyThemePalette = () => {
      const darkNow = document.documentElement.classList.contains('dark');
      const nextPal = getMonochromaticPlatinumPalette(darkNow);
      ambientLight.color.setHex(nextPal.hemiSkyHex);
      keyLight.color.setHex(nextPal.keyLightHex);
      rimLight.color.setHex(nextPal.rimLightHex);
      fillLight.color.setHex(nextPal.hemiGroundHex);
      applyPrismFacetColors(prismGeo, darkNow);
      applyPrismFacetColors(innerCoreGeo, !darkNow);
      prismEdgesMat.color.setHex(darkNow ? 0xffffff : 0xf4f4f5);
      sphereMat.color.setHex(nextPal.sphereWireframeHex);
      vertexDotMat.color.setHex(nextPal.sphereVertexNodeHex);
      ringMat1.color.setHex(nextPal.orbitalRingHex);
      ringMat2.color.setHex(nextPal.orbitalRingHex);
      createdNodes.forEach((n) => {
        (n.material as THREE.MeshBasicMaterial).color.setHex(nextPal.activeSatelliteHex);
      });
    };

    const themeObserver = new MutationObserver(applyThemePalette);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = mountRef.current.clientWidth || 520;
      const h = mountRef.current.clientHeight || 330;
      cameraRef.current.aspect = w / Math.max(1, h);
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      themeObserver.disconnect();
      window.removeEventListener('resize', handleResize);
      disposeSceneGraph(scene);
      if (rendererRef.current) {
        rendererRef.current.dispose();
        rendererRef.current = null;
      }
    };
  }, []);

  // Drive 60fps Three.js kinematics + 3D-to-2D Floating Capability Pill Projection via useFrame
  useFrame(
    (frameState) => {
      const state = kinematicStateRef.current;
      stepUseFrameKinematics(state, frameState.delta, {
        isDragging: isDraggingRef.current,
        hoverParallaxX: hoverParallaxRef.current.x,
        hoverParallaxY: hoverParallaxRef.current.y,
        activeOrbIndex,
        mode: sculptureMode,
        dampingLambda: 8.5,
        maxDeltaSeconds: 0.05,
      });

      if (rootGroupRef.current) {
        rootGroupRef.current.position.y = 0.06 + state.floatY;
        rootGroupRef.current.rotation.x = state.curRotX;
        rootGroupRef.current.rotation.y = state.curRotY;
      }

      if (prismMeshRef.current) {
        prismMeshRef.current.rotation.x = state.prismRotX;
        prismMeshRef.current.rotation.y = state.prismRotY;
        prismMeshRef.current.scale.setScalar(state.curPrismScale);
      }

      if (innerCoreRef.current) {
        innerCoreRef.current.rotation.y = -state.prismRotY * 1.4;
        innerCoreRef.current.rotation.z = state.prismRotX;
        innerCoreRef.current.scale.setScalar(state.curPrismScale);
      }

      if (geodesicGroupRef.current) {
        geodesicGroupRef.current.scale.setScalar(state.curSphereScale);
        geodesicGroupRef.current.rotation.y = state.elapsedSeconds * 0.14;
      }

      if (contactShadowElRef.current) {
        contactShadowElRef.current.style.transform = `translateX(-50%) scale(${state.shadowScale})`;
        contactShadowElRef.current.style.opacity = `${state.shadowOpacity}`;
      }

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        sceneRef.current.updateMatrixWorld();
        rendererRef.current.render(sceneRef.current, cameraRef.current);

        // Project 7 3D capability nodes onto 2D stage coordinates for floating pills
        const container = mountRef.current;
        if (container) {
          const cw = container.clientWidth || 520;
          const ch = container.clientHeight || 330;
          const scratch = scratchVecRef.current;

          orbNodeMeshesRef.current.forEach((nodeMesh, idx) => {
            const pillEl = floatingPillElsRef.current[idx];
            if (!pillEl) return;

            nodeMesh.getWorldPosition(scratch);
            const worldZ = scratch.z;
            scratch.project(cameraRef.current!);

            const screenX = (scratch.x * 0.5 + 0.5) * cw;
            const screenY = (-scratch.y * 0.5 + 0.5) * ch;

            // Depth cueing: front hemisphere (worldZ >= 0) vs back hemisphere (worldZ < 0)
            const depthNorm = Math.max(-1, Math.min(1, worldZ / 1.55));
            const isActive = idx === activeOrbIndex;
            const scale = isActive
              ? 1.06
              : Number((0.84 + (depthNorm + 1) * 0.11).toFixed(3));
            const opacity = isActive
              ? 1
              : Number((0.36 + (depthNorm + 1) * 0.32).toFixed(2));
            const zIndex = isActive ? 35 : Math.round((depthNorm + 1) * 12) + 10;

            pillEl.style.transform = `translate3d(${screenX.toFixed(1)}px, ${screenY.toFixed(1)}px, 0) translate(-50%, -50%) scale(${scale})`;
            pillEl.style.opacity = `${opacity}`;
            pillEl.style.zIndex = `${zIndex}`;
          });
        }
      }
    },
    {
      containerRef: mountRef,
      rendererRef,
      isSoftwareGlRef,
      enabled: true,
    }
  );

  // Scroll listener to progressively illuminate words in the Vision Statement below Hero
  useEffect(() => {
    const handleScrollVision = () => {
      const el = visionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const progress = Math.max(
        0.25,
        Math.min(1, (vh * 0.88 - rect.top) / Math.max(240, rect.height + vh * 0.38))
      );
      setIlluminatedWordCount(
        Math.max(8, Math.round(progress * VISION_STATEMENT_WORDS.length))
      );
    };
    handleScrollVision();
    window.addEventListener('scroll', handleScrollVision, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollVision);
  }, []);

  const handleNavClick = (pageId: PageId) => {
    if (onNavigate) {
      onNavigate(pageId);
    }
  };

  const handleStagePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    isDraggingRef.current = true;
    setIsAutoCycling(false);
    prevPointerRef.current = { x: e.clientX, y: e.clientY };
  };

  const handleStagePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - rect.left) / Math.max(1, rect.width) - 0.5) * 2;
    const ny = ((e.clientY - rect.top) / Math.max(1, rect.height) - 0.5) * 2;
    hoverParallaxRef.current = { x: nx * 0.25, y: ny * 0.25 };

    if (isDraggingRef.current) {
      const dx = e.clientX - prevPointerRef.current.x;
      const dy = e.clientY - prevPointerRef.current.y;
      prevPointerRef.current = { x: e.clientX, y: e.clientY };
      kinematicStateRef.current.targetRotY += dx * 0.011;
      kinematicStateRef.current.targetRotX = Math.max(
        -0.85,
        Math.min(0.85, kinematicStateRef.current.targetRotX + dy * 0.009)
      );
    }
  };

  const handleStagePointerUp = () => {
    isDraggingRef.current = false;
  };

  const topFiveOrbs = HERO_ORBS.slice(0, 5);
  const bottomTwoOrbs = HERO_ORBS.slice(5, 7);

  return (
    <section
      id="home"
      className="relative pt-3 sm:pt-5 pb-16 overflow-hidden select-none bg-[var(--bg-canvas)]"
    >
      {/* Subtle Monochromatic Studio Lighting Backdrop */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-[580px] opacity-60 dark:opacity-35"
        style={{
          background:
            'radial-gradient(65% 50% at 50% 0%, rgba(24, 24, 27, 0.06) 0%, rgba(113, 113, 122, 0.03) 48%, transparent 100%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* =====================================================================
            MAIN 2-COLUMN VERCEL + 3D WEBGL HERO LAYOUT
           ===================================================================== */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* LEFT COLUMN (6 Cols): Dynamic Cycling Headline, Value Proposition, CTAs & 3 Verified Trust Cards */}
          <div className="lg:col-span-6 space-y-6">
            {/* Eyebrow Pill */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full surface-card border border-[var(--border-strong)] shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[var(--text-primary)] animate-pulse" />
              <span className="font-mono-tech text-[11px] font-bold uppercase tracking-wider text-[var(--text-primary)]">
                FULL-STACK WEB, AI AUTOMATION &amp; GROWTH AGENCY
              </span>
            </div>

            {/* Dynamic Cycling Headline */}
            <h1 className="font-display font-extrabold text-[2.15rem] sm:text-5xl lg:text-[3.2rem] tracking-[-0.03em] text-[var(--text-primary)] leading-[1.08]">
              Fast Web Software, WhatsApp Automation, and{' '}
              <span
                key={activeCard.id}
                data-testid="hero-cycling-headline"
                className="inline-block font-serif-editorial italic font-semibold transition-all duration-500 text-platinum-gradient"
              >
                {activeCard.cyclingHeadline}
              </span>
            </h1>

            {/* Clear Subheadline with ₹10,000 Starting & Negotiable Pricing */}
            <p className="font-sans-body text-sm sm:text-base lg:text-[16.5px] text-[var(--text-secondary)] leading-relaxed max-w-2xl">
              We build high-converting websites, custom web apps, 24/7 WhatsApp booking bots, and Google Maps growth systems for clinics, D2C brands, and growing startups.{' '}
              <span className="font-semibold text-[var(--text-primary)]">
                Packages start at ₹10,000 and are flexible and open to negotiation based on your project scope.
              </span>
            </p>

            {/* Primary & Secondary Action Row (Black Explore Services + Official Green WhatsApp) */}
            <div className="flex flex-wrap items-center gap-3.5 pt-1">
              <button
                type="button"
                data-testid="hero-explore-services-btn"
                onClick={() => handleNavClick('services')}
                className="px-6 py-3.5 rounded-full bg-[#09090B] text-[#FFFFFF] dark:bg-[#FFFFFF] dark:text-[#09090B] font-display font-semibold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md hover:opacity-90 transition-all cursor-pointer"
              >
                <span>Explore Services</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                href={SACHIN_WHATSAPP_DIRECT}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="hero-whatsapp-cta"
                className="px-6 py-3.5 rounded-full btn-whatsapp-official font-display font-semibold text-xs sm:text-sm inline-flex items-center gap-2.5 shadow-md transition-all cursor-pointer"
              >
                <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                <span>Chat on WhatsApp</span>
              </a>

              <button
                type="button"
                onClick={() => setActiveArtifact(activeOrb.artifactId || activeCard.artifactId)}
                className="px-4 py-3 rounded-full surface-card border border-[var(--border-strong)] hover:border-[var(--text-primary)] text-xs font-semibold text-[var(--text-primary)] inline-flex items-center gap-2 transition-all cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5 text-[var(--text-primary)]" />
                <span>Launch Live Prototype</span>
              </button>
            </div>

            {/* 3 Verified Proof Cards (Zero Overclaiming, Real Pricing & Support) */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-2xl surface-card border border-[var(--border-hairline)]">
                <div className="font-display font-extrabold text-sm sm:text-lg text-[var(--text-primary)]">
                  Starts at ₹10,000
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  Flexible &amp; Open to Negotiation
                </div>
              </div>

              <div className="p-3.5 rounded-2xl surface-card border border-[var(--border-hairline)]">
                <div className="font-display font-extrabold text-sm sm:text-lg text-[var(--text-primary)]">
                  1 to 4 Weeks
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  Fast Milestone Delivery
                </div>
              </div>

              <div className="p-3.5 rounded-2xl surface-card border border-[var(--border-hairline)]">
                <div className="font-display font-extrabold text-sm sm:text-lg text-[var(--text-primary)]">
                  30-Day Support
                </div>
                <div className="text-[11px] text-[var(--text-secondary)] mt-0.5">
                  Free Post-Launch Care
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN (6 Cols): Exact 3D Floating Sphere & Prism Monolith Card (Matching Reference Images 100%) */}
          <div className="lg:col-span-6">
            <div
              data-testid="hero-3d-showcase"
              className="rounded-[28px] bg-[#ECECEE] dark:bg-[#121215] border border-[#D4D4D8] dark:border-[#27272A] p-4 sm:p-6 shadow-2xl relative overflow-hidden"
            >
              {/* TOP HEADER ROW: ● 3D FLOATING SPHERE & PRISM MONOLITH + Segmented Pill Control */}
              <div className="flex flex-wrap xl:flex-nowrap items-center justify-between gap-2 pb-3.5 border-b border-[#D4D4D8] dark:border-[#27272A] relative z-20">
                <div className="flex items-center gap-2 shrink-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#09090B] dark:bg-[#FFFFFF] shrink-0" />
                  <span className="font-display text-[10.5px] sm:text-[11px] font-extrabold uppercase tracking-[0.04em] text-[#09090B] dark:text-[#FFFFFF] whitespace-nowrap">
                    3D FLOATING SPHERE &amp; PRISM MONOLITH
                  </span>
                </div>

                {/* Segmented Pill Switcher: DUAL MONOLITH | PRISM CORE | GEODESIC SPHERE */}
                <div className="inline-flex items-center rounded-full p-1 bg-[#D4D4D8] dark:bg-[#1F1F24] border border-[#A1A1AA]/40 dark:border-[#27272A] shrink-0">
                  {(
                    [
                      { id: 'dual-monolith', label: 'DUAL MONOLITH' },
                      { id: 'prism-core', label: 'PRISM CORE' },
                      { id: 'geodesic-sphere', label: 'GEODESIC SPHERE' },
                    ] as const
                  ).map((m) => {
                    const isModeActive = sculptureMode === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setSculptureMode(m.id)}
                        className={`px-2 sm:px-2.5 py-1 rounded-full font-display text-[8.5px] sm:text-[9px] font-extrabold tracking-wider uppercase cursor-pointer transition-all whitespace-nowrap ${
                          isModeActive
                            ? 'bg-[#FFFFFF] text-[#09090B] shadow-xs'
                            : 'text-[#3F3F46] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-[#FFFFFF]'
                        }`}
                      >
                        {m.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* SUB-HEADER TELEMETRY ROW: PLATINUM WEBGL • DRAG OR HOVER TO ORBIT + Active Node Locked */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-3 pb-1 text-[10px] sm:text-[11px] relative z-20">
                <span className="font-mono-tech uppercase tracking-[0.08em] text-[#71717A] dark:text-[#71717A] font-medium">
                  PLATINUM WEBGL • DRAG OR HOVER TO ORBIT
                </span>
                <span className="inline-flex items-center gap-1.5 font-display font-bold text-[#09090B] dark:text-[#FFFFFF]">
                  <Activity className="w-3.5 h-3.5 text-[#09090B] dark:text-[#FFFFFF]" />
                  <span>{activeOrb.label} NODE LOCKED</span>
                </span>
              </div>

              {/* 3D WEBGL STAGE + 3D-PROJECTED FLOATING CAPABILITY NODE PILLS */}
              <div
                onPointerDown={handleStagePointerDown}
                onPointerMove={handleStagePointerMove}
                onPointerUp={handleStagePointerUp}
                onPointerLeave={handleStagePointerUp}
                className="relative h-[290px] sm:h-[330px] w-full flex items-center justify-center overflow-hidden my-1 cursor-grab active:cursor-grabbing"
              >
                {/* Live Three.js WebGL Mount Container */}
                <div
                  ref={mountRef}
                  data-testid="hero-threejs-canvas-mount"
                  className="relative z-10 w-full h-full"
                />

                {/* 3D-Projected Floating Capability Pills Orbiting in 3D Space (Cursor-Follow onMouseEnter) */}
                <div className="pointer-events-none absolute inset-0 z-20 overflow-hidden">
                  {HERO_ORBS.map((orb, idx) => {
                    const isOrbActive = idx === activeOrbIndex;
                    return (
                      <button
                        key={orb.id}
                        ref={(el) => {
                          floatingPillElsRef.current[idx] = el;
                        }}
                        type="button"
                        data-testid={`hero-3d-floating-pill-${orb.id}`}
                        onMouseEnter={() => selectHeroOrb(idx)}
                        onFocus={() => selectHeroOrb(idx)}
                        onClick={(e) => {
                          e.stopPropagation();
                          selectHeroOrb(idx);
                        }}
                        style={{
                          left: 0,
                          top: 0,
                          transform: 'translate3d(240px, 160px, 0) translate(-50%, -50%)',
                        }}
                        className={`pointer-events-auto absolute inline-flex items-center gap-1.5 rounded-full whitespace-nowrap shrink-0 transition-colors duration-200 cursor-pointer ${
                          isOrbActive
                            ? 'px-4 py-1.5 bg-[#FFFFFF] text-[#09090B] border-2 border-[#18181B] dark:border-[#FFFFFF] font-display font-extrabold text-xs shadow-lg'
                            : 'px-3 py-1 bg-[#E4E4E7]/95 dark:bg-[#18181B]/95 text-[#09090B] dark:text-[#F4F4F5] border border-[#52525B]/60 dark:border-[#52525B] font-display font-bold text-[11px] backdrop-blur-xs hover:bg-[#09090B] hover:text-[#FFFFFF] dark:hover:bg-[#FFFFFF] dark:hover:text-[#09090B]'
                        }`}
                      >
                        {renderHeroOrbIcon(orb.id, isOrbActive ? 'w-3.5 h-3.5 shrink-0' : 'w-3 h-3 shrink-0')}
                        <span className="whitespace-nowrap">{orb.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Soft Elliptical Breathing Contact Shadow Under 3D Sphere */}
                <div
                  ref={contactShadowElRef}
                  className="pointer-events-none absolute bottom-2 left-1/2 -translate-x-1/2 w-52 h-6 rounded-full bg-black/20 dark:bg-black/65 blur-md"
                />
              </div>

              {/* BOTTOM 7-PILL CAPABILITY SELECTOR BAR (5 on Row 1 + 2 on Row 2 Left/Right • Cursor-Follow onMouseEnter) */}
              <div className="pt-4 border-t border-[#D4D4D8] dark:border-[#27272A] space-y-2.5 relative z-20">
                {/* Row 1: 5 Capability Pills (AI Agents, Paid Ads, SaaS & Cloud, Web & Apps, SEO & AEO) */}
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-1.5">
                  {topFiveOrbs.map((orb, idx) => {
                    const isOrbActive = idx === activeOrbIndex;
                    return (
                      <button
                        key={orb.id}
                        type="button"
                        data-testid={`hero-orb-pill-${orb.id}`}
                        onMouseEnter={() => selectHeroOrb(idx)}
                        onFocus={() => selectHeroOrb(idx)}
                        onClick={() => selectHeroOrb(idx)}
                        className={`px-2.5 py-2.5 rounded-2xl font-display text-[11px] font-bold inline-flex items-center justify-center gap-1.5 whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer border hover:-translate-y-0.5 ${
                          isOrbActive
                            ? 'bg-[#09090B] text-[#FFFFFF] border-[#09090B] dark:bg-[#FFFFFF] dark:text-[#09090B] dark:border-[#FFFFFF] shadow-md'
                            : 'bg-[#D4D4D8]/85 text-[#18181B] border-transparent dark:bg-[#1F1F24] dark:text-[#E4E4E7] hover:bg-[#09090B] hover:text-[#FFFFFF] dark:hover:bg-[#FFFFFF] dark:hover:text-[#09090B]'
                        }`}
                      >
                        {renderHeroOrbIcon(orb.id, 'w-3.5 h-3.5 shrink-0')}
                        <span className="whitespace-nowrap">{orb.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Row 2: 2 Capability Pills (CRM Funnels on Left, Local Growth on Right) */}
                <div className="flex items-center justify-between gap-2">
                  {bottomTwoOrbs.map((orb, offsetIdx) => {
                    const actualIdx = 5 + offsetIdx;
                    const isOrbActive = actualIdx === activeOrbIndex;
                    return (
                      <button
                        key={orb.id}
                        type="button"
                        data-testid={`hero-orb-pill-${orb.id}`}
                        onMouseEnter={() => selectHeroOrb(actualIdx)}
                        onFocus={() => selectHeroOrb(actualIdx)}
                        onClick={() => selectHeroOrb(actualIdx)}
                        className={`px-4 py-2.5 rounded-2xl font-display text-xs font-bold inline-flex items-center justify-center gap-2 whitespace-nowrap shrink-0 transition-all duration-200 cursor-pointer border min-w-[140px] sm:min-w-[165px] hover:-translate-y-0.5 ${
                          isOrbActive
                            ? 'bg-[#09090B] text-[#FFFFFF] border-[#09090B] dark:bg-[#FFFFFF] dark:text-[#09090B] dark:border-[#FFFFFF] shadow-md'
                            : 'bg-[#D4D4D8]/85 text-[#18181B] border-transparent dark:bg-[#1F1F24] dark:text-[#E4E4E7] hover:bg-[#09090B] hover:text-[#FFFFFF] dark:hover:bg-[#FFFFFF] dark:hover:text-[#09090B]'
                        }`}
                      >
                        {renderHeroOrbIcon(orb.id, 'w-3.5 h-3.5 shrink-0')}
                        <span className="whitespace-nowrap">{orb.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* =====================================================================
            4 INTERACTIVE VISUAL CAPABILITY SWITCHER CARDS BELOW HERO (CURSOR-FOLLOW + OFFICIAL WHATSAPP LOGO + CRISP CONTRAST)
           ===================================================================== */}
        <div
          data-testid="hero-capability-switcher-grid"
          className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5"
        >
          {HERO_CAPABILITY_CARDS.map((card, idx) => {
            const isSelected = idx === activeCardIndex;
            const isWhatsAppCard = card.id === 'whatsapp-ai';
            const CardIcon =
              idx === 0
                ? Layers
                : idx === 1
                ? MessageSquare
                : idx === 2
                ? MapPin
                : ShoppingBag;

            const activateCapabilityCard = () => {
              setIsAutoCycling(false);
              setActiveCardIndex(idx);
              setActiveOrbIndex(card.orbIndex);
            };

            return (
              <button
                key={card.id}
                type="button"
                data-testid={`hero-switcher-card-${card.id}`}
                onMouseEnter={activateCapabilityCard}
                onFocus={activateCapabilityCard}
                onClick={activateCapabilityCard}
                className={`group text-left p-4 rounded-2xl transition-all duration-200 cursor-pointer border hover:-translate-y-1.5 hover:shadow-xl ${
                  isSelected
                    ? 'bg-[#09090B] text-[#FFFFFF] dark:bg-[#F4F4F5] dark:text-[#09090B] border-[#09090B] dark:border-[#F4F4F5] shadow-lg'
                    : 'bg-[#E4E4E7] text-[#09090B] dark:bg-[#18181B] dark:text-[#F4F4F5] border-[#D4D4D8] dark:border-[#27272A] hover:bg-[#09090B] hover:text-[#FFFFFF] dark:hover:bg-[#F4F4F5] dark:hover:text-[#09090B] hover:border-[#09090B] dark:hover:border-[#F4F4F5]'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-2.5">
                  <div className="inline-flex items-center gap-2">
                    <span
                      className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-colors ${
                        isWhatsAppCard
                          ? 'bg-[#25D366] text-[#FFFFFF] shadow-xs'
                          : isSelected
                          ? 'bg-[#FFFFFF] text-[#09090B] dark:bg-[#09090B] dark:text-[#FFFFFF]'
                          : 'bg-[#09090B] text-[#FFFFFF] dark:bg-[#F4F4F5] dark:text-[#09090B] group-hover:bg-[#FFFFFF] group-hover:text-[#09090B] dark:group-hover:bg-[#09090B] dark:group-hover:text-[#FFFFFF]'
                      }`}
                    >
                      {isWhatsAppCard ? (
                        <WhatsAppLogoIcon className="w-4 h-4 text-[#FFFFFF]" />
                      ) : (
                        <CardIcon className="w-3.5 h-3.5" />
                      )}
                    </span>
                    <span className="font-display font-bold text-xs sm:text-sm text-current">
                      {card.shortTitle}
                    </span>
                  </div>

                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono-tech font-bold transition-colors ${
                      isSelected
                        ? 'bg-white/15 text-[#FFFFFF] dark:bg-black/15 dark:text-[#09090B]'
                        : 'bg-[#D4D4D8] text-[#09090B] dark:bg-[#27272A] dark:text-[#F4F4F5] group-hover:bg-white/15 group-hover:text-[#FFFFFF] dark:group-hover:bg-black/15 dark:group-hover:text-[#09090B]'
                    }`}
                  >
                    ₹10,000+
                  </span>
                </div>

                <div className="text-xs font-bold mb-1 truncate text-current">
                  {card.miniPreviewTitle}
                </div>
                <div
                  className={`text-[11px] truncate transition-colors ${
                    isSelected
                      ? 'text-[#D4D4D8] dark:text-[#3F3F46]'
                      : 'text-[#52525B] dark:text-[#A1A1AA] group-hover:text-[#D4D4D8] dark:group-hover:text-[#3F3F46]'
                  }`}
                >
                  {card.miniPreviewSub} • {card.miniPreviewStat}
                </div>
              </button>
            );
          })}
        </div>

        {/* =====================================================================
            SCROLL-ILLUMINATED VISION STATEMENT + SPOTLIGHT TECH DOCK
           ===================================================================== */}
        <div
          ref={visionRef}
          data-testid="hero-scroll-illuminated-vision"
          className="mt-12 p-6 sm:p-9 rounded-3xl surface-card border border-[var(--border-hairline)] relative overflow-hidden"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg heading-icon-blue flex items-center justify-center">
                <Cpu className="w-3.5 h-3.5 text-white" />
              </span>
              <span className="font-mono-tech text-[11px] font-bold uppercase tracking-widest text-[var(--text-primary)]">
                ENGINEERING PHILOSOPHY &amp; CORE STACK
              </span>
            </div>
            <span className="font-mono-tech text-[11px] text-[var(--text-muted)]">
              Hover or scroll to illuminate • Starts at ₹10,000
            </span>
          </div>

          <p
            onMouseLeave={() => setHoveredVisionIndex(null)}
            className="font-display text-xl sm:text-3xl lg:text-[2.1rem] font-bold leading-[1.3] tracking-[-0.02em]"
          >
            {VISION_STATEMENT_WORDS.map((word, idx) => {
              const isLit =
                hoveredVisionIndex !== null
                  ? idx <= hoveredVisionIndex + 2
                  : idx < illuminatedWordCount;
              return (
                <span
                  key={`${word}-${idx}`}
                  onMouseEnter={() => setHoveredVisionIndex(idx)}
                  className={`inline-block mr-2 transition-colors duration-300 cursor-default ${
                    isLit
                      ? 'text-[#09090B] dark:text-[#FFFFFF]'
                      : 'text-[#52525B]/55 dark:text-[#52525B]'
                  }`}
                >
                  {word}
                </span>
              );
            })}
          </p>
        </div>

        {/* =====================================================================
            TWO-LINE FLOATING TECH STACK SHOWCASE (16 OFFICIAL LOGOS & NAMES)
           ===================================================================== */}
        <div className="mt-10 pt-6 border-t border-[var(--border-hairline)]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
            <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[var(--text-primary)] font-bold">
              PRODUCTION ENGINEERING STACK • TWO-LINE FLOATING ARCHITECTURE
            </span>
            <span className="font-mono-tech text-[11px] text-[var(--text-secondary)]">
              Next.js 16 • TypeScript • Java 21 • Spring Boot • FastAPI &amp; SQL • PostgreSQL • AWS
            </span>
          </div>
          <OfficialTechStackFloatingBar />
        </div>
      </div>

      {/* =====================================================================
          MID-PAGE CONTRAST BAND: FEATURED PRODUCTION CASE STUDIES & LIVE WEBSITE PROTOTYPES
         ===================================================================== */}
      <div id="work" className="mt-16 py-16 sm:py-20 bg-section-alt">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-xl heading-icon-blue flex items-center justify-center shrink-0">
                  <FolderKanban className="w-4 h-4 text-white" />
                </div>
                <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[var(--text-primary)] font-bold">
                  PORTFOLIO &amp; FULL-SCREEN WEBSITE PROTOTYPES
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
                Featured Production Case Studies
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] max-w-md">
              Click <span className="font-semibold text-[var(--text-primary)]">"Launch Live Prototype"</span> on any project card below to open its full-screen standalone client website right inside your browser.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((proj) => {
              const fallbackArtifact: InteractiveArtifactId =
                proj.artifactId ||
                (proj.id.includes('360')
                  ? '360-views'
                  : proj.id.includes('shadow')
                  ? 'shadowbase-cdc'
                  : proj.id.includes('grid')
                  ? 'gridweaver-iot'
                  : proj.id.includes('shivangi')
                  ? 'shivangi-salon'
                  : proj.id.includes('localloom')
                  ? 'localloom-store'
                  : proj.id.includes('fileguard')
                  ? 'fileguard-security'
                  : proj.id.includes('career')
                  ? 'ai-career-mentor'
                  : proj.id.includes('socialite')
                  ? 'socialite-network'
                  : proj.id.includes('chocolates')
                  ? 'aa-chocolates-d2c'
                  : proj.id.includes('auracare')
                  ? 'auracare-local'
                  : proj.id.includes('finvantage')
                  ? 'finvantage-saas'
                  : 'nexaprop-crm');

              return (
                <article
                  key={proj.id}
                  data-testid={`project-card-${proj.id}`}
                  className="rounded-3xl surface-card overflow-hidden flex flex-col justify-between group hover:border-[var(--text-primary)] hover:-translate-y-2 hover:shadow-2xl transition-all duration-250"
                >
                  <div>
                    {/* Project Cover Image */}
                    <div className="relative h-52 w-full overflow-hidden bg-[var(--bg-elevated)] border-b border-[var(--border-hairline)]">
                      <img
                        src={proj.imageUrl || proj.fallbackSvgUrl}
                        alt={proj.title}
                        loading="lazy"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (proj.fallbackSvgUrl && target.src !== proj.fallbackSvgUrl) {
                            target.src = proj.fallbackSvgUrl;
                          }
                        }}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                      <div className="absolute top-3 left-3 right-3 flex items-center justify-between gap-2">
                        <span className="px-2.5 py-1 rounded-md bg-black/80 backdrop-blur-md text-white font-mono-tech text-[10px] font-semibold uppercase tracking-wider">
                          {proj.category}
                        </span>
                        {proj.leadArchitect && (
                          <span className="px-2.5 py-1 rounded-md bg-black/75 backdrop-blur-md text-zinc-100 font-mono-tech text-[10px] font-medium">
                            {proj.leadArchitect.split('—')[0].trim()}
                          </span>
                        )}
                      </div>

                      <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between gap-2">
                        <div>
                          <h3 className="font-display text-lg font-bold text-white leading-snug">
                            {proj.title}
                          </h3>
                          <p className="text-[11px] text-zinc-200 font-mono-tech mt-0.5">
                            {proj.locationTag} · <span className="text-white font-semibold">{proj.metricsHeadline}</span>
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Card Body — Crisp Readable Body Typography & Tech Stack Line */}
                    <div className="p-5 space-y-3.5">
                      <p className="font-sans-body text-[13.5px] sm:text-sm font-medium text-[var(--text-primary)] leading-relaxed">
                        {proj.metricsSub}
                      </p>

                      <div className="pt-3 border-t border-[var(--border-hairline)] flex flex-wrap items-center gap-1.5">
                        {(proj.techStack ?? proj.stackPills ?? proj.tags.split('•').map((s) => s.trim()))
                          .slice(0, 3)
                          .map((stackItem) => (
                            <span
                              key={stackItem}
                              className="px-2.5 py-1 rounded-lg surface-elevated font-mono-tech text-[11px] font-bold text-[var(--text-primary)] border border-[var(--border-hairline)]"
                            >
                              {stackItem}
                            </span>
                          ))}
                      </div>
                    </div>
                  </div>

                  {/* Interactive Prototype CTA Footer */}
                  <div className="px-5 pb-5 pt-2 flex items-center gap-2">
                    <button
                      type="button"
                      data-testid={`launch-prototype-${fallbackArtifact}`}
                      onClick={() => setActiveArtifact(fallbackArtifact)}
                      className="flex-1 py-2.5 px-3.5 rounded-xl btn-platinum-primary text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Launch Live Prototype</span>
                    </button>

                    {proj.liveSiteUrl && (
                      <a
                        href={proj.liveSiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2.5 px-3 rounded-xl btn-platinum-secondary text-xs font-semibold inline-flex items-center gap-1"
                        title={`Open ${proj.liveSiteUrl}`}
                      >
                        <span>Live Site</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 relative z-10">
        {/* =====================================================================
            WHO WE ARE: FOUNDERS & PRINCIPAL ARCHITECTS (SACHIN SAHU & AASHIF KHAN)
           ===================================================================== */}
        <div id="who-we-are" className="mt-16 pt-4">
          <div className="mb-10">
            <div className="inline-flex items-center gap-2.5 mb-2.5">
              <div className="w-8 h-8 rounded-xl heading-icon-emerald flex items-center justify-center shrink-0">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[var(--text-primary)] font-bold">
                WHO WE ARE • FOUNDING ARCHITECTS
              </span>
            </div>
            <h2 className="font-display text-2xl sm:text-4xl font-bold tracking-tight text-[var(--text-primary)]">
              Led Directly by the Engineers Who Build Your System
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {FOUNDER_PROFILES.map((founder) => {
              const isRevealed = revealedFounderId === founder.id;
              const revealButtonLabel =
                founder.id === 'aashif-khan'
                  ? 'Reveal Co-Founder & System Architect'
                  : 'Reveal Founder & CEO';

              return (
                <div
                  key={founder.id}
                  data-testid={`founder-flip-card-${founder.id}`}
                  style={{ perspective: '1400px' }}
                  className="relative min-h-[430px] rounded-3xl"
                >
                  <div
                    className={`w-full h-full rounded-3xl transition-all duration-500 ${
                      isRevealed
                        ? 'opacity-100 scale-100'
                        : 'opacity-100 scale-[0.99]'
                    }`}
                  >
                    {isRevealed ? (
                      /* REVEALED FOUNDER CHARACTER CARD */
                      <div
                        data-testid={`founder-card-revealed-${founder.id}`}
                        className="p-6 sm:p-7 rounded-3xl surface-card border-2 border-[var(--text-primary)] flex flex-col justify-between space-y-5 h-full shadow-xl"
                      >
                        <div className="space-y-4">
                          <div className="flex flex-wrap items-start justify-between gap-3">
                            <div className="flex items-center gap-3.5">
                              <div className="w-12 h-12 rounded-2xl bg-[#09090B] text-white dark:bg-white dark:text-[#09090B] font-display font-extrabold text-base flex items-center justify-center shrink-0 shadow-sm">
                                {founder.avatarMonogram}
                              </div>
                              <div>
                                <div className="font-mono-tech text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                                  {founder.role} • ACTIVE CHARACTER CARD
                                </div>
                                <h3 className="font-display text-xl sm:text-2xl font-extrabold text-[var(--text-primary)]">
                                  {founder.name}
                                </h3>
                                <div
                                  data-testid={`founder-headline-${founder.id}`}
                                  className="font-display text-xs sm:text-sm font-bold text-[var(--text-primary)] mt-0.5"
                                >
                                  {founder.headline}
                                </div>
                              </div>
                            </div>

                            <a
                              href={`mailto:${founder.email}`}
                              className="px-3 py-1.5 rounded-xl surface-elevated border border-[var(--border-hairline)] text-xs font-mono-tech text-[var(--text-primary)] hover:underline inline-flex items-center gap-2"
                            >
                              <GmailBrandIcon size="sm" />
                              <span>{founder.email}</span>
                            </a>
                          </div>

                          <p className="font-sans-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                            {founder.bio}
                          </p>

                          {/* Signature Projects with Live Interactive Prototype Launchers */}
                          <div className="space-y-2.5 pt-2">
                            <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-muted)] font-bold">
                              SIGNATURE ARCHITECTED SYSTEMS (CLICK TO LAUNCH LIVE PROTOTYPE)
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                              {founder.projects.slice(0, 3).map((fp) => {
                                const targetId: InteractiveArtifactId =
                                  fp.artifactId ||
                                  (fp.name.toLowerCase().includes('360')
                                    ? '360-views'
                                    : fp.name.toLowerCase().includes('shadow')
                                    ? 'shadowbase-cdc'
                                    : fp.name.toLowerCase().includes('grid')
                                    ? 'gridweaver-iot'
                                    : fp.name.toLowerCase().includes('fileguard')
                                    ? 'fileguard-security'
                                    : fp.name.toLowerCase().includes('career')
                                    ? 'ai-career-mentor'
                                    : 'socialite-network');
                                return (
                                  <button
                                    key={fp.name}
                                    type="button"
                                    onClick={() => setActiveArtifact(targetId)}
                                    className="p-3 rounded-2xl surface-elevated border border-[var(--border-hairline)] hover:border-[var(--text-primary)] hover:-translate-y-1 hover:shadow-md text-left transition-all cursor-pointer flex flex-col justify-between gap-2"
                                  >
                                    <div>
                                      <div className="font-display font-bold text-xs text-[var(--text-primary)] flex items-center justify-between gap-1">
                                        <span className="truncate">{fp.name}</span>
                                        <Eye className="w-3 h-3 text-[var(--text-primary)] shrink-0" />
                                      </div>
                                      <div className="text-[11px] text-[var(--text-secondary)] line-clamp-2 mt-0.5 leading-snug">
                                        {fp.subtitle}
                                      </div>
                                    </div>
                                    <span className="text-[10px] font-mono-tech font-bold text-[var(--text-primary)]">
                                      Launch Prototype →
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>

                        <div className="pt-4 border-t border-[var(--border-hairline)] flex flex-wrap items-center justify-between gap-3">
                          <div
                            data-testid={`founder-tech-stack-${founder.id}`}
                            className="flex flex-wrap gap-1.5"
                          >
                            {founder.frameworksAndTools.map((tool) => (
                              <span
                                key={tool}
                                className="px-2.5 py-1 rounded-lg bg-[#09090B] text-[#FFFFFF] dark:bg-[#F4F4F5] dark:text-[#09090B] font-mono-tech text-[11px] font-bold"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>

                          <a
                            href={`https://wa.me/${founder.whatsappNumber}?text=${encodeURIComponent(
                              `Hi ${founder.name}, I visited SkyLine Digital Agency and want to discuss a project.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3.5 py-2 rounded-xl btn-whatsapp-official text-xs font-semibold inline-flex items-center gap-1.5"
                          >
                            <WhatsAppBrandBadge size="sm" className="border border-white/30" />
                            <span>WhatsApp {founder.name.split(' ')[0]}</span>
                          </a>
                        </div>
                      </div>
                    ) : (
                      /* HIDDEN / COVER STATE FOR THE OTHER FOUNDER CARD (CLICK BUTTON TO FLIP & REVEAL) */
                      <div
                        data-testid={`founder-card-hidden-${founder.id}`}
                        className="p-7 sm:p-9 rounded-3xl bg-[#09090B] text-[#FFFFFF] dark:bg-[#18181B] dark:text-[#F4F4F5] border-2 border-[#27272A] flex flex-col items-center justify-between text-center h-full min-h-[430px] shadow-2xl relative overflow-hidden"
                      >
                        <div className="w-full flex items-center justify-between text-[10px] font-mono-tech uppercase tracking-widest text-[#A1A1AA]">
                          <span>SKYLINE CHARACTER DOSSIER</span>
                          <span>{founder.role.toUpperCase()}</span>
                        </div>

                        <div className="my-auto py-6 space-y-4 max-w-md flex flex-col items-center">
                          <div className="w-16 h-16 rounded-2xl bg-[#FFFFFF] text-[#09090B] font-display font-extrabold text-xl flex items-center justify-center shadow-lg">
                            {founder.avatarMonogram}
                          </div>

                          <div>
                            <div className="font-mono-tech text-[11px] uppercase tracking-widest text-[#A1A1AA] font-bold">
                              {founder.role}
                            </div>
                            <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] mt-1">
                              {founder.name}
                            </h3>
                            <p className="font-display text-xs sm:text-sm font-semibold text-[#D4D4D8] mt-1">
                              {founder.headline}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-1">
                            {founder.frameworksAndTools.map((tool) => (
                              <span
                                key={tool}
                                className="px-2.5 py-1 rounded-lg bg-white/10 text-[#E4E4E7] border border-white/15 font-mono-tech text-[10.5px] font-semibold"
                              >
                                {tool}
                              </span>
                            ))}
                          </div>

                          <button
                            type="button"
                            data-testid={`reveal-founder-btn-${founder.id}`}
                            onClick={() => setRevealedFounderId(founder.id)}
                            className="mt-3 px-6 py-3.5 rounded-full bg-[#FFFFFF] text-[#09090B] hover:bg-[#E4E4E7] font-display font-extrabold text-xs sm:text-sm inline-flex items-center gap-2 shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
                          >
                            <Sparkles className="w-4 h-4 text-[#09090B]" />
                            <span>{revealButtonLabel}</span>
                          </button>
                        </div>

                        <div className="w-full pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono-tech text-[#A1A1AA]">
                          <span>{founder.phone}</span>
                          <span>Click button above to flip card</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* =====================================================================
            CLIENT REVIEWS & VERIFIED OUTCOMES (ALL 6 UPDATED TESTIMONIALS)
           ===================================================================== */}
        <div className="mt-16 pt-12 border-t border-[var(--border-hairline)]">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2.5 mb-2.5">
                <div className="w-8 h-8 rounded-xl heading-icon-amber flex items-center justify-center shrink-0">
                  <Quote className="w-4 h-4 text-white" />
                </div>
                <span className="font-mono-tech text-[11px] uppercase tracking-widest text-[var(--text-primary)] font-bold">
                  CLIENT OUTCOMES &amp; FEEDBACK
                </span>
              </div>
              <h2 className="font-display text-2xl sm:text-3xl font-bold tracking-tight text-[var(--text-primary)]">
                Trusted by Founders, Salons, Handloom Brands &amp; D2C Stores
              </h2>
            </div>

            <button
              type="button"
              onClick={() => handleNavClick('referral')}
              className="px-4 py-2.5 rounded-full btn-platinum-secondary text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--text-primary)]" />
              <span>Refer a Client &amp; Earn 15% Commission</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {testimonials.slice(0, 6).map((rev) => (
              <div
                key={rev.id}
                data-testid={`hero-testimonial-card-${rev.id}`}
                className="p-6 rounded-3xl surface-card flex flex-col justify-between space-y-4 hover:-translate-y-1.5 hover:shadow-xl transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-[#09090B] text-[#FFFFFF] dark:bg-[#F4F4F5] dark:text-[#09090B] font-mono-tech text-[10.5px] font-bold">
                      {rev.verifiedOutcome}
                    </span>
                    {rev.liveSiteUrl && (
                      <a
                        href={rev.liveSiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono-tech text-[10px] font-bold text-[var(--text-primary)] hover:underline inline-flex items-center gap-1 shrink-0"
                      >
                        <span>Live</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    )}
                  </div>
                  <p className="font-sans-body text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed italic">
                    "{rev.quote}"
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--border-hairline)] flex items-center justify-between gap-2">
                  <div>
                    <div className="font-display text-xs sm:text-sm font-bold text-[var(--text-primary)]">
                      {rev.author}
                    </div>
                    <div className="text-[11px] text-[var(--text-muted)]">{rev.role}</div>
                  </div>
                  {rev.artifactId && (
                    <button
                      type="button"
                      onClick={() => setActiveArtifact(rev.artifactId || null)}
                      className="px-2.5 py-1 rounded-lg surface-elevated border border-[var(--border-hairline)] hover:border-[var(--text-primary)] font-mono-tech text-[10px] font-bold text-[var(--text-primary)] cursor-pointer"
                    >
                      Prototype →
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full-Screen Standalone Production Website Prototype Modal */}
      <InteractiveArtifactModal
        artifactId={activeArtifact}
        onClose={() => setActiveArtifact(null)}
        onRequestSimilarSystem={() => {
          setActiveArtifact(null);
          handleNavClick('contact');
        }}
      />
    </section>
  );
};

export const MultiDeviceStage3D: React.FC<{
  onLaunchPrototype: (artId: InteractiveArtifactId) => void;
}> = ({ onLaunchPrototype }) => {
  const [selectedDeviceIndex, setSelectedDeviceIndex] = useState<number>(0);
  const current = HERO_CAPABILITY_CARDS[selectedDeviceIndex] || HERO_CAPABILITY_CARDS[0];

  return (
    <div className="p-4 sm:p-5 rounded-2xl surface-elevated border border-[var(--border-hairline)] space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1.5">
          {HERO_CAPABILITY_CARDS.map((card, idx) => (
            <button
              key={card.id}
              type="button"
              onClick={() => setSelectedDeviceIndex(idx)}
              className={`px-3 py-1.5 rounded-xl font-mono-tech text-[11px] font-semibold transition-all cursor-pointer ${
                idx === selectedDeviceIndex
                  ? 'bg-[#09090B] text-white dark:bg-white dark:text-[#09090B]'
                  : 'surface-card text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {card.shortTitle}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => onLaunchPrototype(current.artifactId)}
          className="px-3.5 py-1.5 rounded-xl btn-platinum-primary text-xs font-semibold inline-flex items-center gap-1.5 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Launch Full-Screen Website</span>
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center">
        <div className="sm:col-span-2 p-3.5 rounded-xl surface-card border border-[var(--border-hairline)]">
          <div className="font-mono-tech text-[10px] uppercase tracking-wider text-[var(--text-secondary)] font-bold">
            {current.badge}
          </div>
          <div className="font-display font-bold text-sm text-[var(--text-primary)] mt-1">
            {current.miniPreviewTitle}
          </div>
          <div className="text-xs text-[var(--text-secondary)] mt-1">
            {current.summary}
          </div>
        </div>

        <div className="p-3.5 rounded-xl surface-card border border-[var(--border-hairline)] flex flex-col justify-between gap-2">
          <span className="font-mono-tech text-[10px] uppercase text-[var(--text-muted)]">
            STARTING PACKAGE
          </span>
          <span className="font-display font-extrabold text-base text-[var(--text-primary)]">
            {current.priceTag}
          </span>
          <span className="text-[11px] font-mono-tech text-[var(--text-secondary)]">
            {current.miniPreviewStat}
          </span>
        </div>
      </div>
    </div>
  );
};

