/*! LumosMap — audience-density map for the Lumos prototype (Singapore).
 *  Drop-in replacement for public/lumos-map.js. Requires Leaflet 1.9+ on the page.
 *
 *  Contract (unchanged, used by src/app/components/LumosMapStage.tsx):
 *    const lm = LumosMap.mount(el, { onSelect(segId), onShowAll() });
 *    lm.open();                 // reveal + fit
 *    lm.select('sedan'|'ev'|'suv');
 *    lm.showAll();
 *    lm.setLens('daytime');     // Signal: residential | daytime | transaction
 *    lm.destroy();
 *    lm.mode                    // 'sedan' | 'ev' | 'suv' | 'all'
 *  Fires onSelect(seg) when one segment is chosen on the map, onShowAll() when combined.
 */
(function (global) {
  "use strict";
  var CSS = ".lm-root{\n    --bg:#F3F3F1; --panel:#FFFFFF; --panel-soft:#FAFAF8; --border:#E5E5E2;\n    --text:#1A1A1A; --text-muted:#6B6B6B; --text-faint:#9A9A9A;\n    --accent:#6B3C72; --accent-soft:#F1E9FF; --accent-tint:#BEBDE7; --accent-deep:#4E2A54;\n    --l-density:#6B3C72; --l-poi:#9C826B; --l-media:#71808F; --l-move:#E11D74;\n    /* density ramp very-low → very-high */\n    --h1:#EFE3F1; --h2:#D6B9DA; --h3:#B084B8; --h4:#7A4C82; --h5:#4E2A54;\n  }\n.lm-root *{box-sizing:border-box;margin:0;padding:0}\n.lm-root body{font-family:'Nunito',sans-serif;background:#2E2E2E;color:var(--text);font-size:14px;line-height:1.5;padding:34px}\n.lm-root .flow-title, .lm-root .brandname, .lm-root .msg-role, .lm-root .actcard b, .lm-root .actcard .h, .lm-root .suggest, .lm-root .composer button, .lm-root .lyr-name, .lm-root .lyr-count, .lm-root .panel-h, .lm-root .fbtn, .lm-root .pill, .lm-root .leg .ll, .lm-root .leg .cap, .lm-root .gran, .lm-root .zbtn, .lm-root .ctx-name, .lm-root .ctx-meta, .lm-root .pop-h, .lm-root .pop-opt, .lm-root .seg span, .lm-root .aud-tip .tn, .lm-root .aud-tip .tx, .lm-root .mk-lab, .lm-root .flowlab, .lm-root .ic-name, .lm-root .ic-score, .lm-root .st-lab, .lm-root .st-val, .lm-root .cor-h, .lm-root .cor-name, .lm-root .cor-pct, .lm-root .ic-sub{font-family:'Baloo 2',sans-serif}\n.lm-root .flow-title{color:#E8E8E8;font-size:20px;margin-bottom:6px}\n.lm-root .flow-sub{color:#B5B5B5;font-size:13px;margin-bottom:22px;max-width:1240px}\n.lm-root .flow-sub b{color:#fff}\n.lm-root .screen{width:1440px;height:860px;background:var(--bg);border:1px solid #111;border-radius:16px;overflow:hidden;margin:0 auto;display:flex;box-shadow:0 24px 60px rgba(0,0,0,.4);position:relative}\n.lm-root .screen.mapfull .chat, .lm-root .screen.mapfull .nav{display:none}\n.lm-root /* nav */\n  .nav{width:56px;flex:0 0 56px;background:#fff;border-right:1px solid var(--border);display:flex;flex-direction:column;align-items:center;padding:12px 0;gap:6px}\n.lm-root .nav .logo{width:32px;height:32px;border-radius:9px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:700;margin-bottom:8px}\n.lm-root .nav .nic{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:var(--text-faint)}\n.lm-root .nav .nic svg{width:18px;height:18px}\n.lm-root .nav .nic.on{background:var(--accent-soft);color:var(--accent)}\n.lm-root .nav .spacer{flex:1}\n.lm-root /* chat */\n  .chat{width:392px;flex:0 0 392px;background:var(--panel);border-right:1px solid var(--border);display:flex;flex-direction:column;min-height:0}\n.lm-root .chat-head{padding:14px 16px 12px;border-bottom:1px solid var(--border)}\n.lm-root .brandrow{display:flex;align-items:center;gap:8px}\n.lm-root .brandname{font-size:15px;font-weight:700}\n.lm-root .spark{width:22px;height:22px;border-radius:7px;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center}\n.lm-root .spark svg{width:13px;height:13px}\n.lm-root .ctx{margin-top:10px;display:flex;align-items:center;gap:10px;background:var(--panel-soft);border:1px solid var(--border);border-radius:11px;padding:8px 10px}\n.lm-root .ctx .dot{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#7A4C82,#E11D74);flex:0 0 30px}\n.lm-root .ctx-name{font-size:13px;font-weight:600}\n.lm-root .ctx-meta{font-size:11px;color:var(--text-faint)}\n.lm-root .ctx .live{margin-left:auto;font-size:10px;color:var(--accent);background:var(--accent-soft);border-radius:999px;padding:3px 8px;display:flex;align-items:center;gap:5px}\n.lm-root .ctx .live i{width:6px;height:6px;border-radius:50%;background:var(--accent);display:inline-block}\n.lm-root .thread{flex:1;overflow-y:auto;padding:16px;display:flex;flex-direction:column;gap:14px}\n.lm-root .thread::-webkit-scrollbar{width:8px}\n.lm-root .thread::-webkit-scrollbar-thumb{background:#e2e2df;border-radius:8px}\n.lm-root .msg{display:flex;flex-direction:column;gap:6px;max-width:100%}\n.lm-root .msg-role{font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--text-faint);display:flex;align-items:center;gap:6px}\n.lm-root .msg.user{align-items:flex-end}\n.lm-root .msg.user .bubble{align-self:flex-end;background:var(--accent);color:#fff;border-radius:14px 14px 4px 14px;padding:9px 13px;font-size:13px;max-width:86%}\n.lm-root .msg.ai .bubble{background:var(--panel-soft);border:1px solid var(--border);border-radius:14px 14px 14px 4px;padding:10px 13px;font-size:13px;color:var(--text)}\n.lm-root .msg.ai .bubble b{color:var(--accent-deep)}\n.lm-root .actcard{margin-top:2px;border:1px solid var(--accent-tint);background:linear-gradient(180deg,#FCFAFF,#F6EFFF);border-radius:12px;padding:10px 11px}\n.lm-root .actcard .h{font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:var(--accent);display:flex;align-items:center;gap:6px;margin-bottom:8px}\n.lm-root .actcard .h svg{width:12px;height:12px}\n.lm-root .actrow{display:flex;align-items:center;gap:8px;font-size:12px;color:var(--text);padding:3px 0}\n.lm-root .actrow .sw{width:14px;height:14px;border-radius:4px;flex:0 0 14px}\n.lm-root .actrow .k{color:var(--text-muted)}\n.lm-root .actrow b{font-weight:700}\n.lm-root .actrow .on-tag{margin-left:auto;font-size:10px;color:#2F7D4F;background:#E7F3EC;border-radius:999px;padding:2px 7px}\n.lm-root .actrow .off-tag{margin-left:auto;font-size:10px;color:var(--text-faint);background:var(--bg);border-radius:999px;padding:2px 7px}\n.lm-root /* corridor-share card inside chat (movement) */\n  .cor{margin-top:9px;border:1px solid var(--border);background:#fff;border-radius:12px;padding:11px 12px}\n.lm-root .cor-h{font-size:9px;letter-spacing:.08em;text-transform:uppercase;color:var(--text-faint);margin-bottom:9px;display:flex;align-items:center;gap:6px}\n.lm-root .cor-h .dotc{width:7px;height:7px;border-radius:50%;background:var(--l-move)}\n.lm-root .cor-item{margin-bottom:9px}\n.lm-root .cor-item:last-child{margin-bottom:0}\n.lm-root .cor-top{display:flex;align-items:baseline;gap:8px;margin-bottom:4px}\n.lm-root .cor-name{font-size:12px;font-weight:600;color:var(--text)}\n.lm-root .cor-pct{margin-left:auto;font-size:12px;font-weight:700}\n.lm-root .cor-bar{height:6px;border-radius:999px;background:var(--bg);overflow:hidden}\n.lm-root .cor-bar i{display:block;height:100%;border-radius:999px}\n.lm-root .suggests{padding:2px 16px 10px;display:flex;flex-wrap:wrap;gap:7px}\n.lm-root .suggest{font-size:11.5px;color:var(--accent);background:var(--accent-soft);border:1px solid var(--accent-tint);border-radius:999px;padding:6px 11px;cursor:pointer;transition:.12s}\n.lm-root .suggest:hover{background:#e9dcff}\n.lm-root .suggest svg{width:12px;height:12px;vertical-align:-2px;margin-right:3px}\n.lm-root .composer{padding:10px 14px 14px;border-top:1px solid var(--border)}\n.lm-root .composer .box{display:flex;align-items:center;gap:8px;border:1px solid var(--border);border-radius:12px;padding:6px 6px 6px 13px;background:var(--panel-soft)}\n.lm-root .composer input{flex:1;border:none;background:none;outline:none;font-family:'Nunito';font-size:13px;color:var(--text)}\n.lm-root .composer input::placeholder{color:var(--text-faint)}\n.lm-root .composer button{width:34px;height:34px;border-radius:9px;border:none;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer}\n.lm-root .composer button svg{width:16px;height:16px}\n.lm-root /* map */\n  .stage{flex:1;position:relative;min-width:0;background:#e9edf0}\n.lm-root #map{position:absolute;inset:0;z-index:1}\n.lm-root .leaflet-container{background:#eef1f3;font-family:'Baloo 2',sans-serif}\n.lm-root .leaflet-control-zoom{display:none}\n.lm-root .mfloat{position:absolute;z-index:600}\n.lm-root .filterbar{top:14px;left:262px;display:flex;align-items:center;gap:8px;flex-wrap:wrap;max-width:520px}\n.lm-root /* collapse chevron shared by panels */\n  .p-chev{margin-left:8px;width:20px;height:20px;display:flex;align-items:center;justify-content:center;color:var(--text-faint);cursor:pointer;transition:transform .15s;flex:0 0 20px}\n.lm-root .p-chev svg{width:14px;height:14px}\n.lm-root .collapsed .p-chev{transform:rotate(-90deg)}\n.lm-root .layers.collapsed .lyr{display:none}\n.lm-root .audpanel.collapsed #apList{display:none}\n.lm-root /* on-map audiences panel */\n  .audpanel{top:14px;left:14px;width:206px;background:rgba(255,255,255,.98);border:1px solid var(--border);border-radius:12px;box-shadow:0 8px 26px rgba(0,0,0,.14);overflow:hidden}\n.lm-root .ap-h{display:flex;align-items:center;gap:7px;padding:9px 11px;font-size:12.5px;font-weight:700;font-family:'Baloo 2'}\n.lm-root .audpanel:not(.collapsed) .ap-h{border-bottom:1px solid var(--border)}\n.lm-root .ap-h svg{width:14px;height:14px;color:var(--accent)}\n.lm-root .ap-all{margin-left:auto;font-size:10px;font-weight:600;color:var(--accent);background:var(--accent-soft);border:1px solid var(--accent-tint);border-radius:999px;padding:2px 8px;cursor:pointer}\n.lm-root .ap-all.on{background:var(--accent);color:#fff;border-color:var(--accent)}\n.lm-root .ap-item{display:flex;align-items:center;gap:8px;padding:6px 11px;cursor:pointer;border-bottom:1px solid var(--border);transition:.1s}\n.lm-root .ap-item:last-of-type{border-bottom:none}\n.lm-root .ap-item .ap-check{width:16px;height:16px;border-radius:5px;border:1.5px solid var(--border);flex:0 0 16px;display:flex;align-items:center;justify-content:center}\n.lm-root .ap-item .ap-check svg{width:10px;height:10px;color:#fff;display:none}\n.lm-root .ap-item .ap-dot{width:10px;height:10px;border-radius:50%;flex:0 0 10px}\n.lm-root .ap-name{font-size:11.5px;font-weight:600;font-family:'Baloo 2';flex:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}\n.lm-root .ap-ppl{font-size:9.5px;color:var(--text-faint);font-family:'Baloo 2'}\n.lm-root .ap-item.off{opacity:.5}\n.lm-root .ap-item.off .ap-dot{background:var(--border)!important}\n.lm-root .ap-item.on .ap-check{border-color:transparent}\n.lm-root .ap-item.on .ap-check svg{display:block}\n.lm-root .fbtn{display:inline-flex;align-items:center;gap:7px;background:rgba(255,255,255,.97);border:1px solid var(--border);border-radius:999px;padding:8px 13px;font-size:12.5px;color:var(--text);box-shadow:0 3px 12px rgba(0,0,0,.09);cursor:pointer;transition:.12s}\n.lm-root .fbtn:hover{border-color:var(--accent-tint)}\n.lm-root .fbtn svg{width:14px;height:14px;color:var(--text-muted)}\n.lm-root .fbtn.aud{background:var(--accent);color:#fff;border-color:var(--accent)}\n.lm-root .fbtn.aud svg{color:#fff}\n.lm-root .fbtn.aud b{background:rgba(255,255,255,.22);border-radius:999px;padding:1px 7px;font-size:10px;font-weight:700}\n.lm-root .tlab{font-size:9px;letter-spacing:.07em;text-transform:uppercase;color:var(--text-faint);margin:4px 0 6px}\n.lm-root .sigseg{display:flex;background:var(--accent-soft);border-radius:10px;padding:3px;gap:2px;margin-bottom:10px}\n.lm-root .sigseg span{flex:1;text-align:center;font-size:11.5px;padding:7px 4px;border-radius:8px;color:var(--accent);cursor:pointer;transition:.1s}\n.lm-root .sigseg span.on{background:#fff;color:var(--accent-deep);font-weight:700;box-shadow:0 1px 3px rgba(107,60,114,.2)}\n.lm-root .pill{display:inline-flex;align-items:center;gap:7px;background:var(--accent-soft);border:1px solid var(--accent-tint);border-radius:999px;padding:7px 8px 7px 12px;font-size:12px;color:var(--accent-deep);box-shadow:0 3px 12px rgba(0,0,0,.08)}\n.lm-root .pill .k{font-size:9px;letter-spacing:.05em;text-transform:uppercase;color:var(--accent);opacity:.75}\n.lm-root .pill .x{width:16px;height:16px;border-radius:50%;background:rgba(107,60,114,.14);display:flex;align-items:center;justify-content:center;cursor:pointer}\n.lm-root .pill .x svg{width:9px;height:9px;color:var(--accent-deep)}\n.lm-root .pop{position:absolute;z-index:900;top:56px;left:14px;width:280px;background:#fff;border:1px solid var(--border);border-radius:14px;box-shadow:0 14px 40px rgba(0,0,0,.20);padding:13px;display:none}\n.lm-root .pop.open{display:block}\n.lm-root .pop-h{font-size:13px;font-weight:700;margin-bottom:2px}\n.lm-root .pop-sub{font-size:11px;color:var(--text-faint);margin-bottom:11px}\n.lm-root .pop-opt{display:flex;align-items:center;gap:9px;font-size:12.5px;padding:8px 9px;border-radius:9px;cursor:pointer;color:var(--text)}\n.lm-root .pop-opt:hover{background:var(--panel-soft)}\n.lm-root .pop-opt .rd{width:16px;height:16px;border-radius:50%;border:1.5px solid var(--border);flex:0 0 16px}\n.lm-root .pop-opt.on .rd{border-color:var(--accent);background:radial-gradient(circle at center,var(--accent) 0 5px,#fff 6px)}\n.lm-root .pop-opt .ck{width:16px;height:16px;border-radius:5px;border:1.5px solid var(--border);flex:0 0 16px;display:flex;align-items:center;justify-content:center}\n.lm-root .pop-opt.on .ck{background:var(--accent);border-color:var(--accent)}\n.lm-root .pop-opt .ck svg{display:none;width:11px;height:11px;color:#fff}\n.lm-root .pop-opt.on .ck svg{display:block}\n.lm-root /* demographics dual-range sliders */\n  .demo-sep{height:1px;background:var(--border);margin:8px 0 10px}\n.lm-root .rng{margin:2px 0 14px}\n.lm-root .rng-top{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:9px}\n.lm-root .rng-lab{font-size:12px;font-weight:600;font-family:'Baloo 2';color:var(--text)}\n.lm-root .rng-val{font-size:11.5px;font-family:'Baloo 2';color:var(--accent);font-weight:700}\n.lm-root .rng-track{position:relative;height:16px}\n.lm-root .rng-track .base{position:absolute;top:6px;left:0;right:0;height:4px;background:var(--border);border-radius:999px}\n.lm-root .rng-fill{position:absolute;top:6px;height:4px;background:var(--accent);border-radius:999px}\n.lm-root .rng-track input[type=range]{position:absolute;top:0;left:0;width:100%;height:16px;-webkit-appearance:none;appearance:none;background:transparent;margin:0;pointer-events:none}\n.lm-root .rng-track input[type=range]::-webkit-slider-thumb{-webkit-appearance:none;pointer-events:auto;width:15px;height:15px;border-radius:50%;background:#fff;border:3px solid var(--accent);box-shadow:0 1px 4px rgba(0,0,0,.3);cursor:pointer}\n.lm-root .rng-track input[type=range]::-moz-range-thumb{pointer-events:auto;width:15px;height:15px;border-radius:50%;background:#fff;border:3px solid var(--accent);box-shadow:0 1px 4px rgba(0,0,0,.3);cursor:pointer}\n.lm-root .rng-ends{display:flex;justify-content:space-between;font-size:9.5px;color:var(--text-faint);font-family:'Baloo 2';margin-top:3px}\n.lm-root .months{display:grid;grid-template-columns:repeat(6,1fr);gap:5px;margin-top:8px}\n.lm-root .mo{font-size:10.5px;text-align:center;padding:6px 0;border:1px solid var(--border);border-radius:7px;cursor:pointer;color:var(--text-muted)}\n.lm-root .mo.on{background:var(--accent-soft);border-color:var(--accent-tint);color:var(--accent)}\n.lm-root .hourwrap{margin-top:6px}\n.lm-root .hourlab{display:flex;justify-content:space-between;font-size:10px;color:var(--text-faint);margin-bottom:5px}\n.lm-root .hourbar{display:flex;gap:2px;height:34px;align-items:flex-end}\n.lm-root .hourbar .hb{flex:1;background:var(--h2);border-radius:2px 2px 0 0;cursor:pointer;opacity:.5;transition:.1s}\n.lm-root .hourbar .hb.on{opacity:1;background:var(--accent)}\n.lm-root .pop-apply{margin-top:12px;width:100%;background:var(--accent);color:#fff;border:none;border-radius:9px;padding:9px;font-family:'Baloo 2';font-weight:600;font-size:12.5px;cursor:pointer}\n.lm-root /* layers */\n  .layers{top:14px;right:14px;width:216px;background:rgba(255,255,255,.98);border:1px solid var(--border);border-radius:12px;box-shadow:0 8px 26px rgba(0,0,0,.14);overflow:hidden}\n.lm-root .panel-h{display:flex;align-items:center;gap:7px;padding:9px 11px;font-size:12.5px;font-weight:700}\n.lm-root .layers:not(.collapsed) .panel-h{border-bottom:1px solid var(--border)}\n.lm-root .panel-h svg{width:15px;height:15px;color:var(--accent)}\n.lm-root .panel-h .add{margin-left:auto;width:24px;height:24px;border-radius:7px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--text-faint);cursor:pointer}\n.lm-root .panel-h .add svg{width:13px;height:13px}\n.lm-root .lyr{border-bottom:1px solid var(--border);transition:background .12s}\n.lm-root .lyr:last-child{border-bottom:none}\n.lm-root .lyr.on{background:color-mix(in srgb, var(--lc) 12%, #fff)}\n.lm-root .lyr-main{display:flex;align-items:center;gap:10px;padding:8px 11px;cursor:pointer}\n.lm-root .lyr-eye{width:20px;height:20px;border-radius:6px;border:1.6px solid var(--border);display:flex;align-items:center;justify-content:center;color:transparent;flex:0 0 20px;transition:.12s}\n.lm-root .lyr-eye svg{width:12px;height:12px}\n.lm-root .lyr.on .lyr-eye{background:var(--lc);border-color:var(--lc);color:#fff}\n.lm-root .lyr-body{flex:1;min-width:0}\n.lm-root .lyr-name{font-size:12.5px;font-weight:600}\n.lm-root .lyr.on .lyr-name{color:var(--lc)}\n.lm-root .lyr-sub{font-size:10.5px;color:var(--text-faint)}\n.lm-root .lyr.off .lyr-name, .lm-root .lyr.off .lyr-sub{opacity:.5}\n.lm-root .lyr-extra{padding:0 12px 12px 48px;display:none}\n.lm-root .lyr.on.expanded .lyr-extra{display:block}\n.lm-root .op-row{display:flex;align-items:center;gap:9px;font-size:11px;color:var(--text-muted)}\n.lm-root .op-row input[type=range]{flex:1;accent-color:var(--accent);height:3px}\n.lm-root .mvstyle{margin-top:9px}\n.lm-root .mvstyle .t{font-size:10px;letter-spacing:.05em;text-transform:uppercase;color:var(--text-faint);margin-bottom:6px}\n.lm-root .seg{display:flex;background:var(--panel-soft);border:1px solid var(--border);border-radius:9px;padding:3px;gap:3px}\n.lm-root .seg span{flex:1;text-align:center;font-size:11px;padding:6px 4px;border-radius:6px;color:var(--text-muted);cursor:pointer;display:flex;align-items:center;justify-content:center;gap:4px}\n.lm-root .seg span svg{width:12px;height:12px}\n.lm-root .seg span.on{background:#fff;color:var(--l-move);box-shadow:0 1px 3px rgba(0,0,0,.12);font-weight:600}\n.lm-root .mv-hint{font-size:10.5px;color:var(--text-faint);margin-top:7px;line-height:1.4}\n.lm-root /* legend */\n  .leg{bottom:16px;left:14px;background:rgba(255,255,255,.98);border:1px solid var(--border);border-radius:12px;box-shadow:0 6px 20px rgba(0,0,0,.12);padding:11px 12px;width:236px}\n.lm-root .leg .ll{font-size:9px;letter-spacing:.07em;text-transform:uppercase;color:var(--text-faint);margin-bottom:7px}\n.lm-root .leg .ramp{display:flex;gap:3px;margin-bottom:5px}\n.lm-root .leg .ramp i{flex:1;height:11px;border-radius:3px}\n.lm-root .leg .cap{display:flex;justify-content:space-between;font-size:9.5px;color:var(--text-faint)}\n.lm-root .leg .keys{margin-top:10px;padding-top:9px;border-top:1px solid var(--border);display:flex;flex-direction:column;gap:6px}\n.lm-root .leg .krow{display:flex;align-items:center;gap:8px;font-size:11px;color:var(--text-muted)}\n.lm-root .leg .krow .kd{width:11px;height:11px;border-radius:3px;flex:0 0 11px}\n.lm-root .leg .krow.hidden{display:none}\n.lm-root .gran{position:absolute;bottom:16px;left:14px;background:rgba(26,26,26,.9);color:#fff;border-radius:10px;padding:8px 11px;font-size:11px;box-shadow:0 6px 20px rgba(0,0,0,.25);display:flex;align-items:center;gap:8px;z-index:600}\n.lm-root .gran .lv{display:flex;align-items:center;gap:5px}\n.lm-root .gran b{color:#fff;font-weight:700}\n.lm-root .gran .hint{color:#B9A5BE;font-size:10px}\n.lm-root .gran svg{width:13px;height:13px;color:var(--accent-tint)}\n.lm-root /* time-of-day scrubber */\n  .timescale{bottom:16px;left:50%;transform:translateX(-50%);width:560px;max-width:calc(100% - 340px);background:rgba(255,255,255,.98);border:1px solid var(--border);border-radius:14px;box-shadow:0 8px 26px rgba(0,0,0,.16);padding:9px 15px 13px}\n.lm-root .ts-top{display:flex;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:5px}\n.lm-root .ts-time{display:flex;align-items:center;gap:6px;font-family:'Baloo 2';font-size:11.5px;color:var(--text-muted)}\n.lm-root .ts-time svg{width:13px;height:13px;color:var(--accent)}\n.lm-root .ts-time b{font-size:13.5px;color:var(--accent-deep);font-weight:700}\n.lm-root .ts-aud{font-family:'Baloo 2';font-size:11px;color:var(--text-faint);white-space:nowrap}\n.lm-root .ts-aud b{color:var(--accent)}\n.lm-root .ts-track{position:relative;height:44px}\n.lm-root .ts-hist{position:absolute;top:0;left:0;right:0;height:30px;display:flex;align-items:flex-end;gap:2px}\n.lm-root .ts-hist i{flex:1;background:var(--accent-soft);border-radius:2px 2px 0 0;transition:background .1s}\n.lm-root .ts-hist i.cur{background:var(--accent)}\n.lm-root .ts-range{position:absolute;left:-1px;right:-1px;bottom:9px;width:calc(100% + 2px);-webkit-appearance:none;appearance:none;background:transparent;margin:0;cursor:pointer}\n.lm-root .ts-range::-webkit-slider-runnable-track{height:4px;background:var(--border);border-radius:999px}\n.lm-root .ts-range::-webkit-slider-thumb{-webkit-appearance:none;margin-top:-6px;width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid var(--accent);box-shadow:0 2px 6px rgba(0,0,0,.3)}\n.lm-root .ts-range::-moz-range-track{height:4px;background:var(--border);border-radius:999px}\n.lm-root .ts-range::-moz-range-thumb{width:16px;height:16px;border-radius:50%;background:#fff;border:3px solid var(--accent);box-shadow:0 2px 6px rgba(0,0,0,.3)}\n.lm-root .ts-labels{position:absolute;left:0;right:0;bottom:-5px;display:flex;justify-content:space-between;font-size:9px;color:var(--text-faint);font-family:'Baloo 2'}\n.lm-root .zoomer{bottom:16px;right:14px;display:flex;flex-direction:column;gap:6px}\n.lm-root .zbtn{width:38px;height:38px;border-radius:10px;background:rgba(255,255,255,.98);border:1px solid var(--border);box-shadow:0 4px 14px rgba(0,0,0,.12);display:flex;align-items:center;justify-content:center;cursor:pointer;color:var(--text)}\n.lm-root .zbtn svg{width:16px;height:16px}\n.lm-root /* markers */\n  .mk{display:flex;align-items:center;justify-content:center;border-radius:50%;color:#fff;box-shadow:0 2px 6px rgba(0,0,0,.28);border:2px solid #fff}\n.lm-root .mk svg{width:12px;height:12px}\n.lm-root .mk-home{background:#374151;width:22px;height:22px}\n.lm-root /* mono-outline chips — store = rounded square, .lm-root media = circle; flagship inverts to solid fill */\n  .chip{background:#fff;display:flex;align-items:center;justify-content:center;box-shadow:0 2px 5px rgba(0,0,0,.22);cursor:pointer;transition:transform .12s}\n.lm-root .chip svg{width:12px;height:12px}\n.lm-root .chip:hover{transform:scale(1.18)}\n.lm-root .chip.poi{width:22px;height:22px;border-radius:7px;border:2px solid var(--l-poi);color:var(--l-poi)}\n.lm-root .chip.media{width:20px;height:20px;border-radius:50%;border:2px solid var(--l-media);color:var(--l-media)}\n.lm-root .chip.poi.flag{width:28px;height:28px;background:var(--l-poi);color:#fff}\n.lm-root .chip.media.flag{width:26px;height:26px;background:var(--l-media);color:#fff}\n.lm-root .chip.flag svg{width:14px;height:14px}\n.lm-root /* movement flow origin label */\n  .flowlab{background:var(--c,#E11D74);color:#fff;font-size:10px;font-weight:700;border-radius:999px;padding:2px 8px;box-shadow:0 2px 8px rgba(0,0,0,.28);border:2px solid #fff;white-space:nowrap}\n.lm-root .flownode{width:11px;height:11px;border-radius:50%;background:var(--c,#E11D74);border:2px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.3)}\n.lm-root .hubnode{display:flex;align-items:center;gap:6px}\n.lm-root .hubdot{width:16px;height:16px;border-radius:50%;background:#111;border:3px solid #fff;box-shadow:0 3px 10px rgba(0,0,0,.4)}\n.lm-root .hublab{background:#111;color:#fff;font-size:10px;font-weight:700;border-radius:6px;padding:2px 7px;box-shadow:0 2px 8px rgba(0,0,0,.3)}\n.lm-root .aud-tip{background:#1A1A1A!important;border:none!important;border-radius:9px!important;box-shadow:0 6px 20px rgba(0,0,0,.3)!important;padding:8px 10px!important;color:#fff!important}\n.lm-root .aud-tip::before{display:none!important}\n.lm-root .aud-tip .tn{font-size:12px;font-weight:700;display:flex;align-items:center;gap:7px}\n.lm-root .aud-tip .tx{color:var(--accent-tint)}\n.lm-root .aud-tip .tm{font-size:10.5px;color:#B9B9B9;margin-top:2px;font-family:'Nunito'}\n.lm-root /* index info card (matches product) */\n  .infocard{position:absolute;z-index:800;left:50%;bottom:118px;transform:translateX(-50%) translateY(10px);width:396px;background:#fff;border:1px solid var(--border);border-radius:16px;box-shadow:0 18px 50px rgba(0,0,0,.22);padding:16px 16px 15px;opacity:0;pointer-events:none;transition:.18s}\n.lm-root .infocard.show{opacity:1;pointer-events:auto;transform:translateX(-50%) translateY(0)}\n.lm-root .ic-head{display:flex;align-items:center;gap:13px;margin-bottom:14px}\n.lm-root .ic-ring{position:relative;width:52px;height:52px;flex:0 0 52px}\n.lm-root .ic-ring svg{transform:rotate(-90deg)}\n.lm-root .ic-ring .num{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:700;font-size:15px;color:var(--accent-deep)}\n.lm-root .ic-name{font-size:16px;font-weight:700}\n.lm-root .ic-sub{font-size:11px;color:var(--text-faint)}\n.lm-root .ic-x{margin-left:auto;width:26px;height:26px;border-radius:8px;border:1px solid var(--border);display:flex;align-items:center;justify-content:center;color:var(--text-faint);cursor:pointer}\n.lm-root .ic-x svg{width:13px;height:13px}\n.lm-root .ic-grid{display:grid;grid-template-columns:1fr 1fr;gap:10px}\n.lm-root .ic-grid3{display:grid;grid-template-columns:1fr 1fr 1fr;gap:9px}\n.lm-root .st{border:1px solid var(--border);border-radius:11px;padding:9px 10px;position:relative}\n.lm-root .st-lab{font-size:9.5px;color:var(--text-muted);display:flex;align-items:center;gap:5px;margin-bottom:5px}\n.lm-root .st-lab svg{width:12px;height:12px;color:var(--text-faint);flex:0 0 12px}\n.lm-root .st-lab .badge{font-size:9px;color:var(--accent);background:var(--accent-soft);border-radius:999px;padding:1px 6px;margin-left:2px}\n.lm-root .st-val{font-size:18px;font-weight:700;color:var(--text)}\n.lm-root .st-val small{font-size:10.5px;color:var(--text-muted);font-weight:600}\n.lm-root .st .est{position:absolute;right:9px;bottom:8px;font-size:9px;color:var(--text-faint)}\n.lm-root .ic-foot{display:flex;align-items:center;gap:8px;margin-top:11px;padding-top:11px;border-top:1px solid var(--border);font-size:11.5px;color:var(--text-muted);font-family:'Baloo 2'}\n.lm-root .ic-foot .ic-dot{width:10px;height:10px;border-radius:50%;flex:0 0 10px;background:var(--accent)}\n.lm-root .ic-foot b{color:var(--text);font-weight:700}\n.lm-root .toast{position:absolute;left:50%;bottom:20px;transform:translateX(-50%) translateY(18px);background:rgba(26,26,26,.95);color:#fff;font-size:12.5px;padding:10px 15px;border-radius:10px;box-shadow:0 10px 30px rgba(0,0,0,.4);display:flex;align-items:center;gap:9px;opacity:0;pointer-events:none;transition:.2s;z-index:1200;font-family:'Baloo 2'}\n.lm-root .toast.show{opacity:1;transform:translateX(-50%) translateY(0)}\n.lm-root .toast svg{width:14px;height:14px;color:var(--accent-tint)}\n.lm-root .caption{color:#CFCFCF;font-size:13px;margin:16px auto 0;text-align:center;max-width:1240px;font-family:'Nunito'}\n.lm-root .caption b{color:#fff}\n.lm-root .flash{animation:flashpulse 1s ease}\n@keyframes flashpulse{0%{box-shadow:0 0 0 0 rgba(107,60,114,.5)}100%{box-shadow:0 0 0 12px rgba(107,60,114,0)}}\n.lm-root .flowpulse{stroke-dasharray:1 12;animation:flowmove 1.3s linear infinite}\n@keyframes flowmove{to{stroke-dashoffset:-13}}\n.lm-root /* ===== audience-creation flow overlay ===== */\n  .flow{position:absolute;inset:0;z-index:2000;background:var(--bg);display:flex;transition:opacity .5s ease}\n.lm-root .flow.done{opacity:0;pointer-events:none}\n.lm-root .fnav{width:56px;flex:0 0 56px;background:#fff;border-right:1px solid var(--border);display:flex;flex-direction:column;align-items:center;padding:12px 0;gap:6px}\n.lm-root .fnav .logo{width:32px;height:32px;border-radius:9px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'Baloo 2';font-weight:700;margin-bottom:8px}\n.lm-root .fnav .nic{width:34px;height:34px;border-radius:9px;display:flex;align-items:center;justify-content:center;color:var(--text-faint)}\n.lm-root .fnav .nic.on{background:var(--accent-soft);color:var(--accent)}\n.lm-root .fnav svg{width:18px;height:18px}\n.lm-root .fchat{width:440px;flex:0 0 440px;background:#fff;border-right:1px solid var(--border);display:flex;flex-direction:column;min-height:0}\n.lm-root .fc-head{padding:14px 18px;border-bottom:1px solid var(--border);font-family:'Baloo 2'}\n.lm-root .fc-head b{font-size:15px;font-weight:700}\n.lm-root .fc-head span{font-size:12px;color:var(--text-faint);margin-left:6px}\n.lm-root .fc-body{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:13px}\n.lm-root .f-ai{font-size:14px;color:var(--text);line-height:1.55}\n.lm-root .f-ai b{font-family:'Baloo 2';font-size:17px;font-weight:700;color:var(--accent-deep);display:block;margin-bottom:6px}\n.lm-root .f-starters{display:flex;flex-direction:column;gap:9px}\n.lm-root .f-start{display:flex;align-items:center;gap:12px;border:1px solid var(--border);border-radius:12px;padding:11px 13px;cursor:pointer;transition:.12s}\n.lm-root .f-start:hover{border-color:var(--accent-tint);background:var(--panel-soft)}\n.lm-root .f-start .si{width:34px;height:34px;border-radius:9px;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;flex:0 0 34px}\n.lm-root .f-start .si svg{width:17px;height:17px}\n.lm-root .f-start .st{font-size:13px;font-weight:600;font-family:'Baloo 2'}\n.lm-root .f-start .ss{font-size:11.5px;color:var(--text-faint)}\n.lm-root .f-div{font-size:10px;color:var(--text-faint);text-align:center;font-family:'Baloo 2';text-transform:uppercase;letter-spacing:.07em;margin:2px 0}\n.lm-root .f-chips{display:flex;flex-wrap:wrap;gap:8px}\n.lm-root .f-chip{font-size:12px;color:var(--accent);background:var(--accent-soft);border:1px solid var(--accent-tint);border-radius:999px;padding:7px 12px;cursor:pointer;font-family:'Baloo 2'}\n.lm-root .f-chip:hover{background:#e9dcff}\n.lm-root .f-user{align-self:flex-end;background:var(--accent);color:#fff;border-radius:14px 14px 4px 14px;padding:9px 13px;font-size:13px;max-width:88%}\n.lm-root .f-reason{display:flex;align-items:flex-start;gap:8px;font-size:12px;color:var(--text-faint);background:var(--panel-soft);border:1px solid var(--border);border-radius:10px;padding:8px 11px;font-family:'Baloo 2';line-height:1.45}\n.lm-root .f-qhead{font-family:'Baloo 2';font-size:15px;font-weight:700;color:var(--text);line-height:1.4}\n.lm-root .f-clar{border:1px solid var(--accent-tint);background:linear-gradient(180deg,#FCFAFF,#F6EFFF);border-radius:14px;overflow:hidden}\n.lm-root .f-clar-top{display:flex;align-items:center;gap:10px;padding:10px 14px;border-bottom:1px solid var(--accent-tint)}\n.lm-root .f-prog{display:flex;gap:5px}\n.lm-root .f-prog i{width:22px;height:4px;border-radius:999px;background:var(--accent-tint)}\n.lm-root .f-prog i.cur{background:var(--accent)}\n.lm-root .f-qn{font-size:11px;color:var(--accent);font-family:'Baloo 2';font-weight:600}\n.lm-root .f-clar-body{padding:12px 14px}\n.lm-root .f-cchips{display:flex;flex-wrap:wrap;gap:7px;margin-bottom:11px}\n.lm-root .f-cchip{font-size:12px;border:1px solid var(--border);border-radius:999px;padding:6px 11px;cursor:pointer;color:var(--text-muted);background:#fff;font-family:'Baloo 2'}\n.lm-root .f-cchip.on{background:var(--accent-soft);border-color:var(--accent-tint);color:var(--accent);font-weight:600}\n.lm-root .f-clar-in{display:flex;align-items:center;gap:8px;border-top:1px solid var(--accent-tint);padding-top:11px}\n.lm-root .f-fake{flex:1;font-size:12px;color:var(--text-faint)}\n.lm-root .f-next{display:inline-flex;align-items:center;gap:6px;background:var(--accent);color:#fff;border:none;border-radius:9px;padding:8px 14px;font-family:'Baloo 2';font-weight:600;font-size:12.5px;cursor:pointer}\n.lm-root .f-next svg{width:13px;height:13px}\n.lm-root .fc-composer{padding:12px 16px;border-top:1px solid var(--border)}\n.lm-root .fc-composer .box{display:flex;align-items:center;gap:8px;border:1px solid var(--border);border-radius:12px;padding:9px 8px 9px 13px;background:var(--panel-soft);font-size:13px}\n.lm-root .fc-composer .box .sp{flex:1;color:var(--text-faint)}\n.lm-root .fc-composer .box .snd{width:30px;height:30px;border-radius:8px;background:var(--accent);color:#fff;display:flex;align-items:center;justify-content:center}\n.lm-root .fc-composer .snd svg{width:15px;height:15px}\n.lm-root .frail{flex:1;min-width:0;background:var(--panel-soft);padding:20px 22px;overflow-y:auto;display:flex;flex-direction:column}\n.lm-root .frt{font-family:'Baloo 2';font-weight:700;font-size:16px}\n.lm-root .frs{font-size:12px;color:var(--text-faint);margin-bottom:16px}\n.lm-root .fr-sec{margin-bottom:18px}\n.lm-root .fr-h{font-size:10px;letter-spacing:.07em;text-transform:uppercase;color:var(--text-faint);margin-bottom:8px;font-family:'Baloo 2'}\n.lm-root .fr-card{display:flex;align-items:center;gap:11px;background:#fff;border:1px solid var(--border);border-radius:12px;padding:11px 13px;margin-bottom:8px}\n.lm-root .fr-card.ph{border-style:dashed}\n.lm-root .fr-card .fi{width:34px;height:34px;border-radius:9px;background:var(--accent-soft);color:var(--accent);display:flex;align-items:center;justify-content:center;flex:0 0 34px}\n.lm-root .fr-card.ph .fi{background:var(--bg);color:var(--text-faint)}\n.lm-root .fr-card .fi svg{width:17px;height:17px}\n.lm-root .fr-n{font-size:13px;font-weight:600;font-family:'Baloo 2'}\n.lm-root .fr-m{font-size:11px;color:var(--text-faint)}\n.lm-root .fr-card.building{border-color:var(--accent-tint)}\n.lm-root .fr-spin{margin-left:auto;width:16px;height:16px;border:2px solid var(--accent-tint);border-top-color:var(--accent);border-radius:50%;animation:fspin .7s linear infinite;flex:0 0 16px}\n@keyframes fspin{to{transform:rotate(360deg)}}\n.lm-root .fr-view{margin-top:auto;width:100%;background:var(--accent);color:#fff;border:none;border-radius:12px;padding:14px;font-family:'Baloo 2';font-weight:700;font-size:14px;cursor:pointer;display:none;align-items:center;justify-content:center;gap:8px;box-shadow:0 8px 22px rgba(107,60,114,.32)}\n.lm-root .fr-view.show{display:flex}\n.lm-root .fr-view svg{width:16px;height:16px}\n/* mount overrides */\n.lm-root{width:100%;height:100%;position:relative;font-family:'Nunito',sans-serif;color:#1A1A1A;background:#e9edf0;opacity:0;transition:opacity .4s ease}\n.lm-root.lm-open{opacity:1}\n.lm-root .stage{position:absolute;inset:0;flex:none}\n";
  var HTML = "<div class=\"stage\">\n    <div id=\"map\"></div>\n\n    <div class=\"mfloat filterbar\" id=\"filterbar\">\n      <span class=\"fbtn\" data-pop=\"pTime\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/></svg>Time</span>\n      <span class=\"fbtn\" data-pop=\"pFreq\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 19V5M4 19h16\"/><rect x=\"7\" y=\"11\" width=\"3\" height=\"8\"/><rect x=\"12\" y=\"7\" width=\"3\" height=\"12\"/><rect x=\"17\" y=\"13\" width=\"3\" height=\"6\"/></svg>Frequency</span>\n      <span class=\"fbtn\" data-pop=\"pDemo\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"9\" cy=\"8\" r=\"3\"/><path d=\"M3 20a6 6 0 0112 0\"/><circle cx=\"17\" cy=\"9\" r=\"2.2\"/></svg>Demographics</span>\n    </div>\n\n    <div class=\"mfloat audpanel\" id=\"audPanel\">\n      <div class=\"ap-h\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"9\" cy=\"8\" r=\"3\"/><path d=\"M3 20a6 6 0 0112 0\"/><circle cx=\"17\" cy=\"9\" r=\"2.2\"/><path d=\"M15.5 20a5 5 0 016.5-4.3\"/></svg>Audiences<span class=\"ap-all\" id=\"apAll\">All</span><span class=\"p-chev\" data-collapse=\"audPanel\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg></span></div>\n      <div id=\"apList\"></div>\n    </div>\n\n    <div class=\"pop\" id=\"pTime\" style=\"left:262px\">\n      <div class=\"pop-h\" id=\"timeTitle\">Residential density</div>\n      <div class=\"pop-sub\">Signal &amp; when this audience is active</div>\n      <div class=\"tlab\">Signal</div>\n      <div class=\"sigseg\" id=\"sigSeg\">\n        <span class=\"on\" data-sig=\"Residential\">Residential</span>\n        <span data-sig=\"Daytime\">Daytime</span>\n        <span data-sig=\"Transaction\">Transaction</span>\n      </div>\n      <div class=\"tlab\">When</div>\n      <div class=\"pop-opt on\" data-day=\"all\"><span class=\"rd\"></span>Any day</div>\n      <div class=\"pop-opt\" data-day=\"weekday\"><span class=\"rd\"></span>Weekdays</div>\n      <div class=\"pop-opt\" data-day=\"weekend\"><span class=\"rd\"></span>Weekends</div>\n      <div class=\"hourwrap\">\n        <div class=\"hourlab\"><span>Hour of day</span><span id=\"hourReadout\">All day</span></div>\n        <div class=\"hourbar\" id=\"hourbar\"></div>\n      </div>\n      <div class=\"hourlab\" style=\"margin-top:12px\"><span>Months of year</span><span id=\"moReadout\">All year</span></div>\n      <div class=\"months\" id=\"months\"></div>\n      <button class=\"pop-apply\" data-apply=\"pTime\">Apply time filter</button>\n    </div>\n\n    <div class=\"pop\" id=\"pFreq\" style=\"left:342px\">\n      <div class=\"pop-h\">Visitation frequency</div>\n      <div class=\"pop-sub\">How often do they show up?</div>\n      <div class=\"pop-opt on\" data-freq=\"any\"><span class=\"rd\"></span>Any frequency</div>\n      <div class=\"pop-opt\" data-freq=\"one\"><span class=\"rd\"></span>One-time visitors</div>\n      <div class=\"pop-opt\" data-freq=\"occasional\"><span class=\"rd\"></span>Occasional · 2–4× / month</div>\n      <div class=\"pop-opt\" data-freq=\"regular\"><span class=\"rd\"></span>Regulars · weekly+</div>\n      <div class=\"pop-opt\" data-freq=\"loyal\"><span class=\"rd\"></span>Loyalists · near-daily</div>\n      <button class=\"pop-apply\" data-apply=\"pFreq\">Apply frequency</button>\n    </div>\n\n    <div class=\"pop\" id=\"pDemo\" style=\"left:460px;width:300px\">\n      <div class=\"pop-h\">Demographics</div>\n      <div class=\"pop-sub\" id=\"demoSub\">Ranges show the min–max for the selected audience</div>\n      <div id=\"demoRanges\"></div>\n      <div class=\"demo-sep\"></div>\n      <div class=\"tlab\">Attributes</div>\n      <div class=\"pop-opt\" data-demo=\"Owns a car\"><span class=\"ck\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"><path d=\"M5 12l5 5L20 6\"/></svg></span>Owns a car</div>\n      <div class=\"pop-opt\" data-demo=\"Heavy music streamer\"><span class=\"ck\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"><path d=\"M5 12l5 5L20 6\"/></svg></span>Heavy music streamer</div>\n      <div class=\"pop-opt\" data-demo=\"University educated\"><span class=\"ck\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"><path d=\"M5 12l5 5L20 6\"/></svg></span>University educated</div>\n      <div class=\"pop-opt\" data-demo=\"Has children\"><span class=\"ck\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\"><path d=\"M5 12l5 5L20 6\"/></svg></span>Has children</div>\n      <div class=\"pop-opt\" data-demo=\"+ custom trait\" style=\"color:var(--accent)\"><span class=\"ck\" style=\"border-style:dashed\"></span>+ Add custom characteristic…</div>\n      <button class=\"pop-apply\" data-apply=\"pDemo\">Apply demographics</button>\n    </div>\n\n    <div class=\"mfloat layers\" id=\"layers\">\n      <div class=\"panel-h\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M12 2l9 5-9 5-9-5 9-5z\"/><path d=\"M3 12l9 5 9-5\"/><path d=\"M3 17l9 5 9-5\"/></svg>Layers<span class=\"p-chev\" data-collapse=\"layers\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 9l6 6 6-6\"/></svg></span></div>\n\n      <div class=\"lyr on\" data-layer=\"density\" style=\"--lc:var(--l-density)\">\n        <div class=\"lyr-main\">\n          <span class=\"lyr-eye\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12l5 5L20 6\"/></svg></span>\n          <div class=\"lyr-body\"><div class=\"lyr-name\">Density · index</div><div class=\"lyr-sub\">Presence choropleth · zoom-aware</div></div>\n        </div>\n      </div>\n\n      <div class=\"lyr off\" data-layer=\"poi\" style=\"--lc:var(--l-poi)\">\n        <div class=\"lyr-main\">\n          <span class=\"lyr-eye\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12l5 5L20 6\"/></svg></span>\n          <div class=\"lyr-body\"><div class=\"lyr-name\">Points of interest</div><div class=\"lyr-sub\">Places this audience visits</div></div>\n        </div>\n      </div>\n\n      <div class=\"lyr off\" data-layer=\"media\" style=\"--lc:var(--l-media)\">\n        <div class=\"lyr-main\">\n          <span class=\"lyr-eye\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12l5 5L20 6\"/></svg></span>\n          <div class=\"lyr-body\"><div class=\"lyr-name\">Preferred media</div><div class=\"lyr-sub\">OOH they pass · billboards, transit</div></div>\n        </div>\n      </div>\n\n      <div class=\"lyr off\" data-layer=\"movement\" style=\"--lc:var(--l-move)\">\n        <div class=\"lyr-main\">\n          <span class=\"lyr-eye\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"3\" stroke-linecap=\"round\" stroke-linejoin=\"round\"><path d=\"M5 12l5 5L20 6\"/></svg></span>\n          <div class=\"lyr-body\"><div class=\"lyr-name\">Movement · corridors</div><div class=\"lyr-sub\">Routine home → work flows</div></div>\n        </div>\n      </div>\n    </div>\n\n    <div class=\"mfloat zoomer\">\n      <div class=\"zbtn\" id=\"zoomIn\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\"><path d=\"M12 5v14M5 12h14\"/></svg></div>\n      <div class=\"zbtn\" id=\"zoomOut\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.2\"><path d=\"M5 12h14\"/></svg></div>\n      <div class=\"zbtn\" id=\"mapFull\" title=\"Full screen map\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5\"/></svg></div>\n    </div>\n\n    <!-- time-of-day scrubber -->\n    <div class=\"mfloat timescale\" id=\"timescale\">\n      <div class=\"ts-top\">\n        <div class=\"ts-time\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 7v5l3 2\"/></svg><b id=\"tsHour\">8:00 AM</b> · <span id=\"tsPhase\">home · residential</span></div>\n        <div class=\"ts-aud\">Applied to: <b id=\"tsAud\">All 3 audiences</b></div>\n      </div>\n      <div class=\"ts-track\">\n        <div class=\"ts-hist\" id=\"tsHist\"></div>\n        <input type=\"range\" min=\"0\" max=\"23\" value=\"8\" id=\"tsRange\" class=\"ts-range\">\n        <div class=\"ts-labels\"><span>12a</span><span>6a</span><span>12p</span><span>6p</span><span>11p</span></div>\n      </div>\n    </div>\n\n    <!-- index info card -->\n    <div class=\"infocard\" id=\"infocard\">\n      <div class=\"ic-head\">\n        <div class=\"ic-ring\">\n          <svg width=\"52\" height=\"52\" viewBox=\"0 0 52 52\"><circle cx=\"26\" cy=\"26\" r=\"22\" fill=\"none\" stroke=\"#EFEAF1\" stroke-width=\"4\"/><circle id=\"icArc\" cx=\"26\" cy=\"26\" r=\"22\" fill=\"none\" stroke=\"var(--accent)\" stroke-width=\"4\" stroke-linecap=\"round\" stroke-dasharray=\"138\" stroke-dashoffset=\"40\"/></svg>\n          <div class=\"num\" id=\"icScore\">148</div>\n        </div>\n        <div>\n          <div class=\"ic-name\" id=\"icName\">Tampines · Pasir Ris</div>\n          <div class=\"ic-sub\" id=\"icSub\">Index vs national · this audience</div>\n        </div>\n        <div class=\"ic-x\" id=\"icClose\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2.4\"><path d=\"M6 6l12 12M18 6L6 18\"/></svg></div>\n      </div>\n      <div class=\"ic-grid3\">\n        <div class=\"st\"><div class=\"st-lab\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"9\" cy=\"8\" r=\"3\"/><path d=\"M3 20a6 6 0 0112 0\"/><circle cx=\"17\" cy=\"9\" r=\"2.2\"/></svg>Audience here</div><div class=\"st-val\" id=\"icHere\">46,000</div><span class=\"est\">Est.</span></div>\n        <div class=\"st\"><div class=\"st-lab\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><circle cx=\"12\" cy=\"12\" r=\"9\"/><path d=\"M12 3v9l7.5 4.3\"/></svg>Share of audience</div><div class=\"st-val\" id=\"icShare\">16%</div></div>\n        <div class=\"st\"><div class=\"st-lab\"><svg viewBox=\"0 0 24 24\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"><path d=\"M4 19V5M4 19h16M8 16v-5M13 16V8M18 16v-9\"/></svg>Region rank</div><div class=\"st-val\" id=\"icRank\">#2<small> of 7</small></div></div>\n      </div>\n      <div class=\"ic-foot\"><span class=\"ic-dot\" id=\"icDot\"></span><span id=\"icFoot\">Strongest segment · <b>Premium Sedan</b> · 12 points of interest here</span></div>\n    </div>\n\n    <div class=\"toast\" id=\"toast\"><svg viewBox=\"0 0 24 24\" fill=\"currentColor\"><path d=\"M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2z\"/></svg><span id=\"toastMsg\"></span></div>\n  </div>";
  var FONTS = "https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap";
  var injected = false;
  function injectOnce(){
    if (injected) return; injected = true;
    try { var lk=document.createElement('link'); lk.rel='stylesheet'; lk.href=FONTS; document.head.appendChild(lk); } catch(e){}
    var st=document.createElement('style'); st.setAttribute('data-lumosmap',''); st.textContent=CSS; document.head.appendChild(st);
  }

  global.LumosMap = {
    mount: function (hostArg, opts) {
      opts = opts || {};
      var host = typeof hostArg === 'string' ? document.querySelector(hostArg) : hostArg;
      if (!host) throw new Error('LumosMap.mount: host element not found');
      injectOnce();
      host.classList.add('lm-root');
      host.innerHTML = HTML;
      if(opts.poiLabel){ var _pl=host.querySelector('.lyr[data-layer=poi] .lyr-name'); if(_pl)_pl.textContent=opts.poiLabel; }
      if(opts.poiSub){ var _ps=host.querySelector('.lyr[data-layer=poi] .lyr-sub'); if(_ps)_ps.textContent=opts.poiSub; }

      var AUD_IDS = ['sedan','ev','suv'];
      var currentMode = 'all';
      var suppressCb = false;


  var map, regionLayer, buildingLayer;
  var groups={poi:null,media:null,movement:null};
  var state={ layers:{density:true,poi:false,media:false,movement:false}, mv:'flow', densityOp:0.60, signal:'Residential', hour:8, auds:['sedan','ev','suv'], filters:{time:null,freq:null,demo:[]} };

  // suggested audiences + how each weights the map
  var AUDIENCES=[
    {id:'sedan',name:'Premium Sedan Intenders',people:'284k'},
    {id:'ev',name:'EV Upgrade Shoppers',people:'218k'},
    {id:'suv',name:'Family SUV Upgraders',people:'462k'}
  ];
  var AUD_W={
    sedan:{Central:1.8,'Ang Mo Kio':1.15,Bishan:1.2,def:0.72},
    ev:{Central:1.6,'one-north':1.4,Jurong:1.15,def:0.82},
    suv:{Punggol:1.5,Woodlands:1.4,Jurong:1.25,Tampines:1.2,def:0.85}
  };
  // numeric demographics — bounds are audience-specific (min/max for the selected audiences)
  function fmtK(v){ return '$'+v+'k'; } function fmtAge(v){ return ''+v; } function fmtKm(v){ return v+'km'; }
  var RANGE_DEMOS=[
    {key:'age',    label:'Age',               fmt:fmtAge, absolute:[21,70],  bounds:{sedan:[28,52],ev:[30,55],suv:[30,50]}},
    {key:'income', label:'Household income',  fmt:fmtK,   absolute:[40,400], bounds:{sedan:[120,320],ev:[100,260],suv:[90,200]}},
    {key:'commute',label:'Commute distance',  fmt:fmtKm,  absolute:[0,60],   bounds:{sedan:[8,42],ev:[6,38],suv:[10,50]}}
  ];
  var RANGE_FMT={};
  function audBounds(d){ var lo=Infinity,hi=-Infinity; (state.auds.length?state.auds:['suv']).forEach(function(id){ var b=d.bounds[id]; if(b){ lo=Math.min(lo,b[0]); hi=Math.max(hi,b[1]); } }); if(lo===Infinity){ lo=d.absolute[0]; hi=d.absolute[1]; } return [lo,hi]; }
  function kwMul(m,name){ for(var k in m){ if(k!=='def'&&name.indexOf(k)>=0) return m[k]; } return m.def; }
  function audMul(name){ var ids=state.auds; if(!ids.length) return 1; var s=0; ids.forEach(function(id){ s+=kwMul(AUD_W[id],name); }); return s/ids.length; }
  function sigMul(name){ var s=state.signal;
    if(s==='Daytime') return /Central/.test(name)?1.7:(/Jurong|one-north/.test(name)?1.2:0.68);
    if(s==='Transaction') return /Central|Tampines/.test(name)?1.32:0.95;
    return /Central/.test(name)?0.5:1; }
  function eff(rg){ return rg.score*sigMul(rg.name)*audMul(rg.name); }
  function audPeopleTotal(){ var t=0; state.auds.forEach(function(id){ var a=AUDIENCES.filter(function(x){return x.id===id;})[0]; if(a) t+=parseInt(a.people)*(/k/.test(a.people)?1000:1); }); return t; }
  var AUD_COLORS={sedan:'#C07A2E', ev:'#7A4C82', suv:'#2F8F63'};
  function domAud(rg){ var best=null; state.auds.forEach(function(id){ var v=rg.score*sigMul(rg.name)*kwMul(AUD_W[id],rg.name); if(!best||v>best.val) best={id:id,val:v}; }); return best||{id:state.auds[0]||'suv',val:rg.score}; }
  function audColor(rg){ return AUD_COLORS[domAud(rg).id]||'#7A4C82'; }
  var FILLOP=[0.14,0.24,0.36,0.5,0.62];

  // ---------- data ----------
  var HOMES=[
    {name:'Tampines',lat:1.3536,lng:103.9450},{name:'Bedok',lat:1.3240,lng:103.9300},
    {name:'Woodlands',lat:1.4360,lng:103.7865},{name:'Jurong West',lat:1.3520,lng:103.7070},
    {name:'Ang Mo Kio',lat:1.3690,lng:103.8460},{name:'Hougang',lat:1.3710,lng:103.8920},
    {name:'Punggol',lat:1.4050,lng:103.9020}
  ];
  // stepped index regions (choropleth)
  var REGIONS=[
    {name:'Tampines · Pasir Ris', c:[1.3560,103.945], r:0.030, score:148, reach:230000, target:96000,  freq:5.6, pop:265000},
    {name:'Bedok · East Coast',   c:[1.3230,103.930], r:0.026, score:132, reach:180000, target:74000,  freq:4.9, pop:220000},
    {name:'Ang Mo Kio · Bishan',  c:[1.3700,103.845], r:0.026, score:141, reach:150000, target:63000,  freq:5.2, pop:190000},
    {name:'Serangoon · Hougang',  c:[1.3720,103.892], r:0.024, score:127, reach:120000, target:47000,  freq:4.5, pop:165000},
    {name:'Woodlands · North',    c:[1.4360,103.786], r:0.031, score:116, reach:110000, target:38000,  freq:4.1, pop:250000},
    {name:'Jurong · West',        c:[1.3450,103.720], r:0.033, score:108, reach:95000,  target:30000,  freq:3.8, pop:240000},
    {name:'Central · CBD',        c:[1.2900,103.845], r:0.023, score:156, reach:120000, target:70000,  freq:6.4, pop:120000}
  ];
  // realistic volumes — flagships get the detailed marker, the bulk render as small category dots
  var rrG=rng(41); function jit(a){ return (rrG()-0.5)*a; }
  var RETAIL=[
    {n:'Orchard',c:[1.3040,103.8320]},{n:'Somerset',c:[1.3010,103.8385]},{n:'Bugis',c:[1.2996,103.8550]},
    {n:'Tampines',c:[1.3536,103.9450]},{n:'Jurong East',c:[1.3330,103.7425]},{n:'HarbourFront',c:[1.2646,103.8220]},
    {n:'Serangoon',c:[1.3506,103.8720]},{n:'Ang Mo Kio',c:[1.3690,103.8480]},{n:'Bedok',c:[1.3240,103.9300]},
    {n:'Woodlands',c:[1.4360,103.7865]},{n:'Toa Payoh',c:[1.3340,103.8500]},{n:'Chinatown',c:[1.2820,103.8440]},
    {n:'Marina Bay',c:[1.2830,103.8600]},{n:'Paya Lebar',c:[1.3180,103.8930]},{n:'Clementi',c:[1.3150,103.7650]},
    {n:'Punggol',c:[1.4050,103.9020]},{n:'Yishun',c:[1.4290,103.8350]},{n:'Bishan',c:[1.3510,103.8480]}
  ];
  var STATIONS=[[1.3000,103.8380],[1.3010,103.8460],[1.2990,103.8560],[1.3210,103.8930],[1.3350,103.9640],[1.3530,103.9450],[1.3240,103.9300],[1.3690,103.8480],[1.3706,103.8492],[1.3330,103.7430],[1.3155,103.7650],[1.4360,103.7865],[1.4290,103.8350],[1.4050,103.9020],[1.2820,103.8510],[1.2790,103.8390],[1.3400,103.8470],[1.3506,103.8720],[1.2646,103.8220],[1.3180,103.8930],[1.2820,103.8440],[1.3340,103.8500]];
  var EXPWY=[
    [[1.3350,103.7000],[1.3345,103.7600],[1.3340,103.8200],[1.3330,103.8800],[1.3330,103.9400]],
    [[1.2900,103.8500],[1.3150,103.8495],[1.3450,103.8480],[1.3750,103.8465],[1.4100,103.8450]],
    [[1.2930,103.8600],[1.3050,103.9000],[1.3200,103.9300],[1.3350,103.9620]],
    [[1.2760,103.8000],[1.2900,103.7700],[1.3050,103.7500],[1.3200,103.7350]]
  ];
  function corridorScatter(wp,count){ var out=[],segs=wp.length-1; for(var i=0;i<count;i++){ var t=rrG()*segs,si=Math.floor(t),f=t-si; if(si>=segs){si=segs-1;f=1;} var a=wp[si],b=wp[si+1]; out.push([a[0]+(b[0]-a[0])*f+jit(0.004), a[1]+(b[1]-a[1])*f+jit(0.004)]); } return out; }
  function genPOI(){
    var arr=[{name:'BMW Eurokars (Orchard)',lat:1.3040,lng:103.8320,v:'Top showroom · 31% visit',kind:'mall',top:true},{name:'Mercedes-Benz (Tampines)',lat:1.3536,lng:103.9450,v:'27% visit',kind:'mall',top:true}];
    [['Audi Centre (VivoCity)',1.2646,103.8220,'22%'],['Lexus (Bugis)',1.2996,103.8550,'19%'],['Volvo (Serangoon)',1.3506,103.8720,'14%'],['Tesla (Changi)',1.3601,103.9890,'11%'],['Toyota (Bishan)',1.3510,103.8480,'12%'],['Porsche (Somerset)',1.3010,103.8380,'17%'],['Land Rover (Central)',1.3009,103.8455,'13%'],['Hyundai (Jurong)',1.3330,103.7430,'12%']].forEach(function(m){ arr.push({name:m[0],lat:m[1],lng:m[2],v:m[3]+' visit',kind:'mall'}); });
    var K=[['Brand showroom','store'],['Multi-brand dealer','store'],['Used-car lot','store'],['Service centre','store'],['EV charging hub','food'],['Test-drive centre','store']];
    RETAIL.forEach(function(c){ var n=5+Math.floor(rrG()*6); for(var i=0;i<n;i++){ var k=K[Math.floor(rrG()*K.length)]; arr.push({name:k[0]+' · '+c.n,lat:c.c[0]+jit(0.015),lng:c.c[1]+jit(0.017),kind:k[1],v:(3+Math.floor(rrG()*22))+'% visit'}); } });
    return arr;
  }
  function genMedia(){
    var arr=[{name:'Orchard Rd — digital billboard',lat:1.3040,lng:103.8360,v:'Index 168 · 2.4M impressions/wk',kind:'screen',top:true}];
    RETAIL.forEach(function(c){ var n=1+Math.floor(rrG()*3); for(var i=0;i<n;i++){ arr.push({name:'Mall screen · '+c.n,lat:c.c[0]+jit(0.012),lng:c.c[1]+jit(0.014),kind:'screen',v:'Index '+(110+Math.floor(rrG()*70))}); } });
    STATIONS.forEach(function(s){ var n=1+Math.floor(rrG()*2); for(var i=0;i<n;i++){ arr.push({name:'Transit media',lat:s[0]+jit(0.004),lng:s[1]+jit(0.004),kind:'transit',v:'Index '+(105+Math.floor(rrG()*60))}); } });
    EXPWY.forEach(function(wp){ corridorScatter(wp,10+Math.floor(rrG()*8)).forEach(function(p){ arr.push({name:'Expressway billboard',lat:p[0],lng:p[1],kind:'billboard',v:'Index '+(100+Math.floor(rrG()*55))}); }); });
    return arr;
  }
  var POIS=genPOI(), MEDIA=genMedia();
  // routine corridors home→work (fan into the city)
  var FLOWS=[
    {name:'Tampines → CBD',         from:[1.3536,103.9450], to:[1.2830,103.8510], hub:'CBD',       pct:31},
    {name:'Ang Mo Kio → Marina',    from:[1.3690,103.8460], to:[1.2830,103.8590], hub:'Marina',    pct:19},
    {name:'Bedok → CBD',            from:[1.3240,103.9300], to:[1.2860,103.8500], hub:'CBD',       pct:15},
    {name:'Woodlands → one-north',  from:[1.4360,103.7865], to:[1.2990,103.7870], hub:'one-north', pct:13},
    {name:'Punggol → Changi BP',    from:[1.4050,103.9020], to:[1.3350,103.9640], hub:'Changi',    pct:12},
    {name:'Jurong W → Gateway',     from:[1.3520,103.7070], to:[1.3330,103.7420], hub:'Jurong',    pct:10}
  ];
  var COR=['#E11D74','#C81E7E','#A32C8E','#7C3A9C','#4E68B8','#219EBC']; // pink → teal

  // deterministic rng
  function rng(s){ return function(){ s=(s*1103515245+12345)&0x7fffffff; return s/0x7fffffff; }; }
  function fmt(n){ return n.toLocaleString('en-US'); }
  function bucket(s){ return s>=150?4 : s>=140?3 : s>=126?2 : s>=114?1 : 0; }
  var RAMP=['#EFE3F1','#D6B9DA','#B084B8','#7A4C82','#4E2A54'];
  var RAMP_BD=['#CDA9D2','#B084B8','#8A5A92','#5A2E62','#3A1D40'];

  function polyAround(lat,lng,r,seedN){
    var rr=rng(seedN), pts=[], N=10;
    for(var i=0;i<N;i++){ var a=(i/N)*Math.PI*2, rad=r*(0.70+rr()*0.6); pts.push([lat+Math.sin(a)*rad, lng+Math.cos(a)*rad]); }
    return pts;
  }
  function densityFill(){ return state.layers.movement ? Math.max(0.16, state.densityOp*0.5) : state.densityOp; }

  // ---------- markers ----------
  function divMk(cls,svg){ return L.divIcon({html:'<div class="mk '+cls+'">'+svg+'</div>',className:'',iconSize:[22,22],iconAnchor:[11,11]}); }
  var I_HOME='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M4 11l8-6 8 6"/><path d="M6 10v8h12v-8"/></svg>';
  function tip(n,s){ return '<div class="tn">'+n+'</div><div class="tm">'+s+'</div>'; }

  // mono-outline chips — Taupe (stores) & Slate (media). Shape carries the category.
  var BAG='<path d="M4 15l1.4-4.2A2 2 0 017.3 9.4h9.4a2 2 0 011.9 1.4L20 15"/><path d="M4 15h16v3H4z"/><circle cx="7.5" cy="18" r="1.2"/><circle cx="16.5" cy="18" r="1.2"/>';
  var SCREEN='<rect x="3" y="4" width="18" height="12" rx="1.5"/><path d="M8 20h8M12 16v4"/>';
  function glyphSVG(p){ return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">'+p+'</svg>'; }
  function chipIcon(cls,glyph,flag){ var sq=cls==='poi', sz=flag?(sq?28:26):(sq?22:20);
    return L.divIcon({html:'<div class="chip '+cls+(flag?' flag':'')+'">'+glyphSVG(glyph)+'</div>',className:'',iconSize:[sz,sz],iconAnchor:[sz/2,sz/2]}); }
  function poiIcon(p){ return chipIcon('poi',BAG,p.top); }
  function mediaIcon(p){ return chipIcon('media',SCREEN,p.top); }
  function buildPoi(){ var g=L.layerGroup(); POIS.forEach(function(p){ L.marker([p.lat,p.lng],{icon:poiIcon(p),riseOnHover:true}).bindTooltip(tip(p.name,p.v),{className:'aud-tip',direction:'top',offset:[0,p.top?-17:-13]}).addTo(g);}); return g; }
  function buildMedia(){ var g=L.layerGroup(); MEDIA.forEach(function(p){ L.marker([p.lat,p.lng],{icon:mediaIcon(p),riseOnHover:true}).bindTooltip(tip(p.name,p.v),{className:'aud-tip',direction:'top',offset:[0,p.top?-16:-12]}).addTo(g);}); return g; }

  function curve(a,b,bend,steps){
    steps=steps||30; var mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,dx=b[0]-a[0],dy=b[1]-a[1];
    var cx=mx-dy*bend, cy=my+dx*bend, pts=[];
    for(var i=0;i<=steps;i++){ var t=i/steps,u=1-t; pts.push([u*u*a[0]+2*u*t*cx+t*t*b[0], u*u*a[1]+2*u*t*cy+t*t*b[1]]); }
    return pts;
  }
  function mix(hex,amt){ var n=parseInt(hex.slice(1),16),r=n>>16,g=(n>>8)&255,b=n&255;
    r=Math.round(r+(255-r)*amt);g=Math.round(g+(255-g)*amt);b=Math.round(b+(255-b)*amt);
    return '#'+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1); }

  // corridors follow the real street network — geometry pre-routed (OSRM driving), baked in for reliability
  var ROUTES=[[[1.3536,103.9453],[1.3536,103.9453],[1.3536,103.9453],[1.3539,103.9456],[1.3543,103.9456],[1.3544,103.9461],[1.3543,103.9463],[1.3538,103.9463],[1.3532,103.9462],[1.3528,103.946],[1.3524,103.9457],[1.3519,103.945],[1.3517,103.9445],[1.3517,103.9442],[1.3517,103.9433],[1.3517,103.9423],[1.3516,103.9417],[1.3515,103.9416],[1.3509,103.9416],[1.3499,103.9417],[1.3485,103.9421],[1.3478,103.9422],[1.3475,103.9423],[1.347,103.9426],[1.3465,103.9429],[1.3463,103.9431],[1.3459,103.9425],[1.3455,103.942],[1.345,103.9408],[1.3448,103.9401],[1.3447,103.9392],[1.3446,103.9385],[1.3446,103.9385],[1.3441,103.9384],[1.3438,103.9383],[1.3431,103.938],[1.3412,103.9369],[1.3409,103.9368],[1.3405,103.9366],[1.3399,103.9361],[1.3389,103.9351],[1.3386,103.9347],[1.3384,103.9345],[1.3382,103.934],[1.338,103.9333],[1.3377,103.9331],[1.3366,103.9333],[1.3361,103.9334],[1.3353,103.9336],[1.335,103.9335],[1.335,103.9334],[1.335,103.9333],[1.3355,103.9295],[1.3354,103.9278],[1.3351,103.9265],[1.3349,103.9256],[1.3345,103.9244],[1.3343,103.9238],[1.3324,103.9198],[1.3311,103.9171],[1.3296,103.9139],[1.3286,103.9117],[1.3273,103.9093],[1.3269,103.9085],[1.3265,103.9071],[1.3252,103.9026],[1.325,103.9012],[1.3239,103.8958],[1.3235,103.894],[1.3231,103.8928],[1.3229,103.8922],[1.3225,103.8915],[1.3222,103.8913],[1.3217,103.8913],[1.3207,103.8915],[1.32,103.8917],[1.3195,103.8918],[1.3185,103.892],[1.3179,103.8921],[1.3169,103.8924],[1.3165,103.8924],[1.3153,103.8923],[1.3149,103.8922],[1.3143,103.8921],[1.3138,103.8921],[1.3132,103.8918],[1.3125,103.8914],[1.3122,103.8909],[1.3118,103.8891],[1.3117,103.8886],[1.3116,103.8882],[1.3114,103.8868],[1.3112,103.8858],[1.311,103.8849],[1.3107,103.8835],[1.3106,103.8828],[1.3105,103.8823],[1.3104,103.882],[1.3101,103.8808],[1.3098,103.8794],[1.3096,103.8787],[1.3091,103.8781],[1.3083,103.8775],[1.3079,103.8773],[1.3074,103.8769],[1.3071,103.8765],[1.3069,103.8761],[1.3067,103.8742],[1.3067,103.8729],[1.3063,103.8717],[1.3056,103.8707],[1.3021,103.8653],[1.3007,103.8634],[1.2997,103.8621],[1.2983,103.86],[1.2977,103.8594],[1.2968,103.8586],[1.2962,103.858],[1.2958,103.8577],[1.2949,103.8571],[1.2942,103.8567],[1.2931,103.856],[1.2918,103.8552],[1.2911,103.8549],[1.2904,103.8547],[1.2901,103.8546],[1.2897,103.8545],[1.2893,103.8544],[1.2878,103.8542],[1.2865,103.8539],[1.2863,103.8539],[1.286,103.8538],[1.2855,103.8536],[1.2842,103.8531],[1.2837,103.8529],[1.2832,103.8527],[1.2827,103.8524],[1.2823,103.8521],[1.2821,103.8519],[1.2809,103.8511],[1.2808,103.851],[1.2813,103.8502],[1.2817,103.8495],[1.2822,103.8499],[1.2826,103.8503],[1.2826,103.8508],[1.2827,103.8512],[1.2829,103.8512],[1.283,103.8511],[1.283,103.8511]],[[1.369,103.846],[1.3689,103.8456],[1.3686,103.8453],[1.3676,103.8449],[1.3671,103.8446],[1.3666,103.8442],[1.3658,103.8436],[1.3648,103.8435],[1.3646,103.8436],[1.3643,103.8437],[1.3643,103.8442],[1.3642,103.8455],[1.3642,103.8458],[1.364,103.8464],[1.3638,103.8473],[1.3634,103.8481],[1.3631,103.8487],[1.3626,103.8496],[1.3618,103.8507],[1.3609,103.8518],[1.3605,103.8523],[1.3602,103.8526],[1.3594,103.8534],[1.3587,103.8538],[1.3585,103.8539],[1.3571,103.8547],[1.3566,103.855],[1.3561,103.8556],[1.3556,103.8566],[1.3554,103.857],[1.3552,103.8571],[1.3548,103.8574],[1.3544,103.8575],[1.3533,103.8573],[1.3521,103.8575],[1.3495,103.8583],[1.3473,103.8591],[1.3458,103.8597],[1.3423,103.8609],[1.3394,103.8619],[1.3383,103.8621],[1.3371,103.8622],[1.3353,103.8623],[1.3335,103.8624],[1.3298,103.8624],[1.3287,103.8623],[1.3268,103.8615],[1.3259,103.8606],[1.3244,103.859],[1.3236,103.8582],[1.3229,103.8576],[1.3216,103.8564],[1.3205,103.8552],[1.3194,103.8535],[1.3181,103.8508],[1.317,103.8484],[1.3167,103.8478],[1.3159,103.8468],[1.3145,103.8457],[1.3143,103.8456],[1.3141,103.8455],[1.3139,103.8455],[1.3133,103.8453],[1.3124,103.8451],[1.3113,103.8449],[1.3107,103.8449],[1.3104,103.8453],[1.3101,103.8458],[1.3096,103.8463],[1.3091,103.8467],[1.3086,103.847],[1.3076,103.848],[1.307,103.8486],[1.3063,103.8494],[1.3051,103.8508],[1.305,103.8511],[1.3045,103.8518],[1.304,103.8529],[1.3035,103.854],[1.3034,103.8542],[1.3032,103.8546],[1.3032,103.8553],[1.3031,103.8556],[1.3028,103.8559],[1.3026,103.8561],[1.3024,103.8565],[1.3023,103.8567],[1.3022,103.8568],[1.3019,103.8571],[1.3017,103.8573],[1.3015,103.8576],[1.3012,103.8579],[1.3005,103.8588],[1.2998,103.8594],[1.2995,103.8596],[1.2983,103.8602],[1.2973,103.8606],[1.2969,103.8607],[1.2963,103.8607],[1.2957,103.8609],[1.2955,103.8611],[1.2953,103.8612],[1.2944,103.8616],[1.2929,103.8625],[1.2921,103.8626],[1.2906,103.8621],[1.2892,103.8618],[1.2879,103.8617],[1.2858,103.8616],[1.2838,103.8614],[1.2825,103.8611],[1.2817,103.8608],[1.2816,103.8606],[1.2816,103.8606],[1.2821,103.8598],[1.2823,103.8594],[1.2826,103.8594],[1.2827,103.8595]],[[1.3241,103.93],[1.3242,103.9309],[1.3242,103.931],[1.324,103.931],[1.3239,103.9307],[1.3238,103.9296],[1.3235,103.928],[1.3234,103.9275],[1.3234,103.9272],[1.3233,103.9265],[1.3232,103.9259],[1.3231,103.9252],[1.3226,103.9235],[1.3226,103.9233],[1.3223,103.9224],[1.3218,103.921],[1.3215,103.9202],[1.3213,103.9198],[1.3212,103.9191],[1.321,103.9185],[1.3207,103.9174],[1.3202,103.916],[1.32,103.9156],[1.3196,103.9143],[1.3195,103.9141],[1.3192,103.9133],[1.3191,103.913],[1.3191,103.9126],[1.319,103.9122],[1.3189,103.9119],[1.3189,103.9118],[1.3188,103.9115],[1.3188,103.9114],[1.3188,103.911],[1.3187,103.9105],[1.3186,103.9102],[1.3185,103.9099],[1.3185,103.9096],[1.3184,103.9094],[1.3184,103.909],[1.3183,103.9086],[1.3182,103.9083],[1.3181,103.9078],[1.3181,103.9076],[1.318,103.9073],[1.3179,103.907],[1.3179,103.9066],[1.3178,103.9059],[1.3177,103.9054],[1.3176,103.905],[1.3175,103.9044],[1.3174,103.9041],[1.3173,103.9036],[1.3172,103.9028],[1.3171,103.9024],[1.317,103.902],[1.3168,103.9009],[1.3167,103.9002],[1.3165,103.8996],[1.3164,103.8989],[1.3163,103.8986],[1.3163,103.8982],[1.3162,103.8977],[1.316,103.8969],[1.3159,103.8964],[1.3157,103.8954],[1.3156,103.8948],[1.3155,103.8942],[1.3155,103.894],[1.3153,103.8932],[1.3152,103.8926],[1.3151,103.8923],[1.3146,103.8922],[1.3141,103.8921],[1.3136,103.892],[1.3127,103.8915],[1.3123,103.8911],[1.3119,103.8893],[1.3118,103.8887],[1.3117,103.8884],[1.3114,103.887],[1.3113,103.8863],[1.3112,103.8857],[1.3108,103.8839],[1.3106,103.8831],[1.3105,103.8827],[1.3104,103.8821],[1.3103,103.8814],[1.31,103.8799],[1.3097,103.879],[1.3092,103.8782],[1.3087,103.8778],[1.3081,103.8774],[1.3075,103.877],[1.3071,103.8766],[1.307,103.8762],[1.3069,103.8755],[1.3067,103.8734],[1.3064,103.8719],[1.3057,103.8708],[1.3029,103.8665],[1.3008,103.8636],[1.2998,103.8621],[1.2985,103.8604],[1.2979,103.8596],[1.2972,103.8589],[1.2964,103.8582],[1.2959,103.8578],[1.2954,103.8574],[1.2943,103.8567],[1.2932,103.856],[1.292,103.8554],[1.2913,103.855],[1.2917,103.8547],[1.2922,103.8541],[1.2924,103.8539],[1.2927,103.8535],[1.2929,103.8531],[1.2935,103.8521],[1.293,103.8517],[1.2924,103.8513],[1.2918,103.851],[1.2913,103.8507],[1.291,103.8505],[1.2907,103.8503],[1.2901,103.85],[1.2896,103.8497],[1.2894,103.8495],[1.2888,103.8491],[1.2884,103.8489],[1.2881,103.8488],[1.288,103.8488],[1.2878,103.8489],[1.2876,103.8489],[1.2871,103.8489],[1.2866,103.849],[1.2862,103.8493],[1.2857,103.8496],[1.2856,103.8496],[1.2856,103.8497],[1.2857,103.8498]],[[1.4359,103.7865],[1.4357,103.7863],[1.4355,103.7861],[1.4355,103.7859],[1.4354,103.7855],[1.4355,103.7852],[1.4359,103.7851],[1.4354,103.7836],[1.4352,103.7833],[1.4349,103.783],[1.4344,103.7824],[1.4334,103.7815],[1.4329,103.7806],[1.4324,103.7795],[1.4323,103.7794],[1.4322,103.7785],[1.4322,103.7781],[1.4322,103.7763],[1.4322,103.7753],[1.4322,103.7738],[1.4321,103.7731],[1.4321,103.7728],[1.432,103.7721],[1.4318,103.771],[1.4315,103.7698],[1.4313,103.7696],[1.4311,103.7695],[1.4268,103.7706],[1.4244,103.7712],[1.4218,103.7714],[1.4196,103.7714],[1.4148,103.7715],[1.4125,103.7716],[1.4114,103.7717],[1.4087,103.772],[1.4055,103.7728],[1.4038,103.7733],[1.4016,103.7737],[1.3994,103.7739],[1.396,103.774],[1.3935,103.7741],[1.3907,103.7745],[1.3879,103.7748],[1.3851,103.7752],[1.383,103.7755],[1.3801,103.776],[1.3779,103.7766],[1.3765,103.777],[1.3758,103.7772],[1.3727,103.778],[1.3688,103.7791],[1.3663,103.7796],[1.3643,103.7799],[1.3625,103.7803],[1.361,103.7808],[1.3591,103.7817],[1.358,103.7825],[1.3569,103.7834],[1.3561,103.7842],[1.3555,103.785],[1.3542,103.7869],[1.3535,103.788],[1.3529,103.7888],[1.3523,103.7895],[1.3517,103.79],[1.3497,103.7914],[1.3485,103.7921],[1.3482,103.7924],[1.348,103.7927],[1.3479,103.793],[1.348,103.7934],[1.3483,103.7937],[1.3486,103.7937],[1.349,103.7936],[1.3492,103.7932],[1.3493,103.7928],[1.3493,103.7922],[1.3491,103.7915],[1.3489,103.7908],[1.3482,103.7897],[1.346,103.7886],[1.3451,103.788],[1.3448,103.7877],[1.3442,103.7866],[1.3435,103.7849],[1.3429,103.7834],[1.3425,103.7826],[1.3423,103.782],[1.3416,103.7799],[1.3409,103.779],[1.3378,103.7776],[1.3371,103.7771],[1.336,103.7761],[1.3349,103.7745],[1.3337,103.7724],[1.3325,103.7695],[1.3322,103.7684],[1.3321,103.7683],[1.332,103.7675],[1.332,103.7664],[1.3321,103.7655],[1.3321,103.7648],[1.3315,103.7644],[1.3304,103.7642],[1.3297,103.7641],[1.328,103.7641],[1.3271,103.7642],[1.3261,103.7642],[1.3256,103.7643],[1.3231,103.7643],[1.3224,103.7643],[1.3221,103.7642],[1.321,103.7639],[1.3198,103.7635],[1.3186,103.763],[1.3177,103.7624],[1.317,103.762],[1.3157,103.7611],[1.3151,103.7608],[1.3145,103.7609],[1.314,103.761],[1.3135,103.7615],[1.3127,103.7622],[1.3114,103.7634],[1.3112,103.7636],[1.3103,103.7645],[1.3089,103.7657],[1.3081,103.7663],[1.3071,103.7671],[1.3062,103.7681],[1.3055,103.769],[1.3042,103.7714],[1.3032,103.7735],[1.3014,103.7766],[1.3004,103.7783],[1.2997,103.7794],[1.2987,103.781],[1.2979,103.7824],[1.2972,103.7836],[1.2967,103.7843],[1.296,103.785],[1.2956,103.7854],[1.2957,103.7856],[1.2965,103.7857],[1.297,103.7856],[1.298,103.7854],[1.2988,103.7853],[1.2993,103.7854],[1.2994,103.7855],[1.2992,103.7859],[1.2989,103.7867],[1.2988,103.7869]],[[1.4052,103.9021],[1.4056,103.9009],[1.4059,103.9007],[1.4062,103.9002],[1.4063,103.8994],[1.4063,103.899],[1.4064,103.8984],[1.4063,103.8979],[1.4062,103.8978],[1.4057,103.8975],[1.404,103.897],[1.4034,103.8969],[1.4032,103.8968],[1.4018,103.8966],[1.4009,103.8964],[1.3999,103.8977],[1.3991,103.9],[1.3981,103.9018],[1.3962,103.9047],[1.3948,103.9064],[1.3931,103.9082],[1.3913,103.9097],[1.3903,103.9106],[1.3876,103.9129],[1.3858,103.9145],[1.3843,103.9158],[1.3826,103.9174],[1.3816,103.9184],[1.3802,103.9201],[1.3798,103.9207],[1.3788,103.923],[1.3781,103.9255],[1.3773,103.9285],[1.3768,103.9299],[1.3749,103.934],[1.3741,103.9356],[1.3733,103.9371],[1.3718,103.9398],[1.371,103.9411],[1.3691,103.9432],[1.3682,103.9444],[1.3674,103.946],[1.3668,103.9482],[1.366,103.9518],[1.3654,103.9539],[1.3649,103.9555],[1.3642,103.957],[1.3632,103.9584],[1.3621,103.9597],[1.3605,103.9611],[1.3592,103.9619],[1.3581,103.9625],[1.3552,103.9635],[1.3552,103.9636],[1.3539,103.9641],[1.3533,103.9643],[1.353,103.9644],[1.3528,103.9644],[1.3525,103.9644],[1.3519,103.9644],[1.3512,103.9643],[1.3505,103.9642],[1.3487,103.9637],[1.348,103.9634],[1.3468,103.9631],[1.3458,103.9628],[1.3454,103.9627],[1.3448,103.9625],[1.344,103.9622],[1.3432,103.962],[1.3422,103.9617],[1.3414,103.9615],[1.3405,103.9612],[1.34,103.9612],[1.3398,103.9614],[1.3397,103.9622],[1.3397,103.9628],[1.3398,103.964],[1.3395,103.9646],[1.3393,103.9649],[1.3386,103.9657],[1.3382,103.9661],[1.3379,103.9666],[1.3375,103.967],[1.337,103.9667],[1.3362,103.9662],[1.3358,103.966],[1.3355,103.9659],[1.3351,103.9659],[1.3348,103.9659],[1.3346,103.9658],[1.3344,103.9655],[1.3344,103.965],[1.3345,103.9647],[1.3348,103.9645],[1.3351,103.9644],[1.335,103.9643],[1.3349,103.9643],[1.3349,103.9643],[1.3349,103.9642],[1.335,103.9642]],[[1.3525,103.7077],[1.3516,103.7083],[1.3508,103.7088],[1.3507,103.7089],[1.3505,103.7091],[1.3502,103.7094],[1.3506,103.7102],[1.3515,103.7114],[1.3518,103.7119],[1.3516,103.7121],[1.3504,103.713],[1.3501,103.7132],[1.3495,103.7138],[1.3489,103.7144],[1.3487,103.7146],[1.3481,103.7151],[1.3474,103.7155],[1.3465,103.7158],[1.3459,103.716],[1.3454,103.7162],[1.345,103.7163],[1.3447,103.7163],[1.344,103.7163],[1.3439,103.7163],[1.3434,103.7169],[1.3434,103.7171],[1.3448,103.7209],[1.3449,103.7213],[1.3449,103.7216],[1.345,103.7219],[1.3451,103.7225],[1.3451,103.724],[1.3449,103.7252],[1.3446,103.7261],[1.3445,103.7268],[1.3444,103.7275],[1.3444,103.7284],[1.3444,103.7289],[1.3443,103.7297],[1.3442,103.7301],[1.3439,103.7309],[1.3428,103.7326],[1.3417,103.7342],[1.3412,103.7349],[1.3408,103.7349],[1.3403,103.7345],[1.3396,103.7342],[1.3391,103.7341],[1.3385,103.7341],[1.3379,103.7342],[1.3373,103.7345],[1.3367,103.7348],[1.3361,103.7351],[1.3351,103.736],[1.3343,103.7367],[1.3338,103.7373],[1.3334,103.7377],[1.3333,103.7379],[1.3327,103.7387],[1.3323,103.7393],[1.3318,103.74],[1.3316,103.7403],[1.3313,103.7409],[1.3318,103.7414],[1.3321,103.7417],[1.3319,103.7421],[1.3318,103.7424],[1.3318,103.7428],[1.3322,103.7432],[1.3327,103.7437],[1.3331,103.7438],[1.3328,103.7435],[1.3333,103.7427]]];
  function buildMovement(style){
    var g=L.layerGroup();
    FLOWS.forEach(function(f,i){
      var col=COR[i], w=2+f.pct*0.30;
      if(style==='flow'){
        var pts=ROUTES[i]||curve(f.from,f.to,0.15,34);
        L.polyline(pts,{color:col,weight:w+6,opacity:0.14,lineCap:'round'}).addTo(g);           // soft glow
        L.polyline(pts,{color:col,weight:w,opacity:0.95,lineCap:'round',lineJoin:'round'})       // uniform corridor colour
          .bindTooltip(tip(f.name,f.pct+'% of daily commute volume'),{className:'aud-tip',sticky:true}).addTo(g);
        L.polyline(pts,{color:'#fff',weight:1.4,opacity:0.85,lineCap:'round',className:'flowpulse'}).addTo(g); // animated direction pulse
      } else if(style==='arc'){
        var pa=curve(f.from,f.to,0.30,30);
        L.polyline(pa,{color:col,weight:w,opacity:0.78,lineCap:'round'})
          .bindTooltip(tip(f.name,f.pct+'% volume'),{className:'aud-tip',sticky:true}).addTo(g);
      } else {
        var base=curve(f.from,f.to,0.08,26), pr=base.map(function(p,k){ return [p[0]+(k%2?0.0013:-0.0013)*Math.sin(k)*0.4,p[1]]; });
        L.polyline(pr,{color:'#fff',weight:w+4,opacity:0.9,lineCap:'round',lineJoin:'round'}).addTo(g);
        L.polyline(pr,{color:col,weight:w,opacity:0.95,lineCap:'round',lineJoin:'round'})
          .bindTooltip(tip(f.name,'Routine corridor · '+f.pct+'% volume'),{className:'aud-tip',sticky:true}).addTo(g);
      }
      // origin node + % label
      L.marker(f.from,{icon:L.divIcon({html:'<div class="flownode" style="--c:'+col+'"></div>',className:'',iconSize:[11,11],iconAnchor:[6,6]})}).addTo(g);
      L.marker(f.from,{icon:L.divIcon({html:'<div class="flowlab" style="--c:'+col+'">'+f.pct+'%</div>',className:'',iconSize:[1,1],iconAnchor:[-6,20]})}).addTo(g);
    });
    // destination hubs (dedup near-identical)
    var seen={};
    FLOWS.forEach(function(f){ var key=f.hub; if(seen[key])return; seen[key]=1;
      L.marker(f.to,{icon:L.divIcon({html:'<div class="hubnode"><span class="hubdot"></span><span class="hublab">'+f.hub+'</span></div>',className:'',iconSize:[1,1],iconAnchor:[8,8]})})
       .bindTooltip(tip(f.hub+' hub','Where the corridors converge'),{className:'aud-tip',direction:'top'}).addTo(g);
    });
    return g;
  }

  // ---------- density (granular dot field + faint market hulls) ----------
  function dotOp(){ return Math.min(1, densityFill()+0.28); }
  function densityDots(){
    var g=L.layerGroup(), auds=state.auds.length?state.auds:['suv'];
    var perScale=1.5/(auds.length+0.5);                    // each segment thins as more are overlaid
    auds.forEach(function(aid,ai){                          // one coloured dot field per selected audience
      var col=AUD_COLORS[aid], rr=rng(13+ai*17), off=(ai-(auds.length-1)/2)*0.00035;
      REGIONS.forEach(function(rg){
        var e=rg.score*sigMul(rg.name)*kwMul(AUD_W[aid],rg.name);
        var n=Math.max(6,Math.round((150+(e-105)*7)*perScale));
        for(var k=0;k<n;k++){
          var ang=rr()*Math.PI*2, u=rr(), rad=rg.r*Math.pow(u,0.62);
          var lat=rg.c[0]+Math.sin(ang)*rad+off, lng=rg.c[1]+Math.cos(ang)*rad+off;
          lat=Math.round(lat/0.00085)*0.00085; lng=Math.round(lng/0.00110)*0.00110;
          var v=Math.max(0.05,1-u)*(0.55+rr()*0.7);
          L.circleMarker([lat,lng],{radius:1.5+v*2.5,stroke:false,fillColor:col,fillOpacity:Math.min(1,dotOp()*(0.55+v*0.6)),interactive:false}).addTo(g);
        }
      });
    });
    return g;
  }
  function hullFill(){ return (map&&map.getZoom()>=15)?0.05:densityFill()*0.5; }   // polygons fade at building zoom
  function densityLayer(){
    var g=L.layerGroup(), hf=hullFill();
    REGIONS.forEach(function(rg,i){                      // stepped choropleth polygon (structure) + click target
      var b=bucket(eff(rg)), single=state.auds.length===1;
      var col=single?AUD_COLORS[state.auds[0]]:'#9E97A6';   // audience colour when one, neutral when overlaid
      var fo=(map&&map.getZoom()>=15)?0.04:(single?FILLOP[b]*(densityFill()/0.6):0.045);
      var bo=single?(hf<0.1?0.35:0.55):0.28;
      var hull=L.polygon(polyAround(rg.c[0],rg.c[1],rg.r,i+7),{color:col,weight:1.2,opacity:bo,fillColor:col,fillOpacity:fo});
      hull.on('mouseover',function(){ this.setStyle({weight:2.2,opacity:.85,fillOpacity:Math.min(.8,fo+0.14)}); });
      hull.on('mouseout', function(){ this.setStyle({weight:1.2,opacity:bo,fillOpacity:fo}); });
      hull.on('click', function(){ openInfoCard(rg); });
      hull.bindTooltip(tip(rg.name+' <span class="tx">'+Math.round(eff(rg))+'</span>','Aggregated index · click for detail'),{className:'aud-tip',sticky:true});
      hull.addTo(g);
    });
    densityDots().addTo(g);                              // granular field layered on top
    return g;
  }
  function restyleDensity(){ if(!map||!state.layers.density)return; if(regionLayer)map.removeLayer(regionLayer); regionLayer=densityLayer().addTo(map); updateBuildings(); }

  function buildingPoints(center){
    var rr=rng(99), pts=[];
    for(var dx=-9;dx<=9;dx++) for(var dy=-9;dy<=9;dy++){
      if(rr()<0.35) continue;
      var d=Math.max(0,1-Math.sqrt(dx*dx+dy*dy)/13)*(0.5+rr()*0.5);
      pts.push({lat:center.lat+dx*0.0011+(rr()-0.5)*0.0006, lng:center.lng+dy*0.0013+(rr()-0.5)*0.0006, v:d});
    }
    return pts;
  }
  function bandColor(v){ return v>0.8?RAMP[4]:v>0.6?RAMP[3]:v>0.4?RAMP[2]:v>0.2?RAMP[1]:RAMP[0]; }

  function updateBuildings(){
    if(!map) return;
    var showB = map.getZoom()>=15 && state.layers.density;
    if(showB){
      if(!buildingLayer){
        buildingLayer=L.layerGroup(); var c=map.getCenter();
        var near=HOMES.slice().sort(function(a,b){ return (Math.abs(a.lat-c.lat)+Math.abs(a.lng-c.lng))-(Math.abs(b.lat-c.lat)+Math.abs(b.lng-c.lng)); })[0];
        buildingPoints(near).forEach(function(p){         // building level = dots, each ≈ a cluster of people
          L.circleMarker([p.lat,p.lng],{radius:3+p.v*4.5,stroke:true,color:'#fff',weight:1,fillColor:bandColor(p.v),fillOpacity:0.95})
            .bindTooltip(tip('Cluster','~'+Math.round(p.v*55+6)+' people · '+near.name),{className:'aud-tip',direction:'top'}).addTo(buildingLayer);
        });
        buildingLayer.addTo(map);
      }
    } else if(buildingLayer){ map.removeLayer(buildingLayer); buildingLayer=null; }
  }
  var lastZB=null;
  function updateGran(){
    if(!map) return; var zb=map.getZoom()>=15;
    if(zb!==lastZB){ lastZB=zb; if(state.layers.density){ restyleDensity(); return; } }  // rebuild so polygons fade & dots take over
    updateBuildings();
  }

  // ---------- info card ----------
  var C=138; // 2πr, r=22
  function audHere(r){ return Math.round(r.pop*(eff(r)/100)*0.2); }   // est. of the selected audience in a region
  function poisIn(r){ return POIS.filter(function(p){ return Math.abs(p.lat-r.c[0])<r.r*1.15 && Math.abs(p.lng-r.c[1])<r.r*1.25; }); }
  function openInfoCard(rg){
    var e=eff(rg);
    var here=audHere(rg), total=0, ranked=[];
    REGIONS.forEach(function(r){ var h=audHere(r); total+=h; ranked.push({name:r.name,h:h}); });
    ranked.sort(function(a,b){ return b.h-a.h; });
    var rank=ranked.findIndex(function(x){ return x.name===rg.name; })+1;
    var share=total? Math.round(here/total*100):0;
    var pc=poisIn(rg).length;
    var multi=state.auds.length>1, dom=domAud(rg), domA=AUDIENCES.filter(function(a){return a.id===dom.id;})[0]||{};
    document.getElementById('icName').textContent=rg.name;
    document.getElementById('icSub').textContent='Index vs national · '+(multi?'strongest segment shown':(AUDIENCES.filter(function(a){return a.id===state.auds[0];})[0]||{name:'audience'}).name);
    document.getElementById('icScore').textContent=Math.round(e);
    document.getElementById('icHere').textContent=fmt(Math.round(here/1000)*1000);
    document.getElementById('icShare').textContent=share+'%';
    document.getElementById('icRank').innerHTML='#'+rank+'<small> of '+REGIONS.length+'</small>';
    document.getElementById('icDot').style.background=AUD_COLORS[dom.id]||'var(--accent)';
    document.getElementById('icFoot').innerHTML=(multi?'Strongest segment · <b>'+(domA.name||'')+'</b>':'Over-indexes vs national')+' · <b>'+pc+'</b> point'+(pc===1?'':'s')+' of interest here';
    var frac=Math.max(0.06,Math.min(1,e/180));
    document.getElementById('icArc').setAttribute('stroke-dashoffset', (C*(1-frac)).toFixed(1));
    document.getElementById('infocard').classList.add('show');
  }

  // ---------- render ----------
  function renderLayers(){
    if(!map) return;
    if(regionLayer){ map.removeLayer(regionLayer); regionLayer=null; }
    if(state.layers.density){ regionLayer=densityLayer().addTo(map); updateBuildings(); }
    else if(buildingLayer){ map.removeLayer(buildingLayer); buildingLayer=null; }

    ['poi','media','movement'].forEach(function(k){ if(groups[k]){ map.removeLayer(groups[k]); groups[k]=null; } });
    if(state.layers.poi) groups.poi=buildPoi().addTo(map);
    if(state.layers.media) groups.media=buildMedia().addTo(map);
    if(state.layers.movement) groups.movement=buildMovement(state.mv).addTo(map);

    document.querySelectorAll('#legendKeys .krow').forEach(function(r){ r.classList.toggle('hidden',!state.layers[r.dataset.k]); });
    document.querySelectorAll('.lyr').forEach(function(l){ var on=state.layers[l.dataset.layer]; l.classList.toggle('on',on); l.classList.toggle('off',!on); });
    document.querySelector('.lyr[data-layer=movement]').classList.toggle('expanded',state.layers.movement);
  }

  // ---------- toast + chat ----------
  var toastEl=document.getElementById('toast'),toastMsg=document.getElementById('toastMsg'),tt;
  function toast(m){ toastMsg.textContent=m; toastEl.classList.add('show'); clearTimeout(tt); tt=setTimeout(function(){toastEl.classList.remove('show');},1900); }
  var thread=document.getElementById('thread');
  function scrollThread(){ thread.scrollTop=thread.scrollHeight; }
  function addUser(t){ var d=document.createElement('div'); d.className='msg user'; d.innerHTML='<div class="msg-role">You</div><div class="bubble">'+t+'</div>'; thread.appendChild(d); scrollThread(); }
  function addAI(t,extra){ var d=document.createElement('div'); d.className='msg ai'; d.innerHTML='<div class="msg-role"><span class="spark" style="width:16px;height:16px;border-radius:5px"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l2.2 5.8L20 10l-5.8 2.2L12 18l-2.2-5.8L4 10l5.8-2.2z"/></svg></span>Lumos</div><div class="bubble">'+t+'</div>'+(extra||''); thread.appendChild(d); scrollThread(); }
  function actCard(title,rows){ return '<div class="actcard"><div class="h"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2l9 5-9 5-9-5 9-5z"/><path d="M3 12l9 5 9-5"/></svg>'+title+'</div>'+rows.join('')+'</div>'; }
  function rowLayer(c,n,on){ return '<div class="actrow"><span class="sw" style="background:'+c+'"></span><b>'+n+'</b>'+(on?'<span class="on-tag">shown</span>':'<span class="off-tag">hidden</span>')+'</div>'; }
  function rowFilter(k,v){ return '<div class="actrow"><span class="sw" style="background:var(--accent)"></span><span class="k">'+k+'</span> <b>'+v+'</b><span class="on-tag">applied</span></div>'; }
  function corridorCard(){
    var max=FLOWS[0].pct, rows=FLOWS.map(function(f,i){
      return '<div class="cor-item"><div class="cor-top"><span class="cor-name">'+f.name+'</span><span class="cor-pct" style="color:'+COR[i]+'">'+f.pct+'%</span></div>'+
             '<div class="cor-bar"><i style="width:'+(f.pct/max*100)+'%;background:'+COR[i]+'"></i></div></div>';
    }).join('');
    return '<div class="cor"><div class="cor-h"><span class="dotc"></span>Corridor share · home → work</div>'+rows+'</div>';
  }

  function setLayer(n,on){ state.layers[n]=on; renderLayers(); }
  function flashPanel(){ var p=document.getElementById('layers'); p.classList.remove('flash'); void p.offsetWidth; p.classList.add('flash'); }

  function runAct(act,echo){
    if(act==='live'){ if(echo)addUser('Where does this audience live?'); setLayer('density',true); if(map)map.flyTo([1.3521,103.8698],11,{duration:.6});
      addAI('They index highest in the <b>east and central-north</b> — Tampines · Pasir Ris tops out at <b>148</b>. Click a region for its reach and frequency; <b>zoom in and it resolves to individual buildings</b>.',actCard('Map updated',[rowLayer('var(--l-density)','Density · index',true)])); flashPanel(); }
    if(act==='poi'){ if(echo)addUser('Add the points of interest they visit and the media they pass'); setLayer('poi',true); setLayer('media',true);
      addAI('Mapped <b>'+POIS.length+' points of interest</b> and <b>'+MEDIA.length+' OOH panels</b> this audience touches — flagships are called out, the rest sit as a dense field. Orchard\'s digital billboard over-indexes at <b>168</b>.',actCard('Turned on 2 layers',[rowLayer('var(--l-poi)','Points of interest',true),rowLayer('var(--l-media)','Preferred media',true)])); flashPanel(); }
    if(act==='morning'){ if(echo)addUser('Just weekday mornings'); setFilter('time','Weekdays · 6–10am');
      addAI('Filtered to <b>weekday mornings (6–10am)</b>. Presence shifts toward <b>commute corridors and transit</b> — a strong window for morning OOH.',actCard('Filter applied',[rowFilter('Time','Weekdays · 6–10am')])); }
    if(act==='young'){ if(echo)addUser('Only ages 18 to 24'); toggleDemo('Age 18–24',true);
      addAI('Narrowed to <b>ages 18–24</b> — about <b>96k people</b>. The index tightens around <b>university belts and their home towns</b>.',actCard('Filter applied',[rowFilter('Demographic','Age 18–24')])); }
    if(act==='move'){ if(echo)addUser('Trace their commute from home to work'); setLayer('movement',true);
      restyleDensity(); addAI('Drawn as <b>corridor flows</b>, weighted by share. <b>One corridor — Tampines → CBD — carries 31%</b>; the top three cover two-thirds of all commuting. Full breakdown below.',actCard('Turned on Movement',[rowLayer('var(--l-move)','Movement · corridors',true)])+corridorCard()); flashPanel(); }
  }

  // ---------- filters ----------
  function setFilter(kind,label){ if(kind==='time')state.filters.time=label; else if(kind==='freq')state.filters.freq=label; renderPills(); }
  function toggleDemo(trait,on){ var i=state.filters.demo.indexOf(trait); if(on&&i<0)state.filters.demo.push(trait); if(!on&&i>=0)state.filters.demo.splice(i,1); renderPills();
    document.querySelectorAll('#pDemo .pop-opt').forEach(function(o){ if(o.dataset.demo===trait) o.classList.toggle('on',on); }); }
  function renderPills(){
    document.querySelectorAll('#filterbar .pill').forEach(function(p){p.remove();}); var bar=document.getElementById('filterbar');
    function pill(kind,k,val){ var el=document.createElement('span'); el.className='pill'; el.innerHTML='<span class="k">'+k+'</span>'+val+'<span class="x" data-clear="'+kind+'" data-val="'+val+'"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 6l12 12M18 6L6 18"/></svg></span>'; bar.appendChild(el); }
    if(state.filters.time)pill('time','Time',state.filters.time);
    if(state.filters.freq)pill('freq','Freq',state.filters.freq);
    state.filters.demo.forEach(function(d){ pill('demo','Trait',d); });
    document.querySelectorAll('#filterbar .pill .x').forEach(function(x){ x.addEventListener('click',function(e){ e.stopPropagation();
      var kind=x.dataset.clear,val=x.dataset.val; if(kind==='time')state.filters.time=null; else if(kind==='freq')state.filters.freq=null; else toggleDemo(val,false); renderPills(); toast('Cleared: '+val); }); });
  }

  // ---------- signal + audience (on-map panel) ----------
  var CHK='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><path d="M5 12l5 5L20 6"/></svg>';
  function updateTimeTitle(){ document.getElementById('timeTitle').textContent=state.signal+' density'; }
  function updateLegend(){ /* bottom legend removed — colours live in the on-map Audiences panel */ }
  function phaseOfHour(h){ if(h<10||h>=22) return 'Residential'; if(h<17) return 'Daytime'; return 'Transaction'; }
  function phaseHour(sig){ return sig==='Daytime'?13:(sig==='Transaction'?19:8); }
  function fmtHour12(h){ var ap=h<12?'AM':'PM',hh=h%12; if(hh===0)hh=12; return hh+':00 '+ap; }
  function phaseWord(s){ return s==='Residential'?'home · residential':(s==='Daytime'?'work · daytime':'evening · retail'); }
  function updateTsAud(){ var el=document.getElementById('tsAud'); if(el) el.textContent=audLabel().name; }
  function setHour(h){ state.hour=h; state.signal=phaseOfHour(h); var el;
    if(el=document.getElementById('tsHour')) el.textContent=fmtHour12(h);
    if(el=document.getElementById('tsPhase')) el.textContent=phaseWord(state.signal);
    document.querySelectorAll('#sigSeg span').forEach(function(s){ s.classList.toggle('on', s.dataset.sig===state.signal); });
    var r=document.getElementById('tsRange'); if(r && +r.value!==h) r.value=h;
    document.querySelectorAll('#tsHist i').forEach(function(b,i){ b.classList.toggle('cur', i===h); });
    updateTimeTitle(); restyleDensity(); }
  function applySignal(sig){ setHour(phaseHour(sig)); toast('Signal · '+sig); }
  function tsAct(h){ return Math.exp(-Math.pow(h-8.3,2)/6)+Math.exp(-Math.pow(h-18.5,2)/7)*0.95+Math.exp(-Math.pow(h-13,2)/12)*0.5+0.12; }
  function buildTimescale(){ var hist=document.getElementById('tsHist'); if(!hist)return; var vals=[],max=0; for(var h=0;h<24;h++){var v=tsAct(h);vals.push(v);if(v>max)max=v;} hist.innerHTML=vals.map(function(v){return '<i style="height:'+(16+v/max*84)+'%"></i>';}).join(''); }
  function wireRange(el){
    var lo=el.querySelector('.rng-lo'), hi=el.querySelector('.rng-hi'), fill=el.querySelector('.rng-fill'), val=el.querySelector('.rng-val');
    var min=+lo.min, max=+lo.max, fmt=RANGE_FMT[el.dataset.key]||function(v){return v;};
    function upd(e){ var a=+lo.value, b=+hi.value;
      if(a>b){ if(e&&e.target===lo){ lo.value=b; a=b; } else { hi.value=a; b=a; } }
      var pa=(a-min)/(max-min||1)*100, pb=(b-min)/(max-min||1)*100;
      fill.style.left=pa+'%'; fill.style.width=(pb-pa)+'%'; val.textContent=fmt(a)+'–'+fmt(b); }
    lo.addEventListener('input',upd); hi.addEventListener('input',upd); upd();
  }
  function buildDemoRanges(){
    var box=document.getElementById('demoRanges'); if(!box) return; box.innerHTML='';
    var sub=document.getElementById('demoSub'); if(sub) sub.textContent='Ranges show the min–max for '+audLabel().name.toLowerCase();
    RANGE_DEMOS.forEach(function(d){ var b=audBounds(d), lo=b[0], hi=b[1], fmt=d.fmt; RANGE_FMT[d.key]=fmt;
      var el=document.createElement('div'); el.className='rng'; el.dataset.key=d.key;
      el.innerHTML='<div class="rng-top"><span class="rng-lab">'+d.label+'</span><span class="rng-val">'+fmt(lo)+'–'+fmt(hi)+'</span></div>'+
        '<div class="rng-track"><div class="base"></div><div class="rng-fill"></div>'+
        '<input type="range" class="rng-lo" min="'+lo+'" max="'+hi+'" value="'+lo+'"><input type="range" class="rng-hi" min="'+lo+'" max="'+hi+'" value="'+hi+'"></div>'+
        '<div class="rng-ends"><span>'+fmt(lo)+'</span><span>'+fmt(hi)+'</span></div>';
      box.appendChild(el); wireRange(el);
    });
  }
  function audLabel(){ var n=state.auds.length; if(n>=AUDIENCES.length) return {name:'All suggested audiences',meta:AUDIENCES.length+' audiences · combined'};
    if(n===1){ var a=AUDIENCES.filter(function(x){return x.id===state.auds[0];})[0]; return {name:a.name,meta:'Digital twin · Singapore · '+a.people+' people'}; }
    return {name:n+' audiences',meta:'Combined · '+Math.round(audPeopleTotal()/1000)+'k people'}; }
  function updateCtx(){ var l=audLabel(); var cn=document.getElementById('ctxName'); if(cn)cn.textContent=l.name; var cm=document.getElementById('ctxMeta'); if(cm)cm.textContent=l.meta;
    var aa=document.getElementById('apAll'); if(aa)aa.classList.toggle('on', state.auds.length>=AUDIENCES.length); updateTsAud(); }
  function populateAud(){ var box=document.getElementById('apList'); box.innerHTML=''; AUDIENCES.forEach(function(a){ var on=state.auds.indexOf(a.id)>=0; var el=document.createElement('div'); el.className='ap-item '+(on?'on':'off'); el.dataset.aud=a.id;
    el.innerHTML='<span class="ap-check" style="background:'+(on?AUD_COLORS[a.id]:'#fff')+';border-color:'+(on?AUD_COLORS[a.id]:'')+'">'+CHK+'</span><span class="ap-dot" style="background:'+AUD_COLORS[a.id]+'"></span><span class="ap-name">'+a.name+'</span><span class="ap-ppl">'+a.people+'</span>'; box.appendChild(el); }); }
  function applyAudience(silent){ var ids=[]; document.querySelectorAll('#apList .ap-item.on').forEach(function(o){ ids.push(o.dataset.aud); }); if(!ids.length){ ids=['suv']; setAudUI(ids); } state.auds=ids; updateCtx(); updateLegend(); buildDemoRanges(); restyleDensity();
    currentMode = ids.length===1 ? ids[0] : 'all';
    if(!silent) toast(ids.length>=AUDIENCES.length?'Showing all audiences':(ids.length===1?'Focused: '+audLabel().name:ids.length+' audiences combined'));
    if(!suppressCb){ if(ids.length===1){ if(opts.onSelect) opts.onSelect(ids[0]); } else if(opts.onShowAll){ opts.onShowAll(); } } }
  function setItemState(el,on){ el.classList.toggle('on',on); el.classList.toggle('off',!on); var c=el.querySelector('.ap-check'), col=AUD_COLORS[el.dataset.aud]; c.style.background=on?col:'#fff'; c.style.borderColor=on?col:''; }
  function setAudUI(ids){ document.querySelectorAll('#apList .ap-item').forEach(function(el){ setItemState(el, ids.indexOf(el.dataset.aud)>=0); }); }

  // ---------- wiring ----------
  function wire(){
    document.querySelectorAll('#sigSeg span').forEach(function(sp){ sp.addEventListener('click',function(e){ e.stopPropagation(); document.querySelectorAll('#sigSeg span').forEach(function(s){s.classList.remove('on');}); sp.classList.add('on'); applySignal(sp.dataset.sig); }); });
    populateAud(); updateCtx(); updateLegend();
    document.getElementById('apAll').addEventListener('click',function(){ var turnOn=!this.classList.contains('on'); setAudUI(turnOn?AUDIENCES.map(function(a){return a.id;}):['suv']); applyAudience(); });
    document.getElementById('apList').addEventListener('click',function(e){ var o=e.target.closest('.ap-item'); if(!o)return; setItemState(o,!o.classList.contains('on')); applyAudience(); });
    document.querySelectorAll('.p-chev').forEach(function(c){ c.addEventListener('click',function(e){ e.stopPropagation(); document.getElementById(c.dataset.collapse).classList.toggle('collapsed'); }); });
    buildTimescale(); document.getElementById('tsRange').addEventListener('input',function(){ setHour(+this.value); }); setHour(state.hour);
    buildDemoRanges();

    document.querySelectorAll('.lyr').forEach(function(l){ l.querySelector('.lyr-main').addEventListener('click',function(){
      var name=l.dataset.layer,on=!state.layers[name]; setLayer(name,on); if(name==='movement')restyleDensity();
      var label={density:'Density · index',poi:'Points of interest',media:'Preferred media',movement:'Movement · corridors'}[name];
      toast((on?'Shown: ':'Hidden: ')+label); }); });

    document.querySelectorAll('input[data-op]').forEach(function(r){ var k=r.dataset.op;
      r.addEventListener('input',function(){ document.querySelector('[data-opv="'+k+'"]').textContent=r.value+'%';
        if(k!=='density'&&groups[k]){ groups[k].eachLayer(function(m){ if(m.setStyle)m.setStyle({opacity:r.value/100}); if(m.setOpacity)m.setOpacity(r.value/100); }); } });
      if(k==='density') r.addEventListener('change',function(){ state.densityOp=r.value/100; restyleDensity(); }); });

    document.querySelectorAll('.fbtn').forEach(function(b){ b.addEventListener('click',function(e){ e.stopPropagation();
      var id=b.dataset.pop,el=document.getElementById(id),was=el.classList.contains('open'); document.querySelectorAll('.pop').forEach(function(p){p.classList.remove('open');}); if(!was)el.classList.add('open'); }); });
    document.addEventListener('click',function(){ document.querySelectorAll('.pop').forEach(function(p){p.classList.remove('open');}); });
    document.querySelectorAll('.pop').forEach(function(p){ p.addEventListener('click',function(e){e.stopPropagation();}); });

    document.querySelectorAll('#pTime .pop-opt[data-day]').forEach(function(o){ o.addEventListener('click',function(){ document.querySelectorAll('#pTime .pop-opt[data-day]').forEach(function(x){x.classList.remove('on');}); o.classList.add('on'); }); });
    var hb=document.getElementById('hourbar'); for(var h=0;h<24;h++){ var b=document.createElement('div'); b.className='hb'+(h>=6&&h<10?' on':''); b.dataset.h=h; b.style.height=(30+Math.sin(h/3)*20+20)+'%'; hb.appendChild(b); }
    hb.querySelectorAll('.hb').forEach(function(b){ b.addEventListener('click',function(){ b.classList.toggle('on'); updateHourReadout(); }); }); updateHourReadout();
    var mos=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],mc=document.getElementById('months');
    mos.forEach(function(m,i){ var d=document.createElement('div'); d.className='mo'; d.textContent=m; d.dataset.i=i; d.addEventListener('click',function(){ d.classList.toggle('on'); updateMoReadout(); }); mc.appendChild(d); });
    document.querySelectorAll('#pFreq .pop-opt').forEach(function(o){ o.addEventListener('click',function(){ document.querySelectorAll('#pFreq .pop-opt').forEach(function(x){x.classList.remove('on');}); o.classList.add('on'); }); });
    document.querySelectorAll('#pDemo .pop-opt[data-demo]').forEach(function(o){ o.addEventListener('click',function(){ if(o.dataset.demo.indexOf('custom')<0)o.classList.toggle('on'); }); });

    document.querySelectorAll('.pop-apply').forEach(function(btn){ btn.addEventListener('click',function(e){ e.stopPropagation(); var id=btn.dataset.apply;
      if(id==='pTime'){ var day=document.querySelector('#pTime .pop-opt.on').dataset.day,dayL={all:'Any day',weekday:'Weekdays',weekend:'Weekends'}[day],hrs=document.querySelectorAll('#pTime .hb.on').length; state.filters.time=dayL+(hrs>0&&hrs<24?' · '+hourRange():''); }
      if(id==='pFreq'){ state.filters.freq=document.querySelector('#pFreq .pop-opt.on').textContent.trim(); }
      if(id==='pDemo'){ state.filters.demo=[];
        document.querySelectorAll('#demoRanges .rng').forEach(function(el){ var lo=el.querySelector('.rng-lo'), hi=el.querySelector('.rng-hi'), fmt=RANGE_FMT[el.dataset.key], d=RANGE_DEMOS.filter(function(x){return x.key===el.dataset.key;})[0];
          if(+lo.value>+lo.min || +hi.value<+hi.max) state.filters.demo.push(d.label+' '+fmt(+lo.value)+'–'+fmt(+hi.value)); });
        document.querySelectorAll('#pDemo .pop-opt.on').forEach(function(o){ if(o.dataset.demo.indexOf('custom')<0) state.filters.demo.push(o.dataset.demo); }); }
      renderPills(); document.getElementById(id).classList.remove('open');
      var names={pTime:'Time',pFreq:'Frequency',pDemo:'Demographics'}; toast(names[id]+' filter applied'); }); });

    document.getElementById('icClose').addEventListener('click',function(){ document.getElementById('infocard').classList.remove('show'); });
    document.getElementById('zoomIn').addEventListener('click',function(){ map&&map.zoomIn(); });
    document.getElementById('zoomOut').addEventListener('click',function(){ map&&map.zoomOut(); });
    var EXPAND='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/></svg>';
    var COMPRESS='<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 4v5H4M15 4v5h5M9 20v-5H4M15 20v-5h5"/></svg>';
    var full=false;
    document.getElementById('mapFull').addEventListener('click',function(){
      full=!full; document.querySelector('.screen').classList.toggle('mapfull',full);
      this.innerHTML=full?COMPRESS:EXPAND; this.title=full?'Exit full screen':'Full screen map';
      setTimeout(function(){ map&&map.invalidateSize(); },70);
    });
  }
  function updateHourReadout(){ var on=[].slice.call(document.querySelectorAll('#pTime .hb.on')); document.getElementById('hourReadout').textContent=(on.length===0||on.length===24)?'All day':hourRange(); }
  function hourRange(){ var on=[].slice.call(document.querySelectorAll('#pTime .hb.on')).map(function(b){return +b.dataset.h;}).sort(function(a,b){return a-b;}); if(!on.length)return'All day'; return fh(on[0])+'–'+fh(on[on.length-1]+1); }
  function fh(h){ h=h%24; var ap=h<12?'am':'pm',hh=h%12===0?12:h%12; return hh+ap; }
  function updateMoReadout(){ var n=document.querySelectorAll('#months .mo.on').length; document.getElementById('moReadout').textContent=(n===0||n===12)?'All year':n+' month'+(n>1?'s':''); }

  function sendChat(){ var inp=document.getElementById('chatInput'),t=inp.value.trim(); if(!t)return; addUser(t); inp.value=''; var l=t.toLowerCase();
    if(/live|home|resid|where.*they/.test(l))return runAct('live',false);
    if(/store|shop|showroom|dealer|poi|billboard|media|ooh/.test(l))return runAct('poi',false);
    if(/morning|weekday|time|am\b/.test(l))return runAct('morning',false);
    if(/18|24|young|age/.test(l))return runAct('young',false);
    if(/commut|move|travel|route|corridor|work/.test(l))return runAct('move',false);
    addAI('I can show <b>where they live</b> (index choropleth), add <b>stores & media</b>, trace their <b>commute corridors</b>, or filter by <b>time, frequency and demographics</b>. Try a chip, or name a layer or filter.'); }

  function boot(){
    if(typeof L==='undefined'){ document.getElementById('map').innerHTML='<div style="padding:40px;color:#9A9A9A;font-family:Baloo 2">Map requires a network connection.</div>'; wire(); return; }
    map=L.map('map',{zoomControl:false,attributionControl:false,scrollWheelZoom:true}).setView([1.3421,103.8298],11);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',{subdomains:'abcd',maxZoom:19}).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',{subdomains:'abcd',maxZoom:19,pane:'markerPane',opacity:0.9}).addTo(map);
    renderLayers(); map.on('zoomend',updateGran); updateGran(); wire();
  }


      boot();

      return {
        open: function(){ host.classList.add('lm-open'); if(map){ try{ map.invalidateSize(); }catch(e){} try{ map.flyTo([1.3421,103.8298],11,{duration:.4}); }catch(e){} } },
        select: function(seg){ if(AUD_IDS.indexOf(seg)<0) return; suppressCb=true; setAudUI([seg]); applyAudience(true); suppressCb=false; },
        showAll: function(){ suppressCb=true; setAudUI(AUD_IDS.slice()); applyAudience(true); suppressCb=false; },
        setLens: function(signal, when){ if(signal){ var mp={residential:'Residential',daytime:'Daytime',transaction:'Transaction'}; var s=mp[String(signal).toLowerCase()]||signal; try{ setHour(phaseHour(s)); }catch(e){} } },
        destroy: function(){ try{ if(map) map.remove(); }catch(e){} host.innerHTML=''; host.classList.remove('lm-root','lm-open'); },
        get mode(){ return currentMode; }
      };
    }
  };
})(typeof window !== 'undefined' ? window : this);
