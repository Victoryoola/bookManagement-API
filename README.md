# Book Management API
A simple REST API for managing books using Node.js, Express and MongoDB. This project features CRUD functionality for books

# Features
- Add a new book
- Retrieve all added books
- Retrieve a book by an id
- Register a new User
- Login an already existing user
- Update details of a book
- Delete a book
- MongoDB for database

# Tech Stack
- JWT
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Nodemon

# Project Folder
- config/
    - db.js
- controllers/
    - book.js
- middleware/
    - auth.js
    - errorHandler.js
    - logger.js
- models/
    - book.js
    - user.js
- routes/
    - authRoute.js
    - bookRoutes.js
    - book.js
- server.js
- package.json
- package-lock.json

# Quick Start
Requirements: Node.js (>=16) and npm.

1. Install dependencies
   - npm install

2. Start dev server:
     npm run dev

3. Open http://localhost:5000

4. Create a .env file
    MONGO_URI=your_mongo_connection_url
    PORT=500

# API Endpoints
1. Get all books
    http://localhost:5000/api/books

2. Get a single book
    http://localhost:5000/api/books/:id

3. Update a book
    http://localhost:5000/api/books/:id

4. Delete a book
    http://localhost:5000/api/books/:id

5. Register User
    http://localhost:5000/api/auth/register

6. User Login
    http://localhost:5000/api/auth/login

# Testing
- Postman