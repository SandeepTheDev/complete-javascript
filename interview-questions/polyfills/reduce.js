Array.prototype.myReduce = function (cb, initialValue) {
  var accumulator = initialValue;
  for (let i = 0; i < this.length; i++) {
    accumulator = cb(accumulator, this[i]);
  }

  return accumulator;
};

var items = [
  { name: "Face wash", price: 350 },
  { name: "Shampoo", price: 350 },
  { name: "Body wash", price: 200 },
  { name: "Sun cream", price: 350 },
];

var totalPrice = items.myReduce((acc, item) => {
  return acc + item.price;
}, 0);

console.log(totalPrice);
