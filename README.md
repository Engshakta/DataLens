DataLens
DataLens is a transaction management application built with a React + Tailwind CSS frontend and a FastAPI + PostgreSQL backend. It allows users to add, view, and manage financial transactions with a modern, responsive UI featuring dark mode support.
Features

Add and view transactions with description and amount.
Responsive UI with Tailwind CSS and dark mode toggle.
FastAPI backend with PostgreSQL for persistent storage.
RESTful API endpoints (/transactions GET and POST).
Secure configuration using .env for database credentials.

Tech Stack

Frontend: React, TypeScript, Tailwind CSS, Vite
Backend: FastAPI, SQLAlchemy, PostgreSQL, python-dotenv
Tools: Git, GitHub, VS Code

Screenshots
Transaction List

Add Transaction Form

Dark Mode

Note: Screenshots are placeholders until the app is fully functional.
Installation
Prerequisites

Node.js (v18 or higher)
Python (3.10 or higher)
PostgreSQL (v14 or higher)
Git

Backend Setup

Navigate to the backend directory:cd backend


Create and activate a virtual environment:python -m venv venv
.\venv\Scripts\activate


Install dependencies:pip install -r requirements.txt


Create a .env file in the backend directory:echo DATABASE_URL=postgresql://postgres:your_password@localhost:5432/datalens > .env

Replace your_password with your PostgreSQL password.
Set up PostgreSQL:
Create a database named datalens:psql -U postgres
CREATE DATABASE datalens;
\q




Run the backend:cd C:\Users\engsh\DataLensNew
uvicorn backend.main:app --reload

Access the API at http://127.0.0.1:8000/docs.

Frontend Setup

Navigate to the frontend directory:cd frontend


Install dependencies:npm install


Run the development server:npm run dev

Access the app at http://localhost:5173.

API Endpoints

GET /transactions: Retrieve all transactions.
POST /transactions: Create a new transaction (expects {description: str, amount: float}).

Future Enhancements

📊 Add Chart.js for transaction visualizations.
🔐 Implement user authentication with Firebase/JWT.
📄 Add PDF export for transaction reports.
🚀 Deploy to Vercel (frontend) and Render (backend).

Contributing
Contributions are welcome! Please open an issue or submit a pull request.
License
MIT License
Author
Abdishakur | GitHub | DataLens © 2025
