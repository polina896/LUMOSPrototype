/* LumosShare — the share control both output pages hang off.
 *
 *   LumosShare.mount(document.getElementById('shareBtn'), { title: 'Costco …' });
 *
 * People are added by name or email against a mock colleague directory, the way
 * Figma and Notion do it: type, pick from suggestions, get a chip. Nothing is
 * sent — this is a prototype — but every affordance a reviewer looks for is here.
 */
(function (global) {
  var CSS = [
    ".ls-btn{display:inline-flex;align-items:center;gap:7px;padding:8px 14px;border-radius:10px;border:1px solid #E1D9EC;background:#fff;",
    "font-family:'Baloo 2',system-ui,sans-serif;font-size:13px;font-weight:700;color:#4A2A6E;cursor:pointer;transition:.15s}",
    "\n.ls-btn:hover{border-color:#7C4FC7;background:#F5F0FB}",
    "\n.ls-btn svg{width:14px;height:14px}",
    "\n.ls-scrim{position:fixed;inset:0;background:rgba(26,16,48,.32);backdrop-filter:blur(2px);z-index:9000;opacity:0;transition:.2s;display:grid;place-items:start center;padding-top:9vh}",
    "\n.ls-scrim.on{opacity:1}",
    "\n.ls-modal{width:min(560px,92vw);background:#fff;border-radius:18px;box-shadow:0 24px 70px rgba(33,26,46,.3);overflow:hidden;",
    "transform:translateY(-10px);transition:.24s cubic-bezier(.22,1,.36,1);font-family:'Nunito Sans',system-ui,sans-serif}",
    "\n.ls-scrim.on .ls-modal{transform:none}",
    "\n.ls-h{display:flex;align-items:center;gap:10px;padding:18px 20px 14px}",
    "\n.ls-h h2{font-family:'Baloo 2',system-ui,sans-serif;font-size:17px;font-weight:700;color:#1A1A1A;letter-spacing:-.01em}",
    "\n.ls-h p{font-size:12px;color:#7E7490;margin-top:2px}",
    "\n.ls-x{margin-left:auto;border:none;background:transparent;font-size:20px;line-height:1;color:#A79FB6;cursor:pointer;padding:2px 4px}",
    "\n.ls-x:hover{color:#4A3E5C}",
    "\n.ls-body{padding:0 20px 4px}",
    "\n.ls-field{display:flex;flex-wrap:wrap;gap:6px;align-items:center;border:1px solid #E1D9EC;border-radius:12px;padding:7px 8px;transition:.15s;position:relative}",
    "\n.ls-field:focus-within{border-color:#6B3C72;box-shadow:0 0 0 3px rgba(107,60,114,.1)}",
    "\n.ls-field input{flex:1;min-width:160px;border:none;outline:none;font-family:inherit;font-size:13.5px;padding:6px 4px;color:#1A1A1A}",
    "\n.ls-field input::placeholder{color:#A79FB6}",
    "\n.ls-chip{display:inline-flex;align-items:center;gap:7px;padding:4px 6px 4px 4px;border-radius:99px;background:#F1E9FF;border:1px solid #E0D4F5}",
    "\n.ls-chip .av{width:21px;height:21px;border-radius:50%;display:grid;place-items:center;font-family:'Baloo 2',system-ui,sans-serif;font-size:9.5px;font-weight:800;color:#fff}",
    "\n.ls-chip .nm{font-size:12.5px;font-weight:700;color:#4A2A6E;line-height:1.1}",
    "\n.ls-chip .em{font-size:10.5px;color:#8A7FA0;line-height:1.1}",
    "\n.ls-chip .rm{border:none;background:transparent;color:#9A8FB0;cursor:pointer;font-size:14px;line-height:1;padding:0 2px}",
    "\n.ls-chip .rm:hover{color:#4A2A6E}",
    "\n.ls-chip.bad{background:#FEF1F1;border-color:#F3D2D2}",
    "\n.ls-chip.bad .nm{color:#B4322F}",
    "\n.ls-sugg{position:absolute;left:0;right:0;top:calc(100% + 6px);background:#fff;border:1px solid #E1D9EC;border-radius:12px;box-shadow:0 12px 34px rgba(33,26,46,.16);z-index:20;overflow:hidden;display:none}",
    "\n.ls-sugg.on{display:block}",
    "\n.ls-opt{display:flex;align-items:center;gap:10px;padding:9px 12px;cursor:pointer}",
    "\n.ls-opt:hover,.ls-opt.sel{background:#F5F0FB}",
    "\n.ls-opt .av{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-family:'Baloo 2',system-ui,sans-serif;font-size:11px;font-weight:800;color:#fff;flex:0 0 auto}",
    "\n.ls-opt b{font-size:13px;color:#1A1A1A;font-weight:700;display:block;line-height:1.25}",
    "\n.ls-opt span{font-size:11.5px;color:#7E7490}",
    "\n.ls-opt .role{margin-left:auto;font-size:11px;color:#A79FB6}",
    "\n.ls-note{width:100%;margin-top:10px;border:1px solid #E1D9EC;border-radius:12px;padding:10px 12px;font-family:inherit;font-size:13px;resize:none;outline:none;color:#1A1A1A}",
    "\n.ls-note:focus{border-color:#6B3C72}",
    "\n.ls-access{margin-top:14px;border-top:1px solid #EBE5F1;padding-top:12px}",
    "\n.ls-access .k{font-family:'Baloo 2',system-ui,sans-serif;font-size:9.5px;font-weight:800;letter-spacing:.11em;text-transform:uppercase;color:#A79FB6;margin-bottom:9px}",
    "\n.ls-person{display:flex;align-items:center;gap:10px;margin-bottom:9px}",
    "\n.ls-person .av{width:28px;height:28px;border-radius:50%;display:grid;place-items:center;font-family:'Baloo 2',system-ui,sans-serif;font-size:11px;font-weight:800;color:#fff;flex:0 0 auto}",
    "\n.ls-person b{font-size:13px;color:#1A1A1A;font-weight:700;display:block;line-height:1.25}",
    "\n.ls-person span{font-size:11.5px;color:#7E7490}",
    "\n.ls-role{margin-left:auto;border:1px solid #E1D9EC;border-radius:8px;background:#fff;font-family:inherit;font-size:12px;color:#4A3E5C;padding:5px 7px;cursor:pointer}",
    "\n.ls-f{display:flex;align-items:center;gap:10px;padding:14px 20px;background:#FAF9FC;border-top:1px solid #EBE5F1}",
    "\n.ls-link{display:inline-flex;align-items:center;gap:7px;border:none;background:transparent;font-family:'Baloo 2',system-ui,sans-serif;font-size:12.5px;font-weight:700;color:#6B3C72;cursor:pointer}",
    "\n.ls-link svg{width:14px;height:14px}",
    "\n.ls-send{margin-left:auto;border:none;border-radius:10px;background:#6B3C72;color:#fff;font-family:'Baloo 2',system-ui,sans-serif;font-size:13px;font-weight:700;padding:9px 18px;cursor:pointer;transition:.15s}",
    "\n.ls-send:hover{background:#4A2A6E}",
    "\n.ls-send:disabled{background:#D9D2E2;cursor:not-allowed}",
    "\n.ls-toast{position:fixed;left:50%;bottom:28px;transform:translate(-50%,10px);background:#211A2E;color:#fff;border-radius:11px;padding:11px 18px;",
    "font-family:'Baloo 2',system-ui,sans-serif;font-size:13px;font-weight:700;box-shadow:0 12px 34px rgba(0,0,0,.3);opacity:0;transition:.25s;z-index:9100;pointer-events:none}",
    "\n.ls-ribbon{display:flex;align-items:center;gap:10px;padding:9px 26px;background:#F1E9FF;border-bottom:1px solid #E0D4F5;font-family:'Nunito Sans',system-ui,sans-serif}",
    "\n.ls-ribbon .av{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;color:#fff;font-family:'Baloo 2',system-ui,sans-serif;font-size:10px;font-weight:800;flex:0 0 auto}",
    "\n.ls-ribbon b{font-family:'Baloo 2',system-ui,sans-serif;font-size:12.5px;color:#4A2A6E}",
    "\n.ls-ribbon i{font-style:normal;font-size:11.5px;color:#6B5B85;display:block}",
    "\n.ls-ribbon .badge{margin-left:auto;font-family:'Baloo 2',system-ui,sans-serif;font-size:10px;font-weight:800;letter-spacing:.08em;text-transform:uppercase;color:#6B3C72;background:#fff;border:1px solid #E0D4F5;padding:4px 10px;border-radius:99px}",
    "\n.ls-curtain{position:fixed;left:0;right:0;bottom:0;height:78vh;z-index:8000;display:flex;justify-content:center;align-items:flex-end;padding-bottom:7vh;background:linear-gradient(180deg,rgba(247,246,249,0) 0%,rgba(247,246,249,.88) 26%,#F7F6F9 46%)}",
    "\n.ls-gate{width:min(430px,92vw);background:#fff;border:1px solid #E1D9EC;border-radius:18px;box-shadow:0 22px 60px rgba(33,26,46,.22);padding:24px 24px 20px;text-align:center;font-family:'Nunito Sans',system-ui,sans-serif}",
    "\n.ls-gate .lock{width:38px;height:38px;border-radius:12px;background:#F5F0FB;display:grid;place-items:center;margin:0 auto 12px}",
    "\n.ls-gate .lock svg{width:19px;height:19px;stroke:#6B3C72}",
    "\n.ls-gate h3{font-family:'Baloo 2',system-ui,sans-serif;font-size:18px;font-weight:800;color:#1A1A1A;margin-bottom:12px;letter-spacing:-.01em}",
    "\n.ls-gate p{font-size:13px;color:#7E7490;line-height:1.6;margin-bottom:16px}",
    "\n.ls-gate form{display:flex;gap:8px}",
    "\n.ls-gate input{flex:1;min-width:0;border:1px solid #E1D9EC;border-radius:11px;padding:11px 13px;font-family:inherit;font-size:13.5px;outline:none;transition:.15s}",
    "\n.ls-gate input:focus{border-color:#6B3C72;box-shadow:0 0 0 3px rgba(107,60,114,.1)}",
    "\n.ls-gate input.err{border-color:#D9534F;box-shadow:0 0 0 3px rgba(217,83,79,.12)}",
    "\n.ls-gate button{border:none;border-radius:11px;background:#6B3C72;color:#fff;font-family:'Baloo 2',system-ui,sans-serif;font-size:13px;font-weight:700;padding:11px 17px;cursor:pointer;transition:.15s;white-space:nowrap}",
    "\n.ls-gate button:hover{background:#4A2A6E}",
    "\n.ls-gate .fine{font-size:11px;color:#A79FB6;margin-top:11px;line-height:1.5}",
    "\n.ls-gate .who{display:flex;align-items:center;justify-content:center;gap:8px;margin-bottom:14px}",
    "\n.ls-gate .who .av{width:26px;height:26px;border-radius:50%;display:grid;place-items:center;color:#fff;font-family:'Baloo 2',system-ui,sans-serif;font-size:10px;font-weight:800}",
    "\n.ls-gate .who span{font-size:12.5px;color:#4A3E5C}",
    "\nbody.ls-gated{overflow:hidden!important}",
    "\n.ls-toast.on{opacity:1;transform:translate(-50%,0)}"
  ].join('');

  // a small mock directory, so the picker behaves like a real one
  var PEOPLE = [
    { n: 'Sarah Whitfield',  e: 'sarah.whitfield@costco.com.au',  r: 'Marketing Director' },
    { n: 'Daniel Okafor',    e: 'daniel.okafor@costco.com.au',    r: 'Media Manager' },
    { n: 'Priya Raman',      e: 'priya.raman@costco.com.au',      r: 'Category Insights' },
    { n: 'Tom Beavis',       e: 'tom.beavis@costco.com.au',       r: 'Property & Network' },
    { n: 'Yuki Tanaka',      e: 'yuki.tanaka@omd.com.au',         r: 'Agency · OMD' },
    { n: 'Marco Ferretti',   e: 'marco.ferretti@omd.com.au',      r: 'Agency · OMD' },
    { n: 'Cynthia Rahardja', e: 'cynthia@lumos.com.au',           r: 'Lumos' }
  ];
  var HUES = ['#6B3C72', '#2F8F63', '#C07A2E', '#1E5AA8', '#B4327E', '#0E7490'];
  function hue(s) { var h = 0; for (var i = 0; i < s.length; i++) h = (h + s.charCodeAt(i)) % HUES.length; return HUES[h]; }
  function initials(n) { return n.split(/\s+/).slice(0, 2).map(function (w) { return w[0]; }).join('').toUpperCase(); }
  function nameFromEmail(e) {
    return e.split('@')[0].split(/[._-]/).filter(Boolean)
      .map(function (w) { return w[0].toUpperCase() + w.slice(1); }).join(' ');
  }
  var VALID = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  var injected = false;
  function injectOnce() {
    if (injected) return; injected = true;
    var st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st);
  }

  function toast(msg) {
    var t = document.createElement('div'); t.className = 'ls-toast'; t.textContent = msg;
    document.body.appendChild(t);
    requestAnimationFrame(function () { t.classList.add('on'); });
    setTimeout(function () { t.classList.remove('on'); setTimeout(function () { t.remove(); }, 300); }, 2200);
  }

  function open(opts) {
    var picked = [];                      // people about to be invited
    var granted = [{ n: 'You', e: 'polina@lumos.com.au', r: 'Owner', own: true }];

    var scrim = document.createElement('div');
    scrim.className = 'ls-scrim';
    scrim.innerHTML =
      '<div class="ls-modal" role="dialog" aria-modal="true">' +
        '<div class="ls-h"><div><h2>Share this ' + (opts.kind || 'page') + '</h2>' +
          '<p>' + (opts.title || '') + '</p></div><button class="ls-x" aria-label="Close">×</button></div>' +
        '<div class="ls-body">' +
          '<div class="ls-field" id="lsField"><input type="text" placeholder="Add colleagues by name or email…" autocomplete="off">' +
            '<div class="ls-sugg" id="lsSugg"></div></div>' +
          '<textarea class="ls-note" rows="2" placeholder="Add a message (optional)"></textarea>' +
          '<div class="ls-access"><div class="k">Who has access</div><div id="lsAccess"></div></div>' +
        '</div>' +
        '<div class="ls-f">' +
          '<button class="ls-link" id="lsCopy"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M10 13a5 5 0 007.5.5l3-3a5 5 0 00-7-7l-1.7 1.7"/><path d="M14 11a5 5 0 00-7.5-.5l-3 3a5 5 0 007 7l1.7-1.7"/></svg>Copy link</button>' +
          '<button class="ls-link" id="lsPreview"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
            '<path d="M2 12s3.6-7 10-7 10 7 10 7-3.6 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></svg>View shared file</button>' +
          '<button class="ls-send" id="lsSend" disabled>Share</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(scrim);
    requestAnimationFrame(function () { scrim.classList.add('on'); });

    var field = scrim.querySelector('#lsField'),
        input = field.querySelector('input'),
        sugg  = scrim.querySelector('#lsSugg'),
        send  = scrim.querySelector('#lsSend'),
        accessEl = scrim.querySelector('#lsAccess');

    function close() { scrim.classList.remove('on'); setTimeout(function () { scrim.remove(); }, 220); }
    scrim.querySelector('.ls-x').onclick = close;
    scrim.onclick = function (e) { if (e.target === scrim) close(); };
    document.addEventListener('keydown', function esc(e) {
      if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); }
    });

    function avatar(p, cls) {
      return '<span class="' + (cls || 'av') + '" style="background:' + hue(p.e) + '">' + initials(p.n) + '</span>';
    }
    function renderAccess() {
      accessEl.innerHTML = granted.map(function (p) {
        return '<div class="ls-person">' + avatar(p) +
          '<div><b>' + p.n + '</b><span>' + p.e + '</span></div>' +
          '<select class="ls-role"' + (p.own ? ' disabled' : '') + '>' +
            (p.own ? '<option>Owner</option>' : '<option>Can view</option><option>Can edit</option><option>Remove</option>') +
          '</select></div>';
      }).join('');
    }
    function renderChips() {
      field.querySelectorAll('.ls-chip').forEach(function (c) { c.remove(); });
      picked.forEach(function (p, i) {
        var c = document.createElement('span');
        c.className = 'ls-chip' + (p.bad ? ' bad' : '');
        c.innerHTML = (p.bad ? '' : avatar(p)) +
          '<span><span class="nm">' + p.n + '</span>' + (p.bad ? '' : '<span class="em">' + p.e + '</span>') + '</span>' +
          '<button class="rm" aria-label="Remove">×</button>';
        c.querySelector('.rm').onclick = function () { picked.splice(i, 1); renderChips(); };
        field.insertBefore(c, input);
      });
      send.disabled = !picked.length || picked.some(function (p) { return p.bad; });
      send.textContent = picked.length > 1 ? 'Share with ' + picked.length : 'Share';
    }
    function addPerson(p) {
      if (!picked.some(function (x) { return x.e === p.e; })) picked.push(p);
      input.value = ''; sugg.classList.remove('on'); renderChips(); input.focus();
    }
    function commitTyped() {
      var v = input.value.trim().replace(/,$/, '');
      if (!v) return;
      if (VALID.test(v)) addPerson({ n: nameFromEmail(v), e: v });
      else { picked.push({ n: v + ' — not a valid email', e: v, bad: true }); input.value = ''; renderChips(); }
    }

    var cursor = -1;
    function matches() {
      var q = input.value.trim().toLowerCase();
      if (!q) return [];
      return PEOPLE.filter(function (p) {
        return (p.n + ' ' + p.e + ' ' + p.r).toLowerCase().indexOf(q) >= 0 &&
               !picked.some(function (x) { return x.e === p.e; });
      }).slice(0, 5);
    }
    function renderSugg() {
      var m = matches(); cursor = -1;
      if (!m.length) { sugg.classList.remove('on'); return; }
      sugg.innerHTML = m.map(function (p, i) {
        return '<div class="ls-opt" data-i="' + i + '">' + avatar(p) +
          '<div><b>' + p.n + '</b><span>' + p.e + '</span></div><span class="role">' + p.r + '</span></div>';
      }).join('');
      sugg.querySelectorAll('.ls-opt').forEach(function (el) {
        el.onmousedown = function (e) { e.preventDefault(); addPerson(m[+el.dataset.i]); };
      });
      sugg.classList.add('on');
    }
    input.addEventListener('input', renderSugg);
    input.addEventListener('keydown', function (e) {
      var opts = sugg.querySelectorAll('.ls-opt');
      if (e.key === 'ArrowDown' && opts.length) { e.preventDefault(); cursor = Math.min(cursor + 1, opts.length - 1); }
      else if (e.key === 'ArrowUp' && opts.length) { e.preventDefault(); cursor = Math.max(cursor - 1, 0); }
      else if (e.key === 'Enter') {
        e.preventDefault();
        if (cursor >= 0 && opts[cursor]) opts[cursor].dispatchEvent(new MouseEvent('mousedown'));
        else commitTyped();
        return;
      } else if ((e.key === ',' || e.key === 'Tab') && input.value.trim()) { e.preventDefault(); commitTyped(); return; }
      else if (e.key === 'Backspace' && !input.value && picked.length) { picked.pop(); renderChips(); return; }
      else return;
      opts.forEach(function (o, i) { o.classList.toggle('sel', i === cursor); });
    });
    input.addEventListener('blur', function () { setTimeout(function () { sugg.classList.remove('on'); }, 120); });

    scrim.querySelector('#lsCopy').onclick = function () {
      if (navigator.clipboard) navigator.clipboard.writeText(shareUrl()).catch(function () {});
      toast('Link copied — recipients leave an email to see it all');
    };
    scrim.querySelector('#lsPreview').onclick = function () {
      window.open(shareUrl(), '_blank', 'noopener');
    };
    send.onclick = function () {
      var names = picked.map(function (p) { return p.n; });
      picked.forEach(function (p) { granted.push({ n: p.n, e: p.e }); });
      picked = []; renderChips(); renderAccess();
      toast('Shared with ' + (names.length > 2 ? names.slice(0, 2).join(', ') + ' and ' + (names.length - 2) + ' others' : names.join(' and ')));
    };

    renderAccess(); renderChips();
    setTimeout(function () { input.focus(); }, 120);
  }


  // ── the recipient's side ───────────────────────────────────────────────────
  // A shared link shows the top of the page and asks for an email for the rest.
  function shareUrl() {
    var u = new URL(location.href);
    u.searchParams.set('shared', '1');
    u.searchParams.set('from', 'Polina Nesterova');
    return u.toString();
  }
  var UNLOCK_KEY = 'lumos-shared-unlocked';

  function ribbon(from, unlocked) {
    var r = document.createElement('div');
    r.className = 'ls-ribbon';
    r.innerHTML = '<span class="av" style="background:' + hue(from) + '">' + initials(from) + '</span>' +
      '<span><b>' + from + '</b> shared this with you<i>Costco — Western Sydney launch · prepared by Lumos</i></span>' +
      '<span class="badge">' + (unlocked ? 'Full access' : 'Preview') + '</span>';
    document.body.insertBefore(r, document.body.firstChild);
    return r;
  }

  function gate(opts) {
    opts = opts || {};
    injectOnce();
    var q = new URLSearchParams(location.search);
    if (q.get('shared') !== '1') return;                 // only on a shared link
    var from = q.get('from') || 'A colleague';
    var already = false;
    try { already = !!localStorage.getItem(UNLOCK_KEY); } catch (e) {}

    var rib = ribbon(from, already);
    if (already) return;                                 // they have already left an email

    document.body.classList.add('ls-gated');
    var curtain = document.createElement('div');
    curtain.className = 'ls-curtain';
    curtain.innerHTML =
      '<div class="ls-gate">' +
        '<div class="lock"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round">' +
          '<rect x="4" y="10" width="16" height="11" rx="2.5"/><path d="M8 10V7a4 4 0 018 0v3"/></svg></div>' +
        '<h3>' + (opts.headline || 'See the full findings') + '</h3>' +
        '<div class="who"><span class="av" style="background:' + hue(from) + '">' + initials(from) + '</span>' +
          '<span>' + from + ' shared this with you</span></div>' +
        '<p>' + (opts.blurb || 'Leave your email to read the evidence, the key findings and the interactive map.') + '</p>' +
        '<form><input type="email" placeholder="you@company.com" autocomplete="email" required>' +
        '<button type="submit">' + (opts.cta || 'View findings') + '</button></form>' +
        '<div class="fine">No account needed. We’ll email you a copy so you can come back to it.</div>' +
      '</div>';
    document.body.appendChild(curtain);

    var form = curtain.querySelector('form'), input = curtain.querySelector('input');
    setTimeout(function () { input.focus(); }, 300);
    input.addEventListener('input', function () { input.classList.remove('err'); });
    form.onsubmit = function (e) {
      e.preventDefault();
      var v = input.value.trim();
      if (!VALID.test(v)) { input.classList.add('err'); input.focus(); return; }
      try { localStorage.setItem(UNLOCK_KEY, v); } catch (er) {}
      document.body.classList.remove('ls-gated');
      curtain.style.transition = 'opacity .3s';
      curtain.style.opacity = '0';
      setTimeout(function () { curtain.remove(); }, 320);
      rib.querySelector('.badge').textContent = 'Full access';
      toast('Unlocked — a copy is on its way to ' + v);
      if (opts.onUnlock) opts.onUnlock(v);
    };
  }

  global.LumosShare = {
    mount: function (el, opts) {
      injectOnce();
      opts = opts || {};
      if (!el) return;
      el.classList.add('ls-btn');
      el.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M4 12v7a2 2 0 002 2h12a2 2 0 002-2v-7"/><path d="M16 6l-4-4-4 4"/><path d="M12 2v14"/></svg>Share';
      el.onclick = function () { open(opts); };
    },
    open: function (opts) { injectOnce(); open(opts || {}); },
    gate: gate,
    shareUrl: shareUrl,
    reset: function () { try { localStorage.removeItem(UNLOCK_KEY); } catch (e) {} }
  };
})(typeof window !== 'undefined' ? window : this);
