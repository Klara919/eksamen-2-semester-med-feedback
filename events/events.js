// FLY-IN ANIMATION FOR KORT
// Hent alle kort i grid
const cards = document.querySelectorAll('.cards-grid .card');

// Loop igennem hvert kort og lav fly-in animation
cards.forEach((card, index) => {
  // Skift flyveretning skiftevis fra venstre/højre
  const fromLeft = index % 2 === 0;
  const translateX = fromLeft ? '-100vw' : '100vw'; // Startposition udenfor skærm
  const rotateDeg = fromLeft ? -15 : 15; // Start rotation

  // Sæt CSS variabel til --start-transform til animationens startværdi
	 
	 card.style.setProperty('--start-transform', `translateX(${translateX}) rotate(${rotateDeg}deg) scale(0.9)`);

  // Tilføj klassens fly-in med delay baseret på index
  setTimeout(() => {
    card.classList.add('fly-in'); // Starter animationen defineret i CSS
  }, index * 300); // Delay mellem kort
});

// MODAL FUNKTIONALITET
// Funktion til at åbne modal
function openModal(id) {
  const modal = document.getElementById(id + '-modal'); // Find korrekt modal ud fra id
  modal.style.display = 'flex'; // Vis modal
}

// Tilføj eventlistener til alle lukkeknapper i modaler
document.querySelectorAll('.close-btn').forEach(btn => {
  btn.addEventListener('click', function() {
    const modal = btn.closest('.card-modal'); // Find modal-element til knappen
    modal.style.display = 'none'; // Skjul modal
  });
});