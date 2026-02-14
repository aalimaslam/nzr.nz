# nzr.nz

A modern fullstack Next.js application with Postgres database and TanStack Query for state management.

## 🚀 Tech Stack

- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety
- **TanStack Query (React Query)** - Server state management
- **Postgres** - Database
- **Drizzle ORM** - Type-safe database toolkit
- **Tailwind CSS** - Styling

## 📋 Prerequisites

- Node.js 18+ and npm
- Docker and Docker Compose (for local database)

## 🛠️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/aalimaslam/nzr.nz.git
cd nzr.nz
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example environment file:

```bash
cp .env.example .env
```

The default `.env` file contains:
```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/nzrnz
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### 4. Start the database

Using Docker Compose:

```bash
docker-compose up -d
```

This will start a Postgres database on port 5432.

### 5. Push the database schema

```bash
npm run db:push
```

This will create the necessary tables in your database.

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📚 Database Management

### Generate migrations

```bash
npm run db:generate
```

### Apply migrations

```bash
npm run db:migrate
```

### Push schema changes (development)

```bash
npm run db:push
```

### Open Drizzle Studio (database GUI)

```bash
npm run db:studio
```

## 🏗️ Project Structure

```
nzr.nz/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── api/               # API routes
│   │   │   ├── users/         # User endpoints
│   │   │   └── posts/         # Post endpoints
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css        # Global styles
│   ├── components/            # React components
│   │   └── Providers.tsx      # TanStack Query provider
│   ├── db/                    # Database configuration
│   │   ├── index.ts           # Database connection
│   │   └── schema.ts          # Database schema
│   └── lib/                   # Utilities and hooks
│       └── hooks.ts           # TanStack Query hooks
├── docker-compose.yml         # Docker configuration
├── drizzle.config.ts          # Drizzle ORM configuration
├── next.config.js             # Next.js configuration
├── tailwind.config.js         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🔌 API Endpoints

### Users

- `GET /api/users` - Get all users
- `GET /api/users?id={id}` - Get a specific user
- `POST /api/users` - Create a new user
- `DELETE /api/users?id={id}` - Delete a user

### Posts

- `GET /api/posts` - Get all posts
- `GET /api/posts?id={id}` - Get a specific post
- `POST /api/posts` - Create a new post
- `PUT /api/posts?id={id}` - Update a post
- `DELETE /api/posts?id={id}` - Delete a post

## 🎯 Features

- ✅ Server-side rendering with Next.js App Router
- ✅ Type-safe database operations with Drizzle ORM
- ✅ Efficient data fetching and caching with TanStack Query
- ✅ RESTful API routes
- ✅ PostgreSQL database with Docker
- ✅ Responsive UI with Tailwind CSS
- ✅ TypeScript for type safety
- ✅ React Query DevTools for debugging

## 🔧 Development

### Build for production

```bash
npm run build
```

### Start production server

```bash
npm run start
```

### Lint code

```bash
npm run lint
```

## 📝 Database Schema

### Users Table

- `id` - Serial primary key
- `name` - Text, not null
- `email` - Text, not null, unique
- `createdAt` - Timestamp, default now

### Posts Table

- `id` - Serial primary key
- `title` - Text, not null
- `content` - Text, not null
- `authorId` - Integer, foreign key to users
- `createdAt` - Timestamp, default now
- `updatedAt` - Timestamp, default now

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

ISC
