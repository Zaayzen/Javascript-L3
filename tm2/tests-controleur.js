// Test du programme par ses boutons : aucun acces a game ou a view.
function uiCards() { return [...document.querySelectorAll("#cards button")]; }
function uiNumbers() {
  return (document.querySelector("#stats").textContent.match(/\d+/g) || []).map(Number);
}
function rememberVisible(known) {
  uiCards().forEach((b, id) => { if (b.textContent !== "?") known.set(id, b.textContent); });
}
function winThroughUI() {
  const known = new Map();
  for (let id = 0; id < 16; id++) {
    uiCards()[id].click(); rememberVisible(known);
  }
  for (let n = 0; n < 100; n++) {
    const cards = uiCards().map((b, id) => ({ id, up: b.classList.contains("face-up"), matched: b.classList.contains("matched") }));
    if (cards.every(c => c.matched)) return known;
    const open = cards.filter(c => c.up && !c.matched);
    const first = open.length === 1 ? open[0] : cards.find(c => !c.up && !c.matched);
    assertTest(first !== undefined, "Etat des boutons incoherent");
    const second = cards.find(c => c.id !== first.id && known.get(c.id) === known.get(first.id));
    assertTest(second !== undefined, "Toutes les cartes doivent pouvoir etre revelees");
    uiCards()[first.id].click(); uiCards()[second.id].click();
  }
  throw new Error("Impossible de terminer la partie avec les clics");
}
function controllerChecks() {
  return [
    ["C1/C2/C5 : affichage initial", () => {
      assertTest(uiCards().length === 16, "16 boutons attendus au chargement");
      assertTest(uiCards().every(b => b.textContent === "?" && !b.disabled), "Cartes cachees et actives");
      assertTest(uiNumbers().join(",") === "0,0,8", "Statistiques initiales : 0,0,8");
    }],
    ["C3 : premier choix, second choix et nouveau rendu", () => {
      uiCards()[0].click(); assertTest(uiCards()[0].textContent !== "?", "Le premier choix doit etre affiche");
      assertTest(uiNumbers()[0] === 0, "Premier choix : zero essai");
      uiCards()[1].click(); assertTest(uiNumbers()[0] === 1, "Deuxieme choix : un essai");
      assertTest(uiCards().length === 16, "Toujours 16 boutons");
    }],
    ["C4 : nouvelle partie et nouveaux clics", () => {
      for (let i = 0; i < 3; i++) document.querySelector("#restart").click();
      assertTest(uiCards().every(b => b.textContent === "?" && !b.disabled), "Remise a zero de l'affichage");
      assertTest(uiNumbers().join(",") === "0,0,8", "Remise a zero des statistiques");
      uiCards()[0].click(); uiCards()[1].click();
      assertTest(uiNumbers()[0] === 1, "Les callbacks doivent utiliser la nouvelle partie");
    }],
    ["C2/C3 : partie complete et victoire", () => {
      document.querySelector("#restart").click(); winThroughUI();
      assertTest(uiNumbers()[1] === 8, "Huit paires attendues");
      assertTest(uiCards().every(b => b.disabled), "Toutes les cartes doivent etre desactivees");
      assertTest(document.querySelector("#message").textContent.trim() === "Toutes les paires sont retrouvées !",
        "La victoire doit etre affichee");
    }],
    ["C4 : recommencer apres la victoire", () => {
      document.querySelector("#restart").click();
      assertTest(uiNumbers().join(",") === "0,0,8", "Compteurs a zero");
      assertTest(uiCards().every(b => !b.disabled && b.textContent === "?"), "Nouvelle partie jouable");
    }]
  ];
}
function replayControllerChecks() {
  return [["Rejouer : meme disposition et reprise apres la victoire", () => {
    document.querySelector("#restart").click();
    const before = winThroughUI();
    document.querySelector("#replay").click();
    assertTest(uiNumbers().join(",") === "0,0,8", "Compteurs a zero apres Rejouer");
    assertTest(uiCards().every(b => !b.disabled && b.textContent === "?"), "Cartes cachees apres Rejouer");
    const after = winThroughUI();
    assertTest([...before].every(([id, label]) => after.get(id) === label), "Les positions doivent rester identiques");
    document.querySelector("#replay").click(); uiCards()[0].click();
    document.querySelector("#replay").click(); uiCards()[1].click();
    assertTest(uiNumbers()[0] === 0, "Vider aussi la selection d'une seule carte");
  }]];
}
