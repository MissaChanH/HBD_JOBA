const $ = s => document.querySelector(s);

/* ESTRELLAS */
const estrellas = $('#estrellas');
for (let i = 0; i < 150; i++) {
  const e = document.createElement('div');
  e.className = 'estrella';
  e.style.left = Math.random() * 100 + '%';
  e.style.top = Math.random() * 100 + '%';
  const t = .5 + Math.random() * 2;
  e.style.width = e.style.height = t + 'px';
  e.style.animationDelay = Math.random() * 5 + 's';
  e.style.animationDuration = 2 + Math.random() * 5 + 's';
  estrellas.appendChild(e);
}

/* PARTÍCULAS */
const particulas = $('#particulas');
for (let i = 0; i < 28; i++) {
  const p = document.createElement('div');
  p.className = 'particula';
  p.style.left = Math.random() * 100 + '%';
  p.style.top = 45 + Math.random() * 55 + '%';
  p.style.setProperty('--d', 5 + Math.random() * 7 + 's');
  p.style.setProperty('--delay', Math.random() * 7 + 's');
  p.style.setProperty('--x', -60 + Math.random() * 120 + 'px');
  particulas.appendChild(p);
}

/* AUDIO */
const historia = $('#musicaHistoria');
const final = $('#musicaFinal');
const audioBtn = $('#audioControl');
historia.volume = .65;
final.volume = .8;
let silenciado = false;

function playHistoria() {
  historia.currentTime = 0;
  historia.play().then(() => audioBtn.classList.add('visible')).catch(() => {
    // El click del usuario permite autoplay; si el navegador lo bloquea, no rompemos la experiencia.
  });
}

function fadeOut(audio, duration = 2500) {
  const start = audio.volume;
  const step = 40;
  let elapsed = 0;
  const id = setInterval(() => {
    elapsed += step;
    audio.volume = Math.max(0, start * (1 - elapsed / duration));
    if (elapsed >= duration) {
      clearInterval(id);
      audio.pause();
      audio.currentTime = 0;
      audio.volume = start;
    }
  }, step);
}

audioBtn.addEventListener('click', () => {
  silenciado = !silenciado;
  historia.muted = silenciado;
  final.muted = silenciado;
  audioBtn.textContent = silenciado ? '🔇' : '🔊';
  audioBtn.setAttribute('aria-label', silenciado ? 'Activar música' : 'Silenciar música');
});

/* PANTALLAS */
const inicio = $('#inicio');
const cuenta = $('#cuentaRegresiva');
const numero = $('#numeroCuenta');
const recuerdos = $('#recuerdos');
const intro = $('#recuerdoIntro');
const card = $('#recuerdoCard');

/* INICIO -> CUENTA */
$('#btnComenzar').addEventListener('click', () => {
  if (inicio.dataset.started === '1') return;
  inicio.dataset.started = '1';

  playHistoria();
  inicio.style.opacity = '0';
  inicio.style.transform = 'scale(1.08)';

  setTimeout(() => {
    inicio.classList.remove('activa');
    cuenta.classList.add('activa');

    let n = 3;
    function next() {
      if (n === 0) {
        cuenta.classList.remove('activa');
        recuerdos.classList.add('activa');
        intro.style.animation = 'up 1.3s both';
        setTimeout(() => {
          intro.style.opacity = '0';
          setTimeout(() => {
            intro.style.display = 'none';
            card.classList.add('visible');
            showMemory();
          }, 1100);
        }, 2600);
        return;
      }
      numero.textContent = n;
      numero.style.animation = 'none';
      void numero.offsetWidth;
      numero.style.animation = 'count .9s cubic-bezier(.16,1,.3,1)';
      n--;
      setTimeout(next, 1000);
    }
    next();
  }, 900);
});

/* RECUERDOS */
// Las dos primeras imágenes son la pequeña introducción que imaginamos juntos.
// Después continúan los recuerdos reales de nuestra historia.
const memories = [
  ['01 · EL COMIENZO', 'assets/fotos/01_infancia_1.jpg', 'Así comenzó algo que ninguno de los dos imaginaba.'],
  ['02 · NUESTROS CAMINOS', 'assets/fotos/02_infancia_2.jpg', 'Y con el tiempo, nuestros caminos se encontraron.'],
  ['03 · NUESTRA HISTORIA', 'assets/fotos/03_miradas.jpg', 'Y poco a poco empezamos a escribir nuestra propia historia.'],
  ['04 · ALGO DIFERENTE', 'assets/fotos/04_byn_carino.jpg', 'Hasta que empezamos a descubrir lo bonito de estar juntos.'],
  ['05 · MOMENTOS PEQUEÑOS', 'assets/fotos/05_beso.jpg', 'Una historia hecha también de momentos pequeños...'],
  ['06 · RISAS', 'assets/fotos/06_risa.jpg', 'De risas, ocurrencias y compañía.'],
  ['07 · NUESTRA COMPAÑÍA', 'assets/fotos/07_perrito_1.jpg', 'Y de esos momentos que simplemente nos hacen sonreír. 🐶💜'],
  ['08 · MÁS DE NOSOTROS', 'assets/fotos/08_puerto_2.jpg', 'Porque contigo hasta lo cotidiano se vuelve especial.'],
  ['09 · LOS DETALLES', 'assets/fotos/09_reloj.jpg', 'Y de pequeños detalles que terminan significándolo todo.'],
  ['10 · LUGARES', 'assets/fotos/10_mar_beso.jpg', 'Algunos recuerdos se sienten como si el tiempo se detuviera.'],
  ['11 · JUNTOS', 'assets/fotos/11_mar_selfie_1.jpg', 'También existen lugares que se vuelven especiales simplemente porque los compartimos.'],
  ['12 · MÁS AVENTURAS', 'assets/fotos/12_mar_selfie_2.jpg', 'Ojalá podamos conocer muchos más.'],
  ['13 · LO QUE VIENE', 'assets/fotos/13_gala.jpg', 'Y quiero seguir llenando mi vida de momentos así contigo.'],
  ['14 · UNA DE NUESTRAS LOCURAS', 'assets/fotos/14_easter_egg.jpg', 'Y sí... también tenemos historias un poquito menos normales. 😂💜']
];

let memIndex = 0;

function paintMemory(item) {
  const [num, src, txt] = item;
  $('#recuerdoNumero').textContent = num;
  $('#recuerdoFrase').textContent = txt;
  const img = $('#fotoRecuerdo');
  img.style.animation = 'none';
  img.onload = () => {
    img.style.animation = 'none';
    void img.offsetWidth;
    img.style.animation = 'photoIn 1.3s cubic-bezier(.16,1,.3,1)';
  };
  img.src = src;
  $('#btnSiguiente').innerHTML = 'Continuar <span>→</span>';
}

function showMemory() {
  paintMemory(memories[memIndex]);
}

$('#btnSiguiente').addEventListener('click', () => {
  if (memIndex < memories.length - 1) {
    memIndex++;
    showMemory();
  } else {
    recuerdos.classList.remove('activa');
    $('#carta').classList.add('activa');
  }
});

/* CARTA */
$('#btnCarta').addEventListener('click', () => {
  $('#cartaIntro').style.display = 'none';
  $('#cartaAbierta').classList.add('visible');
});

/* REGALO */
$('#btnRegalo').addEventListener('click', () => {
  $('#carta').classList.remove('activa');
  $('#regalo').classList.add('activa');
  setTimeout(() => {
    $('#cajaRegalo').classList.add('abierta');
    setTimeout(() => {
      $('#relojRevelado').classList.add('visible');
      $('#btnFinal').classList.remove('oculto');
    }, 1100);
  }, 400);
});

/* FINAL */
$('#btnFinal').addEventListener('click', () => {
  fadeOut(historia, 3500);
  $('#regalo').classList.remove('activa');
  $('#final').classList.add('activa');
  $('#flash').classList.add('go');

  setTimeout(() => {
    final.currentTime = 0;
    final.muted = silenciado;
    final.play().catch(() => {});
  }, 700);
});
