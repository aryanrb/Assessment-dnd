## Project Setup Guide

### Client Side

#### Step 1: Navigate to the Client Directory

```bash
cd /client
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Create env variables

Create a new .env file copying the .env.example file

#### Step 4: Run Development Server

```bash
npm start
```

### Server Side

#### Step 1: Navigate to the Server Directory

```bash
cd /api
```

#### Step 2: Install Dependencies

```bash
npm install
```

#### Step 3: Create env variables

Create a new .env file copying the .env.example file

#### Step 4: Start the Server

```bash
npm start
```

---

## Architecture Overview

### Frontend (Client Side - React.js with TailWind CSS)

The frontend is built using React.js. Key components include:

- **Components and UI Elements:** Various React components handling task creation, display, and updates.
- **State Management:** State is managed using React Redux for efficient data handling and rendering.
- **API Communication:** Interfaces with the backend server via RESTful API calls to perform CRUD operations and receive real-time updates.

### Backend (Server Side - Node.js & Express.js)

The backend is developed using Node.js and Express.js, providing the application's logic, handling requests, and interacting with the database. Its key components include:

- **Routes and Controllers:** Defines API endpoints, handles incoming requests, and performs necessary actions (e.g., task creation, user authentication).
- **Middleware:** Implements middleware functions for tasks like authentication, error handling, and data validation.
- **Database Interaction:** Communicates with the MongoDB database to store and retrieve task and user information.
