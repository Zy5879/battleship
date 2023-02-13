import { Ship } from "./ship";

let cruiser = Ship("Cruiser", 5);
let battleship = Ship("Battleship", 4);
let submarine = Ship("Submarine", 3);
let destroyer = Ship("Destroyer", 2);

const ships = [cruiser, battleship, submarine, destroyer];

const Gameboard = () => {
  let grid = [];
  const createMap = (rows, columns) => {
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < columns; j++) {
        // grid[i][j] = "0";
        grid[i][j] = "";
        // console.log(i + "-" + j);
        // console.log(i, j);
        // addCell(i, j);
      }
    }
    return grid;
  };

  function addCell(i, j) {
    grid[i][j] = cell(i, j);
  }
  function cell(i, j) {
    console.log(i + "-" + j);
  }

  function placeShip(x, y, ship) {
    for (let i = 0; i < ship.length; i++) {
      grid[Number(x)][Number(y) + i] = ship.names;
    }
  }

  const getBoard = () => {
    return grid;
  };

  function recieveAttack(x, y) {
    // let board = grid;
    if (grid[x][y] == cruiser.names) {
      grid[x][y] = "X";
      cruiser.attack();
    } else if (grid[x][y] == battleship.names) {
      grid[x][y] = "X";
      battleship.attack();
    } else if (grid[x][y] == submarine.names) {
      grid[x][y] = "X";
      submarine.attack();
    } else if (grid[x][y] == destroyer.names) {
      grid[x][y] = "X";
      destroyer.attack();
    } else if (grid[x][y] == "") {
      grid[x][y] = "O";
    } else {
      console.log("Coord has already been attacked");
    }
  }

  return {
    createMap,
    getBoard,
    recieveAttack,
    placeShip,
    grid,
  };
};

export { Gameboard, cruiser, submarine, destroyer, battleship };

// let board = Gameboard();
// board.createMap(10, 10);

// console.log(board.createMap(10, 10).length);
// let player1grid = board.grid;
// board.placeShip(0, 1, battleship);
// board.recieveAttack(0, 0);
// console.log(player2);
