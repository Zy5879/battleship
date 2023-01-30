import Gameboard from "../modules/gameboard";

test("Gameboard Array to be equal to 100", () => {
  let grid = Gameboard;
  let board = grid.createMap(10, 10);
  expect(board.length).toBe(10);
});

test("Gameboard exists", () => {
  let board = Gameboard;
  board.createMap(10, 10);
  expect(board.getBoard()).toBe(board.grid);
});
