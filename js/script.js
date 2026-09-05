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
   BOTÓN COMENZAR
===================================================== */

const botonComenzar =
    document.getElementById("btnComenzar");

botonComenzar.addEventListener(
    "click",
    () => {

        botonComenzar.innerHTML =
            "Preparando la sorpresa... 💜";

        botonComenzar.style.pointerEvents =
            "none";

        botonComenzar.style.transform =
            "scale(.96)";

        setTimeout(() => {

            alert(
                "Aquí comenzará nuestra historia 💜"
            );

        }, 1200);
    }
);
