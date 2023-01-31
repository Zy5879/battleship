import Ship from "../modules/ship";

test("Ship length is properly displayed", () => {
  const ship1 = Ship("name", 5);
  expect(ship1.shift).toBe(5);
});
