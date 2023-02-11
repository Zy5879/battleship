import { Ship } from "./ship";
import {
  Gameboard,
  submarine,
  cruiser,
  destroyer,
  battleship,
} from "./gameboard";

export const Player = (name) => {
  let board = Gameboard();
  board.createMap(10, 10);

  const ships = [submarine, cruiser, destroyer, battleship];

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
    ships,
    board,
    randomAttack,
  };
};

// let player1 = Player("Zaire");
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
