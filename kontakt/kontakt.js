// datasæt, som bruges til funktionerne.
var id = null; // variable, med navnet id der er sat til null, i andre ord, har ingen instrukser. bliver brugt længere nede.
function Sendb() { //function, send til formularen, der fortæller den hvad den skal gøre
    //kald af id'er + opbygning af variabler
    var elem = document.getElementById("formular"); // var elem, her bruge vi document, get elementbyid istedet for null, der skal giver instrukser.
    var pos = 3; // her laver vi en variable, der holder vores position, dens position er 3.
    var zpop = document.getElementById("popup"); // her kalder vi på vores id popup, 
    clearInterval(id); //clear interval bruges til at fjerne det som det indholder, så den er tom, vi giver den mere information nedunder.
    id = setInterval(frame, 1); // her giver vi clearinterval, id en funktion, frame,  som kommer nedunder
    
    // id frame, funktion. animation af formularen.
    function frame(){  // for at navngive den.
        if (pos == 29) { //laver en if statement, hvis positionen er = x antal, så vil den gøre "det her"
            clearInterval(id); // her kalder vi på variabl id'et fra før, for at fjerne det id den holder
        } else { // en del af if strukturen, vi bruger else hvis if statement ikke er opfyldt så kigger den på else, og vælger den mulighed, til den endelig rammer if.
            pos++; // brug af pos ++ da positionen skal op 70, istedetfor 3.
            elem.style.top = pos + 'vw'; //tempoary style css,top, til formularen, top skal skubbe den ned. = pos, her henter vi variablen, og tilføjer vh som en regel for typen af mål der bruges, så den er bedre responsivt, 
            zpop.style.zIndex = "25"; //zpop, en ny tempoary style, til vores popup, som trækker z indeksen op fra -10 til 25.
        }
    }
    //animation af elementer
    setTimeout(function(){ //bestemmer tiden animationen køre i
           var elem = document.getElementById("popup"); // her bruger vi variable, og element, og kalder på vores id popup
           var pos = 0; //laver en ny positions variable
           clearInterval(id); // fjerne indholdet igen.
           id = setInterval(frame, 1); // vi giver id'et nyt data/struktur som bliver frame
           popup.style.display = "flex"; // midlertidig style css funktion, display flex i vores popup for at ændre den fra hidden til synlig.
           

           function frame(){ // her klader vi på den tidligere frame, og giver den indhold.
               if (pos == 400) { // giver den bestemt position den skal rykke sig til.
                   clearInterval(id); //fjerner indhold igen, da den har frame 1, og den  skal ikke bruges her.
                   popup.style.opacity = "1.0"; // tempoary style css, for at give den en en ny styling, med opacity
               } else {
                   pos++; //  pos++ så den addere den op til 400
                   elem.style.opacity = 1; // ny temp style css, hvor den giver opacity på 1
                   opacity = pos/400; // pos opacity, så den fader in, indtil den er 100%
               }
              
           }       
    }, 1000); // selve time-outen, som er beregnet i ms
// pop-up kryds.
}
function Closepop(){ // kald på function
    var elem = document.getElementById("popup");// for element til at indholde id popup, ind i css filen, kontakt css.
    elem.style.display = "none"; //temp style css
    elem.style.zIndex = "-10"; //temp style css for at bestemme dens plads på 3d aksen, sat til -10 så den ikke påvirker andre elementer i css og html.
    }
