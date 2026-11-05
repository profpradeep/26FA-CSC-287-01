# Asynchronous Programming in JavaScript

## 1 – What Is Asynchronous Programming?

- JavaScript normally executes code one statement at a time.
- Some operations take time to complete:
  - Reading data from a server.
  - Accessing a database.
  - Reading a file.
  - Waiting for a timer.
- We don't want the application to stop executing while waiting for these operations.
- Asynchronous programming allows JavaScript to start an operation and continue doing other work while waiting for its result.

Example: Fetching student information from a server shouldn't prevent the application from responding to user interactions.

## 2 – Synchronous vs. Asynchronous Code

Synchronous execution

- Each operation must finish before the next one begins.
- Long-running operations block subsequent execution.

```
console.log("Starting");

const result = performLongOperation();

console.log(result);
console.log("Finished");
```

Asynchronous execution

- Start an operation and continue executing other code.
- Process the result when the operation completes.

```
console.log("Starting");

performLongOperationAsync((result) => {
    console.log(result);
});

console.log("Finished");
```

Possible output:

```
Starting
Finished
Result of long operation
```

## 3 – Our Example: Retrieving Student Information

Throughout these slides, we'll use the same example:

Problem: Retrieve a student's information from a server and display their name and courses.

We'll simulate a server request using `setTimeout()`.

```
function getStudent(studentId, callback) {
    setTimeout(() => {
        const student = {
            id: studentId,
            name: "Alex Johnson",
            courses: ["CSC-120", "CSC-287"]
        };

        callback(student);
    }, 2000);
}
```

- `setTimeout()` simulates a request that takes 2 seconds.
- `callback` is a function that will execute when the request completes.
- The student object represents the server response.

## 4 – Approach 1: Callbacks

A callback is a function passed as an argument to another function.

- The receiving function calls the callback when an operation completes.
- Callbacks are commonly used for asynchronous operations.
- They allow us to specify what should happen after an operation finishes.

Example:

```
function greet(name, callback) {
    console.log("Hello, " + name);
    callback();
}

greet("Alex", () => {
    console.log("Welcome to class!");
});
```

Output:

```
Hello, Alex
Welcome to class!
```

## 5 – Retrieving Student Information with a Callback

Let's use our `getStudent()` function.

```
function getStudent(studentId, callback) {
    setTimeout(() => {
        const student = {
            id: studentId,
            name: "Alex Johnson",
            courses: ["CSC-120", "CSC-287"]
        };

        callback(student);
    }, 2000);
}

// Make the asynchronous request
getStudent(123, (student) => {
    console.log("Student:", student.name);
    console.log("Courses:", student.courses);
});

console.log("Request submitted...");
```

Possible output:

```
Request submitted...

// 2 seconds later:
Student: Alex Johnson
Courses: [ 'CSC-120', 'CSC-287' ]
```

Key idea: We pass a function to `getStudent()`. JavaScript calls that function when the student information becomes available.

## 6 – The Problem with Callbacks

What happens when we need to perform multiple asynchronous operations in sequence?

For example:

1. Retrieve a student.
2. Retrieve that student's courses.
3. Retrieve the details for each course.
4. Display the results.

Each operation depends on the result of the previous operation.

```
getStudent(123, (student) => {
    console.log("Student:", student.name);

    getCourses(student.id, (courses) => {
        console.log("Courses:", courses);

        getCourseDetails(courses[0], (details) => {
            console.log("Course details:", details);
        });
    });
});
```

- Each callback is nested inside another callback.
- Deep nesting makes code difficult to read and maintain.
- Error handling can become complicated.

This is commonly called callback hell or the pyramid of doom.

## 7 – Callback Hell

Asynchronous operations can create deeply nested code.

```
getStudent(123, (student) => {
    getCourses(student.id, (courses) => {
        getCourseDetails(courses[0], (details) => {
            getInstructor(details.instructorId, (instructor) => {
                console.log(student);
                console.log(courses);
                console.log(details);
                console.log(instructor);
            });
        });
    });
});
```

Problems:

- Difficult to follow the execution sequence.
- Difficult to handle errors consistently.
- Difficult to reuse and compose asynchronous operations.

We need a better approach.

## 8 – Approach 2: Promises

A Promise is an object representing the eventual completion or failure of an asynchronous operation.

A Promise can be in one of three states:

| State     | Description                       |
| --------- | --------------------------------- |
| Pending   | Operation has not completed yet.  |
| Fulfilled | Operation completed successfully. |
| Rejected  | Operation failed.                 |

Instead of passing a callback, an asynchronous function returns a Promise.

We can then attach functions to handle its result.

```
const promise = getStudent(123);

promise
    .then((student) => {
        console.log(student.name);
    })
    .catch((error) => {
        console.error(error);
    });
```

- `.then()` handles successful completion.
- `.catch()` handles errors.
- `.finally()` executes regardless of success or failure.

## 9 – Creating a Promise

We can rewrite our original `getStudent()` function to return a Promise.

Original callback implementation:

```
function getStudent(studentId, callback) {
    setTimeout(() => {
        const student = {
            id: studentId,
            name: "Alex Johnson",
            courses: ["CSC-120", "CSC-287"]
        };

        callback(student);
    }, 2000);
}
```

Promise implementation:

```
function getStudent(studentId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const student = {
                id: studentId,
                name: "Alex Johnson",
                courses: ["CSC-120", "CSC-287"]
            };

            resolve(student);
        }, 2000);
    });
}
```

Notice the changes:

- The function no longer accepts a callback.
- It returns a new `Promise`.
- `resolve()` indicates successful completion.
- `reject()` indicates failure.

## 10 – Using the Promise

Now we can retrieve the student information.

```
getStudent(123)
    .then((student) => {
        console.log("Student:", student.name);
        console.log("Courses:", student.courses);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
```

What's happening?

1. `getStudent(123)` returns a Promise.
2. `.then()` registers a function to execute when the Promise is fulfilled.
3. The student object is passed to that function.
4. `.catch()` handles a rejected Promise.

Important: `.then()` does not block execution. JavaScript continues running other code while waiting for the Promise to settle.

## 11 – Promise Chaining

Promises help solve the callback nesting problem.

We can chain multiple asynchronous operations using `.then()`.

```
getStudent(123)
    .then((student) => {
        console.log("Student:", student.name);
        return getCourses(student.id);
    })
    .then((courses) => {
        console.log("Courses:", courses);
        return getCourseDetails(courses[0]);
    })
    .then((details) => {
        console.log("Course details:", details);
    })
    .catch((error) => {
        console.error("Error:", error);
    });
```

- Each `.then()` receives the result returned by the previous `.then()`.
- Returning another Promise causes the next `.then()` to wait for it.
- A single `.catch()` can handle errors from any operation in the chain.

Much flatter and easier to read than nested callbacks!

## 12 – Promise Error Handling

Promises provide a consistent way to handle errors.

We use `reject()` when an asynchronous operation fails.

```
function getStudent(studentId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (studentId <= 0) {
                reject(new Error("Invalid student ID"));
                return;
            }

            const student = {
                id: studentId,
                name: "Alex Johnson",
                courses: ["CSC-120", "CSC-287"]
            };

            resolve(student);
        }, 2000);
    });
}
```

Using the function:

```
getStudent(-1)
    .then((student) => {
        console.log(student.name);
    })
    .catch((error) => {
        console.error(error.message);
    });
```

Output:

```
Invalid student ID
```

- `resolve(value)` fulfills the Promise.
- `reject(error)` rejects the Promise.
- A rejected Promise skips subsequent `.then()` handlers and moves to `.catch()`.

## 13 – Approach 3: Async/Await

Promises improve asynchronous programming, but long chains of `.then()` can still become difficult to follow.

JavaScript provides async/await as a cleaner way to work with Promises.

- `async` declares an asynchronous function.
- `await` pauses execution within that function until a Promise settles.
- The result of a fulfilled Promise is returned directly.
- A rejected Promise throws an exception.

The important distinction:

Async/await does not replace Promises. It provides a more readable way to work with them.

## 14 – Rewriting Our Example with Async/Await

Promise approach:

```
getStudent(123)
    .then((student) => {
        console.log("Student:", student.name);
        console.log("Courses:", student.courses);
    })
    .catch((error) => {
        console.error(error);
    });
```

Async/await approach:

```
async function displayStudent() {
    try {
        const student = await getStudent(123);

        console.log("Student:", student.name);
        console.log("Courses:", student.courses);
    }
    catch (error) {
        console.error(error);
    }
}

displayStudent();
```

Notice:

- We declare the function using `async`.
- We use `await` when calling `getStudent()`.
- The result is assigned directly to `student`.
- We use familiar `try/catch` error handling.

## 15 – What Does Await Actually Do?

Consider this code:

```
async function displayStudent() {
    console.log("Starting request...");

    const student = await getStudent(123);

    console.log("Student:", student.name);
    console.log("Finished!");
}

displayStudent();

console.log("Other code...");
```

Possible output:

```
Starting request...
Other code...

// 2 seconds later:
Student: Alex Johnson
Finished!
```

Important points:

- `await` suspends the execution of the current async function.
- It does NOT block the entire JavaScript application.
- Other JavaScript code can continue executing.
- Once the Promise settles, execution resumes inside the async function.

## 16 – Async/Await with Multiple Operations

Let's revisit our sequence of asynchronous operations.

Promise approach:

```
getStudent(123)
    .then((student) => {
        return getCourses(student.id);
    })
    .then((courses) => {
        return getCourseDetails(courses[0]);
    })
    .then((details) => {
        console.log(details);
    })
    .catch((error) => {
        console.error(error);
    });
```

Async/await approach:

```
async function displayStudentDetails() {
    try {
        const student = await getStudent(123);

        const courses = await getCourses(student.id);

        const details = await getCourseDetails(courses[0]);

        console.log(details);
    }
    catch (error) {
        console.error(error);
    }
}

displayStudentDetails();
```

The async/await version reads much like ordinary synchronous code.

Each operation waits for the previous operation to complete before continuing.

## 17 – Async Functions Always Return Promises

An important rule:

Every function declared with `async` returns a Promise.

Even if you return an ordinary value, JavaScript wraps it in a fulfilled Promise.

```
async function getNumber() {
    return 42;
}

getNumber().then((value) => {
    console.log(value);
});
```

Output:

```
42
```

This is effectively equivalent to:

```
function getNumber() {
    return Promise.resolve(42);
}
```

You can also use `await` when calling an async function:

```
const number = await getNumber();
```

(Remember: `await` must be inside an async function or at the top level of an ES module.)

## 18 – Running Asynchronous Operations in Parallel

Consider retrieving information from two independent sources.

Sequential execution:

```
async function loadData() {
    const student = await getStudent(123);
    const instructor = await getInstructor(456);

    console.log(student);
    console.log(instructor);
}
```

- The second request doesn't start until the first one finishes.
- If each request takes 2 seconds, total time is approximately 4 seconds.

Parallel execution with Promise.all():

```
async function loadData() {
    const [student, instructor] = await Promise.all([
        getStudent(123),
        getInstructor(456)
    ]);

    console.log(student);
    console.log(instructor);
}
```

- Both requests start without waiting for each other.
- `Promise.all()` fulfills when all supplied Promises fulfill.
- If any Promise rejects, the returned Promise rejects.
- Total time is approximately 2 seconds in our example.

## 19 – Comparing the Three Approaches

The same asynchronous operation: retrieve a student and display their name.

1\. Callbacks

```
getStudent(123, (student) => {
    console.log(student.name);
});
```

2\. Promises

```
getStudent(123)
    .then((student) => {
        console.log(student.name);
    });
```

3\. Async/await

```
async function displayStudent() {
    const student = await getStudent(123);
    console.log(student.name);
}

displayStudent();
```

| Approach    | Main characteristic                             |
| ----------- | ----------------------------------------------- |
| Callbacks   | Pass a function to execute later.               |
| Promises    | Return an object representing a future result.  |
| Async/await | Write Promise-based code in a sequential style. |

## 20 – The Evolution of Asynchronous JavaScript

Callbacks

Function passed as an argument

```
getStudent(123, (student) => {
    console.log(student.name);
});
```

Simple, but nested callbacks can become difficult to manage.

Promises

.then() / .catch()

```
getStudent(123)
    .then(student => console.log(student.name))
    .catch(error => console.error(error));
```

Chain operations and handle errors consistently.

Async/await

Modern approach

```
const student = await getStudent(123);
console.log(student.name);
```

Cleaner syntax for working with Promises.

Takeaway: Async/await is generally the preferred syntax for writing modern asynchronous JavaScript, but understanding callbacks and Promises is essential because they remain fundamental to the JavaScript ecosystem.

## 21 – In-Class Exercise

Modify the student example.

Write an asynchronous function that:

1. Calls `getStudent(123)` to retrieve a student.
2. Displays the student's name.
3. Displays each course the student is enrolled in.
4. Handles any errors using `try/catch`.
5. Displays `"Student information retrieved!"` after successfully displaying the information.

Additional challenge:

- Modify `getStudent()` so that it rejects the Promise when the student ID is negative.
- Test the function with both a valid and invalid student ID.

## 22 – Key Takeaways

- JavaScript uses asynchronous programming to handle operations that take time without blocking the application.
- Callbacks allow us to execute code after an operation completes.
- Promises represent the eventual success or failure of an asynchronous operation.
- Async/await provides a cleaner syntax for working with Promises.
- Use `try/catch` to handle errors with async/await.
- Use `Promise.all()` when independent asynchronous operations can run concurrently.

Remember: Async/await is built on Promises, and Promises can be implemented using callbacks. Each approach builds on the concepts introduced by the previous one.