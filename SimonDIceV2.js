//Simon Dice v2

const readline = require('readline');

const rl = readline.createInterface({
    input:  process.stdin,
    output: process.stdout,
});

const question = (prompt) =>
new Promise((resolve) => rl.question(prompt, resolve));

// --- Constantes ---
const MAX_COLORES_FACIL   = 4;
const MAX_COLORES_DIFICIL = 7;
const MAX_COLORES_SEQ     = 16;
const MAX_SECUENCIAS      = 15;
const NUM_AYUDAS_DEFAULT  = 3;

// --- Tipos (enums) ---
const tModo = Object.freeze({ FACIL: 1, DIFICIL: 2 });

const tColores = Object.freeze({
    ROJO:    'Rojo',
    VERDE:   'Verde',
    AZUL:    'Azul',
    DORADO:  'Dorado',
    BLANCO:  'Blanco',
    MARRON:  'Marrón',
    NARANJA: 'Naranja',
});
// Array global de colores: los 4 primeros son modo fácil, los 7 modo difícil
const TODOS_LOS_COLORES = [
    tColores.ROJO,
    tColores.VERDE,
    tColores.AZUL,
    tColores.DORADO,
    tColores.BLANCO,
    tColores.MARRON,
    tColores.NARANJA,
];

// Mapeo letra -> color (lo que escribe el jugador)
const LETRA_A_COLOR = {
    R: tColores.ROJO,
    V: tColores.VERDE,
    A: tColores.AZUL,
    D: tColores.DORADO,
    B: tColores.BLANCO,
    M: tColores.MARRON,
    N: tColores.NARANJA,
};

const LETRAS_VALIDAS = {
[tModo.FACIL]:
    '(R = Rojo, V = Verde, A = Azul, D = Dorado, x = Ayuda)',
    [tModo.DIFICIL]:
    '(R = Rojo, V = Verde, A = Azul, D = Dorado, B = Blanco, M = Marrón, N = Naranja, x = Ayuda)',
};

// generarSecuencia: devuelve un array de colores aleatorios.
// El rango depende del modo: 4 colores en fácil, 7 en difícil.
function generarSecuencia(modo, longitud) {
    const numColores =
    modo === tModo.DIFICIL ? MAX_COLORES_DIFICIL : MAX_COLORES_FACIL;

    const secuencia = [];
    for (let i = 0; i < longitud; i++) {
    const indice = Math.floor(Math.random() * numColores);
    secuencia.push(TODOS_LOS_COLORES[indice]);
    }
    return secuencia;
}

// utilizarAyuda: si quedan ayudas, muestra el color y descuenta una
// Devuelve  usado: true/false, numAyudas: número actualizado
function utilizarAyuda(secuenciaColores, indice, numAyudas) {
    if (numAyudas > 0) {
    numAyudas--;
    console.log(
    `El siguiente color es el ${secuenciaColores[indice]}. Te quedan ${numAyudas} ayudas!`
    );
    return { usado: true, numAyudas };
    }

    console.log('No dispones de más ayudas.');
    return { usado: false, numAyudas };
}

// --- NUEVO en este commit ---
// jugar: recorre las 15 secuencias.
// Muestra cada una, borra pantalla, lee colores y gestiona ayudas y fallos.
async function jugar(nombre, modo) {
let numAyudas = NUM_AYUDAS_DEFAULT;

for (let numSeq = 1; numSeq <= MAX_SECUENCIAS; numSeq++) {
    const secuencia = generarSecuencia(modo, numSeq);

    console.log(`\nSequence number ${numSeq}: ${secuencia.join(' - ')}`);
    console.log('Memoriza la secuencia y pulsa Enter para continuar...');
    await question('');

    console.clear();

    console.log(`Ayudas disponibles: ${numAyudas}`);
    console.log(`${nombre}, introduce la secuencia de ${numSeq} colores:`);
    console.log(LETRAS_VALIDAS[modo]);

    let acertado = true;

    for (let i = 0; i < numSeq; i++) {
    let colorIntroducido = null;

    while (colorIntroducido === null) {
        const entrada = (await question(`Color ${i + 1}: `)).trim().toUpperCase();

        if (entrada === 'X') {
        const resultado = utilizarAyuda(secuencia, i, numAyudas);
        numAyudas = resultado.numAyudas;

        } else if (LETRA_A_COLOR[entrada]) {
        colorIntroducido = LETRA_A_COLOR[entrada];

        } else {
        console.log('Letra no reconocida. Prueba con las letras del menú de arriba.');
        }
    }

    if (colorIntroducido !== secuencia[i]) {
        acertado = false;
        break;
    }
    }

    if (acertado) {
    console.log(`Enhorabuena, has acertado la secuencia número ${numSeq}.`);
    } else {
    console.log(
        `\nHas fallado en la secuencia ${numSeq}. La correcta era: ${secuencia.join(' - ')}`
    );
    console.log(`¡Hasta la próxima, ${nombre}!`);
    return;
    }
    }

    console.log(`\n¡Increíble! Has superado las ${MAX_SECUENCIAS} secuencias. ¡Campeón, ${nombre}!`);
}


rl.close();