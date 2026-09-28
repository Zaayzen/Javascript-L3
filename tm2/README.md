# TP2 — Memory : modèle, vue, contrôleur

Ouvrir les pages HTML par double-clic, après avoir extrait l'archive.
Aucun serveur, aucune installation. Les scripts classiques sont à la fin du
body, sans import/export ni defer. Le HTML et le CSS du jeu sont fournis.

## Travail

1. game.js : compléter uniquement getStats() et isOver() (M1/M2).
   Les règles et les copies de cartes sont fournies. Inutile de lire tout le modèle.
2. view.js : compléter V1 à V4, avec les signatures données.
3. main.js : écrire le contrôleur ; seuls les noms des fonctions sont fournis.
4. Prolongement : reset(), bouton Rejouer et callback replay().

## Tests fournis

- tests-modele.html : charger seulement le modèle et vérifier son API.
- tests-vue.html : tester la vue avec des données fictives ; aucun modèle ni main.js.
- tests-controleur.html : tester la partie par des clics après écriture du contrôleur.
- index.html : jouer normalement, sans scripts de test.

Ouvrir la page de test correspondant à l'étape, cliquer sur Lancer les tests,
puis lire les résultats OK / ECHEC. Corriger le fichier demandé, recharger et
relancer. Les scripts de test ne sont ni à recopier ni à étudier. La console
reste disponible pour vos propres petites vérifications.

Le bouton de test supplémentaire de l'exercice 4 est à utiliser uniquement
après réalisation de Rejouer. La page de test de vue contient déjà le bouton
replay (caché dans le kit de départ) et fournit un troisième callback ; elle
reste donc utilisable après extension de createView.

Au début, index.html montre seulement le HTML : main.js n'exécute encore rien.
Les tests échouent tant que les fonctions concernées ne sont pas complétées.
Un test peut échouer à cause d'une fonction précédente : corriger dans l'ordre.

## Signatures

- Modèle : createGame() -> {selectCard, getCards, getStats, isOver}.
- Vue : createView(onCardClick, onRestart) -> {render}.
- Rendu : render(cards, stats, over).
- Contrôleur : refresh(), selectCard(id), restart().

Les tests du contrôleur supposent que les cartes restent dans l'ordre du tableau
et que les statistiques affichent essais, paires acquises, total dans cet ordre.
Les deux messages à afficher sont donnés dans l'énoncé.
