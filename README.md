# Universal University Sports Complex Management System

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![Node.js](https://img.shields.io/badge/node.js-v18+-green.svg)
![Build](https://img.shields.io/badge/build-passing-brightgreen.svg)

> A comprehensive full-stack web application for managing university sports facilities, bookings, and tournaments.
---

## 🎯 Project Overview

The **Universal University Sports Complex Management System** is a modern, scalable web application designed to streamline the management and booking of sports facilities within educational institutions. It provides an intuitive platform for students and staff to book facility slots, register for tournaments, and manage sports events efficiently.

### Key Features

- 🔐 **Secure User Authentication** - Role-based access control for students, staff, and administrators
- 📅 **Real-time Slot Booking** - View available slots and book facilities instantly
- 🏆 **Tournament Management** - Create tournaments, register teams, and manage competitions
- 📊 **Administrative Dashboard** - Comprehensive analytics and facility management tools
- 🔔 **Notification System** - Email notifications for bookings, confirmations, and reminders
- 📱 **Responsive Design** - Seamless experience across desktop, tablet, and mobile devices
- ⚡ **High Performance** - Sub-2-second response times for critical operations
- 🔒 **Enterprise Security** - Data encryption, secure API endpoints, and multi-factor authentication support

---

## 🏗️ Tech Stack

### Frontend
- **Framework:** Next.js 14+ (React)
- **Styling:** Tailwind CSS 3.x
- **State Management:** React Context API / Redux (optional)
- **UI Components:** Custom components with accessibility support
- **HTTP Client:** Axios / Fetch API
- **Deployment:** Vercel / AWS S3 + CloudFront

### Backend
- **Runtime:** Node.js 18+
- **Framework:** NestJS (TypeScript)
- **Database:** PostgreSQL 14+
- **ORM:** TypeORM 0.3+
- **Authentication:** JWT + Passport.js
- **API:** RESTful API
- **Email Service:** Nodemailer / SendGrid
- **Validation:** Class Validator
- **Logging:** Winston / Pino
- **Deployment:** AWS EC2 / DigitalOcean / Heroku

### DevOps & Tools
- **Package Manager:** npm / yarn
- **Version Control:** Git
- **CI/CD:** GitHub Actions / GitLab CI
- **Docker:** Docker & Docker Compose
- **Testing:** Jest, Supertest
- **Code Quality:** ESLint, Prettier
- **API Documentation:** Swagger/OpenAPI

---

## 📋 System Requirements

### Prerequisites
- Node.js v18.0.0 or higher
- PostgreSQL 14 or higher
- npm 8+ or yarn 3+
- Git
- Docker & Docker Compose (optional, for containerized setup)

### Recommended Specifications
- **OS:** macOS, Linux, or Windows (WSL2)
- **RAM:** 8GB minimum
- **Disk Space:** 2GB for dependencies and database
- **Network:** Stable internet connection for API integration

---

## 🚀 Quick Start Guide

### 1. Clone the Repository



### 2. Setup Backend (NestJS + PostgreSQL)

```bash
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your database credentials and API keys

# Database setup
npm run migration:generate
npm run migration:run

# Start development server
npm run start:dev

# Server runs on http://localhost:3000
```

### 3. Setup Frontend (Next.js + React)

```bash
cd frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local
# Edit .env.local with your API endpoint

# Start development server
npm run dev

# App runs on http://localhost:3001
```

### 4. Access the Application

- **Frontend:** http://localhost:3001
- **Backend API:** http://localhost:3000
- **API Documentation (Swagger):** http://localhost:3000/api

---

## 🐳 Docker Setup (Alternative)

```bash
# Build and run with Docker Compose
docker-compose up -d

# The application will be available at:
# Frontend: http://localhost:3001
# Backend: http://localhost:3000
```

---

## 📁 Project Structure

```
universal-sports-complex/
├── backend/                          # NestJS API Server
│   ├── src/
│   │   ├── auth/                    # Authentication module
│   │   ├── users/                   # User management
│   │   ├── slots/                   # Slot booking module
│   │   ├── facilities/              # Facility management
│   │   ├── tournaments/             # Tournament management
│   │   ├── notifications/           # Email notifications
│   │   ├── admin/                   # Admin operations
│   │   ├── database/                # TypeORM entities & migrations
│   │   ├── common/                  # Shared utilities
│   │   └── main.ts
│   ├── test/                        # Unit & integration tests
│   ├── .env.example
│   ├── docker-compose.yml
│   ├── Dockerfile
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/                         # Next.js Frontend
│   ├── src/
│   │   ├── app/                     # Next.js 13+ app directory
│   │   ├── components/              # Reusable React components
│   │   ├── pages/                   # Page components
│   │   ├── styles/                  # Tailwind CSS & global styles
│   │   ├── hooks/                   # Custom React hooks
│   │   ├── services/                # API service clients
│   │   ├── context/                 # Context providers
│   │   ├── utils/                   # Helper utilities
│   │   ├── types/                   # TypeScript type definitions
│   │   └── layout.tsx
│   ├── public/                      # Static assets
│   ├── .env.example
│   ├── tailwind.config.js           # Tailwind configuration
│   ├── next.config.js
│   ├── package.json
│   └── tsconfig.json
│
├── docs/                             # Documentation
│   ├── API.md                       # API documentation
│   ├── DATABASE.md                  # Database schema
│   └── ARCHITECTURE.md              # System architecture
│
├── docker-compose.yml               # Multi-container setup
├── .gitignore
├── README.md
└── LICENSE
```

---

## 🎨 Color Palette & Design System

The application uses a modern, accessible color palette:

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Teal | `#218D8D` | Buttons, links, accents |
| Dark Slate | `#134252` | Text, headers |
| Light Cream | `#FCFCF9` | Backgrounds |
| Success Green | `#2FB67F` | Success messages |
| Error Red | `#C0152F` | Error states |
| Warning Orange | `#A84B2F` | Warnings |
| Border Gray | `#5E5240` | Dividers, borders |

### Implementation

```css
:root {
  --color-primary: #218D8D;
  --color-primary-hover: #1A7474;
  --color-primary-dark: #1A6E6E;
  --color-dark: #134252;
  --color-light: #FCFCF9;
  --color-success: #2FB67F;
  --color-error: #C0152F;
  --color-warning: #A84B2F;
  --color-border: #5E5240;
}
```

---

## 👥 User Roles & Permissions

### 1. **Student/User**
- Register and login
- View available slots
- Book facility slots
- Modify/cancel bookings
- Register for tournaments
- View tournament details
- Receive notifications
- Update profile

### 2. **Facility Manager**
- View facility schedules
- Manage maintenance
- Update facility status
- Generate usage reports
- Monitor peak hours

### 3. **Administrator**
- Complete user management
- Create/modify/delete tournaments
- Manage facility slots
- Send notices and announcements
- Ban players for disciplinary issues
- View comprehensive analytics
- Generate reports
- System configuration

---

## 🔌 Core API Endpoints

### Authentication
```
POST   /api/auth/register           # User registration
POST   /api/auth/login              # User login
POST   /api/auth/logout             # User logout
POST   /api/auth/refresh            # Refresh JWT token
GET    /api/auth/me                 # Current user profile
```

### Slots & Booking
```
GET    /api/slots                   # List all available slots
GET    /api/slots/:id               # Get slot details
POST   /api/bookings                # Create new booking
GET    /api/bookings/my             # User's bookings
PATCH  /api/bookings/:id            # Modify booking
DELETE /api/bookings/:id            # Cancel booking
```

### Tournaments
```
GET    /api/tournaments             # List all tournaments
POST   /api/tournaments             # Create tournament (Admin)
GET    /api/tournaments/:id         # Tournament details
POST   /api/tournaments/:id/register # Register for tournament
GET    /api/tournaments/:id/teams   # View teams
```

### Admin Operations
```
GET    /api/admin/dashboard         # Dashboard stats
GET    /api/admin/users             # Manage users
GET    /api/admin/reports           # Generate reports
POST   /api/admin/slots             # Create slots
PATCH  /api/admin/tournaments/:id   # Modify tournament
```

### Notifications
```
GET    /api/notifications           # User notifications
PATCH  /api/notifications/:id/read  # Mark as read
DELETE /api/notifications/:id       # Delete notification
```

---

## 🗄️ Database Schema Overview

### Key Tables
- **users** - User accounts with roles
- **slots** - Available facility slots
- **bookings** - User slot bookings
- **facilities** - Sports facilities info
- **tournaments** - Tournament records
- **teams** - Tournament teams
- **players** - Player details
- **notifications** - User notifications
- **audit_logs** - System activity logs

See [DATABASE.md](./docs/DATABASE.md) for complete schema details.

---

## 🧪 Testing

### Run Tests

```bash
# Backend unit tests
cd backend
npm run test

# Backend e2e tests
npm run test:e2e

# Frontend tests
cd frontend
npm run test

# Generate coverage reports
npm run test:cov
```

### Test Coverage Goals
- Backend: Minimum 80% coverage
- Frontend: Minimum 70% coverage
- Critical paths: 100% coverage

---

## 📖 Documentation

- [API Documentation](./docs/API.md) - Complete REST API reference
- [Database Schema](./docs/DATABASE.md) - Entity relationships
- [Architecture Guide](./docs/ARCHITECTURE.md) - System design
- [Installation Guide](./docs/INSTALLATION.md) - Detailed setup steps
- [Deployment Guide](./docs/DEPLOYMENT.md) - Production deployment

---

## 🔒 Security Features

- ✅ JWT-based authentication
- ✅ Password hashing with bcrypt
- ✅ SQL injection prevention (TypeORM parameterized queries)
- ✅ CORS configuration
- ✅ Rate limiting on API endpoints
- ✅ Input validation & sanitization
- ✅ HTTPS/TLS in production
- ✅ Security headers (Helmet.js)
- ✅ Environment variable protection
- ✅ Audit logging for sensitive operations

---

## 🚢 Deployment

### Production Deployment Checklist

- [ ] Set production environment variables
- [ ] Configure PostgreSQL database
- [ ] Enable HTTPS/TLS certificates
- [ ] Setup CI/CD pipeline
- [ ] Configure email service
- [ ] Setup monitoring & logging
- [ ] Configure backups
- [ ] Setup CDN for static assets
- [ ] Performance optimization
- [ ] Security audit

See [DEPLOYMENT.md](./docs/DEPLOYMENT.md) for detailed instructions.

---

## 📊 Performance Targets

| Metric | Target |
|--------|--------|
| Page Load Time | < 3s |
| API Response Time | < 2s |
| Database Query Time | < 500ms |
| Uptime | 99.9% |
| Concurrent Users | 1000+ |

---

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Code Standards
- Follow ESLint configuration
- Use Prettier for code formatting
- Write meaningful commit messages
- Add tests for new features
- Update documentation

---

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE) file for details.

---

**Institution:** University
**Department:** Computer Science

---

## 👥 Development Team

| Member | Role | Student ID |
|--------|------|-----------|
| Md. Shahab Uddin | Full Stack Developer | 22-47934-2 |
| Md. Mostakin Ali | Full Stack Developer | 22-48005-2 |
| Antara Saha | Frontend Developer | 22-48052-2 |
| P.M. Tasriful Islam | Backend Developer | 22-47885-2 |
| Badhon Kumar Biswas | QA & DevOps | 22-47992-2 |

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- Open an issue on GitHub
- Email: support@universitycomplex.edu
- Visit our documentation: [docs](./docs)

---

## 🙏 Acknowledgments

- University Faculty and Department of Computer Science
- All stakeholders and users who provided feedback
- Open source community for excellent tools and libraries

---

**Last Updated:** December 2024  
**Version:** 1.0.0  
**Status:** In Development ✨