Task Management Application

This project is a full-stack Task Management Application developed as part of my internship assessment. It includes a React frontend, a Node.js/Express backend, and complete documentation for setup, testing, and API usage. The goal of this application is to provide a clean, reliable system for creating, updating, and tracking tasks with proper authentication and structured API endpoints.

🌟 What This Project Demonstrates

Understanding of frontend + backend architecture

Clean API design with Express + MongoDB

Secure authentication using JWT

Component-based UI using React + Vite

Ability to write and run unit tests for both frontend and backend

Clear project documentation and developer-friendly setup

📁 Project Structure
Task-Management-Application/
│
├── backend/        # Express API
├── frontend/       # React application
├── README.md
├── .gitignore
└── .env.example

🛠️ Tech Stack Used
Frontend

React (Vite)

Axios

TailwindCSS

Backend

Node.js

Express.js

MongoDB + Mongoose

JWT Authentication

Testing

Jest + Supertest (Backend)

Vitest + React Testing Library (Frontend)

This stack was chosen because it reflects modern industry standards and enables fast development with maintainable code.

⚙️ Local Setup Instructions
1. Clone the repository
git clone https://github.com/Avishkar014/Task-Management-Application.git
cd Task-Management-Application

2. Install backend dependencies
cd backend
npm install

3. Install frontend dependencies
cd ../frontend
npm install

4. Configure environment variables

Inside /backend/.env:

PORT=4000
MONGO_URI=mongodb://localhost:27017/taskapp
JWT_SECRET=your-secret-key


A sample .env.example is included in the repository.

▶️ Running the Application
Start Backend
cd backend
npm run dev


Runs on:
http://localhost:4000

Start Frontend
cd ../frontend
npm run dev


Runs on:
http://localhost:5173

🧪 Running Tests & Viewing Coverage
Backend Tests
cd backend
npm test


Coverage:

npm run test:coverage

Frontend Tests
cd frontend
npm test


Coverage:

npm run test:coverage


Coverage reports will be available inside a coverage/ directory.

📘 API Documentation
Auth
Method	Endpoint	Description
POST	/api/auth/register	Register a new user
POST	/api/auth/login	Login and receive a JWT
Tasks
Method	Endpoint	Description
GET	/api/tasks	Fetch all tasks
POST	/api/tasks	Create a task
GET	/api/tasks/:id	Fetch a single task
PUT	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Remove a task

All task routes require a valid authentication token.

🎯 Why This Project Is Valuable for an Internship

Shows practical experience with REST APIs, frontend frameworks, and database integrations.

Demonstrates ability to write clean, testable code.

Includes proper documentation, making the project easy to evaluate.

Reflects real-world development workflows used in industry.

📄 License

This project is available under the MIT License.
