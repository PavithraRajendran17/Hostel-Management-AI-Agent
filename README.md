```text
██╗  ██╗ ██████╗ ███████╗████████╗███████╗██╗         █████╗ ██╗
██║  ██║██╔═══██╗██╔════╝╚══██╔══╝██╔════╝██║        ██╔══██╗██║
███████║██║   ██║███████╗   ██║   █████╗  ██║        ███████║██║
██╔══██║██║   ██║╚════██║   ██║   ██╔══╝  ██║        ██╔══██║██║
██║  ██║╚██████╔╝███████║   ██║   ███████╗███████╗   ██║  ██║██║
╚═╝  ╚═╝ ╚═════╝ ╚══════╝   ╚═╝   ╚══════╝╚══════╝   ╚═╝  ╚═╝╚═╝
Hostel Management AI AgentNext-Generation AI Hostel Operations EcosystemAutonomous • Natural Language Processing • Role-Based Security📑 Table of Contents🎯 Key Features🏛️ Four-Layer Intelligence Stack🆚 Why Hostel AI Agent?🏗️ System Architecture📁 Repository Structure🚀 Quick Start Setup🔐 Demo Accounts Matrix🌐 API Endpoints🎯 Key FeaturesFeatureCore Technical Description🤖 Gemini AIUnderstands free-text prompts via contextual extraction.🔐 Secure AuthStateless JWT infrastructure backed by Spring Security.📊 DashboardReal-time multi-state request tracking for Wardens.🎨 Modern UIUltra-responsive app engineered via React 18 & Vite.💼 RBAC FlowStrict programmatic isolation for Student/Warden/Admin.🗄️ StorageNormalized relational storage engine using MySQL 8.0.🏛️ Four-Layer Intelligence StackPlaintext┌─────────────────────────────────────────────────────────────────┐
│                    📱 STUDENT CHAT INTERFACE                     │
│        "The AC in room 304 is leaking water heavily"            │
└────────────────────────────┬────────────────────────────────────┘
                             │
          ╔══════════════════▼═══════════════════════════════════╗
          ║  🔒 LAYER 1 · GATEWAY SECURITY & RBAC                ║
          ║  ✓ Spring Security Guard & Bearer JWT Interception   ║
          ╚═══════════════════╤══════════════════════════════════╝
                              │
          ╔══════════════════▼═══════════════════════════════════╗
          ║  🧠 LAYER 2 · GEMINI NLP INFERENCE                   ║
          ║  ✓ Category: Infrastructure  | Location: Room 304    ║
          ╚═══════════════════╤══════════════════════════════════╝
                              │
          ╔══════════════════▼═══════════════════════════════════╗
          ║  🗄️ LAYER 3 · DATABASE COHESION LAYER                ║
          ║  ✓ Spring Data JPA Sync & Student Roster Verification ║
          ╚═══════════════════╤══════════════════════════════════╝
                              │
          ╔══════════════════▼═══════════════════════════════════╗
          ║  ⚖️ LAYER 4 · OPERATIONS DECISION ENGINE             ║
          ║  ✅ Output: COMPLAINT LODGED SUCCESSFUL              ║
          ╚══════════════════════════════════════════════════════╝
🆚 Why Hostel AI Agent?Metric CoreLegacy PortalsHostel AI Agent 🤖User InterfaceComplex data web forms✨ Free-text Natural Language FlowAuth EngineBasic Session/Cookies🔐 Stateful Stateless JWT Bearer GuardLeave RoutingManual tracking trails⚡ Automatic Date Extraction via GeminiBuild EngineHeavy Webpack / CRA🚀 High-speed atomic compilation via ViteData DesignFlat file log structures🗄️ Rigid normalized MySQL relational mapping🏗️ System ArchitecturePlaintext               ┌──────────────────────────────┐
               │    React 18 SPA UI Client    │
               │   (Tailwind CSS + Vite Engine)│
               └──────────────┬───────────────┘
                              │ HTTP / REST (Axios)
               ┌──────────────▼──────────────┐
               │     Spring Boot 3.2.0        │
               │    Core Backend Gateway      │
               └──────┬────────────────┬─────╝
                      │                │
         Spring Data JPA               │ Gemini Proxy API
                      │                │
       ┌──────────────▼──────┐  ┌──────▼──────────────┐
       │     MySQL 8.0       │  │  Google Gemini Pro  │
       │  Relational Database│  │    AI LLM Engine    │
       └─────────────────────┘  └─────────────────────┘
🗂️ Project StructurePlaintextHostel-Management-AI-Agent/
├── backend/                 # Spring Boot Production Core Server
│   ├── src/main/java/com/hostel/
│   │   ├── model/           # Data Entities (Student, Room, Complaint)
│   │   ├── repository/      # Spring Data JPA Targets
│   │   └── service/         # Gemini AI Parsing Domain Logic
│   └── pom.xml              # Maven Core Object Dependencies Tree
├── frontend/                # React Vite SPA Web Client Architecture
│   ├── src/
│   │   ├── components/      # UI Dashboard Composition Fragments
│   │   ├── App.jsx          # React Router 6 Structural Routing
│   │   └── main.jsx         # Virtual DOM Bootstrapper
│   └── vite.config.js       # Core Vite Compiler Pipeline Rules
├── schema.sql               # Production Schema Relational Blueprint
└── README.md                # System Documentation Manual
🚀 Quick Start Setup1 · Clone Infrastructure RepositoryBashgit clone [https://github.com/PavithraRajendran17/Hostel-Management-AI-Agent](https://github.com/PavithraRajendran17/Hostel-Management-AI-Agent)
cd Hostel-Management-AI-Agent
2 · Deploy Relational Database Target SchemaSQLCREATE DATABASE hostel_management;
USE hostel_management;
Bashmysql -u root -p hostel_management < schema.sql
3 · Boot Up Spring Boot Application Core ServerConfigure your local parameters inside backend/src/main/resources/application.properties:Propertiesspring.datasource.url=jdbc:mysql://localhost:3306/hostel_management
spring.datasource.username=YOUR_MYSQL_USER
spring.datasource.password=YOUR_MYSQL_PASSWORD
gemini.api.key=YOUR_GOOGLE_GEMINI_API_KEY
Launch the system engine pipeline setup:Bashcd backend
mvn clean install
mvn spring-boot:run
4 · Launch Client Web Dashboard InterfaceBashcd frontend
npm install
npm run dev
🔐 Demo Accounts MatrixRole ScopeUsername CredentialsPassword Scheme
👨‍🎓 Studentstudentpassword
👮 Wardenwardenpassword
🛡️ Administratoradminpassword
🌐 API EndpointsMethodEndpoint Target RuleOperation Mapping ContextAuth TargetPOST/api/auth/loginYields Access JWT Token StringPublicPOST/api/chat/parseStreams text payload to Gemini NLPStudentGET/api/complaintsResolves arrays of submitted issuesWardenPUT/api/leave-requests/{id}/statusToggles leave lifecycle flow targetsWarden🎨 Engineered for advanced academic project showcase and modern smart campus operations. Developed with ❤️ by Pavithra Rajendran.
