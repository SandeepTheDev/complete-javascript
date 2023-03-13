Array.prototype.myMap = function (cb) {
  var arr = [];
  for (let i = 0; i < this.length; i++) {
    arr.push(cb(this[i], i, this));
  }
  return arr;
};

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var numbersMultiplyBy2 = numbers.myMap((number) => number * 2);
console.log(numbersMultiplyBy2);
