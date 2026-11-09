# Assignment: Asynchronous API Data Aggregator
Write a JavaScript command-line application that retrieves data from multiple REST APIs, processes the returned JSON data, and displays a summary.

You can use JavaScript's built-in `fetch()` function to retrieve data from public APIs.

- **Sequential processing:** Retrieve data from one API and wait for the response before requesting the next API.
- **Concurrent processing:** Initiate multiple API requests and wait for all of them to complete.

Implement both approaches using essentially the same code. You should be able to switch between them by changing a single setting in your program, or can be a command line argument.

NOTE: You may use the included  [api-aggregator.js](./api-aggregator.js) file in this folder as a starting point.

## 1. API Resources

Use the following public REST API endpoints provided by DummyJSON:

| Resource | API Endpoint                                                                     |
| -------- | -------------------------------------------------------------------------------- |
| Posts    | [https://dummyjson.com/posts?limit=0](https://dummyjson.com/posts?limit=0)       |
| Comments | [https://dummyjson.com/comments?limit=0](https://dummyjson.com/comments?limit=0) |
| Products | [https://dummyjson.com/products?limit=0](https://dummyjson.com/products?limit=0) |
| Users    | [https://dummyjson.com/users?limit=0](https://dummyjson.com/users?limit=0)       |

These endpoints return JSON objects containing collections of records.

API documentation: [https://dummyjson.com/docs](https://dummyjson.com/docs)

No API key or registration is required.

## 2. Program Requirements

Create a JavaScript program named `api-aggregator.js`.

Your application must:

1. Retrieve data from all four API endpoints.
2. Check that each HTTP response was successful.
3. Convert each response into a JavaScript object.
4. Extract the collection of records from each response.
5. Calculate the number of records retrieved from each resource.
6. Calculate the total number of records retrieved.
7. Display a summary of the results.
8. Display the total execution time.

Your program should display output similar to:

```
Starting API Data Aggregator...

Fetching posts...
Fetching comments...
Fetching products...
Fetching users...

--- Data Summary ---
Posts:     251
Comments:  340
Products:  194
Users:     208

Total records retrieved: 993

Analysis complete in 4.25 seconds.
```

The counts and execution time shown above are illustrative.

## 3. Sequential and Concurrent Processing

Your program must support two execution modes.

**Mode 1: Sequential**

- Retrieve one API resource at a time.
- Wait for each request to complete before starting the next.
- Process all four resources.

**Mode 2: Concurrent**

- Initiate all four API requests without waiting for previous requests to complete.
- Wait for all requests to finish before processing the results.

Both modes must produce the same summary.

Reuse as much code as possible between the two modes.

Ideally, switching between sequential and concurrent processing should require changing only a single setting in your program.

Do not create two separate programs.

## 4. Performance Comparison

Run your application twice:

1. Execute it using sequential processing.
2. Change your configuration setting and execute it again using concurrent processing.

Run each version at least three times and compare the results.

Save this the results to the table defined in the [results.md](./results.md) file in this folder.