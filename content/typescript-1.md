# TypeScript: Adding Types to JavaScript I

1. Introduction to TypeScript
2. Setting up a Node.js project.
3. TypeScript Fundamentals

# Part 1: Introduction to TypeScript

## 1 – JavaScript Is Dynamically Typed

JavaScript allows variables to hold values of different types.

```
let value = 42;

value = "Hello";

value = true;
```

JavaScript determines the type of a value at runtime.

This flexibility is useful, but it can also introduce errors.

For example:

```
function calculateTotal(price, quantity) {
    return price * quantity;
}

console.log(calculateTotal(10, 5));       // 50
console.log(calculateTotal("ten", 5));    // NaN
```

The second call is technically valid JavaScript, but produces an unexpected result.

Question: How could we catch this mistake before running the program?

## 2 – What Is TypeScript?

[TypeScript Basic](https://images.openai.com/static-rsc-4/tRGaggioajt6Lk4bfMW0pLLjhnhhfsP6rmaZVw4S5OrOukjORYaDvM1EYOqsNsOFYR7KhM-ESbiZuCb_Rk1OvFvlerRYzk80pdmG8fpyNdEkoIENLzwrcNv3_PHTX63TUuGwU2aSJnvlDS75LeeBkgBxT8wTD_0ugH3Ytjg6eyQ?purpose=inline)

TypeScript is a programming language developed by Microsoft.

- TypeScript is a superset of JavaScript.
- It adds a static type system to JavaScript.
- It supports modern JavaScript features.
- It helps detect errors before programs execute.
- It compiles (transpiles) into JavaScript.

Most valid JavaScript code is also valid TypeScript code.

```
let message = "Hello, TypeScript!";

console.log(message);
```

TypeScript code ultimately runs as JavaScript. Browsers and Node.js do not normally execute TypeScript directly.

## 3 – Why Use TypeScript?

Consider a function that calculates an order total.

JavaScript:

```
function calculateTotal(price, quantity) {
    return price * quantity;
}
```

What are the expected arguments?

- Is `price` a number?
- Is `quantity` a number?
- What does the function return?

Nothing in the function tells us.

TypeScript makes these expectations explicit:

```
function calculateTotal(
    price: number,
    quantity: number
): number {
    return price * quantity;
}
```

Benefits:

- Catch type-related errors during development.
- Make code easier to understand.
- Improve editor autocomplete and documentation.
- Make large projects easier to maintain.
- Make refactoring safer.

## 4 – TypeScript Does Not Replace JavaScript

TypeScript builds on JavaScript.

You still use:

- Variables (`let`, `const`)
- Functions and arrow functions
- Objects and arrays
- Classes and inheritance
- Promises and `async`/`await`
- Modules (`import` and `export`)
- JavaScript libraries and APIs

The difference is that TypeScript lets you describe the types of values used by your program.

Think of TypeScript as JavaScript with an additional layer of type checking.

## 5 – Static vs. Dynamic Typing

JavaScript: Dynamic typing

```
let age = 21;
age = "twenty-one";
```

Allowed

The type can change at runtime.

TypeScript: Static type checking

```
let age: number = 21;
age = "twenty-one";
```

Type error

TypeScript reports that a string cannot be assigned to a number.

Important distinction:

TypeScript checks types during development and compilation. It does not automatically enforce types at runtime.

# Part 2: Setting Up a Node.js Project

Before writing TypeScript, we need to understand how JavaScript projects are organized and how npm manages dependencies.

## 6 – What Is Node.js?

[Collection of Nodejs Logo PNG. | PlusPNG](https://images.openai.com/static-rsc-4/h9WXikVI_Q6Yze-Bt2ntAJoRA3MKVQ7NYESCIiMvoovqa4eN55zHWEL-2RPylSTEjwNquVX8fQjS4s3R1zLwooW0Pkw7nCm60clG1ervaTCCs7qn3hPjkA0gXrYIPwtfZDIPhVOhsNV8R01d8itgogHuqVg8HwPnHSEVnck_uy8?purpose=inline)

So far, you've used Node.js to execute JavaScript files from the command line.

Node.js is a JavaScript runtime that allows JavaScript to run outside a browser.

For example:

```
node app.js
```

Node.js provides access to capabilities that browser JavaScript does not normally have:

- Filesystem access
- Operating system information
- Networking
- Process management
- Server-side application development

Node.js is commonly used to build:

- Web servers and APIs
- Command-line applications
- Development tools
- Build tools
- Backend services

## 7 – What Is npm?

[Understanding npm: Node Package Manager Explained](https://images.openai.com/static-rsc-4/TNyMqzc3uB6pX_J3janokO_rjSwLLSYQGSf3rXsJKRtwHNYbYdYfKXvkYqkeQz1xmJqO6nO_JoNzQrQRaE5CC_qslnqpMOhWLCFto4cSk0x41uTPkY_AE3X6jUqJW5jwTidsTWUkO9-0jWyrGfajg0k9CV7DNmWaSFyK917sPL4?purpose=inline)

npm stands for Node Package Manager.

It is used to:

- Install third-party JavaScript libraries.
- Manage project dependencies.
- Install development tools.
- Run project-specific scripts.

For example, instead of manually downloading a library, we can install it:

```
npm install express
```

npm downloads Express and its dependencies and makes them available to our project.

Important: Node.js and npm are typically installed together.

Check your installations:

```
node --version
npm --version
```

## 8 – Creating a Node.js Project

Let's create a project for our TypeScript experiments.

First, create a directory:

```
mkdir typescript-demo
cd typescript-demo
```

Initialize the project:

```
npm init -y
```

This creates a file named:

`package.json`

What is `package.json`?

It describes the Node.js project and contains information such as:

- Project name and version
- Dependencies
- Development dependencies
- Scripts used to run common commands

## 9 – Understanding package.json

A simplified `package.json` might look like this:

```
{
  "name": "typescript-demo",
  "version": "1.0.0",
  "description": "Learning TypeScript",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\""
  }
}
```

Some important properties:

| Property        | Purpose                                |
| --------------- | -------------------------------------- |
| name            | Project name                           |
| version         | Project version                        |
| dependencies    | Packages needed by the application     |
| devDependencies | Packages needed during development     |
| scripts         | Commands that can be executed with npm |

We will modify this file as we configure our TypeScript project.

## 10 – Installing TypeScript

We need the TypeScript compiler to convert `.ts` files into JavaScript.

Install TypeScript as a development dependency:

```
npm install --save-dev typescript
```

Why `--save-dev`?

TypeScript is needed while developing the application, but the resulting JavaScript does not need the TypeScript compiler to execute.

The compiler is a development tool, not a runtime dependency.

After installation, npm creates:

- `node_modules/` – downloaded packages
- `package-lock.json` – records exact dependency versions
- An updated `package.json`

## 11 – Local vs. Global npm Packages

There are two common ways to install npm packages.

Global installation:

```
npm install -g typescript
```

Makes the package available system-wide.

Local installation:

```
npm install --save-dev typescript
```

Makes the package available to the current project.

Why prefer local installation?

- Different projects can use different versions.
- Everyone working on the project can use the same version.
- The project documents its development dependencies.
- No global installation is necessary.

We will use local installations in this course.

## 12 – Running Locally Installed Tools

When TypeScript is installed locally, its compiler is available in:

```
node_modules/.bin/tsc
```

You could execute it directly, but npm provides a simpler approach:

```
npx tsc --version
```

`npx` runs an available package executable, using the project's local installation when available.

We will use `npx` to execute the TypeScript compiler.

## 13 – Our First TypeScript Program

Create a file named:

`hello.ts`

```
let message: string = "Hello from TypeScript!";

console.log(message);
```

Compile it:

```
npx tsc hello.ts
```

What happens?

TypeScript generates a JavaScript file:

```
hello.js
```

Now execute it using Node.js:

```
node hello.js
```

Our development workflow

hello.ts

TypeScript source code

npx tsc

hello.js

Generated JavaScript

node hello.js

Program output

## 14 – What Is the TypeScript Compiler?

The TypeScript compiler is called `tsc`.

Its job is to:

1. Read TypeScript source files.
2. Check the code for type errors.
3. Generate JavaScript files.

For example:

```
npx tsc hello.ts
```

The compiler can also be instructed to report errors without generating JavaScript:

```
npx tsc --noEmit hello.ts
```

An important point:

A TypeScript type error does not necessarily prevent JavaScript from being generated.

We will discuss compiler settings that control this behavior later.

## 15 – Configuring TypeScript

Instead of specifying compiler options every time, we can create a configuration file.

```
npx tsc --init
```

This creates:

`tsconfig.json`

The file controls how TypeScript compiles our project.

Some important options include:

| Option        | Purpose                                    |
| ------------- | ------------------------------------------ |
| target        | JavaScript version to generate             |
| module        | Module system used in generated JavaScript |
| rootDir       | Location of TypeScript source files        |
| outDir        | Location of generated JavaScript           |
| strict        | Enable stricter type checking              |
| noEmitOnError | Prevent output when errors exist           |

## 16 – Organizing Our Project

Let's organize our project into separate source and output directories.

```
typescript-demo/
│
├── src/
│   └── hello.ts
│
├── dist/
│
├── node_modules/
│
├── package.json
├── package-lock.json
└── tsconfig.json
```

Why separate these directories?

- `src/` contains the source code we write.
- `dist/` contains the generated JavaScript.
- `node_modules/` contains installed packages.

We generally don't want to commit `node_modules/` or generated output to source control unless the project specifically requires it.

## 17 – A Basic tsconfig.json

For our first project, we can use a relatively simple configuration:

```
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "rootDir": "./src",
    "outDir": "./dist",
    "strict": true,
    "noEmitOnError": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```

Some important settings:

- `target`: Generate modern JavaScript.
- `module`: Use Node.js-compatible ES modules.
- `rootDir`: Read source files from `src`.
- `outDir`: Write generated files to `dist`.
- `strict`: Enable strict type checking.
- `noEmitOnError`: Don't generate output if there are errors.

For this configuration, add the following to `package.json`:

```
"type": "module"
```

This tells Node.js to interpret generated `.js` files as ES modules.

## 18 – Adding npm Scripts

We can define commonly used commands in `package.json`.

Add or replace the scripts section:

```
"scripts": {
    "build": "tsc",
    "start": "node dist/hello.js"
}
```

Now we can run:

```
npm run build
```

This compiles the project.

Then:

```
npm start
```

This runs the generated JavaScript.

We no longer need to type the full compiler and Node.js commands each time.

# Part 3: TypeScript Fundamentals

Now that we have a working project, let's explore what TypeScript actually adds to JavaScript.

## 19 – Type Annotations

A type annotation tells TypeScript what type of value a variable should hold.

Syntax:

```
let variableName: type = value;
```

Examples:

```
let age: number = 21;

let firstName: string = "Alex";

let isEnrolled: boolean = true;
```

The colon introduces the type annotation.

TypeScript checks that assigned values match the declared type.

## 20 – Basic Types

JavaScript has several primitive types. TypeScript provides corresponding types.

| TypeScript type | Example         |
| --------------- | --------------- |
| `number`        | `42`, `3.14`    |
| `string`        | `"Hello"`       |
| `boolean`       | `true`, `false` |
| `null`          | `null`          |
| `undefined`     | `undefined`     |
| `bigint`        | `100n`          |
| `symbol`        | `Symbol("id")`  |

Notice that TypeScript uses lowercase type names.

Use `string`, not `String`.

Use `number`, not `Number`.

## 21 – Type Inference

Do we always have to specify the type?

No!

TypeScript can infer the type based on the initial value.

```
let age = 21;

let name = "Alex";

let isEnrolled = true;
```

TypeScript understands:

- `age` is a number.
- `name` is a string.
- `isEnrolled` is a boolean.

This is called type inference.

The compiler will reject incompatible assignments:

```
let age = 21;

age = "twenty-one";  // Error
```

Good practice: Use type annotations when they improve clarity, but don't add unnecessary annotations everywhere.

## 22 – Type Inference vs. Explicit Types

Compare these examples:

```
// Type inferred
let score = 95;

// Type explicitly declared
let score: number = 95;
```

Both are valid.

However, sometimes we need to explicitly specify a type because TypeScript cannot infer what we intend.

For example:

```
let score: number;

score = 95;
score = 100;
```

What type would TypeScript infer if we declared `let score;` instead?

The answer depends on compiler settings and subsequent assignments. Avoid relying on implicit `any`.

## 23 – The any Type

TypeScript includes a special type called `any`.

```
let value: any = 42;

value = "Hello";

value = true;
```

The `any` type disables most type checking for that value.

For example:

```
let value: any = "Hello";

value.someMethodThatDoesNotExist();
```

TypeScript will not complain.

Why is this dangerous?

You lose many of the benefits of TypeScript.

Use `any` sparingly.

A better alternative in many situations is `unknown`, which we will discuss later.

## 24 – The void Type

The `void` type is commonly used for functions that do not return a value.

```
function displayMessage(): void {
    console.log("Hello!");
}
```

Compare:

```
function add(a: number, b: number): number {
    return a + b;
}
```

The return type appears after the parameter list.

- `number` means the function returns a number.
- `void` means the function does not return a useful value.

TypeScript can also infer function return types.

## 25 – Arrays

TypeScript provides two common ways to declare array types.

```
let scores: number[] = [85, 90, 95];

let names: string[] = [
    "Alex",
    "Jordan",
    "Taylor"
];
```

An alternative syntax:

```
let scores: Array<number> = [85, 90, 95];
```

Both are equivalent.

TypeScript checks the types of array elements:

```
scores.push(100);       // Valid
scores.push("A");       // Error
```

## 26 – Tuples

A tuple is an array with a fixed number of elements and known types at specific positions.

```
let student: [string, number] = [
    "Alex",
    95
];
```

The first element must be a string.

The second element must be a number.

```
console.log(student[0]);  // Alex
console.log(student[1]);  // 95
```

Tuples are useful when a function needs to return multiple values with different types.

For example:

```
function getStudent(): [string, number] {
    return ["Alex", 95];
}
```

## 27 – Objects

JavaScript objects are familiar to us.

TypeScript allows us to specify the expected structure of an object.

```
let student: {
    name: string;
    age: number;
    enrolled: boolean;
};

student = {
    name: "Alex",
    age: 21,
    enrolled: true
};
```

TypeScript checks:

- Required properties
- Property names
- Property types

This object would produce an error:

```
student = {
    name: "Alex",
    age: "twenty-one",
    enrolled: true
};
```

The `age` property must be a number.

## 28 – Optional Properties

Sometimes an object doesn't need to contain every property.

We can use `?` to indicate an optional property.

```
let student: {
    name: string;
    age: number;
    email?: string;
};
```

Now both of these are valid:

```
student = {
    name: "Alex",
    age: 21
};

student = {
    name: "Jordan",
    age: 22,
    email: "jordan@example.com"
};
```

The question mark means the property may be omitted.

## 29 – Readonly Properties

Sometimes we want a property to be assigned once but not changed afterward.

Use `readonly`.

```
let student: {
    readonly id: number;
    name: string;
};

student = {
    id: 1001,
    name: "Alex"
};

student.name = "Jordan";  // Valid

student.id = 1002;        // Error
```

`readonly` is a compile-time restriction.

It does not automatically make the object immutable at runtime.

