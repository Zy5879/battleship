import {
  Gameboard,
  cruiser,
  submarine,
  destroyer,
  battleship,
} from "./gameboard";
import { Player } from "./player";
import { Ship } from "./ship";

export const game = (() => {
  let player1 = Player("Zaire");
  let player1board = player1.board;
  player1board.placeShip(0, 1, cruiser);
  player1board.placeShip(1, 3, battleship);
  player1board.placeShip(2, 1, submarine);
  player1board.placeShip(3, 5, destroyer);

  let computer = Player("Computer");
  let computerboard = computer.board;
  computerboard.placeShip(1, 2, cruiser);
  computerboard.placeShip(4, 2, battleship);
  computerboard.placeShip(3, 3, destroyer);
  computerboard.placeShip(7, 2, submarine);

  renderPlayerBoard();
  renderComputerBoard();

  function renderPlayerBoard() {
    const gameboard = document.createElement("div");
    gameboard.classList.add("playergame-board");
    const gameboardcontainer = document.querySelector(".gameboard-container");
    let player1grid = player1board.grid;

    for (const i of player1grid) {
      const gameboardiv = document.createElement("div");
      gameboardiv.classList.add("block-number");
      for (const j of i) {
        const subgameboardiv = document.createElement("div");
        subgameboardiv.classList.add("section");
        // subgameboardiv.innerHTML = `${j}`;
        if (j) {
          subgameboardiv.classList.add("taken");
        }
        gameboardiv.appendChild(subgameboardiv);
      }
      gameboard.appendChild(gameboardiv);
    }
    gameboardcontainer.appendChild(gameboard);
  }

  function renderComputerBoard() {
    const computergameboard = document.createElement("div");
    computergameboard.classList.add("computer-board");
    const gameboardcontainer = document.querySelector(".gameboard-container");
    let computergrid = computerboard.grid;

    for (const i of computergrid) {
      const computergameboardiv = document.createElement("div");
      computergameboardiv.classList.add("computerblock-number");
      for (const j of i) {
        const subgameboardiv = document.createElement("div");
        subgameboardiv.classList.add("computersection");
        if (j) {
          subgameboardiv.classList.add("taken");
        }
        computergameboardiv.appendChild(subgameboardiv);
      }
      computergameboard.appendChild(computergameboardiv);
    }
    gameboardcontainer.appendChild(computergameboard);
  }

  function playRound(e) {
    if (e.target.classList.contains("taken")) {
      e.target.classList.add("landed");
    } else {
      e.target.classList.add("miss");
    }
  }

  const computersection = document.querySelectorAll(".computersection");
  computersection.forEach((section) => {
    section.addEventListener("click", playRound);
  });

  //   const computersection = document.querySelectorAll(".computersection");
  //   computersection.forEach((section) => {
  //     section.addEventListener("click", () => {
  //       if (section.classList.contains("taken")) {
  //         console.log("this spot is taken");
  //         section.classList.add("landed");
  //       } else {
  //         section.classList.add("miss");
  //         console.log("This spot is not taken");
  //       }
  //     });
  //   });
  return {
    // player1,
    // computer,
    // renderGameBoard,
  };
})();
