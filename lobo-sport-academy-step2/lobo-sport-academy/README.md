# Lobo Sport Academy

A full-stack sports academy management system built with Next.js 14, tRPC, Prisma, and Tailwind CSS.

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui
- **Database**: PostgreSQL + Prisma ORM
- **API**: tRPC with React Query
- **Auth**: NextAuth.js with credentials + OAuth
- **Payments**: Stripe
- **File Storage**: AWS S3
- **Email**: Resend

## Getting Started

### 1. Clone and Install

```bash
git clone <your-repo-url>
cd lobo-sport-academy
npm install
```

### 2. Environment Setup

```bash
cp .env.example .env
# Edit .env with your credentials
```

### 3. Database Setup

```bash
# Start PostgreSQL (Docker or local)
docker run -d -e POSTGRES_PASSWORD=password -p 5432:5432 postgres:15

# Generate Prisma client
npm run db:generate

# Run migrations
npm run db:migrate

# Seed data
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Default Login Credentials

| Role  | Email                        | Password   |
|-------|------------------------------|------------|
| Admin | admin@loboacademy.com        | admin123   |
| Coach | john@loboacademy.com         | coach123   |
| Parent| robert@example.com           | parent123  |

## Project Structure

```
lobo-sport-academy/
├── prisma/
│   ├── schema.prisma      # Database schema
│   └── seed.ts            # Seed data script
├── src/
│   ├── app/               # Next.js App Router pages
│   │   ├── api/
│   │   │   ├── auth/[...nextauth]/  # NextAuth route
│   │   │   └── trpc/[trpc]/         # tRPC API handler
│   │   ├── page.tsx       # Landing page
│   │   ├── layout.tsx     # Root layout
│   │   └── globals.css    # Global styles
│   ├── components/
│   │   ├── ui/            # shadcn/ui components (25+)
│   │   ├── layout/        # Layout components
│   │   └── providers.tsx  # App providers
│   ├── hooks/             # Custom React hooks
│   ├── lib/               # Utility functions
│   │   ├── utils.ts       # cn(), formatters
│   │   └── api.ts         # tRPC client
│   ├── server/            # Backend code
│   │   ├── api/
│   │   │   ├── routers/   # tRPC routers (12)
│   │   │   ├── root.ts    # Router composition
│   │   │   └── trpc.ts    # Context & middleware
│   │   ├── auth/
│   │   │   ├── auth-options.ts   # NextAuth config
│   │   │   └── auth-helper.ts  # Auth utilities
│   │   └── db/
│   │       └── index.ts   # Prisma client singleton
│   └── types/             # TypeScript declarations
└── ...config files
```

## API Routers

| Router        | Endpoints                              | Access Level |
|---------------|----------------------------------------|--------------|
| `auth`        | register, me                           | Public       |
| `user`        | getAll, getById, update, toggleActive  | Admin        |
| `student`     | CRUD, getMyStudents                    | All roles    |
| `parent`      | getAll, getById, update                | All roles    |
| `coach`       | getAll, getById, update, toggleActive  | All roles    |
| `program`     | CRUD, getStats                         | All roles    |
| `payment`     | CRUD, getMyPayments, getStats          | All roles    |
| `attendance`  | getAll, mark, bulkMark, getStats       | Coach+       |
| `rating`      | CRUD, getByStudent                     | Coach+       |
| `report`      | dashboardStats, revenue, attendance    | Admin        |
| `notification`| getAll, markAsRead, create             | All roles    |
| `cms`         | CRUD pages                             | Public/Admin |

## Database Schema

### Core Entities
- **User** - Base user with role (Admin/Coach/Parent)
- **Admin** - Admin profile
- **Coach** - Coach profile with specialty & certifications
- **Parent** - Parent profile with address & emergency contacts

### Domain Entities
- **Student** - Student profile with medical info
- **Program** - Training programs with schedule & pricing
- **Enrollment** - Student-program enrollment tracking

### Business Entities
- **Payment** - Payment tracking with Stripe integration
- **Attendance** - Daily attendance marking
- **Rating** - Player skill ratings by coaches

### Analytics
- **PlayerCard** - Generated player performance cards
- **Notification** - Email/WhatsApp/in-app notifications

### CMS
- **CmsPage** - Website content pages
- **CmsMedia** - Uploaded media files
- **Setting** - Application settings

## Features

- [x] Project setup & configuration
- [x] Database schema (Prisma)
- [x] Authentication (NextAuth)
- [x] tRPC API with role-based access
- [x] User management (Admin, Coach, Parent)
- [x] Student management
- [x] Program & enrollment management
- [x] Payment processing
- [x] Attendance tracking
- [x] Player ratings & reports
- [ ] Dashboards & analytics UI
- [ ] Frontend pages
- [ ] CMS website pages
- [ ] Deployment

## License

MIT
