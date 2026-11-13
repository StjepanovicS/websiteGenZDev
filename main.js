document.addEventListener("DOMContentLoaded", () => {
  const hasIO = "IntersectionObserver" in window;

  // Header-Linie erst nach dem Scrollen. Schreibt nur bei Zustandswechsel,
  // nicht bei jedem Scroll-Event (spart Style-Neuberechnungen).
  const header = document.querySelector("[data-header]");
  let scrolled = null;
  const onScroll = () => {
    const next = window.scrollY > 8;
    if (next === scrolled) return;
    scrolled = next;
    header.setAttribute("data-scrolled", next);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // Puls der Statuskarte nur, solange sie sichtbar ist
  const statusCard = document.querySelector(".status-card");
  if (statusCard && hasIO) {
    new IntersectionObserver(([entry]) => {
      statusCard.setAttribute("data-offscreen", !entry.isIntersecting);
    }).observe(statusCard);
  }

  // App-Showcase: läuft von selbst ab, sobald die Sektion im Bild ist
  // (früher per Scroll – da dachten viele, die Seite sei zu Ende).
  // Fortschritt p 0…1 über die Zeit: Drehung → Bildschirm an (Logo) →
  // App-Inhalt → Chat-Nachrichten. Danach kurz stehen lassen, Bildschirm
  // ausblenden und ab „Bildschirm aus“ wiederholen; gedreht wird nur einmal.
  // Außerhalb des Bildes oder im Hintergrund-Tab pausiert die Szene.
  const showcase = document.querySelector("[data-showcase]");
  if (showcase && document.documentElement.classList.contains("motion")) {
    const device = showcase.querySelector("[data-device]");
    const screen = showcase.querySelector("[data-screen]");
    const boot = showcase.querySelector("[data-boot]");
    const glass = showcase.querySelector("[data-glass]");
    const glow = showcase.querySelector("[data-glow]");
    const bubbles = [...showcase.querySelectorAll("[data-bubble]")];
    const steps = [...showcase.querySelectorAll("[data-step]")];

    const clamp = (v) => Math.min(1, Math.max(0, v));
    const range = (p, from, to) => clamp((p - from) / (to - from));
    const smooth = (t) => t * t * (3 - 2 * t);

    const PLAY = 8000; // ms für p 0 → 1
    const HOLD = 3500; // Endbild stehen lassen
    const FADE = 500;  // Bildschirm aus
    const LOOP_FROM = 0.2; // Wiederholung: Handy steht schon, Bildschirm dunkel

    let activeStep = 0;
    let spun = false; // Drehung nur beim ersten Durchlauf
    let p = 0, phase = "play", phaseTime = 0;

    const render = (dim = 1) => {
      if (p >= 0.36) spun = true;
      const t = spun ? 1 : smooth(range(p, 0, 0.36)); // nach vorn drehen
      const k = 1 - t;
      const lift = window.innerWidth < 900 ? 3 : 8;
      device.style.transform =
        `translateY(${k * lift}vh) rotateX(${k * 22}deg) rotateY(${k * -34}deg) rotateZ(${k * -10}deg) scale(${0.86 + t * 0.14})`;
      glass.style.transform = `translateX(${(t - 0.5) * 70}%)`;

      const power = range(p, 0.32, 0.38); // Bildschirm geht an: Logo
      boot.style.opacity = power * (1 - range(p, 0.42, 0.47)) * dim;
      screen.style.opacity = range(p, 0.43, 0.49) * dim; // App erscheint
      glow.style.opacity = range(p, 0.32, 0.46) * dim;

      bubbles.forEach((el, i) => {
        const s = smooth(range(p, 0.52 + i * 0.09, 0.59 + i * 0.09));
        el.style.opacity = s * dim;
        el.style.transform = `translateY(${(1 - s) * 12}px) scale(${0.96 + s * 0.04})`;
      });

      const step = p < 0.3 ? 0 : p < 0.5 ? 1 : 2;
      if (step !== activeStep) {
        steps[activeStep].classList.remove("is-active");
        steps[step].classList.add("is-active");
        activeStep = step;
      }
    };

    let running = false, last = 0, raf = 0;
    const tick = (now) => {
      const dt = Math.min(now - last, 50); // nach Tab-Wechsel nicht springen
      last = now;
      phaseTime += dt;
      if (phase === "play") {
        p = Math.min(1, p + dt / PLAY);
        render();
        if (p >= 1) { phase = "hold"; phaseTime = 0; }
      } else if (phase === "hold") {
        if (phaseTime >= HOLD) { phase = "fade"; phaseTime = 0; }
      } else {
        const f = clamp(phaseTime / FADE);
        render(1 - f);
        if (f >= 1) { p = LOOP_FROM; phase = "play"; phaseTime = 0; render(); }
      }
      raf = requestAnimationFrame(tick);
    };
    const setRunning = (on) => {
      if (on === running) return;
      running = on;
      if (on) { last = performance.now(); raf = requestAnimationFrame(tick); }
      else cancelAnimationFrame(raf);
    };

    render();
    let visible = false;
    new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      setRunning(visible && !document.hidden);
    }, { threshold: 0.3 }).observe(showcase);
    document.addEventListener("visibilitychange", () => setRunning(visible && !document.hidden));
  }

  // Mobile Navigation
  const toggle = document.querySelector("[data-nav-toggle]");
  const list = document.querySelector("[data-nav-list]");
  const setNav = (open) => {
    toggle.setAttribute("aria-expanded", open);
    list.setAttribute("data-open", open);
  };
  toggle.addEventListener("click", () => setNav(toggle.getAttribute("aria-expanded") !== "true"));
  list.addEventListener("click", (e) => { if (e.target.closest("a")) setNav(false); });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setNav(false);
      toggle.focus();
    }
  });

  // Texte, die nur im Skript vorkommen. Alles andere steht im HTML der jeweiligen Sprache.
  const t = {
    de: {
      interest: (plan) => `Ich interessiere mich für „${plan}“.\n\n`,
      consent: "Bitte bestätigen Sie die Datenschutzhinweise.",
      missing: "Bitte füllen Sie Name, eine gültige E-Mail und Ihre Nachricht aus.",
      sent: "Danke! Ihr E-Mail-Programm öffnet sich mit der vorbereiteten Anfrage.",
      subject: "Projektanfrage",
      labels: ["Name", "Firma", "E-Mail", "Thema"],
      videoPlay: "Video abspielen",
      videoPause: "Video anhalten",
    },
    en: {
      interest: (plan) => `I'm interested in “${plan}”.\n\n`,
      consent: "Please confirm the privacy notice.",
      missing: "Please enter your name, a valid email address and your message.",
      sent: "Thank you! Your email app is opening with the prepared enquiry.",
      subject: "Project enquiry",
      labels: ["Name", "Company", "Email", "Topic"],
      videoPlay: "Play video",
      videoPause: "Pause video",
    },
  }[document.documentElement.lang === "en" ? "en" : "de"];

  // Paket-Buttons füllen das Formular vor
  const thema = document.getElementById("thema");
  const nachricht = document.getElementById("nachricht");
  document.querySelectorAll("[data-topic]").forEach((btn) => {
    btn.addEventListener("click", () => {
      thema.value = btn.dataset.topic;
      const plan = btn.closest(".plan")?.querySelector("h3")?.textContent;
      if (plan && !nachricht.value) nachricht.value = t.interest(plan);
    });
  });

  // Kontaktformular: Validierung, dann E-Mail-Programm öffnen.
  // TODO: Für Versand ohne E-Mail-Programm an einen eigenen Endpunkt (z. B. PHP-Mailer auf dem Server) anbinden.
  const form = document.querySelector("[data-contact-form]");
  const status = document.querySelector("[data-form-status]");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const invalid = [...form.elements].filter((f) => f.willValidate && !f.checkValidity());
    form.querySelectorAll("[aria-invalid]").forEach((f) => f.removeAttribute("aria-invalid"));
    if (invalid.length) {
      invalid.forEach((f) => f.setAttribute("aria-invalid", "true"));
      status.dataset.state = "error";
      status.textContent = invalid.some((f) => f.type === "checkbox") && invalid.length === 1 ? t.consent : t.missing;
      invalid[0].focus();
      return;
    }
    const d = new FormData(form);
    const topic = thema.selectedOptions[0].textContent;
    const [lName, lCompany, lEmail, lTopic] = t.labels;
    const body = `${lName}: ${d.get("name")}\n${lCompany}: ${d.get("firma") || "–"}\n${lEmail}: ${d.get("email")}\n${lTopic}: ${topic}\n\n${d.get("nachricht")}`;
    window.location.href = `mailto:info@genz-dev.com?subject=${encodeURIComponent(`${t.subject}: ${topic}`)}&body=${encodeURIComponent(body)}`;
    status.dataset.state = "ok";
    status.textContent = t.sent;
  });

  // Werbevideo in der Projektkarte: Datei lädt erst kurz bevor die Karte ins Bild
  // kommt, spielt nur, solange sie sichtbar ist, und lässt sich anhalten.
  // Bei reduzierter Bewegung startet es nicht von selbst.
  const video = document.querySelector("[data-autoplay-video]");
  if (video) {
    const toggle = video.parentElement.querySelector("[data-video-toggle]");
    let userPaused = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let visible = false;
    const load = () => {
      const sources = video.querySelectorAll("source[data-src]");
      if (!sources.length) return;
      sources.forEach((s) => { s.src = s.dataset.src; s.removeAttribute("data-src"); });
      video.load();
    };
    const play = () => video.play().catch(() => {});
    const setState = (paused) => {
      toggle.dataset.state = paused ? "paused" : "playing";
      toggle.setAttribute("aria-label", paused ? t.videoPlay : t.videoPause);
    };
    toggle.hidden = false;
    setState(true);
    toggle.addEventListener("click", () => {
      load();
      userPaused = !video.paused;
      if (userPaused) video.pause(); else play();
    });
    video.addEventListener("play", () => setState(false));
    video.addEventListener("pause", () => setState(true));
    if (hasIO) {
      new IntersectionObserver(([e]) => { if (e.isIntersecting) load(); }, { rootMargin: "400px 0px" }).observe(video);
      new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        if (visible) load(); // falls der Lade-Beobachter noch nicht dran war
        if (visible && !userPaused) play();
        else if (!visible && !video.paused) video.pause();
      }, { threshold: 0.35 }).observe(video);
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) video.pause();
        else if (visible && !userPaused) play();
      });
    }
  }

  // Kachel-Raster „Hinter den Kulissen“: läuft dauerhaft, wird aber außerhalb
  // des Bildes eingefroren, damit es beim Scrollen keine Rechenzeit kostet.
  const lab = document.querySelector("[data-lab]");
  if (lab && hasIO) {
    new IntersectionObserver(([e]) => lab.classList.toggle("is-offscreen", !e.isIntersecting)).observe(lab);
  }

  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear();
});
