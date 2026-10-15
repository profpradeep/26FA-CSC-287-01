# Django REST API

## 1 — Goal

We will build a simple **REST API** using Django.

Ultimately, we will have an API that can:

- Store data in a database
- Return data as JSON
- Respond to HTTP requests
- Be tested directly from a web browser
- Eventually be consumed by a React application

Our goal is to build the **backend** first.

---

## 2 — Modern Web Application Architecture

A modern web application is usually divided into several parts.

```text
┌─────────────────────┐
│   Frontend / Client │
│                     │
│   React, Vue, etc.  │
└──────────┬──────────┘
           │
           │ HTTP / JSON
           ▼
┌─────────────────────┐
│       Backend       │
│                     │
│ Node.js, Django,    │
│ Java, .NET, etc.    │
└──────────┬──────────┘
           │
           │
           ▼
┌─────────────────────┐
│      Database       │
│                     │
│ PostgreSQL, MySQL,  │
│ SQLite, etc.        │
└─────────────────────┘
```

Each part has a different responsibility:

- **Frontend** — what the user interacts with
- **Backend** — application logic and APIs
- **Database** — persistent application data

---

## 3 — The Frontend

The **frontend** runs on the user's device.

It is responsible for:

- Displaying the user interface
- Responding to user interactions
- Sending requests to the backend
- Displaying data returned by the backend

Common technologies include:

- HTML
- CSS
- JavaScript
- React
- TypeScript

For example, a React application might display:

```text
Learning Log

Topics
────────────────────
Python
Django
React

[ Add Topic ]
```

The frontend does **not** need to know how the database stores the topics.

---

## 4 — The Backend

The **backend** runs on a server.

It is responsible for:

- Receiving HTTP requests
- Routing requests to the appropriate code
- Implementing application logic
- Reading and changing data
- Returning responses

For example:

```text
GET /api/topics/
```

The backend might:

```text
Receive Request
      ↓
Determine the Route
      ↓
Run Application Logic
      ↓
Retrieve Data
      ↓
Return JSON
```

Common backend technologies include:

- Django / Python
- Node.js / JavaScript
- Java / Spring
- C# / ASP.NET
- Ruby / Rails

In this course, we will use **Django** to build our API.

---

## 5 — The Database

The **database** stores information that needs to persist.

For our Learning Log:

```text
Topics
────────────────────────────
id    name       description
1     Python     ...
2     Django     ...
3     React      ...
```

The backend communicates with the database.

The frontend normally **does not communicate directly with the database**.

Instead:

```text
Frontend
    │
    │ HTTP
    ▼
Backend / API
    │
    │ Database queries
    ▼
Database
```

This separation provides security, organization, and control over how application data is accessed.

---

## 6 — Putting It All Together

Let's follow a request through a modern web application.

A user opens the Learning Log application and asks to see the topics.

```text
        User
         │
         ▼
┌─────────────────┐
│     React       │
│    Frontend     │
└────────┬────────┘
         │
         │ GET /api/topics/
         ▼
┌─────────────────┐
│     Django      │
│   REST API      │
└────────┬────────┘
         │
         │ Query database
         ▼
┌─────────────────┐
│    Database     │
└────────┬────────┘
         │
         │ Topic data
         ▼
┌─────────────────┐
│     Django      │
│   REST API      │
└────────┬────────┘
         │
         │ JSON
         ▼
┌─────────────────┐
│     React       │
│    Frontend     │
└─────────────────┘
```

### The important idea

**The frontend and backend communicate through an API.**

```text
React  ←──── HTTP / JSON ────→  Django API  ←────→  Database
```

Later in the course, we will build the **React frontend** that consumes the Django API we are building now.

## 7 — Where Are We Going?

Eventually, our application will look something like this:

```text
React Frontend
      │
      │ HTTP / JSON
      ▼
Django REST API
      │
      │
      ▼
   Database
```

Later in the course:

```text
React
  │
  │ fetch()
  ▼
Django REST API
  │
  ▼
Database
```

The frontend and backend communicate using **HTTP**.

---

## 8 — What Is an API?

**API = Application Programming Interface**

An API provides a way for one program to communicate with another program.

For a web API:

```text
Client                         Server

   │                              │
   │──── HTTP Request ───────────>│
   │                              │
   │<──── HTTP Response ──────────│
   │                              │
```

The client might be:

- A web browser
- A React application
- A mobile application
- Another server

---

## 9 — REST APIs

A REST API organizes information into **resources**.

For example, a Learning Log might have:

```text
Topics
Entries
Users
```

We can represent these resources with URLs:

```text
/api/topics/
/api/entries/
/api/users/
```

The HTTP method tells the server what we want to do.

| Method | Purpose |
|---|---|
| GET | Retrieve data |
| POST | Create data |
| PUT/PATCH | Modify data |
| DELETE | Delete data |

Today we'll concentrate primarily on **GET** requests.

---

## 10 — What Does a GET Request Look Like?

Suppose our API provides:

```text
http://127.0.0.1:8000/api/topics/
```

When we visit that URL in a browser, the browser sends approximately:

```text
GET /api/topics/ HTTP/1.1
Host: 127.0.0.1:8000
```

The server processes the request and sends back a response.

For example:

```json
[
    {
        "id": 1,
        "name": "Python"
    },
    {
        "id": 2,
        "name": "Django"
    }
]
```

The response is **JSON**.

---

## 11 — Let's Build It

Our API will manage:

**Topics**

Each topic will have:

```text
id
name
description
```

For example:

```json
{
    "id": 1,
    "name": "Python",
    "description": "Programming with Python"
}
```

We will eventually be able to request:

```text
GET /api/topics/
```

and:

```text
GET /api/topics/1/
```

---

## 12 — Install Django

Create a directory for the project:

```text
mkdir learning_log
cd learning_log
```

Install Django:

```text
python -m pip install django
```

Install Django REST Framework:

```text
python -m pip install djangorestframework
```

Django REST Framework is the library we will use to build our API.

---

## 13 — Create the Django Project

Create the project:

```text
python -m django startproject learning_log .
```

Notice the `.` at the end.

The project structure should now look approximately like:

```text
learning_log/
│
├── manage.py
│
└── learning_log/
    ├── __init__.py
    ├── settings.py
    ├── urls.py
    ├── asgi.py
    └── wsgi.py
```

---

## 14 — Create the Application

A Django **project** can contain multiple applications.

Create an application called `topics`:

```text
python manage.py startapp topics
```

We now have:

```text
learning_log/
│
├── manage.py
│
├── learning_log/
│
└── topics/
    ├── admin.py
    ├── apps.py
    ├── models.py
    ├── tests.py
    ├── views.py
    └── migrations/
```

---

## 15 — Add the Apps

Open:

```text
learning_log/settings.py
```

Find:

```python
INSTALLED_APPS = [
```

Add:

```python
'rest_framework',
'topics',
```

For example:

```python
INSTALLED_APPS = [
    'rest_framework',
    'topics',

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
]
```

`rest_framework` tells Django that we are using Django REST Framework.

---

## 16 — Set Up the Database

Django uses SQLite by default for a new project.

Run:

```text
python manage.py migrate
```

This creates the database tables needed by Django.

We will add our own tables shortly.

---

## 17 — Create Our Model

Open:

```text
topics/models.py
```

Add:

```python
from django.db import models


class Topic(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
```

Our model represents a topic in the database.

```text
Topic
----------------
id
name
description
```

---

## 18 — Create the Database Table

We changed our model, so Django needs to update the database.

First:

```text
python manage.py makemigrations
```

Then:

```text
python manage.py migrate
```

Think of a migration as:

> Instructions for changing the database to match our models.

---

## 19 — What Is a Serializer?

Our database contains **Python objects**.

Our API needs to send **JSON**.

A serializer helps convert between these representations:

```text
Django Model
     │
     │ Serializer
     ▼
   JSON
```

For example:

```python
Topic(
    id=1,
    name="Python",
    description="Programming with Python"
)
```

becomes:

```json
{
    "id": 1,
    "name": "Python",
    "description": "Programming with Python"
}
```

DRF's `ModelSerializer` is designed specifically to simplify this process for Django models.

---

## 20 — Create the Serializer

Create a new file:

```text
topics/serializers.py
```

Add:

```python
from rest_framework import serializers
from .models import Topic


class TopicSerializer(serializers.ModelSerializer):

    class Meta:
        model = Topic
        fields = ['id', 'name', 'description']
```

The serializer tells DRF:

> These are the fields that should be represented by our API.

---

## 21 — Create Our API View

Open:

```text
topics/views.py
```

Add:

```python
from rest_framework import viewsets

from .models import Topic
from .serializers import TopicSerializer


class TopicViewSet(viewsets.ModelViewSet):
    queryset = Topic.objects.all()
    serializer_class = TopicSerializer
```

That's a surprisingly small amount of code.

The `ModelViewSet` provides the common operations for a model-based API, including listing, retrieving, creating, updating, and deleting objects.

Today, we'll primarily use the **GET** operations.

---

## 22 — What Does the ViewSet Give Us?

Our `TopicViewSet` can handle requests such as:

```text
GET     /api/topics/
```

Get all topics.

```text
GET     /api/topics/1/
```

Get topic #1.

And eventually:

```text
POST    /api/topics/
```

Create a topic.

```text
PUT/PATCH    /api/topics/1/
```

Modify a topic.

```text
DELETE  /api/topics/1/
```

Delete a topic.

We don't have to write each of these operations ourselves.

---

## 23 — Routing the API

Now we need to tell Django:

> When someone requests `/api/topics/`, use `TopicViewSet`.

Open:

```text
learning_log/urls.py
```

Replace its contents with:

```python
from django.contrib import admin
from django.urls import include, path
from rest_framework.routers import DefaultRouter

from topics import views


router = DefaultRouter()
router.register(r'topics', views.TopicViewSet)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),
]
```

The router automatically creates the URL patterns for our ViewSet.

---

## 24 — Let's Start the Server

Run:

```text
python manage.py runserver
```

You should see something similar to:

```text
Starting development server at
http://127.0.0.1:8000/
```

Our Django server is now running.

---

## 25 — Our First API Request

Open a web browser.

Go to:

```text
http://127.0.0.1:8000/api/topics/
```

What happens?

The browser sends:

```text
GET /api/topics/
```

Django:

```text
receives the request
        ↓
matches the URL
        ↓
calls TopicViewSet
        ↓
queries the database
        ↓
serializes the results
        ↓
returns a response
```

---

## 26 — The Browsable API

You may see a page that looks different from raw JSON.

That's intentional.

Django REST Framework provides a **Browsable API** that lets us interact with an API directly through a web browser.

It can show:

- The URL
- The HTTP method
- The response
- The JSON representation
- Forms for supported operations

This is useful while developing and testing an API.

---

## 27 — But We Don't Have Any Topics Yet

Our database currently contains:

```text
Topic
----------------
(empty)
```

So:

```text
GET /api/topics/
```

will return something like:

```json
[]
```

That's correct!

The API is working.

There simply aren't any Topic objects yet.

---

## 28 — Add Some Data

For now, we'll use the Django shell.

Stop the server if necessary, or open another terminal.

Run:

```text
python manage.py shell
```

Then:

```python
from topics.models import Topic
```

Create a few topics:

```python
Topic.objects.create(
    name="Python",
    description="Programming with Python"
)

Topic.objects.create(
    name="Django",
    description="Building web applications with Django"
)

Topic.objects.create(
    name="React",
    description="Building user interfaces with React"
)
```

Then:

```python
exit()
```

---

## 29 — Test the API Again

Start the server:

```text
python manage.py runserver
```

Open:

```text
http://127.0.0.1:8000/api/topics/
```

We should now see our topics.

Something similar to:

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
    },
    {
        "id": 3,
        "name": "React",
        "description": "Building user interfaces with React"
    }
]
```

---

## 30 — Retrieve One Topic

Our API also supports an individual topic.

Try:

```text
http://127.0.0.1:8000/api/topics/1/
```

The browser sends:

```text
GET /api/topics/1/
```

Django returns:

```json
{
    "id": 1,
    "name": "Python",
    "description": "Programming with Python"
}
```

Try:

```text
/api/topics/2/
```

and:

```text
/api/topics/3/
```

---

## 31 — What Just Happened?

When we visited:

```text
/api/topics/2/
```

we didn't create a separate Python function called:

```python
def topic_2():
    ...
```

Instead:

```text
/api/topics/2/
       │
       ▼
    Router
       │
       ▼
TopicViewSet
       │
       ▼
 Topic.objects
       │
       ▼
TopicSerializer
       │
       ▼
    JSON
```

The **router + ViewSet + serializer + model** work together to create our API.

---

## 32 — The Complete Picture

We have now built:

```text
                    Browser
                       │
                       │ GET
                       ▼
              /api/topics/2/
                       │
                       ▼
                   Django
                       │
                       ▼
                    Router
                       │
                       ▼
                 TopicViewSet
                       │
                       ▼
                  Topic Model
                       │
                       ▼
                   SQLite
                       │
                       ▼
               TopicSerializer
                       │
                       ▼
                     JSON
                       │
                       ▼
                   Browser
```

This is the foundation for the frontend we will build later.

---

## 33 — Why JSON?

Our API doesn't return an HTML page.

It returns **data**.

```json
{
    "id": 2,
    "name": "Django",
    "description": "Building web applications with Django"
}
```

That makes the API useful to many different clients:

```text
React
   │
   ├── GET /api/topics/
   │
   ▼
Django API
   │
   ▼
JSON
```

The React application doesn't need to know how Django or the database works.

It only needs to know how to communicate with the API.

---

## 34 — In-Class Exercise

## Explore the API

Using your browser:

1. Visit:

   ```text
   /api/topics/
   ```

2. Identify the HTTP method being used.

3. Visit:

   ```text
   /api/topics/1/
   ```

4. Change the ID to `2` and `3`.

5. What happens if you request:

   ```text
   /api/topics/999/
   ```

### Questions

- What status code do you get?
- Why?
- What is different between `/api/topics/` and `/api/topics/1/`?

---

## 35 — Where We Go Next

Today:

```text
Django
   ↓
REST API
   ↓
JSON
   ↓
Browser
```

Next we can add:

```text
POST
PUT / PATCH
DELETE
```

Then later:

```text
React
   │
   │ fetch()
   ▼
Django REST API
   │
   ▼
Database
```

The API we build now will become the **backend for our frontend later in the course**.