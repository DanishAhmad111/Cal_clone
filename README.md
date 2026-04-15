# Cal.com Clone — Scheduling Made Simple

A full-stack scheduling and booking web application built as a clone of [Cal.com](https://cal.com). The project strictly separates the frontend and backend architectures: a Next.js Web App for the UI and an Express (Node.js) server with a PostgreSQL database for the API.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)
![Express.js](https://img.shields.io/badge/Express.js-4.x-000000?logo=express)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?logo=tailwind-css)
![Prisma](https://img.shields.io/badge/Prisma-5-2D3748?logo=prisma)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?logo=postgresql)

## Tech Stack

| Layer      | Technology              |
|------------|------------------------|
| Frontend   | Next.js 14, React, Tailwind CSS |
| Backend    | Node.js, Express, TypeScript |
| Database   | PostgreSQL              |
| ORM        | Prisma                  |
| Toast      | react-hot-toast         |

## Directory Structure

The workspace is divided into two separate applications:
- `/frontend`: Next.js application containing the users' dashboard and the public booking interfaces
- `/backend`: Node.js Express server handling all REST API routes, the database connection via Prisma, and server-side validaton

## Features

### Dashboard (Admin)
- **Event Types** — Create, edit, delete, enable/disable event types
- **Bookings** — View upcoming/past bookings, cancel bookings
- **Availability** — Configure weekly schedule with toggle switches and timezone selection

### Public Booking Flow
- **Calendar View** — Monthly calendar highlighting available days
- **Time Slots** — Dynamic slot generation based on availability, excluding already-booked times
- **Booking Form** — Collect name, email, and optional notes
- **Confirmation** — Full booking summary after successful booking
- **Double-booking prevention** — Server-side overlap validation

## Local Setup & Run Instructions

### Prerequisites
- [Node.js](https://nodejs.org/en/) (v18 or higher)
- [PostgreSQL](https://www.postgresql.org/) database running locally or via a cloud provider

### 1. Clone the repository

```bash
git clone <repo-url>
cd "CAL.COM CLONE"
```

### 2. Backend Setup & Running

The backend runs an Express server on port 5000 by default.

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Create environment configuration
# Either copy an existing .env.example or create .env with the following:
```
**`backend/.env`**
```env
DATABASE_URL="postgresql://<USERNAME>:<PASSWORD>@localhost:5432/<DB_NAME>"
PORT=5000
FRONTEND_URL=http://localhost:3000
```
*(Make sure to update `DATABASE_URL` with your actual Postgres credentials).*

```bash
# Push the Prisma schema to your database
npx prisma db push

# Optional: Seed the database with initial users, event types, and availability
npx prisma db seed

# Run the development server
npm run dev
```
You should see: `Backend server successfully running on port 5000`

### 3. Frontend Setup & Running

Open a **new terminal window** leaving the backend running. The frontend runs Next.js on port 3000.

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Create environment configuration
```
**`frontend/.env.local`**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

```bash
# Run the development server
npm run dev
```

Visit the dashboard at [http://localhost:3000/dashboard](http://localhost:3000/dashboard) to view and configure the event types and user availability.
Visit the public booking page (e.g., `http://localhost:3000/johndoe/30-min-chat`) to test the public scheduling flow.

## Database Schema Model (Prisma)

- **User** — System users (e.g. John Doe, @johndoe)
- **EventType** — Event durations and details (15 Min Chat, 30 Min Meeting, etc.)
- **Availability** — Weekly configuration (available days, start time, end time) 
- **Booking** — Captured meeting data with names, times, and notes.

## API Endpoints (Backend)

| Method | Express Route (`/api/...`)    | Description                    |
|--------|-------------------------------|--------------------------------|
| GET    | `/event-types`                | List all event types           |
| POST   | `/event-types`                | Create an event type           |
| GET    | `/event-types/:id`            | Get event type by ID           |
| PUT    | `/event-types/:id`            | Update event type              |
| DELETE | `/event-types/:id`            | Delete event type              |
| GET    | `/event-types/user/:username/:slug`| Get event type by user and slug |
| GET    | `/availability`               | Get availability settings      |
| PUT    | `/availability`               | Update availability settings   |
| GET    | `/bookings?status=upcoming`   | List bookings (upcoming/past)  |
| POST   | `/bookings`                   | Create a booking               |
| POST   | `/bookings/:id/cancel`        | Cancel a booking               |
| GET    | `/slots?username=x&date=Y&duration=Z`| Get open time slots        |

## Assumptions & Disclaimers

1. **No true authentication** — Simplified for demo purposes. 
2. **Timezone Handling** — Backend slots are tracked and stored in UTC; the frontend dynamically adjusts them to browser-local times.
3. **Email Handling** — Confirmations happen strictly in UI via Toast notifications / views. No real emails are dispatched.

