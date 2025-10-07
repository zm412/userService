
# User Management Service

A simple Node.js application for managing users with authentication, role-based access, and user management features. Built with Express and MongoDB.

## Features

- User registration and login with hashed passwords (bcrypt)
- JWT-based authentication
- Role-based access control (`admin` and `user`)
- Retrieve user by ID (accessible to admin or the user themselves)
- List all users (admin only)
- Block/unblock users (admin or self)

## Technologies

- Node.js
- Express.js
- MongoDB + Mongoose
- bcryptjs for password hashing
- JSON Web Tokens (JWT) for authentication
- express-validator for request validation

## Installation

1. Clone the repository:
** git clone <repository_url> **
** cd nodejsTest **

2. Install dependencies:
** npm install **

3. Start the server:
** npm run dev **

### API Endpoints

#### Authentication

** POST /auth/registration — Register a new user **
Body:

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "123456",
  "role": "user",
  "birthDate": "2000-01-01"
}

** POST /auth/login — Log in and receive a JWT **
Body:

{
  "email": "john@example.com",
  "password": "123456"
}

#### Users

** GET /users/ — Get list of all users (admin only) **

** GET /users/:id — Get a user by ID (admin or self) **

** PATCH /users/:id/block — Block a user (admin or self) **

All protected routes require Authorization: Bearer <token> header.

Project Structure
├── controllers/       # Route controllers
├── services/          # Business logic
├── repositories/      # Database access layer
├── models/            # Mongoose schemas
├── middlewares/       # Auth & role middlewares
├── routes/            # Express routers
├── config.js          # Configuration (JWT secret)
├── app.js             # Entry point
└── package.json

### Notes
Passwords are stored securely using bcrypt.
JWT tokens expire after 24 hours.
Roles: admin and user.
Validation is done using express-validator.

