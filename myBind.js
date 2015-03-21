Function.prototype.myBind = function(context) {
  var fn = this;

  var anonymous = function() {
    var args = Array.prototype.slice.call(arguments, 0);
    return fn.apply(context, args);
  };
  return anonymous;
};

var obj = function () {};

var fn = function(x) {return 2*x;};

console.log(fn.myBind(obj)(2));
