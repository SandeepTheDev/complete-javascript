// The function* declaration (function keyword followed by an asterisk) defines a generator function, which is a easy way to create iterables.
function* main() {
  console.log("Generator function start.");
  // 'yield' operator pause and resume generator function
  yield "yield - pause & resume";
  console.log("Generator function end.");
}

// iterator is an object it has "next" method that returns an object with "value" and "done" properties.
const iterator = main();
iterator.next(); // {value: "yield - pause & resume", done: false}
iterator.next(); // {value: undefined, done: true}

// For of loop is specifically designed for iterators introduced in ES6.
const iterator2 = main();
for (let key of iterator2) {
  console.log(key);
}

var run = function* () {
  var x = 1 + (yield);
  var y = 1 + (yield);
  yield x + y;
};

const it = run();
it.next();
it.next(20);
console.log(it.next(30)); // { value: 52, done: false }
