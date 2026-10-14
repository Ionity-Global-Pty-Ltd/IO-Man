/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 65-fx.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 6b. VISUAL FX: sky, sun, grass, particles, shockwaves, trails, target ring, cast bar */
const fxDebris = [], fxRings = [], fxTrails = [], fxLights = []; let camShake = 0;
function makeSpriteTex(inner, outer) { const c = document.createElement('canvas'); c.width = c.height = 128; const x = c.getContext('2d'); const g = x.createRadialGradient(64, 64, 0, 64, 64, 64); g.addColorStop(0, inner); g.addColorStop(0.35, inner); g.addColorStop(1, outer); x.fillStyle = g; x.fillRect(0, 0, 128, 128); return new THREE.CanvasTexture(c); }
const glowTex = makeSpriteTex('rgba(255,255,255,1)', 'rgba(255,255,255,0)');
// Sky dome + sun
// GLSL aurora sky dome — 3 modes (Apex Noon / Ember Dusk / Aurora Night), cycle with the 🌌 button
const SKY_MODES = [
    { name: 'NOON', top: 0x1e3a8a, mid: 0x5b8ed6, horizon: 0xf3c27a, bottom: 0x2a1a12, aurora: 0.12, stars: 0.0, hemi: 0.95, sun: 1.7, sunColor: 0xffe9c4, fog: 0x9fb6d8, fogD: 0.0042, exposure: 0.98, cloud: 0.55, sunSize: 70 },
    { name: 'DUSK', top: 0x1a1030, mid: 0x7c3a5e, horizon: 0xff8c42, bottom: 0x2a1212, aurora: 0.55, stars: 0.35, hemi: 0.62, sun: 1.15, sunColor: 0xffb070, fog: 0x7a5a6a, fogD: 0.0048, exposure: 0.92, cloud: 0.4, sunSize: 95 },
    { name: 'AURORA', top: 0x02030c, mid: 0x0b1a3a, horizon: 0x1a2d4a, bottom: 0x05070b, aurora: 1.35, stars: 1.0, hemi: 0.55, sun: 0.65, sunColor: 0x9ec5ff, fog: 0x0f1a2c, fogD: 0.0052, exposure: 0.88, cloud: 0.18, sunSize: 40 }
];
let skyMode = 0;
const skyUniforms = { uTop: { value: new THREE.Color() }, uMid: { value: new THREE.Color() }, uHorizon: { value: new THREE.Color() }, uBottom: { value: new THREE.Color() }, uTime: { value: 0 }, uAurora: { value: 0.1 }, uStars: { value: 0 } };
(function buildSky() {
    const skyMat = new THREE.ShaderMaterial({ side: THREE.BackSide, depthWrite: false, fog: false, uniforms: skyUniforms,
        vertexShader: `varying vec3 vDir; void main(){ vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }`,
        fragmentShader: `precision highp float; varying vec3 vDir; uniform vec3 uTop,uMid,uHorizon,uBottom; uniform float uTime,uAurora,uStars;
            float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
            void main(){ vec3 d = normalize(vDir); float h = d.y;
              vec3 col = h < 0.0 ? mix(uHorizon, uBottom, clamp(-h * 3.0, 0.0, 1.0)) : (h < 0.22 ? mix(uHorizon, uMid, h / 0.22) : mix(uMid, uTop, (h - 0.22) / 0.78));
              float band = smoothstep(0.04, 0.4, h) * (1.0 - smoothstep(0.45, 0.95, h));
              float a1 = sin(d.x * 6.0 + uTime * 0.35 + sin(d.z * 4.0 + uTime * 0.2) * 2.0) * 0.5 + 0.5; a1 = pow(a1, 3.0);
              float a2 = sin(d.z * 8.0 - uTime * 0.27 + d.x * 3.0 + sin(h * 20.0 + uTime * 0.5)) * 0.5 + 0.5; a2 = pow(a2, 4.0);
              float a3 = sin((d.x + d.z) * 11.0 + uTime * 0.18) * 0.5 + 0.5; a3 = pow(a3, 6.0);
              vec3 aur = vec3(0.08, 0.95, 0.55) * a1 + vec3(0.62, 0.22, 0.95) * a2 + vec3(0.0, 0.94, 1.0) * a3;
              col += aur * band * uAurora * 0.75;
              vec2 sp = floor(d.xz / max(h, 0.03) * 70.0); float s = step(0.994, hash(sp)) * (0.6 + 0.4 * sin(uTime * 2.0 + hash(sp + 1.0) * 30.0));
              col += vec3(s) * uStars * smoothstep(0.08, 0.45, h);
              gl_FragColor = vec4(col, 1.0); }` });
    const sky = new THREE.Mesh(new THREE.SphereGeometry(380, 32, 20), skyMat); sky.name = 'sky'; scene.add(sky); window.__sky = sky;
    const sun = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeSpriteTex('rgba(255,240,200,1)', 'rgba(255,200,120,0)'), transparent: true, fog: false, depthWrite: false })); sun.scale.set(70, 70, 1); sun.name = 'sun'; scene.add(sun); window.__sun = sun;
    for (let i = 0; i < 14; i++) { const cl = new THREE.Sprite(new THREE.SpriteMaterial({ map: makeSpriteTex('rgba(255,255,255,0.85)', 'rgba(255,255,255,0)'), transparent: true, opacity: 0.55, fog: false, depthWrite: false })); cl.scale.set(60 + Math.random() * 60, 22 + Math.random() * 14, 1); cl.userData.off = [(Math.random() - .5) * 500, 70 + Math.random() * 40, (Math.random() - .5) * 500]; cl.name = 'cloud'; scene.add(cl); fxLights.push(cl); }
    scene.background = new THREE.Color(0x0b1320); scene.fog = new THREE.FogExp2(0x9fb6d8, 0.0042);
})();
const hemiLight = scene.children.find(o => o.isHemisphereLight);
function applySkyMode(i) {
    skyMode = ((i % SKY_MODES.length) + SKY_MODES.length) % SKY_MODES.length; const m = SKY_MODES[skyMode];
    skyUniforms.uTop.value.setHex(m.top); skyUniforms.uMid.value.setHex(m.mid); skyUniforms.uHorizon.value.setHex(m.horizon); skyUniforms.uBottom.value.setHex(m.bottom); skyUniforms.uAurora.value = m.aurora; skyUniforms.uStars.value = m.stars;
    if (hemiLight) hemiLight.intensity = m.hemi; sunLight.intensity = m.sun; sunLight.color.setHex(m.sunColor); scene.fog.color.setHex(m.fog); scene.fog.density = m.fogD; renderer.toneMappingExposure = m.exposure; if (window.__sun) { __sun.scale.set(m.sunSize, m.sunSize, 1); __sun.material.color.setHex(m.sunColor); } fxLights.forEach(cl => { if (cl.name === 'cloud') cl.material.opacity = m.cloud; });
    const lbl = $('sky-label'); if (lbl) lbl.textContent = m.name; try { localStorage.setItem('pawn_sky', skyMode); } catch (e) {}
}
applySkyMode(0); try { const s = parseInt(localStorage.getItem('pawn_sky')); if (!isNaN(s)) applySkyMode(s); } catch (e) {}
// Instanced grass per chunk
const grassGeo = new THREE.ConeGeometry(0.14, 1.1, 3); grassGeo.translate(0, 0.55, 0);
const grassMat = new THREE.MeshStandardMaterial({ color: 0x5f8f3a, roughness: 0.9, flatShading: true });
function addGrassToChunk(cx, cz, chunkGroup) {
    const count = 260, inst = new THREE.InstancedMesh(grassGeo, grassMat, count), m = new THREE.Matrix4(), q = new THREE.Quaternion(), sc = new THREE.Vector3(); let n = 0;
    for (let i = 0; i < count; i++) { const s1 = Math.sin(cx * 12.9 + cz * 78.2 + i * 3.7) * 43758.5, fx_ = s1 - Math.floor(s1), s2 = Math.cos(cx * 93.9 + cz * 67.3 + i * 5.1) * 23421.6, fz_ = s2 - Math.floor(s2); const wx = cx * CHUNK_SIZE + (fx_ - .5) * CHUNK_SIZE, wz = cz * CHUNK_SIZE + (fz_ - .5) * CHUNK_SIZE; const wy = getTerrainHeight(wx, wz); if (wy > 5.5 || Math.hypot(wx, wz) < 30 || biomeAt(wx, wz) !== 'PLAINS') continue; q.setFromAxisAngle(new THREE.Vector3(0, 1, 0), fx_ * 6.28); sc.set(1, 0.7 + fz_ * 0.9, 1); m.compose(new THREE.Vector3(wx, wy, wz), q, sc); inst.setMatrixAt(n++, m); }
    inst.count = n; inst.receiveShadow = true; chunkGroup.add(inst);
}
function spawnSparks(pos, color, count = 14, power = 1) { const geo = new THREE.OctahedronGeometry(0.1, 0); for (let i = 0; i < count; i++) { const m = new THREE.Mesh(geo, new THREE.MeshBasicMaterial({ color })); m.position.copy(pos); scene.add(m); const a = Math.random() * 6.28, sp = (2 + Math.random() * 6) * power; fxDebris.push({ mesh: m, vel: new THREE.Vector3(Math.cos(a) * sp, 3 + Math.random() * 5 * power, Math.sin(a) * sp), rot: new THREE.Vector3(Math.random() * 10, Math.random() * 10, Math.random() * 10), r: .1, life: 0, max: .7 + Math.random() * .5, ground: pos.y - 1.2 }); } }
function spawnRing(pos, color, scale = 1, dur = 0.7) { const ring = new THREE.Mesh(new THREE.RingGeometry(.3, .7, 48), new THREE.MeshBasicMaterial({ color, side: THREE.DoubleSide, transparent: true, opacity: .9, depthWrite: false })); ring.rotation.x = -Math.PI / 2; ring.position.set(pos.x, getTerrainHeight(pos.x, pos.z) + .08, pos.z); scene.add(ring); fxRings.push({ mesh: ring, age: 0, max: dur, scale }); }
function spawnFlash(pos, color, size = 6, dur = 0.35) { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending })); sp.position.copy(pos); sp.scale.set(size, size, 1); scene.add(sp); fxRings.push({ mesh: sp, age: 0, max: dur, flash: true, size }); const l = new THREE.PointLight(color, 3, 18); l.position.copy(pos); scene.add(l); fxRings.push({ mesh: l, age: 0, max: dur, light: true }); }
function spawnShatter(pos, color) { const geo = new THREE.DodecahedronGeometry(.3, 0); for (let i = 0; i < 16; i++) { const m = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ color, roughness: .6, flatShading: true })); m.scale.set(.5 + Math.random(), .4 + Math.random(), .5 + Math.random()); m.position.copy(pos).add(new THREE.Vector3((Math.random() - .5), .8 + Math.random(), (Math.random() - .5))); m.castShadow = true; scene.add(m); const a = Math.random() * 6.28, sp = 2 + Math.random() * 6; fxDebris.push({ mesh: m, vel: new THREE.Vector3(Math.cos(a) * sp, 2 + Math.random() * 6, Math.sin(a) * sp), rot: new THREE.Vector3((Math.random() - .5) * 12, (Math.random() - .5) * 12, (Math.random() - .5) * 12), r: .25, life: 0, max: 2 + Math.random(), ground: pos.y }); } spawnRing(pos, color, 1.3); camShake = Math.max(camShake, .45); }
function spawnFalling(pos, color, count, height, radius, onLand) { for (let i = 0; i < count; i++) { setTimeout(() => { const a = Math.random() * 6.28, r = Math.random() * radius, start = new THREE.Vector3(pos.x + Math.cos(a) * r, pos.y + height, pos.z + Math.sin(a) * r); const m = new THREE.Mesh(new THREE.OctahedronGeometry(.45, 0), new THREE.MeshBasicMaterial({ color })); m.position.copy(start); scene.add(m); const l = new THREE.PointLight(color, 1.5, 10); m.add(l); fxDebris.push({ mesh: m, vel: new THREE.Vector3(0, -28, 0), rot: new THREE.Vector3(6, 6, 0), r: .4, life: 0, max: 3, ground: getTerrainHeight(start.x, start.z) + .3, trail: color, onLand }); }, i * 90); } }
function updateFX(dt) {
    for (let i = fxDebris.length - 1; i >= 0; i--) { const d = fxDebris[i]; d.life += dt; if (!d.onLand) d.vel.y -= 20 * dt; d.mesh.position.addScaledVector(d.vel, dt); d.mesh.rotation.x += d.rot.x * dt; d.mesh.rotation.y += d.rot.y * dt; if (d.trail && Math.random() < .6) addTrail(d.mesh.position, d.trail, .5); if (d.mesh.position.y < d.ground + d.r) { if (d.onLand) { const f = d.onLand; d.onLand = null; f(d.mesh.position.clone()); scene.remove(d.mesh); fxDebris.splice(i, 1); continue; } d.mesh.position.y = d.ground + d.r; d.vel.y = Math.abs(d.vel.y) > 1.2 ? -d.vel.y * .45 : 0; d.vel.x *= .85; d.vel.z *= .85; } const lr = d.life / d.max; if (lr > .75) d.mesh.scale.multiplyScalar(.94); if (lr >= 1) { scene.remove(d.mesh); fxDebris.splice(i, 1); } }
    for (let i = fxRings.length - 1; i >= 0; i--) { const r = fxRings[i]; r.age += dt; const p = r.age / r.max; if (r.light) r.mesh.intensity = 3 * (1 - p); else if (r.flash) { const s = r.size * (1 + p * 1.5); r.mesh.scale.set(s, s, 1); r.mesh.material.opacity = 1 - p; } else { const sc = (1 + p * 9) * r.scale; r.mesh.scale.set(sc, sc, 1); r.mesh.material.opacity = Math.max(0, (1 - p) * .85); } if (p >= 1) { scene.remove(r.mesh); fxRings.splice(i, 1); } }
    for (let i = fxTrails.length - 1; i >= 0; i--) { const t = fxTrails[i]; t.age += dt; const p = t.age / t.max; t.mesh.material.opacity = (1 - p) * .8; const s = t.size * (1 - p * .6); t.mesh.scale.set(s, s, 1); if (p >= 1) { scene.remove(t.mesh); fxTrails.splice(i, 1); } }
    skyUniforms.uTime.value = performance.now() / 1000; if (window.__sky) __sky.position.copy(camera.position); if (window.__sun) __sun.position.set(camera.position.x + 220, 150, camera.position.z + 160);
    fxLights.forEach((cl, i) => { cl.position.set(hero.pos.x + cl.userData.off[0] + Math.sin(performance.now() / 20000 + i) * 20, cl.userData.off[1], hero.pos.z + cl.userData.off[2]); });
}
function addTrail(pos, color, size = 1) { const sp = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, opacity: .8 })); sp.position.copy(pos); sp.scale.set(size, size, 1); scene.add(sp); fxTrails.push({ mesh: sp, age: 0, max: .35, size }); }
// Target ring
const targetRing = new THREE.Mesh(new THREE.RingGeometry(1.4, 1.75, 40), new THREE.MeshBasicMaterial({ color: 0xf43f5e, side: THREE.DoubleSide, transparent: true, opacity: .85, depthWrite: false })); targetRing.rotation.x = -Math.PI / 2; targetRing.visible = false; scene.add(targetRing);
const targetArrow = new THREE.Mesh(new THREE.ConeGeometry(.35, .8, 4), new THREE.MeshBasicMaterial({ color: 0xf43f5e })); targetArrow.rotation.x = Math.PI; targetArrow.visible = false; scene.add(targetArrow);
function setTarget(m) { selectedTarget = m; updateTargetFrame(); if (m) { sfx.playTone(600, 900, .08, 'sine', .08); } }
function cycleTarget() { const list = aliveMobs().filter(m => hero.pos.distanceTo(m.mesh.position) < 45).sort((a, b) => hero.pos.distanceTo(a.mesh.position) - hero.pos.distanceTo(b.mesh.position)); if (!list.length) { spawnFloatingText(hero.pos, 'No enemies nearby', '#94a3b8'); return; } const i = selectedTarget ? list.findIndex(m => m.id === selectedTarget.id) : -1; setTarget(list[(i + 1) % list.length]); }
function faceTarget(t) { if (!t) return; hero.facingYaw = Math.atan2(hero.pos.x - t.mesh.position.x, hero.pos.z - t.mesh.position.z); hero.mesh.rotation.y = hero.facingYaw + Math.PI; }
// Casting
let casting = null;
function startCast(label, dur, color, onDone) { if (casting) return false; casting = { t: 0, dur, onDone, color, start: performance.now() }; const w = $('castbar-wrap'); $('castbar-label').textContent = label.toUpperCase(); $('castbar-fill').style.background = color; w.classList.remove('hidden'); const u = hero.mesh.userData; u.leftArmPivot.rotation.x = -2.4; u.rightArmPivot.rotation.x = -2.4; casting.glow = new THREE.PointLight(new THREE.Color(color).getHex(), 2.2, 10); casting.glow.position.set(0, 3.4, 0); hero.mesh.add(casting.glow); return true; }
function updateCast(dt) { if (!casting) return; casting.t = (performance.now() - casting.start) / 1000; const p = Math.min(1, casting.t / casting.dur); $('castbar-fill').style.width = `${p * 100}%`; $('castbar-pct').textContent = `${Math.round(p * 100)}%`; if (Math.random() < .7) addTrail(hero.mesh.localToWorld(new THREE.Vector3(.5 + (Math.random() - .5) * .6, 3.2 + Math.random() * .6, .4)), new THREE.Color(casting.color).getHex(), .6); if (p >= 1) { const c = casting; casting = null; hero.mesh.remove(c.glow); $('castbar-wrap').classList.add('hidden'); const u = hero.mesh.userData; u.leftArmPivot.rotation.x = 0; u.rightArmPivot.rotation.x = -1.3; setTimeout(() => { if (hero.mesh) hero.mesh.userData.rightArmPivot.rotation.x = 0; }, 220); c.onDone(); } }
function cancelCast() { if (!casting) return; hero.mesh.remove(casting.glow); casting = null; $('castbar-wrap').classList.add('hidden'); const u = hero.mesh.userData; u.leftArmPivot.rotation.x = 0; u.rightArmPivot.rotation.x = 0; spawnFloatingText(hero.pos, 'Cast interrupted', '#94a3b8'); }
