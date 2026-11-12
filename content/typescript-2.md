# TypeScript: Adding Types to JavaScript - II

4. Functions and TypeScript
5. Type Aliases and Interfaces

# Part 4: Functions and TypeScript

## Slide 30 – Function Parameter Types

TypeScript lets us specify the expected types of function parameters.

JavaScript:

```
function greet(name) {
    return `Hello, ${name}!`;
}
```

TypeScript:

```
function greet(name: string) {
    return `Hello, ${name}!`;
}
```

Now:

```
greet("Alex");  // Valid

greet(42);      // Error
```

The compiler checks function arguments before the function executes.

## Slide 31 – Function Return Types

We can also explicitly specify the return type.

```
function calculateArea(
    width: number,
    height: number
): number {
    return width * height;
}
```

The compiler checks the returned value.

```
function calculateArea(
    width: number,
    height: number
): number {
    return "Large";  // Error
}
```

This is especially useful when working with larger functions.

## Slide 32 – Arrow Functions

Arrow functions work just as they do in JavaScript.

```
const add = (a: number, b: number): number => {
    return a + b;
};
```

Or using an expression body:

```
const multiply = (a: number, b: number): number =>
    a * b;
```

TypeScript also infers return types:

```
const multiply = (a: number, b: number) =>
    a * b;
```

The parameters still need types unless they can be inferred from context.

## Slide 33 – Default and Optional Parameters

TypeScript supports the same default parameter syntax as JavaScript.

```
function greet(
    name: string,
    greeting: string = "Hello"
): string {
    return `${greeting}, ${name}!`;
}
```

Calls:

```
greet("Alex");

greet("Jordan", "Welcome");
```

Optional parameters use `?`:

```
function greet(name: string, greeting?: string) {
    // ...
}
```

Optional parameters must come after required parameters.

## Slide 34 – Function Types

Functions themselves can have types.

```
let operation: (a: number, b: number) => number;
```

This means `operation` must refer to a function that:

- Accepts two numbers.
- Returns a number.

We can assign different functions:

```
function add(a: number, b: number): number {
    return a + b;
}

function multiply(a: number, b: number): number {
    return a * b;
}

operation = add;

operation = multiply;
```

But this is invalid:

```
operation = (a: string, b: string) => a + b;
```

The function signature doesn't match.

## Slide 35 – Functions as Parameters

We can use function types when passing functions as arguments.

```
function calculate(
    a: number,
    b: number,
    operation: (x: number, y: number) => number
): number {
    return operation(a, b);
}
```

Usage:

```
console.log(calculate(10, 5, add));

console.log(calculate(10, 5, multiply));
```

This is particularly useful when working with callbacks, event handlers, and asynchronous operations.

# Part 5: Type Aliases and Interfaces

## Slide 36 – The Problem with Repeating Object Types

Suppose several functions work with student objects.

```
function displayStudent(student: {
    name: string;
    age: number;
}) {
    console.log(student.name);
}
```

Another function:

```
function isAdult(student: {
    name: string;
    age: number;
}) {
    return student.age >= 18;
}
```

We are repeating the same object structure.

What happens if we need to add another property?

We would have to update every occurrence.

TypeScript provides two mechanisms to solve this problem:

- Type aliases
- Interfaces

## Slide 37 – Type Aliases

A type alias gives a name to an existing type.

```
type Student = {
    name: string;
    age: number;
    enrolled: boolean;
};
```

Now we can use `Student` wherever we need that structure.

```
function displayStudent(student: Student): void {
    console.log(student.name);
}
```

Another example:

```
function isAdult(student: Student): boolean {
    return student.age >= 18;
}
```

This makes code easier to read and maintain.

## Slide 38 – Type Aliases for Primitive Types

Type aliases are not limited to objects.

```
type StudentID = number;

type Username = string;

type Percentage = number;
```

Now:

```
let id: StudentID = 1001;

let username: Username = "alex123";

let grade: Percentage = 95;
```

One important limitation:

These aliases do not create genuinely distinct types.

For example:

```
let id: StudentID = 1001;

let grade: Percentage = id;  // Allowed
```

Both are still just numbers to TypeScript.

## Slide 39 – Interfaces

An interface describes the expected structure of an object.

```
interface Student {
    name: string;
    age: number;
    enrolled: boolean;
}
```

We can use it just like our previous type alias:

```
function displayStudent(student: Student): void {
    console.log(student.name);
}
```

Interfaces are especially common when defining:

- Object structures
- Class contracts
- API data structures
- Service and component requirements

## Slide 40 – Type vs. Interface

Both can describe object structures.

```
type StudentType = {
    name: string;
    age: number;
};
```

```
interface StudentInterface {
    name: string;
    age: number;
}
```

Both can be used in function parameters and variable declarations.

However, there are differences:

| Feature                   | Type | Interface |
| ------------------------- | ---- | --------- |
| Describe object structure | Yes  | Yes       |
| Primitive aliases         | Yes  | No        |
| Union types               | Yes  | No        |
| Extend other types        | Yes  | Yes       |
| Declaration merging       | No   | Yes       |

For most ordinary object definitions, either is appropriate.

## Slide 41 – Extending Interfaces

Interfaces can extend other interfaces.

```
interface Person {
    name: string;
    age: number;
}

interface Student extends Person {
    studentId: number;
    major: string;
}
```

A `Student` now has all four properties.

```
const student: Student = {
    name: "Alex",
    age: 21,
    studentId: 1001,
    major: "Computer Science"
};
```

This is similar to inheritance, but it describes object structure rather than inheriting implementation.

## Slide 42 – Extending Multiple Interfaces

An interface can extend more than one interface.

```
interface Person {
    name: string;
}

interface Employee {
    employeeId: number;
}

interface TeachingAssistant extends Person, Employee {
    course: string;
}
```

Now a `TeachingAssistant` must have all three properties.

This allows us to combine existing object contracts.

