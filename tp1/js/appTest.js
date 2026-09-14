/*const blou = createShip("Croiser", 3);
const vogue = createShip("Merry", 2);


console.log(blou.getName());
console.log(blou.getLength());
console.log(vogue.getName());
console.log(vogue.getLength());

console.log(blou.isSunk());
console.log(vogue.isSunk());


blou.hit();
blou.hit();
blou.hit();

console.log(blou.isSunk());
console.log(vogue.isSunk());

const tab = createBoard(4);

placeShip(tab, vogue, 0, 0, "verticale");

console.log(tab[0][0].ship === tab[1][0].ship);
console.log(tab[1][0].ship === tab[2][0].ship);*/

const game = createGame(10);

console.log(game.getStats());
// { shots: 0, hits: 0, sunk: 0, totalShips: 4 }

// Tir dans l'eau (adaptez la case à une case vide de votre grille)
console.log(game.fire(9, 9)); // { status: "miss", ship: null }
console.log(game.getStats().shots); // 1

// Tir répété sur la même case
console.log(game.fire(9, 9)); // { status: "already-shot", ship: null }
console.log(game.getStats().shots); // toujours 1

// Touche sur le Croiseur, placé en (0,1) horizontal, longueur 3
console.log(game.fire(0, 1)); // { status: "hit", ship: <Croiseur> }
console.log(game.getStats().hits); // 1

console.log(game.fire(0, 2)); // "hit"
console.log(game.fire(0, 3)); // "sunk" → le Croiseur est coulé
console.log(game.getStats().sunk); // 1

// Vérification des copies
const board1 = game.getBoard();
const board2 = game.getBoard();
console.log(board1 === board2);           // false → nouvelles copies à chaque appel
console.log(board1[0] === board2[0]);     // false → lignes aussi recréées
console.log(board1[0][1].ship === board2[0][1].ship); // true → même référence de navire partagée

const fleet1 = game.getFleet();
console.log(fleet1 === game.getFleet()); // false
console.log(fleet1[0] === game.getFleet()[0]); // true → même navire partagé

console.log(game.isOver()); // false, il reste 3 navires