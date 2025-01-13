let turnos = 0
let $primerCuadro = null;
const $tablero = document.querySelector('#tablero');
const $cuadros = $tablero.querySelectorAll('.cuadro'); //toma todos los cuadros del elemento tablero
const $mensajeFinJuego = document.querySelector('#fin-juego')

function configurarJuego() {
    const coloresBase = ['rojo','azul','verde','amarillo','negro','blanco'];
    const coloresRepetidos = coloresBase.concat(coloresBase); //para duplicar los colores
    configurarCuadros($cuadros, coloresRepetidos);
    manejarEventos($tablero);
}

function manejarEventos($tablero) {
    $tablero.onclick = function(e) {
    const $elemento = e.target;
    if ($elemento.classList.contains('cuadro')){
        manejarClickCuadro($elemento);
    }
};
}

function manejarClickCuadro($cuadroActual) {
    mostrarCuadro($cuadroActual);

    if ($primerCuadro === null) {
        $primerCuadro = $cuadroActual;       
    }else{
        if ($primerCuadro === $cuadroActual) {     //si se hace doble click en el mismo cuadro, no hacer nada
            return;
        }

        turnos++;

        if (cuadrosSonIguales($primerCuadro, $cuadroActual)) {
            eliminarCuadros($primerCuadro);
            eliminarCuadros($cuadroActual);
        }else{
            ocultarCuadro($primerCuadro);
            ocultarCuadro($cuadroActual);
        }
        $primerCuadro = null;
    }
}

function mostrarCuadro($cuadro) {
    $cuadro.style.opacity = '1';
}

function cuadrosSonIguales($cuadro1,$cuadro2) {
    return $cuadro1.className === $cuadro2.className;
}

function eliminarCuadros($cuadro) {
    setTimeout(function() {
        $cuadro.parentElement.classList.add('completo');
        $cuadro.remove();
        evaluarFinDejuego();
    },500);
}

function ocultarCuadro($cuadro) {
    setTimeout(function() {
        $cuadro.style.opacity = '0';
    },500);
}

function configurarCuadros($cuadros, colores) {
    const coloresRandom = colores.sort(function() {
        return 0.5 - Math.random();                    //para que muestre los colores de manera aleatoria
    });
    coloresRandom.forEach(function(color, i) {
        $cuadros[i].classList.add(color);
    });
}

function evaluarFinDejuego() {
    if(document.querySelectorAll('.cuadro').length === 0) {
        $tablero.style.display = 'none';
        $mensajeFinJuego.querySelector('strong').textContent = turnos.toString();
        $mensajeFinJuego.style.display = 'block';
    }
}

configurarJuego();