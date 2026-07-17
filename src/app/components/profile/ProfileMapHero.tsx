import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../mobility/mobilityMap.css';
import './profileMap.css';
import { PA_GEO } from '../mobility/planningAreas';
import { colorFor, HOTSPOTS } from '../mobility/mobilityData';
import {
  concentrationFor, pget, fmtHome, profileTip, titleCase,
  INCOME_BANDS, LIFESTAGE, DEFAULT_READOUT_AREA, DOSSIER_ORDER,
  type LinkRow,
} from './profileData';
import { useMyView } from '../MyView';
import type { ModuleRef } from '../ModuleAsk';

// ── Audience Profile companion map ───────────────────────────────────────────
// The Mobility choropleth engine, re-lensed for "who lives here": planning areas
// colour by audience concentration and every income band / lifestage segment on
// the rail two-way links to the map — hover a row, its suburbs light up and the
// place readout swaps to a band summary. Per request the map's "Where they live ·
// Colour by" selector is dropped; concentration is the only lens.
// Ask Lumos + Pin-to-My-View live on the map (anchor id `prof-map`).

export const PROFILE_MAP_ID = 'prof-map';
export const PROFILE_MAP_TITLE = 'Where they live · map';

const SPARK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
  </svg>
);

// Icons for the place-readout rows.
const ICONS = {
  share: <path d="M9 8a3 3 0 100-6 3 3 0 000 6zM3 20c0-3 3-5 6-5s6 2 6 5" />,
  home: <path d="M3 11l9-8 9 8M5 10v10h14V10" />,
  income: <path d="M12 3v18M7 7h7a3 3 0 010 6H8a3 3 0 000 6h8" />,
  seg: <><circle cx="12" cy="12" r="9" /><path d="M12 3a15 15 0 010 18M3 12h18" /></>,
  retail: <path d="M4 9h16l-1 11H5zM8 9V6a4 4 0 018 0v3" />,
};

type Readout =
  | { kind: 'area'; name: string }
  | { kind: 'band'; row: LinkRow };

export default function ProfileMapHero({
  audience = 'this audience',
  onAskGraph,
}: {
  audience?: string;
  onAskGraph?: (ref: ModuleRef) => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const geoRef = useRef<L.GeoJSON | null>(null);
  const nameLayerRef = useRef<Record<string, L.Path>>({});
  const hotRef = useRef<L.LayerGroup | null>(null);
  const emphRef = useRef(false); // guard mouseout resets while a row is emphasised

  const [readout, setReadout] = useState<Readout>({ kind: 'area', name: DEFAULT_READOUT_AREA });
  const [hot, setHot] = useState(false);

  const mv = useMyView();
  const pinned = mv?.isPinned(PROFILE_MAP_ID) ?? false;

  // ── Map init (once) ─────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;

    const map = L.map(el, {
      zoomControl: false,
      scrollWheelZoom: false, // never trap page scroll on the hero
      attributionControl: false,
    }).setView([1.3421, 103.8298], 11);
    mapRef.current = map;
    L.control.zoom({ position: 'bottomright' }).addTo(map);

    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd', maxZoom: 19,
    }).addTo(map);
    L.tileLayer('https://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png', {
      subdomains: 'abcd', maxZoom: 19, pane: 'markerPane', opacity: 0.9,
    }).addTo(map);

    const geoLayer = L.geoJSON(PA_GEO, {
      style: (feature) => ({
        color: '#ffffff', weight: 1.1,
        fillColor: colorFor(concentrationFor((feature?.properties as { n: string }).n)),
        fillOpacity: 0.82,
      }),
      onEachFeature: (feature, layer) => {
        const name = (feature.properties as { n: string }).n;
        nameLayerRef.current[name] = layer as L.Path;
        (layer as L.Path).bindTooltip(profileTip(name), { className: 'aud-tip', sticky: true, direction: 'top' });
        layer.on('mouseover', (e) => {
          if (emphRef.current) return;
          (e.target as L.Path).setStyle({ weight: 2.6, color: '#6B3C72', fillOpacity: 0.9 });
          (e.target as L.Path).bringToFront();
          setReadout({ kind: 'area', name });
        });
        layer.on('mouseout', (e) => {
          if (emphRef.current) return;
          geoLayer.resetStyle(e.target as L.Path);
          setReadout({ kind: 'area', name: DEFAULT_READOUT_AREA });
        });
      },
    }).addTo(map);
    geoRef.current = geoLayer;

    // Frame the island only once the container has its real size.
    const fit = () => {
      map.invalidateSize();
      map.fitBounds(geoLayer.getBounds(), { padding: [12, 12] });
    };
    fit();
    const t = window.setTimeout(fit, 60);
    const ro = new ResizeObserver(() => map.invalidateSize());
    ro.observe(el);

    return () => {
      window.clearTimeout(t);
      ro.disconnect();
      map.remove();
      mapRef.current = null;
      geoRef.current = null;
      nameLayerRef.current = {};
      hotRef.current = null;
    };
  }, []);

  // ── Key-retail / POI markers ────────────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (hotRef.current) { map.removeLayer(hotRef.current); hotRef.current = null; }
    if (!hot) return;
    const group = L.layerGroup();
    HOTSPOTS.forEach((h) => {
      L.circleMarker([h.lat, h.lng], { radius: 6, color: '#fff', weight: 1.5, fillColor: '#5A2E62', fillOpacity: 0.95 })
        .bindTooltip(`<div class="tn">${h.name}</div><div class="tm">Anchor retail · POI</div>`, { className: 'aud-tip', direction: 'top' })
        .addTo(group);
    });
    group.addTo(map);
    hotRef.current = group;
  }, [hot]);

  // Light up a band/segment's suburbs; dim the rest.
  const emphasize = (row: LinkRow) => {
    const geoLayer = geoRef.current;
    if (!geoLayer) return;
    emphRef.current = true;
    const set = new Set(row.areas);
    geoLayer.eachLayer((layer) => {
      const name = ((layer as L.GeoJSON).feature?.properties as { n: string } | undefined)?.n;
      if (!name) return;
      if (set.has(name)) {
        (layer as L.Path).setStyle({ weight: 2.6, color: '#6B3C72', fillColor: colorFor(concentrationFor(name)), fillOpacity: 0.94 });
        (layer as L.Path).bringToFront();
      } else {
        (layer as L.Path).setStyle({ weight: 0.5, color: '#ffffff', fillOpacity: 0.12 });
      }
    });
    setReadout({ kind: 'band', row });
  };
  const clearEmph = () => {
    emphRef.current = false;
    geoRef.current?.resetStyle();
    setReadout({ kind: 'area', name: DEFAULT_READOUT_AREA });
  };

  const flyTo = (area: string) => {
    const map = mapRef.current;
    const layer = nameLayerRef.current[area];
    if (!map || !layer) return;
    map.flyToBounds((layer as unknown as L.Polygon).getBounds(), { maxZoom: 14, duration: 0.6 });
    layer.setStyle({ weight: 3, color: '#6B3C72', fillOpacity: 0.92 });
    layer.bringToFront();
    setReadout({ kind: 'area', name: area });
    window.setTimeout(() => { if (!emphRef.current) geoRef.current?.resetStyle(layer); }, 1500);
  };

  const ask = (label: string) =>
    onAskGraph?.({ id: `aud:profile:${PROFILE_MAP_ID}`, label, audience, state: ['Concentration'] });

  // ── Place readout content ────────────────────────────────────────────────────
  const ro = useMemo((): {
    name: string; sub: string | null; subBand: string | null; band: boolean;
    rows: { icon: ReactNode; k: string; v: string }[];
  } => {
    if (readout.kind === 'band') {
      const r = readout.row;
      return {
        name: r.band,
        sub: null,
        subBand: `${r.areas.length} suburbs`,
        band: true,
        rows: [
          { icon: ICONS.share, k: 'Share of audience', v: r.summary },
          { icon: ICONS.home, k: 'Median home price', v: `median ${r.home}` },
          { icon: ICONS.income, k: 'Median HH income', v: r.areas.slice(0, 3).map(titleCase).join(', ') },
          { icon: ICONS.seg, k: 'Dominant segment', v: 'lit on map →' },
          { icon: ICONS.retail, k: 'Anchor retail', v: '—' },
        ],
      };
    }
    const p = pget(readout.name);
    return {
      name: titleCase(readout.name),
      sub: p.rank,
      subBand: null,
      band: false,
      rows: [
        { icon: ICONS.share, k: 'Share of audience', v: `${p.shareN}% · ${p.shareIdx}×` },
        { icon: ICONS.home, k: 'Median home price', v: fmtHome(p.homeN) },
        { icon: ICONS.income, k: 'Median HH income', v: `$${p.incomeN}k` },
        { icon: ICONS.seg, k: 'Dominant segment', v: p.seg },
        { icon: ICONS.retail, k: 'Anchor retail', v: p.retail },
      ],
    };
  }, [readout]);

  return (
    <div className="maphero profilehero">
      <div className="map-stage">
        <div ref={containerRef} className="aud-map" />

        {/* map ctas: full screen · pin · ask */}
        <div className="map-float map-cta">
          <span className="mbtn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 14v6h6M20 10V4h-6M14 10l6-6M10 14l-6 6" /></svg>Full screen
          </span>
          <span
            className={`mbtn pinbtn${pinned ? ' pinned' : ''}`}
            onClick={() => mv?.toggle(PROFILE_MAP_ID)}
            title={pinned ? 'Pinned to My View — click to remove' : 'Pin to My View'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 4h6l-1 6 3 3v2H7v-2l3-3-1-6z" /><path d="M12 15v5" /></svg>
            {pinned ? 'Pinned' : 'Pin map'}
          </span>
          <span className="mbtn ask" onClick={() => ask(PROFILE_MAP_TITLE)}>{SPARK}Ask about this map</span>
        </div>

        {/* legend + key retail toggle */}
        <div className="map-float legend-card">
          <div className="ll">Audience concentration · indexed</div>
          <div className="lg-ramp">
            <span className="cap">Low</span>
            <span className="bar">
              <i style={{ background: 'var(--h1)' }} /><i style={{ background: 'var(--h2)' }} /><i style={{ background: 'var(--h3)' }} /><i style={{ background: 'var(--h4)' }} /><i style={{ background: 'var(--h5)' }} />
            </span>
            <span className="cap">High</span>
          </div>
          <div className="lg-toggle" onClick={() => setHot((h) => !h)}>
            <span className={`toggle${hot ? '' : ' off'}`} /> Key retail &amp; POIs
          </div>
        </div>
      </div>

      {/* right rail — place readout + map-linked cards */}
      <div className="map-rail split">
        {/* Place readout */}
        <div className="rail-sec">
          <div className="rs-h">
            <span className="rs-t">Place readout</span>
            <span className="rs-actions">
              <span className="rs-ask" onClick={() => ask(ro.band ? ro.name : `${ro.name} · place`)}>{SPARK}Ask</span>
            </span>
          </div>
          <div className="readout">
            <div className="ro-head">
              <span className="ro-name">{ro.name}</span>
              {ro.band
                ? <span className="ro-sub"><span className="ro-band">{ro.subBand}</span></span>
                : <span className="ro-sub">{ro.sub}</span>}
            </div>
            <div className="ro-rows">
              {ro.rows.map((r) => (
                <div key={r.k} className="ro-row">
                  <span className="k">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>{r.icon}</svg>{r.k}
                  </span>
                  <span className="v">{r.v}</span>
                </div>
              ))}
            </div>
            <div className="ro-hint">
              {ro.band ? (
                <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8" /></svg>Highlighted suburbs shown on the map to the left</>
              ) : (
                <><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M13 2L3 14h7l-1 8 10-12h-7z" /></svg>Hover a suburb — or any band below — to explore</>
              )}
            </div>
          </div>
        </div>

        {/* Income & affluence — map-linked */}
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Income &amp; affluence <span className="tagx">MAP-LINKED</span></div>
              <div className="card-sub">HH-income bands · hover to locate</div>
            </div>
          </div>
          {INCOME_BANDS.map((b) => (
            <div key={b.band} className="bar-row bandrow" onMouseEnter={() => emphasize(b)} onMouseLeave={clearEmph}>
              <div className="bar-label">{b.label} <span className="maplink">◂ map</span></div>
              <div className="bar-track"><div className={`bar-fill${b.hot ? ' hot' : ''}`} style={{ width: `${b.pct}%` }} /></div>
              <div className="bar-val"><b>{b.val}</b></div>
            </div>
          ))}
          <div className="linknote">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 17H7A5 5 0 017 7h2M15 7h2a5 5 0 010 10h-2M8 12h8" /></svg>
            Hovering a band lights up its suburbs on the map to the left.
          </div>
        </div>

        {/* Lifestage mix — map-linked */}
        <div className="card">
          <div className="card-head">
            <div>
              <div className="card-title">Lifestage mix <span className="tagx">MAP-LINKED</span></div>
              <div className="card-sub">Helix-style segments · hover to locate</div>
            </div>
          </div>
          <div className="seg-bar">
            {LIFESTAGE.map((s) => (
              <span key={s.band} className={s.light ? 'light' : ''} style={{ width: `${s.pct}%`, background: s.color }}>{s.pct}%</span>
            ))}
          </div>
          {LIFESTAGE.map((s) => (
            <div key={s.band} className="seg-row" onMouseEnter={() => emphasize(s)} onMouseLeave={clearEmph}>
              <span className="dot" style={{ background: s.color }} />
              <span className="sname">{s.label}</span>
              <span className="maplink">◂ map</span>
              <span className="sval">{s.pct}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Area dossier — full-width table below the hero ────────────────────────────
// Top home suburbs profiled by place, not just people. Click a row to fly the map
// (shares the hero's map through a module-level ref set on mount is overkill, so
// this is a sibling card with its own Ask affordance).
export function ProfileAreaDossier({
  audience = 'this audience',
  onAskGraph,
  onRowClick,
}: {
  audience?: string;
  onAskGraph?: (ref: ModuleRef) => void;
  onRowClick?: (area: string) => void;
}) {
  return (
    <div className="profile-dossier">
      <div className="dh">
        <div>
          <div className="card-title">Where they live — area dossier <span className="tagx">GEO MOAT</span></div>
          <div className="card-sub">Top home suburbs profiled by place, not just people</div>
        </div>
        <span className="rs-actions" style={{ marginLeft: 'auto' }}>
          <span className="rs-ask" onClick={() => onAskGraph?.({ id: 'aud:profile:prof-dossier', label: 'Area dossier', audience, state: [] })}>{SPARK}Ask</span>
        </span>
      </div>
      <table className="dossier">
        <thead>
          <tr>
            <th>Suburb</th>
            <th className="num">Audience share</th>
            <th className="num">Median home</th>
            <th className="num">Median income</th>
            <th>Anchor retail</th>
            <th>Signature POI</th>
          </tr>
        </thead>
        <tbody>
          {DOSSIER_ORDER.map((name) => {
            const p = pget(name);
            return (
              <tr key={name} onClick={() => onRowClick?.(name)}>
                <td><b>{titleCase(name)}</b> <span className="sub">{p.rank}</span></td>
                <td className="num"><b>{p.shareN}%</b> · {p.shareIdx}×</td>
                <td className="num">{fmtHome(p.homeN)}</td>
                <td className="num">${p.incomeN}k</td>
                <td>{p.retail}</td>
                <td>{p.poi}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
