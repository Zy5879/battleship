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
      return false;
    }
  }

  function clearBoard(board) {
    createMap(10, 10);
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
