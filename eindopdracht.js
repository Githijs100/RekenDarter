// Constantes
const h1 = document.querySelector("h1").textContent = "Welkom Bij RekenDarter";
const paragraaf = document.querySelector("p");
const correcteScore = document.querySelector("#correcteScore");
const button = document.querySelector("#stopKnop");
const img = document.querySelector("img");
const alleVakjes = document.querySelectorAll("svg.dartbord > *");
const worp1 = document.querySelector("#worp1");
const worp2 = document.querySelector("#worp2");
const worp3 = document.querySelector("#worp3");
const totaleScore = document.querySelector("#totaleScore");
const teLageScore = document.querySelector("#teLageScore");
const klikGeluid = document.querySelector("#klikGeluid");
const teHogeScore = document.querySelector("#teHogeScore");

// Variabelen
let uitgooien = [22, 19, 33, 39, 44, 68, 17, 14, 8, 90, 55, 43, 76];
let randomGetal = Math.floor(Math.random() * uitgooien.length);

paragraaf.textContent = "Gooidoel: " + uitgooien[randomGetal];

let timer = setInterval(countSeconds, 1000);
let secondsPassed = 0;
let aantalWorpen = 0;
let gegooidewaarde = 0;
let worpen = [];

// Functies
function countSeconds() {
    secondsPassed += 1;
}

function stopCountingTime() {
    clearInterval(timer);
}

function veranderGooidoel() {
    randomGetal = Math.floor(Math.random() * uitgooien.length);
    paragraaf.textContent = "Gooidoel: " + uitgooien[randomGetal];
}

// Alle vakjes in het dartbord klikbaar maken en de functie krijgWaarde aanroepen
alleVakjes.forEach((vakje) => {
    vakje.addEventListener("click", () => {
        krijgWaarde(vakje);
    });
});

function krijgWaarde(vakje) {
    // Geluid afspelen
    klikGeluid.play();

    // Check of iemand nog pijlen heeft
    if (aantalWorpen < 3) {
        aantalWorpen++;

        // gooiwaarde van het vakje ophalen (opgeslagen in data-getal in html)
        gegooidewaarde = parseInt(vakje.getAttribute("data-getal"));

        // Opslaan van de worp
        worpen.push(gegooidewaarde);

        if (aantalWorpen === 1) {
            worp1.textContent = gegooidewaarde;
        } else if (aantalWorpen === 2) {
            worp2.textContent = gegooidewaarde;
        } else if (aantalWorpen === 3) {
            worp3.textContent = gegooidewaarde;
        }

        // Totale score bijwerken
        opgeteldeScore();

        // kleur veranderen van vakje waarop is gegooid met fill.
        vakje.classList.toggle('gegooid');
    } else {
        paragraaf.textContent = "Je hebt alle pijlen verbruikt";
    }
}

// Score optellen bij "Totale score" (hulp gevraagd aan chat gpt)
function opgeteldeScore() {
    let totaal = worpen.reduce((acc, val) => acc + val, 0);
    totaleScore.textContent = totaal;

    // Score controleren
    controleerGetal(totaal);
}

// Controleer de gegooide waarde en vertaal deze naar of de gebruiker de juiste score heeft gegooid
function controleerGetal(totaal) {
    if (totaal == uitgooien[randomGetal]) {
        correcteScore.textContent = "Gefeliciteerd! Je hebt je gooidoel behaald. Probeer nu een nieuwe.";
        teLageScore.textContent = "";  // Zorgt ervoor dat de tekst van teLageScore verdwijnt
        teHogeScore.textContent = "";  // Zorgt ervoor dat de tekst van teHogeScore verdwijnt
    } else {
        if (totaal < uitgooien[randomGetal]) {
            teLageScore.textContent = "Te lage score";
            teHogeScore.textContent = "";
        }

        if (totaal > uitgooien[randomGetal]) {
            teHogeScore.textContent = "Te hoge score";
            teLageScore.textContent = "";
        }
    }
}

img.addEventListener('click', veranderGooidoel);
button.addEventListener('click', stopCountingTime);
