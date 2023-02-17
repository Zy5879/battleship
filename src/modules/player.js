import { Ship } from "./ship";
import { Gameboard } from "./gameboard";

export const Player = (name) => {
  let board = Gameboard();
  board.createMap(10, 10);
  let boardgrid = board.grid;

  function attackComputer(board, x, y) {
    board.recieveAttack(x, y);
  }

  function randomAttack(grid) {
    let xRandomNumber = Math.floor(Math.random() * 9);
    let yRandomNumber = Math.floor(Math.random() * 9);

    if (boardgrid[Number(xRandomNumber)][Number(yRandomNumber)] == "X") {
      console.log(xRandomNumber, yRandomNumber);
      randomAttack(grid);
    } else if (boardgrid[Number(xRandomNumber)][Number(yRandomNumber)] == "O") {
      console.log(xRandomNumber, yRandomNumber);
      randomAttack(grid);
    } else if (grid.recieveAttack(xRandomNumber, yRandomNumber) == false) {
      randomAttack(grid);
    } else {
      grid.recieveAttack(xRandomNumber, yRandomNumber);
    }
  }
  return {
    name,
    boardgrid,
    board,
    randomAttack,
    attackComputer,
  };
};
