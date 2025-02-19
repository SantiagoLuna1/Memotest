# Memotest

Memotest es un juego clásico de memoria en el que el jugador debe encontrar y emparejar cartas (o cuadros) con el mismo color. ¡Pon a prueba tu concentración y velocidad!

## Características

- **Juego de memoria:** Encuentra todos los pares de colores para ganar.
- **Contador de tiempo:** Mide el tiempo que tardas en completar el juego.
- **Contador de turnos:** Muestra la cantidad de movimientos realizados.
- **Interfaz responsiva:** Gracias a [Bootstrap](https://getbootstrap.com/), la interfaz se adapta a diferentes dispositivos.

## Reglas del juego

1. **Inicio del juego:**  
   Al iniciar el juego, se mostrarán todos los cuadros de forma oculta.
   
2. **Turno del jugador:**  
   - El jugador debe seleccionar dos cuadros por turno.
   - Si ambos cuadros tienen el mismo color, se quedan descubiertos y se retiran del tablero.
   - Si los cuadros no coinciden, se ocultan nuevamente después de un breve período.
   
3. **Objetivo:**  
   El objetivo es encontrar todos los pares en el menor número de turnos y en el menor tiempo posible.
   
4. **Fin del juego:**  
   Cuando se descubren y retiran todos los cuadros, el juego finaliza, mostrando el número total de turnos y el tiempo transcurrido.
