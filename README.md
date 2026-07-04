# Hostel Management AI Agent
Next-Generation AI-Powered Hostel Operations Ecosystem. Engineered for autonomous student request parsing and secure role-based dashboard operations.

---

## 📑 Table of Contents
1. Key Features
2. Tech Stack Core
3. Enterprise Architecture
4. Folder Structure
5. Database Design
6. Installation Steps
7. Core API Blueprints

---

## 🎯 1. Key Features
* **Gemini AI Integration:** Processes natural language prompts from students to automate complaints and leave requests.
* **Role-Based Access Control (RBAC):** Explicit programmatic sandbox isolation for Students, Wardens, and Administrators.
* **Stateless JWT Security:** High-performance user session protection engineered via Spring Security middleware context.
* **Real-time Warden Dashboard:** High-fidelity monitoring system for instant multi-state approval toggles and auditing.

---

## 🛠️ 2. Tech Stack Core
### Backend Layer
* **Language Core:** Java 17
* **Framework:** Spring Boot 3.2.0 & Spring Security
* **Data Layer:** Spring Data JPA (Hibernate ORM Engine)
* **AI Orchestration:** Google Gemini Pro LLM API

### Frontend Layer
* **Core Framework:** React 18
* **Build Pipeline:** Vite Bundler Core (Atomic compilation)
* **Styling Utility:** Tailwind CSS Engine
* **HTTP Client:** Axios Interceptors

---

## 🏗️ 3. Enterprise Architecture
The platform utilizes a structured 3-tier software architecture design:
1. **Client Interface Layer:** React 18 single-page application executing atomic UI state logic.
2. **Secure Controller Gateway:** Spring Boot middleware validating stateless Bearer JWT requests and processing Gemini API proxy actions.
3. **Persistence Storage Tier:** High-performance database layer managed under normalized constraints via MySQL.

---

## 📁 4. Folder Structure

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
🗄️ 5. Database DesignThe relational MySQL schema handles data mapping across these normalized tables:users: High-security metadata storing authentication profiles.students: Comprehensive biographical student profiles mapped to specific wings.wardens: Administrative warden registry mapping control authorization areas.rooms: Structural inventory map controlling block allocation and availability data.complaints: Dynamic tracking table logging AI-extracted infrastructure problems.leave_requests: Validated logging tracking transactional leaves context.🚀 6. Installation StepsStep 1: Clone the ProjectBashgit clone [https://github.com/PavithraRajendran17/Hostel-Management-AI-Agent](https://github.com/PavithraRajendran17/Hostel-Management-AI-Agent)
cd Hostel-Management-AI-Agent
Step 2: Set Up MySQL DatabaseLog into your local MySQL runtime tool and execute:SQLCREATE DATABASE hostel_management;
USE hostel_management;
Import the persistent table rules by streaming the baseline schema script:Bashmysql -u root -p hostel_management < schema.sql
Step 3: Configure Environment PropertiesNavigate to backend/src/main/resources/application.properties and add your operational keys:Propertiesspring.datasource.url=jdbc:mysql://localhost:3306/hostel_management
spring.datasource.username=YOUR_MYSQL_USER
spring.datasource.password=YOUR_MYSQL_PASSWORD
gemini.api.key=YOUR_GOOGLE_GEMINI_API_KEY
Step 4: Run the Backend EngineExecute the Maven runner wrapping task to compile and spawn the Spring Boot web application:Bashcd backend
mvn clean install
mvn spring-boot:run
The application server will actively lock and mount on http://localhost:8080.Step 5: Launch the Web UIOpen a secondary terminal window, enter the frontend workspace directory tree, and boot the web dev server:Bashcd frontend
npm install
npm run dev
🌐 7. Core API BlueprintsHTTP MethodEndpoint Target RouteTarget Structural ContextAuthorization ContextPOST/api/auth/loginReturns secure stateless Bearer JWT stringsOpen Framework (Public)POST/api/chat/parseDispatches message streams to Gemini AISecured (Student Role)GET/api/complaintsReturns arrays of structural room issuesSecured (Warden Role)PUT/api/leave-requests/{id}/statusMutates active lifecycle states (Approve/Reject)Secured (Warden Role)🔐 Demo Accounts Matrix👨‍🎓 Student Access: Username: student | Password: password👮 Warden Access: Username: warden | Password: password🛡️ Administrator Access: Username: admin | Password: passwordEngineered for advanced academic project showcase and modern smart campus operations. Developed with ❤️ by Pavithra Rajendran.
