// Donnees fictives : aucun modele ni controleur n'est charge ici.
let fixtureView;
const observed = { cards: [], restarts: 0, replays: 0 };
const fixtureCards = [
  { id: 12, label: null, faceUp: false, matched: false },
  { id: 5, label: "Chat", faceUp: true, matched: false },
  { id: 9, label: "Loup", faceUp: true, matched: true }
];
const fixtureStats = { moves: 5, matchedPairs: 2, totalPairs: 8 };
function fixtureRender(over = false) {
  fixtureView.render(fixtureCards, fixtureStats, over);
}
function cardButtons() { return [...document.querySelectorAll("#cards button")]; }
function viewChecks() {
  return [
    ["V1 : creer la vue et son API", () => {
      fixtureView = createView(id => observed.cards.push(id),
        () => observed.restarts++, () => observed.replays++);
      assertTest(fixtureView && typeof fixtureView.render === "function", "Retourner un objet avec render");
    }],
    ["V2/V3 : trois cartes, textes et classes", () => {
      fixtureRender(); const b = cardButtons();
      assertTest(b.length === 3, "Trois boutons attendus");
      assertTest(b.map(x => x.textContent).join("|") === "?|Chat|Loup", "Textes attendus : ?, Chat, Loup");
      assertTest(b.every(x => x.classList.contains("card")), "Classe card manquante");
      assertTest(!b[0].classList.contains("face-up") && b[1].classList.contains("face-up"), "Verifier face-up");
      assertTest(b[2].classList.contains("matched"), "Classe matched manquante");
    }],
    ["V2 : callback au clic et identifiant exact", () => {
      assertTest(observed.cards.length === 0, "Le rendu ne doit pas appeler onCardClick");
      const b = cardButtons();
      assertTest(!b[0].disabled && b[1].disabled && b[2].disabled, "Seule la carte cachee doit etre active");
      b[0].click(); b[1].click(); b[2].click();
      assertTest(observed.cards.length === 1 && observed.cards[0] === 12,
        "Transmettre card.id (12), et non son indice dans le tableau (0)");
    }],
    ["V3 : deux rendus ne doublent pas les cartes", () => {
      fixtureRender(); fixtureRender();
      assertTest(cardButtons().length === 3, "Vider le conteneur avant de reconstruire");
      cardButtons()[0].click();
      assertTest(observed.cards.length === 2, "Un clic doit declencher une seule action");
    }],
    ["V4 : statistiques et message courant", () => {
      const numbers = (document.querySelector("#stats").textContent.match(/\d+/g) || []).map(Number);
      assertTest(numbers[0] === 5 && numbers[1] === 2 && numbers[2] === 8,
        "Afficher essais, paires acquises, total, dans cet ordre");
      assertTest(document.querySelector("#message").textContent.trim() === "Choisissez une carte cachée.",
        "Message attendu : Choisissez une carte cachee.");
    }],
    ["V1 : un seul ecouteur Nouvelle partie", () => {
      document.querySelector("#restart").click();
      assertTest(observed.restarts === 1, "Brancher onRestart une fois, dans createView");
    }],
    ["V4 : rendu termine et donnees inchangees", () => {
      const before = JSON.stringify(fixtureCards); fixtureRender(true);
      assertTest(cardButtons().every(x => x.disabled), "Desactiver tous les boutons");
      assertTest(document.querySelector("#message").textContent.trim() === "Toutes les paires sont retrouvées !",
        "Message de victoire attendu");
      assertTest(JSON.stringify(fixtureCards) === before, "La vue ne doit pas modifier les donnees");
    }]
  ];
}
