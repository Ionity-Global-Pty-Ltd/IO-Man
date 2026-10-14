/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 20-terrain.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* 2. TERRAIN */
function pseudoNoise2D(x, z) { return Math.sin(x * 0.037) * Math.cos(z * 0.037) + 0.5 * Math.sin((x + z) * 0.083) + 0.25 * Math.cos(x * 0.17 - z * 0.14); }
/* BIOMES (APEX): TOWN_MESA (centre), BOSS_CRAGS (terraced altar of MAGATHA at 0,-105), CRYSTAL_OASIS (x>68), ASHEN_RIFT (x<-68), PLAINS */
const BOSS_ALTAR = { x: 0, z: -105 }, BIOME_INFO = { TOWN_MESA: { label: 'RED CLOUD MESA (THUNDERHOOF TOWN)', color: '#fbbf24' }, BOSS_CRAGS: { label: "BOSS CRAGS · MAGATHA'S ALTAR", color: '#c084fc' }, CRYSTAL_OASIS: { label: 'CRYSTAL OASIS · SHIMMERING SANDS', color: '#67e8f9' }, ASHEN_RIFT: { label: 'ASHEN RIFT · LAVA VENTS', color: '#fb923c' }, PLAINS: { label: 'ENDLESS MULGORE HUNTING PLAINS', color: '#a3e635' }, CRAGS: { label: 'STONETALON HIGH MOUNTAIN CRAGS', color: '#cbd5e1' } };
function biomeAt(x, z) { if (Math.hypot(x, z) < 30) return 'TOWN_MESA'; if (Math.hypot(x - BOSS_ALTAR.x, z - BOSS_ALTAR.z) < 40) return 'BOSS_CRAGS'; if (x > 68) return 'CRYSTAL_OASIS'; if (x < -68) return 'ASHEN_RIFT'; return 'PLAINS'; }
function getTerrainHeight(x, z) {
    const dist = Math.hypot(x, z);
    if (dist < 28) return 3.2;
    const angle = Math.atan2(z, x), isSouthRamp = Math.abs(angle - Math.PI / 2) < 0.42;
    if (dist < 42) { const t = (dist - 28) / 14, st = t * t * (3 - 2 * t), outer = pseudoNoise2D(x, z) * 1.6; if (isSouthRamp) return 3.2 * (1 - st) + outer * st; return 3.2 * (1 - st) + outer * st + Math.sin(x * 0.35) * Math.cos(z * 0.35) * 1.1 * Math.sin(t * Math.PI); }
    let h = pseudoNoise2D(x, z) * 2.2;
    const ridge = Math.sin(x * 0.018) * Math.sin(z * 0.018);
    if (ridge > 0.25) { const mf = (ridge - 0.25) / 0.75; h += Math.pow(mf, 1.5) * 34.0; h += Math.round(Math.sin(x * 0.19 + z * 0.19) * 2.2) * 1.1; }
    const lake = Math.sin(x * 0.011 + 1.3) * Math.cos(z * 0.011 - 0.7); if (lake < -0.72 && ridge < 0.1) h -= (-(lake + 0.72) / 0.28) * 3.2;
    const db = Math.hypot(x - BOSS_ALTAR.x, z - BOSS_ALTAR.z);
    if (db < 40) { let alt; if (db < 16) alt = 14.5; else { const bt = 1 - (db - 16) / 18, step = Math.floor(bt * 5) / 5; alt = 2.5 + step * 12.0; } if (db < 34) return alt + pseudoNoise2D(x * 3, z * 3) * 0.12; const t = (db - 34) / 6, st = t * t * (3 - 2 * t); return alt * (1 - st) + h * st; }
    if (x < -68) { const f = Math.min(1, (-68 - x) / 12); h += f * (1.4 + Math.abs(Math.sin(x * 0.05) * Math.cos(z * 0.07)) * 2.4); }
    if (x > 68) { const f = Math.min(1, (x - 68) / 12); h = h * (1 - f) + f * (1.8 + h * 0.6 + Math.sin(x * 0.05) * Math.cos(z * 0.04) * 1.4); }
    return h;
}
