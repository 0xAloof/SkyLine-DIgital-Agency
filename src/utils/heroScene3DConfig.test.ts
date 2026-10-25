import test from 'node:test';
import assert from 'node:assert/strict';
import * as THREE from 'three';
import {
  getMonochromaticPlatinumPalette,
  isStrictlyMonochromaticPalette,
  computeFibonacciSphereNodes,
  computeFloatingPrismKinematics,
  computeMobileAdaptiveConfig,
  dampValue,
  stepUseFrameKinematics,
  UseFrameKinematicState,
} from './heroScene3DConfig';
import { disposeSceneGraph } from './useThreeFrame';
import { HERO_ORBS } from '../data/agencyData';

test('getMonochromaticPlatinumPalette returns strictly monochromatic silver/platinum/obsidian colors with zero golden/bronze tones', () => {
  const lightPalette = getMonochromaticPlatinumPalette(false);
  const darkPalette = getMonochromaticPlatinumPalette(true);

  assert.equal(isStrictlyMonochromaticPalette(lightPalette), true);
  assert.equal(isStrictlyMonochromaticPalette(darkPalette), true);
  assert.notEqual(lightPalette.prismCoreHex, 0xc5a880);
  assert.notEqual(darkPalette.prismCoreHex, 0xc5a880);
});

test('computeFibonacciSphereNodes distributes all 7 capability orbs across 360-degree 3D coordinates', () => {
  const nodes = computeFibonacciSphereNodes(
    HERO_ORBS.map((o) => ({ id: o.id, label: o.label })),
    1.64,
    0.88
  );

  assert.equal(nodes.length, 7);
  for (const node of nodes) {
    const dist = Math.hypot(node.x, node.y / 0.88, node.z);
    assert.ok(Math.abs(dist - 1.64) < 0.01, `Node ${node.label} radius should be ~1.64`);
  }
});

test('computeFloatingPrismKinematics calculates smooth levitation, contact shadow response, and distinct scales per sculpture mode', () => {
  const dual = computeFloatingPrismKinematics(1.2, 0, 'dual-monolith');
  const prismOnly = computeFloatingPrismKinematics(1.2, 2, 'prism-core');
  const sphereOnly = computeFloatingPrismKinematics(1.2, 4, 'geodesic-sphere');

  assert.equal(dual.prismScale, 1.0);
  assert.equal(dual.sphereScale, 1.0);
  assert.ok(prismOnly.prismScale > dual.prismScale);
  assert.ok(sphereOnly.sphereScale > dual.sphereScale);
  assert.ok(Math.abs(dual.floatY) <= 0.066);
  assert.ok(dual.shadowScale > 0.85 && dual.shadowScale < 1.15);
  assert.ok(dual.shadowOpacity > 0.25 && dual.shadowOpacity < 0.5);
});

test('computeMobileAdaptiveConfig caps DPR and widens FOV/cameraZ on mobile devices for smooth 60fps responsiveness', () => {
  const mobile = computeMobileAdaptiveConfig(390, 3.0, false);
  const desktop = computeMobileAdaptiveConfig(1440, 2.5, false);
  const software = computeMobileAdaptiveConfig(1440, 2.0, true);

  assert.equal(mobile.isMobileViewport, true);
  assert.equal(mobile.pixelRatio, 1.5);
  assert.ok(mobile.cameraZ > desktop.cameraZ);
  assert.ok(mobile.cameraFov > desktop.cameraFov);

  assert.equal(desktop.isMobileViewport, false);
  assert.equal(desktop.pixelRatio, 2.0);

  assert.equal(software.pixelRatio, 1.0);
});

test('stepUseFrameKinematics clamps large background tab deltas and applies exponential damping smoothly', () => {
  const state: UseFrameKinematicState = {
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
    shadowScale: 1,
    shadowOpacity: 0.38,
  };

  // Simulate a huge 2.5s tab-switch delta; it must be clamped to <= 0.05s
  stepUseFrameKinematics(state, 2.5, {
    isDragging: false,
    hoverParallaxX: 0.1,
    hoverParallaxY: 0.2,
    activeOrbIndex: 1,
    mode: 'prism-core',
    dampingLambda: 9.0,
    maxDeltaSeconds: 0.05,
  });

  assert.equal(state.elapsedSeconds, 0.05);
  assert.ok(state.curPrismScale > 1.0 && state.curPrismScale < 1.18);
  assert.ok(state.curSphereScale < 1.0 && state.curSphereScale > 0.82);
  assert.ok(dampValue(0, 10, 8, 0.016) > 0);
});

test('disposeSceneGraph recursively disposes geometries, materials, and textures and clears scene children', () => {
  const root = new THREE.Group();
  const geo = new THREE.OctahedronGeometry(1, 0);
  const tex = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1);
  const mat = new THREE.MeshStandardMaterial({ map: tex });
  const mesh = new THREE.Mesh(geo, mat);
  root.add(mesh);

  let geoDisposed = false;
  let matDisposed = false;
  let texDisposed = false;
  geo.addEventListener('dispose', () => {
    geoDisposed = true;
  });
  mat.addEventListener('dispose', () => {
    matDisposed = true;
  });
  tex.addEventListener('dispose', () => {
    texDisposed = true;
  });

  disposeSceneGraph(root);

  assert.equal(geoDisposed, true);
  assert.equal(matDisposed, true);
  assert.equal(texDisposed, true);
  assert.equal(root.children.length, 0);
});

test('src/index.css and src/components/HeroSection.tsx enforce strictly monochromatic silver, platinum, and charcoal definitions', async () => {
  const fs = await import('node:fs/promises');
  const path = await import('node:path');
  const cssContent = await fs.readFile(path.resolve(process.cwd(), 'src/index.css'), 'utf8');
  const heroContent = await fs.readFile(
    path.resolve(process.cwd(), 'src/components/HeroSection.tsx'),
    'utf8'
  );

  const forbiddenHexPatterns = [
    /#C5A880/i,
    /#D4AF37/i,
    /#FFD700/i,
    /#B8860B/i,
    /#10B981/i,
    /#25D366/i,
    /#EAE7E0/i,
    /#E2DED5/i,
    /#D8D4CA/i,
    /#F4F3EF/i,
  ];

  for (const pattern of forbiddenHexPatterns) {
    assert.equal(
      pattern.test(cssContent),
      false,
      `src/index.css must not contain non-compliant color ${pattern}`
    );
    assert.equal(
      pattern.test(heroContent),
      false,
      `src/components/HeroSection.tsx must not contain non-compliant color ${pattern}`
    );
  }
});
