# Debouncing & Throttling

Debouncing & Throttling both are the performance optimization technique. **Debounce is used to delay the execution of the function until a specified time**. and **Throttling is used to limit number of times a function gets called in a certain period of time**.

```js
function fetchData() {
  // fetching data from server..
}

var debouncedFetchData = debounce(fetchData, 300);

function debounce(func, delay) {
  var timer;
  return function () {
    let args = arguments;
    let context = this;
    clearSetTimeout(timer);
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
```

## Debouncing vs Throttling

There is no clear cut answer which one is better debouncing or throttling it depends.

1. A shooting game is a good example of throttling.
2. Search bar is a good example of debouncing.
