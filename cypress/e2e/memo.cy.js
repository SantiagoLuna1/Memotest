/// <reference types="Cypress" />

const URL = '127.0.0.1:8080';

context('Memotest', () => {

    beforeEach(() => {
    cy.visit(URL);
    cy.wait(1000);
    });

    describe('juega al memotest', () => {
        const NUMERO_CUADROS = 16;

        it('se asegura que haya un tablero con cuadros', () => {
            cy.get('#tablero').find('.cuadro').should('have.length', NUMERO_CUADROS);
        });

        it('se asegura que los cuadros sean aleatorios', () => {
            cy.get('#tablero').should('be.visible'); // Esperar a que el tablero esté visible
                
            // Esperar a que todas las imágenes se carguen dentro de los cuadros
            cy.get('.cuadro img', { timeout: 5000 })
                .should('have.length', 16)
                .then(($imagenes1) => {
                     // Guardar el src de cada imagen en un array
                    const imagenesAntes = [...$imagenes1].map(img => img.src);
        
                cy.reload();
        
                cy.get('.cuadro img', { timeout: 5000 }).should('have.length', 16)
                    .then(($imagenes2) => {
                        const imagenesDespues = [...$imagenes2].map(img => img.src);
        
                        // Verificar que las imágenes sean diferentes en orden
                        expect(imagenesAntes).to.not.deep.equal(imagenesDespues);
                });
            });
        });

    describe('resuelve el juego', () => {
        let mapaDePares, listaDePares;
        it('elige una combinación errónea', () => {
            cy.get('.cuadro').then(cuadros => {
            mapaDePares = obtenerParesDeCuadros(cuadros);
            listaDePares = Object.values(mapaDePares);
            console.log(listaDePares); //devuelve un array con la lista de pares

            cy.get(listaDePares[0][0]).click(); //hacer click al primer elemento de la lista de pares
            cy.get(listaDePares[1][0]).click(); //hacer click al segundo
                                                //entonces eso es un error
            cy.get('.cuadro').should('have.length', NUMERO_CUADROS); //se mantienen los 16 cuadros
            });
        });

        it('resuelve el juego', () => {
            cy.get('.cuadro').should('have.length', NUMERO_CUADROS); // Asegura que los cuadros están en el DOM antes de comenzar

            cy.get('.cuadro').then((cuadros) => { // Obtiene los pares de cuadros desde el estado inicial
                const mapaDePares = obtenerParesDeCuadros(cuadros);
                const listaDePares = Object.values(mapaDePares);

                listaDePares.forEach((par) => {
                    cy.wrap(par[0]).click();
                    cy.wrap(par[1]).click();
                });

                cy.get('.cuadro').should('have.class', 'eliminado'); //verifica que sean eliminados

                cy.get('.tablero').should('not.exist');

                const numeroTurnos = NUMERO_CUADROS / 2; 

                cy.get('#fin-juego')
                    .should('be.visible')
                    .contains(`Fin del juego! Tardaste ${numeroTurnos} turnos en terminar`);
                });
        });
    });
    });
});


//cada cuadro se diferencia de otro por la imágen que tiene
function obtenerParesDeCuadros(cuadros) {
    const pares = {};

    cuadros.each((i, cuadro) => { //recorre cada cuadro
        const $img = cuadro.querySelector('img'); //busca la imágen dentro de cada cuadro
        const src = ($img && $img.src) || ''; //obtiene su src de lo contrario es string vacío

        if (pares[src]) {
            pares[src].push(cuadro);
        } else {
            pares[src] = [cuadro];
        }
    });
    console.log(pares)
    return pares;
}
