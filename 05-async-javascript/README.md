# Async Patterns

There are bunch of async patterns to deal with asynchronous code let's walk through some of the important patterns that deals with asynchronous code.

## JavaScript's code runs on single thread

JavaScript's code runs on a single thread that means it only execute one line at a time. In theory you could spin multiple instances of the JavaScript engine on entirely separate thread that would look like multi threaded but they cannot communicate each other that's where web workers comes into picture web workers is a browser feature that makes it possible to run a script in background thread separate from main thread and then these workers can communicate with main thread using events.

## What is concurrency? (Parallelism vs Concurrency)

Parallelism is when two task are executing at the same time in two different threads, In concurrency there is only one thread that executes the task and it switch the multiple task which makes it concurrent.

![Parallelism vs Concurrency](https://github.com/SandeepTheDev/javascript/blob/main/assets/parallelism-concurrency.svg)

### Event loop handles the concurrency

![Concurrency event loop](https://github.com/SandeepTheDev/javascript/blob/main/assets/concurrency-event-loop.svg)

## 1. Callbacks

Callbacks are the simplest way to deal with asynchronous. Callback is just a function that is passed as an argument to the function and it will be called later at some point.

```js
setTimeout(function () {
  console.log("callback!");
}, 1000);
```

## Callback problem

Callback hell is not just about indentation its more than that.

### 1. Inversion of control

There is part of program that you are in control and there is another part of code that you are not in control of executing.

```js
// line 1 - in control
setTimeout(function () {
  // line 2 - not in control
}, 1000);
// line 3 - in control
```

**setTimeout** is a fine its a built in utility function but check this out example:

```js
trackCheckout(purchaseInfo, function finish() {
  chargeCreditCard(purchaseInfo);
  showThankYouPage();
});
```

Because of inversion of control you have no control on executing the callback `finish` what if its call **too early**, **too many times** or **not call at all** its very inevitable that callbacks have trust issues.

### 2. Not Sync-looking Async

Callback patterns are not synchronous looking async pattern actually which is not making any sense but there is a way you can write a Async code in synchronous sequential blocking way.

### 3. Nested callback - callback hell

Nested callback is very hard to understand because of its indentation and its hard to read.

## 3. Promises

Callback pattern has one major issue **Inversion of control**, Promises is a great pattern to handle asynchronous code, and it solves a problem of **Inversion of control** or **Trust issues** by taking control back, Promises can:

- Only resolved once
- Either success or Error
- Messages passes/kept
- Exceptions become errors
- Immutable once resolved

```js
function trackCheckout(info) {
    return new Promise(resolve, reject) {
        // attempt to track the checkout

        // if successful, call resolve()
        // otherwise, call reject(error)
    }
}

function finish() {
    chargeCreditCard(purchaseInfo);
    showThankYouPage();
}

function error(err) {
    logStatsError(err);
    finish();
}

var promise = trackCheckout(purchaseInfo);
promise.then(finish, error);
```

### Promise chaining - handling flow control

Every time `then` method is called it return its own promise by default its set to be resolved immediately, unless the previous step returns another promise. The next `then` gets the result from the previous `then` callback. `catch` going to get any type of error from any of the promise, if any promise gets any error its going to propagate to the end.

👉 `then` takes two function `onResolved` and `onReject` to handle both resolve and reject.

### Promise.all()

Promise.all() takes in an array of promises and will wait for all promises in the array to resolve. If any of the promise get rejected the main promise gets immediately rejected as well.

```js
Promise.all([doTask1a(), doTask1b(), doTask1c()]).then(function (results) {
  return doTask2(Math.max(results[0], results[1], results[2]));
});
```

### Promise.race()

Promise.race() receives an array of promises, however it only waits for whichever promise in the array resolves or rejects first.

### Promise.any()

Promise.any() takes array of promises and returned the first promised that resolved and in case if none of the promise gets resolved it reject the main promise

### Promise timeout

You can add timeout for each promise and reject it if its not resolved in expected time or taking too much time.
