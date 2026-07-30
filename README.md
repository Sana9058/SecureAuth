# SecureAuth

**Developer:** Sana Aijaz  
**Purpose:** Full Stack Developer Internship Technical Assessment

A production-ready MERN stack authentication system featuring JWT access & refresh tokens, automatic token renewal, bcrypt password hashing, and a modern responsive UI with dark/light mode.

---

## Project Overview

SecureAuth implements industry-standard two-token authentication:

- **Access Token** — JWT, expires in 15 minutes
- **Refresh Token** — JWT, expires in 7 days, stored securely in MongoDB

The frontend uses Axios interceptors to automatically refresh expired access tokens, ensuring seamless user sessions without forced re-logins.

---

## Features

- User registration with validation
- Secure login with JWT tokens
- Protected routes with auth middleware
- Automatic access token refresh via Axios interceptors
- Secure logout (refresh token invalidation)
- User profile dashboard
- Dark / Light mode toggle
- Responsive, modern UI
- Comprehensive error handling
- Postman collection included

---

## Technology Stack

| Layer        | Technology                          |
| ------------ | ----------------------------------- |
| Frontend     | React (Vite), React Router DOM, Axios, Context API, CSS |
| Backend      | Node.js, Express.js                 |
| Database     | MongoDB Atlas, Mongoose             |
| Auth         | JWT, bcrypt                         |
| Dev Tools    | nodemon, dotenv, cors, cookie-parser |

---

## Folder Structure

```
SecureAuth/
├── client/                          # React Frontend
│   ├── public/
│   │   └── shield.svg
│   ├── src/
│   │   ├── components/
│   │   │   ├── Alert.jsx
│   │   │   ├── FormInput.jsx
│   │   │   ├── LoadingSpinner.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── ProtectedRoute.jsx
│   │   │   └── ThemeToggle.jsx
│   │   ├── context/
│   │   │   ├── AuthContext.jsx
│   │   │   └── ThemeContext.jsx
│   │   ├── hooks/
│   │   │   └── useAuth.js
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── NotFound.jsx
│   │   │   └── Register.jsx
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── utils/
│   │   │   └── validation.js
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── .env.example
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── server/                          # Express Backend
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   │   └── authMiddleware.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoutes.js
│   ├── utils/
│   │   ├── generateAccessToken.js
│   │   └── generateRefreshToken.js
│   ├── .env.example
│   ├── package.json
│   └── server.js
│
├── .gitignore
├── SecureAuth.postman_collection.json
└── README.md
```

---

## Authentication Flow

```
User Registers
       ↓
User Logs In
       ↓
Receive Access Token + Refresh Token
       ↓
Access Protected Dashboard
       ↓
Access Token Expires (15 min)
       ↓
Axios Interceptor Detects 401
       ↓
Automatically Request New Access Token
       ↓
Retry Original Request
       ↓
Continue Session Without Logout
```

---

## API Endpoints

| Method | Endpoint              | Auth     | Description                    |
| ------ | --------------------- | -------- | ------------------------------ |
| GET    | `/api/health`         | Public   | Health check                   |
| POST   | `/api/auth/register`  | Public   | Register new user              |
| POST   | `/api/auth/login`     | Public   | Login and receive tokens       |
| POST   | `/api/auth/refresh`   | Public   | Refresh access token           |
| POST   | `/api/auth/logout`    | Protected| Logout and invalidate token    |
| GET    | `/api/auth/profile`   | Protected| Get authenticated user profile |

### Sample Request / Response

**Register**
```json
POST /api/auth/register
{
  "name": "Sana Aijaz",
  "email": "sana@example.com",
  "password": "password123"
}

Response (201):
{
  "success": true,
  "message": "Registration successful. Please login."
}
```

**Login**
```json
POST /api/auth/login
{
  "email": "sana@example.com",
  "password": "password123"
}

Response (200):
{
  "success": true,
  "message": "Login successful.",
  "data": {
    "user": { "_id": "...", "name": "Sana Aijaz", "email": "sana@example.com" },
    "accessToken": "eyJhbG...",
    "refreshToken": "eyJhbG..."
  }
}
```

---

## Installation Steps

### Prerequisites

- Node.js v18+
- MongoDB Atlas account
- npm or yarn

### 1. Clone the Repository

```bash
git clone <repository-url>
cd SecureAuth
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create `.env` from the example:

```bash
cp .env.example .env
```

Edit `server/.env` with your values:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/secureauth?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_access_token_key_change_in_production
JWT_REFRESH_SECRET=your_super_secret_refresh_token_key_change_in_production
CLIENT_URL=http://localhost:5173
```

Start the backend:

```bash
npm run dev
```

### 3. Frontend Setup

Open a new terminal:

```bash
cd client
npm install
```

Create `.env` from the example:

```bash
cp .env.example .env
```

Edit `client/.env`:

```env
VITE_API_URL=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

### 4. Access the Application

- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:5000/api

---

## Environment Variables

### Server (`server/.env`)

| Variable           | Description                          | Example                |
| ------------------ | ------------------------------------ | ---------------------- |
| `PORT`             | Server port                          | `5000`                 |
| `MONGO_URI`        | MongoDB Atlas connection string      | `mongodb+srv://...`    |
| `JWT_SECRET`       | Secret for access token signing      | Random secure string   |
| `JWT_REFRESH_SECRET` | Secret for refresh token signing | Random secure string   |
| `CLIENT_URL`       | Frontend URL for CORS                | `http://localhost:5173`|

### Client (`client/.env`)

| Variable       | Description     | Example                      |
| -------------- | --------------- | ---------------------------- |
| `VITE_API_URL` | Backend API URL | `http://localhost:5000/api`  |

---

## Sample MongoDB Document

```json
{
  "_id": "67890abcdef1234567890123",
  "name": "Sana Aijaz",
  "email": "sana@example.com",
  "password": "$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/X4.VTtYKKKKKKKKK",
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "createdAt": "2026-07-29T10:00:00.000Z",
  "updatedAt": "2026-07-29T10:30:00.000Z",
  "__v": 0
}
```

> Note: The `password` field is bcrypt-hashed and excluded from API responses.

---

## Postman Collection

Import `SecureAuth.postman_collection.json` into Postman.

The collection includes:
- Health check
- Register
- Login (auto-saves tokens)
- Get Profile
- Refresh Token (auto-updates access token)
- Logout

Set the `baseUrl` variable to your API URL (default: `http://localhost:5000/api`).

---

## Deployment Guide

### Database — MongoDB Atlas

1. Create a free cluster at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a database user with read/write permissions
3. Whitelist IP addresses (use `0.0.0.0/0` for development)
4. Copy the connection string to `MONGO_URI`

### Backend — Render

1. Push code to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Connect your repository
4. Set root directory to `server`
5. Build command: `npm install`
6. Start command: `npm start`
7. Add environment variables:
   - `PORT` = `5000`
   - `MONGO_URI` = your Atlas connection string
   - `JWT_SECRET` = secure random string
   - `JWT_REFRESH_SECRET` = secure random string
   - `CLIENT_URL` = your Vercel frontend URL

### Frontend — Vercel

1. Create a new project on [Vercel](https://vercel.com)
2. Connect your repository
3. Set root directory to `client`
4. Framework preset: **Vite**
5. Add environment variable:
   - `VITE_API_URL` = your Render backend URL + `/api`
6. Deploy

### Production Checklist

- [ ] Use strong, unique JWT secrets
- [ ] Restrict MongoDB Atlas IP whitelist in production
- [ ] Set `CLIENT_URL` to production frontend URL
- [ ] Enable HTTPS on both frontend and backend
- [ ] Never commit `.env` files

---

## Run Commands Summary

```bash
# Backend
cd server
npm install
npm run dev        # Development with nodemon
npm start          # Production

# Frontend
cd client
npm install
npm run dev        # Development server
npm run build      # Production build
npm run preview    # Preview production build
```

---

## Future Improvements

- Email verification on registration
- Password reset via email
- OAuth integration (Google, GitHub)
- Rate limiting on auth endpoints
- HTTP-only cookie storage for refresh tokens
- Role-based access control (RBAC)
- Account lockout after failed login attempts
- Two-factor authentication (2FA)
- Session management dashboard
- Unit and integration tests

---

## License

MIT License — Built by **Sana Aijaz** for a Full Stack Developer Internship Technical Assessment.
