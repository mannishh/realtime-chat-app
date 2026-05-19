# Real-Time Chat Application

A full-stack real-time chat application built using React, Node.js, Express, MongoDB, and Socket.IO. The application supports user authentication, real-time messaging, online user tracking, and chat history storage.

---

# Project Setup

## 1. Clone Repository

```bash
git clone <your-github-repository-url>
```

---

# Backend Setup

## Navigate to backend folder

```bash
cd backend
```

## Install dependencies

```bash
npm install
```

## Create `.env` file

```env
PORT=8000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLIENT_URL=http://localhost:5173
```


## Run Backend Server

```bash
npm run dev
```

Backend will run on:

```bash
http://localhost:8000
```

---

# Frontend Setup

## Navigate to frontend folder

```bash
cd frontend
```

## Install dependencies

```bash
npm install
```

## Run Frontend Server

```bash
npm run dev
```

Frontend will run on:

```bash
http://localhost:5173
```

---

# Features

* User Authentication
* Real-time Messaging using Socket.IO
* Online User Tracking
* Chat History Storage in MongoDB
* Protected Routes
* Responsive UI using Tailwind CSS
