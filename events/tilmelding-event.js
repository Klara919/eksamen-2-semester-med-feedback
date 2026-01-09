// Vent på, at DOM'en er fuldt indlæst
document.addEventListener('DOMContentLoaded', () => {

  // Form submission
  const form = document.getElementById('signup-form');
  const modal = document.getElementById('thankyou-modal');

  // Lyt efter submit på formularen
  form.addEventListener('submit', e => {
    e.preventDefault(); // Forhindrer standard form submit (siden reload)
    modal.classList.add('show'); // Viser tak-for-tilmelding modal ved at tilføje "show"-klasse
    form.reset(); // Nulstiller formularfelter efter submission
  });

  // Guest-buttons
  const buttons = document.querySelectorAll(".guest-btn");
  const guestCountText = document.getElementById("guest-count");
  const antalInput = document.getElementById("antal-input");
  const formSection = document.getElementById("form-section");

  // Tilføjer click-event til hver gæst-knap
  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      const antal = btn.dataset.guests; // Henter antal gæster fra data-guests attribut
      guestCountText.textContent = antal; // Opdaterer visningen i detaljer-sektionen
      antalInput.value = antal; // Opdaterer hidden input i formularen, så det kan sendes med
      formSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // URL params
  const params = new URLSearchParams(window.location.search);
  const eventTitle = params.get("event");
  const eventDate = params.get("date");

  // Hvis der findes parametre, indsæt dem i formular-detaljer
  if (eventTitle) document.getElementById("event-name").textContent = eventTitle;
  if (eventDate) document.getElementById("event-date").textContent = eventDate;
});
