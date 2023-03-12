# Event Bubbling & Event Capturing (Trickling)

Event Bubbling and Event Capturing are the two ways of Event propagation in the HTML DOM.

## Event Bubbling

In Event Bubbling, an event propagates from target element to the outermost element in HTML DOM.

## Event Capturing

In Event Capturing, an event propagates from the outermost element to the target element in HTML DOM.

# Handling event bubbling and capturing in addEventHandler

addEventHandler third argument is `useCapture` by default its false, if you want to change the default behavior of event propagation which is bubbling pass third argument as `true`.

```js
addEventHandler(
  "click",
  function handleClick() {},
  true // useCapture
);
```

# How to stop event propagation?

To stop event propagation use `e.stopPropagation()`

```js
addEventHandler(
  "click",
  function handleClick(e) {
    e.stopPropagation();
  },
  true // useCapture
);
```
