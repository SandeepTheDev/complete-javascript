var count = 1;

function getData() {
  console.log("Fetching data...", count++);
}

var debouncedGetData = debounce(getData, 300);

// debounce will return a function and it will call the callback the once delay is done between two key presses.
function debounce(callback, delay) {
  var timer;
  // this function is closed over `timer` if the delay is over setTimeout will call the callback otherwise clear the timer.
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      callback.apply(this, arguments);
    }, delay);
  };
}
