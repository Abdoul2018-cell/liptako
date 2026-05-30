// Cross-cutting interactions: modal bus, tilt, magnetic, scroll progress
const { useState: uS, useEffect: uE, useRef: uR, useCallback: uC } = React;

// ---- Event bus: any button can open the modal --------------------------
function openModal(mode = "sample", prefill = {}) {
  window.dispatchEvent(new CustomEvent("liptako:open-modal", { detail: { mode, prefill } }));
}
function closeModal() {
  window.dispatchEvent(new CustomEvent("liptako:close-modal"));
}

// ---- 3D tilt hook ------------------------------------------------------
function useTilt({ max = 10, scale = 1.02, glare = true } = {}) {
  const ref = uR(null);
  uE(() => {
    const el = ref.current;
    if (!el) return;
    let raf = 0;
    let rect = null;
    const update = () => { rect = el.getBoundingClientRect(); };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);

    function onMove(e) {
      if (!rect) update();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      const rx = (-dy * max).toFixed(2);
      const ry = (dx * max).toFixed(2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
        if (glare) {
          const gx = ((e.clientX - rect.left) / rect.width) * 100;
          const gy = ((e.clientY - rect.top) / rect.height) * 100;
          el.style.setProperty("--glare-x", gx + "%");
          el.style.setProperty("--glare-y", gy + "%");
          el.style.setProperty("--glare-o", "0.45");
        }
      });
    }
    function onLeave() {
      cancelAnimationFrame(raf);
      el.style.transform = "perspective(1200px) rotateX(0) rotateY(0) scale(1)";
      el.style.setProperty("--glare-o", "0");
    }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
      ro.disconnect();
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
      cancelAnimationFrame(raf);
    };
  }, [max, scale, glare]);
  return ref;
}

// ---- Magnetic button hook ---------------------------------------------
function useMagnetic({ strength = 0.35 } = {}) {
  const ref = uR(null);
  uE(() => {
    const el = ref.current;
    if (!el) return;
    function onMove(e) {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    }
    function onLeave() { el.style.transform = "translate(0,0)"; }
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return ref;
}

// ---- Cursor parallax (mouse-driven translate)
function useCursorParallax({ strength = 20 } = {}) {
  const ref = uR(null);
  uE(() => {
    const el = ref.current;
    if (!el) return;
    function onMove(e) {
      const x = (e.clientX / window.innerWidth - 0.5) * strength;
      const y = (e.clientY / window.innerHeight - 0.5) * strength;
      el.style.setProperty("--px", x + "px");
      el.style.setProperty("--py", y + "px");
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [strength]);
  return ref;
}

// ---- Scroll progress bar ----------------------------------------------
function ScrollProgress() {
  const [p, setP] = uS(0);
  uE(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const sh = h.scrollHeight - h.clientHeight;
      setP(sh > 0 ? (h.scrollTop / sh) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <div className="scroll-progress">
      <div className="scroll-progress-fill" style={{ width: p + "%" }}></div>
    </div>
  );
}

// ---- Custom dot cursor (subtle gold dot) -------------------------------
function CursorDot() {
  const ref = uR(null);
  const ring = uR(null);
  uE(() => {
    if (window.matchMedia("(pointer: coarse)").matches) return;
    const d = ref.current;
    const r = ring.current;
    if (!d || !r) return;
    let mx = 0, my = 0, rx = 0, ry = 0;
    function onMove(e) { mx = e.clientX; my = e.clientY; d.style.transform = `translate(${mx}px, ${my}px)`; }
    let raf;
    function tick() {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      r.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(tick);
    }
    tick();
    window.addEventListener("mousemove", onMove);
    const overEls = document.querySelectorAll("a, button, .swatch, .gamme, .niger-card, .inst-tab");
    overEls.forEach(el => {
      el.addEventListener("mouseenter", () => r.classList.add("hover"));
      el.addEventListener("mouseleave", () => r.classList.remove("hover"));
    });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);
  return (
    <>
      <div className="cursor-dot" ref={ref}></div>
      <div className="cursor-ring" ref={ring}></div>
    </>
  );
}

// ---- The Modal (sample request, devis, rdv, presse) -------------------
const MODAL_PRESETS = {
  sample: {
    eyebrow: "Demande d'échantillon",
    title: "Recevoir un échantillon",
    sub: "Présérie expédiée sous sept jours ouvrés à l'adresse de votre institution.",
    cta: "Envoyer la demande",
    confirm: "Votre demande d'échantillon est enregistrée. Notre équipe vous recontactera sous 24h."
  },
  devis: {
    eyebrow: "Devis officiel",
    title: "Générer un devis",
    sub: "Tarification confidentielle, transmise par courrier institutionnel sous 24h.",
    cta: "Recevoir le devis",
    confirm: "Devis en préparation. Vous recevrez le document HD signé sous 24h."
  },
  rdv: {
    eyebrow: "Rendez-vous",
    title: "Prendre rendez-vous",
    sub: "Visite d'usine, présentation produit, ou réunion protocolaire.",
    cta: "Confirmer le rendez-vous",
    confirm: "Notre équipe institutionnelle revient vers vous pour confirmer les créneaux."
  },
  presse: {
    eyebrow: "Espace presse",
    title: "Accréditation presse",
    sub: "Dossier presse, photos HD, accès aux événements de lancement.",
    cta: "Demander l'accréditation",
    confirm: "Dossier presse en cours d'envoi à l'adresse renseignée."
  },
  whatsapp: {
    eyebrow: "WhatsApp Business",
    title: "Conversation WhatsApp",
    sub: "Échange direct avec un conseiller institutionnel, du dimanche au jeudi.",
    cta: "Démarrer la conversation",
    confirm: "Lien de conversation envoyé. Ouvrez WhatsApp pour continuer."
  },
  config: {
    eyebrow: "Configuration sur-mesure",
    title: "Personnaliser une édition",
    sub: "Notre studio design conçoit une étiquette aux couleurs de votre institution. Tirage minimum 5 000 unités.",
    cta: "Lancer la configuration",
    confirm: "Brief reçu. Notre studio vous propose trois pistes sous 72h."
  }
};

function Modal() {
  const [open, setOpen] = uS(false);
  const [mode, setMode] = uS("sample");
  const [sent, setSent] = uS(false);
  const [form, setForm] = uS({ name: "", inst: "", role: "", email: "", phone: "", qty: "5 000", message: "" });

  uE(() => {
    const onOpen = (e) => {
      setMode(e.detail.mode || "sample");
      setForm((f) => ({ ...f, ...(e.detail.prefill || {}) }));
      setSent(false);
      setOpen(true);
      document.body.style.overflow = "hidden";
    };
    const onClose = () => { setOpen(false); document.body.style.overflow = ""; };
    window.addEventListener("liptako:open-modal", onOpen);
    window.addEventListener("liptako:close-modal", onClose);
    return () => {
      window.removeEventListener("liptako:open-modal", onOpen);
      window.removeEventListener("liptako:close-modal", onClose);
      document.body.style.overflow = "";
    };
  }, []);

  uE(() => {
    function onKey(e) { if (e.key === "Escape") closeModal(); }
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;
  const preset = MODAL_PRESETS[mode] || MODAL_PRESETS.sample;

  function submit(e) {
    e.preventDefault();
    setSent(true);
    setTimeout(() => { closeModal(); setSent(false); }, 2800);
  }

  return (
    <div className="modal-overlay" onClick={(e) => { if (e.target === e.currentTarget) closeModal(); }}>
      <div className="modal-shell" role="dialog" aria-modal="true">
        <button className="modal-close" onClick={closeModal} aria-label="Fermer">✕</button>
        <div className="modal-side">
          <div className="modal-mark">l<em>i</em>ptako</div>
          <div>
            <div className="modal-eyebrow">{preset.eyebrow}</div>
            <h3 className="modal-title">{preset.title}</h3>
            <p className="modal-sub">{preset.sub}</p>
          </div>
          <div className="modal-meta">
            <div className="row"><span>RÉF</span><span className="v">LIP-2026-{mode.toUpperCase().slice(0,4)}</span></div>
            <div className="row"><span>TRAITEMENT</span><span className="v">&lt; 24h</span></div>
            <div className="row"><span>CANAL</span><span className="v">Institutionnel · Confidentiel</span></div>
          </div>
        </div>
        <div className="modal-form-wrap">
          {sent ? (
            <div className="modal-sent">
              <div className="modal-check">
                <svg viewBox="0 0 60 60" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <circle cx="30" cy="30" r="28" opacity="0.4" />
                  <path d="M18 30l8 8 16-16" className="check-path" />
                </svg>
              </div>
              <div className="modal-confirm">{preset.confirm}</div>
              <div className="modal-ref">Référence d'envoi · LIP-2026-{mode.toUpperCase().slice(0,4)}-{Math.floor(Math.random() * 9000 + 1000)}</div>
            </div>
          ) : (
            <form className="modal-form" onSubmit={submit}>
              <div className="form-row">
                <label>
                  <span>Nom complet</span>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Aïssata Diallo" />
                </label>
                <label>
                  <span>Fonction</span>
                  <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Directrice du protocole" />
                </label>
              </div>
              <label>
                <span>Institution</span>
                <input required value={form.inst} onChange={(e) => setForm({ ...form, inst: e.target.value })} placeholder="Ministère, banque, hôtel, événement…" />
              </label>
              <div className="form-row">
                <label>
                  <span>Email</span>
                  <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="protocole@ministere.ne" />
                </label>
                <label>
                  <span>Téléphone</span>
                  <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+227 …" />
                </label>
              </div>
              {(mode === "devis" || mode === "config") && (
                <label>
                  <span>Volume estimé</span>
                  <select value={form.qty} onChange={(e) => setForm({ ...form, qty: e.target.value })}>
                    <option>100 unités · échantillon</option>
                    <option>5 000 unités · pilote</option>
                    <option>25 000 unités · série</option>
                    <option>100 000 unités · production</option>
                    <option>500 000+ unités · campagne</option>
                  </select>
                </label>
              )}
              <label>
                <span>Précisions</span>
                <textarea rows="3" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Date d'événement, contraintes protocolaires, charte graphique…"></textarea>
              </label>
              <div className="form-cta">
                <button type="button" className="btn-block ghost" onClick={closeModal}>Annuler</button>
                <button type="submit" className="btn-block solid">{preset.cta} →</button>
              </div>
              <div className="form-note">
                En soumettant ce formulaire, vous acceptez d'être contacté par notre équipe institutionnelle. Vos données restent confidentielles.
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  openModal, closeModal, useTilt, useMagnetic, useCursorParallax,
  ScrollProgress, CursorDot, Modal
});
