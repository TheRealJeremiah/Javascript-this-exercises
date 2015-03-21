var maze = "****************R*         *   E*R*    *    *  ***R*    *    *    *R*    *    *    *R*    *    *    *R*S   *         *R****************";

function Solver(maze) {
  this.createGraph(maze);
  this.parents = {};
}

Solver.prototype.solve = function() {
  var queue = [this.start];
  var visited = [];
  while (queue.length > 0) {
    var currentNode = queue.shift();
    visited.push(currentNode);
    var currentNeighbors = this.neighbors(currentNode);
    for (var i = 0; i < currentNeighbors.length; i++) {
      var hasBeenVisited = false;
      for (var j = 0; j < visited.length; j++) {
        if (currentNeighbors[i][0] === visited[j][0] && currentNeighbors[i][1] === visited[j][1]) {
          hasBeenVisited = true;
        }
      }
      if (!hasBeenVisited) {
        this.parents[currentNeighbors[i]] = currentNode;
        queue.push(currentNeighbors[i]);
        visited.push(currentNeighbors[i]);
      }
    }
  }
};

Solver.prototype.path = function() {
  var path = [];

  var node = this.end;

  while (this.graph[node[0]][node[1]] !== "S") {
    path.push(node);
    node = this.parents[node];
  }
  return path;
}

Solver.prototype.drawPath = function() {
  var path = this.path();
  for(var i = 0; i < path.length; i++) {
    this.graph[path[i][0]][path[i][1]] = "#";
  }
}

Solver.prototype.createGraph = function(maze) {
  this.graph = maze.split("R");

  for(var i = 0; i < this.graph.length; i++) {
    this.graph[i] = this.graph[i].split("");
    for(var j = 0; j < this.graph[i].length; j++) {
      if (this.graph[i][j] === "S") {
        this.start = [i,j];
      } else if (this.graph[i][j] === "E") {
        this.end = [i,j];
      }
    }
  }
};

Solver.prototype.print = function () {
  for(var i = 0; i < this.graph.length; i++) {
    console.log(this.graph[i].join(""));
  }
};

Solver.prototype.neighbors = function(pos) {
  var neighbors = [];
  var offsets = [[0,1], [0,-1], [1,0], [-1,0]];
  for(var i = 0; i < offsets.length; i++) {
    var nPos = this.add(pos, offsets[i]);
    if((this.graph[nPos[0]][nPos[1]] === " ") || (this.graph[nPos[0]][nPos[1]] === "E")) {
      neighbors.push(nPos);
    }
  }
  return neighbors;
};

Solver.prototype.add = function(vec1, vec2) {
  return [vec1[0] + vec2[0], vec1[1] + vec2[1]];
};

var s = new Solver(maze);
s.print();
s.solve();
s.drawPath();
s.print();
