const newGameButton = document.querySelector("#newGameButton");
let game = createGame();

function render() {
  renderBoard(game.getBoard(), handleShot, game.isOver());
  renderStats(game.getStats());
  renderFleet(game.getFleet());
}

function messageFor(result) {
  if (result.status === "miss") return "À l'eau !";
  if (result.status === "already-shot") return "Case déjà jouée.";
  if (result.status === "sunk") return `${result.ship.getName()} coulé !`;
  return `${result.ship.getName()} touché !`;
}

function handleShot(row, col) {
  const result = game.fire(row, col);
  showMessage(messageFor(result));

  if (game.isOver()) {
    showMessage(`Victoire en ${game.getStats().shots} tirs !`);
  }

  render();
}

newGameButton.addEventListener("click", () => {
  game = createGame();
  showMessage("Nouvelle partie.");
  render();
});

render();
