var Board = require('./board');

// var readline = require('readline');
// var reader = readline.createInterface({
//   input: process.stdin,
//   output: process.stdout
// });

function Game(reader) {
  this.reader = reader;
  this.board = new Board();
  this.turn = "x";
}

Game.prototype.promptMove = function(callback) {
  this.board.print();

  this.reader.question("What is move?%&^$ ", function (answer) {
    var posChars = answer.split(" ");
    var row = parseInt(posChars[0]);
    var col = parseInt(posChars[1]);

    callback(row, col);
  });
};

Game.prototype.handleMove = function(completionCallback, row, col) {
  var switchPlayer = this.board.placeMark([row, col], this.turn);

  if (this.board.isWon()) {
    completionCallback(this.turn);
  } else {
    if (switchPlayer) {
      this.flipTurn();
    }
    this.run(completionCallback);
  }
};

Game.prototype.flipTurn = function() {
  if (this.turn === "x") {
    this.turn = "o";
  } else {
    this.turn = "x";
  }
};

Game.prototype.run = function(completionCallback) {
  this.promptMove(this.handleMove.bind(this, completionCallback));
};

// var g = new Game(reader);
// g.run(function(winner) {
//   console.log(winner + " wins!");
//   g.reader.close();
// });

module.exports = Game;
