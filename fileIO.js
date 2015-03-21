Function.prototype.myBind = function(context) {
  var fn = this;

  var anonymous = function() {
    fn.apply(context);
  };
  return anonymous;
}

function Clock () {
}

Clock.TICK = 5000;

Clock.prototype.printTime = function () {
  console.log(this.currentTime.getHours() + ":" + this.currentTime.getMinutes() + ":" + this.currentTime.getSeconds());
};

Clock.prototype.run = function () {
  this.currentTime = new Date();
  this.printTime();
  setInterval(this._tick.myBind(this), Clock.TICK);
};

Clock.prototype._tick = function () {
  var currentMs = this.currentTime.getTime()  + Clock.TICK;
  this.currentTime.setTime(currentMs);
  this.printTime();
};

var clock = new Clock();
clock.run();

var readline = require('readline');

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function addNumbers(sum, numsLeft, completionCallback) {
  if (numsLeft > 0) {
    reader.question("Enter number: ", function(numString) {
      console.log("Current sum: ");
      console.log(sum + parseInt(numString));
      addNumbers(sum + parseInt(numString), numsLeft - 1, completionCallback);
    });
  } else {
    completionCallback(sum);
    reader.close();
  }
}

// addNumbers(0, 3, function (sum) {
//   console.log("Total Sum: " + sum);
// });
