# Event Bubbling and Event Capturing

Event Bubbling and Event Capturing both are the two ways of Event Propagation in the HTML DOM.

### Event Bubbling

In Event Bubbling, an event propagates from target element to outermost element in the HTML DOM.

### Event Capturing

In Event Capturing, an event propagates from outermost element to the target element in the HTML DOM.

## Default event propagation

**By default event gets propagate in Event Bubbling form** if you want to change the behavior pass the third optional argument `useCapture` as `true` in `addEventListener`.

```js
addEventListener(
  "click",
  function handleClick() {},
  true // useCapture
);
```

## How to stop event propagation?

To stop event propagation you can use `e.stopPropagation`

```js
addEventListener("click", function handleClick(e) {
  e.stopPropagation();
});
```

# Event Delegation

Event Delegation takes an advantage of Event Bubbling concept. Instead of adding event handler on each and every child element we should rather add event handler on its parent.
