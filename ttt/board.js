function Board() {
  this.grid = new Array(3);
  for(var i=0; i<this.grid.length; i++) {
    this.grid[i] = new Array(3);
  }
}

Board.prototype.print = function () {
  console.log(this.grid);
};

Board.prototype.placeMark = function (pos, mark) {
  var row = pos[0];
  var col = pos[1];
  if (!(this.grid[row][col])) {
    this.grid[row][col] = mark;
    return true;
  } else {
    return false;
  }
};

Board.prototype.isWon = function () {
  var positions = [[[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]],
  [[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]],
  [[0, 0], [1, 1], [2, 2]], [[2, 0], [1, 1], [0, 2]]];

  for(var i = 0; i < positions.length; i++) {
    var line = positions[i];
    var first = this.atPos(line[0]);
    var second = this.atPos(line[1]);
    var third = this.atPos(line[2]);
    if (first === second && second === third && first !== undefined) {
      return true;
    }
  }
  return false;
};

Board.prototype.atPos = function (pos) {
  return this.grid[pos[0]][pos[1]];
};

module.exports = Board;

// var b = new Board();
// b.print();
// console.log(b.grid[0][0]);
