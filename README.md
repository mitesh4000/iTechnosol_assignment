# 🚀 Mitesh Maurya's Take home Assignment

Welcome ! This project is a full-stack application built with Node.js, Express, and MongoDB for the backend, and react with vite for the frontend.

## ✨ Features

- User authentication (signup, login, logout)
- Task management (create, read, update, delete tasks)
- User profile retrieval

## 🔗 Endpoints

### Authentication

- **POST /api/auth/register**: Register a new user.
- **POST /api/auth/login**: Authenticate a user.

### Tasks

- **GET /api/task**: Get all tasks.
- **POST /api/task**: Create a new task.
- **PUT /api/tasks/:id**: Update a task by ID.
- **DELETE /api/tasks/:id**: Delete a task by ID.

### Additional Routes

- **GET /api/auth/get-profile**: Get user profile.

## 🛠️ Setup

### Prerequisites

- Node.js
- npm (Node Package Manager)

### Steps

1. **Clone the repository**:
   ``` git clone repo link ```
2. **Rename the .env.example file to .env:**
    ``` mv .env.example .env ```

3. **Add your MongoDB database string to the .env file:**
    ``` DATABASE_CONNECTION_STRING = your connection string```

4. **Install all required packages:**
    ```npm run prep```
  
5. **Start the development server:**
    ```npm run dev```


