/* =====================================================
   ESTRELLAS
===================================================== */

const estrellas =
    document.getElementById("estrellas");

for (let i = 0; i < 150; i++) {

    const estrella =
        document.createElement("div");

    estrella.className = "estrella";

    estrella.style.left =
        Math.random() * 100 + "%";

    estrella.style.top =
        Math.random() * 100 + "%";

    const tamaño =
        Math.random() * 2 + 0.5;

    estrella.style.width =
        tamaño + "px";

    estrella.style.height =
        tamaño + "px";

    estrella.style.animationDelay =
        Math.random() * 5 + "s";

    estrella.style.animationDuration =
        2 + Math.random() * 5 + "s";

    estrellas.appendChild(estrella);
}


/* =====================================================
   PARTÍCULAS DE LUZ
===================================================== */

for (let i = 0; i < 25; i++) {

    const particula =
        document.createElement("div");

    particula.className =
        "particula-luz";

    particula.style.left =
        Math.random() * 100 + "%";

    particula.style.top =
        40 + Math.random() * 60 + "%";

    particula.style.setProperty(
        "--duracion",
        (5 + Math.random() * 7) + "s"
    );

    particula.style.setProperty(
        "--delay",
        (Math.random() * 7) + "s"
    );

    particula.style.setProperty(
        "--movimiento",
        (-60 + Math.random() * 120) + "px"
    );

    document.body.appendChild(particula);
}


/* =====================================================
   CREAR CUENTA REGRESIVA
===================================================== */

const cuenta =
    document.createElement("div");

cuenta.className =
    "cuenta-regresiva";

cuenta.innerHTML = `
    <div class="numero-cuenta"></div>
`;

document.body.appendChild(cuenta);


/* =====================================================
   MENSAJE DE CUMPLEAÑOS
===================================================== */

const mensajeCumpleanos =
    document.createElement("div");

mensajeCumpleanos.className =
    "mensaje-cumpleanos";

mensajeCumpleanos.innerHTML = `
    <div>
        <h2>
            Feliz cumpleaños,<br>
            Gatito 💜
        </h2>

        <span class="corazon-final">
            ♡
        </span>
    </div>
`;

document.body.appendChild(mensajeCumpleanos);


/* =====================================================
   BOTÓN COMENZAR
===================================================== */

const botonComenzar =
    document.getElementById("btnComenzar");


let comenzando = false;


botonComenzar.addEventListener(
    "click",
    () => {

        if (comenzando) return;

        comenzando = true;

        botonComenzar.style.pointerEvents =
            "none";


        /* -----------------------------------------
           Ocultar pantalla inicial
        ----------------------------------------- */

        const pantallaInicio =
            document.getElementById("inicio");

        pantallaInicio.style.transition =
            "opacity 1s ease, transform 1.2s ease";

        pantallaInicio.style.opacity = "0";

        pantallaInicio.style.transform =
            "scale(1.08)";


        /* -----------------------------------------
           Esperar a que desaparezca
        ----------------------------------------- */

        setTimeout(() => {

            iniciarCuentaRegresiva();

        }, 900);

    }
);


/* =====================================================
   FUNCIÓN CUENTA REGRESIVA
===================================================== */

function iniciarCuentaRegresiva() {

    cuenta.classList.add("activa");

    const numero =
        cuenta.querySelector(".numero-cuenta");

    const numeros = ["3", "2", "1"];

    let posicion = 0;


    function mostrarNumero() {

        if (posicion >= numeros.length) {

            terminarCuenta();

            return;
        }


        numero.textContent =
            numeros[posicion];


        /* Reiniciar animación */

        numero.style.animation = "none";

        void numero.offsetWidth;

        numero.style.animation =
            "aparecerNumero .9s cubic-bezier(.16,1,.3,1)";


        posicion++;


        setTimeout(
            mostrarNumero,
            1000
        );
    }


    mostrarNumero();
}


/* =====================================================
   TERMINAR CUENTA
===================================================== */

function terminarCuenta() {

    cuenta.classList.remove("activa");


    setTimeout(() => {

        mensajeCumpleanos.classList.add(
            "visible"
        );

    }, 400);
}
