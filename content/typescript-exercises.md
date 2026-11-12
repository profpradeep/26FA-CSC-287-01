# In-Class Exercises: TypeScript – Functions, Type Aliases, and Interfaces

## Part 4: Functions and TypeScript

### Exercise 1 – Add Parameter and Return Types


The following JavaScript function calculates the total cost of an order.

```
function calculateTotal(price, quantity) {
    return price * quantity;
}
```

Tasks:

1. Convert this function to TypeScript.
2. Specify the types of both parameters.
3. Explicitly specify the return type.
4. Try calling the function with the following arguments. Which calls produce compiler errors?

```
calculateTotal(19.99, 3);
calculateTotal(10, 5);
calculateTotal("19.99", 3);
calculateTotal(10, "five");
```

Discussion: What advantage does TypeScript provide here that JavaScript does not?


### Exercise 2 – Arrow Functions
Convert the following JavaScript functions to TypeScript arrow functions.

```
function getFullName(firstName, lastName) {
    return firstName + " " + lastName;
}

function isPassing(grade) {
    return grade >= 60;
}
```

Tasks:

1. Convert both functions to arrow functions.
2. Add parameter types.
3. Add explicit return types.
4. Rewrite `getFullName` using an expression body.
5. Remove the explicit return types. Does TypeScript still know what the functions return?

```

### Exercise 3 – Default and Optional Parameters

Write a function named `createGreeting`.

It should:

- Accept a required `name` parameter of type `string`.
- Accept an optional `greeting` parameter of type `string`.
- Use `"Hello"` as the default greeting.
- Return a string in the format `"Hello, Alex!"`.

Test it using these calls:

```
createGreeting("Alex");

createGreeting("Jordan", "Welcome");

createGreeting("Taylor", undefined);
```

Additional challenge:

What happens if you try this?

```
createGreeting("Alex", 42);
```

---

### Exercise 4 – Functions as Parameters

Write a function called `performOperation`.

It should accept:

- Two numbers.
- A function that accepts two numbers and returns a number.

The function should call the supplied function using the two numbers and return the result.

Then create three functions:

- `add` – adds two numbers.
- `subtract` – subtracts the second number from the first.
- `multiply` – multiplies two numbers.

Test your implementation:

```
console.log(performOperation(10, 5, add));
// 15

console.log(performOperation(10, 5, subtract));
// 5

console.log(performOperation(10, 5, multiply));
// 50
```

Additional challenge:

Instead of passing a named function, pass an arrow function directly:

```
performOperation(10, 5, (a, b) => a / b);
```

What type does TypeScript infer for `a` and `b`?

---

## Part 5: Type Aliases and Interfaces

### Exercise 5 – Eliminate Repeated Object Types

Consider these two functions:

```
function displayStudent(student: {
    name: string;
    age: number;
    major: string;
}): void {
    console.log(student.name);
    console.log(student.major);
}

function isAdult(student: {
    name: string;
    age: number;
    major: string;
}): boolean {
    return student.age >= 18;
}
```

Tasks:

1. Create a type alias called `Student` that represents the object structure.
2. Modify both functions to use the new type.
3. Create a student object and pass it to both functions.
4. Add a `gpa` property to the `Student` type. What happens if you don't add that property to your existing student object?


---

### Exercise 6 – Type Aliases Beyond Objects

Create the following type aliases:

```
type StudentID = number;
type CourseCode = string;
type Grade = number;
```

Then declare these variables:

```
let studentID: StudentID = 1001;
let course: CourseCode = "CSC-284";
let grade: Grade = 95;
```

Tasks:

1. Try assigning a string to `studentID`.
2. Try assigning a number to `course`.
3. Try assigning `studentID` to `grade`.
4. Explain why the third assignment is allowed.


---

### Exercise 7 – Type Alias or Interface?

Suppose we want to represent people at a college.

Create the following structures:

Person

- `name`: string
- `email`: string

Student

- `studentId`: number
- `major`: string

Instructor

- `employeeId`: number
- `department`: string

Tasks:

1. Define `Person` as an interface.
2. Define `Student` as an interface that extends `Person`.
3. Define `Instructor` as an interface that extends `Person`.
4. Create one student and one instructor object.
5. Write a function called `displayPerson` that accepts a `Person` and displays their name and email.
6. Pass both objects to `displayPerson`.

---

### Exercise 8 – Extending Multiple Interfaces

A teaching assistant is both a student and an employee.

Define these interfaces:

```
interface Person {
    name: string;
}

interface Student {
    studentId: number;
    major: string;
}

interface Employee {
    employeeId: number;
    department: string;
}
```

Tasks:

1. Create an interface named `TeachingAssistant`.
2. Extend `Person`, `Student`, and `Employee`.
3. Add a `course` property of type `string`.
4. Create a `TeachingAssistant` object.
5. Write a function that accepts a `TeachingAssistant` and displays all of its properties.
