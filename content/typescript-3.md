# TypeScript: Adding Types to JavaScript III

6. Classes and TypeScript
7. Union Types and Type Narrowing


# Part 6: Classes and TypeScript

## 43 – Classes in TypeScript

TypeScript classes look very similar to JavaScript classes.

The main difference is that we can explicitly declare property and method types.

```
class Student {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }

    display(): void {
        console.log(`${this.name}, ${this.age}`);
    }
}
```

Usage:

```
const student = new Student("Alex", 21);

student.display();
```

## 44 – Property Initialization

With strict type checking enabled, TypeScript checks that class properties are initialized.

This produces an error:

```
class Student {
    name: string;
    age: number;
}
```

Why?

TypeScript cannot determine that these properties will receive values.

One solution is to initialize them:

```
class Student {
    name: string = "";
    age: number = 0;
}
```

Another is to initialize them in the constructor.

```
class Student {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

## 45 – Constructor Parameter Properties

TypeScript provides a shortcut for declaring and initializing class properties.

Instead of:

```
class Student {
    name: string;
    age: number;

    constructor(name: string, age: number) {
        this.name = name;
        this.age = age;
    }
}
```

We can write:

```
class Student {
    constructor(
        public name: string,
        public age: number
    ) {}
}
```

The `public` keyword:

- Declares a class property.
- Initializes it using the constructor argument.
- Makes it accessible outside the class.

This is called a parameter property.

It is TypeScript-specific syntax.

## 46 – Access Modifiers

TypeScript supports access modifiers similar to other object-oriented languages.

| Modifier    | Accessibility                              |
| ----------- | ------------------------------------------ |
| `public`    | Accessible everywhere                      |
| `private`   | Accessible only inside the declaring class |
| `protected` | Accessible inside the class and subclasses |

Example:

```
class BankAccount {
    public owner: string;
    private balance: number;

    constructor(owner: string, balance: number) {
        this.owner = owner;
        this.balance = balance;
    }
}
```

Usage:

```
const account = new BankAccount("Alex", 500);

console.log(account.owner);    // Valid

console.log(account.balance);  // Error
```

## **Exercise 1 – Bank Account**

Create a `BankAccount` class that represents a simple bank account.

### **Requirements**

Create a class named `BankAccount` with the following properties:

- `owner` – the account owner's name. This should be publicly accessible.
- `accountNumber` – the account number. This should be publicly accessible.
- `balance` – the current account balance. This should be private.

Use **constructor parameter properties** to declare and initialize `owner` and `accountNumber`.

Initialize `balance` in the constructor.

### **Implement the following methods**

**1.&#x20;**`deposit(amount: number): void`

- Add the specified amount to the account balance.
- Do not allow deposits of zero or negative amounts.

**2.&#x20;**`withdraw(amount: number): void`

- Subtract the specified amount from the account balance.
- Do not allow withdrawals of zero or negative amounts.
- Do not allow a withdrawal that exceeds the available balance.
- Display an appropriate message when a withdrawal cannot be completed.

**3.&#x20;**`getBalance(): number`

\- Return the current account balance.

### **Testing Your Class**

Create a `BankAccount` object and test the following operations:

```
const account = new BankAccount("Alex", 1001, 500);

console.log(account.owner);
console.log(account.accountNumber);

console.log(account.getBalance());

account.deposit(200);
console.log(account.getBalance());

account.withdraw(100);
console.log(account.getBalance());

account.withdraw(1000);
console.log(account.getBalance());

account.deposit(-50);
account.withdraw(-25);

console.log(account.getBalance());
```

Your program should demonstrate that valid transactions update the balance and invalid transactions do not.

## 47 – Inheritance and Access Modifiers

Consider a base class:

```
class Person {
    constructor(
        public name: string,
        protected age: number
    ) {}
}
```

A subclass:

```
class Student extends Person {
    constructor(name: string, age: number) {
        super(name, age);
    }

    displayAge(): void {
        console.log(this.age);
    }
}
```

The `age` property is accessible inside `Student` because it is protected.

However:

```
const student = new Student("Alex", 21);

console.log(student.age);  // Error
```

Protected properties are not accessible from outside the class hierarchy.

## 48 – readonly Class Properties

Properties can also be declared `readonly`.

```
class Student {
    constructor(
        public readonly studentId: number,
        public name: string
    ) {}
}
```

Now:

```
const student = new Student(1001, "Alex");

student.name = "Jordan";       // Valid

student.studentId = 2002;      // Error
```

A readonly property can generally be assigned during initialization, such as in the constructor, but not subsequently modified.

## 49 – Implementing Interfaces

A class can implement an interface.

```
interface Printable {
    print(): void;
}
```

A class that implements it must provide the required method.

```
class Report implements Printable {
    print(): void {
        console.log("Printing report...");
    }
}
```

We can now use the interface as a contract.

```
function printDocument(document: Printable): void {
    document.print();
}
```

Any object that provides a compatible `print()` method can be passed to this function.

This is an important example of TypeScript's structural type system.

## **Exercise 2 – Employee Management**

Create an interface named `Employee`.

It should contain:

- `id`: number
- `name`: string
- `department`: string

Create a class named `FullTimeEmployee` that implements `Employee`.

Requirements:

1. Use constructor parameter properties.
2. Add a `salary` property.
3. Add a method named `displayDetails()` that displays all employee information.
4. Create a second class named `PartTimeEmployee` that also implements `Employee`.
5. Add an `hourlyRate` and `hoursWorked` property to `PartTimeEmployee`.
6. Add a method named `calculatePay()` that returns the employee's pay.

Create one instance of each class and display their information.

Create a function named `displayEmployee()` that accepts an `Employee` parameter and works with instances of both classes.

# Part 7: Union Types and Type Narrowing

## 50 – Union Types

Sometimes a value can legitimately be more than one type.

For example, a function might accept either a number or a string.

TypeScript uses the pipe (`|`) symbol to define a union type.

```
let id: number | string;

id = 1001;

id = "STU-1001";
```

Both assignments are valid.

But:

```
id = true;  // Error
```

A union type means the value can be one of several specified types.

## 51 – Union Types in Functions

Consider a function that accepts either a number or a string.

```
function displayId(id: number | string): void {
    console.log(id);
}
```

Both calls are valid:

```
displayId(1001);

displayId("STU-1001");
```

But what if we want to perform different operations depending on the type?

For example, uppercase a string but leave a number unchanged.

We need to determine which type we are working with.

## 52 – Type Narrowing

TypeScript can narrow a variable's type based on conditional checks.

```
function displayId(id: number | string): void {

    if (typeof id === "string") {
        console.log(id.toUpperCase());
    }
    else {
        console.log(id.toFixed(0));
    }
}
```

Inside the `if` block, TypeScript knows that `id` is a string.

Inside the `else` block, TypeScript knows that `id` is a number.

This is called type narrowing.

TypeScript understands the relationship between conditional statements and variable types.

## 53 – The typeof Operator

JavaScript already has the `typeof` operator.

TypeScript uses it to help narrow types.

```
function process(value: string | number | boolean) {

    if (typeof value === "string") {
        console.log(value.toUpperCase());
    }
    else if (typeof value === "number") {
        console.log(value.toFixed(2));
    }
    else {
        console.log(value ? "Yes" : "No");
    }
}
```

Notice that we do not need type casts.

The compiler determines the type within each branch.

## **Exercise 3 – Flexible Calculator**

Create a function named `calculate()` that accepts two arguments.

Each argument can be either a number or a string.

Requirements:

1. Use the union type `number | string` for both parameters.
2. If both arguments are numbers, return their sum.
3. If both arguments are strings, concatenate them.
4. If one argument is a number and the other is a string, display an appropriate error message.
5. Use `typeof` to determine the types of the arguments.

Example calls:

```
calculate(10, 20);       // 30

calculate("Hello ", "World");  // Hello World

calculate(10, "20");     // Error message
```

## 54 – Literal Types

A type does not always have to represent an entire category of values.

We can specify exact allowed values.

```
let direction: "north" | "south" | "east" | "west";
```

Valid:

```
direction = "north";

direction = "west";
```

Invalid:

```
direction = "up";
```

Literal types are particularly useful for:

- Application states
- Configuration options
- Commands
- Status values
- Menu selections

## 55 – Combining Literal Types

Consider an order-processing system.

```
type OrderStatus =
    "pending" |
    "processing" |
    "shipped" |
    "delivered";
```

Now:

```
function updateStatus(status: OrderStatus): void {
    console.log(`Order status: ${status}`);
}
```

Valid:

```
updateStatus("shipped");
```

Invalid:

```
updateStatus("cancelled");
```

The compiler prevents us from accidentally using an unsupported status.

## **Exercise 4 – Literal Types and Application States**

Insert after ## 55

This applies literal types to a realistic application scenario.

### **Student Exercise – Task Management System**

Create a type named `TaskStatus`.

It should allow only these values:

- `"not-started"`
- `"in-progress"`
- `"completed"`
- `"on-hold"`

Create an interface named `Task` with:

- `id`: number
- `title`: string
- `status`: TaskStatus

Create a function named `updateTaskStatus()`.

Requirements:

1. Accept a `Task` object.
2. Accept a new status.
3. Update the task's status.
4. Display the updated task information.

Example:

```
const task: Task = {
    id: 1,
    title: "Complete TypeScript exercises",
    status: "not-started"
};

updateTaskStatus(task, "in-progress");

console.log(task.status);  // in-progress
```

Try assigning an invalid status:

```
updateTaskStatus(task, "started");
```

## 56 – The null and undefined Problem

JavaScript allows values to be `null` or `undefined`.

TypeScript can help us handle these cases explicitly.

With strict null checking enabled:

```
let name: string = "Alex";

name = null;  // Error
```

If a value can legitimately be missing, declare that possibility:

```
let name: string | null = "Alex";

name = null;  // Valid
```

Now we need to check for null before using string-specific methods.

```
if (name !== null) {
    console.log(name.toUpperCase());
}
```

This helps prevent common runtime errors.

## 57 – The Unknown Type

We previously saw `any`.

The `unknown` type is a safer alternative when we don't know what type of value we have.

```
let value: unknown;

value = 42;

value = "Hello";

value = true;
```

Unlike `any`, TypeScript does not let us perform arbitrary operations on an unknown value.

```
console.log(value.toUpperCase());  // Error
```

We must first establish its type.

```
if (typeof value === "string") {
    console.log(value.toUpperCase());
}
```

Key difference:

- `any` disables type checking.
- `unknown` requires us to check the type before using the value.
