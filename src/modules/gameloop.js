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
  let player1boardblocks = player1.boardBlocks;
  player1board.placeShip(0, 1, cruiser);
  player1board.placeShip(1, 3, battleship);
  player1board.placeShip(2, 1, submarine);
  player1board.placeShip(3, 5, destroyer);

  let playerShipsHit = [];
  let computerShipsHit = [];

  let computer = Player("Computer");
  let computerboardblocks = computer.boardBlocks;
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

    player1grid.forEach((col, index) => {
      // console.log(index);
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

  const computersection = document.querySelectorAll(".computersection");
  computersection.forEach((section) => {
    section.addEventListener("click", playRound);
  });

  function playRound(e) {
    if (e.target.classList.contains("taken")) {
      e.target.classList.add("landed");
    } else {
      e.target.classList.add("miss");
    }
    computerSelection();
  }

  function computerSelection() {
    let player1grid = player1board.grid;
    computer.randomAttack(player1board);
    // const playersection = document.querySelectorAll(".section");

    player1grid.forEach((col, index) => {
      col.forEach((row, i) => {
        if ((index, i, row == "O")) {
          console.log(index, i, "This is O");
          console.log(
            document.querySelector(`[data-playervalue="${index + "-" + i}"]`)
          );
          const section = document.querySelector(
            `[data-playervalue="${index + "-" + i}"]`
          );
          section.classList.add("miss");
        }
        if ((index, i, row == "X")) {
          console.log(index, i, row, "This is X");
          const section = document.querySelector(
            `[data-playervalue="${index + "-" + i}"]`
          );
          console.log(section);
          section.classList.add("landed");
        }
        // console.log(index, i, row);
      });
    });
  }

  // function renderPlayerBoard() {
  //   const gameboard = document.createElement("div");
  //   gameboard.classList.add("playergame-board");
  //   const gameboardcontainer = document.querySelector(".gameboard-container");
  //   let player1grid = player1board.grid;

  //   for (const i of player1grid) {
  //     const gameboardiv = document.createElement("div");
  //     gameboardiv.classList.add("block-number");
  //     for (const j of i) {
  //       console.log(j, i);
  //       const subgameboardiv = document.createElement("div");
  //       subgameboardiv.classList.add("section");
  //       player1boardblocks.push(subgameboardiv);
  //       // subgameboardiv.innerHTML = `${j}`;
  //       if (j) {
  //         subgameboardiv.classList.add("taken");
  //         subgameboardiv.classList.add(j);
  //       }
  //       gameboardiv.appendChild(subgameboardiv);
  //     }
  //     gameboard.appendChild(gameboardiv);
  //   }
  //   gameboardcontainer.appendChild(gameboard);
  // }

  // function renderComputerBoard() {
  //   const computergameboard = document.createElement("div");
  //   computergameboard.classList.add("computer-board");
  //   const gameboardcontainer = document.querySelector(".gameboard-container");
  //   let computergrid = computerboard.grid;

  //   for (const i of computergrid) {
  //     const computergameboardiv = document.createElement("div");
  //     computergameboardiv.classList.add("computerblock-number");
  //     console.log(i);
  //     for (const j of i) {
  //       const subgameboardiv = document.createElement("div");
  //       subgameboardiv.classList.add("computersection");
  //       computerboardblocks.push(subgameboardiv);
  //       if (j) {
  //         subgameboardiv.classList.add("taken");
  //         subgameboardiv.classList.add(j);
  //       }
  //       computergameboardiv.appendChild(subgameboardiv);
  //     }
  //     computergameboard.appendChild(computergameboardiv);
  //   }
  //   gameboardcontainer.appendChild(computergameboard);
  // }

  // const computersection = document.querySelectorAll(".computersection");
  // computersection.forEach((section) => {
  //   section.addEventListener("click", playRound);
  // });

  // function playRound(e) {
  //   if (e.target.classList.contains("taken")) {
  //     e.target.classList.add("landed");
  //   } else {
  //     e.target.classList.add("miss");
  //   }
  //   computerSelection();
  // }

  // function computerSelection() {
  //   computer.randomAttack(player1board);
  //   let playerships = player1.ships;
  //   const playersection = document.querySelectorAll(".section");
  //   let player1grid = player1board.grid;
  //   player1grid.forEach((column, index) => {
  //     console.log(column, index);
  //     column.forEach((row, index) => {});
  //   });

  // }

  return {
    // player1,
    // computer,
    // renderGameBoard,
  };
})();