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

// --- NUEVO  ---
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

// esto es para ver si funciona nada mas
console.log('Secuencia fácil (3):', generarSecuencia(tModo.FACIL, 3));
console.log('Secuencia difícil (5):', generarSecuencia(tModo.DIFICIL, 5));
rl.close();

rl.close();