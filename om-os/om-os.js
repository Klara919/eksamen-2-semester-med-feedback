document.addEventListener("DOMContentLoaded", () => {
  // Kør først når HTML er indlæst, så alle elementer findes.

  // === Unikke elementer (findes kun én gang) ===
  const el = {
    book: document.getElementById("book"),
    frontCover: document.getElementById("frontCover"),
    backCover: document.getElementById("backCover"),
    bookInner: document.getElementById("bookInner"),
    nav: document.getElementById("nav-book"),
    bookIntro: document.getElementById("bookIntro"),

    openBookBtn: document.getElementById("openBookBtn"),
    backToFrontBtn: document.getElementById("backToFrontBtn"),
    nextBtn: document.getElementById("nextBtn"),
    prevBtn: document.getElementById("prevBtn"),
  };

  // === Gentagne elementer (flere opslag) ===
  const pages = Array.from(document.querySelectorAll(".spread"));

  // === Tilstand ===
  let current = 0;                 // hvilket opslag vi er på (0 = første)
  let view = "front";              // "front" | "book" | "back"
  let mobileSide = "left";         // "left" | "right" (kun mobil)
  const isMobile = () => window.matchMedia("(max-width: 800px)").matches;

  // === Hjælpere ===
  const show = (node, displayValue) => { if (node) node.style.display = displayValue; };
  const visibility = (node, value) => { if (node) node.style.visibility = value; };

  function setMobileClass() {
    // CSS-klasser bruges til at vise venstre/højre side på mobil
    document.body.classList.toggle("mobile-left", mobileSide === "left");
    document.body.classList.toggle("mobile-right", mobileSide === "right");
  }

  function setActivePage(index) {
    // Sørger for at kun ét opslag er aktivt (har class .is-active)
    pages.forEach((p, i) => p.classList.toggle("is-active", i === index));
    current = index;
  }

  function resetBookPosition() {
    // Nulstiller, så bogen altid starter samme sted
    setActivePage(0);
    mobileSide = "left";
    setMobileClass();
  }

  // === Skift mellem forside / bog / bagside ===
  function setView(nextView) {
    view = nextView;

    const isFront = view === "front";
    const isBook = view === "book";
    const isBack = view === "back";

    // Åben/luk bog (CSS tager sig af det visuelle)
    el.book?.classList.toggle("open", isBook);

    // Hvad skal vises?
    show(el.frontCover, isFront ? "flex" : "none");
    show(el.bookInner, isBook ? "block" : "none");
    show(el.backCover, isBack ? "flex" : "none");

    // Nav vises kun når bogen er åben
    el.nav?.classList.toggle("visible", isBook);

    // Intro vises kun på forsiden
    visibility(el.bookIntro, isFront ? "visible" : "hidden");

    // Når man går til en “ny hovedvisning”, starter man pænt fra begyndelsen
    resetBookPosition();
  }

  // === Animation: trigges ved at tilføje/fjerne CSS-klasse ===
  function animateFlip(direction) {
    const activeSpread = pages[current];
    if (!activeSpread) return;

    const pageSides = activeSpread.querySelectorAll(".page");

    // Vælg hvilken side der “flippes”
    const pageToFlip = isMobile()
      ? (mobileSide === "left" ? pageSides[0] : pageSides[1])
      : (direction === "next" ? pageSides[1] : pageSides[0]);

    if (!pageToFlip) return;

    const cls = direction === "next" ? "flip-next" : "flip-prev";

    // Fjern + reflow + tilføj = animation kan gentages hver gang
    pageToFlip.classList.remove(cls);
    void pageToFlip.offsetWidth;
    pageToFlip.classList.add(cls);

    setTimeout(() => pageToFlip.classList.remove(cls), 450);
  }

  // === Navigation ===
  function next() {
    // Hvis bogen ikke er åben, skal næste/forrige ikke gøre noget
    if (view !== "book") return;

    if (isMobile()) {
      animateFlip("next");

      setTimeout(() => {
        // Mobil: venstre -> højre -> næste opslag
        if (mobileSide === "left") {
          mobileSide = "right";
          setMobileClass();
          return;
        }

        mobileSide = "left";
        setMobileClass();

        if (current < pages.length - 1) setActivePage(current + 1);
        else setView("back");
      }, 260);

      return;
    }

    // Desktop: direkte til næste opslag
    animateFlip("next");
    setTimeout(() => {
      if (current < pages.length - 1) setActivePage(current + 1);
      else setView("back");
    }, 260);
  }

  function prev() {
    if (view !== "book") return;

    if (isMobile()) {
      animateFlip("prev");

      setTimeout(() => {
        // Mobil: højre -> venstre -> forrige opslag
        if (mobileSide === "right") {
          mobileSide = "left";
          setMobileClass();
          return;
        }

        mobileSide = "right";
        setMobileClass();

        if (current > 0) setActivePage(current - 1);
        else setView("front");
      }, 260);

      return;
    }

    animateFlip("prev");
    setTimeout(() => {
      if (current > 0) setActivePage(current - 1);
      else setView("front");
    }, 260);
  }

  // === Events ===
  el.frontCover?.addEventListener("click", () => setView("book"));

  el.openBookBtn?.addEventListener("click", (e) => {
    e.stopPropagation(); // så klik ikke også rammer coveret
    setView("book");
  });

  el.backCover?.addEventListener("click", () => setView("front"));
  el.backToFrontBtn?.addEventListener("click", () => setView("front"));

  el.nextBtn?.addEventListener("click", next);
  el.prevBtn?.addEventListener("click", prev);

  // Klik på siderne (venstre = tilbage på desktop, højre = frem)
  pages.forEach((spread) => {
    const pageSides = spread.querySelectorAll(".page");
    pageSides[0]?.addEventListener("click", () => (isMobile() ? next() : prev()));
    pageSides[1]?.addEventListener("click", next);
  });

  // === Start ===
  setView("front");
});