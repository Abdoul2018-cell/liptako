// Institutional (full-bleed mockup with tilt) + Gammes (with tilt)
const { useState: useState2, useMemo, useRef: useRef2, useEffect: useEffect2 } = React;

function InstitutionalCard({ sector, onZoom }) {
  // 3D tilt on the poster
  const ref = useRef2(null);
  useEffect2(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    function onMove(e) {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5);
      const y = ((e.clientY - r.top) / r.height - 0.5);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1400px) rotateY(${x * 7}deg) rotateX(${-y * 5}deg) scale(1.02)`;
        el.style.setProperty("--glare-x", ((e.clientX - r.left) / r.width * 100) + "%");
        el.style.setProperty("--glare-y", ((e.clientY - r.top) / r.height * 100) + "%");
        el.style.setProperty("--glare-o", "0.35");
      });
    }
    function onLeave() {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(1400px) rotateY(0) rotateX(0) scale(1)";
      el.style.setProperty("--glare-o", "0");
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="poster-stage" key={sector.id}>
      <div className="poster" ref={ref} onClick={onZoom}>
        <img src={sector.img} alt={"Édition " + sector.short} />
        <div className="poster-glare"></div>
        <div className="poster-corner tl">{sector.code}</div>
        <div className="poster-corner tr">{sector.cat.toUpperCase()}</div>
        <div className="poster-corner bl">LIPTAKO ED.</div>
        <div className="poster-corner br">2026 · NE</div>
        <button className="poster-zoom" aria-label="Agrandir">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.4">
            <circle cx="7" cy="7" r="5"/><path d="M11 11l3 3M5 7h4M7 5v4"/>
          </svg>
        </button>
      </div>
    </div>
  );
}

function Institutional() {
  const [active, setActive] = useState2(SECTORS[0]);
  const [zoom, setZoom] = useState2(false);

  // Page palette
  const pal = active.palette;

  useEffect2(() => {
    if (!zoom) return;
    function onKey(e) { if (e.key === "Escape") setZoom(false); }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => { window.removeEventListener("keydown", onKey); document.body.style.overflow = ""; };
  }, [zoom]);

  return (
    <section
      className="institutional"
      id="institutional"
      data-screen-label="05 Institutionnel"
      style={{
        background: `linear-gradient(180deg, ${pal.bg} 0%, ${pal.sidebar || pal.bg} 100%)`,
        color: pal.text
      }}
    >
      <div className="inst-bg-glow" style={{ background: `radial-gradient(circle at 70% 30%, ${pal.accent}33, transparent 60%)` }}></div>

      <div className="shell">
        <div className="section-head" style={{ color: pal.text }}>
          <h2 className="display" style={{ color: pal.text }}>
            Une eau qui<br />signe vos <em style={{ color: pal.accent }}>institutions</em>.
          </h2>
          <div className="right" style={{ color: pal.muted }}>
            <span className="idx" style={{ color: pal.accent }}>SECTEURS · 04</span>
            Le site adopte instantanément les couleurs, la signature et le poster de l'institution choisie.
          </div>
        </div>

        <div className="inst-tabs" style={{ borderBottomColor: pal.muted }}>
          {SECTORS.map((s) => (
            <div
              key={s.id}
              className={"inst-tab" + (active.id === s.id ? " active" : "")}
              onClick={() => setActive(s)}
              style={{
                color: active.id === s.id ? pal.text : pal.muted,
                borderBottomColor: active.id === s.id ? pal.accent : "transparent"
              }}
            >
              {s.short}
            </div>
          ))}
        </div>

        <div className="inst-layout">
          <div className="inst-copy">
            <div className="signature" style={{ color: pal.accent }}>{active.cat} · République du Niger</div>
            <h3 style={{ color: pal.text }}>{active.long}</h3>
            <p
              style={{ color: pal.accent, fontFamily: "var(--serif)", fontStyle: "italic", fontSize: 22, marginBottom: 28, lineHeight: 1.3 }}
            >
              « {active.motto} »
            </p>
            <p className="desc" style={{ color: pal.muted }}>{active.body}</p>
            <div className="inst-pillars">
              {active.pillars.map((p, i) => (
                <div key={i} className="pillar" style={{ borderTopColor: pal.muted }}>
                  <div className="num" style={{ color: pal.accent }}>0{i + 1}</div>
                  <h5 style={{ color: pal.text }}>{p.t}</h5>
                  <p style={{ color: pal.muted }}>{p.d}</p>
                </div>
              ))}
            </div>
            <div className="inst-actions">
              <button className="btn-pill solid-acc magnet" style={{ background: pal.accent, color: pal.bg }} onClick={() => openModal("config", { inst: active.long })}>
                Personnaliser cette édition →
              </button>
              <button className="btn-pill ghost magnet" style={{ borderColor: pal.muted, color: pal.text }} onClick={() => openModal("devis", { inst: active.long })}>
                Devis officiel
              </button>
            </div>
          </div>

          <InstitutionalCard sector={active} onZoom={() => setZoom(true)} />
        </div>

        <div className="inst-thumbs">
          {SECTORS.map((s) => (
            <button
              key={s.id}
              className={"thumb" + (active.id === s.id ? " active" : "")}
              onClick={() => setActive(s)}
              style={{
                borderColor: active.id === s.id ? s.palette.accent : "transparent"
              }}
            >
              <img src={s.img} alt={s.short} />
              <div className="thumb-cap" style={{ background: s.palette.bg, color: s.palette.text }}>{s.short}</div>
            </button>
          ))}
        </div>
      </div>

      {zoom && (
        <div className="poster-lightbox" onClick={() => setZoom(false)}>
          <button className="lb-close" aria-label="Fermer">✕</button>
          <img src={active.img} alt={active.short} />
          <div className="lb-meta">
            <div className="lb-eye">{active.cat} · {active.code}</div>
            <div className="lb-name">{active.long}</div>
          </div>
        </div>
      )}
    </section>
  );
}

function GammeCard({ g, i }) {
  const ref = useRef2(null);
  useEffect2(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    function onMove(e) {
      const r = el.getBoundingClientRect();
      const x = ((e.clientX - r.left) / r.width - 0.5);
      const y = ((e.clientY - r.top) / r.height - 0.5);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1200px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
        el.style.setProperty("--glare-x", ((e.clientX - r.left) / r.width * 100) + "%");
        el.style.setProperty("--glare-y", ((e.clientY - r.top) / r.height * 100) + "%");
        el.style.setProperty("--glare-o", "0.25");
      });
    }
    function onLeave() {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(1200px) rotateY(0) rotateX(0)";
      el.style.setProperty("--glare-o", "0");
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div className="gamme" ref={ref} style={{ animationDelay: (i * 0.06) + "s" }}>
      <div className="tag">{g.tag}</div>
      <div className="img-wrap">
        <img src={g.img} alt={g.name} />
      </div>
      <h4>{g.name}</h4>
      <div className="vol">{g.vol}</div>
      <div className="desc">{g.desc}</div>
      <div className="meta-row">
        <div className="price">
          <span className="price-tag">Tarification négociée</span>
          <small>selon partenariat institutionnel</small>
        </div>
        <button className="arrow" onClick={() => openModal("devis", { inst: g.name, qty: g.vol })} aria-label={"Demander un devis pour " + g.name}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
      <div className="gamme-glare"></div>
    </div>
  );
}

function Gammes() {
  return (
    <section className="gammes" id="gammes" data-screen-label="06 Gammes">
      <div className="shell">
        <div className="section-head reveal">
          <h2 className="display">Six <em>gammes</em>. Une signature.</h2>
          <div className="right">
            <span className="idx">CATALOGUE · 05</span>
            Du format poche au tirage de cérémonie, chaque référence pensée pour un usage précis.
          </div>
        </div>
        <div className="gamme-grid reveal">
          {PRODUCT_GAMME.map((g, i) => <GammeCard key={g.tag} g={g} i={i} />)}
        </div>
        <div className="gammes-cta reveal">
          <button className="btn-pill gold magnet" onClick={() => openModal("devis")}>
            Recevoir le catalogue HD →
          </button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Institutional, Gammes });
