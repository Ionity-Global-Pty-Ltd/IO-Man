# PAWN* — SOVEREIGN REALM MMO

> Isometric .IO ARPG in a single HTML file, shared world on Firebase. Sign in, pick a hero, fight alongside real players across four South-African-themed sectors.

**Document ID:** GME-2026-10-012 · **Version:** 7.0.0 · **Classification:** PUBLIC
**Author:** Johan Wilhelm van Antwerp · Ionity (Pty) Ltd · AEDI · ORCID 0009-0005-7181-0347
**Governance:** Policy 986 AED · **License:** AED 900 · CC BY-NC-SA 4.0 where stated
**Play:** https://www.ionity.fun/pawn/ (after PR #2 merges) · **Hub:** https://www.ionity.fun/ · Contact: ai@ionity.today

---

## Where it lives

| Item | Location |
|---|---|
| Source | `Ionity-Global-Pty-Ltd/IO-Man` repo, `pawn/index.html` (branch `pawn-mmo-hub`, PR #2) |
| Hosting | GitHub Pages, custom domain `www.ionity.fun` (CNAME in repo) |
| Firebase | project **`io-man`** (Spark/free) — web app `1:737401934489:web:bfe305eba0bdc4416c9e08` "IO-MAN Web (ionity.fun)" |
| Database | Realtime Database `io-man-default-rtdb`, **europe-west1** → `https://io-man-default-rtdb.europe-west1.firebasedatabase.app` |
| Rules | `firebase/database.rules.json` in the repo; deploy `firebase deploy --only database,auth --project io-man` from `firebase/` |
| Local work dir | `D:\.Work\ionity-fun` (scratch Firebase project dir, same rules) |

Also on ionity.fun: the root is now a **game-selection hub** (GME-2026-10-011) → `/ioman/` (IO-MAN moved from `/`), `/combat/`, `/pawn/`.

## Game

- Three.js r128 isometric view, click-to-move + WASD, click a mob to target, `Tab` cycles targets.
- Classes: Sovereign AI Templar (cyan) · Firmware Ranger (green) · Electrotechnic Titan (gold) — colour of your pawn.
- Skills (1–5): ESP-BOLT (single, 1 s) · BESS-SHIELD (70 % damage cut, 5 s) · ARC-NOVA (AoE r14) · CHRONO-HEAL (+35 % HP) · PAWN* ULT (AoE r34, ×4).
- Sectors: Centurion (safe, HP/MP regen, 4 towers) · Witwatersrand Mines (Lv2 Cavitation Crawler, 600 HP) · Karoo BESS (Lv5 Surge Titan, 1600 HP) · Cape Subsea Trench (Lv10 Cloud Leviathan, 6000 HP).
- Towers: `E` within 6 units claims for 90 s (+350 XP, +160 ZAR); claimed towers lose their crystal and go grey on radar.
- Death: 10 % ZAR penalty, 5 s reboot at Centurion.
- Forge (`K`): 6 disciplines bought with ZAR-T; Chassis +150 HP, BESS +75 kWh, Overclock +8 % dmg, Inference +30 TFLOPS, Twins +5 % crit, Audit +10 % ZAR.
- Level-up: XP next ×1.4, +300 HP, +150 kWh.

## Multiplayer model (Realtime Database)

```
players/{uid}                      cloud save — name, class, level, xp, xpNext, maxHp, maxMp, zar, TFLOPS, kills, totalXp, disciplines, realm, sector
presence/{realm}/{sector}/{uid}    name, cls, lvl, x, z, hp, maxHp, ts   (onDisconnect().remove(), 10 Hz throttle)
world/{realm}/{sector}/meta        seeded flag + seed (transaction; first player seeds)
world/{realm}/{sector}/towers/{id} x, z, claimedBy, claimedName, until
world/{realm}/{sector}/mobs/{id}   x, z, hp, maxHp, lvl, name, deadUntil, killer
chat/{realm}/{pushId}              uid, name, text (≤240), ts, sys?
leaderboard/{uid}                  uid, name, cls, level, kills, score = totalXp + 50·kills   (.indexOn score)
```

- Realms (shards): `pawn-centurion`, `ionity-fun`, `ionity-today`. Default picked from hostname (`ionity.fun` → `ionity-fun`), overridable in the login screen.
- Damage: `transaction` on `mobs/{id}`; the client whose transaction takes HP to 0 writes `killer` and gets the loot. Respawn 25 s later by the host.
- Host election: lowest uid present in the sector (from the presence snapshot). Host ticks mob pathing at 5 Hz toward the nearest player; clients interpolate.
- Rules: public read; `players`, `presence`, `leaderboard` writable only by the owning uid; `world` and `chat` writable by any signed-in user; chat validates uid and length.

## Auth

Google sign-in only (popup, redirect fallback). Authorized domains needed in Firebase Auth: `www.ionity.fun`, `ionity.fun`, `ionity-global-pty-ltd.github.io`, `io-man.web.app`, `localhost`.

## Status 2026-10-14

- [x] Hub + MMO + rules committed, branch pushed, PR #2 open: https://github.com/Ionity-Global-Pty-Ltd/IO-Man/pull/2
- [x] Google provider configured on io-man via Firebase MCP; `firebasedatabase.googleapis.com` API enabled
- [ ] Realtime Database instance must be created in the console (europe-west1) — CLI can't do it non-interactively
- [ ] `firebase deploy --only database` after the instance exists
- [ ] Authorized domains for Google sign-in
- [ ] Live two-browser multiplayer check, then merge PR #2

Headless smoke test (Playwright/Chromium): hub and MMO load with zero console errors; engine starts, HUD/forge/leaderboard open, movement and skill cast run.

---
© 2018–2026 Antwerp Designs | Ionity (Pty) Ltd · TM2 · Policy 986 AED · Building Tomorrow, Today.
