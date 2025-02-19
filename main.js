const $tablero = document.querySelector('#tablero');
const $cuadro = document.querySelectorAll('.cuadro');
const $mensajeFinJuego = document.querySelector('#fin-juego');
const coloresMezclados = coloresAleatorios(); 
let $primerCuadro = null;
let turnos = 0;
let tiempo = 0;
let intervaloTiempo = null;

function comenzarJuego(){
    asignarColores();
    manejarEvento();
}

function coloresAleatorios(){   
    const colores = ['rojo', 'verde', 'azul', 'amarillo' , 'negro', 'purpura', 'gris', 'marron'];
    const coloresDuplicados = colores.concat(colores);

    function barajar(array){  //Fisher-Yates
        for (let i = array.length -1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    return barajar(coloresDuplicados);
}

function asignarColores(){
    coloresMezclados.forEach(function(color, i) {
        $cuadro[i].classList.add(color);
    });
}

function manejarEvento(){
    $tablero.onclick = function(e) {
        const $elemento = e.target;
        if ($elemento.classList.contains('cuadro')) { //Cuando se hace clic en cualquier parte del tablero, verifica si el clic fue en un cuadro
            if (intervaloTiempo === null) {
                iniciarContador();
            }
            manejarClickCuadro($elemento); //Si fue en un cuadro se llama a esta función
        }
    };
}

function manejarClickCuadro($cuadroActual){
    mostrarCuadro($cuadroActual);

    if ($primerCuadro === null) {
        $primerCuadro = $cuadroActual;
    } else {
        if ($primerCuadro === $cuadroActual) {
            return;
        }
        
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

function mostrarCuadro($cuadro){
    $cuadro.style.opacity = '1';
}

function ocultarCuadro($cuadro){
    setTimeout(function() {
        $cuadro.style.opacity = '0';
    }, 500);   
}

function cuadrosIguales($cuadro1, $cuadro2){
    return $cuadro1.className === $cuadro2.className;
}

function eliminarCuadro($cuadro){
    setTimeout(function() {
        $cuadro.parentElement.classList.add('completo');
        $cuadro.remove();
        evaluarFinDeJuego();
    }, 500);
}

function iniciarContador() {
    if (intervaloTiempo !== null) return;
    intervaloTiempo = setInterval(() => {
        tiempo++;
        document.getElementById('tiempo').textContent = `Tiempo: ${tiempo}s`;
    }, 1000);
}

function detenerContador() {
    clearInterval(intervaloTiempo);
    intervaloTiempo = null;
}

function evaluarFinDeJuego(){
    if (document.querySelectorAll('.cuadro').length === 0) {
        $tablero.style.display = 'none';
        $mensajeFinJuego.querySelector('strong').textContent = turnos.toString();
        $mensajeFinJuego.style.display = 'block';
        detenerContador();
    }
}

comenzarJuego();