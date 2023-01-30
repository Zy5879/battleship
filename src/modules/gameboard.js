import Ship from "./ship";

const Gameboard = (() => {
  let grid = [];
  const createMap = (rows, columns) => {
    for (let i = 0; i < rows; i++) {
      grid[i] = [];
      for (let j = 0; j < columns; j++) {
        grid[i][j] = null;
      }
    }
    return grid;
  };

  const getBoard = () => {
    return grid;
  };

  const checkShipValidity = (x, y, ship) => {
    if (grid[x].length < ship.length || ship.length == 0) {
      return;
    }
    if (grid[x][y] !== null) {
      return;
    } else {
      ship.length--;
      console.log(ship);
      checkShipValidity(x, y + 1, ship);
    }
    // while (ship.length !== 0) {
    //   if (grid[x][y] == null) {
    //     console.log(ship.name);
    //     ship.length - 1;
    //     checkShipValidity(x, y + 1, ship);
    //   }
    // }

    // for(const i of grid[x]) {
    //     if(i)
    // }
    // if (grid[x].length > ship.length) {
    //   console.log(true);
    // } else {
    //   console.log(false);
    // }
  };

  return {
    createMap,
    getBoard,
    checkShipValidity,
    grid,
  };
})();

export default Gameboard;
let board = Gameboard;
board.createMap(10, 10);
let cruiser = Ship("Cruiser", 3);
// let lifeboat = Ship("LifeBoat", 2);
// let boardgrid = board.grid;
// boardgrid[1][0] = lifeboat;
// console.log(board.getBoard());
board.checkShipValidity(1, 0, cruiser);

// for (const i of board[0]) {
//   console.log(i);
// }
