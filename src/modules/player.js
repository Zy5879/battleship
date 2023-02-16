import { Ship } from "./ship";
import {
  Gameboard,
  // submarine,
  // cruiser,
  // destroyer,
  // battleship,
} from "./gameboard";

export const Player = (name) => {
  let board = Gameboard();
  board.createMap(10, 10);

  let boardBlocks = [];

  // let cruiser = Ship("Cruiser", 5);
  // let battleship = Ship("Battleship", 4);
  // let submarine = Ship("Submarine", 3);
  // let destroyer = Ship("Destroyer", 2);

  // const ships = [submarine, cruiser, destroyer, battleship];

  function attackComputer(board, x, y) {
    board.recieveAttack(x, y);
  }

  function randomAttack(grid) {
    let xRandomNumber = Math.floor(Math.random() * 9);
    let yRandomNumber = Math.floor(Math.random() * 9);

    if ([Number(xRandomNumber)][Number(yRandomNumber)] == "X") {
      randomAttack(grid);
    } else {
      grid.recieveAttack(xRandomNumber, yRandomNumber);
    }
  }
  return {
    name,
    // ships,
    board,
    boardBlocks,
    randomAttack,
    attackComputer,
  };
};

// let player2 = Player("Computer");

// let playerboard = player1.board;
// playerboard.placeShip(0, 1, cruiser);
// let computerboard = player2.board;
// computerboard.placeShip(0, 1, battleship);
// player2.randomAttack(0, 1, playerboard);
// player2.randomAttack(playerboard);
// player2.randomAttack(playerboard);

// console.log(player1);
// console.log(player2);
