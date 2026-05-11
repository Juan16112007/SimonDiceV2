Simon Dice v2
Práctica de Lenguajes de marca — DAM Grado Superior, curso 2025/2026.
Es un Simon Says de terminal. Te muestra una secuencia de colores, la memorizas, y la introduces letra a letra. Cada ronda la secuencia crece. Si fallas, se acabó.

Modos de juego
Modo fácil — 4 colores, 15 rondas.
Modo difícil — 7 colores, 15 rondas. Más largo, más caos.
En los dos modos tienes 3 ayudas por partida. Si en algún momento no recuerdas un color, escribes x y el juego te lo dice. Úsalas bien porque no se recargan.

Colores y sus letras
R → Rojo
V → Verde
A → Azul
D → Dorado
B → Blanco     (solo modo difícil)
M → Marrón     (solo modo difícil)
N → Naranja    (solo modo difícil)
x → Pedir ayuda

Cómo ejecutarlo
Necesitas Node.js instalado. Nada más.
bashnode main.js

Estructura del código
El proyecto tiene un solo archivo, main.js, dividido en cinco partes:
1. Constantes y tipos      — colores, modos, límites del juego
2. generarSecuencia        — crea secuencias aleatorias según el modo
3. utilizarAyuda           — gestiona las pistas disponibles
4. jugar                   — bucle completo de una partida
5. main                    — menú y arranque del programa
Los commits del repo siguen ese mismo orden, por si quieres ver cómo se fue construyendo.

///PD si  la practica tuvo dificil no me imagino el examen Jonathan
