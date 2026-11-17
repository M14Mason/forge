/* Forge: story lessons, slider labs, quizzes and mastery.
   Method: Instagram-story scenes (one idea, one caption, animated), lab, quiz right after,
   mixed formats, misses shown + re-asked reworded ~4 questions later, mastery = 2 right in a row. */
const FX = window.FORGE_EXTRA || { stories: {}, minis: [], projects: [], newLessons: [] };
const STORIES = FX.stories;
Object.assign(STORIES, (window.FORGE_EXTRA2 || {}).stories || {});
const titleOf = id => (typeof LMAP !== 'undefined' && LMAP[id]?.title) || STORIES[id]?.title || id;
const MINIS = FX.minis, MMAP = Object.fromEntries(MINIS.map(m => [m.id, m]));
const FMT = { scn: 'Scenario', def: 'Definition', term: 'Name the term', tf: 'True or false', calc: 'Calculate', not: 'Which is NOT' };

/* ---------- small helpers ---------- */
const sd = s => `style="--d:${(+s).toFixed(2)}s"`;
function capMd(s) {
  const parts = [];
  s = esc(s).replace(/`([^`]+)`/g, (m, c) => { parts.push('<code>' + c + '</code>'); return '\u0000' + (parts.length - 1) + '\u0000'; });
  s = s.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>');
  return s.replace(/\u0000(\d+)\u0000/g, (m, i) => parts[i]);
}
const KW = new Set('def return if elif else for in while import from True False None and or not break continue is pass'.split(' '));
const BI = new Set('print len range int float str input round sum min max sorted append split strip upper lower get sort random gauss seed'.split(' '));
function hl(src) {
  const re = /(#.*)|(f?"[^"\n]*"?|f?'[^'\n]*'?)|([A-Za-z_]\w*)|(\d+\.?\d*)/g;
  let out = '', last = 0, m;
  while ((m = re.exec(src))) {
    out += esc(src.slice(last, m.index));
    const [w, c, s, id, n] = m;
    const cls = c ? 'tc' : s ? 'ts' : id ? (KW.has(id) ? 'tk' : BI.has(id) ? 'tb' : '') : 'tn';
    out += cls ? `<span class="${cls}">${esc(w)}</span>` : esc(w);
    last = m.index + w.length;
  }
  return out + esc(src.slice(last));
}
function rng(seed) { let a = seed >>> 0; return () => { a |= 0; a = a + 0x6D2B79F5 | 0; let t = Math.imul(a ^ a >>> 15, 1 | a); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function gaussFrom(r) { return () => { let u = 0, v = 0; while (!u) u = r(); while (!v) v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); }; }
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }
const money = v => (v < 0 ? '-$' : '$') + Math.abs(v).toLocaleString('en-US', { maximumFractionDigits: 0 });
function pathD(ser, X, Y) { return ser.map((v, i) => (i ? 'L' : 'M') + X(i).toFixed(1) + ' ' + Y(v).toFixed(1)).join(''); }
function scaler(all, W, H, pad = 10, zero = false) {
  let mn = Math.min(...all), mx = Math.max(...all); if (zero) mn = Math.min(0, mn);
  const p = (mx - mn) * 0.08 || 1; mn -= p; mx += p;
  return v => H - pad - (v - mn) / (mx - mn) * (H - 2 * pad);
}

/* ---------- animated scene renderers (each returns HTML; CSS plays it when .play is added) ---------- */
const R = {
  code(p) {
    let t = 0.25, h = '<div class="an-code">';
    p.lines.forEach(l => {
      const n = Math.max(3, l.length), dur = Math.min(1.5, 0.03 * n + 0.3);
      h += `<div class="an-ln"><span class="a-type" style="--d:${t.toFixed(2)}s;--t:${dur.toFixed(2)}s;--n:${n}">${hl(l) || '&nbsp;'}</span></div>`;
      t += l.trim() ? dur + 0.15 : 0.1;
    });
    h += '</div>';
    if (p.out) h += `<div class="an-out"><div class="an-lbl a a-fade" ${sd(t)}>output</div>` + p.out.map((o, i) => `<div class="a a-up" ${sd(t + 0.35 + i * 0.4)}>${esc(o)}</div>`).join('') + '</div>';
    return h;
  },
  eval(p) {
    return '<div class="an-eval">' + p.rows.map((r, i) => `${i ? `<div class="an-dn a a-fade" ${sd(0.2 + i * 1.3)}>↓</div>` : ''}<div class="an-er ${i === p.rows.length - 1 ? 'fin' : ''} a a-up" ${sd(0.4 + i * 1.3)}>${hl(r)}</div>`).join('') + '</div>';
  },
  table(p) {
    return '<div class="an-tab">' + p.rows.map((r, i) => `<div class="an-tr a a-up" ${sd(0.3 + i * 0.9)}><code class="an-tc">${hl(r[0])}</code><b class="a a-pop" ${sd(0.75 + i * 0.9)}>${esc(r[1])}</b>${r[2] ? `<span>${esc(r[2])}</span>` : ''}</div>`).join('') + '</div>';
  },
  box(p) {
    return '<div class="an-boxes">' + p.items.map(([n, v, k], i) => `<div class="an-box a a-up" ${sd(0.3 + i * 1)}><div class="an-bn">${esc(n)}</div><div class="an-bv a a-drop" ${sd(0.8 + i * 1)}>${esc(v)}</div>${k ? `<div class="an-bk">${esc(k)}</div>` : ''}</div>`).join('') + '</div>';
  },
  bars(p) {
    const mx = Math.max(...p.data.map(d => Math.abs(d[1])));
    return '<div class="an-bars">' + p.data.map(([l, v, s], i) => `<div class="an-bc"><div class="an-bw"><div class="an-bval a a-fade" ${sd(0.7 + i * 0.45)}>${esc(s ?? v)}</div><div class="an-b a-grow ${v < 0 ? 'neg' : ''}" style="height:${Math.max(3, Math.abs(v) / mx * 100).toFixed(1)}%;--d:${(0.3 + i * 0.45).toFixed(2)}s"></div></div><div class="an-bl">${esc(l)}</div></div>`).join('') + '</div>';
  },
  vs(p) {
    const side = (o, cls, d) => `<div class="an-vsp ${cls} a a-up" ${sd(d)}><div class="an-vst">${capMd(o.t)}</div>${o.code ? `<pre class="an-pre">${hl(o.code)}</pre>` : ''}${o.n ? `<div class="an-vsn a a-fade" ${sd(d + 0.8)}>${capMd(o.n)}</div>` : ''}</div>`;
    return `<div class="an-vs">${side(p.l, 'l', 0.3)}<div class="an-vsx a a-pop" ${sd(1.2)}>vs</div>${side(p.r, 'r', 1.6)}</div>`;
  },
  flow(p) {
    let h = `<div class="an-flow"><div class="an-fv a a-pop" ${sd(0.2)}>${hl(p.val)}</div>`, t = 1.1, hit = false;
    p.checks.forEach(([lab, r], i) => {
      let tag;
      if (hit) tag = `<i class="an-fs a a-fade" ${sd(t + 0.3)}>skipped</i>`;
      else { tag = `<b class="an-fr ${r === false ? 'no' : 'yes'} a a-pop" ${sd(t)}>${r === null ? 'runs' : r ? 'True' : 'False'}</b>`; if (r === false) t += 1.1; else hit = true; }
      h += `<div class="an-fc ${!hit || r !== false ? '' : ''} a a-up" ${sd(0.4 + i * 0.25)}><span>${hl(lab)}</span>${tag}</div>`;
    });
    return h + `<div class="an-fo a a-up" ${sd(t + 0.8)}>${esc(p.out)}</div></div>`;
  },
  loop(p) {
    const st = p.step || 1.05, t0 = 1.0;
    let h = `<pre class="an-pre an-head">${hl(p.head)}</pre><div class="an-chips">` + p.items.map((it, i) => `<span class="an-chip a-hl" style="--d:${(t0 + i * st).toFixed(2)}s;--t:${st}s">${esc(it)}</span>`).join('') + '</div>';
    if (p.acc) {
      const vals = [p.start ?? '', ...p.vals], times = [0, ...p.vals.map((_, i) => t0 + i * st + st * 0.5)];
      h += `<div class="an-acc"><span class="an-accn">${esc(p.acc)} =</span><span class="an-accv">${seqSpans(vals, times)}</span></div>`;
    }
    if (p.outs) h += '<div class="an-out"><div class="an-lbl">output</div>' + p.outs.map((o, i) => `<div class="a a-up" ${sd(t0 + i * st + st * 0.5)}>${esc(o)}</div>`).join('') + '</div>';
    return h;
  },
  machine(p) {
    return `<div class="an-mach"><div class="an-ins">${p.ins.map((x, i) => `<span class="an-chip in a a-drop" ${sd(0.3 + i * 0.3)}>${esc(x)}</span>`).join('')}</div>
      <div class="an-arr a a-fade" ${sd(1.1)}>↓</div><div class="an-mbox a a-pop" ${sd(0.1)}><code>${hl(p.name)}</code><div class="an-gear a a-spin" ${sd(1.4)}></div></div>
      <div class="an-arr a a-fade" ${sd(2.3)}>↓</div><span class="an-chip out a a-pop" ${sd(2.7)}>${esc(p.out)}</span></div>`;
  },
  list(p) {
    const n = p.items.length, hi = p.hi || [];
    let h = `<div class="an-lname a a-fade" ${sd(0.1)}><code>${hl(p.name)}</code></div><div class="an-list">`;
    p.items.forEach((x, i) => {
      const k = hi.indexOf(i);
      h += `<div class="an-slot a a-up" ${sd(0.25 + i * 0.12)}><div class="an-sv${k >= 0 ? ' a-lit' : ''}" ${k >= 0 ? sd(1.7 + k * 1.6) : ''}>${esc(x)}</div><div class="an-si">${i}${p.neg ? `<span>${i - n}</span>` : ''}</div></div>`;
    });
    if (p.add != null) h += `<div class="an-slot add a a-pop" ${sd(1.5)}><div class="an-sv">${esc(p.add)}</div><div class="an-si">${n}</div></div>`;
    h += '</div>';
    if (p.say) h += '<div class="an-says">' + p.say.map((s, k) => `<div class="a a-up" ${sd((p.add != null ? 2.4 : 1.8) + k * 1.6)}>${hl(s)}</div>`).join('') + '</div>';
    return h;
  },
  dict(p) {
    let h = `<div class="an-lname a a-fade" ${sd(0.1)}><code>${hl(p.name)}</code></div><div class="an-dict">`;
    p.pairs.forEach(([k, v], i) => { h += `<div class="an-dr a a-up${p.look === i ? '' : ''}" ${sd(0.3 + i * 0.5)}><span class="an-dk${p.look === i ? ' a-lit' : ''}" ${p.look === i ? sd(1.8) : ''}>${hl(k)}</span><span class="an-da">→</span><span class="an-dv${p.look === i ? ' a-lit' : ''}" ${p.look === i ? sd(2.3) : ''}>${esc(v)}</span></div>`; });
    if (p.add) h += `<div class="an-dr new a a-pop" ${sd(1.8)}><span class="an-dk">${hl(p.add[0])}</span><span class="an-da">→</span><span class="an-dv">${esc(p.add[1])}</span></div>`;
    h += '</div>';
    if (p.say) h += `<div class="an-says"><div class="a a-up" ${sd(2.6)}>${hl(p.say)}</div></div>`;
    return h;
  },
  split(p) {
    return `<div class="an-split"><code class="an-src a a-fade" ${sd(0.2)}>${hl(p.src)}</code><div class="an-arr a a-fade" ${sd(1.2)}>↓ <code>.split(",")</code></div><div class="an-chips">` +
      p.parts.map((x, i) => `<span class="an-chip a a-fly" style="--d:${(1.8 + i * 0.35).toFixed(2)}s;--x:${(i - 1) * -30}px">${hl(x)}</span>`).join('') +
      `</div><div class="an-says"><div class="a a-up" ${sd(3.2)}>a list of ${p.parts.length} strings</div></div></div>`;
  },
  dist(p) {
    const cols = 17, mid = 8, W = 300, H = 140;
    let s = `<svg viewBox="0 0 ${W} ${H + 24}" class="an-svg">`;
    for (let i = 0; i < cols; i++) {
      const x = (i - mid) / 2.6, hgt = Math.exp(-x * x / 2) * (H - 10), bw = W / cols;
      const inBand = p.band && Math.abs(i - mid) <= 2.6;
      s += `<rect x="${(i * bw + 1).toFixed(1)}" y="${(H - hgt).toFixed(1)}" width="${(bw - 2).toFixed(1)}" height="${hgt.toFixed(1)}" rx="2" class="an-hb a-grow ${inBand ? 'band' : ''}" style="--d:${(0.3 + Math.abs(i - mid) * 0.12).toFixed(2)}s"/>`;
    }
    const bx = (mid - 2.6) * W / cols, bw2 = 5.2 * W / cols;
    if (p.band) s += `<rect x="${bx.toFixed(1)}" y="2" width="${(bw2 + W / cols).toFixed(1)}" height="${H - 2}" class="an-band a a-fade" ${sd(1.9)}/>`;
    s += `<text x="${W / 2}" y="${H + 18}" class="an-t mid a a-fade" ${sd(1.4)} text-anchor="middle">${esc(p.mid)}</text>`;
    const lx = p.band ? bx : 8, rx = p.band ? bx + bw2 + W / cols : W - 8;
    s += `<text x="${lx.toFixed(1)}" y="${H + 18}" class="an-t a a-fade" ${sd(2.2)} text-anchor="${p.band ? 'middle' : 'start'}">${esc(p.l)}</text><text x="${rx.toFixed(1)}" y="${H + 18}" class="an-t a a-fade" ${sd(2.2)} text-anchor="${p.band ? 'middle' : 'end'}">${esc(p.r)}</text>`;
    return s + '</svg>';
  },
  fan(p) {
    const W = 300, H = 160, g = gaussFrom(rng(p.seed || 7)), paths = [];
    for (let k = 0; k < p.n; k++) { let v = 1; const ser = [1]; for (let t = 0; t < p.steps; t++) { v *= 1 + p.drift + p.vol * g(); ser.push(Math.max(v, 0.05)); } paths.push(ser); }
    const Y = scaler(paths.flat().map(Math.log), W, H, 8), X = i => 8 + i * (W - 16) / p.steps;
    const below = paths.filter(s => s[s.length - 1] < 1).length;
    let s = `<svg viewBox="0 0 ${W} ${H}" class="an-svg"><line x1="8" x2="${W - 8}" y1="${Y(0)}" y2="${Y(0)}" class="an-base"/>`;
    paths.forEach((ser, k) => { s += `<path d="${pathD(ser.map(Math.log), X, Y)}" pathLength="1" class="a-draw ${ser[ser.length - 1] < 1 ? 'down' : 'up'}" style="--d:${(0.3 + k * 0.09).toFixed(2)}s"/>`; });
    s += '</svg>';
    return s + `<div class="an-says"><div class="a a-up" ${sd(3.4)}>${p.n} futures from the same start. ${below} end below it.</div></div>`;
  },
  big(p) { return `<div class="an-bigw"><div class="an-big a a-pop" ${sd(0.3)}>${esc(p.t)}</div><div class="an-bigs a a-fade" ${sd(1.1)}>${esc(p.s)}</div></div>`; }
};
function seqSpans(vals, times) {
  return vals.map((v, i) => {
    const last = i === vals.length - 1;
    return `<span class="${last ? 'sq-stay' : 'sq-blink'}" style="--d:${times[i].toFixed(2)}s;--t:${last ? 0.3 : (times[i + 1] - times[i]).toFixed(2)}s">${esc(v)}</span>`;
  }).join('');
}
function sceneHTML(sc) { return R[sc.a] ? R[sc.a](sc.p) : '<div class="muted">?</div>'; }
function sceneMs(html) {
  let mx = 0; html.replace(/--d:([\d.]+)s/g, (m, d) => { mx = Math.max(mx, +d); return m; });
  return Math.min(12000, Math.max(7000, (mx + 2.6) * 1000));
}
function playInto(el, html) { el.innerHTML = `<div class="st-scene">${html}</div>`; const sc = el.firstChild; void sc.offsetWidth; requestAnimationFrame(() => sc.classList.add('play')); }

/* ---------- overlay shell ---------- */
let OV = null, SP = null;
function ov() {
  if (OV) return OV;
  OV = document.createElement('div'); OV.id = 'st'; OV.className = 'st';
  OV.innerHTML = `<div class="st-in"><div class="st-head"><div class="st-bars"></div><div class="st-row"><span class="st-title"></span><button class="st-x" aria-label="Close" onclick="closeOv()">✕</button></div></div><div class="st-body"></div></div>`;
  document.body.appendChild(OV);
  document.addEventListener('keydown', e => {
    if (!OV.classList.contains('open')) return;
    if (e.key === 'Escape') closeOv();
    if (SP && SP.mode === 'story') { if (e.key === 'ArrowRight') nextScene(); else if (e.key === 'ArrowLeft') prevScene(); else if (e.key === ' ') { e.preventDefault(); SP.paused ? resumeS() : pauseS(); } }
  });
  document.addEventListener('visibilitychange', () => { if (document.hidden && SP && SP.mode === 'story' && !SP.paused) pauseS(); });
  return OV;
}
function openOv(title) { ov(); OV.querySelector('.st-title').textContent = title; OV.classList.add('open'); document.body.classList.add('st-lock'); }
function closeOv() { if (SP) clearTimeout(SP.timer); SP = null; QZ = null; if (OV) { OV.classList.remove('open', 'paused'); OV.querySelector('.st-body').innerHTML = ''; } document.body.classList.remove('st-lock'); render(); }
function stBody() { return OV.querySelector('.st-body'); }
function setBars(html) { OV.querySelector('.st-bars').innerHTML = html; }

/* ---------- story player ---------- */
function openStory(lid, start = 0) {
  const st = STORIES[lid]; if (!st) return;
  openOv(titleOf(lid));
  SP = { mode: 'story', lid, i: 0, paused: false };
  stBody().innerHTML = `<div class="st-stage"></div><div class="st-cap"></div><div class="st-tap L"></div><div class="st-tap R"></div><div class="st-hint">Tap right to skip · left to go back · hold to pause</div>`;
  stBody().querySelectorAll('.st-tap').forEach(z => bindTap(z, z.classList.contains('L') ? prevScene : nextScene));
  showScene(start);
}
function bindTap(z, fn) {
  let holdT = null, held = false;
  z.addEventListener('pointerdown', e => { e.preventDefault(); held = false; holdT = setTimeout(() => { held = true; pauseS(); }, 230); });
  const up = () => { clearTimeout(holdT); if (held) { held = false; resumeS(); } else if (holdT !== null) fn(); holdT = null; };
  z.addEventListener('pointerup', up);
  z.addEventListener('pointercancel', () => { clearTimeout(holdT); holdT = null; if (held) { held = false; resumeS(); } });
  z.addEventListener('contextmenu', e => e.preventDefault());
}
function showScene(i) {
  const scenes = STORIES[SP.lid].scenes; SP.i = i; clearTimeout(SP.timer);
  const sc = scenes[i], html = sceneHTML(sc), ms = sceneMs(html);
  setBars(scenes.map((_, k) => `<i class="${k < i ? 'done' : ''}">${k === i ? `<b style="animation-duration:${ms}ms"></b>` : ''}</i>`).join(''));
  playInto(stBody().querySelector('.st-stage'), html);
  const cap = stBody().querySelector('.st-cap'); cap.innerHTML = capMd(sc.cap); cap.classList.remove('in'); void cap.offsetWidth; cap.classList.add('in');
  OV.classList.remove('paused'); SP.paused = false;
  SP.end = performance.now() + ms; SP.timer = setTimeout(nextScene, ms);
}
function pauseS() { if (!SP || SP.mode !== 'story' || SP.paused) return; clearTimeout(SP.timer); SP.rem = Math.max(400, SP.end - performance.now()); SP.paused = true; OV.classList.add('paused'); }
function resumeS() { if (!SP || SP.mode !== 'story' || !SP.paused) return; SP.paused = false; OV.classList.remove('paused'); SP.end = performance.now() + SP.rem; SP.timer = setTimeout(nextScene, SP.rem); }
function nextScene() { if (!SP || SP.mode !== 'story') return; const n = STORIES[SP.lid].scenes.length; if (SP.i < n - 1) showScene(SP.i + 1); else storyEnd(); }
function prevScene() { if (!SP || SP.mode !== 'story') return; showScene(Math.max(0, SP.i - 1)); }
function storyEnd() {
  const lid = SP.lid, st = STORIES[lid]; clearTimeout(SP.timer); SP.mode = 'end';
  S.story[lid] = { seen: today() }; const added = syncVisCards(); activity(); save();
  setBars(st.scenes.map(() => '<i class="done"></i>').join(''));
  const nq = st.concepts.length;
  stBody().innerHTML = `<div class="st-end"><div class="st-endt">Story done</div>
    <p>${st.lab ? 'Play with the idea for a minute, then a' : 'Now a'} quick quiz on only what you just watched: ${nq} ideas, mixed question types. Get each one right twice in a row to master it.</p>${added ? `<p class="small">${added} animated flashcards from this story were added to Review. They come back on a spacing schedule.</p>` : ''}
    ${st.lab ? `<button class="btn pri" onclick="openLab('${lid}')">Try the lab</button><button class="btn" onclick="startQuiz('${lid}')">Skip to quiz</button>` : `<button class="btn pri" onclick="startQuiz('${lid}')">Start quiz</button>`}
    <button class="btn" onclick="openStory('${lid}')">Watch again</button></div>`;
}

/* ---------- slider labs ---------- */
const LABS = {
  compound: {
    title: 'Lab: watch money compound',
    sliders: [['s', 'Start', 1000, 50000, 1000, 10000, v => money(v)], ['r', 'Rate per year', 0, 0.15, 0.005, 0.07, v => (v * 100).toFixed(1) + '%'], ['y', 'Years', 1, 40, 1, 30, v => v + ' yrs']],
    tip: 'Try this: double the years. The final value more than doubles. That is compounding beating simple interest.',
    draw(v, svg, out) {
      v = { ...v, y: Math.round(v.y) };
      const c = [], si = []; for (let y = 0; y <= v.y; y++) { c.push(v.s * (1 + v.r) ** y); si.push(v.s * (1 + v.r * y)); }
      const W = 300, H = 150, Y = scaler([...c, ...si], W, H, 10, true), X = i => 10 + i * (W - 20) / v.y;
      svg.innerHTML = `<path d="${pathD(si, X, Y)}" class="lab-l gray"/><path d="${pathD(c, X, Y)}" class="lab-l"/>`;
      out.innerHTML = `<pre class="an-pre">${hl(`${v.s} * (1 + ${v.r.toFixed(3)}) ** ${v.y}`)}</pre><div class="lab-big">${money(c[v.y])}</div>
        <div class="lab-leg"><span class="k"></span>compound ${money(c[v.y])} <span class="k gray"></span>simple ${money(si[v.y])}</div>
        <div class="small muted">Rule of 72: doubles about every ${v.r > 0 ? (72 / (v.r * 100)).toFixed(1) : '∞'} years</div>`;
    }
  },
  payoff: {
    title: 'Lab: a while loop pays off a credit card',
    sliders: [['b', 'Balance', 500, 20000, 500, 5000, v => money(v)], ['a', 'APR', 0, 0.30, 0.01, 0.24, v => Math.round(v * 100) + '%'], ['p', 'Monthly payment', 25, 1000, 25, 150, v => money(v)]],
    tip: 'Drag the payment down until the loop never ends. That is an infinite loop, and it is also how minimum payments trap people.',
    draw(v, svg, out) {
      let bal = v.b, m = 0, interest = 0; const ser = [bal];
      const never = v.p <= bal * v.a / 12;
      while (!never && bal > 0 && m < 600) { const i = bal * v.a / 12; interest += i; bal = bal + i - v.p; m++; ser.push(Math.max(bal, 0)); }
      const W = 300, H = 150, code = `while balance > 0:\n    balance = balance * (1 + ${v.a.toFixed(2)} / 12) - ${v.p}\n    months = months + 1`;
      if (never) { svg.innerHTML = `<line x1="10" x2="290" y1="40" y2="40" class="lab-l bad"/>`; out.innerHTML = `<pre class="an-pre">${hl(code)}</pre><div class="lab-big bad">Infinite loop</div><div class="small">The payment (${money(v.p)}) does not beat the first month's interest (${money(bal * v.a / 12)}), so <code>balance &gt; 0</code> stays True forever.</div>`; return; }
      const Y = scaler(ser, W, H, 10, true), X = i => 10 + i * (W - 20) / Math.max(1, m);
      svg.innerHTML = `<path d="${pathD(ser, X, Y)}" class="lab-l"/>`;
      out.innerHTML = `<pre class="an-pre">${hl(code)}</pre><div class="lab-big">${m} months</div><div class="small muted">Loop ran ${m} times. Interest paid: <b>${money(interest)}</b></div>`;
    }
  },
  sma: {
    title: 'Lab: a moving average over a list of prices',
    sliders: [['n', 'Window n (days)', 2, 50, 1, 20, v => v + ' days']],
    tip: 'Bigger window = smoother line, but it reacts later. That trade-off is why traders argue about 20 vs 50 vs 200 days.',
    prices: (() => { const g = gaussFrom(rng(42)); const p = [100]; for (let i = 1; i < 160; i++) p.push(p[i - 1] * (1 + 0.0008 + 0.018 * g())); return p; })(),
    draw(v, svg, out) {
      const P = this.prices, W = 300, H = 150, Y = scaler(P, W, H), X = i => 6 + i * (W - 12) / (P.length - 1);
      const sma = []; for (let i = v.n - 1; i < P.length; i++) { let t = 0; for (let k = i - v.n + 1; k <= i; k++) t += P[k]; sma.push(t / v.n); }
      svg.innerHTML = `<path d="${pathD(P, X, Y)}" class="lab-l gray"/><path d="${pathD(sma, i => X(i + v.n - 1), Y)}" class="lab-l"/>`;
      out.innerHTML = `<pre class="an-pre">${hl(`sum(prices[i - ${v.n} + 1:i + 1]) / ${v.n}`)}</pre><div class="lab-leg"><span class="k gray"></span>price <span class="k"></span>${v.n}-day average</div><div class="small muted">The average starts on day ${v.n}: it needs ${v.n} prices first.</div>`;
    }
  },
  vol: {
    title: 'Lab: what volatility does to 30 years',
    sliders: [['m', 'Average return (mean)', -0.05, 0.15, 0.005, 0.07, v => (v * 100).toFixed(1) + '%'], ['s', 'Volatility (stdev)', 0, 0.40, 0.01, 0.15, v => Math.round(v * 100) + '%']],
    tip: 'Keep the mean at 7% and raise the stdev. The middle outcome drops and more futures end below the start. Risk is not just "scary", it costs money.',
    seed: 5,
    draw(v, svg, out) {
      const g = gaussFrom(rng(this.seed)), paths = [], N = 40, T = 30;
      for (let k = 0; k < N; k++) { let b = 10000; const ser = [b]; for (let t = 0; t < T; t++) { b = Math.max(b * (1 + v.m + v.s * g()), 1); ser.push(b); } paths.push(ser); }
      const W = 300, H = 150, Y = scaler(paths.flat().map(Math.log), W, H, 8), X = i => 8 + i * (W - 16) / T;
      const fin = paths.map(s => s[T]).sort((a, b) => a - b), below = fin.filter(x => x < 10000).length;
      svg.innerHTML = `<line x1="8" x2="292" y1="${Y(Math.log(10000))}" y2="${Y(Math.log(10000))}" class="an-base"/>` + paths.map(s => `<path d="${pathD(s.map(Math.log), X, Y)}" class="lab-l thin ${s[T] < 10000 ? 'bad' : ''}"/>`).join('');
      out.innerHTML = `<pre class="an-pre">${hl(`r = random.gauss(${v.m.toFixed(3)}, ${v.s.toFixed(2)})`)}</pre><div class="lab-big">${money(fin[N >> 1])}</div><div class="small muted">Median of 40 futures for $10,000 (log scale). <b>${below} of 40</b> end below $10,000. Worst: ${money(fin[0])}</div><button class="btn" onclick="LABS.vol.seed++;labDraw()">Re-roll the dice</button>`;
    }
  }
};
let LABV = null;
function openLab(lid) {
  if (SP) clearTimeout(SP.timer);
  const L = LABS[STORIES[lid].lab]; SP = { mode: 'lab', lid, lab: STORIES[lid].lab };
  openOv(titleOf(lid)); setBars('');
  LABV = {}; L.sliders.forEach(s => LABV[s[0]] = s[5]);
  stBody().innerHTML = `<div class="lab"><h3>${esc(L.title)}</h3>${L.sliders.map(([k, lab, mn, mx, stp, val, f]) => `<label class="lab-s"><span>${esc(lab)} <b id="lv-${k}">${f(val)}</b></span><input type="range" min="${mn}" max="${mx}" step="${stp}" value="${val}" oninput="LABV['${k}']=+this.value;document.getElementById('lv-${k}').textContent=LABS['${SP.lab}'].sliders.find(s=>s[0]==='${k}')[6](+this.value);labDraw()"></label>`).join('')}
    <svg viewBox="0 0 300 150" class="lab-svg" id="lab-svg"></svg><div id="lab-out"></div><p class="small lab-tip">${esc(L.tip)}</p>
    <button class="btn pri" onclick="startQuiz('${lid}')">Start quiz</button></div>`;
  labDraw();
}
function labDraw() { if (!SP || SP.mode !== 'lab') return; LABS[SP.lab].draw(LABV, document.getElementById('lab-svg'), document.getElementById('lab-out')); }

/* ---------- quiz + mastery ---------- */
let QZ = null;
const ckey = (lid, cid) => lid + '.' + cid;
const concept = (lid, cid) => STORIES[lid].concepts.find(c => c.id === cid);
function mast(k) { return (S.mast[k] ??= { st: 0, ok: 0, bad: 0, m: false, v: 0 }); }
function mkItem(lid, cid, kind, avoid) {
  const c = concept(lid, cid), m = mast(ckey(lid, cid));
  let v = m.v % c.q.length; if (avoid != null && c.q.length > 1 && v === avoid) v = (v + 1) % c.q.length;
  m.v = v + 1;
  return { lid, cid, v, kind, order: shuffle(c.q[v][2].map((_, i) => i)) };
}
function interleave(items) {
  const out = [], pool = items.slice();
  while (pool.length) { const prev = out[out.length - 1]; let k = pool.findIndex(it => !prev || it.lid !== prev.lid); if (k < 0) k = 0; out.push(pool.splice(k, 1)[0]); }
  return out;
}
function startQuiz(lid) {
  if (SP) clearTimeout(SP.timer);
  SP = { mode: 'quiz' };
  const st = STORIES[lid];
  QZ = { mode: 'lesson', lid, title: 'Quiz: ' + titleOf(lid), queue: shuffle(st.concepts.map(c => mkItem(lid, c.id, 'first'))), pos: 0, first: { ok: 0, n: 0 }, att: {}, seen: new Set(st.concepts.map(c => ckey(lid, c.id))) };
  openOv(QZ.title); showQ();
}
function weakList() {
  const out = [];
  Object.keys(STORIES).forEach(lid => { if (!S.story[lid]) return; STORIES[lid].concepts.forEach(c => { const m = S.mast[ckey(lid, c.id)]; if (!m || !m.m) out.push([lid, c.id]); }); });
  return out;
}
function startPractice(n = 10) {
  const pool = [];
  Object.keys(STORIES).forEach(lid => { if (!S.story[lid]) return; STORIES[lid].concepts.forEach(c => { const m = S.mast[ckey(lid, c.id)]; const w = !m ? 4 : m.m ? 1 : m.st === 1 ? 3 : m.bad ? 6 : 4; pool.push({ lid, cid: c.id, w }); }); });
  if (!pool.length) return toast('Watch a story lesson first. Practice draws from what you have watched.');
  const pick = [];
  while (pick.length < Math.min(n, pool.length)) {
    const tot = pool.reduce((a, b) => a + b.w, 0); let r = Math.random() * tot, k = 0;
    while (r > pool[k].w) { r -= pool[k].w; k++; }
    pick.push(pool.splice(k, 1)[0]);
  }
  SP = { mode: 'quiz' };
  QZ = { mode: 'practice', title: 'Practice: weak spots first', queue: interleave(shuffle(pick).map(p => mkItem(p.lid, p.cid, 'first'))), pos: 0, first: { ok: 0, n: 0 }, att: {}, seen: new Set(pick.map(p => ckey(p.lid, p.cid))) };
  openOv(QZ.title); showQ();
}
function qProgress() { setBars(QZ.queue.map((_, k) => `<i class="${k < QZ.pos ? 'done' : ''}">${k === QZ.pos ? '<b class="half"></b>' : ''}</i>`).join('')); }
function showQ() {
  if (QZ.pos >= QZ.queue.length) return quizEnd();
  qProgress();
  const it = QZ.queue[QZ.pos], c = concept(it.lid, it.cid), q = c.q[it.v], m = mast(ckey(it.lid, it.cid));
  const tag = it.kind === 'retry' ? '<span class="pill warn-p">Again, reworded</span>' : it.kind === 'confirm' ? '<span class="pill">Second time: lock it in</span>' : '';
  stBody().innerHTML = `<div class="qz"><div class="qz-top"><span class="pill">${FMT[q[0]]}</span>${tag}<span class="qz-n">${QZ.pos + 1} / ${QZ.queue.length}</span></div>
    ${QZ.mode === 'practice' ? `<div class="small muted">${esc(titleOf(it.lid))}</div>` : ''}
    <div class="qz-q">${md(q[1])}</div>
    <div class="qz-ch">${it.order.map(k => `<button class="btn choice" onclick="answer(${k})">${capMd(q[2][k])}</button>`).join('')}</div>
    <div class="qz-m">${mdots(m)} <span class="small muted">${esc(c.n)}</span></div><div id="qz-fb"></div></div>`;
}
function mdots(m) { return `<span class="mdots" title="2 right in a row = mastered"><i class="${m.st >= 1 || m.m ? 'on' : ''}"></i><i class="${m.st >= 2 || m.m ? 'on' : ''}"></i></span>`; }
function answer(k) {
  const it = QZ.queue[QZ.pos]; if (it.done) return; it.done = true;
  const key = ckey(it.lid, it.cid), c = concept(it.lid, it.cid), q = c.q[it.v], m = mast(key), right = k === 0;
  const firstTry = !QZ.att[key]; QZ.att[key] = (QZ.att[key] || 0) + 1;
  if (firstTry) { QZ.first.n++; if (right) QZ.first.ok++; }
  const was = m.m;
  if (right) { m.st++; m.ok++; if (m.st >= 2) m.m = true; }
  else { m.st = 0; m.bad++; m.m = false; m.last = today(); }
  activity(); save();
  const btns = stBody().querySelectorAll('.qz-ch .btn');
  btns.forEach((b, i) => { const o = it.order[i]; b.disabled = true; if (o === 0) b.classList.add('right'); else if (o === k) b.classList.add('wrong'); });
  stBody().querySelector('.qz-m').innerHTML = `${mdots(m)} <span class="small muted">${esc(c.n)}</span>`;
  const fb = document.getElementById('qz-fb');
  if (right) {
    // lesson quiz: a concept right once (not yet mastered) comes back later, reworded, to confirm
    if (QZ.mode === 'lesson' && !m.m && QZ.att[key] < 4) QZ.queue.push(mkItem(it.lid, it.cid, 'confirm', it.v));
    fb.innerHTML = `<div class="qz-ok">${m.m && !was ? 'Mastered: 2 right in a row.' : 'Correct.'}</div>`;
    setTimeout(() => { if (QZ && QZ.queue[QZ.pos] === it) { QZ.pos++; showQ(); } }, m.m && !was ? 1300 : 850);
  } else {
    // re-ask the same idea, reworded, about 4 questions later
    if (QZ.att[key] < 4) QZ.queue.splice(Math.min(QZ.queue.length, QZ.pos + 5), 0, mkItem(it.lid, it.cid, 'retry', it.v));
    const sc = STORIES[it.lid].scenes[c.s];
    fb.innerHTML = `<div class="qz-miss"><div class="qz-pk"><span>You picked</span><b class="fail">${capMd(q[2][k])}</b></div><div class="qz-pk"><span>Right answer</span><b class="pass">${capMd(q[2][0])}</b></div>
      <div class="qz-mini" id="qz-mini"></div><div class="qz-cap">${capMd(sc.cap)}</div><div class="qz-fix"><b>Fix:</b> ${capMd(q[3] || c.fix)}</div>
      <div class="small muted">This one comes back in a few questions, worded differently.</div>
      <button class="btn pri" onclick="QZ.pos++;showQ()">Got it, next</button><button class="btn" onclick="replayMini()">Replay</button></div>`;
    replayMini();
    fb.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }
}
function replayMini() { const it = QZ.queue[QZ.pos], c = concept(it.lid, it.cid), el = document.getElementById('qz-mini'); if (el) playInto(el, sceneHTML(STORIES[it.lid].scenes[c.s])); }
function quizEnd() {
  setBars(QZ.queue.map(() => '<i class="done"></i>').join(''));
  const keys = [...QZ.seen], f = QZ.first;
  if (QZ.mode === 'lesson') S.qz[QZ.lid] = { ok: f.ok, n: f.n, date: today() };
  save();
  const rows = keys.map(k => { const [lid, cid] = k.split('.'), c = concept(lid, cid), m = mast(k); return `<div class="qz-row">${mdots(m)}<span>${esc(c.n)}</span><b class="${m.m ? 'pass' : m.st ? 'warn-t' : 'fail'}">${m.m ? 'Mastered' : m.st ? '1 of 2' : 'Needs work'}</b></div>`; }).join('');
  const weak = weakList().length, lid = QZ.lid;
  stBody().innerHTML = `<div class="qz st-end"><div class="st-endt">${f.ok} / ${f.n} on the first try</div><p class="small muted">Only first tries count toward the score, so lucky retries do not inflate it.</p>
    <div class="card">${rows}</div>
    ${weak ? `<button class="btn pri" onclick="startPractice()">Practice weak spots (${weak})</button>` : '<p class="pass">Everything you have watched is mastered.</p>'}
    ${QZ.mode === 'lesson' ? `<button class="btn" onclick="startQuiz('${lid}')">Retake quiz</button><button class="btn" onclick="closeOv()">Back to the lesson</button>` : `<button class="btn" onclick="closeOv()">Done</button>`}</div>`;
}

/* ---------- lesson page / home / review helpers (called from index.html views) ---------- */
function lessonMastery(lid) { const st = STORIES[lid]; if (!st) return [0, 0]; return [st.concepts.filter(c => S.mast[ckey(lid, c.id)]?.m).length, st.concepts.length]; }
function storyCard(lid, num) {
  const st = STORIES[lid]; if (!st) return '';
  const [mm, mn] = lessonMastery(lid), seen = S.story[lid], qz = S.qz[lid];
  return `<div class="card story-card"><h3>${num ? num + '. ' : ''}Watch, then quiz ${seen ? '<span class="pill ok">✓ watched</span>' : ''}</h3>
    <div class="small muted">${st.scenes.length} short animated scenes (about 1 minute)${st.lab ? ', a slider lab' : ''}, then a quiz on only what you watched.</div>
    <div class="row" style="margin-top:8px"><button class="btn pri" onclick="openStory('${lid}')">▶ ${seen ? 'Watch again' : 'Watch the story'}</button>
     <button class="btn" onclick="startQuiz('${lid}')" ${seen ? '' : 'disabled title="Watch first"'}>Quiz</button>${st.lab ? `<button class="btn" onclick="openLab('${lid}')">Lab</button>` : ''}</div>
    <div class="small" style="margin-top:8px">Mastered ${mm}/${mn} ideas${qz ? ` · last quiz ${qz.ok}/${qz.n} first try` : ''}</div><div class="prog"><b style="width:${100 * mm / mn}%"></b></div></div>`;
}
function practiceCard() {
  const seen = Object.keys(S.story).filter(l => STORIES[l]).length;
  if (!seen) return `<div class="card"><h3>Practice quiz</h3><div class="small muted">Watch a story lesson first. Practice mixes questions from everything you have watched, weak ideas first.</div></div>`;
  const weak = weakList().length;
  return `<div class="card"><h3>Practice quiz</h3><div class="small muted">10 mixed questions from ${seen} watched stor${seen > 1 ? 'ies' : 'y'}, weighted toward ideas you have not mastered yet. ${weak} not mastered.</div><button class="btn pri" onclick="startPractice()">Start practice</button></div>`;
}
const preq = list => list.map(l => LMAP[l] ? `<a class="pill ${lessonDone(l) ? 'ok' : ''}" style="cursor:pointer" onclick="go('lesson','${l}')">${lessonDone(l) ? '✓ ' : ''}${esc(LMAP[l].title)}</a>` : '').join(' ');
function miniCards() {
  return MINIS.map(m => { const ready = m.lessons.filter(lessonDone).length; return `<div class="card lesson" onclick="go('mini','${m.id}')"><b>${esc(m.name)}</b> ${S.minis[m.id] ? '<span class="pill ok">✓ passed</span>' : ''}${S.story['m_' + m.id] ? '<span class="pill ok">✓ watched</span>' : STORIES['m_' + m.id] ? '<span class="pill">▶ story</span>' : ''}<div class="small muted">${esc(m.tag)}</div>
    <div style="margin-top:8px"><div class="metric"><span>Difficulty</span>${dots(m.difficulty)}</div><div class="metric"><span>Time</span><span>~${m.min} min</span></div><div class="metric"><span>PY4E chapter</span><span>${esc(m.ch)}</span></div></div><div class="small muted">Prereq lessons: ${ready}/${m.lessons.length} done</div></div>`; }).join('');
}
function vMini(id) {
  const m = MMAP[id], key = 'MP:' + id, hn = S.hints[key] || 0;
  return `<div class="crumb"><a onclick="go('projects')">Projects</a> / Mini project</div><h2>${esc(m.name)} ${S.minis[id] ? '<span class="pill ok">✓ passed</span>' : ''}</h2><div class="muted small">PY4E Ch ${esc(m.ch)} · ~${m.min} min · auto-checked</div>
   ${storyCard('m_' + id)}
   <div class="card"><h3>Why it matters</h3><p class="small">${md(m.why)}</p><h3>Lessons you need first</h3><div>${preq(m.lessons)}</div></div>
   <div class="card"><h3>Your task</h3>${md(m.task)}</div>
   <div class="card">${ed(key, m.starter, 16)}
    <div class="row"><button class="btn" onclick="runMini('${id}',false)">Run</button><button class="btn pri" onclick="runMini('${id}',true)">Check</button>
     <button class="btn" onclick="hint('${key}')" ${hn >= m.hints.length ? 'disabled' : ''}>Hint (${hn}/${m.hints.length})</button>
     <button class="btn blue" onclick="askAbout()">Ask tutor</button><button class="btn" onclick="resetCode('${key}', MMAP['${id}'].starter)">Reset</button><span class="small muted pystatus"></span></div>
    <div>${m.hints.slice(0, hn).map((h, k) => `<div class="warn">Hint ${k + 1}: ${hintMd(h)}</div>`).join('')}</div>
    <div class="out" id="out-${key}"></div></div>`;
}
async function runMini(id, check) {
  const m = MMAP[id], key = 'MP:' + id, el = document.getElementById('out-' + key);
  el.style.display = 'block'; el.innerHTML = '<span class="muted">Running...</span>';
  const r = await runPy(edVal(key), [], check ? m.tests : []);
  LAST[key] = r; showOut(el, r);
  if (check && r.results.length && r.results.every(t => t.p)) { const first = !S.minis[id]; S.minis[id] = true; activity(); save(); toast(first ? 'Mini project passed!' : 'Passed again.'); laterRender(); }
}

/* ---------- animated flashcards ---------- */
// Every idea a watched story teaches becomes a visual flashcard: the back replays its scene.
function syncVisCards() {
  let n = 0; const due = () => new Date(Date.now() + (1 + Math.floor(n / 8)) * 864e5).toLocaleDateString('en-CA'); // spread new cards, 8 a day
  Object.keys(S.story).forEach(lid => { const st = STORIES[lid]; if (!st) return;
    st.concepts.forEach(c => { const id = 'V:' + ckey(lid, c.id); if (!S.cards.find(x => x.id === id)) { S.cards.push({ id, vis: [lid, c.id], q: c.n, a: c.fix, box: 0, due: due() }); n++; } }); });
  if (n) save();
  return n;
}
const words = t => new Set(String(t).toLowerCase().match(/[a-z_]{3,}|\*\*|\/\/|%/g) || []);
function cardScene(c) {
  if (c.vis) { const st = STORIES[c.vis[0]], k = st && st.concepts.find(x => x.id === c.vis[1]); return k ? [c.vis[0], k.s] : null; }
  const src = c.id.split(':')[0], pool = STORIES[src] ? [src] : src === 'mc' ? Object.keys(STORIES).filter(k => /^mc\d$/.test(k)) : [];
  const want = words(c.q + ' ' + c.a); let best = null, bs = 1;
  pool.forEach(lid => STORIES[lid].scenes.forEach((sc, i) => { const have = words(sc.cap + ' ' + JSON.stringify(sc.p)); let sc2 = 0; want.forEach(w => have.has(w) && sc2++); if (sc2 > bs) { bs = sc2; best = [lid, i]; } }));
  return best;
}
function cardFront(c) {
  if (c.vis) return `<div class="small muted" style="text-align:center">Picture the animation, then explain it out loud</div><div class="flash">${capMd(c.q)}</div>`;
  return `<div class="flash">${esc(c.q)}</div>`;
}
function cardBack(c) {
  const r = cardScene(c);
  return `<div class="fc-back">${r ? `<div class="qz-mini" id="rv-scene"></div><div class="qz-cap">${capMd(STORIES[r[0]].scenes[r[1]].cap)}</div><div style="text-align:center"><button class="btn" onclick="playCard()">↻ Replay</button></div>` : ''}<div class="flash pass">${c.vis ? capMd(c.a) : esc(c.a)}</div></div>`;
}
function playCard() { const c = dueCards()[0], r = c && cardScene(c), el = document.getElementById('rv-scene'); if (r && el) playInto(el, sceneHTML(STORIES[r[0]].scenes[r[1]])); }
