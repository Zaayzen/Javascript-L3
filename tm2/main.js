// Controleur a ecrire. Les signatures suivantes sont imposees.
// C1 : creer ici une partie et une vue, puis connecter leurs actions.
let game = createGame();
const view = createView(selectCard, restart, replay);

function refresh() {
  // TODO C2
  const cards = game.getCards();
  const stats = game.getStats();
  const over = game.isOver();
  view.render(cards, stats, over);
}

function selectCard(id) {
  // TODO C3
  game.selectCard(id);
  refresh();
}

function restart() {
  // TODO C4
  game = createGame();
  refresh();

}

function replay() {
  // TODO C4
  game.reset();
  refresh();
}

// C5 : declencher ici le premier affichage.
refresh();