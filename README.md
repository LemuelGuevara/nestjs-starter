# NestJS Starter Kit

A simple NestJS starter that utilizes Drizzle for ORM and Better-Auth for authentication.

## Features

- NestJS with Fastify enabled as default
- Drizzle ORM for database with Postgres as default
- Better-Auth for authentication

## Getting Started

Before starting make sure to set the following environment variables in a `.env` file.

```env
# PostgreSQL database connection string
DATABASE_URL=your-posgres-url

# Secret used by Better Auth (keep this safe in production)
BETTER_AUTH_SECRET=your-better-auth-secret

# Base URL of your application (used by Better Auth)
BETTER_AUTH_URL=http://localhost:3000 or your domain

# PORT (optional)
PORT=desired-port # e.g. 3001
```

## Running The Server

Run the following commands to get started with the project:

```bash
# Install dependencies
pnpm install # pnpm
npm install # npm
bun install # bun

# Create docker-compose for local database
docker-compose up

# Run the development server
pnpm run start:dev # pnpm
npm run start:dev # npm
bun run start:dev # bun

# Build the project
pnpm run build # pnpm
npm run build # npm
bun run build # bun

# Run the project in production
pnpm run start:prod # pnpm
npm run start:prod # npm
bun run start:prod # bun

# Run drizzle-studio (optional)
pnpm drizzle-kit studio --port 4000 # pnpm
npx drizzle-kit studio --port 4000 # npm
bunx drizzle-kit studio --port 4000 # bun
```
