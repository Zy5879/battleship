/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/gameboard.js":
/*!**********************************!*\
  !*** ./src/modules/gameboard.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Gameboard": () => (/* binding */ Gameboard)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");

var Gameboard = function Gameboard() {
  var cruiser = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)("Cruiser", 5);
  var battleship = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)("Battleship", 4);
  var submarine = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)("Submarine", 3);
  var destroyer = (0,_ship__WEBPACK_IMPORTED_MODULE_0__.Ship)("Destroyer", 2);
  var ships = [cruiser, battleship, submarine, destroyer];
  var grid = [];
  var createMap = function createMap(rows, columns) {
    for (var i = 0; i < rows; i++) {
      grid[i] = [];
      for (var j = 0; j < columns; j++) {
        grid[i][j] = "";
      }
    }
    return grid;
  };
  function placeShip(x, y, ship) {
    for (var i = 0; i < ship.length; i++) {
      grid[Number(x)][Number(y) + i] = ship.names;
    }
  }
  function randomPlaceShip(ship) {
    var xRandomNumber = Math.floor(Math.random() * 9);
    var yRandomNumber = Math.floor(Math.random() * 9);
    if (yRandomNumber + ship.length > grid[xRandomNumber].length) {
      yRandomNumber = yRandomNumber - ship.length;
    } else {
      yRandomNumber;
    }
    var numbers = [];
    for (var i = 0; i < ship.length; i++) {
      numbers.push(yRandomNumber + i);
    }
    var isValid = numbers.every(function (num) {
      return grid[xRandomNumber][num] == "";
    });
    if (isValid) {
      numbers.forEach(function (num) {
        grid[xRandomNumber][num] = ship.names;
      });
    } else {
      randomPlaceShip(ship);
    }
  }
  var getBoard = function getBoard() {
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
    createMap: createMap,
    clearBoard: clearBoard,
    getBoard: getBoard,
    randomPlaceShip: randomPlaceShip,
    recieveAttack: recieveAttack,
    placeShip: placeShip,
    grid: grid,
    ships: ships
  };
};


/***/ }),

/***/ "./src/modules/gameloop.js":
/*!*********************************!*\
  !*** ./src/modules/gameloop.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "game": () => (/* binding */ game)
/* harmony export */ });
/* harmony import */ var _player__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./player */ "./src/modules/player.js");

var game = function () {
  function openModal(modal) {
    if (modal == null) return;
    modal.classList.add("active");
    overlay.classList.add("active");
  }
  function closeModal(modal) {
    if (modal == null) return;
    modal.classList.remove("active");
    overlay.classList.remove("active");
  }
  var player1 = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)("User");
  var player1board = player1.board;
  var player1ships = player1board.ships;
  var computer = (0,_player__WEBPACK_IMPORTED_MODULE_0__.Player)("Computer");
  var computerboard = computer.board;
  var computerships = computerboard.ships;
  var newgame = document.querySelector(".prestart");
  newgame.addEventListener("click", startGame);
  function startGame() {
    newgame.style.display = "none";
    player1ships.forEach(function (ship) {
      return player1board.randomPlaceShip(ship);
    });
    computerships.forEach(function (ship) {
      return computerboard.randomPlaceShip(ship);
    });
    renderPlayerBoard();
    renderComputerBoard();
    var computersection = document.querySelectorAll(".computersection");
    computersection.forEach(function (section) {
      section.addEventListener("click", playRound, {
        once: true
      });
    });
  }
  function renderPlayerBoard() {
    var gameboard = document.createElement("div");
    gameboard.classList.add("playergame-board");
    var gameboardcontainer = document.querySelector(".gameboard-container");
    var playerboardcontainer = document.createElement("div");
    playerboardcontainer.classList.add("player-container");
    var userheader = document.createElement("h3");
    userheader.textContent = "User Board";
    var player1grid = player1board.grid;
    player1grid.forEach(function (col, index) {
      var gameboardiv = document.createElement("div");
      gameboardiv.classList.add("block-number");
      col.forEach(function (row, i) {
        var subgameboardiv = document.createElement("div");
        subgameboardiv.classList.add("section");
        subgameboardiv.setAttribute("data-playervalue", index + "-" + i);
        if (row) {
          subgameboardiv.classList.add("taken");
          subgameboardiv.classList.add(row);
        }
        gameboardiv.appendChild(subgameboardiv);
      });
      gameboard.appendChild(gameboardiv);
    });
    gameboardcontainer.appendChild(gameboard);
  }
  function renderComputerBoard() {
    var computerheader = document.createElement("h3");
    computerheader.textContent = "Computer Board";
    var computercontainer = document.createElement("div");
    computercontainer.classList.add("computer-container");
    var computergameboard = document.createElement("div");
    computergameboard.classList.add("computer-board");
    var gameboardcontainer = document.querySelector(".gameboard-container");
    var computergrid = computerboard.grid;
    computergrid.forEach(function (col, index) {
      var gameboardiv = document.createElement("div");
      gameboardiv.classList.add("computerblock-number");
      col.forEach(function (row, i) {
        var subgameboardiv = document.createElement("div");
        subgameboardiv.classList.add("computersection");
        subgameboardiv.setAttribute("data-computervalue", index + "-" + i);
        if (row) {
          subgameboardiv.classList.add("taken");
          subgameboardiv.classList.add(row);
        }
        gameboardiv.appendChild(subgameboardiv);
      });
      computergameboard.appendChild(gameboardiv);
    });
    gameboardcontainer.appendChild(computergameboard);
  }
  function playRound(e) {
    var targetValue = e.target.getAttribute("data-computervalue");
    if (e.target.classList.contains("taken")) {
      e.target.classList.add("landed");
    } else {
      e.target.classList.add("miss");
    }
    player1.attackComputer(computerboard, targetValue[0], targetValue[2]);
    computerSelection();
    checkWinner();
  }
  function computerSelection() {
    var player1grid = player1board.grid;
    computer.randomAttack(player1board);
    player1grid.forEach(function (col, index) {
      col.forEach(function (row, i) {
        if (index, i, row == "O") {
          var section = document.querySelector("[data-playervalue=\"".concat(index + "-" + i, "\"]"));
          section.classList.add("miss");
        }
        if (index, i, row == "X") {
          var _section = document.querySelector("[data-playervalue=\"".concat(index + "-" + i, "\"]"));
          _section.classList.add("landed");
        }
      });
    });
  }
  function checkWinner() {
    var modal = document.getElementById("modal");
    if (player1ships.every(function (ship) {
      return ship.isSunk() == true;
    })) {
      alert("All of ".concat(player1.name, " ships have sunk"));
      var modalwinner = document.querySelector(".displaywinner");
      modalwinner.textContent = " Bummer!! You lost to the ".concat(computer.name);
    } else if (computerships.every(function (ship) {
      return ship.isSunk() == true;
    })) {
      alert("All of ".concat(computer.name, " ships have sunk"));
      var _modalwinner = document.querySelector(".displaywinner");
      _modalwinner.textContent = " Congratulations ".concat(player1.name, "! You Win!");
      openModal(modal);
    } else {
      return;
    }
  }
  var playAgain = document.querySelector(".restart");
  playAgain.addEventListener("click", playGameAgain);
  function playGameAgain() {
    var modal = document.getElementById("modal");
    closeModal(modal);
    var gameboardcontainer = document.querySelector(".gameboard-container");
    while (gameboardcontainer.firstChild) {
      gameboardcontainer.removeChild(gameboardcontainer.firstChild);
    }
    var player1grid = player1board.grid;
    var computergrid = computerboard.grid;
    player1board.clearBoard(player1grid);
    computerboard.clearBoard(computergrid);
    player1ships.forEach(function (ship) {
      return player1board.randomPlaceShip(ship);
    });
    computerships.forEach(function (ship) {
      return computerboard.randomPlaceShip(ship);
    });
    computerships.forEach(function (ship) {
      ship.hits = 0;
    });
    renderPlayerBoard();
    renderComputerBoard();
    var computersection = document.querySelectorAll(".computersection");
    computersection.forEach(function (section) {
      section.addEventListener("click", playRound, {
        once: true
      });
    });
  }
}();

/***/ }),

/***/ "./src/modules/player.js":
/*!*******************************!*\
  !*** ./src/modules/player.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Player": () => (/* binding */ Player)
/* harmony export */ });
/* harmony import */ var _ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship */ "./src/modules/ship.js");
/* harmony import */ var _gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./gameboard */ "./src/modules/gameboard.js");


var Player = function Player(name) {
  var board = (0,_gameboard__WEBPACK_IMPORTED_MODULE_1__.Gameboard)();
  board.createMap(10, 10);
  var boardgrid = board.grid;
  function attackComputer(board, x, y) {
    board.recieveAttack(x, y);
  }
  function randomAttack(grid) {
    var xRandomNumber = Math.floor(Math.random() * 9);
    var yRandomNumber = Math.floor(Math.random() * 9);
    if (boardgrid[Number(xRandomNumber)][Number(yRandomNumber)] == "X") {
      console.log(xRandomNumber, yRandomNumber);
      randomAttack(grid);
    } else if (boardgrid[Number(xRandomNumber)][Number(yRandomNumber)] == "O") {
      console.log(xRandomNumber, yRandomNumber);
      randomAttack(grid);
    } else if (grid.recieveAttack(xRandomNumber, yRandomNumber) == false) {
      randomAttack(grid);
    } else {
      grid.recieveAttack(xRandomNumber, yRandomNumber);
    }
  }
  return {
    name: name,
    boardgrid: boardgrid,
    board: board,
    randomAttack: randomAttack,
    attackComputer: attackComputer
  };
};

/***/ }),

/***/ "./src/modules/ship.js":
/*!*****************************!*\
  !*** ./src/modules/ship.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Ship": () => (/* binding */ Ship)
/* harmony export */ });
var Ship = function Ship(names) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var hits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  function attack() {
    this.hits++;
  }
  function isSunk() {
    if (this.hits >= length) {
      return true;
    } else {
      return false;
    }
  }
  return {
    names: names,
    length: length,
    hits: hits,
    isSunk: isSunk,
    attack: attack
  };
};

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/style.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: gray;\n}\n\n/* header/title */\n\n.header {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\nh1 {\n  font-size: 3rem;\n  color: black;\n}\n\n#github {\n  width: 70px;\n  height: 70px;\n  padding: 1rem;\n}\n\n.hicon {\n  display: flex;\n  align-items: center;\n}\n\nimg {\n  transition: transform 0.7s ease-in-out;\n}\n\nimg:hover {\n  transform: rotate(360deg);\n}\n\n#prestart {\n  cursor: pointer;\n  background-color: gray;\n  font-family: \"montserrat\", sans-serif;\n  text-transform: uppercase;\n  border: 2px solid black;\n  border-radius: 2px;\n  padding: 12px 20px;\n  transition: color 0.4s linear;\n}\n\n#prestart:hover {\n  color: #fff;\n  background-color: black;\n}\n\n/* header/title */\n\n/* render battleship boards */\n\n.gameboard-container {\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n  padding: 3rem 3rem;\n\n  /* align-content: center; */\n}\n\n.playergame-board {\n  /* display: grid; */\n  width: 300px;\n  /* height: 200px; */\n}\n\n.block-number {\n  display: grid;\n  grid-template-rows: repeat(10, 30px);\n  grid-template-columns: repeat(10, 30px);\n  width: 30px;\n  height: 30px;\n}\n.section {\n  border: 1px solid black;\n  background-color: #5a5a5a;\n}\n\n.computer-board {\n  width: 300px;\n\n  /* display: grid; */\n  /* height: 200px; */\n}\n\n.computerblock-number {\n  display: grid;\n  grid-template-rows: repeat(10, 30px);\n  grid-template-columns: repeat(10, 30px);\n  width: 30px;\n  height: 30px;\n}\n\n.computersection {\n  border: 1px solid black;\n  background-color: #5a5a5a;\n  cursor: crosshair;\n}\n\n.computersection:hover {\n  background-color: #138aaf;\n}\n\n/* render battleship boards */\n\n/* css effects */\n\n.section.taken {\n  background-color: #138aaf;\n}\n\n.section.landed {\n  background-color: #39ff14;\n}\n\n.computersection.landed {\n  background-color: #39ff14;\n}\n\n.landedcomputer {\n  background-color: #39ff14;\n}\n\n.landed:hover {\n  background-color: #39ff14;\n}\n\n.miss {\n  background-color: #ff1818;\n}\n\n.miss:hover {\n  background-color: #ff1818;\n}\n\n/* modal */\n\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  transition: 200ms ease-in-out;\n  border: 1px solid black;\n  z-index: 10;\n  background-color: white;\n  width: 500px;\n  height: 300px;\n  max-width: 80%;\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n}\n\n.modal.active {\n  transform: translate(-50%, -50%) scale(1);\n  background-color: gray;\n}\n\n.modal-header {\n  padding: 10px 15px;\n  display: flex;\n  flex-direction: column;\n  align-content: center;\n}\n\n.modal-body {\n  padding: 10px 15px;\n}\n\n#overlay {\n  position: fixed;\n  opacity: 0;\n  transition: 200ms ease-in-out;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  pointer-events: none;\n}\n\n#overlay.active {\n  opacity: 1;\n}\n\n#restart {\n  cursor: pointer;\n  background-color: gray;\n  font-family: \"montserrat\", sans-serif;\n  text-transform: uppercase;\n  border: 2px solid black;\n  border-radius: 2px;\n  padding: 12px 20px;\n  transition: color 0.4s linear;\n}\n\n#restart:hover {\n  color: #fff;\n  background-color: black;\n}\n\n/* modal */\n\n/* media  */\n\n@media all and (max-width: 820px) {\n  .gameboard-container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .playergame-board {\n    padding: 2rem;\n  }\n\n  .computer-board {\n    padding: 2rem;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/styles/style.css"],"names":[],"mappings":"AAAA;EACE,sBAAsB;AACxB;;AAEA;EACE,sBAAsB;AACxB;;AAEA,iBAAiB;;AAEjB;EACE,aAAa;EACb,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,eAAe;EACf,YAAY;AACd;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,aAAa;AACf;;AAEA;EACE,aAAa;EACb,mBAAmB;AACrB;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,eAAe;EACf,sBAAsB;EACtB,qCAAqC;EACrC,yBAAyB;EACzB,uBAAuB;EACvB,kBAAkB;EAClB,kBAAkB;EAClB,6BAA6B;AAC/B;;AAEA;EACE,WAAW;EACX,uBAAuB;AACzB;;AAEA,iBAAiB;;AAEjB,6BAA6B;;AAE7B;EACE,aAAa;EACb,mBAAmB;EACnB,6BAA6B;EAC7B,kBAAkB;;EAElB,2BAA2B;AAC7B;;AAEA;EACE,mBAAmB;EACnB,YAAY;EACZ,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,oCAAoC;EACpC,uCAAuC;EACvC,WAAW;EACX,YAAY;AACd;AACA;EACE,uBAAuB;EACvB,yBAAyB;AAC3B;;AAEA;EACE,YAAY;;EAEZ,mBAAmB;EACnB,mBAAmB;AACrB;;AAEA;EACE,aAAa;EACb,oCAAoC;EACpC,uCAAuC;EACvC,WAAW;EACX,YAAY;AACd;;AAEA;EACE,uBAAuB;EACvB,yBAAyB;EACzB,iBAAiB;AACnB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,6BAA6B;;AAE7B,gBAAgB;;AAEhB;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,UAAU;;AAEV;EACE,eAAe;EACf,QAAQ;EACR,SAAS;EACT,yCAAyC;EACzC,6BAA6B;EAC7B,uBAAuB;EACvB,WAAW;EACX,uBAAuB;EACvB,YAAY;EACZ,aAAa;EACb,cAAc;EACd,aAAa;EACb,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,yCAAyC;EACzC,sBAAsB;AACxB;;AAEA;EACE,kBAAkB;EAClB,aAAa;EACb,sBAAsB;EACtB,qBAAqB;AACvB;;AAEA;EACE,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,UAAU;EACV,6BAA6B;EAC7B,MAAM;EACN,OAAO;EACP,QAAQ;EACR,SAAS;EACT,oCAAoC;EACpC,oBAAoB;AACtB;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,eAAe;EACf,sBAAsB;EACtB,qCAAqC;EACrC,yBAAyB;EACzB,uBAAuB;EACvB,kBAAkB;EAClB,kBAAkB;EAClB,6BAA6B;AAC/B;;AAEA;EACE,WAAW;EACX,uBAAuB;AACzB;;AAEA,UAAU;;AAEV,WAAW;;AAEX;EACE;IACE,aAAa;IACb,sBAAsB;EACxB;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,aAAa;EACf;AACF","sourcesContent":["* {\n  box-sizing: border-box;\n}\n\nbody {\n  background-color: gray;\n}\n\n/* header/title */\n\n.header {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n\nh1 {\n  font-size: 3rem;\n  color: black;\n}\n\n#github {\n  width: 70px;\n  height: 70px;\n  padding: 1rem;\n}\n\n.hicon {\n  display: flex;\n  align-items: center;\n}\n\nimg {\n  transition: transform 0.7s ease-in-out;\n}\n\nimg:hover {\n  transform: rotate(360deg);\n}\n\n#prestart {\n  cursor: pointer;\n  background-color: gray;\n  font-family: \"montserrat\", sans-serif;\n  text-transform: uppercase;\n  border: 2px solid black;\n  border-radius: 2px;\n  padding: 12px 20px;\n  transition: color 0.4s linear;\n}\n\n#prestart:hover {\n  color: #fff;\n  background-color: black;\n}\n\n/* header/title */\n\n/* render battleship boards */\n\n.gameboard-container {\n  display: flex;\n  align-items: center;\n  justify-content: space-evenly;\n  padding: 3rem 3rem;\n\n  /* align-content: center; */\n}\n\n.playergame-board {\n  /* display: grid; */\n  width: 300px;\n  /* height: 200px; */\n}\n\n.block-number {\n  display: grid;\n  grid-template-rows: repeat(10, 30px);\n  grid-template-columns: repeat(10, 30px);\n  width: 30px;\n  height: 30px;\n}\n.section {\n  border: 1px solid black;\n  background-color: #5a5a5a;\n}\n\n.computer-board {\n  width: 300px;\n\n  /* display: grid; */\n  /* height: 200px; */\n}\n\n.computerblock-number {\n  display: grid;\n  grid-template-rows: repeat(10, 30px);\n  grid-template-columns: repeat(10, 30px);\n  width: 30px;\n  height: 30px;\n}\n\n.computersection {\n  border: 1px solid black;\n  background-color: #5a5a5a;\n  cursor: crosshair;\n}\n\n.computersection:hover {\n  background-color: #138aaf;\n}\n\n/* render battleship boards */\n\n/* css effects */\n\n.section.taken {\n  background-color: #138aaf;\n}\n\n.section.landed {\n  background-color: #39ff14;\n}\n\n.computersection.landed {\n  background-color: #39ff14;\n}\n\n.landedcomputer {\n  background-color: #39ff14;\n}\n\n.landed:hover {\n  background-color: #39ff14;\n}\n\n.miss {\n  background-color: #ff1818;\n}\n\n.miss:hover {\n  background-color: #ff1818;\n}\n\n/* modal */\n\n.modal {\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  transform: translate(-50%, -50%) scale(0);\n  transition: 200ms ease-in-out;\n  border: 1px solid black;\n  z-index: 10;\n  background-color: white;\n  width: 500px;\n  height: 300px;\n  max-width: 80%;\n  display: flex;\n  flex-direction: column;\n  text-align: center;\n}\n\n.modal.active {\n  transform: translate(-50%, -50%) scale(1);\n  background-color: gray;\n}\n\n.modal-header {\n  padding: 10px 15px;\n  display: flex;\n  flex-direction: column;\n  align-content: center;\n}\n\n.modal-body {\n  padding: 10px 15px;\n}\n\n#overlay {\n  position: fixed;\n  opacity: 0;\n  transition: 200ms ease-in-out;\n  top: 0;\n  left: 0;\n  right: 0;\n  bottom: 0;\n  background-color: rgba(0, 0, 0, 0.5);\n  pointer-events: none;\n}\n\n#overlay.active {\n  opacity: 1;\n}\n\n#restart {\n  cursor: pointer;\n  background-color: gray;\n  font-family: \"montserrat\", sans-serif;\n  text-transform: uppercase;\n  border: 2px solid black;\n  border-radius: 2px;\n  padding: 12px 20px;\n  transition: color 0.4s linear;\n}\n\n#restart:hover {\n  color: #fff;\n  background-color: black;\n}\n\n/* modal */\n\n/* media  */\n\n@media all and (max-width: 820px) {\n  .gameboard-container {\n    display: flex;\n    flex-direction: column;\n  }\n\n  .playergame-board {\n    padding: 2rem;\n  }\n\n  .computer-board {\n    padding: 2rem;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/styles/style.css":
/*!******************************!*\
  !*** ./src/styles/style.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./src/assets/github.svg":
/*!*******************************!*\
  !*** ./src/assets/github.svg ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "github.svg";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_ship__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/ship */ "./src/modules/ship.js");
/* harmony import */ var _modules_gameboard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/gameboard */ "./src/modules/gameboard.js");
/* harmony import */ var _modules_player__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/player */ "./src/modules/player.js");
/* harmony import */ var _modules_gameloop__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/gameloop */ "./src/modules/gameloop.js");
/* harmony import */ var _styles_style_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./styles/style.css */ "./src/styles/style.css");
/* harmony import */ var _assets_github_svg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./assets/github.svg */ "./src/assets/github.svg");






var gitcon = document.getElementById("github");
gitcon.src = _assets_github_svg__WEBPACK_IMPORTED_MODULE_5__;
gitcon.addEventListener("click", function () {
  document.location = "https://github.com/Zy5879?tab=repositories";
});
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ZkE7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDQWtDO0FBQ1U7QUFDTjtBQUNJO0FBQ0g7QUFDRTtBQUV6QyxJQUFNeUUsTUFBTSxHQUFHdEQsUUFBUSxDQUFDd0MsY0FBYyxDQUFDLFFBQVEsQ0FBQztBQUNoRGMsTUFBTSxDQUFDQyxHQUFHLEdBQUdGLCtDQUFNO0FBQ25CQyxNQUFNLENBQUNwRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtFQUNyQ0YsUUFBUSxDQUFDd0QsUUFBUSxHQUFHLDRDQUE0QztBQUNsRSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVsb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3M/ZmY5NCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBsZXQgY3J1aXNlciA9IFNoaXAoXCJDcnVpc2VyXCIsIDUpO1xuICBsZXQgYmF0dGxlc2hpcCA9IFNoaXAoXCJCYXR0bGVzaGlwXCIsIDQpO1xuICBsZXQgc3VibWFyaW5lID0gU2hpcChcIlN1Ym1hcmluZVwiLCAzKTtcbiAgbGV0IGRlc3Ryb3llciA9IFNoaXAoXCJEZXN0cm95ZXJcIiwgMik7XG5cbiAgY29uc3Qgc2hpcHMgPSBbY3J1aXNlciwgYmF0dGxlc2hpcCwgc3VibWFyaW5lLCBkZXN0cm95ZXJdO1xuICBsZXQgZ3JpZCA9IFtdO1xuICBjb25zdCBjcmVhdGVNYXAgPSAocm93cywgY29sdW1ucykgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICBncmlkW2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICBncmlkW2ldW2pdID0gXCJcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH07XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHgsIHksIHNoaXApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgIGdyaWRbTnVtYmVyKHgpXVtOdW1iZXIoeSkgKyBpXSA9IHNoaXAubmFtZXM7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmFuZG9tUGxhY2VTaGlwKHNoaXApIHtcbiAgICBsZXQgeFJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpO1xuICAgIGxldCB5UmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSk7XG5cbiAgICBpZiAoeVJhbmRvbU51bWJlciArIHNoaXAubGVuZ3RoID4gZ3JpZFt4UmFuZG9tTnVtYmVyXS5sZW5ndGgpIHtcbiAgICAgIHlSYW5kb21OdW1iZXIgPSB5UmFuZG9tTnVtYmVyIC0gc2hpcC5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHlSYW5kb21OdW1iZXI7XG4gICAgfVxuXG4gICAgbGV0IG51bWJlcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgIG51bWJlcnMucHVzaCh5UmFuZG9tTnVtYmVyICsgaSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNWYWxpZCA9IG51bWJlcnMuZXZlcnkoKG51bSkgPT4gZ3JpZFt4UmFuZG9tTnVtYmVyXVtudW1dID09IFwiXCIpO1xuXG4gICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgIG51bWJlcnMuZm9yRWFjaCgobnVtKSA9PiB7XG4gICAgICAgIGdyaWRbeFJhbmRvbU51bWJlcl1bbnVtXSA9IHNoaXAubmFtZXM7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZG9tUGxhY2VTaGlwKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4ge1xuICAgIHJldHVybiBncmlkO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soeCwgeSkge1xuICAgIC8vIGxldCBib2FyZCA9IGdyaWQ7XG4gICAgaWYgKGdyaWRbeF1beV0gPT0gY3J1aXNlci5uYW1lcykge1xuICAgICAgZ3JpZFt4XVt5XSA9IFwiWFwiO1xuICAgICAgY3J1aXNlci5hdHRhY2soKTtcbiAgICB9IGVsc2UgaWYgKGdyaWRbeF1beV0gPT0gYmF0dGxlc2hpcC5uYW1lcykge1xuICAgICAgZ3JpZFt4XVt5XSA9IFwiWFwiO1xuICAgICAgYmF0dGxlc2hpcC5hdHRhY2soKTtcbiAgICB9IGVsc2UgaWYgKGdyaWRbeF1beV0gPT0gc3VibWFyaW5lLm5hbWVzKSB7XG4gICAgICBncmlkW3hdW3ldID0gXCJYXCI7XG4gICAgICBzdWJtYXJpbmUuYXR0YWNrKCk7XG4gICAgfSBlbHNlIGlmIChncmlkW3hdW3ldID09IGRlc3Ryb3llci5uYW1lcykge1xuICAgICAgZ3JpZFt4XVt5XSA9IFwiWFwiO1xuICAgICAgZGVzdHJveWVyLmF0dGFjaygpO1xuICAgIH0gZWxzZSBpZiAoZ3JpZFt4XVt5XSA9PSBcIlwiKSB7XG4gICAgICBncmlkW3hdW3ldID0gXCJPXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhckJvYXJkKGJvYXJkKSB7XG4gICAgY3JlYXRlTWFwKDEwLCAxMCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZU1hcCxcbiAgICBjbGVhckJvYXJkLFxuICAgIGdldEJvYXJkLFxuICAgIHJhbmRvbVBsYWNlU2hpcCxcbiAgICByZWNpZXZlQXR0YWNrLFxuICAgIHBsYWNlU2hpcCxcbiAgICBncmlkLFxuICAgIHNoaXBzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuZXhwb3J0IGNvbnN0IGdhbWUgPSAoKCkgPT4ge1xuICBmdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgICBpZiAobW9kYWwgPT0gbnVsbCkgcmV0dXJuO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xuICAgIGlmIChtb2RhbCA9PSBudWxsKSByZXR1cm47XG4gICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIH1cblxuICBsZXQgcGxheWVyMSA9IFBsYXllcihcIlVzZXJcIik7XG4gIGxldCBwbGF5ZXIxYm9hcmQgPSBwbGF5ZXIxLmJvYXJkO1xuICBsZXQgcGxheWVyMXNoaXBzID0gcGxheWVyMWJvYXJkLnNoaXBzO1xuXG4gIGxldCBjb21wdXRlciA9IFBsYXllcihcIkNvbXB1dGVyXCIpO1xuXG4gIGxldCBjb21wdXRlcmJvYXJkID0gY29tcHV0ZXIuYm9hcmQ7XG4gIGxldCBjb21wdXRlcnNoaXBzID0gY29tcHV0ZXJib2FyZC5zaGlwcztcblxuICBjb25zdCBuZXdnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVzdGFydFwiKTtcbiAgbmV3Z2FtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRHYW1lKTtcblxuICBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgbmV3Z2FtZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICBwbGF5ZXIxc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gcGxheWVyMWJvYXJkLnJhbmRvbVBsYWNlU2hpcChzaGlwKSk7XG4gICAgY29tcHV0ZXJzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiBjb21wdXRlcmJvYXJkLnJhbmRvbVBsYWNlU2hpcChzaGlwKSk7XG5cbiAgICByZW5kZXJQbGF5ZXJCb2FyZCgpO1xuICAgIHJlbmRlckNvbXB1dGVyQm9hcmQoKTtcblxuICAgIGNvbnN0IGNvbXB1dGVyc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcHV0ZXJzZWN0aW9uXCIpO1xuICAgIGNvbXB1dGVyc2VjdGlvbi5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XG4gICAgICBzZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5Um91bmQsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclBsYXllckJvYXJkKCkge1xuICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXJnYW1lLWJvYXJkXCIpO1xuICAgIGNvbnN0IGdhbWVib2FyZGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBwbGF5ZXJib2FyZGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcGxheWVyYm9hcmRjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInBsYXllci1jb250YWluZXJcIik7XG4gICAgY29uc3QgdXNlcmhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICB1c2VyaGVhZGVyLnRleHRDb250ZW50ID0gXCJVc2VyIEJvYXJkXCI7XG5cbiAgICBsZXQgcGxheWVyMWdyaWQgPSBwbGF5ZXIxYm9hcmQuZ3JpZDtcblxuICAgIHBsYXllcjFncmlkLmZvckVhY2goKGNvbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGdhbWVib2FyZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGdhbWVib2FyZGl2LmNsYXNzTGlzdC5hZGQoXCJibG9jay1udW1iZXJcIik7XG4gICAgICBjb2wuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1YmdhbWVib2FyZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc3ViZ2FtZWJvYXJkaXYuY2xhc3NMaXN0LmFkZChcInNlY3Rpb25cIik7XG4gICAgICAgIHN1YmdhbWVib2FyZGl2LnNldEF0dHJpYnV0ZShcImRhdGEtcGxheWVydmFsdWVcIiwgaW5kZXggKyBcIi1cIiArIGkpO1xuICAgICAgICBpZiAocm93KSB7XG4gICAgICAgICAgc3ViZ2FtZWJvYXJkaXYuY2xhc3NMaXN0LmFkZChcInRha2VuXCIpO1xuICAgICAgICAgIHN1YmdhbWVib2FyZGl2LmNsYXNzTGlzdC5hZGQocm93KTtcbiAgICAgICAgfVxuICAgICAgICBnYW1lYm9hcmRpdi5hcHBlbmRDaGlsZChzdWJnYW1lYm9hcmRpdik7XG4gICAgICB9KTtcbiAgICAgIGdhbWVib2FyZC5hcHBlbmRDaGlsZChnYW1lYm9hcmRpdik7XG4gICAgfSk7XG4gICAgZ2FtZWJvYXJkY29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVib2FyZCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJDb21wdXRlckJvYXJkKCkge1xuICAgIGNvbnN0IGNvbXB1dGVyaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIGNvbXB1dGVyaGVhZGVyLnRleHRDb250ZW50ID0gXCJDb21wdXRlciBCb2FyZFwiO1xuICAgIGNvbnN0IGNvbXB1dGVyY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb21wdXRlcmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IGNvbXB1dGVyZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb21wdXRlcmdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItYm9hcmRcIik7XG4gICAgY29uc3QgZ2FtZWJvYXJkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmQtY29udGFpbmVyXCIpO1xuICAgIGxldCBjb21wdXRlcmdyaWQgPSBjb21wdXRlcmJvYXJkLmdyaWQ7XG5cbiAgICBjb21wdXRlcmdyaWQuZm9yRWFjaCgoY29sLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZ2FtZWJvYXJkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZ2FtZWJvYXJkaXYuY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyYmxvY2stbnVtYmVyXCIpO1xuICAgICAgY29sLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgICBjb25zdCBzdWJnYW1lYm9hcmRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHN1YmdhbWVib2FyZGl2LmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlcnNlY3Rpb25cIik7XG4gICAgICAgIHN1YmdhbWVib2FyZGl2LnNldEF0dHJpYnV0ZShcImRhdGEtY29tcHV0ZXJ2YWx1ZVwiLCBpbmRleCArIFwiLVwiICsgaSk7XG4gICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICBzdWJnYW1lYm9hcmRpdi5jbGFzc0xpc3QuYWRkKFwidGFrZW5cIik7XG4gICAgICAgICAgc3ViZ2FtZWJvYXJkaXYuY2xhc3NMaXN0LmFkZChyb3cpO1xuICAgICAgICB9XG4gICAgICAgIGdhbWVib2FyZGl2LmFwcGVuZENoaWxkKHN1YmdhbWVib2FyZGl2KTtcbiAgICAgIH0pO1xuXG4gICAgICBjb21wdXRlcmdhbWVib2FyZC5hcHBlbmRDaGlsZChnYW1lYm9hcmRpdik7XG4gICAgfSk7XG4gICAgZ2FtZWJvYXJkY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyZ2FtZWJvYXJkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYXlSb3VuZChlKSB7XG4gICAgbGV0IHRhcmdldFZhbHVlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wdXRlcnZhbHVlXCIpO1xuXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRha2VuXCIpKSB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibGFuZGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICB9XG5cbiAgICBwbGF5ZXIxLmF0dGFja0NvbXB1dGVyKGNvbXB1dGVyYm9hcmQsIHRhcmdldFZhbHVlWzBdLCB0YXJnZXRWYWx1ZVsyXSk7XG4gICAgY29tcHV0ZXJTZWxlY3Rpb24oKTtcbiAgICBjaGVja1dpbm5lcigpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZXJTZWxlY3Rpb24oKSB7XG4gICAgbGV0IHBsYXllcjFncmlkID0gcGxheWVyMWJvYXJkLmdyaWQ7XG4gICAgY29tcHV0ZXIucmFuZG9tQXR0YWNrKHBsYXllcjFib2FyZCk7XG5cbiAgICBwbGF5ZXIxZ3JpZC5mb3JFYWNoKChjb2wsIGluZGV4KSA9PiB7XG4gICAgICBjb2wuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICAgIGlmICgoaW5kZXgsIGksIHJvdyA9PSBcIk9cIikpIHtcbiAgICAgICAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1wbGF5ZXJ2YWx1ZT1cIiR7aW5kZXggKyBcIi1cIiArIGl9XCJdYFxuICAgICAgICAgICk7XG4gICAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGluZGV4LCBpLCByb3cgPT0gXCJYXCIpKSB7XG4gICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcGxheWVydmFsdWU9XCIke2luZGV4ICsgXCItXCIgKyBpfVwiXWBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwibGFuZGVkXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV2lubmVyKCkge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbFwiKTtcbiAgICBpZiAocGxheWVyMXNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpID09IHRydWUpKSB7XG4gICAgICBhbGVydChgQWxsIG9mICR7cGxheWVyMS5uYW1lfSBzaGlwcyBoYXZlIHN1bmtgKTtcbiAgICAgIGNvbnN0IG1vZGFsd2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5d2lubmVyXCIpO1xuICAgICAgbW9kYWx3aW5uZXIudGV4dENvbnRlbnQgPSBgIEJ1bW1lciEhIFlvdSBsb3N0IHRvIHRoZSAke2NvbXB1dGVyLm5hbWV9YDtcbiAgICB9IGVsc2UgaWYgKGNvbXB1dGVyc2hpcHMuZXZlcnkoKHNoaXApID0+IHNoaXAuaXNTdW5rKCkgPT0gdHJ1ZSkpIHtcbiAgICAgIGFsZXJ0KGBBbGwgb2YgJHtjb21wdXRlci5uYW1lfSBzaGlwcyBoYXZlIHN1bmtgKTtcbiAgICAgIGNvbnN0IG1vZGFsd2lubmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kaXNwbGF5d2lubmVyXCIpO1xuICAgICAgbW9kYWx3aW5uZXIudGV4dENvbnRlbnQgPSBgIENvbmdyYXR1bGF0aW9ucyAke3BsYXllcjEubmFtZX0hIFlvdSBXaW4hYDtcbiAgICAgIG9wZW5Nb2RhbChtb2RhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH1cblxuICBjb25zdCBwbGF5QWdhaW4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnJlc3RhcnRcIik7XG4gIHBsYXlBZ2Fpbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheUdhbWVBZ2Fpbik7XG5cbiAgZnVuY3Rpb24gcGxheUdhbWVBZ2FpbigpIHtcbiAgICBjb25zdCBtb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibW9kYWxcIik7XG4gICAgY2xvc2VNb2RhbChtb2RhbCk7XG5cbiAgICBjb25zdCBnYW1lYm9hcmRjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdhbWVib2FyZC1jb250YWluZXJcIik7XG4gICAgd2hpbGUgKGdhbWVib2FyZGNvbnRhaW5lci5maXJzdENoaWxkKSB7XG4gICAgICBnYW1lYm9hcmRjb250YWluZXIucmVtb3ZlQ2hpbGQoZ2FtZWJvYXJkY29udGFpbmVyLmZpcnN0Q2hpbGQpO1xuICAgIH1cbiAgICBsZXQgcGxheWVyMWdyaWQgPSBwbGF5ZXIxYm9hcmQuZ3JpZDtcbiAgICBsZXQgY29tcHV0ZXJncmlkID0gY29tcHV0ZXJib2FyZC5ncmlkO1xuXG4gICAgcGxheWVyMWJvYXJkLmNsZWFyQm9hcmQocGxheWVyMWdyaWQpO1xuICAgIGNvbXB1dGVyYm9hcmQuY2xlYXJCb2FyZChjb21wdXRlcmdyaWQpO1xuXG4gICAgcGxheWVyMXNoaXBzLmZvckVhY2goKHNoaXApID0+IHBsYXllcjFib2FyZC5yYW5kb21QbGFjZVNoaXAoc2hpcCkpO1xuICAgIGNvbXB1dGVyc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gY29tcHV0ZXJib2FyZC5yYW5kb21QbGFjZVNoaXAoc2hpcCkpO1xuXG4gICAgY29tcHV0ZXJzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiB7XG4gICAgICBzaGlwLmhpdHMgPSAwO1xuICAgIH0pO1xuXG4gICAgcmVuZGVyUGxheWVyQm9hcmQoKTtcbiAgICByZW5kZXJDb21wdXRlckJvYXJkKCk7XG5cbiAgICBjb25zdCBjb21wdXRlcnNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbXB1dGVyc2VjdGlvblwiKTtcbiAgICBjb21wdXRlcnNlY3Rpb24uZm9yRWFjaCgoc2VjdGlvbikgPT4ge1xuICAgICAgc2VjdGlvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgcGxheVJvdW5kLCB7IG9uY2U6IHRydWUgfSk7XG4gICAgfSk7XG4gIH1cbn0pKCk7XG4iLCJpbXBvcnQgeyBTaGlwIH0gZnJvbSBcIi4vc2hpcFwiO1xuaW1wb3J0IHsgR2FtZWJvYXJkIH0gZnJvbSBcIi4vZ2FtZWJvYXJkXCI7XG5cbmV4cG9ydCBjb25zdCBQbGF5ZXIgPSAobmFtZSkgPT4ge1xuICBsZXQgYm9hcmQgPSBHYW1lYm9hcmQoKTtcbiAgYm9hcmQuY3JlYXRlTWFwKDEwLCAxMCk7XG4gIGxldCBib2FyZGdyaWQgPSBib2FyZC5ncmlkO1xuXG4gIGZ1bmN0aW9uIGF0dGFja0NvbXB1dGVyKGJvYXJkLCB4LCB5KSB7XG4gICAgYm9hcmQucmVjaWV2ZUF0dGFjayh4LCB5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJhbmRvbUF0dGFjayhncmlkKSB7XG4gICAgbGV0IHhSYW5kb21OdW1iZXIgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiA5KTtcbiAgICBsZXQgeVJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpO1xuXG4gICAgaWYgKGJvYXJkZ3JpZFtOdW1iZXIoeFJhbmRvbU51bWJlcildW051bWJlcih5UmFuZG9tTnVtYmVyKV0gPT0gXCJYXCIpIHtcbiAgICAgIGNvbnNvbGUubG9nKHhSYW5kb21OdW1iZXIsIHlSYW5kb21OdW1iZXIpO1xuICAgICAgcmFuZG9tQXR0YWNrKGdyaWQpO1xuICAgIH0gZWxzZSBpZiAoYm9hcmRncmlkW051bWJlcih4UmFuZG9tTnVtYmVyKV1bTnVtYmVyKHlSYW5kb21OdW1iZXIpXSA9PSBcIk9cIikge1xuICAgICAgY29uc29sZS5sb2coeFJhbmRvbU51bWJlciwgeVJhbmRvbU51bWJlcik7XG4gICAgICByYW5kb21BdHRhY2soZ3JpZCk7XG4gICAgfSBlbHNlIGlmIChncmlkLnJlY2lldmVBdHRhY2soeFJhbmRvbU51bWJlciwgeVJhbmRvbU51bWJlcikgPT0gZmFsc2UpIHtcbiAgICAgIHJhbmRvbUF0dGFjayhncmlkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ3JpZC5yZWNpZXZlQXR0YWNrKHhSYW5kb21OdW1iZXIsIHlSYW5kb21OdW1iZXIpO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIG5hbWUsXG4gICAgYm9hcmRncmlkLFxuICAgIGJvYXJkLFxuICAgIHJhbmRvbUF0dGFjayxcbiAgICBhdHRhY2tDb21wdXRlcixcbiAgfTtcbn07XG4iLCJleHBvcnQgY29uc3QgU2hpcCA9IChuYW1lcywgbGVuZ3RoID0gMCwgaGl0cyA9IDApID0+IHtcbiAgZnVuY3Rpb24gYXR0YWNrKCkge1xuICAgIHRoaXMuaGl0cysrO1xuICB9XG5cbiAgZnVuY3Rpb24gaXNTdW5rKCkge1xuICAgIGlmICh0aGlzLmhpdHMgPj0gbGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmFtZXMsXG4gICAgbGVuZ3RoLFxuICAgIGhpdHMsXG4gICAgaXNTdW5rLFxuICAgIGF0dGFjayxcbiAgfTtcbn07XG4iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbn1cXG5cXG4vKiBoZWFkZXIvdGl0bGUgKi9cXG5cXG4uaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4jZ2l0aHViIHtcXG4gIHdpZHRoOiA3MHB4O1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuLmhpY29uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5pbWcge1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuN3MgZWFzZS1pbi1vdXQ7XFxufVxcblxcbmltZzpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbn1cXG5cXG4jcHJlc3RhcnQge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwibW9udHNlcnJhdFxcXCIsIHNhbnMtc2VyaWY7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBwYWRkaW5nOiAxMnB4IDIwcHg7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjRzIGxpbmVhcjtcXG59XFxuXFxuI3ByZXN0YXJ0OmhvdmVyIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbi8qIGhlYWRlci90aXRsZSAqL1xcblxcbi8qIHJlbmRlciBiYXR0bGVzaGlwIGJvYXJkcyAqL1xcblxcbi5nYW1lYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICBwYWRkaW5nOiAzcmVtIDNyZW07XFxuXFxuICAvKiBhbGlnbi1jb250ZW50OiBjZW50ZXI7ICovXFxufVxcblxcbi5wbGF5ZXJnYW1lLWJvYXJkIHtcXG4gIC8qIGRpc3BsYXk6IGdyaWQ7ICovXFxuICB3aWR0aDogMzAwcHg7XFxuICAvKiBoZWlnaHQ6IDIwMHB4OyAqL1xcbn1cXG5cXG4uYmxvY2stbnVtYmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG59XFxuLnNlY3Rpb24ge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWE1YTVhO1xcbn1cXG5cXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgd2lkdGg6IDMwMHB4O1xcblxcbiAgLyogZGlzcGxheTogZ3JpZDsgKi9cXG4gIC8qIGhlaWdodDogMjAwcHg7ICovXFxufVxcblxcbi5jb21wdXRlcmJsb2NrLW51bWJlciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxufVxcblxcbi5jb21wdXRlcnNlY3Rpb24ge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWE1YTVhO1xcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxufVxcblxcbi5jb21wdXRlcnNlY3Rpb246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEzOGFhZjtcXG59XFxuXFxuLyogcmVuZGVyIGJhdHRsZXNoaXAgYm9hcmRzICovXFxuXFxuLyogY3NzIGVmZmVjdHMgKi9cXG5cXG4uc2VjdGlvbi50YWtlbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTM4YWFmO1xcbn1cXG5cXG4uc2VjdGlvbi5sYW5kZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM5ZmYxNDtcXG59XFxuXFxuLmNvbXB1dGVyc2VjdGlvbi5sYW5kZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM5ZmYxNDtcXG59XFxuXFxuLmxhbmRlZGNvbXB1dGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzOWZmMTQ7XFxufVxcblxcbi5sYW5kZWQ6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM5ZmYxNDtcXG59XFxuXFxuLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMTgxODtcXG59XFxuXFxuLm1pc3M6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMTgxODtcXG59XFxuXFxuLyogbW9kYWwgKi9cXG5cXG4ubW9kYWwge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwKTtcXG4gIHRyYW5zaXRpb246IDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICB6LWluZGV4OiAxMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgd2lkdGg6IDUwMHB4O1xcbiAgaGVpZ2h0OiAzMDBweDtcXG4gIG1heC13aWR0aDogODAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5tb2RhbC5hY3RpdmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbn1cXG5cXG4ubW9kYWwtaGVhZGVyIHtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ubW9kYWwtYm9keSB7XFxuICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxufVxcblxcbiNvdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiAyMDBtcyBlYXNlLWluLW91dDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4jb3ZlcmxheS5hY3RpdmUge1xcbiAgb3BhY2l0eTogMTtcXG59XFxuXFxuI3Jlc3RhcnQge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwibW9udHNlcnJhdFxcXCIsIHNhbnMtc2VyaWY7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBwYWRkaW5nOiAxMnB4IDIwcHg7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjRzIGxpbmVhcjtcXG59XFxuXFxuI3Jlc3RhcnQ6aG92ZXIge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLyogbW9kYWwgKi9cXG5cXG4vKiBtZWRpYSAgKi9cXG5cXG5AbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOiA4MjBweCkge1xcbiAgLmdhbWVib2FyZC1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgLnBsYXllcmdhbWUtYm9hcmQge1xcbiAgICBwYWRkaW5nOiAycmVtO1xcbiAgfVxcblxcbiAgLmNvbXB1dGVyLWJvYXJkIHtcXG4gICAgcGFkZGluZzogMnJlbTtcXG4gIH1cXG59XFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3NcIl0sXCJuYW1lc1wiOltdLFwibWFwcGluZ3NcIjpcIkFBQUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxzQkFBc0I7QUFDeEI7O0FBRUEsaUJBQWlCOztBQUVqQjtFQUNFLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFlBQVk7QUFDZDs7QUFFQTtFQUNFLFdBQVc7RUFDWCxZQUFZO0VBQ1osYUFBYTtBQUNmOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLHNDQUFzQztBQUN4Qzs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixzQkFBc0I7RUFDdEIscUNBQXFDO0VBQ3JDLHlCQUF5QjtFQUN6Qix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsdUJBQXVCO0FBQ3pCOztBQUVBLGlCQUFpQjs7QUFFakIsNkJBQTZCOztBQUU3QjtFQUNFLGFBQWE7RUFDYixtQkFBbUI7RUFDbkIsNkJBQTZCO0VBQzdCLGtCQUFrQjs7RUFFbEIsMkJBQTJCO0FBQzdCOztBQUVBO0VBQ0UsbUJBQW1CO0VBQ25CLFlBQVk7RUFDWixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isb0NBQW9DO0VBQ3BDLHVDQUF1QztFQUN2QyxXQUFXO0VBQ1gsWUFBWTtBQUNkO0FBQ0E7RUFDRSx1QkFBdUI7RUFDdkIseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsWUFBWTs7RUFFWixtQkFBbUI7RUFDbkIsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0UsYUFBYTtFQUNiLG9DQUFvQztFQUNwQyx1Q0FBdUM7RUFDdkMsV0FBVztFQUNYLFlBQVk7QUFDZDs7QUFFQTtFQUNFLHVCQUF1QjtFQUN2Qix5QkFBeUI7RUFDekIsaUJBQWlCO0FBQ25COztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBLDZCQUE2Qjs7QUFFN0IsZ0JBQWdCOztBQUVoQjtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQTtFQUNFLHlCQUF5QjtBQUMzQjs7QUFFQSxVQUFVOztBQUVWO0VBQ0UsZUFBZTtFQUNmLFFBQVE7RUFDUixTQUFTO0VBQ1QseUNBQXlDO0VBQ3pDLDZCQUE2QjtFQUM3Qix1QkFBdUI7RUFDdkIsV0FBVztFQUNYLHVCQUF1QjtFQUN2QixZQUFZO0VBQ1osYUFBYTtFQUNiLGNBQWM7RUFDZCxhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLHlDQUF5QztFQUN6QyxzQkFBc0I7QUFDeEI7O0FBRUE7RUFDRSxrQkFBa0I7RUFDbEIsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixxQkFBcUI7QUFDdkI7O0FBRUE7RUFDRSxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsVUFBVTtFQUNWLDZCQUE2QjtFQUM3QixNQUFNO0VBQ04sT0FBTztFQUNQLFFBQVE7RUFDUixTQUFTO0VBQ1Qsb0NBQW9DO0VBQ3BDLG9CQUFvQjtBQUN0Qjs7QUFFQTtFQUNFLFVBQVU7QUFDWjs7QUFFQTtFQUNFLGVBQWU7RUFDZixzQkFBc0I7RUFDdEIscUNBQXFDO0VBQ3JDLHlCQUF5QjtFQUN6Qix1QkFBdUI7RUFDdkIsa0JBQWtCO0VBQ2xCLGtCQUFrQjtFQUNsQiw2QkFBNkI7QUFDL0I7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsdUJBQXVCO0FBQ3pCOztBQUVBLFVBQVU7O0FBRVYsV0FBVzs7QUFFWDtFQUNFO0lBQ0UsYUFBYTtJQUNiLHNCQUFzQjtFQUN4Qjs7RUFFQTtJQUNFLGFBQWE7RUFDZjs7RUFFQTtJQUNFLGFBQWE7RUFDZjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG59XFxuXFxuYm9keSB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbn1cXG5cXG4vKiBoZWFkZXIvdGl0bGUgKi9cXG5cXG4uaGVhZGVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuaDEge1xcbiAgZm9udC1zaXplOiAzcmVtO1xcbiAgY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4jZ2l0aHViIHtcXG4gIHdpZHRoOiA3MHB4O1xcbiAgaGVpZ2h0OiA3MHB4O1xcbiAgcGFkZGluZzogMXJlbTtcXG59XFxuXFxuLmhpY29uIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5pbWcge1xcbiAgdHJhbnNpdGlvbjogdHJhbnNmb3JtIDAuN3MgZWFzZS1pbi1vdXQ7XFxufVxcblxcbmltZzpob3ZlciB7XFxuICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcbn1cXG5cXG4jcHJlc3RhcnQge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwibW9udHNlcnJhdFxcXCIsIHNhbnMtc2VyaWY7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBwYWRkaW5nOiAxMnB4IDIwcHg7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjRzIGxpbmVhcjtcXG59XFxuXFxuI3ByZXN0YXJ0OmhvdmVyIHtcXG4gIGNvbG9yOiAjZmZmO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogYmxhY2s7XFxufVxcblxcbi8qIGhlYWRlci90aXRsZSAqL1xcblxcbi8qIHJlbmRlciBiYXR0bGVzaGlwIGJvYXJkcyAqL1xcblxcbi5nYW1lYm9hcmQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1ldmVubHk7XFxuICBwYWRkaW5nOiAzcmVtIDNyZW07XFxuXFxuICAvKiBhbGlnbi1jb250ZW50OiBjZW50ZXI7ICovXFxufVxcblxcbi5wbGF5ZXJnYW1lLWJvYXJkIHtcXG4gIC8qIGRpc3BsYXk6IGdyaWQ7ICovXFxuICB3aWR0aDogMzAwcHg7XFxuICAvKiBoZWlnaHQ6IDIwMHB4OyAqL1xcbn1cXG5cXG4uYmxvY2stbnVtYmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG59XFxuLnNlY3Rpb24ge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWE1YTVhO1xcbn1cXG5cXG4uY29tcHV0ZXItYm9hcmQge1xcbiAgd2lkdGg6IDMwMHB4O1xcblxcbiAgLyogZGlzcGxheTogZ3JpZDsgKi9cXG4gIC8qIGhlaWdodDogMjAwcHg7ICovXFxufVxcblxcbi5jb21wdXRlcmJsb2NrLW51bWJlciB7XFxuICBkaXNwbGF5OiBncmlkO1xcbiAgZ3JpZC10ZW1wbGF0ZS1yb3dzOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgZ3JpZC10ZW1wbGF0ZS1jb2x1bW5zOiByZXBlYXQoMTAsIDMwcHgpO1xcbiAgd2lkdGg6IDMwcHg7XFxuICBoZWlnaHQ6IDMwcHg7XFxufVxcblxcbi5jb21wdXRlcnNlY3Rpb24ge1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNWE1YTVhO1xcbiAgY3Vyc29yOiBjcm9zc2hhaXI7XFxufVxcblxcbi5jb21wdXRlcnNlY3Rpb246aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzEzOGFhZjtcXG59XFxuXFxuLyogcmVuZGVyIGJhdHRsZXNoaXAgYm9hcmRzICovXFxuXFxuLyogY3NzIGVmZmVjdHMgKi9cXG5cXG4uc2VjdGlvbi50YWtlbiB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTM4YWFmO1xcbn1cXG5cXG4uc2VjdGlvbi5sYW5kZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM5ZmYxNDtcXG59XFxuXFxuLmNvbXB1dGVyc2VjdGlvbi5sYW5kZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM5ZmYxNDtcXG59XFxuXFxuLmxhbmRlZGNvbXB1dGVyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMzOWZmMTQ7XFxufVxcblxcbi5sYW5kZWQ6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM5ZmYxNDtcXG59XFxuXFxuLm1pc3Mge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMTgxODtcXG59XFxuXFxuLm1pc3M6aG92ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmMTgxODtcXG59XFxuXFxuLyogbW9kYWwgKi9cXG5cXG4ubW9kYWwge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiA1MCU7XFxuICBsZWZ0OiA1MCU7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgwKTtcXG4gIHRyYW5zaXRpb246IDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgYm9yZGVyOiAxcHggc29saWQgYmxhY2s7XFxuICB6LWluZGV4OiAxMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xcbiAgd2lkdGg6IDUwMHB4O1xcbiAgaGVpZ2h0OiAzMDBweDtcXG4gIG1heC13aWR0aDogODAlO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxufVxcblxcbi5tb2RhbC5hY3RpdmUge1xcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSkgc2NhbGUoMSk7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbn1cXG5cXG4ubW9kYWwtaGVhZGVyIHtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgYWxpZ24tY29udGVudDogY2VudGVyO1xcbn1cXG5cXG4ubW9kYWwtYm9keSB7XFxuICBwYWRkaW5nOiAxMHB4IDE1cHg7XFxufVxcblxcbiNvdmVybGF5IHtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIG9wYWNpdHk6IDA7XFxuICB0cmFuc2l0aW9uOiAyMDBtcyBlYXNlLWluLW91dDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICByaWdodDogMDtcXG4gIGJvdHRvbTogMDtcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMCwgMCwgMCwgMC41KTtcXG4gIHBvaW50ZXItZXZlbnRzOiBub25lO1xcbn1cXG5cXG4jb3ZlcmxheS5hY3RpdmUge1xcbiAgb3BhY2l0eTogMTtcXG59XFxuXFxuI3Jlc3RhcnQge1xcbiAgY3Vyc29yOiBwb2ludGVyO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogZ3JheTtcXG4gIGZvbnQtZmFtaWx5OiBcXFwibW9udHNlcnJhdFxcXCIsIHNhbnMtc2VyaWY7XFxuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xcbiAgYm9yZGVyOiAycHggc29saWQgYmxhY2s7XFxuICBib3JkZXItcmFkaXVzOiAycHg7XFxuICBwYWRkaW5nOiAxMnB4IDIwcHg7XFxuICB0cmFuc2l0aW9uOiBjb2xvciAwLjRzIGxpbmVhcjtcXG59XFxuXFxuI3Jlc3RhcnQ6aG92ZXIge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLyogbW9kYWwgKi9cXG5cXG4vKiBtZWRpYSAgKi9cXG5cXG5AbWVkaWEgYWxsIGFuZCAobWF4LXdpZHRoOiA4MjBweCkge1xcbiAgLmdhbWVib2FyZC1jb250YWluZXIge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgfVxcblxcbiAgLnBsYXllcmdhbWUtYm9hcmQge1xcbiAgICBwYWRkaW5nOiAycmVtO1xcbiAgfVxcblxcbiAgLmNvbXB1dGVyLWJvYXJkIHtcXG4gICAgcGFkZGluZzogMnJlbTtcXG4gIH1cXG59XFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHRpZDogbW9kdWxlSWQsXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5nID0gKGZ1bmN0aW9uKCkge1xuXHRpZiAodHlwZW9mIGdsb2JhbFRoaXMgPT09ICdvYmplY3QnKSByZXR1cm4gZ2xvYmFsVGhpcztcblx0dHJ5IHtcblx0XHRyZXR1cm4gdGhpcyB8fCBuZXcgRnVuY3Rpb24oJ3JldHVybiB0aGlzJykoKTtcblx0fSBjYXRjaCAoZSkge1xuXHRcdGlmICh0eXBlb2Ygd2luZG93ID09PSAnb2JqZWN0JykgcmV0dXJuIHdpbmRvdztcblx0fVxufSkoKTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwidmFyIHNjcmlwdFVybDtcbmlmIChfX3dlYnBhY2tfcmVxdWlyZV9fLmcuaW1wb3J0U2NyaXB0cykgc2NyaXB0VXJsID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmxvY2F0aW9uICsgXCJcIjtcbnZhciBkb2N1bWVudCA9IF9fd2VicGFja19yZXF1aXJlX18uZy5kb2N1bWVudDtcbmlmICghc2NyaXB0VXJsICYmIGRvY3VtZW50KSB7XG5cdGlmIChkb2N1bWVudC5jdXJyZW50U2NyaXB0KVxuXHRcdHNjcmlwdFVybCA9IGRvY3VtZW50LmN1cnJlbnRTY3JpcHQuc3JjXG5cdGlmICghc2NyaXB0VXJsKSB7XG5cdFx0dmFyIHNjcmlwdHMgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZShcInNjcmlwdFwiKTtcblx0XHRpZihzY3JpcHRzLmxlbmd0aCkgc2NyaXB0VXJsID0gc2NyaXB0c1tzY3JpcHRzLmxlbmd0aCAtIDFdLnNyY1xuXHR9XG59XG4vLyBXaGVuIHN1cHBvcnRpbmcgYnJvd3NlcnMgd2hlcmUgYW4gYXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCB5b3UgbXVzdCBzcGVjaWZ5IGFuIG91dHB1dC5wdWJsaWNQYXRoIG1hbnVhbGx5IHZpYSBjb25maWd1cmF0aW9uXG4vLyBvciBwYXNzIGFuIGVtcHR5IHN0cmluZyAoXCJcIikgYW5kIHNldCB0aGUgX193ZWJwYWNrX3B1YmxpY19wYXRoX18gdmFyaWFibGUgZnJvbSB5b3VyIGNvZGUgdG8gdXNlIHlvdXIgb3duIGxvZ2ljLlxuaWYgKCFzY3JpcHRVcmwpIHRocm93IG5ldyBFcnJvcihcIkF1dG9tYXRpYyBwdWJsaWNQYXRoIGlzIG5vdCBzdXBwb3J0ZWQgaW4gdGhpcyBicm93c2VyXCIpO1xuc2NyaXB0VXJsID0gc2NyaXB0VXJsLnJlcGxhY2UoLyMuKiQvLCBcIlwiKS5yZXBsYWNlKC9cXD8uKiQvLCBcIlwiKS5yZXBsYWNlKC9cXC9bXlxcL10rJC8sIFwiL1wiKTtcbl9fd2VicGFja19yZXF1aXJlX18ucCA9IHNjcmlwdFVybDsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm5jID0gdW5kZWZpbmVkOyIsImltcG9ydCBTaGlwIGZyb20gXCIuL21vZHVsZXMvc2hpcFwiO1xuaW1wb3J0IEdhbWVib2FyZCBmcm9tIFwiLi9tb2R1bGVzL2dhbWVib2FyZFwiO1xuaW1wb3J0IFBsYXllciBmcm9tIFwiLi9tb2R1bGVzL3BsYXllclwiO1xuaW1wb3J0IHsgZ2FtZSB9IGZyb20gXCIuL21vZHVsZXMvZ2FtZWxvb3BcIjtcbmltcG9ydCBzdHlsZSBmcm9tIFwiLi9zdHlsZXMvc3R5bGUuY3NzXCI7XG5pbXBvcnQgZ2l0aHViIGZyb20gXCIuL2Fzc2V0cy9naXRodWIuc3ZnXCI7XG5cbmNvbnN0IGdpdGNvbiA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZ2l0aHViXCIpO1xuZ2l0Y29uLnNyYyA9IGdpdGh1YjtcbmdpdGNvbi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICBkb2N1bWVudC5sb2NhdGlvbiA9IFwiaHR0cHM6Ly9naXRodWIuY29tL1p5NTg3OT90YWI9cmVwb3NpdG9yaWVzXCI7XG59KTtcbiJdLCJuYW1lcyI6WyJTaGlwIiwiR2FtZWJvYXJkIiwiY3J1aXNlciIsImJhdHRsZXNoaXAiLCJzdWJtYXJpbmUiLCJkZXN0cm95ZXIiLCJzaGlwcyIsImdyaWQiLCJjcmVhdGVNYXAiLCJyb3dzIiwiY29sdW1ucyIsImkiLCJqIiwicGxhY2VTaGlwIiwieCIsInkiLCJzaGlwIiwibGVuZ3RoIiwiTnVtYmVyIiwibmFtZXMiLCJyYW5kb21QbGFjZVNoaXAiLCJ4UmFuZG9tTnVtYmVyIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwieVJhbmRvbU51bWJlciIsIm51bWJlcnMiLCJwdXNoIiwiaXNWYWxpZCIsImV2ZXJ5IiwibnVtIiwiZm9yRWFjaCIsImdldEJvYXJkIiwicmVjaWV2ZUF0dGFjayIsImF0dGFjayIsImNsZWFyQm9hcmQiLCJib2FyZCIsIlBsYXllciIsImdhbWUiLCJvcGVuTW9kYWwiLCJtb2RhbCIsImNsYXNzTGlzdCIsImFkZCIsIm92ZXJsYXkiLCJjbG9zZU1vZGFsIiwicmVtb3ZlIiwicGxheWVyMSIsInBsYXllcjFib2FyZCIsInBsYXllcjFzaGlwcyIsImNvbXB1dGVyIiwiY29tcHV0ZXJib2FyZCIsImNvbXB1dGVyc2hpcHMiLCJuZXdnYW1lIiwiZG9jdW1lbnQiLCJxdWVyeVNlbGVjdG9yIiwiYWRkRXZlbnRMaXN0ZW5lciIsInN0YXJ0R2FtZSIsInN0eWxlIiwiZGlzcGxheSIsInJlbmRlclBsYXllckJvYXJkIiwicmVuZGVyQ29tcHV0ZXJCb2FyZCIsImNvbXB1dGVyc2VjdGlvbiIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJzZWN0aW9uIiwicGxheVJvdW5kIiwib25jZSIsImdhbWVib2FyZCIsImNyZWF0ZUVsZW1lbnQiLCJnYW1lYm9hcmRjb250YWluZXIiLCJwbGF5ZXJib2FyZGNvbnRhaW5lciIsInVzZXJoZWFkZXIiLCJ0ZXh0Q29udGVudCIsInBsYXllcjFncmlkIiwiY29sIiwiaW5kZXgiLCJnYW1lYm9hcmRpdiIsInJvdyIsInN1YmdhbWVib2FyZGl2Iiwic2V0QXR0cmlidXRlIiwiYXBwZW5kQ2hpbGQiLCJjb21wdXRlcmhlYWRlciIsImNvbXB1dGVyY29udGFpbmVyIiwiY29tcHV0ZXJnYW1lYm9hcmQiLCJjb21wdXRlcmdyaWQiLCJlIiwidGFyZ2V0VmFsdWUiLCJ0YXJnZXQiLCJnZXRBdHRyaWJ1dGUiLCJjb250YWlucyIsImF0dGFja0NvbXB1dGVyIiwiY29tcHV0ZXJTZWxlY3Rpb24iLCJjaGVja1dpbm5lciIsInJhbmRvbUF0dGFjayIsImdldEVsZW1lbnRCeUlkIiwiaXNTdW5rIiwiYWxlcnQiLCJuYW1lIiwibW9kYWx3aW5uZXIiLCJwbGF5QWdhaW4iLCJwbGF5R2FtZUFnYWluIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiaGl0cyIsImJvYXJkZ3JpZCIsImNvbnNvbGUiLCJsb2ciLCJnaXRodWIiLCJnaXRjb24iLCJzcmMiLCJsb2NhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=