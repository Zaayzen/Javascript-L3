function createBoard(size) {
  // TODO 2
  const board = [];

  for(let row = 0; row < size; row++){
    const rowArray = [];
    for(let col = 0; col < size; col++){
      rowArray.push({ship : null, shot : false});
    }
    board.push(rowArray);
  }
  return board;
}

function placeShip(board, ship, row, col, direction) {
  // TODO 3
  const length = ship.getLength();

  for(let i = 0; i < length; i++){
    const r = direction === "vertical" ? row + i : row;
    const c = direction === "horizontal" ? col + i : col;

    board[r][c].ship = ship;
  }
  return board;
}

function shoot(board, row, col) {
  // TODO 4
  const cell = board[row][col];
  if(cell.shot){
    return {status: "already-shot", ship: null};
  }
  cell.shot = true;

  if(cell.ship === null){
    return {
      status: "miss", ship: null
    }
  }
  cell.ship.hit();
  if(cell.ship.isSunk()){
    return {status: "sunk", ship: cell.ship};
  }
  return {status: "hit", ship: cell.ship};
}
