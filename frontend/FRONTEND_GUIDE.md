# Frontend Implementation & Usage Guide

## Project Overview
The frontend is a modern, responsive web application built with **Next.js 14** using the App Router. It serves as the interactive interface for students, staff, and administrators of the University Sports Complex.

### Core Tech Stack
- **Framework:** Next.js 14 (React)
- **Styling:** Vanilla CSS + Tailwind CSS utilities
- **State Management:** React Context API (AuthContext)
- **Icons:** React Icons (Hi2)
- **HTTP Client:** Axios

## Implementation Details
The application is structured into role-based dashboards:

### 1. Student Portal
- **Dashboard Overview:** Displays upcoming bookings and activity.
- **Facility Booking:** Interactive system to browse facilities, view real-time availability for specific dates, and book slots via modals.
- **Tournaments:** Browse active tournaments and register teams.
- **Settings:** Personal profile and security management.

### 2. Staff Portal
- **Maintenance Tracking:** Dedicated page to monitor facility "Health Scores" and update maintenance status.
- **Facility Management:** Add new facilities and manage existing ones.

### 3. Admin Dashboard
- **Analytics:** High-level overview of users, bookings, and revenue.
- **User Management:** Full CRUD operations for all system users (Students, Staff, Admins).
- **System Logs:** Monitoring recent activities within the application.

## Design Highlights
- **Active Navigation:** Sidebar with persistent active state indicators and left-bar highlighting.
- **Interactive UI:** Smooth transitions and modals for all major actions (Booking, Registration, Adding Users).
- **Consistent Branding:** Professional teal and slate color palette designed for a premium feel.

## How to Use

### Installation
```bash
cd frontend
npm install
```

### Environment Configuration
Create a `.env.local` file in the `frontend` directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### Running the App
```bash
# Development server
npm run dev

# Production build
npm run build
npm start
```

### Accessing Dashboards
After logging in with the credentials provided in the `BACKEND_GUIDE.md`, the system will automatically redirect you based on your assigned role:
- `/dashboard/student`
- `/dashboard/staff`
- `/dashboard/admin`
