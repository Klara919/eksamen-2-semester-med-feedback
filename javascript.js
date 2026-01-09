// Scroll-triggered marquee
// Finder elementet med id "marqueeTrack" og gemmer det i variablen 'marquee'
const marquee = document.getElementById("marqueeTrack");

// Tilføjer en event listener, som aktiveres hver gang brugeren scroller
window.addEventListener("scroll", () => {
    // Hvor langt brugeren har scrollet i pixels på Y-aksen
    const scrollPosition = window.scrollY;

    // Multiplikator, der styrer hvor hurtigt marquee bevæger sig i forhold til scroll
    const speed = 0.7;

    // Anvender CSS transform for at flytte marquee til venstre baseret på scrollPosition
    // Negativt tegn (-) fordi vi vil bevæge elementet mod venstre, når man scroller ned
    marquee.style.transform = `translateX(${-scrollPosition * speed}px)`;
});


// Forsinket visning af navbar
window.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const wrapper = document.querySelector('.navbar-wrapper');
        wrapper.classList.add('show');
    }, 2000); // 2 sekunder delay
});
