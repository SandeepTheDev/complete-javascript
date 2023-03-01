# Async Patterns

There are bunch of async patterns to deal with asynchronous code let's walk through some of the important patterns that deals with asynchronous code.

## JavaScript's code runs on single thread

JavaScript's code runs on a single thread that means it only execute one line at a time. In theory you could spin multiple instances of the JavaScript engine on entirely separate thread that would look like multi threaded but they cannot communicate each other that's where web workers comes into picture web workers is a browser feature that makes it possible to run a script in background thread separate from main thread and then these workers can communicate with main thread using events.

## What is concurrency?

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
