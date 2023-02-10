import { Ship } from "../modules/ship";

test("Ship length is properly displayed", () => {
  const ship1 = Ship("name", 5);
  expect(ship1.length).toBe(5);
});

test("Name of ship is outputed", () => {
  const ship1 = Ship("name", 5);
  expect(ship1.names).toBe("name");
});

test("Ship hits starts off at 0", () => {
  const ship1 = Ship("name", 5);
  expect(ship1.hits).toBe(0);
});

test("Is a ship sunk?", () => {
  const ship1 = Ship("name", 5);
  expect(ship1.isSunk()).toBe(false);
});

test("Ship is hit", () => {
  const ship1 = Ship("name", 5);
  ship1.attack();
  expect(ship1.hits).toBe(1);
});
