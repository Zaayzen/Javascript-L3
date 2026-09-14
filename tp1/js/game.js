function createDefaultFleet() {
  // TODO 5
  return[{
    ship: createShip("Croiseur", 3),
    row: 0,
    col: 1,
    direction: "horizontal"
  },
  {
    ship: createShip("Frégate", 3),
    row: 2,
    col: 6,
    direction: "vertical"
  },
  {
    ship: createShip("Destroyer", 2),
    row: 5,
    col: 1,
    direction: "vertical"
  },
  {
    ship: createShip("Patrouilleur", 2),
    row:7,
    col:4,
    direction: "horizontal"
  }
  ];
}

function createGame(size = 8) {
  // TODO 6
  // Utiliser une closure pour encapsuler l'état global d'une partie.
  const board = createBoard(size);
  const placements = createDefaultFleet();

  const fleet = placements.map(placement => placement.ship);
  placements.forEach(({ship, row, col, direction}) => {
    placeShip(board, ship, row, col, direction);
  });

  let shotCounts = 0;

  return{
    fire(row, col){
      const result = shoot(board, row, col);
      if(result.status !== "already-shot"){
        shotCounts ++;
      }
      return result;
    },
    getFleet(){
      return [...fleet];
    },
    getBoard(){
      return board.map(rowArray => rowArray.map(cell => ({ ...cell })));
    },
    getStats(){
      const hits = fleet.reduce((total, ship) => total + ship.getHits(), 0);
      const sunk = fleet.filter(ship => ship.isSunk()).length;
      return {
        shots: shotCounts,
        hits,
        sunk,
        totalShips: fleet.length
      };
    },
    isOver(){
      return fleet.every(ship => ship.isSunk());
    },
  };
}
