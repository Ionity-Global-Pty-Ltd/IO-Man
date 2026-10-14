/* PAWN* // OXEN SOVEREIGN REALM — VBLOCKS APEX v11 | 00-firebase.js | (c) 2018-2026 Ionity (Pty) Ltd | Policy 986 AED | ionity.fun/pawn */
/* =====================================================================
   0. FIREBASE (project io-man) — auth, realtime database
   ===================================================================== */
firebase.initializeApp({ apiKey: "AIzaSyBDWHaRVFf1tmC7T3fbyk2MpIBeuyoyoIc", authDomain: "io-man.firebaseapp.com", databaseURL: "https://io-man-default-rtdb.europe-west1.firebasedatabase.app", projectId: "io-man", storageBucket: "io-man.firebasestorage.app", messagingSenderId: "737401934489", appId: "1:737401934489:web:bfe305eba0bdc4416c9e08" });
const auth = firebase.auth(), db = firebase.database();
const GOOGLE_CLIENT_ID = "737401934489-3uauv8eq33latv0ckvq8melp3p0k4in2.apps.googleusercontent.com";
let currentUser = null, realm = 'ionity-fun', gameStarted = false, isHost = false, presenceRef = null, lastPresencePush = 0, lastSave = 0, dirtySave = false, lastHostTick = 0;
const SV = () => firebase.database.ServerValue.TIMESTAMP;
const $ = id => document.getElementById(id);
function authError(m) { const el = $('auth-error'); el.textContent = m; el.classList.remove('hidden'); }
function worldRef(p) { return db.ref(`world/${realm}/oxen/${p}`); }
function escapeHtml(s) { return String(s ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

function initGoogleButton() {
    const host = $('gsi-btn');
    if (!window.google || !google.accounts) { $('btn-google-fallback').classList.remove('hidden'); return; }
    try {
        google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, ux_mode: 'popup', use_fedcm_for_prompt: true, callback: r => auth.signInWithCredential(firebase.auth.GoogleAuthProvider.credential(r.credential)).catch(e => authError('Sign-in failed: ' + e.message)) });
        google.accounts.id.renderButton(host, { theme: 'filled_black', size: 'medium', shape: 'pill', text: 'signin_with', width: 220 });
    } catch (e) { $('btn-google-fallback').classList.remove('hidden'); }
}
(function waitGsi(n){ if (window.google && google.accounts) initGoogleButton(); else if (n > 0) setTimeout(() => waitGsi(n-1), 250); else initGoogleButton(); })(40);
$('btn-google-fallback').addEventListener('click', () => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).catch(e => authError(e.code === 'auth/popup-blocked' ? 'Popup blocked — allow popups for ionity.fun or Play as Guest.' : 'Sign-in failed: ' + e.message)));
$('btn-guest').addEventListener('click', () => auth.signInAnonymously().catch(e => authError('Guest sign-in failed: ' + e.message)));
$('btn-signout').addEventListener('click', () => auth.signOut().then(() => location.reload()));
db.ref('.info/connected').on('value', s => { $('server-badge').textContent = s.val() ? 'SERVER: IO-MAN · EUROPE · ONLINE' : 'SERVER: RECONNECTING…'; });
(function pickRealm(){ const h = location.hostname; if (h.includes('ionity.today')) $('realm-select').value = 'ionity-today'; else if (!h.includes('ionity.fun')) $('realm-select').value = 'pawn-centurion'; })();

auth.onAuthStateChanged(async user => {
    currentUser = user;
    if (!user) { $('auth-status').textContent = 'Sign in with Google to sync your hero across devices, or play as a guest.'; $('btn-enter-realm').disabled = true; $('btn-signout').classList.add('hidden'); return; }
    $('auth-status').textContent = user.isAnonymous ? 'Guest session — progress saved to this browser only.' : `Linked: ${user.displayName || user.email}`;
    $('gsi-btn').classList.add('hidden'); $('btn-guest').classList.add('hidden'); $('btn-google-fallback').classList.add('hidden'); $('btn-signout').classList.remove('hidden');
    try {
        const snap = await db.ref('players/' + user.uid).get();
        if (snap.exists()) {
            const d = snap.val();
            Object.assign(hero, { name: d.name, classType: d.classType || 'druid', isOxen: d.isOxen !== false, level: d.level || 1, xp: d.xp || 0, xpNext: d.xpNext || 100, maxHp: d.maxHp || 260, zart: d.zart ?? 180, hides: d.hides || 0, kills: d.kills || 0, totalXp: d.totalXp || 0, bonusDmg: d.bonusDmg || 0, passiveZartPer10s: d.passiveZartPer10s || 0, plots: d.plots || {} });
            hero.hp = hero.maxHp; if (d.armor) hero.armor = Object.assign({ helm:0, chest:0, legs:0 }, d.armor); if (d.res) hero.res = Object.assign({ wood: 0, stone: 0, ore: 0, scales: 0 }, d.res); if (d.quest) hero.quest = d.quest;
            if (d.talents) hero.talents = Object.assign({ vitality: 0, fury: 0, skystep: 0 }, d.talents); hero.talentPts = d.talentPts || 0; hero.relics = d.relics || 0; hero.drums = !!d.drums; hero.basesDestroyed = d.basesDestroyed || 0;
            $('input-hero-name').value = hero.name; selectClassCard(hero.classType); setRig(hero.isOxen); if (d.realm) $('realm-select').value = d.realm;
            $('auth-status').textContent += ' · ☁ cloud save loaded';
        } else { const base = (user.displayName || 'Thunderhoof').replace(/[^A-Za-z0-9_]/g, '_').slice(0, 14); $('input-hero-name').value = base + '_' + Math.floor(Math.random()*99); }
    } catch (e) { authError('Could not load save: ' + e.message); }
    $('btn-enter-realm').disabled = false;
});
