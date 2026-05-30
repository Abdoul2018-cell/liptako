// Niger, Trust, CTA, Footer, Concierge, Loader
const { useState: useState3, useEffect: useEffect3, useRef: useRef3, useMemo: useMemo3 } = React;

const TERR_REGIONS = [
  { id: "tillaberi", name: "Tillabéri", x: 18, y: 60, role: "source", role_label: "Captage", note: "Nappe du Liptako-Gourma · 200 m de profondeur · pureté géologique", stat: "Source unique" },
  { id: "niamey",    name: "Niamey",    x: 22, y: 72, role: "hub",    role_label: "Usine",   note: "Centre d'embouteillage et studio design · 12 000 m² · ligne automatisée", stat: "Hub national" },
  { id: "dosso",     name: "Dosso",     x: 32, y: 76, role: "node",   role_label: "Corridor",note: "Couloir sud vers la frontière béninoise · livraison logistique 4×4", stat: "Corridor sud" },
  { id: "tahoua",    name: "Tahoua",    x: 42, y: 54, role: "node",   role_label: "Région",  note: "Pôle administratif · institutions régionales et préfectures", stat: "Pôle régional" },
  { id: "agadez",    name: "Agadez",    x: 56, y: 30, role: "node",   role_label: "Cérémonial",note: "Couloir saharien · cérémonies, hôtellerie d'exception, Aïr et Ténéré", stat: "Couloir saharien" },
  { id: "maradi",    name: "Maradi",    x: 54, y: 70, role: "node",   role_label: "Commerce", note: "Capitale économique · banques, marchés institutionnels, hôtels d'affaires", stat: "Capitale économique" },
  { id: "zinder",    name: "Zinder",    x: 70, y: 66, role: "node",   role_label: "Patrimoine",note: "Ancienne capitale impériale · sultans, palais, événementiel d'État", stat: "Couronne historique" },
  { id: "diffa",     name: "Diffa",     x: 88, y: 70, role: "node",   role_label: "Frontière",note: "Frontière est · diplomatie de proximité avec le bassin du Tchad", stat: "Frontière est" }
];

function Niger() {
  const [sel, setSel] = useState3("tillaberi");
  const [hover, setHover] = useState3(null);
  const [drawn, setDrawn] = useState3(false);

  // Auto-rotate selection when not hovered
  useEffect3(() => {
    if (hover) return;
    const id = setInterval(() => {
      setSel((cur) => {
        const i = TERR_REGIONS.findIndex((r) => r.id === cur);
        return TERR_REGIONS[(i + 1) % TERR_REGIONS.length].id;
      });
    }, 4200);
    return () => clearInterval(id);
  }, [hover]);

  // Trigger path draw animation on visibility
  const wrap = useRef3(null);
  useEffect3(() => {
    const el = wrap.current;
    if (!el) return;
    const io = new IntersectionObserver((es) => {
      es.forEach((e) => {
        if (e.isIntersecting) { setDrawn(true); io.unobserve(el); }
      });
    }, { threshold: 0.25 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const source = TERR_REGIONS.find((r) => r.role === "source");
  const cur = TERR_REGIONS.find((r) => r.id === sel) || source;

  return (
    <section className="niger" id="niger" data-screen-label="07 Territoire">
      <div className="shell">
        <div className="section-head reveal" style={{ marginBottom: 32 }}>
          <h2 className="display">Un territoire, <em>huit régions</em>.</h2>
          <div className="right">
            <span className="idx">TERRITOIRE · 07</span>
            De la nappe du Liptako-Gourma à la frontière du Tchad, une eau livrée aux institutions partout au Niger.
          </div>
        </div>
        <div className="niger-marquee reveal">
          <span>Sahel · <em>Niger</em> · Liptako · <em>Fierté</em> ·&nbsp;</span>
        </div>

        <div className="territoire reveal" ref={wrap}>
          <div className="terr-map">
            <div className="terr-grid"></div>
            <div className="terr-axis-y"></div>
            <div className="terr-axis-x"></div>
            <div className="terr-corner tl">N · 23°</div>
            <div className="terr-corner tr">E · 16°</div>
            <div className="terr-corner bl">N · 12°</div>
            <div className="terr-corner br">CARTE · OPS · 2026</div>

            <svg className="terr-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="pathGrad" x1="0" x2="1">
                  <stop offset="0" stopColor="#B8860B" stopOpacity="0.9" />
                  <stop offset="1" stopColor="#0F6E56" stopOpacity="0.4" />
                </linearGradient>
                <radialGradient id="sourceGlow">
                  <stop offset="0" stopColor="#B8860B" stopOpacity="0.5" />
                  <stop offset="1" stopColor="#B8860B" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Distribution paths from source */}
              {TERR_REGIONS.filter((r) => r.role !== "source").map((r, i) => {
                const dx = r.x - source.x;
                const dy = r.y - source.y;
                const mx = source.x + dx * 0.5 + (dy > 0 ? -6 : 6);
                const my = source.y + dy * 0.5 + (dx > 0 ? -4 : 4);
                return (
                  <path
                    key={r.id}
                    d={`M${source.x},${source.y} Q${mx},${my} ${r.x},${r.y}`}
                    fill="none"
                    stroke="url(#pathGrad)"
                    strokeWidth="0.3"
                    strokeDasharray="120"
                    strokeDashoffset={drawn ? 0 : 120}
                    style={{
                      transition: `stroke-dashoffset 1.6s ${0.2 + i * 0.12}s cubic-bezier(0.2, 0.8, 0.2, 1)`,
                      opacity: sel === r.id ? 1 : 0.45
                    }}
                  />
                );
              })}

              {/* Animated traveling dots along paths to selected node */}
              {sel !== source.id && (() => {
                const r = TERR_REGIONS.find((x) => x.id === sel);
                const dx = r.x - source.x;
                const dy = r.y - source.y;
                const mx = source.x + dx * 0.5 + (dy > 0 ? -6 : 6);
                const my = source.y + dy * 0.5 + (dx > 0 ? -4 : 4);
                return [0, 1, 2].map((i) => (
                  <circle key={i} r="0.6" fill="#B8860B">
                    <animateMotion dur="3s" repeatCount="indefinite" begin={i * 1 + "s"} path={`M${source.x},${source.y} Q${mx},${my} ${r.x},${r.y}`} />
                  </circle>
                ));
              })()}

              {/* Source halo */}
              <circle cx={source.x} cy={source.y} r="6" fill="url(#sourceGlow)" className="src-halo" />
            </svg>

            {/* Nodes */}
            {TERR_REGIONS.map((r) => (
              <button
                key={r.id}
                className={"terr-node " + r.role + (sel === r.id ? " active" : "")}
                style={{ left: r.x + "%", top: r.y + "%" }}
                onMouseEnter={() => { setHover(r.id); setSel(r.id); }}
                onMouseLeave={() => setHover(null)}
                onClick={() => setSel(r.id)}
              >
                <span className="dot"></span>
                <span className="ring"></span>
                {r.role === "source" && <span className="ring r2"></span>}
                <span className="lbl">{r.name}</span>
                {r.role === "source" && <span className="tag">SOURCE</span>}
                {r.role === "hub" && <span className="tag">USINE</span>}
              </button>
            ))}

            <div className="terr-legend">
              <div><span className="lg-dot src"></span>Captage</div>
              <div><span className="lg-dot hub"></span>Embouteillage</div>
              <div><span className="lg-dot node"></span>Distribution</div>
            </div>
          </div>

          <div className="terr-panel">
            <div className="tp-stamp">
              <span>FICHE TERRITOIRE</span>
              <span className="tp-code">{cur.id.toUpperCase()} · 0{TERR_REGIONS.findIndex(r => r.id === cur.id) + 1}/8</span>
            </div>
            <div className="tp-body" key={cur.id}>
              <div className="tp-role">{cur.role_label}</div>
              <h3 className="tp-name">{cur.name}</h3>
              <div className="tp-stat">{cur.stat}</div>
              <p className="tp-note">{cur.note}</p>

              <div className="tp-coords">
                <div><span>LAT</span><span className="v">{(14 + cur.y / 100 * 8).toFixed(2)}° N</span></div>
                <div><span>LON</span><span className="v">{(0 + cur.x / 100 * 16).toFixed(2)}° E</span></div>
                <div><span>STATUT</span><span className="v live">ACTIF</span></div>
              </div>
            </div>

            <div className="tp-strip">
              {TERR_REGIONS.map((r, i) => (
                <button
                  key={r.id}
                  className={"tp-pill" + (sel === r.id ? " on" : "")}
                  onClick={() => setSel(r.id)}
                  onMouseEnter={() => { setHover(r.id); setSel(r.id); }}
                  onMouseLeave={() => setHover(null)}
                >
                  <span className="i">0{i + 1}</span> {r.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="terr-bands reveal">
          <div className="band">
            <div className="band-num"><Counter to={8} /></div>
            <div className="band-lab">Régions desservies</div>
            <div className="band-sub">Niamey, Tillabéri, Dosso, Tahoua, Maradi, Zinder, Agadez, Diffa</div>
          </div>
          <div className="band">
            <div className="band-num"><Counter to={200} /><sup>m</sup></div>
            <div className="band-lab">Profondeur de captage</div>
            <div className="band-sub">Nappe protégée du Liptako-Gourma · à l'abri des contaminations</div>
          </div>
          <div className="band">
            <div className="band-num"><Counter to={1267} /></div>
            <div className="band-lab">Km de routage logistique</div>
            <div className="band-sub">Niamey → Diffa, livraison institutionnelle conditionnée</div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Counter({ to, suffix }) {
  const [v, setV] = useState3(0);
  const ref = useRef3();
  useEffect3(() => {
    const el = ref.current;
    if (!el) return;
    let started = false;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started) {
          started = true;
          const dur = 1400;
          const start = performance.now();
          const tick = (now) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3);
            setV(Math.round(to * eased));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.5 });
    io.observe(el);
    return () => io.disconnect();
  }, [to]);
  return <span ref={ref}>{v.toLocaleString("fr-FR")}{suffix ? <sup>{suffix}</sup> : null}</span>;
}

function Trust() {
  return (
    <section className="trust" id="trust" data-screen-label="08 Prestige">
      <div className="shell">
        <div className="section-head reveal">
          <h2 className="display">La <em>confiance</em>, mesurable.</h2>
          <div className="right">
            <span className="idx">PRESTIGE · 08</span>
            Une marque protégée, des partenariats officiels, une exigence sanitaire conforme aux plus hautes normes.
          </div>
        </div>

        <div className="trust-stats reveal">
          <div className="trust-stat">
            <div className="num"><Counter to={17} /></div>
            <div className="lab">Pays protégés OAPI</div>
          </div>
          <div className="trust-stat">
            <div className="num"><Counter to={12} /></div>
            <div className="lab">Institutions partenaires</div>
          </div>
          <div className="trust-stat">
            <div className="num"><Counter to={250000} /></div>
            <div className="lab">Bouteilles · 1<sup>er</sup> trimestre</div>
          </div>
          <div className="trust-stat">
            <div className="num"><Counter to={100} suffix="%" /></div>
            <div className="lab">Conformité OMS / UEMOA</div>
          </div>
        </div>

        <div className="partner-grid reveal">
          {SECTORS.map((s) => (
            <button key={s.id} className="partner" onClick={() => openModal("devis", { inst: s.long })}>
              <div className="cat">{s.cat}</div>
              <div className="name">{s.short}</div>
              <div className="partner-go">Édition dédiée →</div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaStrip() {
  return (
    <section className="cta-strip" data-screen-label="09 CTA">
      <div className="cta-bg-anim" aria-hidden="true">
        <div className="orb o1"></div>
        <div className="orb o2"></div>
        <div className="orb o3"></div>
      </div>
      <div className="shell">
        <div className="inner">
          <h2 className="display">
            Mettez votre <em>signature</em><br />en bouteille.
          </h2>
          <div className="right">
            <p>
              Notre équipe institutionnelle revient vers vous sous 24 heures, devis HD à l'appui.
              Présérie possible en sept jours ouvrés.
            </p>
            <div className="row">
              <button className="btn-pill gold magnet" onClick={() => openModal("sample")}>Demander un échantillon</button>
              <button className="btn-pill ghost magnet" onClick={() => openModal("rdv")}>Prendre rendez-vous</button>
              <button className="btn-pill ghost magnet" onClick={() => openModal("whatsapp")}>WhatsApp Business</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="foot" data-screen-label="10 Footer">
      <div className="shell">
        <div className="foot-grid">
          <div className="foot-brand">
            <div className="mark"><span className="dot"></span>liptako</div>
            <p>
              Première eau minérale institutionnelle premium du Niger. Captée dans le Liptako-Gourma, signée à votre image.
            </p>
          </div>
          <div>
            <h6>Marque</h6>
            <ul>
              <li><a href="#manifeste">Manifeste</a></li>
              <li><a href="#chapters">Notre source</a></li>
              <li><a href="#niger">Le Niger</a></li>
              <li><a href="#">Presse</a></li>
            </ul>
          </div>
          <div>
            <h6>Produits</h6>
            <ul>
              <li><a href="#gammes">Gammes</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openModal("config"); }}>Personnalisation</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openModal("devis"); }}>Catalogue HD</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openModal("devis"); }}>Fiche technique</a></li>
            </ul>
          </div>
          <div>
            <h6>Clients</h6>
            <ul>
              <li><a href="#institutional">Ministères</a></li>
              <li><a href="#institutional">Banques</a></li>
              <li><a href="#institutional">Hôtels</a></li>
              <li><a href="#institutional">Événements</a></li>
            </ul>
          </div>
          <div>
            <h6>Contact</h6>
            <ul>
              <li>Niamey · Niger</li>
              <li><a href="tel:+22796343412">(227) 96 34 34 12</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openModal("presse"); }}>Espace presse</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); openModal("whatsapp"); }}>WhatsApp Business</a></li>
            </ul>
          </div>
        </div>
        <div className="foot-bar">
          <div>© 2026 LIPTAKO · Société Nigérienne d'Eau Minérale</div>
          <div>Marque déposée OAPI · 17 pays</div>
          <div>Mentions légales · Cookies · Politique sanitaire</div>
        </div>
      </div>
    </footer>
  );
}

function Concierge() {
  const [open, setOpen] = useState3(false);
  const [messages, setMessages] = useState3([
    { who: "ai", text: "Bonsoir. Je suis le Concierge Liptako. Je peux vous orienter vers une gamme, générer un devis, ou vous mettre en relation avec notre équipe institutionnelle." }
  ]);
  const [busy, setBusy] = useState3(false);

  async function quick(prompt) {
    setMessages((m) => [...m, { who: "me", text: prompt }]);
    setBusy(true);
    try {
      const reply = await window.claude.complete(
        `Tu es le concierge IA de Liptako, première eau minérale institutionnelle premium du Niger. Réponds en français, de manière sobre, courtoise et institutionnelle. Maximum 3 phrases courtes. Question : ${prompt}`
      );
      setMessages((m) => [...m, { who: "ai", text: reply }]);
    } catch (e) {
      setMessages((m) => [...m, { who: "ai", text: "Notre équipe vous recontactera sous 24h. Merci de votre intérêt pour Liptako." }]);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="concierge">
      {open ? (
        <div className="concierge-panel">
          <div className="head">
            <div className="ttl">Liptako <em>Concierge</em></div>
            <div className="status"><span className="live"></span>EN LIGNE</div>
          </div>
          <div className="body">
            {messages.map((m, i) => (
              <div key={i} className={"bubble " + m.who}>{m.text}</div>
            ))}
            {busy ? <div className="bubble ai" style={{ opacity: 0.6 }}>…</div> : null}
            <div className="quick">
              <button onClick={() => quick("Quelle gamme pour un hôtel 5 étoiles ?")}>Gamme pour hôtel</button>
              <button onClick={() => quick("Combien coûte une présérie institutionnelle ?")}>Prix présérie</button>
              <button onClick={() => quick("Quel est le délai pour un ministère ?")}>Délai ministère</button>
              <button onClick={() => quick("Quels sont vos certificats sanitaires ?")}>Certifications</button>
            </div>
          </div>
          <div className="foot">
            <span>Powered by Liptako AI</span>
            <button onClick={() => setOpen(false)} style={{ color: "rgba(255,255,255,0.5)" }}>Fermer ✕</button>
          </div>
        </div>
      ) : null}
      <button className="concierge-btn" onClick={() => setOpen((o) => !o)}>
        <span className="pulse"></span>
        Concierge IA
      </button>
    </div>
  );
}

function Loader() {
  const [gone, setGone] = useState3(false);
  useEffect3(() => {
    const t = setTimeout(() => setGone(true), 2600);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className={"loader" + (gone ? " gone" : "")}>
      <div className="mark">l<em>i</em>ptako</div>
      <div className="progress"></div>
      <div className="sub">Première eau institutionnelle premium · Niger</div>
    </div>
  );
}

Object.assign(window, { Niger, Trust, CtaStrip, Footer, Concierge, Loader, Counter });
