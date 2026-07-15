import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './mobilityMap.css';
import { PA_GEO } from './planningAreas';
import { colorFor, valueFor, titleCase, MIX, HOTSPOTS, type Signal, type DayType } from './mobilityData';
import { useMyView } from '../MyView';
import type { ModuleRef } from '../ModuleAsk';

// ── Mobility map hero — Leaflet planning-area choropleth ──────────────────────
// The real, recognisable Singapore basemap is the hero of the Mobility tab: a
// 600px live map with the URA planning-area choropleth, floating signal/weekday
// toggles + a hotspots switch, and a right insight rail. Ask Lumos + Pin-to-My-
// View live on the map itself and drive the same app-wide machinery as every
// other pinnable module (id `mob-map`).

export const MOBILITY_MAP_ID = 'mob-map';
export const MOBILITY_MAP_TITLE = 'Where they are · map';
const PIN_ID = MOBILITY_MAP_ID;
const MODULE_LABEL = MOBILITY_MAP_TITLE;

const SIGNALS: Signal[] = ['Residential', 'Daytime', 'Transaction'];
const DAYS: DayType[] = ['Weekday', 'Weekend'];

// Rail → planning-area lookup for the click-to-fly top-postcode rows.
const POSTCODES: { key: string; code: string; area: string; town: string; pct: number; val: string; hot?: boolean }[] = [
  { key: 'buona', code: '259xxx', area: 'QUEENSTOWN', town: 'Buona Vista', pct: 100, val: '3.8×', hot: true },
  { key: 'bishan', code: '308xxx', area: 'BISHAN', town: 'Bishan', pct: 89, val: '3.4×', hot: true },
  { key: 'tampines', code: '529xxx', area: 'TAMPINES', town: 'Tampines', pct: 82, val: '3.1×' },
  { key: 'woodlands', code: '738xxx', area: 'WOODLANDS', town: 'Woodlands', pct: 74, val: '2.8×' },
  { key: 'amk', code: '520xxx', area: 'ANG MO KIO', town: 'Ang Mo Kio', pct: 68, val: '2.6×' },
];

const SPARK = (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
    <path d="M12 3l2 5 5 2-5 2-2 5-2-5-5-2 5-2z" />
  </svg>
);

export default function MobilityMapHero({
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

  const [sig, setSig] = useState<Signal>('Residential');
  const [day, setDay] = useState<DayType>('Weekday');
  const [hot, setHot] = useState(false);

  const mv = useMyView();
  const pinned = mv?.isPinned(PIN_ID) ?? false;

  // ── Map init (once) ─────────────────────────────────────────────────────────
  useEffect(() => {
    const el = containerRef.current;
    if (!el || mapRef.current) return;

    const map = L.map(el, {
      zoomControl: false,
      scrollWheelZoom: false, // never trap page scroll on the 600px hero
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
      style: () => ({ color: '#ffffff', weight: 1.1, fillColor: '#E6D7E9', fillOpacity: 0.82 }),
      onEachFeature: (feature, layer) => {
        const name = (feature.properties as { n: string }).n;
        nameLayerRef.current[name] = layer as L.Path;
        (layer as L.Path).bindTooltip('', { className: 'aud-tip', sticky: true, direction: 'top' });
        layer.on('mouseover', (e) => {
          (e.target as L.Path).setStyle({ weight: 2.6, color: '#6B3C72', fillOpacity: 0.9 });
          (e.target as L.Path).bringToFront();
        });
        layer.on('mouseout', (e) => geoLayer.resetStyle(e.target as L.Path));
      },
    }).addTo(map);
    geoRef.current = geoLayer;

    // Fit only once the container has its real size — otherwise fitBounds
    // computes a zoom/centre against a mis-sized box and Singapore ends up
    // shoved to one edge. invalidateSize first, then frame the island.
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

  // ── Recolour + retip on signal / day change ─────────────────────────────────
  useEffect(() => {
    const geoLayer = geoRef.current;
    if (!geoLayer) return;
    geoLayer.setStyle((feature) => {
      const name = (feature?.properties as { n: string } | undefined)?.n ?? '';
      return { color: '#ffffff', weight: 1.1, fillColor: colorFor(valueFor(name, sig, day)), fillOpacity: 0.82 };
    });
    geoLayer.eachLayer((layer) => {
      const name = ((layer as L.GeoJSON).feature?.properties as { n: string } | undefined)?.n;
      if (!name) return;
      const v = valueFor(name, sig, day);
      const mix = MIX[name] || `Indexed vs national · ${sig} ${day}`;
      (layer as L.Path).setTooltipContent(
        `<div class="tn">${titleCase(name)} <span class="tx">${v.toFixed(1)}x</span></div><div class="tm">${mix}</div>`,
      );
    });
  }, [sig, day]);

  // ── Hotspot dwell-cluster markers ───────────────────────────────────────────
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;
    if (hotRef.current) { map.removeLayer(hotRef.current); hotRef.current = null; }
    if (!hot) return;
    const group = L.layerGroup();
    HOTSPOTS.forEach((h) => {
      L.circleMarker([h.lat, h.lng], { radius: 6, color: '#fff', weight: 1.5, fillColor: '#5A2E62', fillOpacity: 0.95 })
        .bindTooltip(`<div class="tn">${h.name}</div><div class="tm">Dwell cluster</div>`, { className: 'aud-tip', direction: 'top' })
        .addTo(group);
    });
    group.addTo(map);
    hotRef.current = group;
  }, [hot]);

  const flyTo = (area: string) => {
    const map = mapRef.current;
    const layer = nameLayerRef.current[area];
    if (!map || !layer) return;
    map.flyToBounds((layer as unknown as L.Polygon).getBounds(), { maxZoom: 14, duration: 0.6 });
    layer.setStyle({ weight: 3, color: '#6B3C72', fillOpacity: 0.92 });
    layer.bringToFront();
    window.setTimeout(() => geoRef.current?.resetStyle(layer), 1400);
  };

  const ask = (label: string) =>
    onAskGraph?.({ id: `aud:mobility:${PIN_ID}`, label, audience, state: [sig, day] });

  return (
    <div className="maphero">
      <div className="map-stage">
        <div ref={containerRef} className="aud-map" />

        {/* signal + time toggles */}
        <div className="map-float signal-card">
          <div className="sc-title">
            <span className="pin">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M12 21s7-6.4 7-11a7 7 0 10-14 0c0 4.6 7 11 7 11z" /><circle cx="12" cy="10" r="2.4" /></svg>
            </span>
            <span><b>{sig}</b> density · <b>{day}</b></span>
          </div>
          <div className="sc-row">
            <span className="sc-lab">Signal</span>
            <span className="segc">
              {SIGNALS.map((s) => (
                <span key={s} className={s === sig ? 'on' : ''} onClick={() => setSig(s)}>{s}</span>
              ))}
            </span>
          </div>
          <div className="sc-row">
            <span className="sc-lab">When</span>
            <span className="segc">
              {DAYS.map((d) => (
                <span key={d} className={d === day ? 'on' : ''} onClick={() => setDay(d)}>{d}</span>
              ))}
            </span>
          </div>
        </div>

        {/* map ctas: full screen · pin · ask */}
        <div className="map-float map-cta">
          <span className="mbtn">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M4 14v6h6M20 10V4h-6M14 10l6-6M10 14l-6 6" /></svg>Full screen
          </span>
          <span
            className={`mbtn pinbtn${pinned ? ' pinned' : ''}`}
            onClick={() => mv?.toggle(PIN_ID)}
            title={pinned ? 'Pinned to My View — click to remove' : 'Pin to My View'}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 4h6l-1 6 3 3v2H7v-2l3-3-1-6z" /><path d="M12 15v5" /></svg>
            {pinned ? 'Pinned' : 'Pin map'}
          </span>
          <span className="mbtn ask" onClick={() => ask(MODULE_LABEL)}>{SPARK}Ask about this map</span>
        </div>

        {/* legend + hotspots */}
        <div className="map-float legend-card">
          <div className="ll">Audience density · indexed</div>
          <div className="lg-ramp">
            <span className="cap">Low</span>
            <span className="bar">
              <i style={{ background: 'var(--h1)' }} /><i style={{ background: 'var(--h2)' }} /><i style={{ background: 'var(--h3)' }} /><i style={{ background: 'var(--h4)' }} /><i style={{ background: 'var(--h5)' }} />
            </span>
            <span className="cap">High</span>
          </div>
          <div className="lg-toggle" onClick={() => setHot((h) => !h)}>
            <span className={`toggle${hot ? '' : ' off'}`} /> Hotspots · dwell clusters
          </div>
        </div>
      </div>

      {/* right rail */}
      <div className="map-rail">
        <div className="rail-take">
          <div className="eye">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.6 10.8c.5.4.9 1 1 1.6l.1.6h5l.1-.6c.1-.6.5-1.2 1-1.6A6 6 0 0012 3z" /></svg>
            Takeaway · where they are
          </div>
          <div className="h">Five residential towns carry most of the audience — home, work and play split across three zones.</div>
          <div className="b">Homes cluster in <b>Buona Vista, Bishan, Tampines, Woodlands and Ang Mo Kio</b>. Daytime pulls to the <b>CBD &amp; one-north</b>, while weekend spend spreads to <b>Orchard &amp; lifestyle malls</b>.</div>
        </div>

        <div className="rail-sec">
          <div className="rs-h">
            <span className="rs-t">Top home postcodes</span>
            <span className="rs-actions">
              <span className="rs-ask" onClick={() => ask('Top home postcodes')}>{SPARK}Ask</span>
            </span>
          </div>
          {POSTCODES.map((p) => (
            <div key={p.key} className="pc-row" onClick={() => flyTo(p.area)}>
              <span className="pc-lab">{p.code} <span className="pcx">{p.town}</span></span>
              <div className="pc-track"><div className={`pc-fill${p.hot ? ' hot' : ''}`} style={{ width: `${p.pct}%` }} /></div>
              <span className="pc-val">{p.val}</span>
            </div>
          ))}
        </div>

        <div className="rail-sec">
          <div className="rs-h">
            <span className="rs-t">Catchment &amp; travel</span>
            <span className="rs-actions">
              <span className="rs-ask" onClick={() => ask('Catchment & travel')}>{SPARK}Ask</span>
            </span>
          </div>
          <div className="stat-2">
            <div className="stat"><div className="l">Median travel</div><div className="v">14.2<small>km</small></div></div>
            <div className="stat"><div className="l">90th pct</div><div className="v">52<small>km</small></div></div>
          </div>
        </div>
      </div>
    </div>
  );
}
