const boardElement = document.querySelector("#board");
const messageElement = document.querySelector("#message");
const shotsElement = document.querySelector("#shots");
const hitsElement = document.querySelector("#hits");
const sunkElement = document.querySelector("#sunk");
const fleetElement = document.querySelector("#fleet");

function renderBoard(board, onCellClick, disabled = false) {
  boardElement.innerHTML = "";
  boardElement.style.setProperty("--size", board.length);

  board.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      const button = document.createElement("button");
      button.className = "cell";
      button.type = "button";
      button.setAttribute("aria-label", `Case ${rowIndex + 1}, ${colIndex + 1}`);

      if (cell.shot && cell.ship !== null) {
        button.textContent = "×";
        button.classList.add("hit");
      } else if (cell.shot) {
        button.textContent = "•";
        button.classList.add("miss");
      }

      button.disabled = disabled || cell.shot;
      button.addEventListener("click", () => onCellClick(rowIndex, colIndex));
      boardElement.appendChild(button);
    });
  });
}

function renderStats(stats) {
  shotsElement.textContent = stats.shots;
  hitsElement.textContent = stats.hits;
  sunkElement.textContent = stats.sunk;
}

function renderFleet(fleet) {
  fleetElement.innerHTML = "";
  fleet.forEach(ship => {
    const item = document.createElement("li");
    item.textContent = `${ship.getName()} (${ship.getLength()}) : ${ship.isSunk() ? "coulé" : "à flot"}`;
    fleetElement.appendChild(item);
  });
}

function showMessage(text) {
  messageElement.textContent = text;
}
