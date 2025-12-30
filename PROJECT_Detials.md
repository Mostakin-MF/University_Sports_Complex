# Universal University Sports Complex Management System
## Detailed Project Specification & Development Guide

**Institution:** University
**Department:** Computer Science
**Semester:** Summer_23_24
**Version:** 1.0.0
**Last Updated:** December 2024

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [System Architecture](#system-architecture)
3. [Functional Requirements](#functional-requirements)
4. [Non-Functional Requirements](#non-functional-requirements)
5. [Database Design](#database-design)
6. [API Specification](#api-specification)
7. [Frontend Implementation Guide](#frontend-implementation-guide)
8. [Backend Implementation Guide](#backend-implementation-guide)
9. [Security Implementation](#security-implementation)
10. [Testing Strategy](#testing-strategy)
11. [Deployment & DevOps](#deployment--devops)
12. [Project Timeline](#project-timeline)

---

## Executive Summary

### Problem Statement

The current university sports complex management at our University suffers from:
- **Inefficient Booking System:** Manual processes leading to double bookings and confusion
- **Limited Information Access:** No real-time facility availability updates
- **Underutilization:** Poor scheduling and facility management
- **Inadequate Communication:** Disconnect between administration and students
- **Security Concerns:** Inadequate tracking and access control

### Solution Overview

The Universal University Sports Complex Management System is a comprehensive, modern web application that:
- Streamlines online facility booking with real-time slot management
- Provides transparent, accessible information to all users
- Optimizes facility utilization through data-driven insights
- Enhances communication via notifications and announcements
- Implements robust security measures and audit logging

### Project Objectives

1. **Streamline Operations:** Reduce manual administrative overhead by 80%
2. **Improve User Experience:** Provide intuitive, accessible booking interface
3. **Maximize Facility Utilization:** Increase usage by 40% through transparency
4. **Enhance Communication:** Implement real-time notifications and updates
5. **Ensure Security:** Implement role-based access and comprehensive audit logging

### Target Users

- **Students:** 5,000+ active users
- **Staff & Facility Managers:** 50+ users
- **Administrators:** 10+ users
- **System Admins:** 3-5 users

### Expected Benefits

- **For Students:** 95% reduction in booking time, 24/7 access, real-time confirmations
- **For Administrators:** Automated workflows, comprehensive analytics, better resource planning
- **For Institution:** Better facility utilization, improved student satisfaction, data-driven decisions

---

## System Architecture

### 3-Tier Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│                    PRESENTATION LAYER                   │
│  (Next.js Frontend + React Components + Tailwind CSS)   │
└────────────────────────┬────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────┐
│                    APPLICATION LAYER                    │
│  (NestJS REST API + Business Logic + Service Layer)     │
└────────────────────────┬────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────┐
│                     DATA LAYER                          │
│  (PostgreSQL + TypeORM + Database Schema)               │
└─────────────────────────────────────────────────────────┘
```

### Component Interaction Diagram

```
Frontend (Next.js)
    ↓
API Gateway (CORS, Auth Middleware)
    ↓
NestJS Controllers → Services → Repositories
    ↓
TypeORM Entities
    ↓
PostgreSQL Database
    ↓
External Services (Email, etc.)
```

### Technology Stack Details

#### Frontend Stack

```json
{
  "framework": "Next.js 14+",
  "ui_library": "React 18+",
  "styling": "Tailwind CSS 3.x",
  "http_client": "Axios",
  "state_management": "Context API + useReducer",
  "form_handling": "React Hook Form",
  "validation": "Zod / Yup",
  "component_library": "Custom + Headless UI",
  "icons": "React Icons / Heroicons",
  "testing": "Jest + React Testing Library",
  "deployment": "Vercel"
}
```

#### Backend Stack

```json
{
  "runtime": "Node.js 18+",
  "framework": "NestJS",
  "language": "TypeScript",
  "database": "PostgreSQL 14+",
  "orm": "TypeORM 0.3+",
  "authentication": "JWT + Passport.js",
  "validation": "Class Validator",
  "email": "Nodemailer / SendGrid",
  "caching": "Redis (optional)",
  "logging": "Winston",
  "documentation": "Swagger/OpenAPI",
  "testing": "Jest + Supertest",
  "deployment": "Docker + AWS/DigitalOcean"
}
```

### Scalability Approach

- **Database:** Connection pooling, query optimization, indexing
- **Backend:** Horizontal scaling via Docker/Kubernetes
- **Frontend:** CDN for static assets, lazy loading, code splitting
- **Caching:** Redis for session management and frequent queries
- **Load Balancing:** NGINX for distributed requests

---

## Functional Requirements

### 1. User Management System

#### 1.1 User Registration (FR_1)
**Priority:** High  
**Actor:** New Student  
**Preconditions:** User must be a valid AIUB student

**Main Flow:**
1. User navigates to registration page
2. User enters required information:
   - Full Name
   - Email Address
   - Phone Number
   - Student ID
   - Institution Name
3. System validates input
4. User clicks "Sign Up"
5. System sends confirmation email
6. User receives confirmation and account activation link

**Postconditions:**
- User data stored in database with `active = false` status
- Confirmation email sent
- Account activated after email verification

**Error Handling:**
- Duplicate email → Display error message
- Invalid student ID → Reject registration
- Email delivery failure → Show retry option

#### 1.2 User Login (FR_2)
**Priority:** High  
**Actor:** Registered Student/Staff/Admin  
**Preconditions:** User must be registered

**Main Flow:**
1. User navigates to login page
2. User enters email and password
3. System validates credentials
4. System generates JWT token
5. User granted access to system
6. Session logged in database

**Postconditions:**
- JWT token generated (expires in 24 hours)
- Refresh token stored securely
- Login timestamp recorded

**Error Handling:**
- Invalid credentials → 3-attempt lockout after failed attempts
- Account not activated → Show activation link
- Account suspended → Show admin contact info

#### 1.3 User Profile Management
**Priority:** Medium  
**Features:**
- View profile information
- Update personal details
- Change password
- Upload profile photo
- View booking history
- Download receipt/invoice

### 2. Slot Booking System

#### 2.1 View Available Slots (FR_3.1)
**Priority:** High  
**Actor:** Student  

**Main Flow:**
1. User logged in
2. Click "Browse Slots"
3. Filter by:
   - Facility type (indoor/outdoor)
   - Sport type (basketball, tennis, etc.)
   - Date range
   - Time range
4. System displays available slots with:
   - Facility name and location
   - Available time slots
   - Current booking count
   - Price (if applicable)

**Features:**
- Real-time availability status
- Visual calendar interface
- Sorting by popularity or time
- Save favorite facilities

#### 2.2 Book a Slot (FR_3.2)
**Priority:** High  
**Actor:** Student  
**Preconditions:** User logged in, slot available

**Main Flow:**
1. User selects desired slot
2. User enters team details:
   - Number of players
   - Player names and IDs
   - Contact person
3. User selects optional equipment
4. Review booking summary
5. Confirm booking
6. Payment (if applicable)
7. System sends confirmation email

**Postconditions:**
- Booking record created in database
- Confirmation email sent
- Slot availability updated
- Reminder notification scheduled

**Business Rules:**
- Minimum 2 players required
- Maximum players based on facility capacity
- Cannot book same slot twice
- Cancellation allowed up to 4 hours before slot
- No-show penalty after 2 infractions → Temporary ban

#### 2.3 Modify/Cancel Booking (FR_3.3)
**Priority:** Medium  
**Actor:** Student/Admin

**Modification Rules:**
- Can modify up to 4 hours before slot
- Can change number of players, team members
- Cannot modify facility or start time

**Cancellation Rules:**
- Full refund if cancelled 24+ hours before
- 50% refund if cancelled 4-24 hours before
- No refund if cancelled within 4 hours
- Admin can cancel with reason notification

### 3. Tournament Management

#### 3.1 Tournament Creation (FR_4)
**Priority:** High  
**Actor:** Administrator  

**Main Flow:**
1. Admin clicks "Create Tournament"
2. Enter tournament details:
   - Tournament name
   - Sport type
   - Scheduled dates
   - Total teams allowed
   - Registration fee
   - Description and rules
   - Tournament format (round-robin, knockout, etc.)
3. Add tournament schedule:
   - Match dates
   - Venue
   - Team brackets (if known)
4. Publish tournament
5. Notifications sent to eligible students

**Postconditions:**
- Tournament record created
- Registration opens automatically
- Schedule published

#### 3.2 Tournament Registration (FR_5)
**Priority:** High  
**Actor:** Student/Team Captain

**Main Flow:**
1. User clicks "Register for Tournament"
2. Accept terms and conditions
3. Enter team details:
   - Team name
   - Captain name and ID
   - Team members (names and IDs)
   - Contact information
4. Confirm registration
5. System verifies data and accepts payment

**Validation:**
- All players must be active students
- No duplicate player registrations in same tournament
- Fees collected before confirmation

**Postconditions:**
- Team created and linked to tournament
- Payment processed
- Confirmation email sent

#### 3.3 Tournament Management by Admin (FR_6)
**Priority:** Medium  
**Features:**
- Modify tournament details
- Update tournament schedule
- Manage team registrations
- Generate tournament brackets
- Update tournament status
- Send notices to participants
- View tournament statistics
- Ban teams/players for disciplinary reasons

### 4. Facility Management

#### 4.1 Create Slots (Admin)
**Priority:** High  
**Fields:**
- Facility name and location
- Slot time (start/end)
- Sport type
- Maximum capacity
- Equipment provided
- Special instructions
- Recurring pattern (daily, weekly, etc.)

#### 4.2 Modify Slots (Admin)
**Priority:** Medium  
**Modifiable Fields:**
- Time range
- Capacity
- Status (available, maintenance, closed)
- Equipment list

#### 4.3 Delete Slots (Admin)
**Priority:** Medium  
**Business Rules:**
- Can only delete future slots
- Cannot delete booked slots
- Must provide reason for deletion
- Send notifications to affected users

#### 4.4 Facility Maintenance Management
**Features:**
- Schedule maintenance windows
- Update facility status
- Generate maintenance reports
- Track maintenance history

### 5. Notification System

#### 5.1 Booking Notifications
**Triggers:**
- Booking confirmation → Immediate email + SMS
- 24 hours before booking → Reminder notification
- 1 hour before booking → Final reminder
- Booking modified → Notification to all members
- Booking cancelled → Refund notification with details

#### 5.2 Tournament Notifications
**Triggers:**
- Tournament created → Email to eligible students
- Registration opened/closed → Notifications
- Team registered → Confirmation email
- Match schedule released → Calendar invite
- Match reminder → 24h and 1h before
- Results posted → Notification to teams

#### 5.3 System Announcements
**Features:**
- Admin creates announcements
- Filter by audience (students, staff, all)
- In-app notifications
- Email distribution
- Announcement scheduling
- View notification history

### 6. Administrative Dashboard

#### 6.1 Dashboard Overview
**Displays:**
- Total bookings (today, this week, this month)
- Facility utilization rate
- Tournament count (active, completed)
- Active users online
- Revenue generated
- Top facilities
- Peak booking times

#### 6.2 User Management
**Features:**
- View all users with filters
- Search by name, email, ID
- Approve/reject registrations
- Suspend/ban users
- Export user lists
- View user activity logs

#### 6.3 Reports Generation
**Available Reports:**
- Daily/Weekly/Monthly booking reports
- Facility utilization analysis
- Revenue reports
- User engagement metrics
- Tournament participation statistics
- Maintenance history

---

## Non-Functional Requirements

### 1. Performance Requirements

| Metric | Target | Acceptance Criteria |
|--------|--------|-------------------|
| Page Load Time | < 3 seconds | 95th percentile |
| API Response Time | < 2 seconds | 99th percentile |
| Database Query Time | < 500ms | Average query time |
| Concurrent Users | 1000+ | Stable performance |
| Search Speed | < 1 second | 100 results |

### 2. Reliability & Availability

- **Uptime:** 99.9% (43 minutes downtime/month)
- **MTTR:** < 1 hour for critical issues
- **Data Backup:** Daily automated backups, weekly full backups
- **Disaster Recovery:** RPO < 1 hour, RTO < 4 hours
- **Database Replication:** Master-replica setup

### 3. Usability Requirements

- **User Training:** < 30 minutes to learn core features
- **Mobile Responsiveness:** Touch-friendly on 320px+ screens
- **Accessibility:** WCAG 2.1 Level AA compliance
- **Browser Support:** Chrome, Firefox, Safari (latest 2 versions), Edge
- **Error Messages:** Clear, actionable messages in user language (English & Bengali)

### 4. Security Requirements

- **Authentication:** JWT with 24-hour expiration
- **Authorization:** Role-based access control (RBAC)
- **Encryption:** AES-256 for sensitive data at rest, TLS 1.3 in transit
- **Password Policy:**
  - Minimum 12 characters
  - Must contain uppercase, lowercase, numbers, special characters
  - Password hashing with bcrypt (12 rounds)
  - Password change every 90 days for admin users
- **Data Protection:**
  - PII encrypted end-to-end
  - GDPR-compliant data handling
  - Audit logging for all sensitive operations
  - Secure deletion procedures (7-pass overwrite)

### 5. Scalability Requirements

- **Horizontal Scaling:** Backend stateless, ready for Kubernetes
- **Database Scaling:** Connection pooling, query optimization, indexing strategy
- **Caching:** Redis for frequently accessed data
- **Content Delivery:** CDN for static assets
- **Load Distribution:** NGINX/HAProxy for load balancing
- **Growth Capacity:** Support 10x user growth without major redesign

### 6. Maintainability Requirements

- **Code Quality:**
  - Minimum 80% test coverage (backend)
  - Minimum 70% test coverage (frontend)
  - ESLint configuration for style enforcement
  - TypeScript strict mode enabled
- **Documentation:**
  - API documentation (Swagger/OpenAPI)
  - Code comments for complex logic
  - Architecture documentation
  - Deployment runbooks
- **Monitoring:**
  - Application performance monitoring (APM)
  - Error tracking (Sentry)
  - Log aggregation (ELK stack)
  - Health checks and alerting

### 7. Compatibility Requirements

- **Cross-Platform:** Windows, macOS, Linux
- **Cross-Browser:** Chrome, Firefox, Safari, Edge
- **Mobile:** iOS (12+) and Android (8+) via responsive design
- **Integration:** Seamless integration with existing AIUB systems
- **Data Migration:** Support for legacy system data import

---

## Database Design

### Entity Relationship Diagram (Conceptual)

```
USERS (1) ──→ (M) BOOKINGS
USERS (1) ──→ (M) NOTIFICATIONS
USERS (1) ──→ (M) TOURNAMENT_REGISTRATIONS
FACILITIES (1) ──→ (M) SLOTS
SLOTS (1) ──→ (M) BOOKINGS
TOURNAMENTS (1) ──→ (M) TOURNAMENT_REGISTRATIONS
TOURNAMENTS (1) ──→ (M) TEAMS
TEAMS (1) ──→ (M) PLAYERS
TOURNAMENTS (1) ──→ (M) MATCHES
MATCHES (1) ──→ (M) RESULTS
```

### Core Tables

#### 1. Users Table

```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    student_id VARCHAR(50) UNIQUE,
    phone_number VARCHAR(20),
    role ENUM('STUDENT', 'STAFF', 'ADMIN', 'SUPER_ADMIN') DEFAULT 'STUDENT',
    status ENUM('ACTIVE', 'INACTIVE', 'SUSPENDED', 'BANNED') DEFAULT 'ACTIVE',
    profile_photo_url TEXT,
    bio TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    last_login_at TIMESTAMP,
    email_verified BOOLEAN DEFAULT FALSE,
    email_verified_at TIMESTAMP,
    two_factor_enabled BOOLEAN DEFAULT FALSE,
    is_deleted BOOLEAN DEFAULT FALSE,
    deleted_at TIMESTAMP,
    
    INDEX idx_email (email),
    INDEX idx_student_id (student_id),
    INDEX idx_role (role),
    INDEX idx_status (status)
);
```

#### 2. Facilities Table

```sql
CREATE TABLE facilities (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    location_address TEXT NOT NULL,
    latitude DECIMAL(10, 8),
    longitude DECIMAL(11, 8),
    capacity INT NOT NULL,
    facility_type ENUM('INDOOR', 'OUTDOOR') NOT NULL,
    amenities JSON,
    equipment_available JSON,
    image_url TEXT,
    status ENUM('AVAILABLE', 'MAINTENANCE', 'CLOSED') DEFAULT 'AVAILABLE',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_facility_type (facility_type),
    INDEX idx_status (status)
);
```

#### 3. Slots Table

```sql
CREATE TABLE slots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    facility_id UUID NOT NULL REFERENCES facilities(id),
    sport_type VARCHAR(100) NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    day_of_week INT (0-6, 0=Sunday),
    max_capacity INT NOT NULL,
    current_bookings INT DEFAULT 0,
    status ENUM('AVAILABLE', 'FULL', 'MAINTENANCE') DEFAULT 'AVAILABLE',
    price DECIMAL(10, 2),
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    FOREIGN KEY (facility_id) REFERENCES facilities(id),
    INDEX idx_facility_id (facility_id),
    INDEX idx_sport_type (sport_type),
    INDEX idx_status (status)
);
```

#### 4. Bookings Table

```sql
CREATE TABLE bookings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    slot_id UUID NOT NULL REFERENCES slots(id),
    facility_id UUID NOT NULL REFERENCES facilities(id),
    booking_date DATE NOT NULL,
    team_name VARCHAR(255),
    player_count INT NOT NULL,
    status ENUM('CONFIRMED', 'CANCELLED', 'COMPLETED', 'NO_SHOW') DEFAULT 'CONFIRMED',
    total_amount DECIMAL(10, 2),
    payment_status ENUM('PENDING', 'COMPLETED', 'REFUNDED') DEFAULT 'PENDING',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    cancelled_at TIMESTAMP,
    cancelled_reason TEXT,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (slot_id) REFERENCES slots(id),
    FOREIGN KEY (facility_id) REFERENCES facilities(id),
    INDEX idx_user_id (user_id),
    INDEX idx_booking_date (booking_date),
    INDEX idx_status (status),
    UNIQUE (slot_id, booking_date)
);
```

#### 5. Tournaments Table

```sql
CREATE TABLE tournaments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name VARCHAR(255) NOT NULL UNIQUE,
    sport_type VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    registration_deadline DATE NOT NULL,
    max_teams INT NOT NULL,
    current_teams INT DEFAULT 0,
    registration_fee DECIMAL(10, 2),
    status ENUM('PLANNING', 'REGISTRATION_OPEN', 'REGISTRATION_CLOSED', 'ONGOING', 'COMPLETED') DEFAULT 'PLANNING',
    tournament_format VARCHAR(50),
    rules TEXT,
    created_by UUID NOT NULL REFERENCES users(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_sport_type (sport_type),
    INDEX idx_status (status),
    INDEX idx_start_date (start_date)
);
```

#### 6. Teams Table

```sql
CREATE TABLE teams (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tournament_id UUID NOT NULL REFERENCES tournaments(id),
    university_name VARCHAR(255) NOT NULL,
    team_name VARCHAR(255) NOT NULL,
    captain_id UUID NOT NULL REFERENCES users(id),
    member_count INT NOT NULL,
    registration_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('REGISTERED', 'ACTIVE', 'BANNED', 'WITHDRAWN') DEFAULT 'REGISTERED',
    payment_status ENUM('PENDING', 'COMPLETED', 'REFUNDED') DEFAULT 'PENDING',
    
    FOREIGN KEY (tournament_id) REFERENCES tournaments(id),
    FOREIGN KEY (captain_id) REFERENCES users(id),
    INDEX idx_tournament_id (tournament_id),
    UNIQUE (tournament_id, team_name)
);
```

#### 7. Players Table

```sql
CREATE TABLE players (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    team_id UUID NOT NULL REFERENCES teams(id),
    user_id UUID NOT NULL REFERENCES users(id),
    jersey_number INT,
    position VARCHAR(50),
    status ENUM('ACTIVE', 'INJURED', 'SUSPENDED') DEFAULT 'ACTIVE',
    
    FOREIGN KEY (team_id) REFERENCES teams(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    UNIQUE (team_id, user_id)
);
```

#### 8. Notifications Table

```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID NOT NULL REFERENCES users(id),
    type ENUM('BOOKING', 'TOURNAMENT', 'ANNOUNCEMENT', 'REMINDER', 'SYSTEM') NOT NULL,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    related_entity_type VARCHAR(50),
    related_entity_id UUID,
    is_read BOOLEAN DEFAULT FALSE,
    read_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP,
    
    FOREIGN KEY (user_id) REFERENCES users(id),
    INDEX idx_user_id (user_id),
    INDEX idx_is_read (is_read),
    INDEX idx_created_at (created_at)
);
```

#### 9. Audit Logs Table

```sql
CREATE TABLE audit_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES users(id),
    action VARCHAR(100) NOT NULL,
    entity_type VARCHAR(50) NOT NULL,
    entity_id UUID,
    old_values JSONB,
    new_values JSONB,
    ip_address VARCHAR(45),
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    INDEX idx_user_id (user_id),
    INDEX idx_entity_type (entity_type),
    INDEX idx_created_at (created_at)
);
```

### Database Indexes & Performance

```sql
-- Composite indexes for common queries
CREATE INDEX idx_bookings_user_date 
    ON bookings(user_id, booking_date DESC);

CREATE INDEX idx_slots_facility_sport 
    ON slots(facility_id, sport_type);

CREATE INDEX idx_teams_tournament_captain 
    ON teams(tournament_id, captain_id);

-- Partial indexes for active records
CREATE INDEX idx_users_active 
    ON users(id) WHERE status = 'ACTIVE';

CREATE INDEX idx_bookings_confirmed 
    ON bookings(user_id) WHERE status = 'CONFIRMED';

-- Full-text search indexes
CREATE INDEX idx_facility_search 
    ON facilities USING gin(to_tsvector('english', name || ' ' || description));
```

---

## API Specification

### Base URL
```
Development: http://localhost:3000/api
Production: https://api.sportscomplex.aiub.edu/api
```

### Authentication

All endpoints (except `/auth/register` and `/auth/login`) require Bearer token:

```
Authorization: Bearer <jwt_token>
```

### Response Format

#### Success Response (200, 201)
```json
{
    "status": "success",
    "message": "Operation completed successfully",
    "data": {
        // Response data
    },
    "timestamp": "2024-12-30T15:30:00Z"
}
```

#### Error Response (4xx, 5xx)
```json
{
    "status": "error",
    "message": "Error message here",
    "error": {
        "code": "ERROR_CODE",
        "details": "Additional error details"
    },
    "timestamp": "2024-12-30T15:30:00Z"
}
```

### API Endpoints

#### Authentication Endpoints

##### POST /auth/register
Register new user

**Request Body:**
```json
{
    "email": "student@aiub.edu",
    "password": "SecurePass@123",
    "fullName": "John Doe",
    "phoneNumber": "+8801700000000",
    "studentId": "22-47934-2"
}
```

**Response (201):**
```json
{
    "status": "success",
    "message": "Registration successful",
    "data": {
        "id": "uuid",
        "email": "student@aiub.edu",
        "fullName": "John Doe",
        "status": "INACTIVE"
    }
}
```

**Validation:**
- Email unique validation
- Student ID format validation
- Password strength validation

##### POST /auth/login
Login user

**Request Body:**
```json
{
    "email": "student@aiub.edu",
    "password": "SecurePass@123"
}
```

**Response (200):**
```json
{
    "status": "success",
    "data": {
        "accessToken": "eyJhbGc...",
        "refreshToken": "eyJhbGc...",
        "user": {
            "id": "uuid",
            "email": "student@aiub.edu",
            "fullName": "John Doe",
            "role": "STUDENT",
            "status": "ACTIVE"
        }
    }
}
```

##### POST /auth/logout
Logout user (requires auth)

**Response (200):**
```json
{
    "status": "success",
    "message": "Logged out successfully"
}
```

##### POST /auth/refresh
Refresh access token

**Request Body:**
```json
{
    "refreshToken": "eyJhbGc..."
}
```

**Response (200):**
```json
{
    "status": "success",
    "data": {
        "accessToken": "eyJhbGc...",
        "refreshToken": "eyJhbGc..."
    }
}
```

#### Slots & Booking Endpoints

##### GET /slots
List all available slots (paginated)

**Query Parameters:**
```
?page=1&limit=20&facilityId=uuid&sportType=basketball&date=2024-12-31&minTime=09:00&maxTime=17:00
```

**Response (200):**
```json
{
    "status": "success",
    "data": {
        "slots": [
            {
                "id": "uuid",
                "facilityId": "uuid",
                "facilityName": "Basketball Court A",
                "sportType": "basketball",
                "startTime": "09:00",
                "endTime": "10:00",
                "maxCapacity": 10,
                "currentBookings": 5,
                "status": "AVAILABLE",
                "price": 500
            }
        ],
        "pagination": {
            "page": 1,
            "limit": 20,
            "total": 150
        }
    }
}
```

##### GET /slots/{id}
Get slot details

**Response (200):**
```json
{
    "status": "success",
    "data": {
        "id": "uuid",
        "facility": {...},
        "bookings": [...]
    }
}
```

##### POST /bookings
Create booking

**Request Body:**
```json
{
    "slotId": "uuid",
    "facilityId": "uuid",
    "bookingDate": "2024-12-31",
    "teamName": "Team Alpha",
    "playerCount": 8,
    "playerDetails": [
        {
            "name": "Player 1",
            "studentId": "22-47934-2"
        }
    ],
    "notes": "Optional notes"
}
```

**Response (201):**
```json
{
    "status": "success",
    "message": "Booking created successfully",
    "data": {
        "id": "uuid",
        "slotId": "uuid",
        "status": "CONFIRMED",
        "bookingDate": "2024-12-31",
        "confirmationNumber": "BOOK-20241230-001"
    }
}
```

##### GET /bookings/my
Get user's bookings

**Query Parameters:**
```
?status=CONFIRMED&fromDate=2024-12-01&toDate=2024-12-31&limit=10
```

**Response (200):**
```json
{
    "status": "success",
    "data": {
        "bookings": [...]
    }
}
```

##### PATCH /bookings/{id}
Modify booking

**Request Body:**
```json
{
    "playerCount": 10,
    "teamName": "Team Beta"
}
```

**Response (200):**
```json
{
    "status": "success",
    "message": "Booking updated successfully",
    "data": {...}
}
```

##### DELETE /bookings/{id}
Cancel booking

**Request Body:**
```json
{
    "reason": "Unable to participate"
}
```

**Response (200):**
```json
{
    "status": "success",
    "message": "Booking cancelled successfully",
    "data": {
        "refundAmount": 450
    }
}
```

#### Tournament Endpoints

##### GET /tournaments
List tournaments

**Query Parameters:**
```
?page=1&limit=10&status=REGISTRATION_OPEN&sportType=football&sortBy=startDate
```

**Response (200):**
```json
{
    "status": "success",
    "data": {
        "tournaments": [
            {
                "id": "uuid",
                "name": "AIUB Cricket Cup 2024",
                "sportType": "cricket",
                "startDate": "2024-12-31",
                "endDate": "2025-01-05",
                "registrationDeadline": "2024-12-30",
                "maxTeams": 16,
                "currentTeams": 12,
                "status": "REGISTRATION_OPEN",
                "registrationFee": 5000
            }
        ],
        "pagination": {...}
    }
}
```

##### POST /tournaments (Admin only)
Create tournament

**Request Body:**
```json
{
    "name": "AIUB Football League 2025",
    "sportType": "football",
    "description": "Inter-university football tournament",
    "startDate": "2025-01-15",
    "endDate": "2025-02-28",
    "registrationDeadline": "2025-01-10",
    "maxTeams": 20,
    "registrationFee": 10000,
    "tournamentFormat": "ROUND_ROBIN",
    "rules": "..."
}
```

**Response (201):**
```json
{
    "status": "success",
    "message": "Tournament created successfully",
    "data": {
        "id": "uuid",
        "name": "AIUB Football League 2025"
    }
}
```

##### POST /tournaments/{id}/register
Register team for tournament

**Request Body:**
```json
{
    "universityName": "AIUB",
    "teamName": "AIUB United",
    "captainId": "uuid",
    "players": [
        {
            "userId": "uuid",
            "jerseyNumber": 10,
            "position": "Striker"
        }
    ]
}
```

**Response (201):**
```json
{
    "status": "success",
    "message": "Team registered successfully",
    "data": {
        "teamId": "uuid",
        "tournamentId": "uuid"
    }
}
```

#### Admin Endpoints

##### GET /admin/dashboard
Get dashboard overview (Admin only)

**Response (200):**
```json
{
    "status": "success",
    "data": {
        "stats": {
            "totalUsers": 5000,
            "activeBookings": 250,
            "totalRevenue": 1250000,
            "facilityUtilization": 85.5,
            "tournamentCount": 12
        },
        "recentActivity": [...],
        "topFacilities": [...]
    }
}
```

##### GET /admin/users
List all users (Admin only)

**Query Parameters:**
```
?page=1&role=STUDENT&status=ACTIVE&search=john
```

##### PATCH /admin/users/{id}/status
Update user status (Admin only)

**Request Body:**
```json
{
    "status": "SUSPENDED",
    "reason": "Disciplinary action"
}
```

##### POST /admin/slots
Create slots (Admin only)

##### PATCH /admin/slots/{id}
Modify slots (Admin only)

##### DELETE /admin/slots/{id}
Delete slots (Admin only)

#### Notification Endpoints

##### GET /notifications
Get user notifications

**Query Parameters:**
```
?unreadOnly=false&limit=20
```

**Response (200):**
```json
{
    "status": "success",
    "data": {
        "notifications": [
            {
                "id": "uuid",
                "type": "BOOKING",
                "title": "Booking Confirmation",
                "message": "Your slot booking has been confirmed",
                "isRead": false,
                "createdAt": "2024-12-30T15:30:00Z"
            }
        ]
    }
}
```

##### PATCH /notifications/{id}/read
Mark notification as read

---

## Frontend Implementation Guide

### Project Structure

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx                # Root layout
│   │   ├── page.tsx                  # Home page
│   │   ├── (auth)/                   # Auth routes
│   │   │   ├── login/page.tsx
│   │   │   ├── register/page.tsx
│   │   │   └── layout.tsx
│   │   ├── (dashboard)/              # Protected routes
│   │   │   ├── slots/page.tsx
│   │   │   ├── bookings/page.tsx
│   │   │   ├── tournaments/page.tsx
│   │   │   ├── profile/page.tsx
│   │   │   └── layout.tsx
│   │   └── admin/                    # Admin routes
│   │       ├── dashboard/page.tsx
│   │       ├── users/page.tsx
│   │       └── layout.tsx
│   │
│   ├── components/                   # React Components
│   │   ├── Header.tsx
│   │   ├── Navigation.tsx
│   │   ├── Footer.tsx
│   │   ├── Auth/
│   │   │   ├── LoginForm.tsx
│   │   │   ├── RegisterForm.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── Slots/
│   │   │   ├── SlotList.tsx
│   │   │   ├── SlotCard.tsx
│   │   │   ├── SlotFilter.tsx
│   │   │   └── BookingForm.tsx
│   │   ├── Tournaments/
│   │   │   ├── TournamentList.tsx
│   │   │   ├── TournamentCard.tsx
│   │   │   ├── RegistrationForm.tsx
│   │   │   └── TeamBracket.tsx
│   │   ├── Admin/
│   │   │   ├── Dashboard.tsx
│   │   │   ├── UserManagement.tsx
│   │   │   ├── SlotManagement.tsx
│   │   │   └── Reports.tsx
│   │   └── Common/
│   │       ├── Modal.tsx
│   │       ├── Loader.tsx
│   │       ├── ErrorBoundary.tsx
│   │       └── Toast.tsx
│   │
│   ├── hooks/                        # Custom React Hooks
│   │   ├── useAuth.ts
│   │   ├── useApi.ts
│   │   ├── useForm.ts
│   │   ├── useLocalStorage.ts
│   │   └── useNotification.ts
│   │
│   ├── services/                     # API Services
│   │   ├── apiClient.ts              # Axios instance
│   │   ├── authService.ts
│   │   ├── slotsService.ts
│   │   ├── bookingsService.ts
│   │   ├── tournamentsService.ts
│   │   └── adminService.ts
│   │
│   ├── context/                      # Context Providers
│   │   ├── AuthContext.tsx
│   │   ├── NotificationContext.tsx
│   │   └── UserContext.tsx
│   │
│   ├── styles/                       # Global Styles
│   │   ├── globals.css
│   │   ├── tailwind.css
│   │   └── variables.css
│   │
│   ├── utils/                        # Helper Functions
│   │   ├── dateUtils.ts
│   │   ├── formatters.ts
│   │   ├── validators.ts
│   │   └── constants.ts
│   │
│   └── types/                        # TypeScript Types
│       ├── api.types.ts
│       ├── entities.types.ts
│       └── forms.types.ts
│
├── public/                           # Static Assets
│   ├── images/
│   ├── icons/
│   └── logo.svg
│
├── .env.example
├── .env.local
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```

### Key Frontend Components

#### 1. Authentication System

```typescript
// hooks/useAuth.ts
export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check if user is logged in on mount
        checkAuthStatus();
    }, []);

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('accessToken');
            if (token) {
                const response = await authService.getCurrentUser();
                setUser(response.data);
            }
        } catch (err) {
            setError('Failed to verify authentication');
        } finally {
            setLoading(false);
        }
    };

    const login = async (email: string, password: string) => {
        try {
            const response = await authService.login(email, password);
            localStorage.setItem('accessToken', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);
            setUser(response.data.user);
            return response.data;
        } catch (err) {
            setError('Login failed');
            throw err;
        }
    };

    const register = async (userData: RegisterData) => {
        try {
            const response = await authService.register(userData);
            return response.data;
        } catch (err) {
            setError('Registration failed');
            throw err;
        }
    };

    const logout = async () => {
        try {
            await authService.logout();
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            setUser(null);
        } catch (err) {
            console.error('Logout error:', err);
        }
    };

    return { user, loading, error, login, register, logout, checkAuthStatus };
};
```

#### 2. Slot Booking Component

```typescript
// components/Slots/BookingForm.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { slotsService } from '@/services/slotsService';

export const BookingForm: React.FC<{ slotId: string }> = ({ slotId }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<BookingData>();
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: BookingData) => {
        setLoading(true);
        try {
            await slotsService.createBooking({
                slotId,
                ...data
            });
            setSuccess(true);
        } catch (error) {
            console.error('Booking failed:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Form fields */}
            <div>
                <label>Team Name</label>
                <input
                    {...register('teamName', { required: 'Team name is required' })}
                    className="w-full px-4 py-2 border rounded-lg"
                />
                {errors.teamName && <span className="text-red-500">{errors.teamName.message}</span>}
            </div>

            <div>
                <label>Number of Players</label>
                <input
                    type="number"
                    {...register('playerCount', { required: 'Player count is required', min: { value: 2, message: 'Minimum 2 players' } })}
                    className="w-full px-4 py-2 border rounded-lg"
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2 rounded-lg hover:bg-primary-hover transition"
            >
                {loading ? 'Confirming...' : 'Confirm Booking'}
            </button>

            {success && <div className="bg-green-100 text-green-700 p-4 rounded">Booking confirmed successfully!</div>}
        </form>
    );
};
```

#### 3. Tournament Registration

```typescript
// components/Tournaments/RegistrationForm.tsx
export const RegistrationForm: React.FC<{ tournamentId: string }> = ({ tournamentId }) => {
    const { register, handleSubmit, watch } = useForm<TournamentRegisterData>();
    const [players, setPlayers] = useState<PlayerData[]>([]);

    const onSubmit = async (data: TournamentRegisterData) => {
        try {
            await tournamentsService.registerTeam(tournamentId, {
                ...data,
                players
            });
            // Show success message
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Team Details */}
            <div>
                <label>Team Name</label>
                <input {...register('teamName', { required: true })} className="w-full border rounded-lg px-4 py-2" />
            </div>

            {/* Players List */}
            <div>
                <label>Team Members</label>
                {players.map((player, idx) => (
                    <div key={idx} className="flex gap-4 mb-2">
                        <input placeholder="Player Name" value={player.name} className="flex-1 border rounded-lg px-4 py-2" />
                        <input placeholder="Student ID" value={player.studentId} className="flex-1 border rounded-lg px-4 py-2" />
                    </div>
                ))}
                <button type="button" onClick={() => setPlayers([...players, { name: '', studentId: '' }])}>
                    Add Player
                </button>
            </div>

            <button type="submit" className="w-full bg-primary text-white py-2 rounded-lg">
                Register Team
            </button>
        </form>
    );
};
```

### Tailwind Configuration

```javascript
// tailwind.config.js
module.exports = {
    content: [
        './src/**/*.{js,ts,jsx,tsx}',
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#218D8D',
                    hover: '#1A7474',
                    dark: '#1A6E6E',
                    light: '#2FB67F'
                },
                secondary: {
                    DEFAULT: '#134252',
                    light: '#5E5240'
                },
                neutral: {
                    cream: '#FCFCF9',
                    light: '#F5F5F5'
                },
                feedback: {
                    success: '#2FB67F',
                    error: '#C0152F',
                    warning: '#A84B2F'
                }
            },
            spacing: {
                '128': '32rem'
            },
            borderRadius: {
                'xl': '12px'
            }
        }
    },
    plugins: [],
};
```

### Environmental Setup

```bash
# .env.example
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_APP_NAME=University Sports Complex
NEXT_PUBLIC_APP_VERSION=1.0.0

# Optional
NEXT_PUBLIC_SENTRY_DSN=
NEXT_PUBLIC_ANALYTICS_ID=
```

---

## Backend Implementation Guide

### NestJS Project Structure

```
backend/
├── src/
│   ├── main.ts                       # Application entry
│   │
│   ├── auth/                         # Authentication module
│   │   ├── auth.module.ts
│   │   ├── auth.service.ts
│   │   ├── auth.controller.ts
│   │   ├── dto/
│   │   │   ├── login.dto.ts
│   │   │   └── register.dto.ts
│   │   ├── guards/
│   │   │   ├── jwt.guard.ts
│   │   │   └── roles.guard.ts
│   │   ├── strategies/
│   │   │   └── jwt.strategy.ts
│   │   └── jwt.config.ts
│   │
│   ├── users/                        # Users module
│   │   ├── users.module.ts
│   │   ├── users.service.ts
│   │   ├── users.controller.ts
│   │   ├── entities/
│   │   │   └── user.entity.ts
│   │   └── dto/
│   │       ├── create-user.dto.ts
│   │       └── update-user.dto.ts
│   │
│   ├── slots/                        # Slots module
│   │   ├── slots.module.ts
│   │   ├── slots.service.ts
│   │   ├── slots.controller.ts
│   │   ├── entities/
│   │   │   ├── slot.entity.ts
│   │   │   └── booking.entity.ts
│   │   └── dto/
│   │       ├── create-booking.dto.ts
│   │       └── update-booking.dto.ts
│   │
│   ├── facilities/                   # Facilities module
│   │   ├── facilities.module.ts
│   │   ├── facilities.service.ts
│   │   ├── facilities.controller.ts
│   │   └── entities/
│   │       └── facility.entity.ts
│   │
│   ├── tournaments/                  # Tournaments module
│   │   ├── tournaments.module.ts
│   │   ├── tournaments.service.ts
│   │   ├── tournaments.controller.ts
│   │   ├── entities/
│   │   │   ├── tournament.entity.ts
│   │   │   ├── team.entity.ts
│   │   │   └── player.entity.ts
│   │   └── dto/
│   │       ├── create-tournament.dto.ts
│   │       └── register-team.dto.ts
│   │
│   ├── notifications/                # Notifications module
│   │   ├── notifications.module.ts
│   │   ├── notifications.service.ts
│   │   ├── notifications.controller.ts
│   │   ├── email.service.ts
│   │   └── entities/
│   │       └── notification.entity.ts
│   │
│   ├── admin/                        # Admin module
│   │   ├── admin.module.ts
│   │   ├── admin.service.ts
│   │   ├── admin.controller.ts
│   │   └── dto/
│   │       └── admin-filters.dto.ts
│   │
│   ├── common/                       # Shared resources
│   │   ├── decorators/
│   │   │   ├── current-user.decorator.ts
│   │   │   └── roles.decorator.ts
│   │   ├── filters/
│   │   │   └── http-exception.filter.ts
│   │   ├── interceptors/
│   │   │   ├── logging.interceptor.ts
│   │   │   └── response.interceptor.ts
│   │   ├── middleware/
│   │   │   ├── logger.middleware.ts
│   │   │   └── cors.middleware.ts
│   │   ├── pipes/
│   │   │   └── validation.pipe.ts
│   │   └── utils/
│   │       ├── constants.ts
│   │       └── helpers.ts
│   │
│   ├── database/                     # Database configuration
│   │   ├── database.module.ts
│   │   ├── typeorm.config.ts
│   │   └── migrations/
│   │       └── [timestamp]_*.ts
│   │
│   └── app.module.ts                 # Root module
│
├── test/                             # Tests
│   ├── auth.spec.ts
│   ├── slots.spec.ts
│   └── e2e/
│       └── app.e2e.spec.ts
│
├── .env.example
├── ormconfig.ts
├── docker-compose.yml
├── Dockerfile
├── nest-cli.json
├── package.json
└── tsconfig.json
```

### Key Backend Services

#### 1. Authentication Service

```typescript
// src/auth/auth.service.ts
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async register(registerDto: RegisterDto) {
        const { email, password, fullName, studentId } = registerDto;

        // Check if user exists
        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            throw new ConflictException('Email already registered');
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create user
        const user = await this.usersService.create({
            email,
            password: hashedPassword,
            fullName,
            studentId,
            role: 'STUDENT'
        });

        // Send verification email
        await this.sendVerificationEmail(user);

        return { message: 'Registration successful', userId: user.id };
    }

    async login(email: string, password: string) {
        const user = await this.usersService.findByEmail(email);
        
        if (!user || !await bcrypt.compare(password, user.password)) {
            throw new UnauthorizedException('Invalid email or password');
        }

        if (user.status === 'SUSPENDED' || user.status === 'BANNED') {
            throw new UnauthorizedException('Account is not active');
        }

        const tokens = this.generateTokens(user);
        
        // Update last login
        await this.usersService.updateLastLogin(user.id);

        return {
            accessToken: tokens.accessToken,
            refreshToken: tokens.refreshToken,
            user: {
                id: user.id,
                email: user.email,
                fullName: user.fullName,
                role: user.role
            }
        };
    }

    generateTokens(user: User) {
        const accessToken = this.jwtService.sign(
            { sub: user.id, email: user.email, role: user.role },
            { expiresIn: '24h' }
        );

        const refreshToken = this.jwtService.sign(
            { sub: user.id },
            { expiresIn: '7d' }
        );

        return { accessToken, refreshToken };
    }

    async validateToken(token: string) {
        try {
            return await this.jwtService.verifyAsync(token);
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }

    private async sendVerificationEmail(user: User) {
        const token = this.jwtService.sign(
            { sub: user.id },
            { expiresIn: '24h' }
        );
        // Send email logic here
    }
}
```

#### 2. Slots Service

```typescript
// src/slots/slots.service.ts
@Injectable()
export class SlotsService {
    constructor(
        @InjectRepository(Slot)
        private slotRepository: Repository<Slot>,
        @InjectRepository(Booking)
        private bookingRepository: Repository<Booking>,
        private notificationsService: NotificationsService
    ) {}

    async findAvailable(filters: SlotFilterDto) {
        const query = this.slotRepository.createQueryBuilder('slot')
            .leftJoinAndSelect('slot.facility', 'facility')
            .where('slot.status = :status', { status: 'AVAILABLE' });

        if (filters.facilityId) {
            query.andWhere('slot.facility_id = :facilityId', { facilityId: filters.facilityId });
        }

        if (filters.sportType) {
            query.andWhere('slot.sport_type = :sportType', { sportType: filters.sportType });
        }

        if (filters.date) {
            // Filter by date...
        }

        return query.paginate(filters.page, filters.limit);
    }

    async createBooking(userId: string, createBookingDto: CreateBookingDto) {
        const { slotId, facilityId, bookingDate, playerCount } = createBookingDto;

        // Check slot availability
        const slot = await this.slotRepository.findOne(slotId);
        if (!slot || slot.status !== 'AVAILABLE') {
            throw new BadRequestException('Slot not available');
        }

        // Check booking conflict
        const existingBooking = await this.bookingRepository.findOne({
            where: {
                slot_id: slotId,
                booking_date: bookingDate
            }
        });

        if (existingBooking) {
            throw new ConflictException('Slot already booked for this date');
        }

        // Check capacity
        if (slot.currentBookings + playerCount > slot.maxCapacity) {
            throw new BadRequestException('Exceeds facility capacity');
        }

        // Create booking
        const booking = this.bookingRepository.create({
            userId,
            slotId,
            facilityId,
            bookingDate,
            playerCount,
            status: 'CONFIRMED'
        });

        await this.bookingRepository.save(booking);

        // Update slot bookings count
        slot.currentBookings += playerCount;
        await this.slotRepository.save(slot);

        // Send confirmation
        await this.notificationsService.sendBookingConfirmation(userId, booking);

        // Schedule reminders
        this.scheduleReminders(booking);

        return booking;
    }

    async modifyBooking(bookingId: string, updateBookingDto: UpdateBookingDto) {
        const booking = await this.bookingRepository.findOne(bookingId);
        
        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        // Check if modification allowed (4 hours before slot)
        const slotStartTime = new Date(`${booking.bookingDate} ${booking.slot.startTime}`);
        const hoursUntilSlot = (slotStartTime.getTime() - Date.now()) / (1000 * 60 * 60);

        if (hoursUntilSlot < 4) {
            throw new BadRequestException('Cannot modify booking within 4 hours of slot start');
        }

        // Update booking
        Object.assign(booking, updateBookingDto);
        await this.bookingRepository.save(booking);

        return booking;
    }

    async cancelBooking(bookingId: string, reason: string) {
        const booking = await this.bookingRepository.findOne(bookingId);
        
        if (!booking) {
            throw new NotFoundException('Booking not found');
        }

        // Calculate refund
        const refundPercentage = this.calculateRefundPercentage(booking.bookingDate);
        const refundAmount = booking.totalAmount * (refundPercentage / 100);

        booking.status = 'CANCELLED';
        booking.cancelledAt = new Date();
        booking.cancelledReason = reason;
        await this.bookingRepository.save(booking);

        // Update slot
        const slot = await this.slotRepository.findOne(booking.slotId);
        slot.currentBookings -= booking.playerCount;
        await this.slotRepository.save(slot);

        // Send cancellation notification
        await this.notificationsService.sendCancellationNotification(booking.userId, booking, refundAmount);

        return { message: 'Booking cancelled', refundAmount };
    }

    private calculateRefundPercentage(bookingDate: Date): number {
        const hoursUntilBooking = (new Date(bookingDate).getTime() - Date.now()) / (1000 * 60 * 60);

        if (hoursUntilBooking >= 24) {
            return 100;
        } else if (hoursUntilBooking >= 4) {
            return 50;
        }
        return 0;
    }

    private scheduleReminders(booking: Booking) {
        // Schedule 24-hour reminder
        const remindTime24 = new Date(new Date(booking.bookingDate).getTime() - 24 * 60 * 60 * 1000);
        setTimeout(() => {
            this.notificationsService.sendReminder(booking.userId, booking, '24_HOURS');
        }, remindTime24.getTime() - Date.now());

        // Schedule 1-hour reminder
        const remindTime1 = new Date(new Date(booking.bookingDate).getTime() - 60 * 60 * 1000);
        setTimeout(() => {
            this.notificationsService.sendReminder(booking.userId, booking, '1_HOUR');
        }, remindTime1.getTime() - Date.now());
    }
}
```

#### 3. Tournaments Service

```typescript
// src/tournaments/tournaments.service.ts
@Injectable()
export class TournamentsService {
    constructor(
        @InjectRepository(Tournament)
        private tournamentRepository: Repository<Tournament>,
        @InjectRepository(Team)
        private teamRepository: Repository<Team>,
        private notificationsService: NotificationsService
    ) {}

    async create(createTournamentDto: CreateTournamentDto, adminId: string) {
        const tournament = this.tournamentRepository.create({
            ...createTournamentDto,
            createdBy: adminId,
            status: 'PLANNING'
        });

        await this.tournamentRepository.save(tournament);

        // Schedule registration opening
        const regStartTime = new Date(createTournamentDto.startDate);
        regStartTime.setDate(regStartTime.getDate() - 30);

        setTimeout(() => {
            this.openRegistration(tournament.id);
        }, regStartTime.getTime() - Date.now());

        return tournament;
    }

    async registerTeam(tournamentId: string, userId: string, registerTeamDto: RegisterTeamDto) {
        const tournament = await this.tournamentRepository.findOne(tournamentId);

        if (!tournament || tournament.status !== 'REGISTRATION_OPEN') {
            throw new BadRequestException('Registration not open for this tournament');
        }

        if (tournament.currentTeams >= tournament.maxTeams) {
            throw new BadRequestException('Tournament is full');
        }

        // Create team
        const team = this.teamRepository.create({
            tournamentId,
            ...registerTeamDto,
            captainId: userId,
            status: 'REGISTERED'
        });

        await this.teamRepository.save(team);

        // Update tournament
        tournament.currentTeams += 1;
        await this.tournamentRepository.save(tournament);

        // Send confirmation
        await this.notificationsService.sendTournamentConfirmation(userId, tournament, team);

        return team;
    }

    async openRegistration(tournamentId: string) {
        const tournament = await this.tournamentRepository.findOne(tournamentId);
        tournament.status = 'REGISTRATION_OPEN';
        await this.tournamentRepository.save(tournament);

        // Notify eligible users
        const eligibleUsers = await this.findEligibleUsers(tournament.sportType);
        for (const user of eligibleUsers) {
            await this.notificationsService.sendTournamentAnnouncement(user.id, tournament);
        }
    }

    private async findEligibleUsers(sportType: string) {
        // Find users with interest in this sport
        // Implementation depends on your user model
    }
}
```

### Database Configuration

```typescript
// src/database/typeorm.config.ts
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeormConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || 'password',
    database: process.env.DB_NAME || 'sports_complex',
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/migrations/*{.ts,.js}'],
    migrationsRun: true,
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.DB_LOGGING === 'true',
    poolSize: 20,
    maxQueryExecutionTime: 5000,
    charset: 'utf8mb4'
};
```

### Email Service

```typescript
// src/notifications/email.service.ts
@Injectable()
export class EmailService {
    private transporter: Transporter;

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: parseInt(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    }

    async sendBookingConfirmation(user: User, booking: Booking) {
        const mailOptions = {
            to: user.email,
            subject: `Booking Confirmation - ${booking.id}`,
            html: this.getBookingConfirmationTemplate(user, booking)
        };

        return this.transporter.sendMail(mailOptions);
    }

    async sendTournamentConfirmation(user: User, tournament: Tournament, team: Team) {
        const mailOptions = {
            to: user.email,
            subject: `Tournament Registration - ${tournament.name}`,
            html: this.getTournamentConfirmationTemplate(user, tournament, team)
        };

        return this.transporter.sendMail(mailOptions);
    }

    private getBookingConfirmationTemplate(user: User, booking: Booking): string {
        return `
            <html>
                <body>
                    <h1>Booking Confirmation</h1>
                    <p>Dear ${user.fullName},</p>
                    <p>Your slot booking has been confirmed!</p>
                    <p>Confirmation Number: ${booking.id}</p>
                    <p>Date: ${booking.bookingDate}</p>
                    <p>Facility: ${booking.facility.name}</p>
                </body>
            </html>
        `;
    }

    private getTournamentConfirmationTemplate(user: User, tournament: Tournament, team: Team): string {
        return `
            <html>
                <body>
                    <h1>Tournament Registration Confirmed</h1>
                    <p>Dear ${user.fullName},</p>
                    <p>Your team has been registered for ${tournament.name}</p>
                    <p>Team Name: ${team.teamName}</p>
                </body>
            </html>
        `;
    }
}
```

### Validation DTOs

```typescript
// src/slots/dto/create-booking.dto.ts
import { IsString, IsInt, IsDateString, Min, IsOptional } from 'class-validator';

export class CreateBookingDto {
    @IsString()
    slotId: string;

    @IsString()
    facilityId: string;

    @IsDateString()
    bookingDate: string;

    @IsString()
    teamName: string;

    @IsInt()
    @Min(2)
    playerCount: number;

    @IsOptional()
    @IsString()
    notes?: string;
}
```

### Middleware & Interceptors

```typescript
// src/common/interceptors/response.interceptor.ts
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        return next.handle().pipe(
            map(data => ({
                status: 'success',
                data,
                timestamp: new Date().toISOString()
            }))
        );
    }
}

// src/common/interceptors/logging.interceptor.ts
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    private logger = new Logger();

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const request = context.switchToHttp().getRequest();
        const { method, url } = request;

        const start = Date.now();

        return next.handle().pipe(
            tap(() => {
                const duration = Date.now() - start;
                this.logger.log(`${method} ${url} - ${duration}ms`);
            })
        );
    }
}
```

### Exception Filter

```typescript
// src/common/filters/http-exception.filter.ts
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = exception.getStatus();
        const exceptionResponse = exception.getResponse();

        response.status(status).json({
            status: 'error',
            statusCode: status,
            message: exceptionResponse instanceof Object ? 
                exceptionResponse['message'] : exceptionResponse,
            timestamp: new Date().toISOString()
        });
    }
}
```

---

## Security Implementation

### 1. Authentication & Authorization

#### JWT Configuration
```typescript
// Guard the endpoints with JWT
@UseGuards(JwtAuthGuard)
@Controller('api/bookings')
export class BookingsController {
    // Protected routes
}

// Role-based access
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN')
@Post('tournaments')
createTournament(@Body() dto: CreateTournamentDto) {
    // Only admins can create tournaments
}
```

#### Password Security
- Bcrypt hashing with 12 rounds
- Minimum 12 characters
- Must include: uppercase, lowercase, numbers, special characters
- Password change every 90 days (for admin)
- Password history to prevent reuse

### 2. Data Protection

#### Encryption
```typescript
// Encrypt sensitive data at rest
import * as crypto from 'crypto';

const encrypt = (data: string): string => {
    const cipher = crypto.createCipher('aes-256-cbc', process.env.ENCRYPTION_KEY);
    let encrypted = cipher.update(data, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
};
```

#### HTTPS/TLS
- TLS 1.3 in production
- HSTS headers enabled
- Certificate pinning for mobile apps

### 3. API Security

#### Rate Limiting
```typescript
// Limit API requests
@UseGuards(ThrottlerGuard)
@Controller('api')
export class AppController {
    @Throttle(10, 60) // 10 requests per minute
    @Post('auth/login')
    login() { }
}
```

#### CORS Configuration
```typescript
// app.module.ts
app.enableCors({
    origin: process.env.ALLOWED_ORIGINS?.split(',') || ['http://localhost:3001'],
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
});
```

#### Input Validation & Sanitization
```typescript
// Validate all inputs
export class CreateBookingDto {
    @IsString()
    @MinLength(3)
    @MaxLength(255)
    teamName: string;

    @IsInt()
    @Min(2)
    @Max(50)
    playerCount: number;
}

// Sanitize inputs
import * as xss from 'xss';
const sanitized = xss(userInput);
```

### 4. Audit Logging

```typescript
// Log all sensitive operations
@Injectable()
export class AuditService {
    constructor(
        @InjectRepository(AuditLog)
        private auditLogRepository: Repository<AuditLog>
    ) {}

    async log(userId: string, action: string, entity: string, entityId: string, changes: any) {
        const auditLog = this.auditLogRepository.create({
            userId,
            action,
            entityType: entity,
            entityId,
            newValues: changes,
            ipAddress: this.getClientIp(),
            userAgent: this.getUserAgent()
        });

        await this.auditLogRepository.save(auditLog);
    }
}
```

---

## Testing Strategy

### Unit Testing (Jest)

```typescript
// src/slots/slots.service.spec.ts
describe('SlotsService', () => {
    let service: SlotsService;
    let mockRepository: jest.Mock;

    beforeEach(() => {
        mockRepository = jest.fn();
        service = new SlotsService(mockRepository);
    });

    describe('findAvailable', () => {
        it('should return available slots with filters', async () => {
            const mockSlots = [{ id: '1', status: 'AVAILABLE' }];
            mockRepository.find.mockResolvedValue(mockSlots);

            const result = await service.findAvailable({ facilityId: '1' });

            expect(result).toEqual(mockSlots);
            expect(mockRepository.find).toHaveBeenCalled();
        });

        it('should throw error if no slots found', async () => {
            mockRepository.find.mockResolvedValue([]);

            const result = await service.findAvailable({});

            expect(result).toEqual([]);
        });
    });

    describe('createBooking', () => {
        it('should create booking successfully', async () => {
            const mockBooking = { id: '1', status: 'CONFIRMED' };
            mockRepository.save.mockResolvedValue(mockBooking);

            const result = await service.createBooking('userId', { slotId: '1' });

            expect(result).toEqual(mockBooking);
        });

        it('should throw error if slot not available', async () => {
            mockRepository.findOne.mockResolvedValue(null);

            await expect(service.createBooking('userId', { slotId: '999' })).rejects.toThrow();
        });
    });
});
```

### Integration Testing

```typescript
// test/slots.e2e.spec.ts
describe('Slots (e2e)', () => {
    let app: INestApplication;
    let authToken: string;

    beforeAll(async () => {
        const moduleFixture = await Test.createTestingModule({
            imports: [AppModule]
        }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();

        // Login test user
        const loginResponse = await request(app.getHttpServer())
            .post('/api/auth/login')
            .send({ email: 'test@aiub.edu', password: 'password' });

        authToken = loginResponse.body.data.accessToken;
    });

    describe('POST /slots', () => {
        it('should create booking', () => {
            return request(app.getHttpServer())
                .post('/api/bookings')
                .set('Authorization', `Bearer ${authToken}`)
                .send({
                    slotId: 'slot-1',
                    facilityId: 'facility-1',
                    bookingDate: '2024-12-31',
                    playerCount: 8
                })
                .expect(201)
                .expect(res => {
                    expect(res.body.status).toBe('success');
                    expect(res.body.data.status).toBe('CONFIRMED');
                });
        });

        it('should reject duplicate booking', () => {
            // Test implementation
        });
    });
});
```

### Frontend Testing

```typescript
// __tests__/components/BookingForm.test.tsx
describe('BookingForm', () => {
    render(<BookingForm slotId="slot-1" />);

    it('should render form fields', () => {
        expect(screen.getByLabelText('Team Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Number of Players')).toBeInTheDocument();
    });

    it('should validate required fields', async () => {
        const submitButton = screen.getByRole('button', { name: /confirm/i });
        fireEvent.click(submitButton);

        await waitFor(() => {
            expect(screen.getByText('Team name is required')).toBeInTheDocument();
        });
    });

    it('should submit form with valid data', async () => {
        fireEvent.change(screen.getByLabelText('Team Name'), { target: { value: 'Team A' } });
        fireEvent.change(screen.getByLabelText('Number of Players'), { target: { value: '8' } });

        fireEvent.click(screen.getByRole('button', { name: /confirm/i }));

        await waitFor(() => {
            expect(screen.getByText(/booking confirmed/i)).toBeInTheDocument();
        });
    });
});
```

### Test Coverage Goals

| Module | Target Coverage |
|--------|-----------------|
| Authentication | 95% |
| Bookings | 90% |
| Tournaments | 85% |
| Notifications | 80% |
| Admin | 75% |
| Utilities | 90% |
| **Overall** | **85%** |

---

## Deployment & DevOps

### Docker Setup

```dockerfile
# backend/Dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

```dockerfile
# frontend/Dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./

RUN npm ci --only=production

EXPOSE 3001

CMD ["npm", "start"]
```

### Docker Compose

```yaml
# docker-compose.yml
version: '3.8'

services:
  postgres:
    image: postgres:14-alpine
    environment:
      POSTGRES_DB: ${DB_NAME}
      POSTGRES_USER: ${DB_USERNAME}
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"

  backend:
    build: ./backend
    environment:
      NODE_ENV: development
      DB_HOST: postgres
      DB_PORT: 5432
      DB_USERNAME: ${DB_USERNAME}
      DB_PASSWORD: ${DB_PASSWORD}
      DB_NAME: ${DB_NAME}
      REDIS_URL: redis://redis:6379
    ports:
      - "3000:3000"
    depends_on:
      - postgres
      - redis
    volumes:
      - ./backend/src:/app/src

  frontend:
    build: ./frontend
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:3000/api
    ports:
      - "3001:3001"
    depends_on:
      - backend
    volumes:
      - ./frontend/src:/app/src

volumes:
  postgres_data:
```

### Environment Variables

```bash
# .env (Backend)
NODE_ENV=development
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=sports_complex

# JWT
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRATION=24h

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASSWORD=your_app_password

# External Services
STRIPE_SECRET_KEY=sk_test_...
SENTRY_DSN=https://...

# Redis
REDIS_URL=redis://localhost:6379
```

### CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
name: CI/CD

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main, develop ]

jobs:
  test:
    runs-on: ubuntu-latest

    services:
      postgres:
        image: postgres:14
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v2

      - name: Setup Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '18'
          cache: 'npm'

      - name: Install backend dependencies
        working-directory: ./backend
        run: npm ci

      - name: Run backend tests
        working-directory: ./backend
        run: npm run test

      - name: Run backend e2e tests
        working-directory: ./backend
        run: npm run test:e2e

      - name: Install frontend dependencies
        working-directory: ./frontend
        run: npm ci

      - name: Run frontend tests
        working-directory: ./frontend
        run: npm run test

      - name: Build backend
        working-directory: ./backend
        run: npm run build

      - name: Build frontend
        working-directory: ./frontend
        run: npm run build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'

    steps:
      - uses: actions/checkout@v2

      - name: Deploy to production
        run: |
          # Add your deployment script here
          echo "Deploying to production..."
```

### Production Deployment Checklist

- [ ] Environment variables configured
- [ ] Database backups enabled
- [ ] SSL/TLS certificates installed
- [ ] Email service configured
- [ ] Error tracking (Sentry) setup
- [ ] Logging aggregation (ELK) setup
- [ ] Monitoring & alerting configured
- [ ] Load balancer configured
- [ ] CDN configured
- [ ] Firewall rules configured
- [ ] Automated backups scheduled
- [ ] Disaster recovery plan tested
- [ ] Performance optimization complete
- [ ] Security audit completed

---

## Project Timeline

### Phase 1: Planning & Setup (Weeks 1-2)
- Project requirements finalization
- Architecture design & review
- Database schema design
- API endpoint specification
- Team role assignment

### Phase 2: Backend Development (Weeks 3-8)
- Auth module implementation
- User management implementation
- Slots & booking system
- Database setup & migrations
- API endpoint development
- Unit testing (60% coverage)

### Phase 3: Frontend Development (Weeks 4-9)
- Component library setup
- Authentication pages
- Slot browsing & booking interface
- Tournament registration pages
- User dashboard
- Responsive design

### Phase 4: Integration & Testing (Weeks 9-11)
- Frontend-backend integration
- Integration testing
- End-to-end testing
- Performance testing
- Security testing
- Bug fixing

### Phase 5: Deployment & Launch (Weeks 12-13)
- Staging deployment
- UAT testing
- Production deployment
- Documentation finalization
- Team training
- Go-live support

### Phase 6: Post-Launch (Ongoing)
- Bug fixes and patches
- Performance monitoring
- User feedback implementation
- Feature enhancements
- Maintenance & support

---

## Conclusion

This comprehensive specification provides the complete roadmap for developing the Universal University Sports Complex Management System. The system is designed to be:

- **Scalable:** Supports 10x growth
- **Secure:** Enterprise-grade security measures
- **User-friendly:** Intuitive interface for all user types
- **Maintainable:** Well-documented, tested code
- **Accessible:** WCAG 2.1 AA compliant
- **Performant:** Sub-2-second response times

For questions or clarifications, contact the development team or refer to the respective module documentation.

**Document Version:** 1.0.0  
**Last Updated:** December 2024  
**Next Review:** March 2025