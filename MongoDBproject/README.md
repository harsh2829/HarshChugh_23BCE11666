# Library Management System

## Overview
The **Library Management System** is a web-based application built using **Node.js** and **MongoDB**. It supports user management and book inventory management with CRUD functionalities.

## Features
- User Registration
- CRUD Operations for Books:
  - Add new books
  - View all books
  - Update book details
  - Delete books
- API tested with **Postman**

## Prerequisites
- **Node.js** installed on your system
- **MongoDB** installed and running locally
- **Postman** for testing (optional)

## Installation
1. Clone the repository:
2. Install dependencies:
    npm install
3. Start the server:
   node index.js


  Database Setup
Ensure MongoDB is running locally.

Import the sample data:

Use the exported books.json and users.json files.

Run the following commands:         mongoimport --db LibraryDB --collection books --file data/books.json --jsonArray
                                    mongoimport --db LibraryDB --collection users --file data/users.json --jsonArray








## API Endpoints

USER ENDPOINT


1. Register a User

    URL: /register

    Method: POST

    Body:

   {
  "username": "sampleUser",
  "password": "samplePass"
}


2. Login (Optional)

    URL: /login

    Method: POST

    Body:   {
  "username": "sampleUser",
  "password": "samplePass"
}

BOOK ENDPOINT

1.  Get All Books

    URL: /books

    Method: GET

2. Update a Book

    URL: /books/:id

    Method: PUT

    Body:       {
  "title": "Updated Title",
  "author": "Updated Author",
  "year": 2023,
  "genre": "Fiction",
  "available": true
}
3. Delete a Book

    URL: /books/:id

    Method: DELETE


## Technologies Used
Node.js

Express.js

MongoDB

Postman (for API testing)

## Author
Harsh Chugh 
23BCE11666
VIT Bhopal

