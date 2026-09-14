function createShip(name, length) {
  // TODO 1
  // Utiliser une closure pour encapsuler l'état d'un navire.
  // L'objet retourné doit respecter l'interface demandée dans le sujet.
  let hits = 0;
  const ship = {
    getName() {
      return name;
    },

    getLength() {
      return length;
    },

    getHits(){
      return hits;
    },

    hit() {
      if (hits < length){
        hits += 1;
      }
    },

    isSunk(){
      return hits === length;
    },
  }
  return ship;
}
