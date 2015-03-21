var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function HanoiGame() {
  this.stacks = [[1,2,3],[],[]];
}

HanoiGame.prototype.isWon = function() {
  if (this.stacks[1].length === 3 || this.stacks[2].length === 3) {
    return true;
  }
  return false;
};

HanoiGame.prototype.isValidMove = function(start, end) {
  if (this.stacks[start].length > 0) {
    if (this.stacks[end].length === 0) {
      return true;
    }
    if (this.stacks[start][0] < this.stacks[end][0]) {
      return true;
    }
  }
  return false;
};

HanoiGame.prototype.move = function(start, end) {
  if (!(this.isValidMove(start, end))) {
    return false;
  }
  this.stacks[end].unshift(this.stacks[start].shift());
  return true;
};

HanoiGame.prototype.print = function() {
  console.log(this.stacks);
};

HanoiGame.prototype.promptMove = function(callback) {
  this.print();

  reader.question("Move from which index to which index?", function(answer) {
    var posChars = answer.split(" ");
    var start = parseInt(posChars[0]);
    var end = parseInt(posChars[1]);
    // console.log("this in promptMove is " + this)
    callback(start, end);
    // reader.close();
  });
};

HanoiGame.prototype.run = function(completionCallback) {
  this.promptMove(this.handleMove.bind(this, completionCallback));
};

HanoiGame.prototype.handleMove = function(completionCallback, start, end) {
  this.move(start, end);

  if (this.isWon()) {
    completionCallback();
  } else {
    this.run(completionCallback);
  }
};

var hanoi = new HanoiGame();
hanoi.run(function () {
  console.log("You won!");
  reader.close();
});

// hanoi.promptMove(hanoi.move.bind(hanoi))
