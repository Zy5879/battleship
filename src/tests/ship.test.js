import Ship from "../modules/ship";

test("Ship length is properly displayed", () => {
  const ship1 = Ship("name", 5);
  expect(ship1.length).toBe(5);
});

test("If Ship length is 0 then isSunk is true", () => {
  const ship1 = Ship("name", 0);
  expect(ship1.isSunk()).toBe(true);
});

test("Ship has been hit", () => {
  const ship1 = Ship("name", 5);
  ship1.hit();
  const ship1currentlength = ship1.currentlength;
  expect(ship1currentlength.length).toBe(4);
});
