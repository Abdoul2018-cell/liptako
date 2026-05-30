// Nav, Hero, Manifeste, Chapters
const { useState, useEffect, useRef } = React;

function useScrolled(threshold = 60) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("in");
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  });
}

function Nav() {
  const scrolled = useScrolled(40);
  return (
    <nav className={"nav" + (scrolled ? " scrolled" : "")} data-screen-label="Nav">
      <a href="#top" className="mark">
        <span className="dot"></span>
        liptako
      </a>
      <ul>
        <li><a href="#manifeste">Manifeste</a></li>
        <li><a href="#chapters">Source</a></li>
        <li><a href="#institutional">Institutions</a></li>
        <li><a href="#gammes">Gammes</a></li>
        <li><a href="#niger">Le Niger</a></li>
        <li><a href="#trust">Prestige</a></li>
      </ul>
      <div className="actions">
        <button className="btn-pill ghost" onClick={() => openModal("whatsapp")}>WhatsApp</button>
        <button className="btn-pill gold" onClick={() => openModal("sample")}>Demander un échantillon</button>
      </div>
    </nav>
  );
}

function useCountdown(targetDate) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0 });
  useEffect(() => {
    const tick = () => {
      const diff = Math.max(0, targetDate - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff % 86400000) / 3600000);
      const m = Math.floor((diff % 3600000) / 60000);
      const s = Math.floor((diff % 60000) / 1000);
      setT({ d, h, m, s });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [targetDate]);
  return t;
}

const HERO_EDITIONS = [
  { code: "AFF / 50CL", short: "Affaires Étrangères", cat: "Ministère" },
  { code: "DEF / 50CL", short: "Défense Nationale", cat: "Ministère" },
  { code: "JUS / 50CL", short: "Justice", cat: "Ministère" },
  { code: "ATL / 50CL", short: "Banque Atlantique", cat: "Finance" },
  { code: "BIA / 50CL", short: "BIA Niger", cat: "Finance" },
  { code: "RDS / 50CL", short: "Radisson Niamey", cat: "Hôtellerie" },
  { code: "SND / 50CL", short: "Sonidep", cat: "Énergie" },
  { code: "ENR / 50CL", short: "Ministère de l'Énergie", cat: "Ministère" }
];

const HERO_MINERAL = [
  { sym: "Ca²⁺", name: "Calcium", val: 38, max: 80, unit: "mg/L" },
  { sym: "Mg²⁺", name: "Magnésium", val: 12, max: 50, unit: "mg/L" },
  { sym: "Na⁺",  name: "Sodium", val: 8,  max: 50, unit: "mg/L" },
  { sym: "K⁺",   name: "Potassium", val: 2,  max: 30, unit: "mg/L" },
  { sym: "HCO₃⁻",name: "Bicarbonates", val: 142, max: 250, unit: "mg/L" },
  { sym: "pH",   name: "pH neutre", val: 7.2, max: 9, unit: "" }
];

function HeroDossier() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % HERO_EDITIONS.length), 2600);
    return () => clearInterval(id);
  }, []);
  const t = useCountdown(new Date("2026-08-03T18:00:00+01:00").getTime());

  return (
    <div className="dossier">
      <div className="dossier-head">
        <div className="dossier-stamp">
          <div className="stamp-line">DOSSIER OFFICIEL</div>
          <div className="stamp-num">N° 2026 · 001</div>
        </div>
        <div className="dossier-live">
          <span className="pulse"></span>EN ACTIVITÉ
        </div>
      </div>

      <div className="dossier-block">
        <div className="dossier-label">Édition courante</div>
        <div className="ticker">
          {HERO_EDITIONS.map((e, i) => (
            <div key={i} className={"ticker-row" + (i === idx ? " on" : "")}>
              <span className="t-code">{e.code}</span>
              <span className="t-name">{e.short}</span>
              <span className="t-cat">{e.cat}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="dossier-block">
        <div className="dossier-label">Analyse minérale · échantillon de référence</div>
        <div className="mineral-grid">
          {HERO_MINERAL.map((m, i) => (
            <div className="mineral-row" key={m.sym} style={{ animationDelay: (1.0 + i * 0.12) + "s" }}>
              <div className="m-head">
                <span className="m-sym">{m.sym}</span>
                <span className="m-name">{m.name}</span>
                <span className="m-val">{m.val}<small>{m.unit}</small></span>
              </div>
              <div className="m-bar">
                <div className="m-fill" style={{ "--w": Math.min(100, (m.val / m.max) * 100) + "%", animationDelay: (1.1 + i * 0.12) + "s" }}></div>
              </div>
            </div>
          ))}
        </div>
        <div className="mineral-foot">
          Eau minérale naturelle faiblement minéralisée · captée à 200 m · Liptako-Gourma, Niger
        </div>
      </div>

      <div className="dossier-foot">
        <div className="cd">
          <div className="cd-label">Cérémonie nationale · Fête de l'Indépendance</div>
          <div className="cd-grid">
            <div className="cd-u"><span>{String(t.d).padStart(2,"0")}</span><small>jours</small></div>
            <div className="cd-sep">:</div>
            <div className="cd-u"><span>{String(t.h).padStart(2,"0")}</span><small>h</small></div>
            <div className="cd-sep">:</div>
            <div className="cd-u"><span>{String(t.m).padStart(2,"0")}</span><small>min</small></div>
            <div className="cd-sep">:</div>
            <div className="cd-u"><span>{String(t.s).padStart(2,"0")}</span><small>s</small></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" id="top" data-screen-label="01 Hero">
      <div className="hero-grain"></div>
      <div className="hero-rule" aria-hidden="true">
        <span></span><span></span><span></span>
      </div>
      <div className="hero-grid">
        <div className="hero-copy">
          <div className="hero-eyebrow">
            <span className="l"></span>
            <span>Édition Officielle · Niger · 2026</span>
          </div>
          <h1 className="display split-in">
            <span>L'eau qui</span>
            <span>porte votre</span>
            <span><em>identité.</em></span>
          </h1>
          <p className="sub">
            Première eau minérale institutionnelle premium du Niger.
            Captée dans le Liptako-Gourma, embouteillée à Niamey, signée à votre image.
          </p>
          <div className="cta-row">
            <button className="btn-pill gold magnet" onClick={() => openModal("sample")}>
              <span>Demander un échantillon</span>
              <span className="arrow-i">→</span>
            </button>
            <button className="btn-pill ghost magnet" onClick={() => openModal("config")}>
              Personnaliser une édition
            </button>
          </div>
          <div className="hero-trust">
            <div className="ht-item"><span className="dot gold"></span>Marque OAPI · 17 pays</div>
            <div className="ht-item"><span className="dot"></span>Conforme OMS / UEMOA</div>
            <div className="ht-item"><span className="dot"></span>Capitaux nigériens</div>
          </div>
        </div>
        <div className="hero-dossier-wrap">
          <HeroDossier />
        </div>
      </div>
      <div className="meta">
        <div>
          <span>Lancement officiel · Niamey · Avril 2026</span>
        </div>
        <div className="scroll-cue">
          <span>Descendre</span>
          <div className="line"></div>
        </div>
      </div>
    </section>
  );
}

function Manifeste() {
  return (
    <section className="manifeste" id="manifeste" data-screen-label="02 Manifeste">
      <div className="shell">
        <div className="manifeste-grid">
          <div className="reveal">
            <div className="eyebrow muted" style={{ marginBottom: 24 }}>Le manifeste</div>
            <p>
              Cette eau ne se boit pas. <em>Elle se présente.</em>
            </p>
            <p>
              Sur une table d'État, dans une chambre d'hôtel, au creux d'une signature institutionnelle —
              Liptako transforme un geste quotidien en signe d'appartenance.
            </p>
            <p>
              <em>Une eau qui appartient à une nouvelle génération de marques africaines internationales.</em>
            </p>
            <div className="manifeste-cta">
              <button className="btn-pill ghost dark magnet" onClick={() => openModal("rdv")}>
                Visiter notre usine →
              </button>
            </div>
          </div>
          <div className="manifeste-stats reveal">
            <div className="stat">
              <div className="num">200<sup>m</sup></div>
              <div className="label">Profondeur de captage</div>
              <div className="desc">Nappe protégée du Liptako-Gourma, à l'abri des pollutions de surface.</div>
            </div>
            <div className="stat">
              <div className="num">07</div>
              <div className="label">Étapes de filtration</div>
              <div className="desc">Charbon actif, micro-filtration, UV. Aucun traitement chimique.</div>
            </div>
            <div className="stat">
              <div className="num">17</div>
              <div className="label">Pays protégés</div>
              <div className="desc">Marque déposée OAPI · 17 États d'Afrique de l'Ouest et Centrale.</div>
            </div>
            <div className="stat">
              <div className="num">100<sup>%</sup></div>
              <div className="label">Souveraineté nigérienne</div>
              <div className="desc">Captée, embouteillée, étiquetée au Niger. Capitaux locaux majoritaires.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Chapters() {
  return (
    <section className="chapters" id="chapters" data-screen-label="03 Source">
      <div className="shell">
        <div className="section-head">
          <h2 className="display">De la nappe à la <em>table d'État</em>.</h2>
          <div className="right">
            <span className="idx">CHAPITRES 01 — 06</span>
            Six étapes, une seule promesse : que chaque bouteille soit digne de la signature qu'elle porte.
          </div>
        </div>
        {NIGER_CHAPTERS.map((c, i) => (
          <div key={i} className="chapter reveal">
            <div className="num">0{i + 1}</div>
            <div className="title">{c.t}</div>
            <div className="desc">
              {c.d}
              <small>{c.code}</small>
            </div>
          </div>
        ))}
        <div className="chapters-cta reveal">
          <button className="btn-pill gold magnet" onClick={() => openModal("rdv")}>
            Programmer une visite guidée →
          </button>
        </div>
      </div>
    </section>
  );
}

Object.assign(window, { Nav, Hero, Manifeste, Chapters, useReveal, useScrolled });
