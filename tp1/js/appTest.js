const blou = createShip("Croiser", 3);
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
console.log(tab[1][0].ship === tab[2][0].ship);