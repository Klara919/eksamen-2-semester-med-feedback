// Simpel tab-funktion til MAD / DRIKKE
document.addEventListener("DOMContentLoaded", () => {
  const tabs = document.querySelectorAll(".menu-tab");
  const panels = document.querySelectorAll(".menu-content");
  const page = document.querySelector(".menu-page");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const targetId = tab.dataset.target;

      // Skift aktiv knap
      tabs.forEach((t) => {
        const isActive = t === tab;
        t.classList.toggle("is-active", isActive);
        t.setAttribute("aria-selected", isActive ? "true" : "false");
      });

      // Vis/skjul indhold
      panels.forEach((panel) => {
        panel.classList.toggle("is-visible", panel.id === targetId);
      });

      // Tilføj klasse på siden så vi kan style krummelurer forskelligt
      if (page) {
        page.classList.toggle("drikke-active", targetId === "drikke");
        page.classList.toggle("mad-active", targetId === "mad");
      }
    });
  });
});