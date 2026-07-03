# Hostel Management AI Agent

An AI-powered hostel management system with natural language processing capabilities for handling student complaints and leave requests.

## Features

- **AI-Powered Chat Assistant**: Students can interact with the system using natural language to report complaints or request leave
- **Role-Based Access**: Separate interfaces for Students, Wardens, and Admins
- **Real-time Dashboard**: Warden dashboard to manage and approve/reject complaints and leave requests
- **Modern UI**: Built with React.js and Tailwind CSS for a responsive and beautiful interface
- **Secure Authentication**: JWT-based authentication with Spring Security
- **Database Integration**: MySQL database for persistent data storage

## Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Spring Data JPA
- Spring Security
- JWT (JJWT)
- MySQL Connector
- Gemini API for AI processing

### Frontend
- React 18
- React Router 6
- Vite
- Tailwind CSS
- Lucide React Icons
- Axios

## Prerequisites

Before running this project, ensure you have the following installed:

- **Java Development Kit (JDK) 17** or higher
- **Apache Maven** 3.6 or higher
- **Node.js** 18 or higher
- **npm** or **yarn**
- **MySQL Server** 8.0 or higher
- **Gemini API Key** (Get one from [Google AI Studio](https://makersuite.google.com/))

## Project Structure

```
Hostel-Management-AI-Agent/
├── backend/                 # Spring Boot backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── com/hostel/
│   │   │   │       ├── model/        # Entity classes
│   │   │   │       ├── repository/   # JPA repositories
│   │   │   │       └── service/      # Business logic & AI service
│   │   │   └── resources/
│   │   │       └── application.properties
│   └── pom.xml
├── frontend/                # React frontend
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── package.json
│   └── vite.config.js
├── schema.sql               # MySQL database schema
└── README.md
```

## Setup Instructions

### 1. Database Setup

#### Step 1: Install MySQL Server
If you don't have MySQL installed, download and install it from the [official website](https://dev.mysql.com/downloads/mysql/).

#### Step 2: Create Database
Open MySQL Command Line Client or MySQL Workbench and run:

```sql
CREATE DATABASE hostel_management;
```

#### Step 3: Run Schema Script
Execute the `schema.sql` file to create all required tables and insert sample data:

```bash
# Using MySQL Command Line
mysql -u root -p hostel_management < schema.sql

# Or using MySQL Workbench
# Open schema.sql and execute the script
```

The schema will create the following tables:
- `users` - Authentication users
- `students` - Student information
- `wardens` - Warden information
- `rooms` - Room details
- `complaints` - Student complaints
- `leave_requests` - Leave requests

### 2. Backend Configuration

#### Step 1: Configure Database Connection
Edit `backend/src/main/resources/application.properties`:

```properties
# Update these values according to your MySQL setup
spring.datasource.url=jdbc:mysql://localhost:3306/hostel_management
spring.datasource.username=root
spring.datasource.password=YOUR_MYSQL_PASSWORD
```

#### Step 2: Configure Gemini API Key
Get your Gemini API key from [Google AI Studio](https://makersuite.google.com/) and add it to `application.properties`:

```properties
gemini.api.key=YOUR_GEMINI_API_KEY
```

#### Step 3: Configure JWT Secret (Optional)
For production, update the JWT secret with a secure random string:

```properties
jwt.secret=your-secure-random-secret-key
jwt.expiration=86400000
```

### 3. Running the Backend

#### Option 1: Using Maven Command Line
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

#### Option 2: Using IDE
1. Open the project in IntelliJ IDEA or Eclipse
2. Import as a Maven project
3. Run the main application class (once created)

The backend will start on `http://localhost:8080`

### 4. Frontend Setup

#### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

#### Step 2: Run Development Server
```bash
npm run dev
```

The frontend will start on `http://localhost:3000`

#### Step 3: Build for Production
```bash
npm run build
```

The production build will be in the `dist/` folder.

## Usage

### Login Credentials (Demo)

The system comes with pre-configured demo users:

| Role    | Username | Password |
|---------|----------|----------|
| Student | student  | password |
| Warden  | warden   | password |
| Admin   | admin    | password |

### Student Workflow

1. Login as a Student
2. Use the chat interface to:
   - Report complaints (e.g., "The AC in my room is not working")
   - Request leave (e.g., "I need leave from tomorrow to next Monday for a family function")
   - Check status of previous requests

### Warden Workflow

1. Login as a Warden
2. View the dashboard with:
   - Statistics overview
   - Pending complaints list
   - Pending leave requests
3. Approve or reject requests using the action buttons
4. Filter by status (All, Pending, Approved, Rejected)

## API Endpoints

The backend exposes the following endpoints (to be implemented):

- `POST /api/auth/login` - User authentication
- `POST /api/chat/parse` - Parse natural language input
- `GET /api/complaints` - Get all complaints
- `POST /api/complaints` - Create a complaint
- `PUT /api/complaints/{id}/status` - Update complaint status
- `GET /api/leave-requests` - Get all leave requests
- `POST /api/leave-requests` - Create a leave request
- `PUT /api/leave-requests/{id}/status` - Update leave request status

## Troubleshooting

### Backend Issues

**Issue**: Connection refused to MySQL
- **Solution**: Ensure MySQL server is running and credentials in `application.properties` are correct

**Issue**: Gemini API errors
- **Solution**: Verify your API key is valid and has sufficient quota

**Issue**: Port 8080 already in use
- **Solution**: Change the port in `application.properties`: `server.port=8081`

### Frontend Issues

**Issue**: Module not found errors
- **Solution**: Run `npm install` in the frontend directory

**Issue**: Proxy errors to backend
- **Solution**: Ensure backend is running on port 8080

**Issue**: Port 3000 already in use
- **Solution**: Change the port in `vite.config.js`: `server.port: 3001`

## Development

### Adding New Features

1. **Backend**: Add new entities, repositories, and services in the respective packages
2. **Frontend**: Create new components in `frontend/src/components/`
3. **API Integration**: Update the API calls in React components to connect with backend endpoints

### Code Style

- Backend: Follow Spring Boot conventions and Java best practices
- Frontend: Use functional components with hooks, follow React best practices

## License

This project is created for educational purposes.

## Support

For issues or questions, please refer to the project documentation or contact the development team.
