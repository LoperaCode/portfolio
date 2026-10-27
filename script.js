const phrases = [
    "Hola, soy Álex.",
    "Hola, soy Alejandro.",
    "Hola, soy LoperaCode."
];

const typedTextSpan = document.getElementById("typed-text");

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingDelay = 100;
let erasingDelay = 60;
let newPhraseDelay = 1500; // Tiempo de espera antes de borrar

function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        // Borrando texto
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingDelay = erasingDelay;
    } else {
        // Escribiendo texto
        typedTextSpan.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingDelay = 100;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        // Frase terminada de escribir, pausar antes de borrar (excepto en la última si quieres que se quede fija, o dejarlo en bucle)
        if (phraseIndex === phrases.length - 1) {
            return; // Se detiene en la última frase ("Hola, soy LoperaCode")
        }
        typingDelay = newPhraseDelay;
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex++;
        typingDelay = 500;
    }

    setTimeout(type, typingDelay);
}

// Iniciar el efecto al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    if (phrases.length) {
        setTimeout(type, newPhraseDelay);
    }
});