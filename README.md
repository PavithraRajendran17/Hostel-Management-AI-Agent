HOSTEL MANAGEMENT AI AGENT
==========================
Next-Generation AI Hostel Operations Ecosystem. Engineered for autonomous student request parsing and secure role-based dashboard operations.

PROJECT STRUCTURE
----------------
- backend/  : Spring Boot Core Production Server Logic
- frontend/ : React 18 SPA UI via Vite Compiler Engine
- schema.sql: Production Relational Database Blueprint

DATABASE DESIGN
---------------
- users          : Stores secure user authentication credentials profiles.
- students       : Dynamic biographical student accommodation maps.
- wardens        : Administrative control authorization registry.
- rooms          : Inventory tracker checking block slot availability.
- complaints     : Records infrastructure issues mined via Gemini AI.
- leave_requests : Tracks student transactional leaves lifecycle.

INSTALLATION STEPS
------------------
Step 1: Clone Repository
git clone [https://github.com/PavithraRajendran17/Hostel-Management-AI-Agent](https://github.com/PavithraRajendran17/Hostel-Management-AI-Agent)
cd Hostel-Management-AI-Agent

Step 2: Database Setup
CREATE DATABASE hostel_management;
USE hostel_management;
mysql -u root -p hostel_management < schema.sql

Step 3: App Configuration
Open backend/src/main/resources/application.properties and set:
- spring.datasource.username = YOUR_MYSQL_USER
- spring.datasource.password = YOUR_MYSQL_PASSWORD
- gemini.api.key = YOUR_GOOGLE_GEMINI_API_KEY

Step 4: Boot Backend Core Engine
cd backend
mvn clean install
mvn spring-boot:run

Step 5: Spin Up Web Application Dashboard Client
cd frontend
npm install
npm run dev

CORE ENDPOINTS MATRIX
---------------------
- POST /api/auth/login (Public JWT Gateway Authorization Access)
- POST /api/chat/parse (Secured Student Gemini AI Prompt Parser Execution)
- GET  /api/complaints (Secured Warden Operational Array Resolver)
- PUT  /api/leave-requests/{id}/status (Secured Warden State Mutator Engine)

DEMO ACCOUNTS CREDENTIALS
-------------------------
- Student : Username: student  | Password: password
- Warden  : Username: warden   | Password: password
- Admin   : Username: admin    | Password: password

------------------------------------------------------------------------
Engineered for advanced academic project showcase and modern smart campus operations. Developed with ❤️ by Pavithra Rajendran.
