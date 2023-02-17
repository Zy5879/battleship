import Ship from "./modules/ship";
import Gameboard from "./modules/gameboard";
import Player from "./modules/player";
import { game } from "./modules/gameloop";
import style from "./styles/style.css";
import github from "./assets/github.svg";

const gitcon = document.getElementById("github");
gitcon.src = github;
gitcon.addEventListener("click", () => {
  document.location = "https://github.com/Zy5879?tab=repositories";
});
