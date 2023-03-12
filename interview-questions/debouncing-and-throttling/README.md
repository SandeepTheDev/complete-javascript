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
```
