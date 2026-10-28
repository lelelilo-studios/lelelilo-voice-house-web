// The Voice House index: the house in cross-section, a window per room. Hover a window to see its clip (and hear it
// with sound on); open it and a twilight circle closes on the room. Below: the meter (what the whole house took),
// every room by family, and the care instructions (credits and licences). The studio intro plays once per session.
(() => {
  const D = window.SHOWCASE || { rooms: [], families: [], floors: [], total: {} };
  const $ = s => document.querySelector(s);
  const esc = s => String(s ?? '').replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const store = { get: k => { try { return sessionStorage.getItem(k); } catch { return null; } }, set: (k, v) => { try { sessionStorage.setItem(k, v); } catch { /* private mode */ } } };
  const fromRoom = /\/demos\//.test(document.referrer || '') || !!location.hash;
  const num = (x, d = 0) => x == null ? '–' : Number(x).toLocaleString('en', { minimumFractionDigits: d, maximumFractionDigits: d });

  // ---- the studio intro: once per session, never on the way back from a room
  const playIntro = () => window.LeleliloIntro && window.LeleliloIntro.play({ base: 'lelelilo-intro/' });
  if (!store.get('vh-intro') && !fromRoom && !/[?&]nointro\b/.test(location.search)) { store.set('vh-intro', '1'); playIntro(); }
  $('#intro-btn').addEventListener('click', () => playIntro());

  // ---- the sky: a few hundred stars, twinkling gently
  const cv = $('#stars'), g = cv.getContext('2d');
  let stars = [];
  function sizeSky() {
    const dpr = Math.min(2, devicePixelRatio || 1);
    cv.width = innerWidth * dpr; cv.height = innerHeight * dpr; g.setTransform(dpr, 0, 0, dpr, 0, 0);
    let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    stars = Array.from({ length: Math.round(innerWidth * innerHeight / 5200) }, () => ({ x: rnd() * innerWidth, y: rnd() * innerHeight * 0.75, r: 0.4 + rnd() * 1.2, p: rnd() * 6.3 }));
  }
  function sky(t) {
    g.clearRect(0, 0, innerWidth, innerHeight);
    for (const s of stars) {
      g.globalAlpha = reduced ? 0.6 : 0.35 + 0.35 * Math.sin(s.p + t / 900);
      g.fillStyle = '#fbf1de'; g.beginPath(); g.arc(s.x, s.y, s.r, 0, 6.283); g.fill();
    }
    if (!reduced) requestAnimationFrame(sky);
  }
  sizeSky(); addEventListener('resize', sizeSky); requestAnimationFrame(sky);

  // ---- the house: floors from the top, a window per room
  const rooms = D.rooms.slice().sort((a, b) => a.floor - b.floor || a.pos - b.pos);
  const floors = $('#floors');
  D.floors.forEach((name, f) => {
    const list = rooms.filter(r => r.floor === f);
    if (!list.length) return;
    const el = document.createElement('div');
    el.className = `floor${list.length === 1 ? ' single' : ''}`;
    el.style.setProperty('--n', String(Math.max(list.length, 1)));
    el.innerHTML = `<span class="floor-name">${esc(name)}</span><div class="rooms"></div>`;
    const box = el.querySelector('.rooms');
    for (const r of list) box.appendChild(windowFor(r));
    floors.appendChild(el);
  });

  function meterLine(r) {
    const m = r.meter || {};
    if (m.audio_s == null) return '';
    return `${num(m.audio_s)} s of sound · ${num(m.energy_wh, 2)} Wh`;
  }

  function windowFor(r) {
    const a = document.createElement('a');
    a.className = 'room'; a.href = `demos/${r.slug}/`; a.id = r.slug; a.style.setProperty('--c', r.accent);
    a.innerHTML = `<div class="win">${r.poster ? `<img src="${esc(r.poster)}" alt="" loading="lazy" decoding="async">` : `<span class="empty">${r.glyph || ''}</span>`}
        ${r.clip ? `<video muted loop playsinline preload="none" data-src="${esc(r.clip)}"></video>` : ''}</div>
      <span class="no">${r.glyph || ''}${esc(r.no)}</span>${r.public ? '' : '<span class="private">private</span>'}
      <h3>${esc(r.title)}</h3><p class="feat">${esc(r.feature)}</p><p class="m">${esc(meterLine(r))}</p>`;
    a.title = r.tagline || r.feature;
    a.addEventListener('click', e => { e.preventDefault(); open(r, a, e); });
    const v = a.querySelector('video');
    const on = () => {
      if (v && !reduced) { if (!v.src) v.src = v.dataset.src; v.play().then(() => a.classList.add('live')).catch(() => {}); }
      preview(r);
    };
    const off = () => { a.classList.remove('live'); if (v) v.pause(); stopPreview(); };
    a.addEventListener('pointerenter', on); a.addEventListener('focus', on);
    a.addEventListener('pointerleave', off); a.addEventListener('blur', off);
    return a;
  }

  // ---- sound: off by default; on, a hovered window plays a few seconds of its room
  const btn = $('#sound-btn'), audio = $('#preview');
  let soundOn = store.get('vh-sound') === '1', stopAt = 0;
  const setSound = on => {
    soundOn = on; store.set('vh-sound', on ? '1' : '0'); btn.setAttribute('aria-pressed', String(on));
    btn.setAttribute('aria-label', `Sound: ${on ? 'on' : 'off'}. ${on ? 'Hover a room to hear it.' : 'Turn on to hear a room as you hover it.'}`);
    if (!on) stopPreview();
  };
  btn.addEventListener('click', () => setSound(!soundOn));
  setSound(soundOn);
  function preview(r) {
    if (!soundOn || !r.preview) return;
    audio.src = r.preview.src; audio.currentTime = 0; stopAt = (r.preview.at || 0) + (r.preview.len || 7);
    audio.addEventListener('loadedmetadata', () => { audio.currentTime = r.preview.at || 0; audio.play().catch(() => {}); }, { once: true });
    audio.load();
  }
  function stopPreview() { audio.pause(); }
  audio.addEventListener('timeupdate', () => { if (audio.currentTime >= stopAt) audio.pause(); });

  // ---- the host on the doorstep dozes after half a minute of quiet
  const host = $('#host');
  let idleTimer = 0;
  function wake() { host.classList.remove('dozing'); clearTimeout(idleTimer); idleTimer = setTimeout(() => host.classList.add('dozing'), 30000); }
  for (const ev of ['pointerdown', 'keydown', 'wheel', 'touchstart', 'scroll']) addEventListener(ev, wake, { passive: true });
  wake();

  // ---- the dive: a twilight circle closes on the room, rimmed with a stitch in its colour, then the room opens
  const dive = $('#dive'), svg = $('#dive-svg');
  function open(r, el, ev) {
    const href = `demos/${r.slug}/`;
    stopPreview();
    if (reduced) { location.href = href; return; }
    const rect = el.getBoundingClientRect();
    const cx = ev && ev.clientX ? ev.clientX : rect.left + rect.width / 2, cy = ev && ev.clientY ? ev.clientY : rect.top + rect.height / 2;
    const W = innerWidth, H = innerHeight, R0 = Math.hypot(Math.max(cx, W - cx), Math.max(cy, H - cy)) + 20;
    svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
    svg.innerHTML = `<defs><mask id="hole"><rect width="${W}" height="${H}" fill="#fff"/><circle id="hole-c" cx="${cx}" cy="${cy}" r="${R0}" fill="#000"/></mask></defs>
      <rect width="${W}" height="${H}" fill="#12343b" mask="url(#hole)"/>
      <circle id="rim" cx="${cx}" cy="${cy}" r="${R0}" fill="none" stroke="${esc(r.accent)}" stroke-width="4" stroke-dasharray="14 10" stroke-linecap="round"/>
      <circle id="knot" cx="${cx}" cy="${cy}" r="0" fill="${esc(r.accent)}"/>`;
    dive.classList.add('on');
    const hole = svg.querySelector('#hole-c'), rim = svg.querySelector('#rim'), knot = svg.querySelector('#knot');
    const T = 700, t0 = performance.now();
    (function step(now) {
      const k = Math.min(1, (now - t0) / T), e = 1 - Math.pow(1 - k, 3), rad = Math.max(0, R0 * (1 - e));
      hole.setAttribute('r', rad); rim.setAttribute('r', rad); rim.setAttribute('stroke-dashoffset', String(-k * 120));
      if (k > 0.85) knot.setAttribute('r', String(8 * (k - 0.85) / 0.15));
      if (k < 1) requestAnimationFrame(step); else setTimeout(() => { location.href = href; }, 90);
    })(t0);
  }
  addEventListener('pageshow', () => { dive.classList.remove('on'); svg.innerHTML = ''; });

  // ---- the meter: what the whole house took
  const T = D.total || {};
  $('#tot-audio').textContent = num(T.audio_s);
  $('#tot-gen').textContent = num(T.gen_s);
  $('#tot-wh').textContent = num(T.energy_wh, 1);
  if (T.energy_wh) {
    const kettle = T.energy_wh * 3600 / 2000, phone = T.energy_wh / 15 * 100;
    $('#kettle').textContent = `About what a kettle uses in ${num(kettle)} seconds, or ${num(phone)}% of one phone charge.`;
  }
  $('#machine').textContent = `Measured on ${D.machine || 'this house\'s PC'}.`;
  $('#bill').innerHTML = D.rooms.slice().sort((a, b) => a.no.localeCompare(b.no)).map(r => {
    const m = r.meter || {};
    return `<tr><td>${esc(r.no)}</td><td><a href="demos/${esc(r.slug)}/">${esc(r.title)}</a></td><td class="n">${num(m.audio_s)} s</td><td class="n">${num(m.gen_s, 1)} s</td><td class="n">${num(m.energy_wh, 2)} Wh</td></tr>`;
  }).join('');

  // ---- every room, by family
  const fam = $('#families');
  for (const f of D.families) {
    const list = D.rooms.filter(r => r.family === f).sort((a, b) => a.no.localeCompare(b.no));
    if (!list.length) continue;
    const sec = document.createElement('section'); sec.className = 'family';
    sec.innerHTML = `<h3>${esc(f)}</h3><div class="cards"></div>`;
    const cards = sec.querySelector('.cards');
    for (const r of list) {
      const a = document.createElement('a');
      a.className = 'card'; a.href = `demos/${r.slug}/`; a.style.setProperty('--c', r.accent);
      a.innerHTML = `<span class="ic">${r.glyph || ''}</span><span><b>${esc(r.no)} · ${esc(r.title)}</b><span>${esc(r.tagline || r.feature)}</span></span>`;
      a.addEventListener('click', e => { e.preventDefault(); open(r, a, e); });
      cards.appendChild(a);
    }
    fam.appendChild(sec);
  }
  if (!D.rooms.some(r => r.slug === '18-dinner-table')) { const p = $('#pyannote-credit'); if (p) p.remove(); }

  // ---- care instructions
  const about = $('#about');
  const openAbout = e => { if (e) e.preventDefault(); if (!about.open) about.showModal(); };
  $('#about-btn').addEventListener('click', openAbout);
  $('#credits-link').addEventListener('click', openAbout);
  about.addEventListener('click', e => { if (e.target === about || e.target.closest('[data-close]')) about.close(); });

  // ---- back from a room: light its window
  if (location.hash) {
    const el = document.getElementById(location.hash.slice(1));
    if (el) { el.scrollIntoView({ block: 'center' }); el.focus({ preventScroll: true }); }
  }
})();
