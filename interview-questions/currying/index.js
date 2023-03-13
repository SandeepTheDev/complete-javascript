function sum(a, b, c) {
  return a + b + c;
}

function subtract(a, b, c) {
  return a - b - c;
}

function curry(func) {
  return function (a) {
    return function (b) {
      return function (c) {
        return func(a, b, c);
      };
    };
  };
}

var curriedSum = curry(sum);
var curriedSubtract = curry(subtract);

var sumResult = curriedSum(10)(5)(2);
var subtractResult = curriedSubtract(10)(5)(2);
console.log(sumResult, subtractResult);
