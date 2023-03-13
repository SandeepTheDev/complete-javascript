Array.prototype.myFilter = function (cb) {
  var arr = [];
  for (let i = 0; i < this.length; i++) {
    if (cb(this[i], i, this)) {
      arr.push(this[i]);
    }
  }

  return arr;
};

var numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var evenNumbers = numbers.myFilter((number) => number % 2 == 0);
console.log(evenNumbers);
