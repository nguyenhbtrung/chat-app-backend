# Chat App Backend - Node.js (Express + Sequelize + MySQL + Socket.IO)

## 📌 Overview
This is a backend API built with **Node.js + Express**, using **Sequelize ORM** with **MySQL** as the database.  
The system supports real-time messaging with **Socket.IO**, authentication with **JWT**, file uploads with **Multer**, and environment configuration with **dotenv**.

---

## 🚀 Tech Stack
- [Node.js](https://nodejs.org/)  
- [Express](https://expressjs.com/)  
- [Sequelize](https://sequelize.org/)  
- [MySQL](https://www.mysql.com/)  
- [Socket.IO](https://socket.io/)  
- [JWT](https://jwt.io/)  
- [Multer](https://www.npmjs.com/package/multer)  
- [dotenv](https://www.npmjs.com/package/dotenv)  

---

## 📂 Project Structure
```
.
├── src
│   ├── config/        # Configuration files
│   ├── controllers/   # Request handlers
│   ├── errors/        # Custom error classes
│   ├── middleware/    # Express middlewares
│   ├── migrations/    # Sequelize migrations
│   ├── models/        # Sequelize models
│   ├── queries/       # Complex SQL queries
│   ├── routes/        # API routes
│   ├── services/      # Business logic
│   ├── socket/        # Socket.IO handlers
│   ├── utils/         # Utility functions
│   └── index.js       # Express entry point
├── uploads/          # File uploads directory
├── .env             # Environment variables
├── .sequelizerc     # Sequelize CLI config
├── package.json
└── README.md
```

---

## ⚙️ Environment Variables
Create a `.env` file in the project root and configure as follows:

```env
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ChatApp
DB_USER=your_username
DB_PASS=your_password

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=7d

PORT=8080
NODE_ENV=development

CLIENT_URL=http://localhost:5173

UPLOADS_ROOT=uploads
```

---

## 📦 Installation & Setup

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/chat-app-backend.git
cd chat-app-backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure database

* Ensure MySQL is installed and running
* Update `.env` with your database credentials

### 4. Create database & run migrations

```bash
npx sequelize-cli db:create
npx sequelize-cli db:migrate
```

### 5. Start the server

```bash
npm run dev   # with nodemon (development)
npm start     # production
```

Server will run at:
- HTTP: [http://localhost:8080](http://localhost:8080)
- WebSocket: [ws://localhost:8080](ws://localhost:8080)

---

## 🛠️ Useful Scripts

```bash
npm run dev                      # Start server with nodemon
npm start                        # Start server normally
npm run lint                     # Run ESLint with --fix option
npx sequelize-cli db:migrate     # Run migrations
npx sequelize-cli db:migrate:undo # Rollback last migration
```

---

## 🔑 Authentication

* The backend uses **JWT** for authentication
* On successful login, the server returns a **JWT token**
* Include the token in:
  * HTTP request headers for REST API:
    ```
    Authorization: Bearer <token>
    ```
  * Socket.IO connection auth:
    ```javascript
    io.connect({
      auth: { token: '<token>' }
    })
    ```

---

## 📡 WebSocket Events

### Emitted by Client
- `register`: Register socket with user ID
- `watch_users`: Subscribe to user presence updates
- `unwatch_users`: Unsubscribe from user presence updates

### Emitted by Server
- `presence_update`: Notifies when a user's online status changes

---

## 🌐 Client Integration

The frontend is expected to run at:
[http://localhost:5173](http://localhost:5173) (configured in `.env`).

---

## 📝 Notes

* Ensure `.env` is listed in `.gitignore` and never committed
* For production, set `NODE_ENV=production` and configure environment variables securely
* The `uploads` directory must exist and be writable
* Configure proper CORS settings for your production environment
