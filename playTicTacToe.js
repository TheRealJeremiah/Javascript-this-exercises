var ttt = require("./ttt");

var readline = require('readline');
var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

var g = new ttt.Game(reader);
g.run(function(winner) {
  console.log(winner + " wins!");
  g.reader.close();
});
