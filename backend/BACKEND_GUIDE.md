# Backend Implementation & Usage Guide

## Project Overview
The backend for the Universal University Sports Complex Management System is built with **NestJS**, providing a robust, scalable, and type-safe API for managing users, sports facilities, bookings, and tournaments.

### Core Tech Stack
- **Framework:** NestJS (Node.js)
- **Database:** PostgreSQL
- **ORM:** TypeORM
- **Authentication:** JWT (JSON Web Tokens) with Passport.js
- **Security:** Bcrypt for password hashing

## Implementation Details
We have implemented the following core modules:

1.  **Auth Module:** Handles user registration, login, and secure session management.
2.  **Users Module:** Manages user profiles and roles (Student, Staff, Admin).
3.  **Facilities Module:** Handles management of sports facilities (Indoor/Outdoor).
4.  **Bookings Module:** Manages the lifecycle of facility slot bookings.
5.  **Tournaments Module:** Handles tournament creation and team registrations.

### Database Setup
The system uses **TypeORM** for database operations. A dummy data script is provided to quickly populate the system for testing.

**Initialize Dummy Data:**
Run the `backend/dummy_data.sql` script in your PostgreSQL database to create test users and facilities.
- **Admin:** `admin@university.edu` / `password123`
- **Staff:** `staff@university.edu` / `password123`
- **Student:** `student@university.edu` / `password123`

## How to Use

### Installation
```bash
cd backend
npm install
```

### Environment Configuration
Create a `.env` file in the `backend` directory with the following variables:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=your_username
DB_PASSWORD=your_password
DB_NAME=smart_sports_complex
JWT_SECRET=your_super_secret_key
```

### Running the Server
```bash
# Development mode
npm run start:dev

# Production mode
npm run build
npm run start:prod
```

### API Documentation
Once running, the Swagger documentation is typically available at `http://localhost:3000/api`.
