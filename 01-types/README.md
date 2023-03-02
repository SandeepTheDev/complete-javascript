# Types - Table of content

- [Types in Javascript](https://github.com/SandeepTheDev/javascript/tree/main/01-types#types)

- [`typeof` operator](https://github.com/SandeepTheDev/javascript/tree/main/01-types#typeof-operator)

- [Fundamental Objects](https://github.com/SandeepTheDev/javascript/tree/main/01-types#fundamental-objects)

- [Emptiness in JavaScript](https://github.com/SandeepTheDev/javascript/tree/main/01-types#emptiness-in-javascript)

- [Special values - NaN & Negative zero](https://github.com/SandeepTheDev/javascript/tree/main/01-types#special-values-nan-and-negative-zero)

## Types

Types in JavaScript can be divided into two categories, **In JavaScript, variables don't have types values do.**

### 1. Primitive Types (Value Types)

- `undefined`
- `string`
- `number`
- `boolean`
- `null`
- `symbol`
- `bigint`

### 2. Non Primitive (Reference Types)

- `object` (arrays, functions and etc.)

## `typeof` operator

`typeof` operator is used to determine the type of a value, **`typeof` operator always returns string**. `typeof` operator is the only operator in JavaScript that can reference a variable which doesn't exist without throwing an error.

| Primitive Types | `typeof` return value            | Object wrapper |
| --------------- | -------------------------------- | -------------- |
| `null`          | `typeof null` "object"           | N/A            |
| `undefined`     | `typeof v` "undefined"           | N/A            |
| `boolean`       | `typeof true` "boolean"          | `Boolean`      |
| `number`        | `typeof 10` "number"             | `Number`       |
| `bigint`        | `typeof 10n` "bigint"            | `BigInt`       |
| `string`        | `typeof 'Hello World!'` "string" | `String`       |
| `symbol`        | `typeof Symbol()` "symbol"       | `Symbol`       |

### Edge cases with `typeof` operator

```js
typeof doesNotExist; // "undefined"

v = null;
typeof v; // "object"

v = function fn() {};
typeof v; // "function"

v = [1, 2, 3];
typeof v; // "object"
```

👉 **Array.isArray() method determines whether the passed value is an array**.

## Fundamental Objects

In addition to primitive values, JavaScript also have a object representations for all those primitive values with similar behavior.

**If you need to construct an object of the following fundamental type use `new` keyword**

- Object()
- Array()
- Function()
- Date()
- RegExp()
- Error()

**Don't use `new` keyword with these fundamental type but use them to coerce the value**

- String()
- Number()
- Boolean()

## Emptiness in JavaScript

- **Undefined**: means there's definitely a variable and at the moment it has no value.

- **Undeclared**: means it's never been created in any scope that we have access to. `typeof` operator is the only operator that can reference a thing that doesn't exist without throwing an error.

- **Uninitialized** This is introduced with ES6 it is also known as TDZ (temporal dead zone). The idea is that certain variables like block scope ones don't get initialized, they never initially get set to undefined when something is uninitialized state, it is off-limits.

## Special values: `NaN` and Negative zero

### NaN

`NaN` is a invalid number that occurs in program due to some wrong mathematical operation.

- `typeof` NaN is number
- Strict equality operator (===) does not work with NaN.
- ES6 Object.is method can be used to check whether two values are the same value.

```js
typeof NaN; // "number"

// wrong mathematical operations
var result = "hello" - 10;
var wrongCoerce = Number("hello");
var v = 0 * Infinity;

// strict equality operator does not work with NaN
NaN === NaN; // false
```

### Number.isNaN

```js
Number.isNaN(NaN); // true
Number.isNaN("hello world"); // false
```

### Negative zero

Negative zero is another special value in JavaScript, operation on it can cause unexpected result like:

- Negative zero is neither greater than 0 or lesser than 0.
- On using .toString() sign bit of negative zero gone.
- Strict equality operator (===) doesn't work with negative zero.
- ES6 Object.is method can be used to check whether two values are the same value.

```js
var trendRate = -0;

trendRate === -0; // true
trendRate === 0; // true what -0 is equal to 0
trendRate.toString(); // "0" where is - sign?
trendRate < 0; // false
trendRate > 0; // false
```

### Object.is()

ES6's Object.is() method can be used to check whether two values are the same value.

```js
Object.is(trendRate, -0); // true
Object.is(trendRate, 0); // false

Object.is(NaN, NaN); // true
Object.is(NaN, "hello world"); // false
```

### Application of negative zero in programming

Let's take an example of stock price, current stock price for a company named ABC is at 10, now after five minutes it goes up to 12 so the changes in stock price for ABC is going be +20% but now after few minutes it goes back to 10 so the changes in stock percentage now would be -0%.
