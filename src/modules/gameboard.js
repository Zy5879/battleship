import { Ship } from "./ship";

const Gameboard = () => {
  let cruiser = Ship("Cruiser", 5);
  let battleship = Ship("Battleship", 4);
  let submarine = Ship("Submarine", 3);
  let destroyer = Ship("Destroyer", 2);

  const ships = [cruiser, battleship, submarine, destroyer];
  let grid = [];
  const createMap = (rows, columns) => {
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < columns; j++) {
        grid[i][j] = "";
      }
    }
    return grid;
  };

  function placeShip(x, y, ship) {
    for (let i = 0; i < ship.length; i++) {
      grid[Number(x)][Number(y) + i] = ship.names;
    }
  }

  function randomPlaceShip(ship) {
    let xRandomNumber = Math.floor(Math.random() * 9);
    let yRandomNumber = Math.floor(Math.random() * 9);

    if (yRandomNumber + ship.length > grid[xRandomNumber].length) {
      yRandomNumber = yRandomNumber - ship.length;
    } else {
      yRandomNumber;
    }

    let numbers = [];
    for (let i = 0; i < ship.length; i++) {
      numbers.push(yRandomNumber + i);
    }

    const isValid = numbers.every((num) => grid[xRandomNumber][num] == "");

    if (isValid) {
      numbers.forEach((num) => {
        grid[xRandomNumber][num] = ship.names;
      });
    } else {
      randomPlaceShip(ship);
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

  function clearBoard(board) {
    board.createMap(10, 10);
  }

  return {
    createMap,
    clearBoard,
    getBoard,
    randomPlaceShip,
    recieveAttack,
    placeShip,
    grid,
    ships,
  };
};

export { Gameboard };
// export { Gameboard, cruiser, submarine, destroyer, battleship };

// let board = Gameboard();
// board.createMap(10, 10);
// let playerships = board.ships;
// board.placeShip(0, 1, playerships[0]);
// board.recieveAttack(0, 1);
// console.log(board);

// let board2 = Gameboard();
// board2.createMap(10, 10);
// let computerships = board2.ships;
// board2.placeShip(0, 1, computerships[0]);
// console.log(board2);

// console.log(board.createMap(10, 10).length);
// let player1grid = board.grid;
// board.placeShip(0, 1, battleship);
// board.recieveAttack(0, 0);
// console.log(player2);
