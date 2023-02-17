import { Gameboard } from "../modules/gameboard";
import { Ship } from "../modules/ship";

test("Gameboard Array to be equal to 10", () => {
  let board = Gameboard().createMap(10, 10);
  expect(board.length).toBe(10);
});

test("Gameboard exists", () => {
  let board = Gameboard();
  board.createMap(10, 10);
  expect(board.getBoard()).toBe(board.grid);
});

test("Ship is placed on GameBoard", () => {
  let board = Gameboard();
  let ship = Ship("small", 1);
  board.createMap(10, 10);
  board.placeShip(0, 0, ship);
  let gridboard = board.grid;
  expect(gridboard[0][0]).toBe(ship.names);
});

test("Gameboard receives an attack.", () => {
  let board = Gameboard();
  board.createMap(10, 10);
  board.recieveAttack(0, 0);
  let gridboard = board.grid;
  expect(gridboard[0][0]).toBe("O");
});
