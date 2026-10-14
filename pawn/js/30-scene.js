/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 30-scene.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 3. SCENE */
const container = $('canvas-container');
const scene = new THREE.Scene(); scene.background = new THREE.Color(0x0b1320);
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 420);
const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
renderer.setSize(window.innerWidth, window.innerHeight); renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap; renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 0.98;
container.appendChild(renderer.domElement);
let composer = null;
try { if (THREE.EffectComposer && THREE.UnrealBloomPass) { composer = new THREE.EffectComposer(renderer); composer.addPass(new THREE.RenderPass(scene, camera)); const bloom = new THREE.UnrealBloomPass(new THREE.Vector2(innerWidth, innerHeight), REALM_CONFIG.graphicsDefaults.unrealBloomStrength, REALM_CONFIG.graphicsDefaults.unrealBloomRadius, REALM_CONFIG.graphicsDefaults.unrealBloomThreshold); composer.addPass(bloom); window.__bloom = bloom; } } catch (e) { composer = null; console.warn('bloom unavailable', e); }
scene.add(new THREE.HemisphereLight(0x9ec5ff, 0x4a3a28, 0.95));
const sunLight = new THREE.DirectionalLight(0xffe9c4, 1.7); sunLight.position.set(60, 95, 45); sunLight.castShadow = true; sunLight.shadow.mapSize.width = 2048; sunLight.shadow.mapSize.height = 2048; sunLight.shadow.camera.near = 10; sunLight.shadow.camera.far = 260;
const sd = 85; sunLight.shadow.camera.left = -sd; sunLight.shadow.camera.right = sd; sunLight.shadow.camera.top = sd; sunLight.shadow.camera.bottom = -sd; sunLight.shadow.bias = -0.0005; scene.add(sunLight); scene.add(sunLight.target);

const CHUNK_SIZE = 60, CHUNK_SEGMENTS = 44, activeChunks = new Map(); const harvestNodes = [];
function makeDetailTexture() { const c = document.createElement('canvas'); c.width = c.height = 256; const x = c.getContext('2d'); x.fillStyle = '#9a9a9a'; x.fillRect(0, 0, 256, 256); for (let i = 0; i < 9000; i++) { const v = 120 + Math.random() * 110; x.fillStyle = `rgb(${v},${v},${v})`; x.fillRect(Math.random() * 256, Math.random() * 256, 1 + Math.random() * 2, 1 + Math.random() * 2); } for (let i = 0; i < 60; i++) { x.strokeStyle = `rgba(60,60,60,${Math.random() * .35})`; x.lineWidth = 1 + Math.random() * 2; x.beginPath(); x.moveTo(Math.random() * 256, Math.random() * 256); x.lineTo(Math.random() * 256, Math.random() * 256); x.stroke(); } const t = new THREE.CanvasTexture(c); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(10, 10); t.anisotropy = 8; return t; }
const terrainMat = new THREE.MeshStandardMaterial({ vertexColors: true, map: makeDetailTexture(), roughness: 0.92, metalness: 0.04 });
const leafMat = new THREE.MeshStandardMaterial({ color: 0x3f7d2a, roughness: 0.85, flatShading: true }), autumnMat = new THREE.MeshStandardMaterial({ color: 0xc2702a, roughness: 0.85, flatShading: true }), oreMat = new THREE.MeshStandardMaterial({ color: 0x2b2f3a, roughness: 0.4, metalness: 0.8 }), oreGlowMat = new THREE.MeshStandardMaterial({ color: 0x00f0ff, emissive: 0x00f0ff, emissiveIntensity: 1.2 });
const terrainColor = (vx, vz, vy) => { const c = new THREE.Color(); const dt = Math.hypot(vx, vz), n = (pseudoNoise2D(vx * 2.3, vz * 2.3) + 1.75) / 3.5, bio = biomeAt(vx, vz); if (bio === 'BOSS_CRAGS') { const db = Math.hypot(vx - BOSS_ALTAR.x, vz - BOSS_ALTAR.z); c.setHex(0x3b2a4a).lerp(new THREE.Color(0x6b3fa0), n * 0.6); if (db < 9) c.lerp(new THREE.Color(0x7c3aed), 0.5); if (db > 30) c.lerp(terrainColorBase(vx, vz, vy), (db - 30) / 10); return c; } if (bio === 'CRYSTAL_OASIS') { c.setHex(0xd9c48a).lerp(new THREE.Color(0x8fd3c7), n * 0.8); if (vy < -1) c.lerp(new THREE.Color(0x22d3ee), 0.6); return c; } if (bio === 'ASHEN_RIFT') { c.setHex(0x2a2222).lerp(new THREE.Color(0x5a2b1b), n); if (n > 0.78) c.lerp(new THREE.Color(0xf97316), (n - 0.78) * 3); return c; } return terrainColorBase(vx, vz, vy); };
const terrainColorBase = (vx, vz, vy) => { const c = new THREE.Color(); const dt = Math.hypot(vx, vz), n = (pseudoNoise2D(vx * 2.3, vz * 2.3) + 1.75) / 3.5; if (dt < 29) c.setHex(0x6b4a2b).lerp(new THREE.Color(0x8a5d33), n); else if (vy > 15) c.setHex(0xdfe7f0).lerp(new THREE.Color(0xb8c6d6), n); else if (vy > 9) c.setHex(0x6b7280).lerp(new THREE.Color(0x4b5563), n); else if (vy > 5.5) c.setHex(0x7a7f6a).lerp(new THREE.Color(0x5e6b3a), n); else if (vy < -1.2) c.setHex(0x3b5e2b).lerp(new THREE.Color(0x2f4d24), n); else c.setHex(0x4e8a2f).lerp(new THREE.Color(0x7aa83a), n); if (dt > 29 && dt < 44) c.lerp(new THREE.Color(0x7a5a3a), 0.5 * (1 - (dt - 29) / 15)); return c; };
const pineLeavesMat = new THREE.MeshStandardMaterial({ color: 0x1e4620, roughness: 0.8, flatShading: true });
const trunkMat = new THREE.MeshStandardMaterial({ color: 0x4a3219, roughness: 0.9 });
const rockMat = new THREE.MeshStandardMaterial({ color: 0x57534e, roughness: 0.75, flatShading: true });
const cragSpikeMat = new THREE.MeshStandardMaterial({ color: 0x3b2a4a, emissive: 0x4c1d95, emissiveIntensity: 0.1, roughness: 0.6, flatShading: true }), crystalMat = new THREE.MeshStandardMaterial({ color: 0x67e8f9, emissive: 0x22d3ee, emissiveIntensity: 0.45, roughness: 0.1, metalness: 0.3, transparent: true, opacity: 0.88 }), lavaMat = new THREE.MeshStandardMaterial({ color: 0xff6a00, emissive: 0xff4500, emissiveIntensity: 1.6, roughness: 0.4 }), obsidianMat = new THREE.MeshStandardMaterial({ color: 0x0f0a0a, roughness: 0.15, metalness: 0.7, flatShading: true }), charMat = new THREE.MeshStandardMaterial({ color: 0x1c1917, roughness: 0.95 });
const lavaVents = [];

function generateChunk(cx, cz) {
    const key = `${cx},${cz}`; if (activeChunks.has(key)) return;
    const chunkGroup = new THREE.Group(), geo = new THREE.PlaneGeometry(CHUNK_SIZE, CHUNK_SIZE, CHUNK_SEGMENTS, CHUNK_SEGMENTS); geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position, colors = [], color = new THREE.Color(), ox = cx * CHUNK_SIZE, oz = cz * CHUNK_SIZE;
    for (let i = 0; i < pos.count; i++) {
        const vx = pos.getX(i) + ox, vz = pos.getZ(i) + oz, vy = getTerrainHeight(vx, vz); pos.setY(i, vy);
        const col = terrainColor(vx, vz, vy); colors.push(col.r, col.g, col.b);
    }
    geo.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3)); geo.computeVertexNormals();
    const mesh = new THREE.Mesh(geo, terrainMat); mesh.position.set(ox, 0, oz); mesh.receiveShadow = true; chunkGroup.add(mesh);
    for (let i = 0; i < 16; i++) {
        const s1 = Math.sin(cx * 91.7 + cz * 37.3 + i * 19.1) * 43758.5453, fx = (s1 - Math.floor(s1)) - 0.5, s2 = Math.cos(cx * 41.2 + cz * 83.9 + i * 29.7) * 23421.631, fz = (s2 - Math.floor(s2)) - 0.5, s3 = Math.sin(cx * 7.1 + cz * 13.7 + i * 3.3) * 9871.1, kind = s3 - Math.floor(s3);
        const wx = ox + fx * CHUNK_SIZE * 0.92, wz = oz + fz * CHUNK_SIZE * 0.92; if (Math.hypot(wx, wz) < 42) continue;
        const wy = getTerrainHeight(wx, wz); const sc = 0.8 + kind * 0.9, bio = biomeAt(wx, wz);
        if (bio === 'BOSS_CRAGS') { const db = Math.hypot(wx - BOSS_ALTAR.x, wz - BOSS_ALTAR.z); if (db < 12) continue; const spike = new THREE.Mesh(new THREE.ConeGeometry(0.9 * sc, 4.5 * sc, 5), cragSpikeMat); spike.position.set(wx, wy + 2.0 * sc, wz); spike.rotation.z = (kind - .5) * .5; spike.castShadow = true; chunkGroup.add(spike); harvestNodes.push({ type: 'stone', x: wx, z: wz, y: wy, mesh: spike, ready: 0 }); continue; }
        if (bio === 'CRYSTAL_OASIS') { if (kind > 0.45) { const cr = new THREE.Group(); cr.position.set(wx, wy, wz); for (let k = 0; k < 4; k++) { const s = new THREE.Mesh(new THREE.OctahedronGeometry(0.5 + k * .15, 0), crystalMat); s.scale.set(1, 3.2 + k * .8, 1); s.position.set((k - 1.5) * .7, 1.2 + k * .4, (k % 2) * .6 - .3); s.rotation.z = (k - 1.5) * .18; cr.add(s); } chunkGroup.add(cr); harvestNodes.push({ type: 'ore', x: wx, z: wz, y: wy, mesh: cr, ready: 0 }); continue; } }
        if (bio === 'ASHEN_RIFT') { if (kind > 0.62) { const vent = new THREE.Group(); vent.position.set(wx, wy, wz); const rim = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 2.2, 1.0, 10), rockMat); rim.position.y = .5; const lava = new THREE.Mesh(new THREE.CylinderGeometry(1.2, 1.2, .3, 10), lavaMat); lava.position.y = 1.0; const glow = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color: 0xff6a00, transparent: true, opacity: .55, depthWrite: false, blending: THREE.AdditiveBlending })); glow.scale.set(5, 5, 1); glow.position.y = 1.6; vent.add(rim, lava, glow); chunkGroup.add(vent); lavaVents.push({ x: wx, z: wz, mesh: vent, light: null, glow }); continue; } if (kind > 0.32) { const ob = new THREE.Group(); ob.position.set(wx, wy, wz); const base = new THREE.Mesh(new THREE.DodecahedronGeometry(1.4, 0), obsidianMat); base.position.y = .7; base.scale.set(1.3, .9, 1.2); ob.add(base); for (let k = 0; k < 3; k++) { const g = new THREE.Mesh(new THREE.OctahedronGeometry(.25, 0), new THREE.MeshStandardMaterial({ color: 0xf97316, emissive: 0xf97316, emissiveIntensity: 1.3 })); g.position.set((Math.random() - .5) * 1.5, .6 + Math.random() * .8, (Math.random() - .5) * 1.3); ob.add(g); } chunkGroup.add(ob); harvestNodes.push({ type: 'ore', x: wx, z: wz, y: wy, mesh: ob, ready: 0 }); continue; } const stump = new THREE.Mesh(new THREE.CylinderGeometry(0.35, 0.55, 1.6, 7), charMat); stump.position.set(wx, wy + .8, wz); stump.castShadow = true; chunkGroup.add(stump); harvestNodes.push({ type: 'wood', x: wx, z: wz, y: wy, mesh: stump, ready: 0 }); continue; }
        if (wy < 5.5) {
            const tree = new THREE.Group(); tree.position.set(wx, wy, wz); tree.scale.setScalar(sc);
            const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.45, 2.6, 7), trunkMat); trunk.position.y = 1.3; trunk.castShadow = true; tree.add(trunk);
            if (kind < 0.5) { const c1 = new THREE.Mesh(new THREE.ConeGeometry(1.7, 3.4, 7), pineLeavesMat); c1.position.y = 3.2; c1.castShadow = true; const c2 = new THREE.Mesh(new THREE.ConeGeometry(1.25, 2.6, 7), pineLeavesMat); c2.position.y = 4.8; c2.castShadow = true; tree.add(c1, c2); }
            else { const m = kind < 0.8 ? leafMat : autumnMat; for (let k = 0; k < 3; k++) { const b = new THREE.Mesh(new THREE.DodecahedronGeometry(1.5 + k * .2, 0), m); b.position.set((k - 1) * .9, 3.4 + k * .5, (k % 2) * .8 - .4); b.castShadow = true; tree.add(b); } }
            chunkGroup.add(tree); harvestNodes.push({ type: 'wood', x: wx, z: wz, y: wy, mesh: tree, ready: 0 });
        } else if (wy > 9 && kind > 0.55) {
            const ore = new THREE.Group(); ore.position.set(wx, wy, wz); const base = new THREE.Mesh(new THREE.DodecahedronGeometry(1.5, 0), oreMat); base.position.y = .7; base.scale.set(1.3, .9, 1.2); base.castShadow = true; ore.add(base); for (let k = 0; k < 4; k++) { const g = new THREE.Mesh(new THREE.OctahedronGeometry(.25, 0), oreGlowMat); g.position.set((Math.random() - .5) * 1.6, .6 + Math.random() * .9, (Math.random() - .5) * 1.4); ore.add(g); }
            chunkGroup.add(ore); harvestNodes.push({ type: 'ore', x: wx, z: wz, y: wy, mesh: ore, ready: 0 });
        } else {
            const rock = new THREE.Mesh(new THREE.DodecahedronGeometry(1.6, 0), rockMat); rock.position.set(wx, wy + 0.6, wz); rock.scale.set(1.4 * sc, 0.9 * sc, 1.2 * sc); rock.rotation.y = kind * 6; rock.castShadow = true; rock.receiveShadow = true; chunkGroup.add(rock); harvestNodes.push({ type: 'stone', x: wx, z: wz, y: wy, mesh: rock, ready: 0 });
        }
    }
    addGrassToChunk(cx, cz, chunkGroup); scene.add(chunkGroup); activeChunks.set(key, chunkGroup);
}
function updateEndlessWorldChunks(px, pz) { const ccx = Math.round(px / CHUNK_SIZE), ccz = Math.round(pz / CHUNK_SIZE); for (let dx = -2; dx <= 2; dx++) for (let dz = -2; dz <= 2; dz++) generateChunk(ccx + dx, ccz + dz); }
