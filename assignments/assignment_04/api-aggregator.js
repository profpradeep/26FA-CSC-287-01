// CSC-287: Asynchronous API Data Aggregator
//
// Optional starter code. You may use this file as a starting point
// or write your own implementation.

// Change this setting to compare execution modes.
const USE_CONCURRENT = false;

// API resources to retrieve.
const resources = [
    {
        name: "Posts",
        url: "https://dummyjson.com/posts?limit=0",
        collection: "posts"
    },
    {
        name: "Comments",
        url: "https://dummyjson.com/comments?limit=0",
        collection: "comments"
    },
    {
        name: "Products",
        url: "https://dummyjson.com/products?limit=0",
        collection: "products"
    },
    {
        name: "Users",
        url: "https://dummyjson.com/users?limit=0",
        collection: "users"
    }
];

/*
 * Retrieve one resource.
 *
 * TODO:
 * 1. Use fetch() to request resource.url.
 * 2. Check whether the HTTP response was successful.
 * 3. Convert the response body to JSON.
 * 4. Find the array identified by resource.collection.
 * 5. Return an object containing the resource name
 *    and number of records.
 */
async function fetchResource(resource) {
    // TODO: Implement this function.
}

/*
 * Retrieve every resource sequentially.
 *
 * TODO:
 * - Process resources one at a time.
 * - Wait for each request to complete before starting
 *   the next request.
 * - Return an array containing the results.
 */
async function fetchSequentially() {
    // TODO: Implement this function.
}

/*
 * Retrieve every resource concurrently.
 *
 * TODO:
 * - Start all requests without waiting for each one
 *   individually.
 * - Wait until all requests have completed.
 * - Return an array containing the results.
 */
async function fetchConcurrently() {
    // TODO: Implement this function.
}

/*
 * Display the results.
 *
 * TODO:
 * - Display each resource name and its record count.
 * - Calculate and display the total number of records.
 * - Display elapsed time in milliseconds.
 *
 * Both execution modes should use this same function.
 */
function displaySummary(results, elapsedTime) {
    // TODO: Implement this function.
}

/*
 * Main program.
 *
 * This function coordinates the other functions.
 */
async function main() {
    console.log(
        `Retrieval mode: ${USE_CONCURRENT ? "Concurrent" : "Sequential"}`
    );

    const startTime = performance.now();

    let results;

    if (USE_CONCURRENT) {
        results = await fetchConcurrently();
    } else {
        results = await fetchSequentially();
    }

    const elapsedTime = performance.now() - startTime;

    displaySummary(results, elapsedTime);
}

// Report errors rather than allowing an unhandled rejection.
main().catch(error => {
    console.error("An error occurred:", error.message);
});