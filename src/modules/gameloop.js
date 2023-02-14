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
  let player1ships = player1board.ships;
  let player1boardblocks = player1.boardBlocks;
  player1board.placeShip(0, 1, player1ships[0]);
  player1board.placeShip(1, 3, player1ships[1]);
  player1board.placeShip(2, 1, player1ships[2]);
  player1board.placeShip(3, 5, player1ships[3]);

  let playerShipsHit = [];
  let computerShipsHit = [];

  let computer = Player("Computer");
  let computerboardblocks = computer.boardBlocks;
  let computerboard = computer.board;
  let computerships = computerboard.ships;
  computerboard.placeShip(1, 2, computerships[0]);
  computerboard.placeShip(4, 2, computerships[1]);
  computerboard.placeShip(3, 3, computerships[2]);
  computerboard.placeShip(7, 2, computerships[3]);

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

  let computerValue = [];

  const computersection = document.querySelectorAll(".computersection");
  computersection.forEach((section) => {
    section.addEventListener("click", playRound);
  });

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
          // console.log(index, i, "This is O");
          // console.log(
          //   document.querySelector(`[data-playervalue="${index + "-" + i}"]`)
          // );
          const section = document.querySelector(
            `[data-playervalue="${index + "-" + i}"]`
          );
          section.classList.add("miss");
        }
        if ((index, i, row == "X")) {
          // console.log(index, i, row, "This is X");
          const section = document.querySelector(
            `[data-playervalue="${index + "-" + i}"]`
          );
          // console.log(section);
          section.classList.add("landed");
        }
      });
    });
  }

  function checkWinner() {
    // console.log(player1ships);
    // console.log(computerships);
    // let player1ship = player1.ships;
    // let computership = computer.ships;
    // console.log(player1ship);
    // console.log(computer.ships);
    // console.log(player1ship.every((ship) => ship.isSunk() == true));
    // console.log(computerships.every((ship) => ship.isSunk() == true));
    if (player1ships.every((ship) => ship.isSunk() == true)) {
      alert(`All of ${player1.name} ships have sunk`);
    } else if (computerships.every((ship) => ship.isSunk() == true)) {
      alert(`All of ${computer.name} ships have sunk`);
    } else {
      return;
    }
  }

  return {};
})();
