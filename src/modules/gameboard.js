import Ship from "./ship";

let cruiser = Ship("Cruiser", 5);
let battleship = Ship("Battleship", 4);
let submarine = Ship("Submarine", 3);
let destroyer = Ship("Destroyer", 2);

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
    if (grid[x].length < ship.shift || ship.shift == 0) {
      return;
    }
    if (grid[x][y] !== null) {
      return;
    } else {
      ship.shift--;
      grid[x][y] = ship;
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

  const recieveAttack = (x, y) => {
    let miss = "X";
    if (grid[x][y] == miss) {
      return;
    }
    if (grid[x][y] == null) {
      grid[x][y] = miss;
    }
    if (grid[x][y] == cruiser) {
      cruiser.hits++;
    }
    if (grid[x][y] == battleship) {
      battleship.hits++;
    }
    if (grid[x][y] == submarine) {
      submarine.hits++;
    }
    if (grid[x][y] == destroyer) {
      destroyer.hits++;
    }
    aShipSunk();

    //   grid[x][y] == cruiser ||
    //   grid[x][y] == battleship ||
    //   grid[x][y] == submarine ||
    //   grid[x][y] == destroyer
    // ) {
    //   return (
    //     battleship.hit() || cruiser.hit() || submarine.hit() || destroyer.hit()
    //   );
    // }
    // if (grid[x][y] == null) {
    //   console.log("Something is here pt2");
    // }
    // if (grid[x][y] !== cruiser || battleship || submarine || destroyer) {
    //   grid[x][y] = miss;
    // } else {
    //   cruiser.hit() || battleship.hit() || submarine.hit() || destroyer.hit();
    // }
  };

  const aShipSunk = () => {
    if (destroyer.hits == 2) {
      console.log(`${destroyer.names} sunk`);
    }
    if (cruiser.hits == 5) {
      console.log(`${cruiser.names} sunk`);
    }
    if (submarine.hits == 3) {
      console.log(`${submarine.names} sunk`);
    }
    if (battleship.hits == 4) {
      console.log(`${battleship.names} sunk`);
    }
  };

  //     if ((grid[x][y] = Ship)) {
  //       console.log("what");
  //     }
  //   };

  //   const placeShip = (x, y, ship) => {
  //     if (ship.length == 0) {
  //       return;
  //     } else {
  //       checkShipValidity(x, y, ship);
  //     }
  //   };

  return {
    createMap,
    getBoard,
    checkShipValidity,
    recieveAttack,
    grid,
  };
})();

export default Gameboard;
let board = Gameboard;
board.createMap(10, 10);
console.log(board);
// board.recieveAttack(0, 0);
// let cruiser = Ship("Cruiser", 3);
// let gridboard = board.grid;
// board.checkShipValidity(0, 0, destroyer);
// board.recieveAttack(0, 1);
// board.recieveAttack(0, 0);
// destroyer.isSunk();

// destroyer.isSunk();
// console.log(board);
// console.log(gridboard[0].slice(0, 2));
// console.log(gridboard[0]);
// let lifeboat = Ship("LifeBoat", 2);
// let boardgrid = board.grid;
// boardgrid[1][0] = lifeboat;
// console.log(board.getBoard());
// board.placeShip(0, 0, cruiser);
// console.log(board);
// for (const i of board[0]) {
//   console.log(i);
// }
