document.addEventListener('DOMContentLoaded', () => {

  // --- FORM OG MODAL ---
  const form = document.getElementById('signup-form');
  const modal = document.getElementById('thankyou-modal');

  form.addEventListener('submit', e => {
    e.preventDefault();
    modal.classList.add('show');
    form.reset();
  });

  // --- ANTAL GÆSTER ---
  const guestButtons = document.querySelectorAll(".guest-btn");
  const guestCountEl = document.getElementById("guest-count");
  const antalInput = document.getElementById("antal-input");
  const dateSection = document.getElementById("date-section");

  guestButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const antal = btn.dataset.guests;
      guestCountEl.textContent = antal;
      antalInput.value = antal;
      // Scroll til dato-sektion
      dateSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // --- KALENDER MED MÅNED + ÅR + SLØREDE DAGE ---
  const calendarDaysContainer = document.querySelector(".calendar-days");
  const calendarHeaderMonthYear = document.querySelector(".month-year");
  const timeSection = document.getElementById("time-section");
  const prevMonthBtn = document.querySelector(".prev-month");
  const nextMonthBtn = document.querySelector(".next-month");
  const today = new Date();
  let currentYear = today.getFullYear();
  let currentMonth = today.getMonth();

  const monthNames = [
    "Januar","Februar","Marts","April","Maj","Juni",
    "Juli","August","September","Oktober","November","December"
  ];

  function generateCalendar(year, month) {
    calendarHeaderMonthYear.textContent = `${monthNames[month]} ${year}`;
    calendarDaysContainer.innerHTML = "";

    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    const offset = firstDay === 0 ? 6 : firstDay - 1; // uge starter mandag

    // tomme divs før månedsstart
    for (let i = 0; i < offset; i++) {
      calendarDaysContainer.appendChild(document.createElement("div"));
    }

    const todayDate = new Date(today.getFullYear(), today.getMonth(), today.getDate());

    for (let day = 1; day <= daysInMonth; day++) {
      const dayBtn = document.createElement("button");
      dayBtn.textContent = day;
      const dayDate = new Date(year, month, day);

      // Slør fortidige dage kun i nuværende måned
      if (year === today.getFullYear() && month === today.getMonth() && dayDate < todayDate) {
        dayBtn.classList.add("disabled");
        dayBtn.disabled = true;
      }

      calendarDaysContainer.appendChild(dayBtn);

      if (!dayBtn.disabled) {
        dayBtn.addEventListener("click", () => {
          // Fjern markering
          calendarDaysContainer.querySelectorAll("button").forEach(btn => btn.classList.remove("selected"));
          dayBtn.classList.add("selected");
          // Opdater dato i formular
          const formattedDate = `${day}/${month + 1}/${year}`;
          document.getElementById("time-date").textContent = formattedDate;
          // Scroll til tidspunkt
          timeSection.scrollIntoView({ behavior: "smooth" });
        });
      }
    }
  }

  generateCalendar(currentYear, currentMonth);

  // månedsskift
  prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
    }
    generateCalendar(currentYear, currentMonth);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
    }
    generateCalendar(currentYear, currentMonth);
  });

  // --- TIDSPUNKTER ---
  const timeButtonsContainer = document.getElementById("time-buttons");
  const timeSpots = ["10:00","10:30","11:00","11:30","12:00","12:30","13:00","13:30","14:00","14:30","15:00","15:30","16:00"];
  
  timeSpots.forEach(time => {
    const btn = document.createElement("button");
    btn.classList.add("time-btn");
    btn.textContent = time;
    timeButtonsContainer.appendChild(btn);

    btn.addEventListener("click", () => {
      // Marker valgt
      timeButtonsContainer.querySelectorAll("button").forEach(b => b.classList.remove("selected"));
      btn.classList.add("selected");

      // Opdater dato & tid i formular
      const date = document.getElementById("time-date").textContent;
      document.getElementById("time-date").textContent = `${date} kl. ${time}`;

      // Scroll til bord
      const tableSection = document.getElementById("table-selection");
      tableSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // --- BORD VALG ---
  const tableBtns = document.querySelectorAll(".table");
  const bordValgEl = document.getElementById("bord-valg");
  const formSection = document.getElementById("form-section");

  tableBtns.forEach(table => {
    table.addEventListener("click", () => {
      bordValgEl.textContent = table.dataset.table;
      // Scroll til formular
      formSection.scrollIntoView({ behavior: "smooth" });
    });
  });

  // --- TILFÆLDIGT BORD ---
const randomTableBtn = document.getElementById("random-table-btn");

randomTableBtn.addEventListener("click", () => {
  // Vælg et tilfældigt bord fra listen af borde
  const randomIndex = Math.floor(Math.random() * tableBtns.length);
  const randomTable = tableBtns[randomIndex];

  // Marker bordet som valgt
  bordValgEl.textContent = randomTable.dataset.table;

  // Scroll til formularen
  formSection.scrollIntoView({ behavior: "smooth" });

  // (Valgfrit) Tilføj en visuel markering på bordet
  tableBtns.forEach(t => t.classList.remove("selected"));
  randomTable.classList.add("selected");
});


});
