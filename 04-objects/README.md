# Objects (Oriented) - Table of contents

- [The `this` keyword](https://github.com/SandeepTheDev/complete-javascript/tree/main/03-scope#the-this-keyword)

- [Arrow function with `this`](https://github.com/SandeepTheDev/complete-javascript/tree/main/03-scope#arrow-function-&-lexical-this)

2. `class {}`
3. Prototypes
4. Inheritance vs Behavior Delegation (OO vs OLOO)

# The `this` keyword

A function's `this` references the execution context for that call, **determined entirely by how the function was called**. A `this`-aware function can thus have different context each time it's called, which makes it more flexible & reusable.
The `this` keyword exists so that we can invoke a function with different context. Context **refers to an object** that owns the currently executing code.

```js
function ask(question) {
  console.log(this.teacher, question);
}

function otherClass() {
  var myContext = {
    teacher: "Suzy",
  };

  ask.call(myContext, "Why?"); // Suzy Why?
}

otherClass();
```

In JavaScript there are four different ways to invoke a function so, each one of them answer the question what is the `this` keyword references.

## 1. Implicit binding

```js
var workshop = {
  teacher: "Kyle",
  ask(question) {
    console.log(this.teacher, question);
  },
};

workshop.ask("What is implicit binding?");
// Kyle What is implicit binding?
```

With the help implicit binding it is very easy to share method across different context.

```js
function ask(question) {
  console.log(this.teacher, question);
}

var workshop1 = {
  teacher: "Kyle",
  ask: ask,
};

var workshop2 = {
  teacher: "Suzy",
  ask: ask,
};

workshop1.ask("How do I share method?");
// Kyle How do I share method?

workshop2.ask("How do I share method?");
// Suzy How do I share method?
```

## 2. Explicit binding (call, apply and bind)

`call` & `apply` can be used to tell explicitly JavaScript to which context invoke it in.

```js
function ask(question) {
  console.log(this.teacher, question);
}

var workshop1 = {
  teacher: "Kyle",
  ask: ask,
};

var workshop2 = {
  teacher: "Suzy",
  ask: ask,
};

ask.call(workshop1, "How do I share method?");
// Kyle How do I share method?

ask.apply(workshop2, ["How do I share method?"]);
// Suzy How do I share method?
```

When a function is not invoked in its original scope it loses `this` value. In that case `bind` can be used to hard bound `this` value. `setTimeout` is invoked later using `call` with `window` or `global` object's context.

```js
var workshop = {
  teacher: "Kyle",
  ask(question) {
    console.log(this.teacher, question);
  },
};

setTimeout(workshop.ask, 10, "Lost this?");
// undefined Lost this?

setTimeout(workshop.ask.bind(workshop), 10, "Hard bound this?");
// Kyle Hard bound this?
```

## 3. The `new` keyword

The purpose of new keyword is actually to invoke a function with `this` keyword pointing to a whole new empty object.

- Create a brand new empty object
- Link that object to another object
- Call the function with `this` set to new object
- If function does not return an object assume return of `this`

```js
function ask(question) {
  console.log(this.teacher, question);
}

var newEmptyObject = new ask("What is 'new' doing here");
//  undefined What is 'new' doing here?
```

## 4. Default binding (fallback)

Default binding is the fallback when none of the three rules doesn't match in non-strict mode `this` refers to global object and in strict its `undefined`.

```js
var teacher = "Kyle";

function ask(question) {
  console.log(this.teacher, question);
}

function askAgain(question) {
  "use strict";
  console.log(this.teacher, question);
}

ask("What's the non-strict-mode default?");
// Kyle What's the non-strict-mode default?

askAgain("What's the strict-mode default?");
// TypeError because this is undefined undefined.teacher is TypeError
```

## Binding rule precedence?

`new` > Explicit (`call`, `apply` & `bind`) > Implicit binding > Default binding

```js
var workshop = {
  teacher: "Kyle",
  ask: function ask(question) {
    console.log(this.teacher, question);
  },
};

new (workshop.ask.bind(workshop))("What does this do?");
// undefined what does this do?
```

# Arrow Function & Lexical `this`

**Arrow function is not hardbound function to the parent `this`**. Arrow function doesn't define `this` keyword at all. Which means if you put a `this` keyword inside an arrow function it's gonna behave like any other variable which means its going to lexically resolve to some enclosing scope that does define `this` keyword.

In this example arrow function doesn't have `this` and its enclosing scope that has `this` is `ask` method.

```js
var workshop = {
  teacher: "Kyle",
  ask(question) {
    setTimeout(() => {
      console.log(this.teacher, question);
    }, 100);
  },
};

workshop.ask("Is this lexical 'this'?");
// Kyle Is this lexical 'this'?
```

In this example the only enclosing scope to arrow function which has `this` is global.

```js
var workshop = {
  teacher: "Kyle",
  ask: (question) => {
    console.log(this.teacher, question);
  },
};

workshop.ask("What happened to 'this'?");
// undefined What happened to 'this'?

workshop.ask.call(workshop, "Still no 'this'?");
// undefined Still no 'this'?
```

**Use arrow functions when you need lexical `this`**
