# Hostel Management AI Agent
Next-Generation AI Hostel Operations Ecosystem. Engineered for autonomous student request parsing and secure role-based dashboard operations.

========================================================================
1. PROJECT STRUCTURE
========================================================================
Hostel-Management-AI-Agent/
├── backend/                 # Spring Boot Production Core Server
│   ├── src/main/java/com/hostel/
│   │   ├── model/           # Data Entities (Student, Room, Complaint)
│   │   ├── repository/      # Spring Data JPA Core Interfaces
│   │   └── service/         # Gemini AI Processing Domain Logic
│   └── pom.xml              # Maven Core Project Object Model
├── frontend/                # React Vite SPA Web Client Architecture
│   ├── src/
│   │   ├── components/      # UI Dashboard Composition Panels
│   │   ├── App.jsx          # React Router 6 Infrastructure
│   │   └── main.jsx         # Virtual DOM Mounting Root
│   └── vite.config.js       # Vite Compiler Pipeline Rules
└── schema.sql               # Production Schema Relational Blueprint

========================================================================
2. DATABASE DESIGN
========================================================================
The relational MySQL schema handles data mapping across these normalized tables:

* users: High-security metadata storing authentication profiles.
* students: Comprehensive biographical student profiles mapped to specific wings.
* wardens: Administrative warden registry mapping control authorization areas.
* rooms: Structural inventory map controlling block allocation and availability data.
* complaints: Dynamic tracking table logging AI-extracted infrastructure problems.
* leave_requests: Validated logging tracking transactional leaves context.

========================================================================
3. INSTALLATION STEPS
========================================================================

Step 1: Clone the Project
-------------------------
git clone https://github.com/PavithraRajendran17/Hostel-Management-AI-Agent
cd Hostel-Management-AI-Agent

Step 2: Set Up MySQL Database
-----------------------------
Log into your local MySQL runtime tool and execute:
CREATE DATABASE hostel_management;
USE hostel_management;

Import the persistent table rules by streaming the baseline schema script:
mysql -u root -p hostel_management < schema.sql

Step 3: Configure Environment Properties
----------------------------------------
Navigate to backend/src/main/resources/application.properties and add your operational keys:
spring.datasource.url=jdbc:mysql://localhost:3306/hostel_management
spring.datasource.username=YOUR_MYSQL_USER
spring.datasource.password=YOUR_MYSQL_PASSWORD
gemini.api.key=YOUR_GOOGLE_GEMINI_API_KEY

Step 4: Run the Backend Engine
------------------------------
Execute the Maven runner wrapping task to compile and spawn the Spring Boot web application:
cd backend
mvn clean install
mvn spring-boot:run

The application server will actively lock and mount on http://localhost:8080.

Step 5: Launch the Web UI
-------------------------
Open a secondary terminal window, enter the frontend workspace directory tree, and boot the web dev server:
cd frontend
npm install
npm run dev

========================================================================
4. CORE API BLUEPRINTS
========================================================================
* POST /api/auth/login
  Context: Returns secure stateless Bearer JWT strings
  Auth: Open Framework (Public)

* POST /api/chat/parse
  Context: Dispatches message streams to Gemini AI
  Auth: Secured (Student Role)

* GET /api/complaints
  Context: Returns arrays of structural room issues
  Auth: Secured (Warden Role)

* PUT /api/leave-requests/{id}/status
  Context: Mutates active lifecycle states (Approve/Reject)
  Auth: Secured (Warden Role)

========================================================================
5. DEMO ACCOUNTS MATRIX
========================================================================
* Student Access:     Username: student  |  Password: password
* Warden Access:      Username: warden   |  Password: password
* Admin Access:       Username: admin    |  Password: password

------------------------------------------------------------------------
Engineered for advanced academic project showcase and modern smart campus operations. Developed with ❤️ by Pavithra Rajendran.
