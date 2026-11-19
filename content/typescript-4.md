# TypeScript: Adding Types to JavaScript IV

8. Generics
9. Modules and Project Organization
10. Putting It All Together


# Part 8: Generics

## 58 – The Problem with Writing Reusable Functions

Consider a function that returns the first element of an array.

```
function getFirstNumber(numbers: number[]): number {
    return numbers[0];
}
```

This works for numbers.

But what if we want the first string?

We could write another function:

```
function getFirstString(strings: string[]): string {
    return strings[0];
}
```

What if we need this functionality for several different types?

We would end up writing nearly identical functions.

Can we write one function that works with different types while still preserving type safety?

Yes: generics.

## 59 – Introduction to Generics

A generic allows us to write reusable code that works with different types.

```
function getFirst<T>(items: T[]): T {
    return items[0];
}
```

What is `T`?

`T` is a type parameter.

It represents a type that will be determined when the function is used.

Examples:

```
let firstNumber = getFirst([10, 20, 30]);

let firstName = getFirst(["Alex", "Jordan"]);
```

TypeScript infers:

- `firstNumber` is a number.
- `firstName` is a string.

One function works with both types.

## 60 – Explicit Generic Types

We can also specify the generic type explicitly.

```
let firstNumber = getFirst<number>([10, 20, 30]);

let firstName = getFirst<string>(["Alex", "Jordan"]);
```

The type parameter appears inside angle brackets.

```
getFirst<number>([10, 20, 30]);
```

In many cases, TypeScript can infer the type automatically.

However, explicit type arguments can make code easier to understand or resolve ambiguous situations.

## 61 – Multiple Type Parameters

A generic can use more than one type parameter.

```
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}
```

Usage:

```
const result = pair("Alex", 21);
```

TypeScript infers:

```
[string, number]
```

We can also specify the types explicitly:

```
const result = pair<string, number>("Alex", 21);
```

## 62 – Generic Interfaces

Interfaces can also be generic.

```
interface Box<T> {
    value: T;
}
```

Now we can create boxes containing different types.

```
const numberBox: Box<number> = {
    value: 42
};

const stringBox: Box<string> = {
    value: "Hello"
};
```

The same interface works with different data types.

## 63 – Generic Classes

Classes can also use generic type parameters.

```
class Storage<T> {
    private items: T[] = [];

    add(item: T): void {
        this.items.push(item);
    }

    getAll(): T[] {
        return this.items;
    }
}
```

Usage:

```
const numbers = new Storage<number>();

numbers.add(10);
numbers.add(20);

const names = new Storage<string>();

names.add("Alex");
names.add("Jordan");
```

Each instance has its own type.

## 64 – Generic Constraints

Sometimes we want a generic to accept only certain types.

Consider a function that returns the length of a value.

We want to accept strings and arrays.

One approach is to define a constraint.

```
interface HasLength {
    length: number;
}
```

Now:

```
function getLength<T extends HasLength>(value: T): number {
    return value.length;
}
```

Valid:

```
getLength("Hello");

getLength([10, 20, 30]);
```

Invalid:

```
getLength(42);
```

The `extends` keyword constrains `T` to types that have a `length` property of type `number`.

This is one of the most useful applications of generics.

# Part 9: Modules and Project Organization

## 65 – JavaScript Modules Still Work

TypeScript supports JavaScript's ES module syntax.

We use:

- `export` to make functionality available to other files.
- `import` to use functionality from another file.

For example, create:

`src/math.ts`

```
export function add(a: number, b: number): number {
    return a + b;
}

export function multiply(a: number, b: number): number {
    return a * b;
}
```

## 66 – Importing Modules

Create another file:

`src/app.ts`

```
import { add, multiply } from "./math.js";

console.log(add(10, 5));

console.log(multiply(10, 5));
```

Notice that we use `.js` in the import path, even though the source file is `math.ts`.

Why?

With the NodeNext module configuration, TypeScript follows Node.js's module resolution rules. The generated JavaScript will contain an import path that Node.js can resolve.

The compiler maps the source TypeScript file to its generated JavaScript output.

## 67 – Compiling Multiple Files

When our project has multiple TypeScript files, we don't have to compile each one separately.

With `tsconfig.json` configured, simply run:

```
npx tsc
```

Or use the npm script:

```
npm run build
```

The compiler processes the files included in the project configuration.

The resulting directory might look like:

```
typescript-demo/
│
├── src/
│   ├── app.ts
│   └── math.ts
│
├── dist/
│   ├── app.js
│   └── math.js
│
├── node_modules/
├── package.json
└── tsconfig.json
```

## 68 – The Complete Development Workflow

Our workflow now looks like this:

1. Write TypeScript in `src/`.
2. Compile TypeScript using `tsc`.
3. Review any compiler errors.
4. Execute the generated JavaScript using Node.js.

```
npm run build

npm start
```

We can also configure an additional script to run the compiler in watch mode:

```
"scripts": {
    "build": "tsc",
    "watch": "tsc --watch",
    "start": "node dist/app.js"
}
```

Then:

```
npm run watch
```

The compiler watches for changes and recompiles files automatically.

# Part 10: Putting It Together

## 69 – Example: Student Management System

Let's combine several TypeScript concepts in one small application.

We want to represent students and manage a collection of them.

Requirements:

- Define a `Student` interface.
- Create a class that implements the interface.
- Use types for function parameters and return values.
- Store students in an array.
- Write a generic function to retrieve an item.

## 70 – Defining the Student Interface

```
interface Student {
    id: number;
    name: string;
    major: string;
    gpa: number;
}
```

This interface defines the structure of a student.

Every object used as a `Student` must provide these properties with the correct types.

## 71 – Implementing the Student Class

```
class CollegeStudent implements Student {

    constructor(
        public id: number,
        public name: string,
        public major: string,
        public gpa: number
    ) {}

    display(): void {
        console.log(
            `${this.name} - ${this.major} - GPA: ${this.gpa}`
        );
    }
}
```

The class implements the `Student` interface.

It must provide all the required properties.

## 72 – Managing Students

```
const students: Student[] = [
    new CollegeStudent(1, "Alex", "Computer Science", 3.8),
    new CollegeStudent(2, "Jordan", "Mathematics", 3.5),
    new CollegeStudent(3, "Taylor", "Engineering", 3.9)
];
```

The array can contain any object that satisfies the `Student` interface.

Now create a function to display the students:

```
function displayStudents(students: Student[]): void {

    for (const student of students) {
        console.log(`${student.name}: ${student.gpa}`);
    }
}
```

## 73 – Finding a Student

We can define a function that searches for a student by ID.

```
function findStudent(
    students: Student[],
    id: number
): Student | undefined {

    return students.find(student => student.id === id);
}
```

Why `Student | undefined`?

The `find()` method returns:

- A matching student, if one exists.
- `undefined`, if no match is found.

TypeScript makes us account for both possibilities.

## 74 – Handling the Result

```
const student = findStudent(students, 2);

if (student !== undefined) {
    console.log(student.name);
}
else {
    console.log("Student not found.");
}
```

Inside the `if` block, TypeScript knows that `student` is a `Student`.

Inside the `else` block, it knows that `student` is `undefined`.

This is type narrowing in practice.

## 75 – Why TypeScript?

Let's revisit the original question.

What does TypeScript provide?

- Static type checking.
- Better development tools and autocomplete.
- Improved documentation through types.
- Safer refactoring.
- Better organization for larger applications.
- More reliable interfaces between different parts of a system.

TypeScript does not eliminate all bugs.

It does not guarantee that data received from an external API is valid.

It does not replace testing.

But it can catch many errors before the application runs.

## Exercise 1 – Convert JavaScript to TypeScript

Start with this JavaScript function:

```
function calculateDiscount(price, percentage) {
    return price * percentage / 100;
}
```

Tasks:

1. Convert the function to TypeScript.
2. Add parameter types.
3. Add a return type.
4. Try calling it with a string instead of a number.
5. Observe the compiler error.

## Exercise 2 – Create an Interface

Create an interface named `Product`.

It should contain:

- `id`: number
- `name`: string
- `price`: number
- `description`: optional string

Create an array of products and write a function that displays them.

## Exercise 3 – Union Types

Write a function that accepts either a number or a string representing a student ID.

If the value is a number, display it directly.

If it is a string, convert it to uppercase.

Use type narrowing.

## Exercise 4 – Generics

Write a generic function named `getLast()`.

It should accept an array of any type and return the last element.

Test it with:

- An array of numbers.
- An array of strings.
- An array of objects.

Ensure TypeScript correctly infers the return type.
