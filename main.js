const $tablero = document.querySelector('#tablero');
const $cuadro = document.querySelectorAll('.cuadro');
const $mensajeFinJuego = document.querySelector('#fin-juego');
let $primerCuadro = null;
let turnos = 0;
let tiempo = 0;
let intervaloTiempo = null;

const imagenes = [
    "imagenes/bullbasaur.png",
    "imagenes/charmander.png",
    "imagenes/eevee.png",
    "imagenes/meowth.png",
    "imagenes/pidgey.png",
    "imagenes/pikachu.png",
    "imagenes/squirtle.png",
    "imagenes/venonat.png"
];

function comenzarJuego() {
    agregarImagenes();
    manejarEvento();
}

function agregarImagenes() {
    const imagenesMezcladas = imagenesAleatorias();
    $cuadro.forEach(function (cuadro, i) {
        const img = document.createElement('img');
        img.src = imagenesMezcladas[i];
        img.classList.add('imagen-juego');
        cuadro.appendChild(img);
    });
}

function imagenesAleatorias() {
    const imagenesDuplicadas = imagenes.concat(imagenes);
    function barajar(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    return barajar(imagenesDuplicadas);
}

function manejarEvento() {
    $tablero.onclick = function(e) {
        const $elemento = e.target;
        if ($elemento.classList.contains('cuadro')) {
            if (intervaloTiempo === null) {
                iniciarContador();
            }
            manejarClickCuadro($elemento);
        }
    };
}

function manejarClickCuadro($cuadroActual) {
    mostrarCuadro($cuadroActual);

    if ($primerCuadro === null) {
        $primerCuadro = $cuadroActual;
    } else {
        if ($primerCuadro === $cuadroActual) return;

        turnos++;
        if (cuadrosIguales($primerCuadro, $cuadroActual)) {
            eliminarCuadro($primerCuadro);
            eliminarCuadro($cuadroActual);
        } else {
            ocultarCuadro($primerCuadro);
            ocultarCuadro($cuadroActual);
        }
        $primerCuadro = null;
    }
}

function mostrarCuadro($cuadro) {
    const $imagen = $cuadro.querySelector('img');
    if ($imagen) {
        $imagen.style.display = 'block';
    }
}

function ocultarCuadro($cuadro) {
    setTimeout(function() {
        const $imagen = $cuadro.querySelector('img');
        if ($imagen) {
            $imagen.style.display = 'none';
        }
    }, 500);
}

function cuadrosIguales($cuadro1, $cuadro2) {
    return $cuadro1.querySelector('img').src === $cuadro2.querySelector('img').src;
}

function eliminarCuadro($cuadro) {
    setTimeout(function() {
        $cuadro.classList.add('eliminado');
        $cuadro.style.visibility = 'hidden';
        evaluarFinDeJuego();
    }, 500);
}

function iniciarContador() {
    if (intervaloTiempo) return;
    intervaloTiempo = setInterval(function() {
        tiempo++;
        document.getElementById('tiempo').textContent = `Tiempo: ${tiempo}s`;
    }, 1000);
}

function detenerContador() {
    clearInterval(intervaloTiempo);
    intervaloTiempo = null;
}

function evaluarFinDeJuego() {
    const cuadrosEliminados = document.querySelectorAll('.cuadro.eliminado').length;
    const totalCuadros = $cuadro.length;
    
    if (cuadrosEliminados === totalCuadros) {  // Si todos los cuadros han sido eliminados
        $tablero.style.display = 'none'; // Esconde el tablero
        $mensajeFinJuego.querySelector('strong').textContent = turnos.toString(); // Muestra los turnos
        $mensajeFinJuego.style.display = 'block'; // Muestra el mensaje de fin de juego
        detenerContador(); // Detiene el contador
    }
}

comenzarJuego();