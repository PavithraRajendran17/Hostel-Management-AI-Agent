# 🏠 Hostel Management AI Agent

> **Next-Generation AI Hostel Operations Ecosystem**
> Engineered for autonomous student request parsing and secure role-based dashboard operations.

---

### 🔗 Live Preview
[🚀 Click here to access the Hostel Management AI Agent](https://hostel-management-frontend-hzti.onrender.com)


# 📂 Project Structure

```text
Hostel-Management-AI-Agent/
│
├── backend/                         # Spring Boot Production Core Server
│   ├── src/main/java/com/hostel/
│   │   ├── model/                   # Data Entities (Student, Room, Complaint)
│   │   ├── repository/              # Spring Data JPA Core Interfaces
│   │   └── service/                 # Gemini AI Processing Domain Logic
│   └── pom.xml                      # Maven Project Configuration
│
├── frontend/                        # React + Vite SPA Client
│   ├── src/
│   │   ├── components/              # Dashboard UI Components
│   │   ├── App.jsx                  # React Router Configuration
│   │   └── main.jsx                 # Application Entry Point
│   └── vite.config.js               # Vite Configuration
│
└── schema.sql                       # MySQL Database Schema
```

---

# 🗄️ Database Design

The application uses a **normalized MySQL relational database** with the following tables:

| Table              | Description                                       |
| ------------------ | ------------------------------------------------- |
| **users**          | Stores authentication and login credentials       |
| **students**       | Maintains student profile information             |
| **wardens**        | Stores warden details and assigned hostel blocks  |
| **rooms**          | Manages room allocation and availability          |
| **complaints**     | Tracks AI-generated complaint records             |
| **leave_requests** | Stores student leave requests and approval status |

---

# ⚙️ Installation Guide

## Step 1: Clone the Repository

```bash
git clone https://github.com/PavithraRajendran17/Hostel-Management-AI-Agent.git

cd Hostel-Management-AI-Agent
```

---

## Step 2: Create the Database

Login to MySQL and execute:

```sql
CREATE DATABASE hostel_management;

USE hostel_management;
```

Import the schema:

```bash
mysql -u root -p hostel_management < schema.sql
```

---

## Step 3: Configure Application Properties

Navigate to:

```text
backend/src/main/resources/application.properties
```

Update the following properties:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/hostel_management
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

gemini.api.key=YOUR_GOOGLE_GEMINI_API_KEY
```

---

## Step 4: Run the Backend

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend will start on:

```text
http://localhost:8080
```

---

## Step 5: Run the Frontend

Open another terminal:

```bash
cd frontend

npm install

npm run dev
```

The React application will launch automatically.

---

# 🔗 REST API Endpoints

| Method   | Endpoint                          | Description                            | Authorization |
| -------- | --------------------------------- | -------------------------------------- | ------------- |
| **POST** | `/api/auth/login`                 | User authentication and JWT generation | Public        |
| **POST** | `/api/chat/parse`                 | Sends student requests to Gemini AI    | Student       |
| **GET**  | `/api/complaints`                 | Retrieves complaint records            | Warden        |
| **PUT**  | `/api/leave-requests/{id}/status` | Approve or reject leave requests       | Warden        |

---

# 👥 Demo Accounts

| Role         | Username  | Password   |
| ------------ | --------- | ---------- |
| 🎓 Student   | `student` | `password` |
| 👨‍💼 Warden | `warden`  | `password` |
| 👑 Admin     | `admin`   | `password` |

---

# 🛠️ Tech Stack

* ☕ Java 21
* 🌱 Spring Boot
* 🔐 Spring Security + JWT
* 🤖 Google Gemini AI API
* ⚛️ React.js
* ⚡ Vite
* 🎨 Tailwind CSS
* 🗄️ MySQL
* 📦 Maven

---

# ✨ Features

* 🤖 AI-powered student request parsing using Gemini
* 🏠 Hostel room allocation management
* 📝 Complaint management system
* 📅 Leave request approval workflow
* 🔐 JWT-based authentication
* 👥 Role-based dashboards (Student, Warden, Admin)
* 📊 Modern responsive user interface

---

# ❤️ Developed By

**Pavithra Rajendran**

> *Engineered for advanced academic project showcases and modern smart campus operations.*
