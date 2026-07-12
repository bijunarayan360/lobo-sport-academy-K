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

# Run migrations
npm run db:migrate

# Seed data (optional)
npm run db:seed
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```
lobo-sport-academy/
├── prisma/              # Database schema & migrations
├── src/
│   ├── app/             # Next.js App Router pages
│   ├── components/      # React components
│   │   ├── ui/          # shadcn/ui components
│   │   └── layout/      # Layout components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── server/          # Backend code
│   │   ├── api/         # tRPC routers
│   │   ├── auth/        # NextAuth config
│   │   └── db/          # Prisma client
│   └── types/           # TypeScript types
├── public/              # Static assets
└── ...config files
```

## Features

- [x] Project setup & configuration
- [ ] Database schema (Prisma)
- [ ] Authentication (NextAuth)
- [ ] User management (Admin, Coach, Parent)
- [ ] Student management
- [ ] Program & enrollment management
- [ ] Payment processing (Stripe)
- [ ] Attendance tracking
- [ ] Player ratings & reports
- [ ] Dashboards & analytics
- [ ] CMS for website content

## License

MIT
