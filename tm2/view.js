// Signature imposee pour la vue.
function createView(onCardClick, onRestart, onReplay) {
  // TODO V1 : document.querySelector("#identifiant") retrouve un element.
  // Conserver ici #cards, #stats, #message et #restart dans la closure.
  // Brancher le bouton Nouvelle partie avec addEventListener("click", onRestart).
  // Faire ce branchement UNE seule fois, et non dans render().
  // Retour : le nouvel element button, pas encore insere dans la page.
  const restartButton = document.querySelector("#restart");
  const cardsElement = document.querySelector("#cards");
  const statsElement = document.querySelector("#stats");
  const messageElement = document.querySelector("#message");
  const replayButton = document.querySelector("#replay");
  restartButton.addEventListener("click", onRestart);
  replayButton.addEventListener("click", onReplay);

  function createCard(card, over) {
    // TODO V2 : document.createElement("button") cree le bouton.
    // button.classList.add("card") lui ajoute sa classe de base.
    // Affecter button.textContent : "?" ou card.label selon card.faceUp.
    // Ajouter "face-up" si faceUp, puis "matched" si matched.
    // Affecter button.disabled avec le booleen approprie.
    // Enregistrer un callback avec button.addEventListener("click", ...).
    // Ce callback doit appeler onCardClick(card.id) AU MOMENT du clic.
    // Retourner le bouton avec return.
    const button = document.createElement("button");
    button.textContent = card.faceUp ? card.label : "?";
    button.classList.add("card");
    button.disabled = over || card.faceUp;
    if(card.faceUp) button.classList.add("face-up");
    if(card.matched) button.classList.add("matched");
    button.addEventListener("click", () => onCardClick(card.id));
    return button;
  }

  function renderCards(cards, over) {
    // TODO V3 : vider le conteneur avec element.textContent = "".
    // Parcourir cards, creer chaque bouton avec createCard(card, over),
    // puis l'inserer avec conteneur.append(bouton).
    cardsElement.textContent = "";
    cards.forEach(card => 
      cardsElement.append(createCard(card, over))
    );
  }

  function renderStats(stats) {
    // TODO V4 : affecter textContent a la zone #stats.
    // Utiliser stats.moves, stats.matchedPairs et stats.totalPairs.
    statsElement.textContent = `Coups : ${stats.moves}, Paires trouvées : ${stats.matchedPairs}/${stats.totalPairs}`;
  }

  function renderMessage(over) {
    // TODO V4 : affecter textContent a #message selon le booleen over.
    messageElement.textContent = over ? "Toutes les paires sont retrouvées !" : "Choisissez une carte cachée.";
  }

  // Signature et ordre des arguments a respecter dans le controleur que vous ecrirez.
  function render(cards, stats, over) {
    // TODO V4 : appeler renderCards, renderStats et renderMessage.
    // Ne pas installer ici l'ecouteur du bouton Nouvelle partie.
    renderCards(cards, over);
    renderStats(stats);
    renderMessage(over);
  }

  return { render };
}
