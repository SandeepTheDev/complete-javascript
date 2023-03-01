# Async Patterns

There are bunch of async patterns to deal with asynchronous code let's walk through some of the important patterns that deals with asynchronous code.

## JavaScript's code runs on single thread

JavaScript's code runs on a single thread that means it only execute one line at a time. In theory you could spin multiple instances of the JavaScript engine on entirely separate thread that would look like multi threaded but they cannot communicate each other that's where web workers comes into picture web workers is a browser feature that makes it possible to run a script in background thread separate from main thread and then these workers can communicate with main thread using events.

## What is concurrency?

![Concurrency event loop](https://github.com/SandeepTheDev/javascript/blob/main/assets/concurrency-event-loop.png)
