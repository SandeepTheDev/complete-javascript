# Objects (Oriented) - Table of contents

- [The `this` keyword](https://github.com/SandeepTheDev/complete-javascript/tree/main/04-objects#the-this-keyword)

- [Arrow function with `this`](https://github.com/SandeepTheDev/complete-javascript/tree/main/04-objects#arrow-function--lexical-this)

- [ES6 class](https://github.com/SandeepTheDev/complete-javascript/tree/main/04-objects#es6-class)

- [Still loosing `this` in ES6 class](https://github.com/SandeepTheDev/complete-javascript/tree/main/04-objects#still-loosing-this-in-es6-class)

- [Prototypes](https://github.com/SandeepTheDev/complete-javascript/tree/main/04-objects#prototypes)

4. [OLOO Pattern](https://github.com/SandeepTheDev/complete-javascript/tree/main/04-objects#oloo-pattern)

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

**Use arrow functions when you need lexical `this`**, **`new` keyword doesn't work with arrow functions** because arrow functions don't have `this`.

**Arrow function is not hardbound function to the parent `this`**. Arrow function doesn't define `this` keyword at all. Which means if you put a `this` keyword inside an arrow function it's gonna behave like any other variable which means its going to lexically resolve to some enclosing scope that does define `this` keyword.

In this example arrow function doesn't have `this` and its enclosing scope that has `this` is `ask` method. And depends who is calling `ask` method determine the context of `this` and in this example its `workshop.ask`.

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

# ES6 class

JavaScript's class system is a whole new mechanism to define class in JavaScript.

```js
class Workshop {
  constructor(teacher) {
    this.teacher = teacher;
  }

  ask(question) {
    console.log(this.teacher, question);
  }
}

var deepJS = new Workshop("Kyle");
var reactJS = new Workshop("Suzy");

deepJS.ask("Is 'class' a class?");
// Kyle Is 'class' a class?

reactJS.ask("Is this class OK?");
// Suzy Is this class OK?
```

## ES6 class: extends (Inheritance)

```js
class Workshop {
  constructor(teacher) {
    this.teacher = teacher;
  }

  ask(question) {
    console.log(this.teacher, question);
  }
}

class AnotherWorkshop extends Workshop {
  speakUp(msg) {
    this.ask(msg);
  }
}

var JSRecentParts = new AnotherWorkshop("Kyle");

JSRecentParts.speakUp("Are classes getting better?");
// Kyle Are classes getting better?
```

## ES6 class: super (relative polymorphism)

The `super` keywords allows you to do relative polymorphism if a child class defines a method of same name as parent class so called shadowing you can refer parent method using `super` from child.

```js
class Workshop {
  constructor(teacher) {
    this.teacher = teacher;
  }

  ask(question) {
    console.log(this.teacher, question);
  }
}

class AnotherWorkshop extends Workshop {
  ask(msg) {
    super.ask(msg.toUpperCase());
  }
}

var JSRecentParts = new AnotherWorkshop("Kyle");

JSRecentParts.speakUp("Are classes super?");
// Kyle ARE CLASSES SUPER?
```

# Still loosing `this` in ES6 class

```js
class Workshop {
  constructor(teacher) {
    this.teacher = teacher;
  }

  ask(question) {
    console.log(this.teacher, question);
  }
}

var deepJS = new Workshop("Kyle");

setTimeout(deepJS.ask, 100, "Still loosing 'this'?");
// undefined Still loosing 'this'?
```

## Fixing `this`?

The entire class system is built upon this idea that your methods don't exists on your instances they exists on your prototype.

```js
class Workshop {
  constructor(teacher) {
    this.teacher = teacher;

    // `ask` is no longer in prototype its in each instances now.
    // Every time ask function new copy will be added to each instance.
    this.ask = (question) => {
      console.log(this.teacher, question);
    };
  }
}

var deepJS = new Workshop("Kyle");

setTimeout(deepJS.ask, 100, "Still loosing 'this'?");
// Kyle Still loosing 'this'?
```

# Prototypes

**Object are built by "constructor calls" (via `new`)**. A "constructor call" makes an object not based on its own prototype. **A "constructor call" makes an object "linked to" its own prototype**.

## Prototypes as "classes"

```js
function Workshop(teacher) {
  this.teacher = teacher;
}

Workshop.prototype.ask = function (question) {
  console.log(this.teacher, question);
};

var deepJS = new Workshop("Kyle");
var reactJS = new Workshop("Suzy");

deepJS.ask("Is 'prototype' a class?");
// Kyle Is 'prototype' a class?

reactJS.ask("Isn't 'prototype' ugly?");
// Suzy Isn't 'prototype' ugly?
```

## Prototype chain

![Prototype Chain](https://github.com/SandeepTheDev/javascript/blob/main/assets/prototype-chain.svg)

## Dunder proto (\_\_proto\_\_)

```js
function Workshop(teacher) {
  this.teacher = teacher;
}

Workshop.prototype.ask = function (question) {
  console.log(this.teacher, question);
};

var deepJS = new Workshop("Kyle");

deepJS.constructor === Workshop;

deepJS.__proto__ === Workshop.prototype; // true
Object.getPrototypeOf(deepJS) === Workshop.prototype; // true
```

## Prototype inheritance

```js
function Workshop(teacher) {
  this.teacher = teacher;
}

Workshop.prototype.ask = function (question) {
  console.log(this.teacher, question);
};

function AnotherWorkshop(teacher) {
  this.teacher = teacher;
}

AnotherWorkshop.prototype = Object.create(Workshop.prototype);
AnotherWorkshop.prototype.speakUp = function (msg) {
  this.ask(msg.toUpperCase());
};

var JSRecentParts = new AnotherWorkshop("Kyle");

JSRecentParts.speakUp("Is this actually inheritance?");
// Kyle IS THIS ACTUALLY INHERITANCE?
```

# OLOO Pattern

Objects Linked to Other Objects

```js
var Workshop = {
  setTeacher(teacher) {
    this.teacher = teacher;
  },

  ask(question) {
    console.log(this.teacher, question);
  },
};

var AnotherWorkshop = Object.assign(Object.create(Workshop), {
  speakUp(msg) {
    this.ask(msg.toUpperCase());
  },
});

var JSRecentParts = Object.create(AnotherWorkshop);
JSRecentParts.setTeacher("Kyle");
JSRecentParts.speakUp("But isn't this cleaner?");
// Kyle BUT ISN'T THIS CLEANER?
```
