import { Player } from "../modules/player";

test("Player name is created", () => {
  let player1 = Player("Computer");
  expect(player1.name).toBe("Computer");
});
