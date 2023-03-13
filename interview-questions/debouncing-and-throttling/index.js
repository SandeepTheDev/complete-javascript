var count = 1;

function getData() {
  console.log("Fetching data...", count++);
}

var debouncedGetData = debounce(getData, 300);

function debounce(func, delay) {
  var timer;
  // this function is closed over `timer` if the delay is over setTimeout will call the func otherwise clear the timer.
  return function () {
    let args = arguments;
    let context = this;
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(context, args);
    }, delay);
  };
}

var throttledGetData = throttle(getData, 500);

function throttle(func, limit) {
  var flag = true;
  return function () {
    let args = arguments;
    let context = this;

    if (flag) {
      func.apply(context, args);
      flag = false;
      setTimeout(() => {
        flag = true;
      }, limit);
    }
  };
}
