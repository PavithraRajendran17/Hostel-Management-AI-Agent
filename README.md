██╗  ██╗ ██████╗ ███████╗████████╗███████╗██╗          █████╗ ██╗
██║  ██║██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██║         ██╔══██╗██║
███████║██║   ██║███████╗   ██║   █████╗  ██║         ███████║██║
██╔══██║██║   ██║╚════██║   ██║   ██╔══╝  ██║         ██╔══██║██║
██║  ██║╚██████╔╝███████║   ██║   ███████╗███████╗    ██║  ██║██║
╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚══════╝    ╚═╝  ╚═╝╚═╝
                                                                 
Next-Generation AI-Powered Hostel Operations Ecosystem

Autonomous · Natural Language Processing · Role-Based Security

HOSTEL MANAGEMENT AI AGENT is an enterprise-grade full-stack orchestration platform that revolutionizes student accommodation workflows. Built on a robust four-layer intelligence stack, it combines Spring Boot 3.2 enterprise core with Google Gemini LLM pipelines to automate student complaint tracking and leave requests autonomously via natural language.

📖 Documentation · 🚀 Quick Start · 🎯 Features · 🏗️ Architecture · 👥 Profile
   
📑 Table of Contents
* 🎯 Key Features
* 🏛️ Four-Layer Intelligence Stack
* 🆚 Why Hostel AI Agent?
* 🏗️ System Architecture
* 📁 Repository Structure
* 🚀 Quick Start Setup
* 🔐 Demo Accounts Matrix
* 🌐 API Endpoints

---

🎯 Key Features

| Feature | Description |
| :--- | :--- |
| 🤖 Gemini AI Agent | Understands free-text student requests with contextual slot extraction for seamless processing. |
| 🔐 Advanced Auth | Secured with robust JSON Web Token (JWT) architecture backed by Spring Security. |
| 📊 Real-time Dashboard | High-fidelity warden interface for instant operational metrics, audit tracking, and multi-state request toggles. |
| 🎨 Micro-Frontend UI | Ultra-responsive layout engineered with React 18, Vite, and Tailwind CSS. |
| 💼 Role-Based Access | Rigid programmatic sandboxing for Students, Wardens, and System Administrators. |
| 🔄 Relational Storage | Persistent relational data mapping with high-performance MySQL database management. |

---

🏛️ Four-Layer Intelligence Stack

┌─────────────────────────────────────────────────────────────────┐
│                    📱 STUDENT CHAT INTERFACE                     │
│        "The AC in room 304 is leaking water heavily"            │
└────────────────────────────┬────────────────────────────────────┘
                             │
          ╔══════════════════▼═══════════════════════════════════╗
          ║  🔒 LAYER 1 · GATEWAY SECURITY & RBAC                ║
          ║  ✓ Spring Security Route Guard                       ║
          ║  ✓ Bearer JWT Token Interceptor Verification          ║
          ║  📊 Status: AUTHORIZED ✅                             ║
          ╚═══════════════════╤══════════════════════════════════╝
                              │
          ╔══════════════════▼═══════════════════════════════════╗
          ║  🧠 LAYER 2 · GEMINI NLP INFERENCE                   ║
          ║  ✓ Slot Extraction: Category ──► Infrastructure      ║
          ║  ✓ Target Location: Room ──► 304                     ║
          ║  ✓ Issue Mining: Complaint ──► AC Leakage            ║
          ╚═══════════════════╤══════════════════════════════════╝
                              │
          ╔══════════════════▼═══════════════════════════════════╗
          ║  🗄️ LAYER 3 · DATABASE COHESION LAYER                ║
          ║  ✓ Spring Data JPA Context Syncing                   ║
          ║  ✓ Room & Student Roster Verification                ║
          ╚═══════════════════╤══════════════════════════════════╝
                              │
          ╔══════════════════▼═══════════════════════════════════╗
          ║  ⚖️ LAYER 4 · OPERATIONS DECISION ENGINE             ║
          ║  ✓ Automated Queue Generation                        ║
          ║  ✓ Real-Time Warden State Notification Payload        ║
          ║  ✅ Output: COMPLAINT LODGED SUCCESSFUL              ║
          ╚══════════════════════════════════════════════════════╝

---

🆚 Why Hostel AI Agent?

| Capability | Legacy Legacy Portals | Hostel AI Agent 🤖 |
| :--- | :--- | :--- |
| **Input Interface** | Complex structural multi-input web forms | ✨ Free-text Natural Language Conversational Flow |
| **Authentication** | Basic Session/Cookie management | 🔐 Enterprise Graded Stateless JWT Middleware |
| **Leave Management** | Manual paper trails & physical tracking | ⚡ Automated Date Context Extraction via Gemini Engine |
| **Build System** | Heavy legacy Webpack / CRA structures | 🚀 High-speed atomic compilation via Vite Bundler |
| **Database Design**| Messy local text flat logs | 🗄️ Normalized relational constraints via MySQL 8.0 |

---

🏗️ System Architecture

```text
               ┌──────────────────────────────┐
               │    React 18 SPA Client       │
               │   (Tailwind CSS + Vite)      │
               └──────────────┬───────────────┘
                              │
                      HTTP / REST (Axios)
                              │
               ┌──────────────▼──────────────┐
               │     Spring Boot 3.2.0        │
               │   Core Enterprise Server     │
               └──────┬────────────────┬─────╝
                      │                │
             Spring Data JPA       Proxy API
                      │                │
       ┌──────────────▼──────┐  ┌──────▼──────────────┐
       │     MySQL 8.0       │  │  Google Gemini Pro  │
       │  Relational Storage │  │    AI LLM Engine    │
       └─────────────────────┘  └─────────────────────┘
🗂️ Project StructurePlaintextHostel-Management-AI-Agent/
├── backend/                 # Spring Boot Enterprise Core Server
│   ├── src/main/java/com/hostel/
│   │   ├── model/           # Data Entities (Student, Warden, Room, Complaint)
│   │   ├── repository/      # Spring Data JPA Interfaces
│   │   └── service/         # Gemini AI Parsing & Core Domain Logic
│   │   └── HostelManagementApplication.java
│   └── pom.xml              # Maven Object Model Dependency Tree
├── frontend/                # React Vite SPA Web Client Architecture
│   ├── src/
│   │   ├── components/      # Modular UI Fragments & Dashboard Panels
│   │   ├── App.jsx          # React Router 6 Gateway Routing
│   │   └── main.jsx         # Virtual DOM Mounting Root
│   └── vite.config.js       # Core Vite Compiler Controls
├── schema.sql               # Production Schema Relational Footprint
└── README.md                # System Documentation Manual
🚀 Quick Start Setup1 · Clone and Build InfrastructureBashgit clone [https://github.com/PavithraRajendran17/Hostel-Management-AI-Agent](https://github.com/PavithraRajendran17/Hostel-Management-AI-Agent)
cd Hostel-Management-AI-Agent
2 · Spin Up Relational Database TargetExecute the schema architecture script using the MySQL Client CLI or Workbench:SQLCREATE DATABASE hostel_management;
USE hostel_management;
Bashmysql -u root -p hostel_management < schema.sql
3 · Boot Up Backend Application CoreConfigure your database properties and Gemini Secrets in backend/src/main/resources/application.properties:Propertiesspring.datasource.url=jdbc:mysql://localhost:3306/hostel_management
spring.datasource.username=YOUR_MYSQL_USER
spring.datasource.password=YOUR_MYSQL_PASSWORD
gemini.api.key=YOUR_GOOGLE_GEMINI_API_KEY
Execute the Maven runner wrapper pipeline:Bashcd backend
mvn clean install
mvn spring-boot:run
4 · Launch Client Web DashboardInstantly bring up the compiled frontend interface asset layer:Bashcd frontend
npm install
npm run dev
🔐 Demo Accounts MatrixRoleTarget UsernamePassword Scheme👨‍🎓 Studentstudentpassword👮 Wardenwardenpassword🛡️ Administratoradminpassword🌐 API EndpointsMethodEndpoint RuleOperation MappingToken SecurityPOST/api/auth/loginYields Authorization Bearer TokenPublicPOST/api/chat/parsePasses input to Gemini AI NLP engineStudent ScopeGET/api/complaintsReturns a list of all hostel complaintsWarden ScopePUT/api/leave-requests/{id}/statusApproves or Rejects a specific leave requestWarden Scope🎨 Engineered for advanced academic project showcase and modern smart campus operations. Developed with ❤️ by Pavithra Rajendran.
