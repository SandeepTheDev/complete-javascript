# Currying

Currying is a technique of transforming function with multiple arguments into a nested functions, each taking one argument.

```js
function sum(a, b, c) {
  return a + b + c;
}

var result = sum(10, 5, 2);
console.log(result); // 17
```

```js
function curriedSum(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}

var result = curriedSum(10)(5)(2);
console.log(result); // 17
```

## Generic curried function for 3 arguments

Currying functions can be generic which takes a function and return a curried version of it.

```js
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

console.log(sumResult);
console.log(subtractResult);
```
