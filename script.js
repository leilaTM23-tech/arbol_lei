// ❤️ FECHA DE INICIO (ajústala si necesitas)
const inicio = new Date("2024-05-23T16:00:00");

function actualizarTiempo() {
    const ahora = new Date();
    let diff = ahora - inicio;

    let segundos = Math.floor(diff / 1000);
    let minutos = Math.floor(segundos / 60);
    let horas = Math.floor(minutos / 60);
    let dias = Math.floor(horas / 24);

    horas %= 24;
    minutos %= 60;
    segundos %= 60;

    const tiempoEl = document.getElementById("tiempo");
    if (tiempoEl) {
        tiempoEl.innerText = `${dias} días ${horas} horas ${minutos} minutos ${segundos} segundos`;
    }
}

setInterval(actualizarTiempo, 1000);
actualizarTiempo();

// 💖 GENERAR CORAZONES flotantes de fondo
const contenedor = document.querySelector(".corazones");

if (contenedor) {
    function crearCorazonFondo() {
        const corazon = document.createElement("span");
        corazon.innerHTML = "❤️";
        corazon.className = "corazon-fondo"; // mejor usar clase para CSS

        // Usar tamaño real del contenedor
        const ancho = contenedor.offsetWidth;
        const alto = contenedor.offsetHeight;

        corazon.style.left = Math.random() * ancho + "px";
        corazon.style.top = Math.random() * alto + "px";
        corazon.style.fontSize = (Math.random() * 28 + 18) + "px";
        corazon.style.animationDelay = Math.random() * 5 + "s";

        contenedor.appendChild(corazon);

        // Eliminar después de ~10-15 segundos para no saturar el DOM
        setTimeout(() => corazon.remove(), 1500);
    }

    // Crear algunos al inicio y luego cada cierto tiempo
    for (let i = 0; i < 80; i++) {
        crearCorazonFondo();
    }
    setInterval(crearCorazonFondo, 180);
}

// 🌿 CORAZONES QUE NACEN DESDE LAS RAMAS
const ramas = document.querySelectorAll(".rama");

function crearCorazonDesdeRama(rama) {
    if (!contenedor) return;

    const corazon = document.createElement("span");
    corazon.innerHTML = Math.random() > 0.5 ? "❤️" : "💗";  // variación de tonos
    corazon.className = "corazon-nace";

    const rectRama = rama.getBoundingClientRect();
    const rectCont = contenedor.getBoundingClientRect();

    const x = rectRama.left - rectCont.left + rectRama.width * (0.8 + Math.random() * 0.4); // más hacia las puntas
    const y = rectRama.top - rectCont.top + rectRama.height / 8;

    corazon.style.left = x + "px";
    corazon.style.top = y + "px";
    corazon.style.fontSize = (Math.random() * 24 + 18) + "px"; // tamaños variados

    // Dirección suave hacia arriba con algo de deriva lateral
    const movX = (Math.random() - 0.5) * 100;
    corazon.style.setProperty("--movX", movX + "px");

    // Color aleatorio suave
    const colores = ["#ff6b81", "#ff85a2", "#ff4757", "#ffb6c1", "#ff79ac"];
    corazon.style.color = colores[Math.floor(Math.random() * colores.length)];

    contenedor.appendChild(corazon);

    // Latido + desaparición más lenta y natural
    setTimeout(() => corazon.remove(), 7000); // dura más para que se vea bonito
}

// Aumenta la frecuencia para más densidad (como en la imagen)
ramas.forEach(rama => {
    setInterval(() => {
        if (Math.random() > 0.25) { // ~75% de probabilidad cada intervalo
            crearCorazonDesdeRama(rama);
        }
    }, Math.random() * 1000 + 600); // cada ~0.6 a 1.6 segundos por rama
});

// 💖 CORAZÓN INTERACTIVO CON MENSAJES
const heart = document.getElementById("heart");
const messageArea = document.getElementById("messageArea");
const notification = document.getElementById("notification");

let messages = [
    "Me encanta tu sonrisa 💕",
    "Eres mi lugar seguro 🌷",
    "Gracias por existir ✨",
    "Contigo todo es más bonito 💖",
    "Amo la forma en que me miras 😍",
    "Eres mi persona favorita 💌",
    "Tu abrazo es mi paz 🤍",
    "Siempre quiero caminar a tu lado 🌹",
    "Eres mi sueño hecho realidad 💫",
    "Mi corazón siempre te elige ❤️",
    "Estoy muy enamorada de ti",
    "Contigo soy más feliz",
    "Quédate conmigo siempre",
    "Me Encantas😍",
    "Amo cada parte de ti",
    "Contigo todo cambió💫",
    "Bésame en esta y mil vidas +",
    "Seamos un equipo❤️",
    "Seamos el mejor equipo❤️",
    "Tú eres como esas estrellas que iluminan la noche💫",
    "Tú iluminas mi vida💫",
    "Te amaré en días buenos💖",
    "Te amare en días malos🌹",
    "Veo el atardecer y pienso en ti🌇",
    "Escucho música y pienso en tí🎧",
    "Brilla el sol y pienso en tí☀️",
    "Te amaré hasta en los días que sientas que no puedes más🥹",
    "Eres mi refugio❤️‍🩹",
    "Contigo me siento en completa paz❤️‍🩹",
    "Cada vez que me miras, curas hasta lo que no esta roto❤️‍🩹",
    "Disfruto siempre de tu compañia🥰",
    "Con cada mirada desnudas mi alma🤍",
    "Con cada beso me elevas a las nubes☁️",
    "Cada vez que hacemos el amor me haces tocar el cielo☁️",
    "Eres mi vida❤️",
    "Vamos a comernos❤️‍🔥",
    "Cuidaré tu corazón como lo más preciado que tenga en la vida❤️‍🔥",
    "Te has echo más importante en mi vida💖",
    "Quiero cuidar del niño dulce, tierno, amable y mugroso que está dentro de ti💖",
    "Mi mugroso😚",
    "Eres mi motivación de todos los días❤️",
    "No importa que sientas que todo se viene abajo, yo estaré contigo para levantarte❤️",
    "La cosa aquí es que cada que te beso, me hace falta un beso más❤️",
    "Entre todos los lugares preciosos del mundo, tus brazos es mi lugar favorito",
    "No necesito a todo el mundo, te necesito a ti💖",
    "Necesito un USB, Unos Sabrosos Besos tuyos.😍",
    "No necesito ninguna excusa, eres tu y quiero que siempre seas tu❤️‍🩹",
    "Cuando estamos juntos no existe nada más❤️",
    "Quiero que sepas que desde que llegaste a mi vida, soy más feliz❤️‍🩹",
    "siempre pienso en ti, te volviste lo más importante en mi vida y mi corazón❤️‍🔥",
    "Eres el amor que no sabia que iba a necesitar tanto",
    "Tú eres mi razón por la cual creo en el amor y creo en un amor verdadero💖",
    "Te amo hoy, mañana y todos los días que vengan💖",
    "Eres mi mejor compañía, incluso en silencio disfruto nuestro tiempo juntos💖",
    "Gracias por ser mi hogar en cualquier lugar💖",
    "Gracias por ser mi mayor confidente, quien me escucha y entiende💖",
    "Te amo en cada versión de ti💖",
    "Te amo sin condiciones y sin fechas límite, te amo para siempre❤️‍🩹",
    "Eres el latido que me recuerda que estoy viva",
    "Contigo todo es posible, incluso ser mejor versión de mí.",
    "Eres el capítulo que quiero releer mil veces.",
    "Contigo el miedo se hace pequeño.",
    "Gracias por ser mi constante en un mundo que cambia.❤️",
    "Eres mi hogar, mi paz y mi mayor aventura.💖"

    // ... agrega aquí los que faltan hasta 100
];

messages = messages.sort(() => Math.random() - 0.5); // revolver para que no salgan en orden fijo

let remaining = messages.length;
if (notification) {
    notification.textContent = remaining;
}

if (heart) {
    heart.addEventListener("click", () => {
        if (remaining <= 0) {
            // Opcional: mostrar algo cuando se acaben
            // alert("¡Ya te mostré todos mis mensajitos! 💕");
            return;
        }

        remaining--;
        notification.textContent = remaining;

        const mensaje = messages[remaining];

        // Burbuja de mensaje
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = mensaje;
        if (messageArea) messageArea.appendChild(bubble);

        setTimeout(() => bubble.remove(), 5000);

        // Partículas alrededor del corazón
        for (let i = 0; i < 15; i++) {
            const particle = document.createElement("div");
            particle.className = "particle";

            const angle = Math.random() * Math.PI * 2;
            const distance = 30 + Math.random() * 80;
            const x = Math.cos(angle) * distance;
            const y = Math.sin(angle) * distance;

            particle.style.setProperty("--x", x + "px");
            particle.style.setProperty("--y", y + "px");

            heart.appendChild(particle);
            setTimeout(() => particle.remove(), 1200);
        }
    });
}