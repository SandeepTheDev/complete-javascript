JavaScript is not a interpreted language but its a two pass system which means JavaScript parse the code first before it start executing. During first pass its setup a scope plan which gets a memory during execution of code.

# Scope

Scoping is a concept in programming langauge that refers where to look for things (identifiers) at execution time. Mainly there are two types of scoping:

- Lexical scoping (static scoping)
- Dynamic scoping

JavaScript use **Lexical scoping** to resolve the identifiers in program. JavaScript's scope is determined at complied time and its fixed and predictable.

👉 JavaScript creates scope for **functions** and **blocks** (only in case of let and const). Scopes can be nested as well.

```js
🔴 var teacher = "kyle";

🔴 function otherClass() {
    🔵 var teacher = "Suzy"; // variable shadowing

    🔵 function ask(question) {
        console.log(🔵 teacher, 🟢 question);
        {
            // Block scope (only in case let and const)
            🟡 let question = "What is block scope?";
            console.log(🟡 question);
        }
    }

    ask("Why?");
}

otherClass();
ask(); // ReferenceError
```

```js
// These are are the coloured bucket (functions & blocks)
🔴 Global scope
    🔵 Function scope `otherClass`
        🟢 Function scope `ask`
            🟡 block scope
```

## Lexical scope

**Lexical scope means that a function can reference a variable outside of its scope and it just goes up the scope chain to find it.**

## Dynamic global variables

**Dynamic global variables are created at run-time** not at compiled time.

```js
🔴 var teacher = "Kyle";

🔴 function otherClass() {
    🔴 teacher = "Suzy";
    topic = "React"; // dynamic global variable crated at global scope: RED
    console.log("Welcome!");
}

🔴 otherClass();

teacher; // Suzy
topic; // React
```

## Strict mode

Strict mode throws an error which were silent in sloppy mode.

- Dynamic global variable throws an error in strict mode.
- Writing read-only properties are not allowed.
- Cannot delete variable using delete operator.

```js
var teacher = "Kyle";

function otherClass() {
  teacher = "Suzy";
  topic = "React"; // ReferenceError
  console.log("Welcome!");
}

otherClass();
```

## Undefined vs undeclared

**Undefined** means a variable exists but at the moment it has no value. **Undeclared** means a variable doesn't exists in any of the scope that we have access to.

## Key points to remember

- Scope refers where to look for identifiers during execution. Lexical scoped language has a fixed and predictable scope.
- JavaScript creates a scope plan during first phase and this plan used during execution phase.
- non strict mode allows global dynamic variables.

## Scope & function expressions

If the word `function` is literally the first thing in the statement its a function declaration and if it's not the first thing in the statement its a function expression.

**Function delaration add their identifier to the enclosing scope whereas function expressions will add their indentifier to their own scope and also they are read only you cannot reassign to another value**.

```js
🔴 function teacher () {...}

🔴 var myTeacher = 🔵 function anotherTeacher() {
    console.log(🔵 anotherTeacher);
}

console.log(teacher);
console.log(myTeacher);
console.log(anotherTeacher); // ReferenceError
```

Function expression can be:

- Named function expression
- Anonymous function expression

👉 You should always, always use named function expressions because of the following reasons.

- Reliable function self-reference (recursion, etc): named function expression are more reliable self reference, its only accessible in their own scope and its a ready only.

- More debuggable stack traces: naming function can make debugging process easy by showing up function name in stack trace instead of anonymous function.

- Named functions are more self documenting code compared to anonymous function.

👉 **Every single function has purpose and if every function has a purpose, it means every function has a name**.

## Arrow function expressionss

Arrow function expression has a shorter syntax for declaring traditional function expression added in ES6 it can be also be named as well as anonymous.

- Arrow function can be useful when you need lexical `this` behaviour.
- Arrow function don't have `arguments` or `super`.
- Arrow funcion cannot be used as constructor calling them with `new` operator throws a TypeError.
- Arrow functions cannot use `yield` within their body and cannot be created as generator functions.

## Function types hierarchy

**(Named) function declaration > named function expression > anonymous function expression**

## Key points to remember

- Function declaration attached their indentifier with enclosing scope.
- Function expression attach their identifier to their on scope & its read only.
- You should always always use named function expression instead of anonymous function expressions.

**Principle of least privilege**: By default everything should be private, and only exposing minimal neccessary.

Scopes are great way to hide things that doesn't need to be exposed. By wrapping things inside the scope also solves the problem of name collision.

In JavaScript scopes can be created by using **function** and **block**.

## IIFE (Immediately invoked function expression)

```js
var teacher = "Kyle";

// IIFE not polluting global naming scpace
(function anotherTeacher() {
  var teacher = "Suzy";
  console.log(teacher); // Suzy
})();

console.log(teacher); // Kyle
```

## Block scoping

Variables declared with `let` and `const` can have block scope. They can only be accessed in the block in which they are defined.

```js
var teacher = "Kyle";

{
  let teacher = "Suzy";
  console.log(teacher); // Suzy
}

console.log(teacher); // Kyle
```

👉 Because IIFE is an expression and block is a statement IIFE has one advantage that it can be used in statement as well.

```js
var teacher = (function getTeacherName() {
  return "Kyle";
})();
```

## `let` or `var` (`let` is not a new `var`)

If variable is belongs to the entire scope of a function, the correct semantic way to signal that to your reader is `var`. If variable is belongs to the block like (for, if and etc.) use `let`. Unlike `let` `var` can be used reused multiple times in a scope.

👉 Both have semantic and behavioral reasons attached to them and you should use either of them accordingly, instead of using `let` everywhere.

## Explicit let block

If you want to use `let` you can wrap them inside a block which makes it very obvious to the reader of code that these variables are only exist for this particular block.

```js
function formatStr(str) {
  {
    let prefix, res;
    prefix = str.slice(0, 3);
    rest = str.slice(3);
    str = prefix.toUpperCase() + rest;
  }

  if (/^FOO:/.test(str)) {
    return str;
  }

  return str.slice(4);
}
```

## const keyword

Variable declared with `const` keyword cannot be redeclared or reassgin it but you can change or mutate the non primitive type values.

```js
// Primitive values with const
const PI = 3.14;
PI = 3.145; // TypeError: Assignment to constant variable

// Non primitive values with const
const fruits = ["apple", "grapes"];
fruits.push("oranges");

const otherClass = { teacher: "Kyle" };
otherClass.teacher = "Suzy";

fruits = "apple, grapes"; // TypeError: Assignment to constant variable
otherClass = "Suzy"; // TypeError: Assignment to constant variable
```

## What is hoisting?

JavaScript is a **lexical scoped langauge** which means during first pass (parsing) it setup a scope for all identifiers in program with some placeholder (undefined) and when it start executing the code variables are already known at that time.

## variable (with var) hoisting

Variables declared with `var` intially initialized with undefined.

```js
student; // undefined
teacher; // undefined

var student = "you";
var teacher = "Kyle";
```

## Function declaration & expression hoisting

Function declaration intially initialized with its definition or function body.

```js
teacher(); // Kyle
otherTeacher(); // TypeError

// teacher stores with function body
function teacher() {
  console.log("Kyle");
}

// otherTeacher set to undefined during first pass
var otherTeacher = function () {
  console.log("Suzy");
};
```

## `let` and `const` hoisting

Variables declare with `let` and `const` keyword do not get initialized during first pass it is in uninitialized state and it doesn't get initialized until it run accross the let or const declaration.

Accessing variable before initialization throws an error TDZ (temporal dead zone).

```js
teacher; // ReferenceError (TDZ): Cannot access 'teacher' before initialization
let teacher = "Kyle";

{
  otherTeacher; // ReferenceError (TDZ): Cannot access 'otherTeacher' before initialization
  let otherTeacher = "Suzy";
}
```

```js
otherTeacher(); // ReferenceError (TDZ): Cannot access 'otherTeacher' before initialization

let otherTeacher = function () {
  console.log("Suzy");
};
```

👉 You can take advantage of hoisting for function declaration by putting all function executable code at the top of each scope. While variable hoisting is not recommended you should declare all variables at the top of the each scope.

## Key points to remember

- Scopes are great way to hide things by using IIFE and block scope.
- Block scope is only created when `let` or `var` used in it.
- `let` is not a replacement of `var`.

## Closure

Closure is when a function **remembers** its lexical scope even when the function is executed outside that lexical scope. Lexical scope means that a function can reference a variable outside of its scope and it just goes up the scope chain to find it.

```js
function ask(question) {
  setTimeout(function waitASec() {
    console.log(question);
  }, 100);
}

ask("What is closure?");
```

```js
function ask(question) {
  return function holdYourQuestion() {
    console.log(question);
  };
}

var myQuestion = ask("What is closure?");
myQuestion(); // What is closure?
```

## Closing over variables

This is the classic example of closure there is a `setTimeout` inside a for-loop which will run function after some time and when it start executing the function, for-loop has done with its iteration and the value of `i` would be 4 at that time so because in JavaScript function remembers its lexical scope even when they are executing out of its original scope, as a result of it will print 4 three times.

```js
for (var i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(`i: ${i}`);
  }, i * 1000);
}
```

**Because each function is closing over `i` variable they all are pointing the same variable to solve this issue we need different variable for each iteration so that each function can close over different variable instead of one**.

```js
// let is block scope type so for each iteration there will be a different i everytime
for (var i = 1; i <= 3; i++) {
  let j = i;
  setTimeout(function () {
    console.log(`j: ${j}`);
  }, i * 1000);
}

for (let i = 1; i <= 3; i++) {
  setTimeout(function () {
    console.log(`i: ${i}`);
  }, i * 1000);
}
```

👉 It is inevitable for a language like JavaScript not to have a closure in it, because JavaScript is a lexical scoped language and have first class functions and it would be very weird if a function is return and it start loosing its original lexical scope.

## Modules

Modules encapsulate data and behavior (methods) together. The state (data) of a module is held by its methods via closure.

## Classic/Revealing module pattern

This is a example of module pattern using IIFE where only ask method is available outside. This can also be considered as singleton pattern. This is using a closure.

```js
var workshop = (function Module(teacher) {
  // publicAPI object only exposing public methods but still those public
  // methods can access private variables because of closure.
  var publicAPI = { ask };
  return publicAPI;

  // ask function closed over variable `teacher`
  function ask(question) {
    console.log(teacher, question);
  }
})("Kyle");

workshop.ask("It's a module, right?");
// Kyle It's a module, right?
```

## Module Factory/Factory function

Unlike IIFE singleton module pattern module factory function can be called multiple times.

```js
function WorkshopModule(teacher) {
  var publicAPI = { ask };
  return publicAPI;

  function ask(question) {
    console.log(teacher, question);
  }
}

var workshop = WorkshopModule("Kyle");
workshop.ask("It's a module, right?");
// Kyle It's a module, right?
```

## ES6 module pattern

ES6 module is file based modules, you can imagine that the file is wrapped in a function like in previous example of modules and by default everything is private. The way to make something public, is to use `export` keyword.

- It is important to note that **file based modules are singletons**, meaning even though they are imported many times into an application, they only run once.

```js
// workshop.mjs
var teacher = "Kyle";

export default function ask(question) {
  console.log(teacher, question);
}
```

**There are two major styles of importing and consuming modules in ES6**

```js
// default import syntax
import ask from "workshop.mjs";
ask("It;s a default import, right?");

// namespaced import syntax
import * as workshop from "workshop.mjs";
workshop.ask("It's a namespace import, right?");
```
