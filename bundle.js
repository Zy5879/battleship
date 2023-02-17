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
      var modalwinner = document.querySelector(".displaywinner");
      modalwinner.textContent = " Bummer!! You lost to the ".concat(computer.name);
      openModal(modal);
    } else if (computerships.every(function (ship) {
      return ship.isSunk() == true;
    })) {
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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d0UsTUFBTSxHQUFHckQsUUFBUSxDQUFDd0MsY0FBYyxDQUFDLFFBQVEsQ0FBQztBQUNoRGEsTUFBTSxDQUFDQyxHQUFHLEdBQUdGLCtDQUFNO0FBQ25CQyxNQUFNLENBQUNuRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtFQUNyQ0YsUUFBUSxDQUFDdUQsUUFBUSxHQUFHLDRDQUE0QztBQUNsRSxDQUFDLENBQUMsQyIsInNvdXJjZXMiOlsid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL2dhbWVsb29wLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvbW9kdWxlcy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9tb2R1bGVzL3NoaXAuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL3NyYy9zdHlsZXMvc3R5bGUuY3NzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvYXBpLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vc3JjL3N0eWxlcy9zdHlsZS5jc3M/ZmY5NCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5qZWN0U3R5bGVzSW50b1N0eWxlVGFnLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qcyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVEb21BUEkuanMiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlVGFnVHJhbnNmb3JtLmpzIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvY29tcGF0IGdldCBkZWZhdWx0IGV4cG9ydCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9nbG9iYWwiLCJ3ZWJwYWNrOi8vYmF0dGxlc2hpcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9iYXR0bGVzaGlwL3dlYnBhY2svcnVudGltZS9wdWJsaWNQYXRoIiwid2VicGFjazovL2JhdHRsZXNoaXAvd2VicGFjay9ydW50aW1lL25vbmNlIiwid2VicGFjazovL2JhdHRsZXNoaXAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU2hpcCB9IGZyb20gXCIuL3NoaXBcIjtcblxuY29uc3QgR2FtZWJvYXJkID0gKCkgPT4ge1xuICBsZXQgY3J1aXNlciA9IFNoaXAoXCJDcnVpc2VyXCIsIDUpO1xuICBsZXQgYmF0dGxlc2hpcCA9IFNoaXAoXCJCYXR0bGVzaGlwXCIsIDQpO1xuICBsZXQgc3VibWFyaW5lID0gU2hpcChcIlN1Ym1hcmluZVwiLCAzKTtcbiAgbGV0IGRlc3Ryb3llciA9IFNoaXAoXCJEZXN0cm95ZXJcIiwgMik7XG5cbiAgY29uc3Qgc2hpcHMgPSBbY3J1aXNlciwgYmF0dGxlc2hpcCwgc3VibWFyaW5lLCBkZXN0cm95ZXJdO1xuICBsZXQgZ3JpZCA9IFtdO1xuICBjb25zdCBjcmVhdGVNYXAgPSAocm93cywgY29sdW1ucykgPT4ge1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcm93czsgaSsrKSB7XG4gICAgICBncmlkW2ldID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHVtbnM7IGorKykge1xuICAgICAgICBncmlkW2ldW2pdID0gXCJcIjtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGdyaWQ7XG4gIH07XG5cbiAgZnVuY3Rpb24gcGxhY2VTaGlwKHgsIHksIHNoaXApIHtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgIGdyaWRbTnVtYmVyKHgpXVtOdW1iZXIoeSkgKyBpXSA9IHNoaXAubmFtZXM7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmFuZG9tUGxhY2VTaGlwKHNoaXApIHtcbiAgICBsZXQgeFJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpO1xuICAgIGxldCB5UmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSk7XG5cbiAgICBpZiAoeVJhbmRvbU51bWJlciArIHNoaXAubGVuZ3RoID4gZ3JpZFt4UmFuZG9tTnVtYmVyXS5sZW5ndGgpIHtcbiAgICAgIHlSYW5kb21OdW1iZXIgPSB5UmFuZG9tTnVtYmVyIC0gc2hpcC5sZW5ndGg7XG4gICAgfSBlbHNlIHtcbiAgICAgIHlSYW5kb21OdW1iZXI7XG4gICAgfVxuXG4gICAgbGV0IG51bWJlcnMgPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuZ3RoOyBpKyspIHtcbiAgICAgIG51bWJlcnMucHVzaCh5UmFuZG9tTnVtYmVyICsgaSk7XG4gICAgfVxuXG4gICAgY29uc3QgaXNWYWxpZCA9IG51bWJlcnMuZXZlcnkoKG51bSkgPT4gZ3JpZFt4UmFuZG9tTnVtYmVyXVtudW1dID09IFwiXCIpO1xuXG4gICAgaWYgKGlzVmFsaWQpIHtcbiAgICAgIG51bWJlcnMuZm9yRWFjaCgobnVtKSA9PiB7XG4gICAgICAgIGdyaWRbeFJhbmRvbU51bWJlcl1bbnVtXSA9IHNoaXAubmFtZXM7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmFuZG9tUGxhY2VTaGlwKHNoaXApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGdldEJvYXJkID0gKCkgPT4ge1xuICAgIHJldHVybiBncmlkO1xuICB9O1xuXG4gIGZ1bmN0aW9uIHJlY2lldmVBdHRhY2soeCwgeSkge1xuICAgIC8vIGxldCBib2FyZCA9IGdyaWQ7XG4gICAgaWYgKGdyaWRbeF1beV0gPT0gY3J1aXNlci5uYW1lcykge1xuICAgICAgZ3JpZFt4XVt5XSA9IFwiWFwiO1xuICAgICAgY3J1aXNlci5hdHRhY2soKTtcbiAgICB9IGVsc2UgaWYgKGdyaWRbeF1beV0gPT0gYmF0dGxlc2hpcC5uYW1lcykge1xuICAgICAgZ3JpZFt4XVt5XSA9IFwiWFwiO1xuICAgICAgYmF0dGxlc2hpcC5hdHRhY2soKTtcbiAgICB9IGVsc2UgaWYgKGdyaWRbeF1beV0gPT0gc3VibWFyaW5lLm5hbWVzKSB7XG4gICAgICBncmlkW3hdW3ldID0gXCJYXCI7XG4gICAgICBzdWJtYXJpbmUuYXR0YWNrKCk7XG4gICAgfSBlbHNlIGlmIChncmlkW3hdW3ldID09IGRlc3Ryb3llci5uYW1lcykge1xuICAgICAgZ3JpZFt4XVt5XSA9IFwiWFwiO1xuICAgICAgZGVzdHJveWVyLmF0dGFjaygpO1xuICAgIH0gZWxzZSBpZiAoZ3JpZFt4XVt5XSA9PSBcIlwiKSB7XG4gICAgICBncmlkW3hdW3ldID0gXCJPXCI7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBjbGVhckJvYXJkKGJvYXJkKSB7XG4gICAgY3JlYXRlTWFwKDEwLCAxMCk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGNyZWF0ZU1hcCxcbiAgICBjbGVhckJvYXJkLFxuICAgIGdldEJvYXJkLFxuICAgIHJhbmRvbVBsYWNlU2hpcCxcbiAgICByZWNpZXZlQXR0YWNrLFxuICAgIHBsYWNlU2hpcCxcbiAgICBncmlkLFxuICAgIHNoaXBzLFxuICB9O1xufTtcblxuZXhwb3J0IHsgR2FtZWJvYXJkIH07XG4iLCJpbXBvcnQgeyBQbGF5ZXIgfSBmcm9tIFwiLi9wbGF5ZXJcIjtcblxuZXhwb3J0IGNvbnN0IGdhbWUgPSAoKCkgPT4ge1xuICBmdW5jdGlvbiBvcGVuTW9kYWwobW9kYWwpIHtcbiAgICBpZiAobW9kYWwgPT0gbnVsbCkgcmV0dXJuO1xuICAgIG1vZGFsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIik7XG4gICAgb3ZlcmxheS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICB9XG5cbiAgZnVuY3Rpb24gY2xvc2VNb2RhbChtb2RhbCkge1xuICAgIGlmIChtb2RhbCA9PSBudWxsKSByZXR1cm47XG4gICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICBvdmVybGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gIH1cblxuICBsZXQgcGxheWVyMSA9IFBsYXllcihcIlVzZXJcIik7XG4gIGxldCBwbGF5ZXIxYm9hcmQgPSBwbGF5ZXIxLmJvYXJkO1xuICBsZXQgcGxheWVyMXNoaXBzID0gcGxheWVyMWJvYXJkLnNoaXBzO1xuXG4gIGxldCBjb21wdXRlciA9IFBsYXllcihcIkNvbXB1dGVyXCIpO1xuXG4gIGxldCBjb21wdXRlcmJvYXJkID0gY29tcHV0ZXIuYm9hcmQ7XG4gIGxldCBjb21wdXRlcnNoaXBzID0gY29tcHV0ZXJib2FyZC5zaGlwcztcblxuICBjb25zdCBuZXdnYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wcmVzdGFydFwiKTtcbiAgbmV3Z2FtZS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgc3RhcnRHYW1lKTtcblxuICBmdW5jdGlvbiBzdGFydEdhbWUoKSB7XG4gICAgbmV3Z2FtZS5zdHlsZS5kaXNwbGF5ID0gXCJub25lXCI7XG5cbiAgICBwbGF5ZXIxc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gcGxheWVyMWJvYXJkLnJhbmRvbVBsYWNlU2hpcChzaGlwKSk7XG4gICAgY29tcHV0ZXJzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiBjb21wdXRlcmJvYXJkLnJhbmRvbVBsYWNlU2hpcChzaGlwKSk7XG5cbiAgICByZW5kZXJQbGF5ZXJCb2FyZCgpO1xuICAgIHJlbmRlckNvbXB1dGVyQm9hcmQoKTtcblxuICAgIGNvbnN0IGNvbXB1dGVyc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcHV0ZXJzZWN0aW9uXCIpO1xuICAgIGNvbXB1dGVyc2VjdGlvbi5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XG4gICAgICBzZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5Um91bmQsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlbmRlclBsYXllckJvYXJkKCkge1xuICAgIGNvbnN0IGdhbWVib2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgZ2FtZWJvYXJkLmNsYXNzTGlzdC5hZGQoXCJwbGF5ZXJnYW1lLWJvYXJkXCIpO1xuICAgIGNvbnN0IGdhbWVib2FyZGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkLWNvbnRhaW5lclwiKTtcbiAgICBjb25zdCBwbGF5ZXJib2FyZGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgcGxheWVyYm9hcmRjb250YWluZXIuY2xhc3NMaXN0LmFkZChcInBsYXllci1jb250YWluZXJcIik7XG4gICAgY29uc3QgdXNlcmhlYWRlciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJoM1wiKTtcbiAgICB1c2VyaGVhZGVyLnRleHRDb250ZW50ID0gXCJVc2VyIEJvYXJkXCI7XG5cbiAgICBsZXQgcGxheWVyMWdyaWQgPSBwbGF5ZXIxYm9hcmQuZ3JpZDtcblxuICAgIHBsYXllcjFncmlkLmZvckVhY2goKGNvbCwgaW5kZXgpID0+IHtcbiAgICAgIGNvbnN0IGdhbWVib2FyZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgIGdhbWVib2FyZGl2LmNsYXNzTGlzdC5hZGQoXCJibG9jay1udW1iZXJcIik7XG4gICAgICBjb2wuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICAgIGNvbnN0IHN1YmdhbWVib2FyZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgc3ViZ2FtZWJvYXJkaXYuY2xhc3NMaXN0LmFkZChcInNlY3Rpb25cIik7XG4gICAgICAgIHN1YmdhbWVib2FyZGl2LnNldEF0dHJpYnV0ZShcImRhdGEtcGxheWVydmFsdWVcIiwgaW5kZXggKyBcIi1cIiArIGkpO1xuICAgICAgICBpZiAocm93KSB7XG4gICAgICAgICAgc3ViZ2FtZWJvYXJkaXYuY2xhc3NMaXN0LmFkZChcInRha2VuXCIpO1xuICAgICAgICAgIHN1YmdhbWVib2FyZGl2LmNsYXNzTGlzdC5hZGQocm93KTtcbiAgICAgICAgfVxuICAgICAgICBnYW1lYm9hcmRpdi5hcHBlbmRDaGlsZChzdWJnYW1lYm9hcmRpdik7XG4gICAgICB9KTtcbiAgICAgIGdhbWVib2FyZC5hcHBlbmRDaGlsZChnYW1lYm9hcmRpdik7XG4gICAgfSk7XG4gICAgZ2FtZWJvYXJkY29udGFpbmVyLmFwcGVuZENoaWxkKGdhbWVib2FyZCk7XG4gIH1cblxuICBmdW5jdGlvbiByZW5kZXJDb21wdXRlckJvYXJkKCkge1xuICAgIGNvbnN0IGNvbXB1dGVyaGVhZGVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImgzXCIpO1xuICAgIGNvbXB1dGVyaGVhZGVyLnRleHRDb250ZW50ID0gXCJDb21wdXRlciBCb2FyZFwiO1xuICAgIGNvbnN0IGNvbXB1dGVyY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb21wdXRlcmNvbnRhaW5lci5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItY29udGFpbmVyXCIpO1xuICAgIGNvbnN0IGNvbXB1dGVyZ2FtZWJvYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICBjb21wdXRlcmdhbWVib2FyZC5jbGFzc0xpc3QuYWRkKFwiY29tcHV0ZXItYm9hcmRcIik7XG4gICAgY29uc3QgZ2FtZWJvYXJkY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5nYW1lYm9hcmQtY29udGFpbmVyXCIpO1xuICAgIGxldCBjb21wdXRlcmdyaWQgPSBjb21wdXRlcmJvYXJkLmdyaWQ7XG5cbiAgICBjb21wdXRlcmdyaWQuZm9yRWFjaCgoY29sLCBpbmRleCkgPT4ge1xuICAgICAgY29uc3QgZ2FtZWJvYXJkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgZ2FtZWJvYXJkaXYuY2xhc3NMaXN0LmFkZChcImNvbXB1dGVyYmxvY2stbnVtYmVyXCIpO1xuICAgICAgY29sLmZvckVhY2goKHJvdywgaSkgPT4ge1xuICAgICAgICBjb25zdCBzdWJnYW1lYm9hcmRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XG4gICAgICAgIHN1YmdhbWVib2FyZGl2LmNsYXNzTGlzdC5hZGQoXCJjb21wdXRlcnNlY3Rpb25cIik7XG4gICAgICAgIHN1YmdhbWVib2FyZGl2LnNldEF0dHJpYnV0ZShcImRhdGEtY29tcHV0ZXJ2YWx1ZVwiLCBpbmRleCArIFwiLVwiICsgaSk7XG4gICAgICAgIGlmIChyb3cpIHtcbiAgICAgICAgICBzdWJnYW1lYm9hcmRpdi5jbGFzc0xpc3QuYWRkKFwidGFrZW5cIik7XG4gICAgICAgICAgc3ViZ2FtZWJvYXJkaXYuY2xhc3NMaXN0LmFkZChyb3cpO1xuICAgICAgICB9XG4gICAgICAgIGdhbWVib2FyZGl2LmFwcGVuZENoaWxkKHN1YmdhbWVib2FyZGl2KTtcbiAgICAgIH0pO1xuXG4gICAgICBjb21wdXRlcmdhbWVib2FyZC5hcHBlbmRDaGlsZChnYW1lYm9hcmRpdik7XG4gICAgfSk7XG4gICAgZ2FtZWJvYXJkY29udGFpbmVyLmFwcGVuZENoaWxkKGNvbXB1dGVyZ2FtZWJvYXJkKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHBsYXlSb3VuZChlKSB7XG4gICAgbGV0IHRhcmdldFZhbHVlID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb21wdXRlcnZhbHVlXCIpO1xuXG4gICAgaWYgKGUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcInRha2VuXCIpKSB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibGFuZGVkXCIpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICB9XG5cbiAgICBwbGF5ZXIxLmF0dGFja0NvbXB1dGVyKGNvbXB1dGVyYm9hcmQsIHRhcmdldFZhbHVlWzBdLCB0YXJnZXRWYWx1ZVsyXSk7XG4gICAgY29tcHV0ZXJTZWxlY3Rpb24oKTtcbiAgICBjaGVja1dpbm5lcigpO1xuICB9XG5cbiAgZnVuY3Rpb24gY29tcHV0ZXJTZWxlY3Rpb24oKSB7XG4gICAgbGV0IHBsYXllcjFncmlkID0gcGxheWVyMWJvYXJkLmdyaWQ7XG4gICAgY29tcHV0ZXIucmFuZG9tQXR0YWNrKHBsYXllcjFib2FyZCk7XG5cbiAgICBwbGF5ZXIxZ3JpZC5mb3JFYWNoKChjb2wsIGluZGV4KSA9PiB7XG4gICAgICBjb2wuZm9yRWFjaCgocm93LCBpKSA9PiB7XG4gICAgICAgIGlmICgoaW5kZXgsIGksIHJvdyA9PSBcIk9cIikpIHtcbiAgICAgICAgICBjb25zdCBzZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICAgIGBbZGF0YS1wbGF5ZXJ2YWx1ZT1cIiR7aW5kZXggKyBcIi1cIiArIGl9XCJdYFxuICAgICAgICAgICk7XG4gICAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwibWlzc1wiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoKGluZGV4LCBpLCByb3cgPT0gXCJYXCIpKSB7XG4gICAgICAgICAgY29uc3Qgc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgICBgW2RhdGEtcGxheWVydmFsdWU9XCIke2luZGV4ICsgXCItXCIgKyBpfVwiXWBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgc2VjdGlvbi5jbGFzc0xpc3QuYWRkKFwibGFuZGVkXCIpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV2lubmVyKCkge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbFwiKTtcbiAgICBpZiAocGxheWVyMXNoaXBzLmV2ZXJ5KChzaGlwKSA9PiBzaGlwLmlzU3VuaygpID09IHRydWUpKSB7XG4gICAgICBjb25zdCBtb2RhbHdpbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGlzcGxheXdpbm5lclwiKTtcbiAgICAgIG1vZGFsd2lubmVyLnRleHRDb250ZW50ID0gYCBCdW1tZXIhISBZb3UgbG9zdCB0byB0aGUgJHtjb21wdXRlci5uYW1lfWA7XG4gICAgICBvcGVuTW9kYWwobW9kYWwpO1xuICAgIH0gZWxzZSBpZiAoY29tcHV0ZXJzaGlwcy5ldmVyeSgoc2hpcCkgPT4gc2hpcC5pc1N1bmsoKSA9PSB0cnVlKSkge1xuICAgICAgY29uc3QgbW9kYWx3aW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRpc3BsYXl3aW5uZXJcIik7XG4gICAgICBtb2RhbHdpbm5lci50ZXh0Q29udGVudCA9IGAgQ29uZ3JhdHVsYXRpb25zICR7cGxheWVyMS5uYW1lfSEgWW91IFdpbiFgO1xuICAgICAgb3Blbk1vZGFsKG1vZGFsKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHBsYXlBZ2FpbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucmVzdGFydFwiKTtcbiAgcGxheUFnYWluLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5R2FtZUFnYWluKTtcblxuICBmdW5jdGlvbiBwbGF5R2FtZUFnYWluKCkge1xuICAgIGNvbnN0IG1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJtb2RhbFwiKTtcbiAgICBjbG9zZU1vZGFsKG1vZGFsKTtcblxuICAgIGNvbnN0IGdhbWVib2FyZGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZ2FtZWJvYXJkLWNvbnRhaW5lclwiKTtcbiAgICB3aGlsZSAoZ2FtZWJvYXJkY29udGFpbmVyLmZpcnN0Q2hpbGQpIHtcbiAgICAgIGdhbWVib2FyZGNvbnRhaW5lci5yZW1vdmVDaGlsZChnYW1lYm9hcmRjb250YWluZXIuZmlyc3RDaGlsZCk7XG4gICAgfVxuICAgIGxldCBwbGF5ZXIxZ3JpZCA9IHBsYXllcjFib2FyZC5ncmlkO1xuICAgIGxldCBjb21wdXRlcmdyaWQgPSBjb21wdXRlcmJvYXJkLmdyaWQ7XG5cbiAgICBwbGF5ZXIxYm9hcmQuY2xlYXJCb2FyZChwbGF5ZXIxZ3JpZCk7XG4gICAgY29tcHV0ZXJib2FyZC5jbGVhckJvYXJkKGNvbXB1dGVyZ3JpZCk7XG5cbiAgICBwbGF5ZXIxc2hpcHMuZm9yRWFjaCgoc2hpcCkgPT4gcGxheWVyMWJvYXJkLnJhbmRvbVBsYWNlU2hpcChzaGlwKSk7XG4gICAgY29tcHV0ZXJzaGlwcy5mb3JFYWNoKChzaGlwKSA9PiBjb21wdXRlcmJvYXJkLnJhbmRvbVBsYWNlU2hpcChzaGlwKSk7XG5cbiAgICBjb21wdXRlcnNoaXBzLmZvckVhY2goKHNoaXApID0+IHtcbiAgICAgIHNoaXAuaGl0cyA9IDA7XG4gICAgfSk7XG5cbiAgICByZW5kZXJQbGF5ZXJCb2FyZCgpO1xuICAgIHJlbmRlckNvbXB1dGVyQm9hcmQoKTtcblxuICAgIGNvbnN0IGNvbXB1dGVyc2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuY29tcHV0ZXJzZWN0aW9uXCIpO1xuICAgIGNvbXB1dGVyc2VjdGlvbi5mb3JFYWNoKChzZWN0aW9uKSA9PiB7XG4gICAgICBzZWN0aW9uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBwbGF5Um91bmQsIHsgb25jZTogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgfVxufSkoKTtcbiIsImltcG9ydCB7IFNoaXAgfSBmcm9tIFwiLi9zaGlwXCI7XG5pbXBvcnQgeyBHYW1lYm9hcmQgfSBmcm9tIFwiLi9nYW1lYm9hcmRcIjtcblxuZXhwb3J0IGNvbnN0IFBsYXllciA9IChuYW1lKSA9PiB7XG4gIGxldCBib2FyZCA9IEdhbWVib2FyZCgpO1xuICBib2FyZC5jcmVhdGVNYXAoMTAsIDEwKTtcbiAgbGV0IGJvYXJkZ3JpZCA9IGJvYXJkLmdyaWQ7XG5cbiAgZnVuY3Rpb24gYXR0YWNrQ29tcHV0ZXIoYm9hcmQsIHgsIHkpIHtcbiAgICBib2FyZC5yZWNpZXZlQXR0YWNrKHgsIHkpO1xuICB9XG5cbiAgZnVuY3Rpb24gcmFuZG9tQXR0YWNrKGdyaWQpIHtcbiAgICBsZXQgeFJhbmRvbU51bWJlciA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDkpO1xuICAgIGxldCB5UmFuZG9tTnVtYmVyID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogOSk7XG5cbiAgICBpZiAoYm9hcmRncmlkW051bWJlcih4UmFuZG9tTnVtYmVyKV1bTnVtYmVyKHlSYW5kb21OdW1iZXIpXSA9PSBcIlhcIikge1xuICAgICAgY29uc29sZS5sb2coeFJhbmRvbU51bWJlciwgeVJhbmRvbU51bWJlcik7XG4gICAgICByYW5kb21BdHRhY2soZ3JpZCk7XG4gICAgfSBlbHNlIGlmIChib2FyZGdyaWRbTnVtYmVyKHhSYW5kb21OdW1iZXIpXVtOdW1iZXIoeVJhbmRvbU51bWJlcildID09IFwiT1wiKSB7XG4gICAgICBjb25zb2xlLmxvZyh4UmFuZG9tTnVtYmVyLCB5UmFuZG9tTnVtYmVyKTtcbiAgICAgIHJhbmRvbUF0dGFjayhncmlkKTtcbiAgICB9IGVsc2UgaWYgKGdyaWQucmVjaWV2ZUF0dGFjayh4UmFuZG9tTnVtYmVyLCB5UmFuZG9tTnVtYmVyKSA9PSBmYWxzZSkge1xuICAgICAgcmFuZG9tQXR0YWNrKGdyaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBncmlkLnJlY2lldmVBdHRhY2soeFJhbmRvbU51bWJlciwgeVJhbmRvbU51bWJlcik7XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgbmFtZSxcbiAgICBib2FyZGdyaWQsXG4gICAgYm9hcmQsXG4gICAgcmFuZG9tQXR0YWNrLFxuICAgIGF0dGFja0NvbXB1dGVyLFxuICB9O1xufTtcbiIsImV4cG9ydCBjb25zdCBTaGlwID0gKG5hbWVzLCBsZW5ndGggPSAwLCBoaXRzID0gMCkgPT4ge1xuICBmdW5jdGlvbiBhdHRhY2soKSB7XG4gICAgdGhpcy5oaXRzKys7XG4gIH1cblxuICBmdW5jdGlvbiBpc1N1bmsoKSB7XG4gICAgaWYgKHRoaXMuaGl0cyA+PSBsZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuYW1lcyxcbiAgICBsZW5ndGgsXG4gICAgaGl0cyxcbiAgICBpc1N1bmssXG4gICAgYXR0YWNrLFxuICB9O1xufTtcbiIsIi8vIEltcG9ydHNcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fIGZyb20gXCIuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L3J1bnRpbWUvc291cmNlTWFwcy5qc1wiO1xuaW1wb3J0IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyBmcm9tIFwiLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL2FwaS5qc1wiO1xudmFyIF9fX0NTU19MT0FERVJfRVhQT1JUX19fID0gX19fQ1NTX0xPQURFUl9BUElfSU1QT1JUX19fKF9fX0NTU19MT0FERVJfQVBJX1NPVVJDRU1BUF9JTVBPUlRfX18pO1xuLy8gTW9kdWxlXG5fX19DU1NfTE9BREVSX0VYUE9SVF9fXy5wdXNoKFttb2R1bGUuaWQsIFwiKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxufVxcblxcbi8qIGhlYWRlci90aXRsZSAqL1xcblxcbi5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBjb2xvcjogYmxhY2s7XFxufVxcblxcbiNnaXRodWIge1xcbiAgd2lkdGg6IDcwcHg7XFxuICBoZWlnaHQ6IDcwcHg7XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG4uaGljb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmltZyB7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC43cyBlYXNlLWluLW91dDtcXG59XFxuXFxuaW1nOmhvdmVyIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxufVxcblxcbiNwcmVzdGFydCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJtb250c2VycmF0XFxcIiwgc2Fucy1zZXJpZjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIHBhZGRpbmc6IDEycHggMjBweDtcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuNHMgbGluZWFyO1xcbn1cXG5cXG4jcHJlc3RhcnQ6aG92ZXIge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLyogaGVhZGVyL3RpdGxlICovXFxuXFxuLyogcmVuZGVyIGJhdHRsZXNoaXAgYm9hcmRzICovXFxuXFxuLmdhbWVib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIHBhZGRpbmc6IDNyZW0gM3JlbTtcXG5cXG4gIC8qIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjsgKi9cXG59XFxuXFxuLnBsYXllcmdhbWUtYm9hcmQge1xcbiAgLyogZGlzcGxheTogZ3JpZDsgKi9cXG4gIHdpZHRoOiAzMDBweDtcXG4gIC8qIGhlaWdodDogMjAwcHg7ICovXFxufVxcblxcbi5ibG9jay1udW1iZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIHdpZHRoOiAzMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbn1cXG4uc2VjdGlvbiB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1YTVhNWE7XFxufVxcblxcbi5jb21wdXRlci1ib2FyZCB7XFxuICB3aWR0aDogMzAwcHg7XFxuXFxuICAvKiBkaXNwbGF5OiBncmlkOyAqL1xcbiAgLyogaGVpZ2h0OiAyMDBweDsgKi9cXG59XFxuXFxuLmNvbXB1dGVyYmxvY2stbnVtYmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG59XFxuXFxuLmNvbXB1dGVyc2VjdGlvbiB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1YTVhNWE7XFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXG59XFxuXFxuLmNvbXB1dGVyc2VjdGlvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTM4YWFmO1xcbn1cXG5cXG4vKiByZW5kZXIgYmF0dGxlc2hpcCBib2FyZHMgKi9cXG5cXG4vKiBjc3MgZWZmZWN0cyAqL1xcblxcbi5zZWN0aW9uLnRha2VuIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMzhhYWY7XFxufVxcblxcbi5zZWN0aW9uLmxhbmRlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzlmZjE0O1xcbn1cXG5cXG4uY29tcHV0ZXJzZWN0aW9uLmxhbmRlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzlmZjE0O1xcbn1cXG5cXG4ubGFuZGVkY29tcHV0ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM5ZmYxNDtcXG59XFxuXFxuLmxhbmRlZDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzlmZjE0O1xcbn1cXG5cXG4ubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYxODE4O1xcbn1cXG5cXG4ubWlzczpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYxODE4O1xcbn1cXG5cXG4vKiBtb2RhbCAqL1xcblxcbi5tb2RhbCB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApO1xcbiAgdHJhbnNpdGlvbjogMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIHotaW5kZXg6IDEwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICB3aWR0aDogNTAwcHg7XFxuICBoZWlnaHQ6IDMwMHB4O1xcbiAgbWF4LXdpZHRoOiA4MCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLm1vZGFsLmFjdGl2ZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxufVxcblxcbi5tb2RhbC1oZWFkZXIge1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5tb2RhbC1ib2R5IHtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG59XFxuXFxuI292ZXJsYXkge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbiNvdmVybGF5LmFjdGl2ZSB7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4jcmVzdGFydCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJtb250c2VycmF0XFxcIiwgc2Fucy1zZXJpZjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIHBhZGRpbmc6IDEycHggMjBweDtcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuNHMgbGluZWFyO1xcbn1cXG5cXG4jcmVzdGFydDpob3ZlciB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4vKiBtb2RhbCAqL1xcblxcbi8qIG1lZGlhICAqL1xcblxcbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6IDgyMHB4KSB7XFxuICAuZ2FtZWJvYXJkLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB9XFxuXFxuICAucGxheWVyZ2FtZS1ib2FyZCB7XFxuICAgIHBhZGRpbmc6IDJyZW07XFxuICB9XFxuXFxuICAuY29tcHV0ZXItYm9hcmQge1xcbiAgICBwYWRkaW5nOiAycmVtO1xcbiAgfVxcbn1cXG5cIiwgXCJcIix7XCJ2ZXJzaW9uXCI6MyxcInNvdXJjZXNcIjpbXCJ3ZWJwYWNrOi8vLi9zcmMvc3R5bGVzL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLHNCQUFzQjtBQUN4Qjs7QUFFQSxpQkFBaUI7O0FBRWpCO0VBQ0UsYUFBYTtFQUNiLHNCQUFzQjtFQUN0QixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxlQUFlO0VBQ2YsWUFBWTtBQUNkOztBQUVBO0VBQ0UsV0FBVztFQUNYLFlBQVk7RUFDWixhQUFhO0FBQ2Y7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsbUJBQW1CO0FBQ3JCOztBQUVBO0VBQ0Usc0NBQXNDO0FBQ3hDOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UsZUFBZTtFQUNmLHNCQUFzQjtFQUN0QixxQ0FBcUM7RUFDckMseUJBQXlCO0VBQ3pCLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCx1QkFBdUI7QUFDekI7O0FBRUEsaUJBQWlCOztBQUVqQiw2QkFBNkI7O0FBRTdCO0VBQ0UsYUFBYTtFQUNiLG1CQUFtQjtFQUNuQiw2QkFBNkI7RUFDN0Isa0JBQWtCOztFQUVsQiwyQkFBMkI7QUFDN0I7O0FBRUE7RUFDRSxtQkFBbUI7RUFDbkIsWUFBWTtFQUNaLG1CQUFtQjtBQUNyQjs7QUFFQTtFQUNFLGFBQWE7RUFDYixvQ0FBb0M7RUFDcEMsdUNBQXVDO0VBQ3ZDLFdBQVc7RUFDWCxZQUFZO0FBQ2Q7QUFDQTtFQUNFLHVCQUF1QjtFQUN2Qix5QkFBeUI7QUFDM0I7O0FBRUE7RUFDRSxZQUFZOztFQUVaLG1CQUFtQjtFQUNuQixtQkFBbUI7QUFDckI7O0FBRUE7RUFDRSxhQUFhO0VBQ2Isb0NBQW9DO0VBQ3BDLHVDQUF1QztFQUN2QyxXQUFXO0VBQ1gsWUFBWTtBQUNkOztBQUVBO0VBQ0UsdUJBQXVCO0VBQ3ZCLHlCQUF5QjtFQUN6QixpQkFBaUI7QUFDbkI7O0FBRUE7RUFDRSx5QkFBeUI7QUFDM0I7O0FBRUEsNkJBQTZCOztBQUU3QixnQkFBZ0I7O0FBRWhCO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBO0VBQ0UseUJBQXlCO0FBQzNCOztBQUVBLFVBQVU7O0FBRVY7RUFDRSxlQUFlO0VBQ2YsUUFBUTtFQUNSLFNBQVM7RUFDVCx5Q0FBeUM7RUFDekMsNkJBQTZCO0VBQzdCLHVCQUF1QjtFQUN2QixXQUFXO0VBQ1gsdUJBQXVCO0VBQ3ZCLFlBQVk7RUFDWixhQUFhO0VBQ2IsY0FBYztFQUNkLGFBQWE7RUFDYixzQkFBc0I7RUFDdEIsa0JBQWtCO0FBQ3BCOztBQUVBO0VBQ0UseUNBQXlDO0VBQ3pDLHNCQUFzQjtBQUN4Qjs7QUFFQTtFQUNFLGtCQUFrQjtFQUNsQixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLHFCQUFxQjtBQUN2Qjs7QUFFQTtFQUNFLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLGVBQWU7RUFDZixVQUFVO0VBQ1YsNkJBQTZCO0VBQzdCLE1BQU07RUFDTixPQUFPO0VBQ1AsUUFBUTtFQUNSLFNBQVM7RUFDVCxvQ0FBb0M7RUFDcEMsb0JBQW9CO0FBQ3RCOztBQUVBO0VBQ0UsVUFBVTtBQUNaOztBQUVBO0VBQ0UsZUFBZTtFQUNmLHNCQUFzQjtFQUN0QixxQ0FBcUM7RUFDckMseUJBQXlCO0VBQ3pCLHVCQUF1QjtFQUN2QixrQkFBa0I7RUFDbEIsa0JBQWtCO0VBQ2xCLDZCQUE2QjtBQUMvQjs7QUFFQTtFQUNFLFdBQVc7RUFDWCx1QkFBdUI7QUFDekI7O0FBRUEsVUFBVTs7QUFFVixXQUFXOztBQUVYO0VBQ0U7SUFDRSxhQUFhO0lBQ2Isc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0UsYUFBYTtFQUNmOztFQUVBO0lBQ0UsYUFBYTtFQUNmO0FBQ0ZcIixcInNvdXJjZXNDb250ZW50XCI6W1wiKiB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbn1cXG5cXG5ib2R5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxufVxcblxcbi8qIGhlYWRlci90aXRsZSAqL1xcblxcbi5oZWFkZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbn1cXG5cXG5oMSB7XFxuICBmb250LXNpemU6IDNyZW07XFxuICBjb2xvcjogYmxhY2s7XFxufVxcblxcbiNnaXRodWIge1xcbiAgd2lkdGg6IDcwcHg7XFxuICBoZWlnaHQ6IDcwcHg7XFxuICBwYWRkaW5nOiAxcmVtO1xcbn1cXG5cXG4uaGljb24ge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmltZyB7XFxuICB0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gMC43cyBlYXNlLWluLW91dDtcXG59XFxuXFxuaW1nOmhvdmVyIHtcXG4gIHRyYW5zZm9ybTogcm90YXRlKDM2MGRlZyk7XFxufVxcblxcbiNwcmVzdGFydCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJtb250c2VycmF0XFxcIiwgc2Fucy1zZXJpZjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIHBhZGRpbmc6IDEycHggMjBweDtcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuNHMgbGluZWFyO1xcbn1cXG5cXG4jcHJlc3RhcnQ6aG92ZXIge1xcbiAgY29sb3I6ICNmZmY7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBibGFjaztcXG59XFxuXFxuLyogaGVhZGVyL3RpdGxlICovXFxuXFxuLyogcmVuZGVyIGJhdHRsZXNoaXAgYm9hcmRzICovXFxuXFxuLmdhbWVib2FyZC1jb250YWluZXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWV2ZW5seTtcXG4gIHBhZGRpbmc6IDNyZW0gM3JlbTtcXG5cXG4gIC8qIGFsaWduLWNvbnRlbnQ6IGNlbnRlcjsgKi9cXG59XFxuXFxuLnBsYXllcmdhbWUtYm9hcmQge1xcbiAgLyogZGlzcGxheTogZ3JpZDsgKi9cXG4gIHdpZHRoOiAzMDBweDtcXG4gIC8qIGhlaWdodDogMjAwcHg7ICovXFxufVxcblxcbi5ibG9jay1udW1iZXIge1xcbiAgZGlzcGxheTogZ3JpZDtcXG4gIGdyaWQtdGVtcGxhdGUtcm93czogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KDEwLCAzMHB4KTtcXG4gIHdpZHRoOiAzMHB4O1xcbiAgaGVpZ2h0OiAzMHB4O1xcbn1cXG4uc2VjdGlvbiB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1YTVhNWE7XFxufVxcblxcbi5jb21wdXRlci1ib2FyZCB7XFxuICB3aWR0aDogMzAwcHg7XFxuXFxuICAvKiBkaXNwbGF5OiBncmlkOyAqL1xcbiAgLyogaGVpZ2h0OiAyMDBweDsgKi9cXG59XFxuXFxuLmNvbXB1dGVyYmxvY2stbnVtYmVyIHtcXG4gIGRpc3BsYXk6IGdyaWQ7XFxuICBncmlkLXRlbXBsYXRlLXJvd3M6IHJlcGVhdCgxMCwgMzBweCk7XFxuICBncmlkLXRlbXBsYXRlLWNvbHVtbnM6IHJlcGVhdCgxMCwgMzBweCk7XFxuICB3aWR0aDogMzBweDtcXG4gIGhlaWdodDogMzBweDtcXG59XFxuXFxuLmNvbXB1dGVyc2VjdGlvbiB7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIGJhY2tncm91bmQtY29sb3I6ICM1YTVhNWE7XFxuICBjdXJzb3I6IGNyb3NzaGFpcjtcXG59XFxuXFxuLmNvbXB1dGVyc2VjdGlvbjpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTM4YWFmO1xcbn1cXG5cXG4vKiByZW5kZXIgYmF0dGxlc2hpcCBib2FyZHMgKi9cXG5cXG4vKiBjc3MgZWZmZWN0cyAqL1xcblxcbi5zZWN0aW9uLnRha2VuIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMxMzhhYWY7XFxufVxcblxcbi5zZWN0aW9uLmxhbmRlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzlmZjE0O1xcbn1cXG5cXG4uY29tcHV0ZXJzZWN0aW9uLmxhbmRlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzlmZjE0O1xcbn1cXG5cXG4ubGFuZGVkY29tcHV0ZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzM5ZmYxNDtcXG59XFxuXFxuLmxhbmRlZDpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMzlmZjE0O1xcbn1cXG5cXG4ubWlzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYxODE4O1xcbn1cXG5cXG4ubWlzczpob3ZlciB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYxODE4O1xcbn1cXG5cXG4vKiBtb2RhbCAqL1xcblxcbi5tb2RhbCB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB0b3A6IDUwJTtcXG4gIGxlZnQ6IDUwJTtcXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlKC01MCUsIC01MCUpIHNjYWxlKDApO1xcbiAgdHJhbnNpdGlvbjogMjAwbXMgZWFzZS1pbi1vdXQ7XFxuICBib3JkZXI6IDFweCBzb2xpZCBibGFjaztcXG4gIHotaW5kZXg6IDEwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XFxuICB3aWR0aDogNTAwcHg7XFxuICBoZWlnaHQ6IDMwMHB4O1xcbiAgbWF4LXdpZHRoOiA4MCU7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gIHRleHQtYWxpZ246IGNlbnRlcjtcXG59XFxuXFxuLm1vZGFsLmFjdGl2ZSB7XFxuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZSgtNTAlLCAtNTAlKSBzY2FsZSgxKTtcXG4gIGJhY2tncm91bmQtY29sb3I6IGdyYXk7XFxufVxcblxcbi5tb2RhbC1oZWFkZXIge1xcbiAgcGFkZGluZzogMTBweCAxNXB4O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBhbGlnbi1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbi5tb2RhbC1ib2R5IHtcXG4gIHBhZGRpbmc6IDEwcHggMTVweDtcXG59XFxuXFxuI292ZXJsYXkge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgb3BhY2l0eTogMDtcXG4gIHRyYW5zaXRpb246IDIwMG1zIGVhc2UtaW4tb3V0O1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHJpZ2h0OiAwO1xcbiAgYm90dG9tOiAwO1xcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XFxufVxcblxcbiNvdmVybGF5LmFjdGl2ZSB7XFxuICBvcGFjaXR5OiAxO1xcbn1cXG5cXG4jcmVzdGFydCB7XFxuICBjdXJzb3I6IHBvaW50ZXI7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiBncmF5O1xcbiAgZm9udC1mYW1pbHk6IFxcXCJtb250c2VycmF0XFxcIiwgc2Fucy1zZXJpZjtcXG4gIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XFxuICBib3JkZXI6IDJweCBzb2xpZCBibGFjaztcXG4gIGJvcmRlci1yYWRpdXM6IDJweDtcXG4gIHBhZGRpbmc6IDEycHggMjBweDtcXG4gIHRyYW5zaXRpb246IGNvbG9yIDAuNHMgbGluZWFyO1xcbn1cXG5cXG4jcmVzdGFydDpob3ZlciB7XFxuICBjb2xvcjogI2ZmZjtcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcbn1cXG5cXG4vKiBtb2RhbCAqL1xcblxcbi8qIG1lZGlhICAqL1xcblxcbkBtZWRpYSBhbGwgYW5kIChtYXgtd2lkdGg6IDgyMHB4KSB7XFxuICAuZ2FtZWJvYXJkLWNvbnRhaW5lciB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICB9XFxuXFxuICAucGxheWVyZ2FtZS1ib2FyZCB7XFxuICAgIHBhZGRpbmc6IDJyZW07XFxuICB9XFxuXFxuICAuY29tcHV0ZXItYm9hcmQge1xcbiAgICBwYWRkaW5nOiAycmVtO1xcbiAgfVxcbn1cXG5cIl0sXCJzb3VyY2VSb290XCI6XCJcIn1dKTtcbi8vIEV4cG9ydHNcbmV4cG9ydCBkZWZhdWx0IF9fX0NTU19MT0FERVJfRVhQT1JUX19fO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qXG4gIE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG4gIEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKSB7XG4gIHZhciBsaXN0ID0gW107XG5cbiAgLy8gcmV0dXJuIHRoZSBsaXN0IG9mIG1vZHVsZXMgYXMgY3NzIHN0cmluZ1xuICBsaXN0LnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMubWFwKGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICB2YXIgY29udGVudCA9IFwiXCI7XG4gICAgICB2YXIgbmVlZExheWVyID0gdHlwZW9mIGl0ZW1bNV0gIT09IFwidW5kZWZpbmVkXCI7XG4gICAgICBpZiAoaXRlbVs0XSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIik7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwiQG1lZGlhIFwiLmNvbmNhdChpdGVtWzJdLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwiQGxheWVyXCIuY29uY2F0KGl0ZW1bNV0ubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChpdGVtWzVdKSA6IFwiXCIsIFwiIHtcIik7XG4gICAgICB9XG4gICAgICBjb250ZW50ICs9IGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSk7XG4gICAgICBpZiAobmVlZExheWVyKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICBpZiAoaXRlbVsyXSkge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250ZW50O1xuICAgIH0pLmpvaW4oXCJcIik7XG4gIH07XG5cbiAgLy8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3RcbiAgbGlzdC5pID0gZnVuY3Rpb24gaShtb2R1bGVzLCBtZWRpYSwgZGVkdXBlLCBzdXBwb3J0cywgbGF5ZXIpIHtcbiAgICBpZiAodHlwZW9mIG1vZHVsZXMgPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIHVuZGVmaW5lZF1dO1xuICAgIH1cbiAgICB2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuICAgIGlmIChkZWR1cGUpIHtcbiAgICAgIGZvciAodmFyIGsgPSAwOyBrIDwgdGhpcy5sZW5ndGg7IGsrKykge1xuICAgICAgICB2YXIgaWQgPSB0aGlzW2tdWzBdO1xuICAgICAgICBpZiAoaWQgIT0gbnVsbCkge1xuICAgICAgICAgIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKHZhciBfayA9IDA7IF9rIDwgbW9kdWxlcy5sZW5ndGg7IF9rKyspIHtcbiAgICAgIHZhciBpdGVtID0gW10uY29uY2F0KG1vZHVsZXNbX2tdKTtcbiAgICAgIGlmIChkZWR1cGUgJiYgYWxyZWFkeUltcG9ydGVkTW9kdWxlc1tpdGVtWzBdXSkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0eXBlb2YgbGF5ZXIgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICAgICAgaWYgKHR5cGVvZiBpdGVtWzVdID09PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs1XSA9IGxheWVyO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAobWVkaWEpIHtcbiAgICAgICAgaWYgKCFpdGVtWzJdKSB7XG4gICAgICAgICAgaXRlbVsyXSA9IG1lZGlhO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKHN1cHBvcnRzKSB7XG4gICAgICAgIGlmICghaXRlbVs0XSkge1xuICAgICAgICAgIGl0ZW1bNF0gPSBcIlwiLmNvbmNhdChzdXBwb3J0cyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaXRlbVsxXSA9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQoaXRlbVs0XSwgXCIpIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzRdID0gc3VwcG9ydHM7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGxpc3QucHVzaChpdGVtKTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBsaXN0O1xufTsiLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoaXRlbSkge1xuICB2YXIgY29udGVudCA9IGl0ZW1bMV07XG4gIHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcbiAgaWYgKCFjc3NNYXBwaW5nKSB7XG4gICAgcmV0dXJuIGNvbnRlbnQ7XG4gIH1cbiAgaWYgKHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCIpIHtcbiAgICB2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoY3NzTWFwcGluZykpKSk7XG4gICAgdmFyIGRhdGEgPSBcInNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LFwiLmNvbmNhdChiYXNlNjQpO1xuICAgIHZhciBzb3VyY2VNYXBwaW5nID0gXCIvKiMgXCIuY29uY2F0KGRhdGEsIFwiICovXCIpO1xuICAgIHJldHVybiBbY29udGVudF0uY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbihcIlxcblwiKTtcbiAgfVxuICByZXR1cm4gW2NvbnRlbnRdLmpvaW4oXCJcXG5cIik7XG59OyIsIlxuICAgICAgaW1wb3J0IEFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qc1wiO1xuICAgICAgaW1wb3J0IGRvbUFQSSBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzXCI7XG4gICAgICBpbXBvcnQgaW5zZXJ0Rm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRCeVNlbGVjdG9yLmpzXCI7XG4gICAgICBpbXBvcnQgc2V0QXR0cmlidXRlcyBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3NldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlcy5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydFN0eWxlRWxlbWVudCBmcm9tIFwiIS4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luc2VydFN0eWxlRWxlbWVudC5qc1wiO1xuICAgICAgaW1wb3J0IHN0eWxlVGFnVHJhbnNmb3JtRm4gZnJvbSBcIiEuLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qc1wiO1xuICAgICAgaW1wb3J0IGNvbnRlbnQsICogYXMgbmFtZWRFeHBvcnQgZnJvbSBcIiEhLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgIFxuICAgICAgXG5cbnZhciBvcHRpb25zID0ge307XG5cbm9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0gPSBzdHlsZVRhZ1RyYW5zZm9ybUZuO1xub3B0aW9ucy5zZXRBdHRyaWJ1dGVzID0gc2V0QXR0cmlidXRlcztcblxuICAgICAgb3B0aW9ucy5pbnNlcnQgPSBpbnNlcnRGbi5iaW5kKG51bGwsIFwiaGVhZFwiKTtcbiAgICBcbm9wdGlvbnMuZG9tQVBJID0gZG9tQVBJO1xub3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7XG5cbnZhciB1cGRhdGUgPSBBUEkoY29udGVudCwgb3B0aW9ucyk7XG5cblxuXG5leHBvcnQgKiBmcm9tIFwiISEuLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9kaXN0L2Nqcy5qcyEuL3N0eWxlLmNzc1wiO1xuICAgICAgIGV4cG9ydCBkZWZhdWx0IGNvbnRlbnQgJiYgY29udGVudC5sb2NhbHMgPyBjb250ZW50LmxvY2FscyA6IHVuZGVmaW5lZDtcbiIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgc3R5bGVzSW5ET00gPSBbXTtcblxuZnVuY3Rpb24gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcikge1xuICB2YXIgcmVzdWx0ID0gLTE7XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXNJbkRPTS5sZW5ndGg7IGkrKykge1xuICAgIGlmIChzdHlsZXNJbkRPTVtpXS5pZGVudGlmaWVyID09PSBpZGVudGlmaWVyKSB7XG4gICAgICByZXN1bHQgPSBpO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZnVuY3Rpb24gbW9kdWxlc1RvRG9tKGxpc3QsIG9wdGlvbnMpIHtcbiAgdmFyIGlkQ291bnRNYXAgPSB7fTtcbiAgdmFyIGlkZW50aWZpZXJzID0gW107XG5cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIGl0ZW0gPSBsaXN0W2ldO1xuICAgIHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuICAgIHZhciBjb3VudCA9IGlkQ291bnRNYXBbaWRdIHx8IDA7XG4gICAgdmFyIGlkZW50aWZpZXIgPSBcIlwiLmNvbmNhdChpZCwgXCIgXCIpLmNvbmNhdChjb3VudCk7XG4gICAgaWRDb3VudE1hcFtpZF0gPSBjb3VudCArIDE7XG4gICAgdmFyIGluZGV4QnlJZGVudGlmaWVyID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgdmFyIG9iaiA9IHtcbiAgICAgIGNzczogaXRlbVsxXSxcbiAgICAgIG1lZGlhOiBpdGVtWzJdLFxuICAgICAgc291cmNlTWFwOiBpdGVtWzNdLFxuICAgICAgc3VwcG9ydHM6IGl0ZW1bNF0sXG4gICAgICBsYXllcjogaXRlbVs1XVxuICAgIH07XG5cbiAgICBpZiAoaW5kZXhCeUlkZW50aWZpZXIgIT09IC0xKSB7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleEJ5SWRlbnRpZmllcl0ucmVmZXJlbmNlcysrO1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnVwZGF0ZXIob2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmFyIHVwZGF0ZXIgPSBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMuYnlJbmRleCA9IGk7XG4gICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoaSwgMCwge1xuICAgICAgICBpZGVudGlmaWVyOiBpZGVudGlmaWVyLFxuICAgICAgICB1cGRhdGVyOiB1cGRhdGVyLFxuICAgICAgICByZWZlcmVuY2VzOiAxXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICB9XG5cbiAgcmV0dXJuIGlkZW50aWZpZXJzO1xufVxuXG5mdW5jdGlvbiBhZGRFbGVtZW50U3R5bGUob2JqLCBvcHRpb25zKSB7XG4gIHZhciBhcGkgPSBvcHRpb25zLmRvbUFQSShvcHRpb25zKTtcbiAgYXBpLnVwZGF0ZShvYmopO1xuXG4gIHZhciB1cGRhdGVyID0gZnVuY3Rpb24gdXBkYXRlcihuZXdPYmopIHtcbiAgICBpZiAobmV3T2JqKSB7XG4gICAgICBpZiAobmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJiBuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJiBuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwICYmIG5ld09iai5zdXBwb3J0cyA9PT0gb2JqLnN1cHBvcnRzICYmIG5ld09iai5sYXllciA9PT0gb2JqLmxheWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYXBpLnVwZGF0ZShvYmogPSBuZXdPYmopO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcGkucmVtb3ZlKCk7XG4gICAgfVxuICB9O1xuXG4gIHJldHVybiB1cGRhdGVyO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChsaXN0LCBvcHRpb25zKSB7XG4gIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICBsaXN0ID0gbGlzdCB8fCBbXTtcbiAgdmFyIGxhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKTtcbiAgcmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZShuZXdMaXN0KSB7XG4gICAgbmV3TGlzdCA9IG5ld0xpc3QgfHwgW107XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxhc3RJZGVudGlmaWVycy5sZW5ndGg7IGkrKykge1xuICAgICAgdmFyIGlkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbaV07XG4gICAgICB2YXIgaW5kZXggPSBnZXRJbmRleEJ5SWRlbnRpZmllcihpZGVudGlmaWVyKTtcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4XS5yZWZlcmVuY2VzLS07XG4gICAgfVxuXG4gICAgdmFyIG5ld0xhc3RJZGVudGlmaWVycyA9IG1vZHVsZXNUb0RvbShuZXdMaXN0LCBvcHRpb25zKTtcblxuICAgIGZvciAodmFyIF9pID0gMDsgX2kgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBfaSsrKSB7XG4gICAgICB2YXIgX2lkZW50aWZpZXIgPSBsYXN0SWRlbnRpZmllcnNbX2ldO1xuXG4gICAgICB2YXIgX2luZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoX2lkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoc3R5bGVzSW5ET01bX2luZGV4XS5yZWZlcmVuY2VzID09PSAwKSB7XG4gICAgICAgIHN0eWxlc0luRE9NW19pbmRleF0udXBkYXRlcigpO1xuXG4gICAgICAgIHN0eWxlc0luRE9NLnNwbGljZShfaW5kZXgsIDEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGxhc3RJZGVudGlmaWVycyA9IG5ld0xhc3RJZGVudGlmaWVycztcbiAgfTtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBtZW1vID0ge307XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuZnVuY3Rpb24gZ2V0VGFyZ2V0KHRhcmdldCkge1xuICBpZiAodHlwZW9mIG1lbW9bdGFyZ2V0XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHZhciBzdHlsZVRhcmdldCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTsgLy8gU3BlY2lhbCBjYXNlIHRvIHJldHVybiBoZWFkIG9mIGlmcmFtZSBpbnN0ZWFkIG9mIGlmcmFtZSBpdHNlbGZcblxuICAgIGlmICh3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQgJiYgc3R5bGVUYXJnZXQgaW5zdGFuY2VvZiB3aW5kb3cuSFRNTElGcmFtZUVsZW1lbnQpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG4gICAgICAgIC8vIGR1ZSB0byBjcm9zcy1vcmlnaW4gcmVzdHJpY3Rpb25zXG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIGlzdGFuYnVsIGlnbm9yZSBuZXh0XG4gICAgICAgIHN0eWxlVGFyZ2V0ID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZW1vW3RhcmdldF0gPSBzdHlsZVRhcmdldDtcbiAgfVxuXG4gIHJldHVybiBtZW1vW3RhcmdldF07XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBpbnNlcnRCeVNlbGVjdG9yKGluc2VydCwgc3R5bGUpIHtcbiAgdmFyIHRhcmdldCA9IGdldFRhcmdldChpbnNlcnQpO1xuXG4gIGlmICghdGFyZ2V0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQ291bGRuJ3QgZmluZCBhIHN0eWxlIHRhcmdldC4gVGhpcyBwcm9iYWJseSBtZWFucyB0aGF0IHRoZSB2YWx1ZSBmb3IgdGhlICdpbnNlcnQnIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcbiAgfVxuXG4gIHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gaW5zZXJ0QnlTZWxlY3RvcjsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucykge1xuICB2YXIgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcbiAgb3B0aW9ucy5zZXRBdHRyaWJ1dGVzKGVsZW1lbnQsIG9wdGlvbnMuYXR0cmlidXRlcyk7XG4gIG9wdGlvbnMuaW5zZXJ0KGVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG4gIHJldHVybiBlbGVtZW50O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydFN0eWxlRWxlbWVudDsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMoc3R5bGVFbGVtZW50KSB7XG4gIHZhciBub25jZSA9IHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyAhPT0gXCJ1bmRlZmluZWRcIiA/IF9fd2VicGFja19ub25jZV9fIDogbnVsbDtcblxuICBpZiAobm9uY2UpIHtcbiAgICBzdHlsZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwibm9uY2VcIiwgbm9uY2UpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzOyIsIlwidXNlIHN0cmljdFwiO1xuXG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cbmZ1bmN0aW9uIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKSB7XG4gIHZhciBjc3MgPSBcIlwiO1xuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJAc3VwcG9ydHMgKFwiLmNvbmNhdChvYmouc3VwcG9ydHMsIFwiKSB7XCIpO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIkBtZWRpYSBcIi5jb25jYXQob2JqLm1lZGlhLCBcIiB7XCIpO1xuICB9XG5cbiAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBvYmoubGF5ZXIgIT09IFwidW5kZWZpbmVkXCI7XG5cbiAgaWYgKG5lZWRMYXllcikge1xuICAgIGNzcyArPSBcIkBsYXllclwiLmNvbmNhdChvYmoubGF5ZXIubGVuZ3RoID4gMCA/IFwiIFwiLmNvbmNhdChvYmoubGF5ZXIpIDogXCJcIiwgXCIge1wiKTtcbiAgfVxuXG4gIGNzcyArPSBvYmouY3NzO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICBpZiAob2JqLm1lZGlhKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5zdXBwb3J0cykge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIHZhciBzb3VyY2VNYXAgPSBvYmouc291cmNlTWFwO1xuXG4gIGlmIChzb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgIT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICBjc3MgKz0gXCJcXG4vKiMgc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247YmFzZTY0LFwiLmNvbmNhdChidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpLCBcIiAqL1wiKTtcbiAgfSAvLyBGb3Igb2xkIElFXG5cbiAgLyogaXN0YW5idWwgaWdub3JlIGlmICAqL1xuXG5cbiAgb3B0aW9ucy5zdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCwgb3B0aW9ucy5vcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCkge1xuICAvLyBpc3RhbmJ1bCBpZ25vcmUgaWZcbiAgaWYgKHN0eWxlRWxlbWVudC5wYXJlbnROb2RlID09PSBudWxsKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3R5bGVFbGVtZW50LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGVFbGVtZW50KTtcbn1cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuXG5cbmZ1bmN0aW9uIGRvbUFQSShvcHRpb25zKSB7XG4gIHZhciBzdHlsZUVsZW1lbnQgPSBvcHRpb25zLmluc2VydFN0eWxlRWxlbWVudChvcHRpb25zKTtcbiAgcmV0dXJuIHtcbiAgICB1cGRhdGU6IGZ1bmN0aW9uIHVwZGF0ZShvYmopIHtcbiAgICAgIGFwcGx5KHN0eWxlRWxlbWVudCwgb3B0aW9ucywgb2JqKTtcbiAgICB9LFxuICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge1xuICAgICAgcmVtb3ZlU3R5bGVFbGVtZW50KHN0eWxlRWxlbWVudCk7XG4gICAgfVxuICB9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGRvbUFQSTsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBzdHlsZVRhZ1RyYW5zZm9ybShjc3MsIHN0eWxlRWxlbWVudCkge1xuICBpZiAoc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQpIHtcbiAgICBzdHlsZUVsZW1lbnQuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuICB9IGVsc2Uge1xuICAgIHdoaWxlIChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCkge1xuICAgICAgc3R5bGVFbGVtZW50LnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudC5maXJzdENoaWxkKTtcbiAgICB9XG5cbiAgICBzdHlsZUVsZW1lbnQuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG4gIH1cbn1cblxubW9kdWxlLmV4cG9ydHMgPSBzdHlsZVRhZ1RyYW5zZm9ybTsiLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdGlkOiBtb2R1bGVJZCxcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLmcgPSAoZnVuY3Rpb24oKSB7XG5cdGlmICh0eXBlb2YgZ2xvYmFsVGhpcyA9PT0gJ29iamVjdCcpIHJldHVybiBnbG9iYWxUaGlzO1xuXHR0cnkge1xuXHRcdHJldHVybiB0aGlzIHx8IG5ldyBGdW5jdGlvbigncmV0dXJuIHRoaXMnKSgpO1xuXHR9IGNhdGNoIChlKSB7XG5cdFx0aWYgKHR5cGVvZiB3aW5kb3cgPT09ICdvYmplY3QnKSByZXR1cm4gd2luZG93O1xuXHR9XG59KSgpOyIsIl9fd2VicGFja19yZXF1aXJlX18ubyA9IChvYmosIHByb3ApID0+IChPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqLCBwcm9wKSkiLCIvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSAoZXhwb3J0cykgPT4ge1xuXHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcblx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcblx0fVxuXHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xufTsiLCJ2YXIgc2NyaXB0VXJsO1xuaWYgKF9fd2VicGFja19yZXF1aXJlX18uZy5pbXBvcnRTY3JpcHRzKSBzY3JpcHRVcmwgPSBfX3dlYnBhY2tfcmVxdWlyZV9fLmcubG9jYXRpb24gKyBcIlwiO1xudmFyIGRvY3VtZW50ID0gX193ZWJwYWNrX3JlcXVpcmVfXy5nLmRvY3VtZW50O1xuaWYgKCFzY3JpcHRVcmwgJiYgZG9jdW1lbnQpIHtcblx0aWYgKGRvY3VtZW50LmN1cnJlbnRTY3JpcHQpXG5cdFx0c2NyaXB0VXJsID0gZG9jdW1lbnQuY3VycmVudFNjcmlwdC5zcmNcblx0aWYgKCFzY3JpcHRVcmwpIHtcblx0XHR2YXIgc2NyaXB0cyA9IGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwic2NyaXB0XCIpO1xuXHRcdGlmKHNjcmlwdHMubGVuZ3RoKSBzY3JpcHRVcmwgPSBzY3JpcHRzW3NjcmlwdHMubGVuZ3RoIC0gMV0uc3JjXG5cdH1cbn1cbi8vIFdoZW4gc3VwcG9ydGluZyBicm93c2VycyB3aGVyZSBhbiBhdXRvbWF0aWMgcHVibGljUGF0aCBpcyBub3Qgc3VwcG9ydGVkIHlvdSBtdXN0IHNwZWNpZnkgYW4gb3V0cHV0LnB1YmxpY1BhdGggbWFudWFsbHkgdmlhIGNvbmZpZ3VyYXRpb25cbi8vIG9yIHBhc3MgYW4gZW1wdHkgc3RyaW5nIChcIlwiKSBhbmQgc2V0IHRoZSBfX3dlYnBhY2tfcHVibGljX3BhdGhfXyB2YXJpYWJsZSBmcm9tIHlvdXIgY29kZSB0byB1c2UgeW91ciBvd24gbG9naWMuXG5pZiAoIXNjcmlwdFVybCkgdGhyb3cgbmV3IEVycm9yKFwiQXV0b21hdGljIHB1YmxpY1BhdGggaXMgbm90IHN1cHBvcnRlZCBpbiB0aGlzIGJyb3dzZXJcIik7XG5zY3JpcHRVcmwgPSBzY3JpcHRVcmwucmVwbGFjZSgvIy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcPy4qJC8sIFwiXCIpLnJlcGxhY2UoL1xcL1teXFwvXSskLywgXCIvXCIpO1xuX193ZWJwYWNrX3JlcXVpcmVfXy5wID0gc2NyaXB0VXJsOyIsIl9fd2VicGFja19yZXF1aXJlX18ubmMgPSB1bmRlZmluZWQ7IiwiaW1wb3J0IFNoaXAgZnJvbSBcIi4vbW9kdWxlcy9zaGlwXCI7XG5pbXBvcnQgR2FtZWJvYXJkIGZyb20gXCIuL21vZHVsZXMvZ2FtZWJvYXJkXCI7XG5pbXBvcnQgUGxheWVyIGZyb20gXCIuL21vZHVsZXMvcGxheWVyXCI7XG5pbXBvcnQgeyBnYW1lIH0gZnJvbSBcIi4vbW9kdWxlcy9nYW1lbG9vcFwiO1xuaW1wb3J0IHN0eWxlIGZyb20gXCIuL3N0eWxlcy9zdHlsZS5jc3NcIjtcbmltcG9ydCBnaXRodWIgZnJvbSBcIi4vYXNzZXRzL2dpdGh1Yi5zdmdcIjtcblxuY29uc3QgZ2l0Y29uID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJnaXRodWJcIik7XG5naXRjb24uc3JjID0gZ2l0aHViO1xuZ2l0Y29uLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gIGRvY3VtZW50LmxvY2F0aW9uID0gXCJodHRwczovL2dpdGh1Yi5jb20vWnk1ODc5P3RhYj1yZXBvc2l0b3JpZXNcIjtcbn0pO1xuIl0sIm5hbWVzIjpbIlNoaXAiLCJHYW1lYm9hcmQiLCJjcnVpc2VyIiwiYmF0dGxlc2hpcCIsInN1Ym1hcmluZSIsImRlc3Ryb3llciIsInNoaXBzIiwiZ3JpZCIsImNyZWF0ZU1hcCIsInJvd3MiLCJjb2x1bW5zIiwiaSIsImoiLCJwbGFjZVNoaXAiLCJ4IiwieSIsInNoaXAiLCJsZW5ndGgiLCJOdW1iZXIiLCJuYW1lcyIsInJhbmRvbVBsYWNlU2hpcCIsInhSYW5kb21OdW1iZXIiLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJ5UmFuZG9tTnVtYmVyIiwibnVtYmVycyIsInB1c2giLCJpc1ZhbGlkIiwiZXZlcnkiLCJudW0iLCJmb3JFYWNoIiwiZ2V0Qm9hcmQiLCJyZWNpZXZlQXR0YWNrIiwiYXR0YWNrIiwiY2xlYXJCb2FyZCIsImJvYXJkIiwiUGxheWVyIiwiZ2FtZSIsIm9wZW5Nb2RhbCIsIm1vZGFsIiwiY2xhc3NMaXN0IiwiYWRkIiwib3ZlcmxheSIsImNsb3NlTW9kYWwiLCJyZW1vdmUiLCJwbGF5ZXIxIiwicGxheWVyMWJvYXJkIiwicGxheWVyMXNoaXBzIiwiY29tcHV0ZXIiLCJjb21wdXRlcmJvYXJkIiwiY29tcHV0ZXJzaGlwcyIsIm5ld2dhbWUiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwic3RhcnRHYW1lIiwic3R5bGUiLCJkaXNwbGF5IiwicmVuZGVyUGxheWVyQm9hcmQiLCJyZW5kZXJDb21wdXRlckJvYXJkIiwiY29tcHV0ZXJzZWN0aW9uIiwicXVlcnlTZWxlY3RvckFsbCIsInNlY3Rpb24iLCJwbGF5Um91bmQiLCJvbmNlIiwiZ2FtZWJvYXJkIiwiY3JlYXRlRWxlbWVudCIsImdhbWVib2FyZGNvbnRhaW5lciIsInBsYXllcmJvYXJkY29udGFpbmVyIiwidXNlcmhlYWRlciIsInRleHRDb250ZW50IiwicGxheWVyMWdyaWQiLCJjb2wiLCJpbmRleCIsImdhbWVib2FyZGl2Iiwicm93Iiwic3ViZ2FtZWJvYXJkaXYiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsImNvbXB1dGVyaGVhZGVyIiwiY29tcHV0ZXJjb250YWluZXIiLCJjb21wdXRlcmdhbWVib2FyZCIsImNvbXB1dGVyZ3JpZCIsImUiLCJ0YXJnZXRWYWx1ZSIsInRhcmdldCIsImdldEF0dHJpYnV0ZSIsImNvbnRhaW5zIiwiYXR0YWNrQ29tcHV0ZXIiLCJjb21wdXRlclNlbGVjdGlvbiIsImNoZWNrV2lubmVyIiwicmFuZG9tQXR0YWNrIiwiZ2V0RWxlbWVudEJ5SWQiLCJpc1N1bmsiLCJtb2RhbHdpbm5lciIsIm5hbWUiLCJwbGF5QWdhaW4iLCJwbGF5R2FtZUFnYWluIiwiZmlyc3RDaGlsZCIsInJlbW92ZUNoaWxkIiwiaGl0cyIsImJvYXJkZ3JpZCIsImNvbnNvbGUiLCJsb2ciLCJnaXRodWIiLCJnaXRjb24iLCJzcmMiLCJsb2NhdGlvbiJdLCJzb3VyY2VSb290IjoiIn0=