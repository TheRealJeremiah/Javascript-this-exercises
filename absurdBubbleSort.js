var readline = require("readline");

var reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function askIfGreaterThan (el1, el2, callback) {
  reader.question(el1 + " > " + el2 + " ? ", function (answer) {
    var answerTF = false;
    if (answer === 'y') {
      answerTF = true;
    }
    console.log(answerTF);
    callback(answerTF);
  });
}

function innerBubbleSortLoop (arr, i, madeAnySwaps, outerBubbleSortLoop) {
  if (i === arr.length - 1) {
    outerBubbleSortLoop(madeAnySwaps);
  } else {
    console.log(arr);
    askIfGreaterThan(arr[i], arr[i + 1], function(answer) {
      if (answer) {
        var temp = arr[i];
        arr[i] = arr[i+1];
        arr[i+1] = temp;
      }
      innerBubbleSortLoop(arr, i + 1, answer, outerBubbleSortLoop);
    });
  }
}

function absurdBubbleSort (arr, sortCompletionCallback) {
  function outerBubbleSortLoop (madeAnySwaps) {
    if (madeAnySwaps) {
      innerBubbleSortLoop(arr, 0, true, outerBubbleSortLoop);
    } else {
      sortCompletionCallback(arr);
    }
  }
  outerBubbleSortLoop(true);
}

absurdBubbleSort([3, 2, 1], function (arr) {
  console.log("Sorted array: " + JSON.stringify(arr));
  reader.close();
});
