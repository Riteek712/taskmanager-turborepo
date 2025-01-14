# TaskFlow - Task Management System

A modern task management system built with Next.js, Nest.js, and Prisma using Turborepo and pnpm for monorepo management.

![TaskFlow Hero](./ProjectScreens/heroTM.png)

## Tech Stack

### Frontend
- Next.js 14
- TypeScript
- Tailwind CSS
- Shadcn/ui

### Backend
- Nest.js
- Prisma ORM
- PostgreSQL

### Development Tools
- Turborepo
- pnpm
- ESLint
- Prettier

## Prerequisites

Before you begin, ensure you have installed:
- Node.js (v18 or higher)
- pnpm (`npm install -g pnpm`)
- PostgreSQL

## Project Structure

```
taskmanager-turborepo/
├── apps/
│   ├── web/          # Next.js frontend
│   └── backend/          # Nest.js backend
├── packages/
│   ├── eslint-config/
│   ├── typescript-config/
│   └── ui/           # Shared UI components
├── turbo.json
├── projectscreens/   # Screenshots of all pages
└── package.json
```

## Project Screenshots

The `ProjectScreens` folder contains screenshots of all pages in the application. You can find:
- Landing page (heroTM.png)
- Authentication pages
- Dashboard views
- Task management interfaces

These screenshots provide a visual reference for the application's UI and can be helpful for development and documentation purposes.

## Getting Started

1. Clone the repository
```bash
git clone https://github.com/Riteek712/taskmanager-turborepo
cd taskmanager-turborepo
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables

Create `.env` files in both the backend directories:


For `apps/backend/.env`:
```env
DATABASE_URL="postgresql://username:password@localhost:5432/taskflow"
JWT_SECRET="your-secret-key"
```

4. Set up the database
```bash
cd apps/backend
pnpm prisma generate
pnpm prisma migrate dev
```

5. Start the development servers
```bash
# From the root directory
pnpm dev
```

This will start:
- Frontend at http://localhost:3000
- Backend at http://localhost:3003

## Available Scripts

From the root directory:

```bash
pnpm build        # Build all applications
pnpm run dev          # Start all applications in development mode
pnpm lint         # Run ESLint across all applications
pnpm format       # Format code using Prettier
pnpm test         # Run tests across all applications
```

## Database Management

The project uses Prisma ORM with PostgreSQL. To manage your database:

```bash
cd apps/backend

# Generate Prisma Client
pnpm prisma generate

# Create a migration
pnpm prisma migrate dev


```

## Development Guidelines

### Adding Dependencies

To add a dependency to a specific workspace:
```bash
pnpm add <package> --filter <workspace>
```

Example:
```bash
pnpm add axios --filter web
```

### Creating New Features

1. Create a new branch
```bash
git checkout -b feature/your-feature-name
```

2. Make your changes and commit using conventional commits
```bash
git commit -m "feat: add new feature"
```

3. Push and create a pull request
```bash
git push origin feature/your-feature-name
```



## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Built with love by Riteek Rakesh
- UI Design inspired by modern web applications
- Special thanks to the open source community

