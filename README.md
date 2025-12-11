Task Management Application — Full Stack (React + Node + JWT + CRUD + Tests)

A modern full-stack task management system where users can register, log in, and securely manage their personal tasks.
The project includes JWT authentication, protected APIs, CRUD operations, frontend state management, and fully working Jest test suites for both backend and frontend.

🚀 Tech Stack
Frontend

React + Vite

TailwindCSS

Redux Toolkit

Axios

React Hook Form + Zod

Jest + React Testing Library (unit tests)

Backend

Node.js + Express

JWT Authentication

In-Memory or Database (Pluggable)

Jest + Supertest (API tests)

📂 Project Structure
/frontend
  └── src/
       ├── components/
       ├── pages/
       ├── store/
       ├── api/
       ├── lib/
       └── __tests__

/backend
  └── src/
       ├── app.js
       └── routes, controllers, middleware
  └── tests/

⚙️ Local Setup Instructions
1) Clone the repository
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>

🖥️ Backend Setup
cd backend
npm install

Run the backend
node src/app.js


The server starts at:

http://localhost:4000

Run backend tests
npm test

Backend coverage report
npm run test:coverage


View output in:

/backend/coverage/backend/index.html

🎨 Frontend Setup
cd frontend
npm install

Start frontend dev server
npm run dev


Vite will show the local URL:

http://localhost:5173

Frontend tests
npm run test

Frontend coverage
npm run test:coverage


View report at:

/frontend/coverage/lcov-report/index.html

🔐 Authentication Workflow
Register

User creates an account using:

username

password

Login

User receives:

user object

JWT token

The frontend stores the token in localStorage.
All protected requests send:

Authorization: Bearer <token>

📌 API Endpoints Documentation
Auth Routes
POST /api/auth/register

Registers a new user.

Body:

{
  "username": "john",
  "password": "123456"
}

POST /api/auth/login

Returns JWT token for valid credentials.

Response:

{
  "user": { "username": "john" },
  "token": "jwt-token-here"
}

Task Routes (Protected)

All routes require:

Authorization: Bearer <token>

GET /api/tasks

Returns the tasks belonging to the logged-in user.

POST /api/tasks

Create a new task.

Body Example:

{
  "title": "Buy groceries",
  "description": "Milk, eggs, bread",
  "status": "pending"
}

PUT /api/tasks/:id

Update an existing task.

DELETE /api/tasks/:id

Delete a task.

🧪 Testing Overview
Backend Tests

Includes:

Authentication (register & login)

Authorization middleware

Task CRUD operations
Tech used:

Jest

Supertest

Frontend Tests

Includes:

Form validation using Zod

Component rendering

UI interactions
Tech used:

Jest

React Testing Library

📊 Coverage

Both frontend and backend generate full coverage reports.

Backend:

coverage/backend/index.html


Frontend:

coverage/lcov-report/index.html


You can open these files in a browser to view line-level coverage.

📌 Notes

Backend test server uses an in-memory database for predictable and repeatable tests.

You can switch to PostgreSQL/Mongo by updating app.js and keeping the same routes.

All test files are located in /backend/tests and /frontend/src/__tests__.

🎉 Conclusion

This full-stack application demonstrates:

✔ Secure user authentication
✔ Protected API routing
✔ Modern React UI with Tailwind
✔ Fully working Redux state management
✔ Complete backend + frontend test coverage
✔ Clean and scalable architecture
