import { Player } from "./player";

export const game = (() => {
  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
  }

  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }

  let player1 = Player("User");
  let player1board = player1.board;
  let player1ships = player1board.ships;

  let computer = Player("Computer");

  let computerboard = computer.board;
  let computerships = computerboard.ships;

  const newgame = document.querySelector(".prestart");
  newgame.addEventListener("click", startGame);

  function startGame() {
    newgame.style.display = "none";

    player1ships.forEach((ship) => player1board.randomPlaceShip(ship));
    computerships.forEach((ship) => computerboard.randomPlaceShip(ship));

    renderPlayerBoard();
    renderComputerBoard();

    const computersection = document.querySelectorAll(".computersection");
    computersection.forEach((section) => {
      section.addEventListener("click", playRound, { once: true });
    });
  }

  function renderPlayerBoard() {
    const gameboard = document.createElement("div");
    gameboard.classList.add("playergame-board");
    const gameboardcontainer = document.querySelector(".gameboard-container");
    const playerboardcontainer = document.createElement("div");
    playerboardcontainer.classList.add("player-container");
    const userheader = document.createElement("h3");
    userheader.textContent = "User Board";

    let player1grid = player1board.grid;

    player1grid.forEach((col, index) => {
      const gameboardiv = document.createElement("div");
      gameboardiv.classList.add("block-number");
      col.forEach((row, i) => {
        const subgameboardiv = document.createElement("div");
        subgameboardiv.classList.add("section");
        subgameboardiv.setAttribute("data-playervalue", index + "-" + i);
        if (row) {
          subgameboardiv.classList.add("taken");
          subgameboardiv.classList.add(row);
        }
        gameboardiv.appendChild(subgameboardiv);
      });
      gameboard.appendChild(gameboardiv);
    });
    gameboardcontainer.appendChild(gameboard);
  }

  function renderComputerBoard() {
    const computerheader = document.createElement("h3");
    computerheader.textContent = "Computer Board";
    const computercontainer = document.createElement("div");
    computercontainer.classList.add("computer-container");
    const computergameboard = document.createElement("div");
    computergameboard.classList.add("computer-board");
    const gameboardcontainer = document.querySelector(".gameboard-container");
    let computergrid = computerboard.grid;

    computergrid.forEach((col, index) => {
      const gameboardiv = document.createElement("div");
      gameboardiv.classList.add("computerblock-number");
      col.forEach((row, i) => {
        const subgameboardiv = document.createElement("div");
        subgameboardiv.classList.add("computersection");
        subgameboardiv.setAttribute("data-computervalue", index + "-" + i);
        if (row) {
          subgameboardiv.classList.add("taken");
          subgameboardiv.classList.add(row);
        }
        gameboardiv.appendChild(subgameboardiv);
      });

      computergameboard.appendChild(gameboardiv);
    });
    gameboardcontainer.appendChild(computergameboard);
  }

  function playRound(e) {
    let targetValue = e.target.getAttribute("data-computervalue");

    if (e.target.classList.contains("taken")) {
      e.target.classList.add("landed");
    } else {
      e.target.classList.add("miss");
    }

    player1.attackComputer(computerboard, targetValue[0], targetValue[2]);
    computerSelection();
    checkWinner();
  }

  function computerSelection() {
    let player1grid = player1board.grid;
    computer.randomAttack(player1board);

    player1grid.forEach((col, index) => {
      col.forEach((row, i) => {
        if ((index, i, row == "O")) {
          const section = document.querySelector(
            `[data-playervalue="${index + "-" + i}"]`
          );
          section.classList.add("miss");
        }
        if ((index, i, row == "X")) {
          const section = document.querySelector(
            `[data-playervalue="${index + "-" + i}"]`
          );

          section.classList.add("landed");
        }
      });
    });
  }

  function checkWinner() {
    const modal = document.getElementById("modal");
    if (player1ships.every((ship) => ship.isSunk() == true)) {
      const modalwinner = document.querySelector(".displaywinner");
      modalwinner.textContent = ` Bummer!! You lost to the ${computer.name}`;
      openModal(modal);
    } else if (computerships.every((ship) => ship.isSunk() == true)) {
      const modalwinner = document.querySelector(".displaywinner");
      modalwinner.textContent = ` Congratulations ${player1.name}! You Win!`;
      openModal(modal);
    } else {
      return;
    }
  }

  const playAgain = document.querySelector(".restart");
  playAgain.addEventListener("click", playGameAgain);

  function playGameAgain() {
    const modal = document.getElementById("modal");
    closeModal(modal);

    const gameboardcontainer = document.querySelector(".gameboard-container");
    while (gameboardcontainer.firstChild) {
      gameboardcontainer.removeChild(gameboardcontainer.firstChild);
    }
    let player1grid = player1board.grid;
    let computergrid = computerboard.grid;

    player1board.clearBoard(player1grid);
    computerboard.clearBoard(computergrid);

    player1ships.forEach((ship) => player1board.randomPlaceShip(ship));
    computerships.forEach((ship) => computerboard.randomPlaceShip(ship));

    computerships.forEach((ship) => {
      ship.hits = 0;
    });

    renderPlayerBoard();
    renderComputerBoard();

    const computersection = document.querySelectorAll(".computersection");
    computersection.forEach((section) => {
      section.addEventListener("click", playRound, { once: true });
    });
  }
})();
