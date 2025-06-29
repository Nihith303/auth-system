# Full-Stack Authentication System

A complete authentication system with a React frontend and Node.js backend, built with TypeScript, featuring secure user registration, login, and protected routes.

## Features

### Backend Features
- ✅ User registration with validation
- ✅ User login with JWT authentication
- ✅ Protected routes with middleware
- ✅ Password hashing with bcrypt
- ✅ Input validation with Zod
- ✅ Rate limiting
- ✅ Security headers with Helmet
- ✅ CORS support
- ✅ Comprehensive error handling
- ✅ TypeScript support

### Frontend Features
- ✅ Modern React 19 with TypeScript
- ✅ Responsive UI with Tailwind CSS
- ✅ Form handling with React Hook Form
- ✅ Client-side validation with Zod
- ✅ Protected routes with React Router
- ✅ Context-based authentication state
- ✅ Axios for API communication
- ✅ Beautiful and intuitive user interface

## Tech Stack

### Backend
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: MySQL
- **ORM**: Prisma
- **Authentication**: JWT
- **Password Hashing**: bcrypt
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting

### Frontend
- **Framework**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Forms**: React Hook Form
- **Validation**: Zod
- **HTTP Client**: Axios
- **Icons**: Lucide React

## Prerequisites

- Node.js (v16 or higher)
- MySQL database
- npm or yarn

## Installation

### 1. Clone the Repository
```bash
git clone <repository-url>
cd auth
```

### 2. Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env
   ```
   
   Edit `.env` file with your configuration:
   ```env
   DATABASE_URL="mysql://username:password@localhost:3306/auth_system"
   JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
   JWT_EXPIRES_IN="1h"
   PORT=3001
   NODE_ENV="development"
   BCRYPT_ROUNDS=12
   ```

4. **Set up the database**
   ```bash
   # Generate Prisma client
   npm run db:generate
   
   # Push schema to database
   npm run db:push
   ```

5. **Start the backend development server**
   ```bash
   npm run dev
   ```

### 3. Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd ../frontend
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Start the frontend development server**
   ```bash
   npm start
   ```

## Running the Application

### Development Mode

1. **Start the backend server** (from backend directory)
   ```bash
   cd backend
   npm run dev
   ```
   Backend will run on `http://localhost:3001`

2. **Start the frontend server** (from frontend directory)
   ```bash
   cd frontend
   npm start
   ```
   Frontend will run on `http://localhost:3000`

### Production Mode

1. **Build the backend**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

## API Endpoints

### Authentication

#### POST /auth/signup
Register a new user.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### POST /auth/login
Login with existing credentials.

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

#### GET /auth/me
Get current user information (requires authentication).

**Headers:**
```
Authorization: Bearer <token>
```

**Response:**
```json
{
  "success": true,
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### Health Check

#### GET /health
Check server status.

**Response:**
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "environment": "development"
}
```

## Frontend Pages

### Authentication Pages
- **Login Page** (`/login`) - User login form
- **Signup Page** (`/signup`) - User registration form
- **Dashboard** (`/dashboard`) - Protected dashboard page

### Features
- Responsive design that works on all devices
- Form validation with real-time feedback
- Protected routes with automatic redirects
- Persistent authentication state
- Clean and modern UI with Tailwind CSS

## Error Responses

All endpoints return consistent error responses:

```json
{
  "success": false,
  "message": "Error description"
}
```

For validation errors:
```json
{
  "success": false,
  "message": "Validation failed",
  "errors": {
    "email": ["Invalid email address"],
    "password": ["Password must be at least 8 characters"]
  }
}
```

## Development

### Backend Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run db:generate` - Generate Prisma client
- `npm run db:push` - Push schema changes to database
- `npm run db:migrate` - Run database migrations
- `npm run db:studio` - Open Prisma Studio

### Frontend Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Project Structure

```
├── backend/                # Backend Node.js application
│   ├── src/               # Backend source code
│   │   ├── index.ts       # Main application entry point
│   │   ├── lib/
│   │   │   └── prisma.ts  # Prisma client configuration
│   │   ├── middleware/
│   │   │   ├── auth.ts    # Authentication middleware
│   │   │   ├── errorHandler.ts # Error handling middleware
│   │   │   └── notFound.ts # 404 handler
│   │   ├── routes/
│   │   │   └── auth.ts    # Authentication routes
│   │   ├── types/
│   │   │   └── index.ts   # TypeScript type definitions
│   │   └── utils/
│   │       ├── auth.ts    # Authentication utilities
│   │       └── validation.ts # Zod validation schemas
│   ├── prisma/
│   │   └── schema.prisma  # Database schema
│   ├── package.json       # Backend dependencies
│   ├── tsconfig.json      # TypeScript configuration
│   ├── Dockerfile         # Backend Docker configuration
│   └── env.example        # Environment variables template
├── frontend/              # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   │   ├── Dashboard.tsx
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── contexts/      # React contexts
│   │   │   └── AuthContext.tsx
│   │   ├── services/      # API services
│   │   │   └── api.ts
│   │   ├── types/         # TypeScript types
│   │   │   └── auth.ts
│   │   ├── utils/         # Utility functions
│   │   │   └── validation.ts
│   │   ├── App.tsx        # Main App component
│   │   └── index.tsx      # Application entry point
│   ├── package.json       # Frontend dependencies
│   ├── tailwind.config.js # Tailwind CSS configuration
│   ├── Dockerfile         # Frontend Docker configuration
│   └── nginx.conf         # Nginx configuration
├── docker-compose.yml     # Docker Compose configuration
├── .gitignore            # Git ignore rules
└── README.md             # This file
```

## Security Features

### Backend Security
- **Password Hashing**: bcrypt with configurable rounds
- **JWT Tokens**: Secure token-based authentication
- **Rate Limiting**: Prevents brute force attacks
- **Security Headers**: Helmet.js for security headers
- **CORS**: Configurable cross-origin resource sharing
- **Input Validation**: Zod schema validation
- **Error Handling**: Secure error responses

### Frontend Security
- **Protected Routes**: Automatic redirect for unauthenticated users
- **Token Storage**: Secure token management
- **Form Validation**: Client-side validation with Zod
- **HTTPS**: Secure communication with backend
- **XSS Protection**: React's built-in XSS protection

## Deployment

### Environment Variables for Production

**Backend (.env):**
```env
DATABASE_URL="mysql://username:password@host:3306/database"
JWT_SECRET="very-long-random-secret-key"
JWT_EXPIRES_IN="1h"
PORT=3001
NODE_ENV="production"
BCRYPT_ROUNDS=12
```

**Frontend (.env):**
```env
REACT_APP_API_URL="http://your-backend-url:3001"
```

### Build and Deploy

1. **Build the backend**
   ```bash
   cd backend
   npm run build
   npm start
   ```

2. **Build the frontend**
   ```bash
   cd frontend
   npm run build
   ```

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

2. **Or build individual services**
   ```bash
   # Build backend
   docker build -t auth-system-backend ./backend
   
   # Build frontend
   docker build -t auth-system-frontend ./frontend
   ```

## Database Schema

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

MIT License - see LICENSE file for details. 