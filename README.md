# IONITY IO-MAN — GET OVER IT DOOR

> ASCII / ANSI side-scrolling beat-em-up in a single HTML file. Chop the spores, push forward, open the door, get over it.

**Document ID:** GME-2026-10-009 · **Version:** 4.5.0 · **Classification:** INTERNAL (source published for reference)
**Author:** Johan Wilhelm van Antwerp · Ionity (Pty) Ltd · AEDI (Antwerp Ecosystems Designs Ionity) · ORCID [0009-0005-7181-0347](https://orcid.org/0009-0005-7181-0347)
**Governance:** Policy 986 AED · **License:** AED 900 · CC BY-NC-SA 4.0 where stated
**Play:** https://ionity.fun · **Web:** https://www.ionity.today · https://www.ionity.world · Ref: https://www.ionity.co.za · Contact: ai@ionity.today

---

## Play

Open `index.html` (identical to `IONITY_IO-MAN_GET_OVER_IT_DOOR.html`) in any modern browser, or play at https://ionity.fun. No install, no assets, no network.
Phones and tablets: play in **landscape** (portrait shows a rotate screen and pauses). Tap `[ ]` for fullscreen with landscape lock where the browser allows it.

| Action | Keyboard | Touch |
|---|---|---|
| Move (W/S = depth lane) | `WASD` / arrows | drag joystick |
| Jump · Double jump · Stomp | `Space` · `Space` in the air · land on a spore | JUMP · JUMP again · land on |
| **AIR SPIN** (the jump hit, 2 per jump) · Slam / MEGA SLAM | `J` in the air · `S`+`J` in the air | CHOP in the air · stick down + CHOP |
| **SKYFALL** special: launch, lock on, dive, shockwave (12 s) | `H` | SKY |
| Swap weapon | `Q` | WPN |
| Ride: jump · hop off · REX ROAR | `Space` · `S`+`Space` · `L` | JUMP · down + JUMP · CLEAVE |
| Chop · 3-hit chain (3rd = FINISHER) | `J` (`X`/`F` in play) | CHOP ==> |
| Dash · Dash strike | double-tap `A`/`D` · chop mid-dash | — |
| Hop off IO-BEAST | `Space` while riding | JUMP |
| **SLOW** — 3 s time dilation, 18 s recharge | `K` | SLOW |
| **CLEAVE** — 360° AoE, breaks guards, 7 s recharge | `L` | CLEAVE |
| **ULTRA** — screen wipe, halves any boss, 4 min cooldown | `U` | ULTRA |
| Hall of Fame (title) | `H` | menu |
| Pause · Options · Mute · Next track · Fullscreen | `P` · `O` · `M` · `N` · `F` (menus) | `||` · `≡` · `♪` · `[ ]` |
| NEW GAME+ (after beating ROOT) | `G` | — |
| Start / skip · Continue from checkpoint | `Enter` · `C` | START / OK · CONT |
| Share / follow panel (menus, end screen) | `B` | ⤴ |

## v4.5.0 — "WEAPONS & DINOS": what's new

**Weapons.** Each has its own reach, damage and swing speed. Weapons drop from mini-bosses (guaranteed, a new one first), from ELITE spores (30%) and from crates (15%).
- Pick up the same weapon again to level it, up to L3.
- `Q` (WPN on touch) swaps between the weapons you own.
- The upgrade terminal sells **WEAPON TUNE**, which levels the weapon in your hand.

| Weapon | In-game look | Feel |
|---|---|---|
| DIGITAL AXE | `==>` | balanced; you start with it |
| ION SWORD | `-\|===>` | reach 7, fast slashes |
| PLASMA HAMMER | `=[##]` | slow, +2 damage, breaks shields, quake on a finisher |
| BIT BLASTER | `=[]>` | every swing fires a bolt across the screen |
| CHAIN WHIP | `~~~~~o` | reach 9, also hits the next lanes over |

**Tougher spores.**
- Normal and fast spores have 2 HP, flyers 2, spitters 3, shields 4, tanks 5, riders 5, thieves 6.
- Spores get +1 HP every 3 stages, and more again each NEW GAME+ loop.
- Every damaged spore shows an HP bar.
- **ELITE** spores (from stage 2, about 8% and rising) flash gold with an `ELITE` tag. They have double HP plus one, are worth 3× score, and drop 4 bits plus a 30% chance of a weapon.

**Dino riding.**
- **RAPTOR:** RAPTOR RIDERS appear in DATA FOREST, ENCRYPTION and UPLINK. Knock the rider off and ride it. It's fast, double jumps, and CHOP is a BITE.
- **IO-REX:** a **DINO EGG** sits in DATA FOREST, EDGE NODE and ROOT. Chop it open to hatch an IO-REX.
  - It's heavy and takes only 20% damage.
  - **CHOMP** swallows small spores whole ("GULP") for +2 bits.
  - **ROAR** (CLEAVE key) stuns and blasts back everything on screen.
  - Its jumps land as an **earthquake**.
  - It walks straight through spores.
- All mounts take a share of the hits and throw you when their HP runs out.
- `S`+`Space` hops off, with a short pause before you can climb back on.

**The jump hit is now its own move.**
- **AIR SPIN:** CHOP in the air spins a 360° ring, twice per jump. It hovers you briefly, hits flyers, and knocks back.
- Hold DOWN + CHOP in the air to SLAM instead. A SLAM from a double-jump height is still a MEGA SLAM.
- **SKYFALL** (`H` / SKY, 12 s recharge): IO-MAN rockets up, locks onto the biggest cluster or boss, and dives. On impact it does a wide stun, knockback, damage and a shockwave, and you're invulnerable for the whole move. It has its own cooldown bar in the status row.

**FEVER.** Hit a 15-kill combo for 10 s of rainbow IO-MAN, double bits, +1 damage and faster swings.

**Solid bodies.** IO-MAN can't walk through spores, mini-bosses or THE AUDITOR, and spores can't walk through IO-MAN or stack on top of each other.
- Bodies keep a one-column touch, so hits and chops still land.
- Tanks, elites, crates and bosses don't budge; lighter spores get shoved.
- You get past them by jumping over, dashing through, using SKYFALL or riding the REX.

**Touch.**
- New **SKY** and **WPN** buttons; CHOP spans the full deck width.
- The deck sits beside the side column, so the two no longer overlap.
- In menus only CONT and START/OK show.
- Gamepad: LB swaps weapon, LT is SKYFALL.

## v4.4.0 — "BITS & BYTES": what's new

**There's now a goal for the whole run.** The Great Fungus shredded the IONITY source code, and you collect it back.
- **BITS (`0` / `1`)** drop from spores, crates and mini-bosses, and trail over every obstacle. 8 bits compile into 1 **BYTE**.
- **The UPGRADE TERMINAL** opens after every main stage. Spend bytes on:
  - HP PATCH (+10 max HP)
  - AIR JUMP (triple jump)
  - AXE FIRMWARE (beyond AXE+2)
  - CLEAVE OVERCLOCK
  - SLOW EXTENDER
  - BIT MAGNET
  - ARMOR PLATING
  - ULTRA CAPACITOR
  - FULL REPAIR

  Prices rise per level, and the terminal tells bad jokes.
- **6 SOURCE FRAGMENTS (I · O · N · I · T · Y)** float high above an obstacle in stages 2, 3, 5, 6, 7 and 8. A normal jump can't reach them; you need the double jump. Collect all six for the **TRUE ENDING**.

**Mini-bosses.** Each one arrives after a stage's last wave and has its own attacks and lines. The door opens only when it's down.

| Stage | Mini-boss | Attacks |
|---|---|---|
| 1 | SUDO SHROOM | summons + charge |
| 2 | CAPTCHA CAP | blocks frontal hits, so stomp it or hit it from behind |
| 3 | BLAZE PORT 443 | lobbed fire + charge |
| 5 | ROOTKIT ROSIE | burrows and erupts under you (`^^^`) |
| 6 | HASH BROWN | ground-pound shockwaves you must jump; splits into spores at half HP |
| 7 | LAG SPIKE | teleports in, then quakes |
| 8 | SPAM KING | rains `@` mail and summons bombers |

Every mini-boss has a phase 2. Each drops two `%` bitpacks plus an item, often a revive floppy. ULTRA halves them.

**Dialogue and humour.**
- IO-MAN and the AEDI assistant talk at the start of each stage.
- Mini-bosses taunt you, and IO-MAN answers back.
- Spores shout things as they spawn: "spore-ry!", "morel support!", "we are fungi!".
- There are quips for finishers, 10-hit combos, stomps, items and fragments.

**Items:**

| Item | Effect |
|---|---|
| `c` JAVA (coffee) | speed and chop rate up for 8 s |
| `d` RUBBER DUCK | your next 5 chops are double-damage crits |
| `o` BUBBLE | blocks the next hit |
| `f` SAVE STATE floppy | revives you once at 50% HP |
| `M` MAGNET | pulls all loot in for 12 s |
| `%` BITPACK | +8 bits |

**Obstacles** (they hit spores too):

| Obstacle | Counter |
|---|---|
| Spike patches | jump them, or change lane |
| Pulsing laser gates | `:` warns before they fire; time it or double-jump them |
| Barrels rolling across lanes | jump them for +2 bits, "NICE HOP"; they bowl over spores |
| Mines | chop to defuse for +5 bits; spores set them off |

**Two DODGE bonus stages**, FIREWALL RUN and PACKET STORM: no enemies, just 22 seconds of barrels, laser gates and falling `[404]` blocks, with bits to grab. Finish without a hit for **FLAWLESS +2000**.

**Stronger jump.**
- Jump power is up from 14 to 17.
- **Double jump**, or triple with the upgrade.
- Better air control.
- **STOMP:** landing on a spore damages it and bounces you up.
- **Slam** is snappier with a bigger radius.
- Chopping from high up after a double jump does a **MEGA SLAM**, which sends a shockwave that knocks back and damages spores.

**Longer stages.** Stages 1 to 8 each gained a screen and a wave (3 to 5 screens now). Old checkpoints are carried over by stage name.

**Touch.**
- The joystick and button deck sit higher (about 48 px clear of the bottom edge), so they no longer collide with Chrome's or Android's bottom-edge popups.
- The side buttons moved up as well.

**Player name.** Names can now be up to **9 characters** (A–Z, 0–9, `-`), typed into a real text box with the phone keyboard. A clean-language filter applies:
- English and Afrikaans swear words and slurs are blocked, including leet spellings (`SH1T`) and stretched spellings (`FUUUCK`).
- The Firestore rules repeat the check on the server.

**IONITY CLOUD** (Firebase project `io-man`, **Spark / free plan**, Firestore in `africa-south1`):
- **Anonymous sign-in:** one stable id per phone or browser, with no account and no personal data.
- **`devices/{uid}`, the per-device save:** settings, checkpoint, local Hall of Fame, lifetime totals, fragment count and name. If the browser storage is wiped, it's restored on the next visit.
- **`scores`, the global leaderboard:** append-only. The rules check the uid, name format and cleanliness, and score/stage ranges. The Hall of Fame now shows **THIS DEVICE** next to **WORLD · IONITY CLOUD**, with your own entries marked.
- **`runs`, run logs:** the full DTA JSON per run, readable only by the device that wrote it.
- **Google Analytics 4 events:** `level_start`, `level_end`, `post_score`, `unlock_achievement` (fragments, mini-bosses), `spend_virtual_currency` (bytes), `share`.
- **SDK loading:** Firebase JS SDK 12.19.0 from the official gstatic CDN, fetched lazily 2.5 s after load. It uses Firestore *lite* to keep it small, and the game never waits on it.
- **Turning it off:** OPTIONS → CLOUD SAVE, or `?cloud=0`. Local `file://` copies stay offline unless you add `?cloud=1`.
- **Config:** lives in `firebase/` (`firebase.json`, `firestore.rules`, `firestore.indexes.json`). Deploy with `firebase deploy --only firestore,auth --project io-man`.
- **Live checks run:** sign-in; a device-doc write; a score and run log that showed up on the world board; and denied writes for a profane name, a 10-character name, a fake uid, an out-of-range score, another device's save, and listing all runs. The test documents were deleted afterwards.

## v4.3.0 — what's new

**Real IONITY logo splash (3 s).** Each load opens on one of the official logo cards, matching the logo images in `assets/logo/`:
- the large **www.IONITY.co.za** card on black;
- the smaller **www.IONITY.co.za** card on black;
- the clean **IONITY** wordmark on white.

The logo is a vector trace of the real artwork, coloured brand blue `#1658A4`, with a light sweep across it and a 3-second load line. Tap, click or any key skips it. A tap also unlocks audio and goes straight into the intro. Add `?splash=card`, `?splash=card-sm` or `?splash=clean` to force a card, or `?splash=0` to skip it.

**IO-MAN banner.** The IO-MAN wordmark is now built from the real IONITY letters:
- The **I** and **O** come straight from the logo.
- The **M** is made from mirrored halves of the logo's N.
- The **A** is the O's arch with an outlined crossbar.
- The dash follows the same outline style.

On the title screen the ANSI wordmark types in, then turns into the vector banner (cyan gradient, glow, light sweep), and they alternate.

**Share + follow panel** (`B`, the **SHARE / FOLLOW** menu item, **SHARE SCORE** in the run-data bar, **⤴** on touch, or the footer link):
- **Native share** where the phone supports it, attaching the score-card image when possible.
- **One-tap share links:** X, Facebook, LinkedIn, WhatsApp, Telegram, Bluesky, Reddit and email.
- **Copy link**, and a **score card PNG** (1200×630) showing your result, score, time and difficulty.
- **Follow links:** ionity.today, ionity.world, ionity.co.za, the GitHub IO-Man repo, GitHub Sponsors, LinkedIn, X, YouTube, TikTok and Bluesky.
- Each share is logged in the run data under `dta.shares`.

**Social banners** in `banners/`, made by the same card generator:
- OG 1200×630 — now the page's `og:image` and Twitter large card;
- square 1080;
- story 1080×1920;
- X header 1500×500.

**Assets.** `assets/logo/` holds the original logo files plus the vector SVGs.

## v4.2.0 — what's new

**ROTATE SCREEN button.** If a phone loads in portrait (auto-rotate off or locked), the rotate screen shows a **⟳ ROTATE SCREEN** button.
- **Android / Chrome:** it goes fullscreen and asks the browser to lock to landscape.
- **iPhone, or wherever the lock is refused:** IO-MAN turns the whole page 90° itself, so it works even with the system rotation lock on. Turn the phone to play.
- In sideways mode the joystick is remapped, so pushing toward the top of the game still moves into the depth lanes.
- A **⟲** button in the side buttons returns to portrait.
- The choice is remembered on the device, and it switches off by itself if the phone really rotates to landscape.

## v4.1.0 — what's new

**New IONITY logo.** A block-letter ANSI wordmark (ANSI Shadow style): solid `█` letters with a `╗║╚═╝` drop shadow, a six-step cyan gradient, a typewriter-style reveal and a light sweep. It appears on the boot screen and the intro. The title screen uses the same style for **IO-MAN**.

**Vector glyph renderer.** Block characters (`█ ▀ ▄ ░ ▒ ▓`) and box-drawing characters (`─ │ ┌ ═ ║ ╔ ╟` …) are drawn as shapes rather than font glyphs, the way real terminals do it. The logo and frames are pixel-perfect and joined up on every font, phone and DPI.

**Neater GUI.**
- The title screen has a framed **MENU** (NEW RUN / CONTINUE / OPTIONS / HALL OF FAME / FULLSCREEN, navigated with W/S + Enter or the stick) next to a **CONTROLS** panel, which switches to touch controls on phones.
- There's a dedicated **Hall of Fame** screen (`H`).
- The boot POST, options, pause, stage cards and run summary all use double-line ANSI panels with drop shadows.
- The HUD is laid out in fixed bracketed columns: `[ STAGE ]`, `[ TIME ]`, `[ DIFF ]`, then the wave map in the centre, with `[ SCORE ]` and `[ COMBO / AI ]` on the right.
- The ground line carries block-meter HP and ARMOR bars.
- Below it, an aligned ability row shows a meter, cooldown and READY state for SLOW, CLEAVE and ULTRA, plus your gear.

## v4.0.0 — what's new

**Combat depth.** The third chop in a chain is a **FINISHER**: double damage, launches the spore, and adds a short hit-stop. Double-tap left or right to **dash** (brief invulnerability). Chopping mid-dash is a **DASH STRIKE** that shatters shield guards.

**IO-BEAST mount** (original design). RIDERs bring one in at wave 2 of FIREWALL, EDGE NODE and UPLINK. Knock the rider off, then walk into the beast to ride it. While riding you move 35% faster and CHOP breathes a piercing ion stream. The beast soaks 70% of incoming damage, and three hits throws you off. `Space` hops off.

**Two-phase bosses.** At 50% HP, THE AUDITOR enters **ZERO TOLERANCE**: faster, longer dashes that scatter spores, and two extra shields. THE GREAT FUNGUS **ENRAGES**: it moves faster, volleys faster, and drops **SPORE RAIN** on your position. A banner warns when either phase starts.

**World map.** Between stages, an ASCII route map shows IO walking to the next node, with the next stage's brief.

**Difficulty and replay.** EASY / NORMAL / IRON scale spore damage, speed, HP and the Director's ceiling. **NEW GAME+** loops the run with your gear kept, and spores get +15% damage, +10% speed and +1 HP each loop. The **Hall of Fame** keeps a local top 5 with 3-letter initials, rank, stage, loop and difficulty.

**Weather per stage.** Data bits in the server row, embers in FIREWALL, falling leaves in DATA FOREST, glyph dust in ENCRYPTION, sparks on the antennas, rain over the UPLINK sea, and rising spores in ROOT.

**Platform.**
- **Gamepad**, standard mapping: stick or d-pad to move, A jump, X chop, Y cleave, B/LB slow, RB/RT ultra, Start pause, Back mute.
- **Options** (`O`): music and SFX volume, difficulty, screen shake, CRT scanlines, reduced flashing, phone haptics, and reset. Settings persist on the device.
- **Haptics** on hits and finishers.
- An inline **IO** icon for the browser tab and home screen.
- DTA now also logs finishers, dashes, mounts, NG+ loop and Hall of Fame rank. Accuracy counts swings that connected.

## v3.0.0

**Golden Axe-style scrolling.** Main stages are 2–4 screens long. The camera only moves forward. Each area locks the screen for a wave, then `GO >>>` flashes and you push on, and the door waits at the far end. The HUD map tracks your run: `WAVE 2/4 [===+====>----|----|----D]`.

**Nine scrolling stages + three bonus**, each with its own animated ASCII parallax backdrop. The two new stages are **DATA FOREST** and **UPLINK** (a bridge over a data sea). ROOT is three zones deep, and THE GREAT FUNGUS rises in the last one.

**PACKET THIEF.** It sprints across after a cleared area, and every hit shakes loot loose. Catch it before it leaves the screen. **DATA CRATES** sit along the route and always drop loot.

**Boot + intro + music.** A BIOS-style `PRESS ANY KEY / TAP TO BOOT` screen unlocks audio (browsers block sound until you interact). The 7-second tree intro plays with its own theme, *SEED*, and the title gets *IO-MAN THEME*. There are six original chiptune loops in all: SEED, IO-MAN THEME, RUN-N-GUN, AXE OF IONS, EDGE RUNNER, ROOT SYSTEM. They are composed for this build, and no third-party soundtracks are reproduced.

**Mobile.** The canvas resizes to fit any screen and re-renders its font at the device pixel ratio, so glyphs stay sharp from phone to 4K. Touch devices get a drag joystick and a see-through terminal-style button deck with live cooldowns (SLOW 12s / READY). Page chrome is hidden on short landscape screens, and safe-area insets are respected.

## Core systems (from v2)

The arena has 11 depth lanes with perspective, depth-sorted rendering, depth shading and shadows.

**Thirteen types** (rider added in v4). Walker, fast, tank (3 HP), flyer, spitter (kites and lobs), shield (blocks two frontal hits), bomber (fuses and blows, and hurts spores too), splitter (spawns minis), mini, sprout (bonus), packet thief, data crate. **THE AUDITOR** is the GOVERNANCE midboss (lane dash, calls shields). **THE GREAT FUNGUS** is the ROOT boss (3D spore volleys, minions), and ULTRA halves it.

**Loot and gear:** `+` HP, `A` Ion Armor (absorbs 60%, cap 75), `B` Ion Boots (x2), `X` Axe+ (x2), `S` Spread Shot (three-lane ion bolts, 12 s), `U` Ultra charge (−60 s), and `$ @ *` for score.

**AI Director.** It scales spawn pressure 0.65×–1.6× based on your HP, kill rate and damage taken, and shifts drops toward HP when you're struggling. Enemy roles are rusher, flanker and kiter.

**AEDI Coach** gives one-line callouts driven by the live run. **Checkpoints** save your progress, and `C` continues from the furthest stage. **DTA** records full run telemetry that you can COPY or DOWNLOAD as JSON.

## Stages

| # | Name | Screens | Waves | New | Theme | Track |
|---|---|---|---|---|---|---|
| 1 | INIT | 2 | 2 | walkers | city | RUN-N-GUN |
| 2 | HANDSHAKE | 3 | 3 | fast | server racks | RUN-N-GUN |
| B | SPORE COIN RAIN | 1 | 20 s | `$` `@` | city | IO-MAN THEME |
| 3 | FIREWALL | 3 | 3 | tank, spitter | firewall flames | EDGE RUNNER |
| 4 | GOVERNANCE | 3 | 3 + Auditor | flyer, shield, THE AUDITOR | courthouse | AXE OF IONS |
| 5 | DATA FOREST | 4 | 4 | splitter swarms | forest | AXE OF IONS |
| B | CHOP FRENZY | 1 | 15 s | sprouts | forest | RUN-N-GUN |
| 6 | ENCRYPTION | 4 | 4 | bomber, splitter | cipher ruins | EDGE RUNNER |
| 7 | EDGE NODE | 4 | 4 | everything | antenna field | EDGE RUNNER |
| 8 | UPLINK | 4 | 4 | bomber-heavy | bridge / data sea | RUN-N-GUN |
| B | HP SHRINE | 1 | 15 s | `+` `A` `*` | courthouse | IO-MAN THEME |
| 9 | ROOT | 3 | 2 + boss | THE GREAT FUNGUS | root cavern | ROOT SYSTEM |

v4.4 changes to the table above:
- stages 1–8 are one screen and one wave longer, with a mini-boss in every stage except 4 (THE AUDITOR) and 9 (THE GREAT FUNGUS);
- bonus order: COIN RAIN → **FIREWALL RUN** (dodge) → CHOP FRENZY → **PACKET STORM** (dodge) → HP SHRINE.

## Build

The game is vanilla JS in one file (~1,500 lines, ~100 KB). It draws a 112×30 character grid onto a canvas, using the Ionity palette (cyan `#00c6ff` on `#0d1b2a`) plus the ANSI LGREEN / ORANGE / RED / PURPLE colours from the AEDI shell scripts.

v4.5 was verified headless in Chromium (`t45.js`). Checks:
- mob HP (normal 2, tank 5);
- body block (IO-MAN stopped at a tank);
- sword reach 8, blaster bolt at 22 cols, whip on the next lane over, hammer breaking a shield, weapon swap;
- an ELITE spawning with 9 HP;
- AIR SPIN killing a flyer;
- SKYFALL clearing a pack (12 s cooldown);
- FEVER at a 15 combo;
- raptor mount, double jump, bite and hop-off;
- egg → IO-REX hatch, mount, ROAR stunning 5–6 spores, quake landing and CHOMP;
- WEAPON TUNE to L2.

The v4.4 and v4.3 suites, the regression suite and the rotate suite all re-ran with zero console errors.

v4.4 was verified headless in Chromium (`test4.js` regression updated for the name box, `t44.js` features, `t43.js` splash/share, `rot.js` rotate). Checks:
- double jump (peak about 5 rows) and stomp bounce;
- mega slam clearing a group;
- spike damage;
- the SUDO SHROOM intro dialogue, phase 2, kill, drops and door;
- bubble and floppy;
- stage clear to the terminal: purchase, then leave to the world map;
- the HANDSHAKE fragment pickup at height 6.2;
- EDGE NODE lasers, barrels and mines;
- a FIREWALL RUN flawless clear;
- the lifted touch deck on a Pixel 7;
- the swear filter (4/4 bad names rejected), with `JOHAN-986` accepted.

Zero console errors. A cloud end-to-end run against the live `io-man` project passed.

v4.3 was verified headless in Chromium. Checks:
- all three splash cards, and auto-dismissal at 3 s;
- key and tap skipping straight to the intro;
- game input frozen behind the splash and the share panel;
- the title switching between ANSI and the vector banner;
- the share panel opening from the title, the end screen and the touch ⤴ button;
- score-card download and banner generation;
- Pixel 7 splash in portrait and landscape.

The v4 regression suite and the rotate-screen suite were re-run with zero console errors.

v4 was verified headless in Chromium (Playwright) with an injected standard gamepad: options persistence, gamepad start and movement, finisher chain, dash strike breaking a shield, rider to beast to mount to thrown, UPLINK weather, world map transition, Auditor and Fungus phase 2 (spore rain), win to initials to Hall of Fame to NEW GAME+ (gear kept, damage x1.15), game over to initials, and hit-stop freezing game time. A Pixel 7 landscape pass rendered the touch deck. Zero console errors. The v3 checks below still apply.

v3 was verified headless in Chromium (Playwright). The desktop run covered boot, intro, title, a scrolling wave lock and release, the door at the end of the level, the themed long stages, a thief loot drop, THE AUDITOR, the ROOT boss zone, ULTRA halving the boss (44→22), victory and the bonus stage. The Pixel 7 portrait run confirmed the rotate screen. The landscape run confirmed the canvas fit (791×410 in an 839×412 viewport) and joystick input. Zero console errors.

```
sha256  index.html / IONITY_IO-MAN_GET_OVER_IT_DOOR.html   719d9a5069bee1be33ceb8ffa73ae6d0fc2b2b097faf8a5d09b97663c246e320   v4.5.0
sha256  (v4.4.0)                                             3e778335608177cfbac1321a1a26fe984bbf84994fdab04f3dffb3a6630906f6
sha256  (v4.3.0)                                             14a7ee6d0d8ab3494b486ba0d0a2ee0e94268df4d3cfb7c31b79c3dd637eb176
sha256  (v4.2.0)                                             2798487587b53df2e2671db7e17e7dbb3af84afb7cbfdb47d30c7ec1af639f51
sha256  (v4.1.0)                                             9593264b56904f35148e4d83b857b3b043fc7f264283c06b44bceee2323dc08e
sha256  (v4.0.0)                                             4584fdeeaf36bf4fd8f61789721fc38ba41d8a36b9b7801afb9f107ca6818daa
sha256  (v3.0.0)                                             ba4618e83bb9f22be75d25f1e2491b8201caa3a6a16e99c9a9777037cc09ae54
sha256  v1/IONITY_GET_OVER_IT_DOOR.html                     3a46b422853e8d61012c99a808cf25c2c3e3c71dff6af47f0d79b3f92f9580d7   v1.0.0
v2.0.0 (9eff69c1…) is kept in git history.
```

## Repository layout

```
index.html                            v4.5.0 — served at ionity.fun
IONITY_IO-MAN_GET_OVER_IT_DOOR.html   v4.5.0 (same file, descriptive name)
firebase/                             IONITY CLOUD config: firebase.json, firestore.rules, firestore.indexes.json (project io-man)
banners/                              social banners (OG 1200x630, square, story, X header)
assets/logo/                          official IONITY logo originals + vector traces (IONITY, IO-MAN)
v1/                                   GET OVER IT DOOR v1.0.0 (GME-2026-09-001)
previews/                             headless screenshots
README.md                             this file
```

---

© 2018–2026 Antwerp Designs | Ionity (Pty) Ltd · All rights reserved · Policy 986 AED · AED 900
Ionity refers exclusively to www.ionity.today / www.ionity.world / ionity.fun and is not affiliated with www.ionity.com.

**BUILDING TOMORROW, TODAY**
