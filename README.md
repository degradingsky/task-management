# Task Management App

A fullstack task management application with JWT-based authentication, CRUD functionality for tasks, and a secure, scalable architecture using NestJS, Next.js, MongoDB, and Auth0.

---

## 🛠️ Tech Stack

### Backend
- **Framework**: [NestJS](https://nestjs.com/)
- **Authentication**: JWT via [Passport.js](http://www.passportjs.org/)
- **Database**: MongoDB Atlas
- **ORM**: Mongoose
- **Validation**: `class-validator` with `@nestjs/swagger` support (`class-validator-shim`)
- **Logging**: [Pino](https://github.com/pinojs/pino)
- **Dev Tools**: ESLint, Prettier
- **Deployment**: Dockerized & hosted on [Render](https://render.com)

### Frontend
- **Framework**: [Next.js](https://nextjs.org/)
- **Authentication**: [Auth0](https://auth0.com/)

---

## ⚙️ Setup Instructions

### Ports
- **API (Backend)**: `http://localhost:5001`
- **Frontend (UI)**: `http://localhost:3000`

---

### Backend

#### Configure Environment Variables

Create a `.env` file:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/<dbname>?retryWrites=true&w=majority
```

#### Install dependencies

```bash
npm install
```

#### Run the backend

```bash
npm run start
```

#### Swagger Documentation

After starting the server, visit:

```
http://localhost:5001/swagger
```

---

### Frontend

#### Navigate to frontend

```bash
cd ../frontend
```

#### Configure Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_AUTH0_DOMAIN=your-auth0-domain
NEXT_PUBLIC_API_AUTH0_CLIENT_ID=your-client-id
APP_BASE_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:5001/v1
```

#### Install dependencies

```bash
npm install
```

#### Run the frontend

```bash
npm run dev
```

---

## 🔐 Authentication

- Auth0 is used for frontend login.
- Auth0 issues access tokens which are sent as Bearer tokens to the NestJS backend.
- Backend uses Passport with JWT strategy to protect routes.

---

## 📦 Features

### Backend

#### Task Entity
- Full CRUD support:
  - `POST /tasks`: Create a task
  - `GET /tasks`: Get all tasks for the user
  - `PUT /tasks/:id`: Update a task
  - `DELETE /tasks/:id`: Delete a task

#### Request Validation
- Strong validation using `class-validator` decorators

#### Auto-generated Swagger
- Docs generated with `@nestjs/swagger` and class-validator shim

#### Logging
- Structured logs with [Pino](https://github.com/pinojs/pino)

---

### Frontend

- Secure login with Auth0
- Authenticated API calls using issued JWT
- View and update tasks per user

---

## 🚀 Deployment

- **Backend**: Deployed on [Render](https://render.com) using Docker
- **Database**: Hosted on [MongoDB Atlas](https://www.mongodb.com/atlas)
- **Frontend**: Hosted on [Vercel](https://vercel.com/)