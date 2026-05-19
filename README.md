# 📚 Library Management API

A complete RESTful Library Management Backend API built with **Node.js, Express.js, MongoDB, and Mongoose** featuring authentication, role-based access control, book management, borrowing system, fine management, dashboard analytics, Cloudinary uploads, email notifications, and WhatsApp integration.

This project supports **Admin and Student roles** with secure JWT authentication and full API testing using Postman.

---

## 🚀 Features

### Authentication & Authorization
- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Role-Based Access Control (Admin / Student)

### Book Management
- Add Book
- Get All Books
- Get Single Book
- Update Book
- Delete Book
- Upload Book Images using Cloudinary

### Borrow Management
- Borrow Book
- Return Book
- Borrow History
- Track Borrow Status

### Fine Management
- Automatic Fine Calculation
- Get Student Fines
- Pay Fine APIs

### Student Management
- Student Dashboard
- Borrowed Books Tracking
- Fine Tracking

### Dashboard Analytics
- Total Books
- Total Students
- Total Borrow Records
- Total Fines
- Active Borrow Statistics

### Notifications
- Email Notifications using Nodemailer
- WhatsApp Notifications using Twilio

### Security & Validation
- JWT Authentication
- Rate Limiting
- Request Validation
- Role-Based Middleware
- Centralized Error Handling

---

## 🧰 Tech Stack

### Backend
- Node.js
- Express.js

### Database
- MongoDB
- Mongoose

### Authentication
- JWT (JSON Web Token)
- bcryptjs

### Image Upload
- Cloudinary
- Multer

### Notifications
- Nodemailer
- Twilio WhatsApp API

### Validation & Security
- Express Validator
- Helmet
- Rate Limiting
- CORS

### Testing
- Postman

---

## 📁 Project Structure

```bash
LIBRARY-MANAGEMENT-API/
│
├── config/
│   ├── cloudinary.js
│   ├── db.js
│   ├── nodemailer.js
│   └── twilio.js
│
├── controllers/
│   ├── authController.js
│   ├── bookController.js
│   ├── borrowController.js
│   ├── dashboardController.js
│   ├── fineController.js
│   └── studentController.js
│
├── middleware/
│   ├── auth.js
│   ├── checkRole.js
│   ├── HttpError.js
│   ├── rateLimit.js
│   ├── upload.js
│   └── validate.js
│
├── Models/
│   ├── Book.js
│   ├── Borrow.js
│   ├── Fine.js
│   └── User.js
│
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   ├── borrowRoutes.js
│   ├── dashboardRoutes.js
│   ├── fineRoutes.js
│   └── studentRoutes.js
│
├── utils/
│   ├── sendEmail.js
│   └── sendWhatsApp.js
│
├── validations/
│   ├── bookSchema.js
│   ├── borrowSchema.js
│   ├── fineSchema.js
│   └── userSchema.js
│
├── .env
├── server.js
├── package.json
└── package-lock.json
```

---

## 🌐 Live API Base URL

```bash
https://your-render-link.onrender.com
```

Postman Environment Variable:

```bash
{{baseUrl}}
```

Example:

```bash
{{baseUrl}}/auth/login
{{baseUrl}}/books
{{baseUrl}}/borrow
```

---

## 🔐 Authentication

Protected routes require JWT Token.

Add token in Postman:

```bash
Authorization: Bearer YOUR_TOKEN
```

---

## 📌 API Endpoints

### Authentication Routes

```bash
POST   /auth/register
POST   /auth/login
```

### Book Routes

```bash
POST   /books
GET    /books
GET    /books/:id
PATCH  /books/:id
DELETE /books/:id
```

### Borrow Routes

```bash
POST   /borrow
GET    /borrow
PATCH  /borrow/return/:id
```

### Fine Routes

```bash
GET    /fines
PATCH  /fines/pay/:id
```

### Student Routes

```bash
GET    /students/profile
GET    /students/borrowed-books
GET    /students/fines
```

### Dashboard Routes

```bash
GET    /dashboard/admin
GET    /dashboard/student
```

---

## 📸 Project Screenshots

### Postman API Collection
![API Collection](screenshots/postman-api-collection.png)

### Book Management APIs
![Book APIs](screenshots/book-management-api.png)

### Borrow Book API
![Borrow API](screenshots/borrow-book-api.png)

### Dashboard Analytics
![Dashboard](screenshots/dashboard-api.png)

### Cloudinary Image Upload
![Cloudinary Upload](screenshots/cloudinary-upload.png)

---

## 📂 Additional API Testing Screenshots

More API testing screenshots are available in the `screenshots/` folder:

- Authentication APIs
- Book APIs
- Borrow APIs
- Fine APIs
- Dashboard APIs
- Student APIs

---

## ⚙️ Environment Variables

Create `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_USER=your_email
EMAIL_PASS=your_email_password

TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
TWILIO_PHONE_NUMBER=your_twilio_number
```

---

## 🛠️ Installation

Clone repository:

```bash
git clone https://github.com/your-username/LIBRARY-MANAGEMENT-API.git
```

Move into project:

```bash
cd LIBRARY-MANAGEMENT-API
```

Install dependencies:

```bash
npm install
```

Run server:

```bash
npm run dev
```

---

## 🧪 API Testing

All APIs tested using **Postman**.

Postman Variables:

```bash
baseUrl = https://your-render-link.onrender.com
AuthToken = your_jwt_token
```

---

## 💡 Highlights

This project demonstrates:

- REST API Development
- JWT Authentication
- Role-Based Authorization
- MongoDB Relationships
- Cloudinary Integration
- File Upload Handling
- Email Notifications
- WhatsApp Notifications
- Dashboard Aggregation
- Backend Security
- Production Deployment
- API Testing with Postman

---

## ⭐ Portfolio Project

This project is built to showcase backend development skills including:

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- Cloudinary
- Twilio
- Nodemailer
- REST API Development
- Deployment