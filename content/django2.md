# Django API Part II

##  1 — Where We Go Next

### Django REST API: Part II

So far, we have:

- Created a Django REST API
- Created a `Topic` model
- Used a serializer to convert models to JSON
- Created API endpoints with a `ViewSet`
- Used a router to create URLs
- Tested `GET` requests in the browser

### Today we will learn:

- `POST` — create new data
- `PATCH` — modify existing data
- `DELETE` — remove data
- HTTP status codes
- Sending JSON to an API
- Testing different HTTP methods
- How clients communicate with an API


---

##  2 — GET Is Only One Part of an API

We previously used:

```text
GET /api/topics/
```

This means:

> "Give me the topics."

But a complete API needs to allow clients to change data.

| HTTP Method | Purpose | Example |
|---|---|---|
| GET | Read | Get all topics |
| POST | Create | Create a new topic |
| PUT | Replace | Replace a topic |
| PATCH | Modify | Change part of a topic |
| DELETE | Delete | Remove a topic |

These operations are often described as **CRUD**:

- **C**reate
- **R**ead
- **U**pdate
- **D**elete


---

##  3 — The API Is a Contract

A client does not need to know how Django works internally.

It only needs to know:

> "If I send this HTTP request, I will get this response."

For example:

```text
GET /api/topics/
```

might return:

```json
[
    {
        "id": 1,
        "name": "Python",
        "description": "Programming with Python"
    },
    {
        "id": 2,
        "name": "Django",
        "description": "Building web applications with Django"
    }
]
```

The client does not need to know:

- How Django queries the database
- Which database is being used
- How the model is implemented
- How the serializer works

It only needs to understand the **API contract**.


---

##  4 — Creating Data with POST

`GET` asks the server for data.

`POST` sends data to the server to create a new resource.

For example:

```text
POST /api/topics/
```

with JSON:

```json
{
    "name": "JavaScript",
    "description": "Programming for the web"
}
```

The server creates a new `Topic`.

The database might now contain:

```text
1  Python
2  Django
3  React
4  JavaScript
```

The important idea:

> `POST` asks the server to create a new resource.


---

##  5 — POST Request and Response

A `POST` request contains two important pieces:

### URL

```text
/api/topics/
```

### Request body

```json
{
    "name": "JavaScript",
    "description": "Programming for the web"
}
```

The server processes the request.

It might respond with:

```json
{
    "id": 4,
    "name": "JavaScript",
    "description": "Programming for the web"
}
```

Notice:

> The server assigned the `id`.

The client did not need to choose one.


---

##  6 — Try POST in the Browsable API

Open:

```text
http://127.0.0.1:8000/api/topics/
```

The Django REST Framework Browsable API provides a form for creating a new topic.

Enter:

```text
Name:
JavaScript

Description:
Programming for the web
```

Submit the request.

Then perform:

```text
GET /api/topics/
```

### Question

What changed?

**Answer:**

A new record was created in the database and now appears in the API response.


---

##  7 — POST vs GET

Compare these two requests:

### GET

```text
GET /api/topics/
```

> "Give me the topics."

### POST

```text
POST /api/topics/
```

> "Create a new topic using this data."

Notice that the URL is the same.

The **HTTP method** tells the server what we want to do.

### Important idea

> The URL identifies the resource.  
> The HTTP method describes the operation.


---

##  8 — What Happens When We POST?

Let's follow the request through Django.

```text
POST /api/topics/
        │
        ▼
     Router
        │
        ▼
  TopicViewSet
        │
        ▼
 TopicSerializer
        │
        ▼
     Topic Model
        │
        ▼
     Database
```

Django REST Framework handles much of this for us.

Our `ModelViewSet` provides the standard CRUD behavior.


---

##  9 — Updating Data

Suppose we have:

```json
{
    "id": 2,
    "name": "Django",
    "description": "Building web applications with Django"
}
```

We want to change the description.

The resource URL is:

```text
/api/topics/2/
```

We can use:

```text
PATCH /api/topics/2/
```

with:

```json
{
    "description": "Building APIs with Django"
}
```

Only the description needs to be supplied.


---

##  10 — PATCH Means "Change Part of It"

`PATCH` is useful when we only want to change some fields.

Current object:

```json
{
    "id": 2,
    "name": "Django",
    "description": "Building web applications with Django"
}
```

PATCH:

```json
{
    "description": "Building APIs with Django"
}
```

Result:

```json
{
    "id": 2,
    "name": "Django",
    "description": "Building APIs with Django"
}
```

The `name` did not change.


---

##  11 — PATCH vs PUT

You will often see both:

```text
PUT
PATCH
```

### PUT

Generally means:

> Replace the resource.

### PATCH

Generally means:

> Modify part of the resource.

For example:

```text
PATCH /api/topics/2/
```

```json
{
    "description": "Building APIs with Django"
}
```

For our Learning Log API, we will primarily use **PATCH when making partial updates**.


---

##  12 — Try PATCH

Using the Browsable API:

1. Open:
   ```text
   http://127.0.0.1:8000/api/topics/2/
   ```
2. Change the description.
3. Submit the request.
4. Refresh the page.

For example:

```text
Building APIs with Django
```

### Question

Did the `name` change?

**Answer:**

No.

`PATCH` changed only the field we supplied.


---

##  13 — Deleting Data

What if we no longer want a topic?

Use:

```text
DELETE
```

For example:

```text
DELETE /api/topics/4/
```

This means:

> Delete the topic whose ID is 4.


---

##  14 — DELETE Request

A DELETE request normally does not need a request body.

```text
DELETE /api/topics/4/
```

The server:

1. Finds topic `4`
2. Deletes it
3. Saves the change to the database
4. Returns an HTTP response

Afterward:

```text
GET /api/topics/
```

will no longer include topic `4`.


---

##  15 — Try DELETE

Using the Browsable API:

1. Create a test topic.
2. Find its ID.
3. Open that topic's URL.
4. Use the `DELETE` option.
5. Confirm the deletion.
6. Return to `/api/topics/`.

### Question

What happened to the record?

**Answer:**

It was removed from the database and no longer appears in the API response.


---

##  16 — HTTP Status Codes

The server does more than return JSON.

It also returns an **HTTP status code**.

Some common status codes:

| Code | Meaning |
|---|---|
| 200 | OK |
| 201 | Created |
| 204 | No Content |
| 400 | Bad Request |
| 404 | Not Found |
| 500 | Server Error |

For example:

```text
POST /api/topics/
```

might return:

```text
201 Created
```

because a new resource was successfully created.


---

##  17 — Status Codes Tell the Client What Happened

Imagine a client sends:

```text
GET /api/topics/2/
```

The server might respond:

```text
200 OK
```

Meaning:

> "Here is the topic."

But if the client requests:

```text
GET /api/topics/999/
```

the server might respond:

```text
404 Not Found
```

Meaning:

> "There is no topic with that ID."

### The status code provides information about the result of the request.


---

##  18 — Exercise: Predict the Response

Assume our API contains topics with IDs:

```text
1
2
3
```

What should happen for each request?

| Request | Expected result |
|---|---|
| `GET /api/topics/1/` | ? |
| `GET /api/topics/999/` | ? |
| `POST /api/topics/` | ? |
| `PATCH /api/topics/2/` | ? |
| `DELETE /api/topics/3/` | ? |

### Discuss with a partner

For each request:

1. What does the client want?
2. What will the server do?
3. What status code would you expect?


---

##  19 — The Browser Is a Limited API Client

We can easily test:

```text
GET
```

by entering a URL in a browser.

For example:

```text
http://127.0.0.1:8000/api/topics/
```

But a normal browser address bar cannot easily send:

```text
POST
PATCH
DELETE
```

with a JSON request body.

That's why the **Django REST Framework Browsable API** is useful.

It gives us a convenient interface for testing different types of requests.


---

##  20 — An API Can Have Many Clients

An API is designed to communicate with **clients**.

A client could be:

- A web application
- A mobile application
- A command-line program
- A desktop application
- Another server
- An automated script

All of them can communicate with our API using:

```text
HTTP + JSON
```

The Django backend does not need to know exactly what type of client is making the request.


---

##  21 — One API, Multiple Clients

```text
                 ┌─────────────────┐
                 │ Web Application │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │                 │
                 │  Django REST    │
                 │      API        │
                 │                 │
                 └────────┬────────┘
                          │
                 ┌────────▼────────┐
                 │    Database     │
                 └─────────────────┘
                          ▲
                          │
                 ┌────────┴────────┐
                 │                 │
          ┌──────┴──────┐   ┌─────┴──────┐
          │ Mobile App  │   │ CLI Program│
          └─────────────┘   └────────────┘
```

The API provides a common interface to the application.

**The clients can change without requiring the database or business logic to change.**


---

##  22 — The Client Doesn't Talk Directly to the Database

Our architecture is:

```text
┌──────────────────────┐
│ Client               │
│                      │
│ Web / Mobile / CLI   │
└──────────┬───────────┘
           │
           │ HTTP / JSON
           ▼
┌──────────────────────┐
│ Django REST API      │
│                      │
│ Routing              │
│ ViewSets             │
│ Serializers          │
│ Models               │
└──────────┬───────────┘
           │
           │ ORM
           ▼
┌──────────────────────┐
│ Database             │
└──────────────────────┘
```

The client should **not** connect directly to the database.

The API is the boundary between the client and backend.


---

##  23 — Why Have an API?

Separating the client and backend gives us flexibility.

The same API could be used by:

- A web application
- A mobile application
- A command-line program
- Another server
- Automated scripts
- Other services

All of them can communicate using:

```text
HTTP + JSON
```

The backend provides a consistent interface regardless of the client.


---

##  24 — What We Have Built

We now have:

```text
GET     /api/topics/
GET     /api/topics/1/

POST    /api/topics/

PATCH   /api/topics/1/

DELETE  /api/topics/1/
```

These endpoints allow clients to perform CRUD operations.

And we did this with relatively little code:

- Model
- Serializer
- ViewSet
- Router


---

##  25 — How Does the ViewSet Do All That?

Our view is still:

```python
class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
```

Yet it supports:

```text
GET
POST
PATCH
PUT
DELETE
```

Why?

Because `ModelViewSet` provides standard implementations for these operations.

We don't have to write each operation ourselves.


---

##  26 — What the ViewSet Gives Us

Conceptually, the `ModelViewSet` provides operations similar to:

```text
list()
retrieve()
create()
update()
partial_update()
destroy()
```

These correspond roughly to:

| Operation | HTTP |
|---|---|
| list | GET collection |
| retrieve | GET one |
| create | POST |
| update | PUT |
| partial_update | PATCH |
| destroy | DELETE |

DRF connects these operations to our URLs automatically.


---

##  27 — Exercise: Explore the API

Using the Browsable API, perform the following:

### 1. Create

Create a new topic.

### 2. Read

View the list of topics.

### 3. Update

Change the description of one topic.

### 4. Delete

Delete a topic.

### 5. Verify

Use:

```text
GET /api/topics/
```

to verify your changes.


---

##  28 — Exercise: Think Like an API Client

Imagine you are writing a program that needs to display all topics.

### What request should it send?

```text
____________________________
```

### What HTTP method?

```text
____________________________
```

### What will the server return?

```text
____________________________
```

### What format?

```text
____________________________
```

**Answers:**

```text
GET /api/topics/
```

```text
HTTP GET
```

```text
A list of topics
```

```text
JSON
```


---

##  29 — The API Doesn't Care Who the Client Is

Consider this request:

```text
GET /api/topics/
```

The Django API doesn't need to know whether the request came from:

```text
A web browser
A mobile application
A command-line program
Another server
A future application we haven't built yet
```

The API simply follows its contract:

```text
Request
   ↓
Process request
   ↓
Return response
```

This is one of the major advantages of an API-based architecture.


---

##  30 — The Big Picture

We started with:

```text
Django
```

and learned how to:

```text
Model data
     ↓
Store data
     ↓
Expose data through an API
     ↓
Return JSON
     ↓
Accept JSON
     ↓
Create / Read / Update / Delete
```

The important idea is not simply:

> "How do I use Django?"

It is:

> **How do separate software components communicate with each other?**

Our answer is:

```text
HTTP + JSON + APIs
```


---

##  31 — What Comes Next?

We now have a working backend.

```text
┌──────────────────────┐
│      Client          │
│                      │
│      later...        │
└──────────┬───────────┘
           │
           │ HTTP / JSON
           ▼
┌──────────────────────┐
│   Django REST API    │
└──────────┬───────────┘
           │
           ▼
┌──────────────────────┐
│      Database        │
└──────────────────────┘
```

For now, the important thing is understanding the **API and backend**.

Later in the course, we will build a client that communicates with this API.

The API we are building now will become the foundation for that work.