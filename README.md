# Event Management System

## Project Overview

A full-stack web application to create, manage, and analyze events. Built with:

- **Frontend:** React + Tailwind CSS  
- **Backend:** Node.js + Express.js  
- **Database:** MySQL


## Features

- Add, update, delete events
- View events with pagination & filters
- Register attendees
- Show event details and attendee lists
- View analytics like total attendees and capacity usage


## Project Structure

Event-Management-System/
├── client/ # React frontend (UI, pages, reusable components)
├── server/ # Node.js backend (API, routes, services, models)


## Tech Stack

- React (with Context API or Redux Toolkit)
- Node.js + Express
- MySQL
- Tailwind CSS
- Axios


## Local Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/YourUsername/Event-Management-System.git
cd Event-Management-System
```

## Environment Variables
Create .env files inside server/ and client/ folders.

Example for server:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=event_management
```

## Run Backend

cd server
npm install
npm run dev


## Run Frontend

cd ../client
npm install
npm run dev

Visit [http://localhost:5173](http://localhost:5173) to view the app.


## API Endpoints (Brief Summary)

API Endpoints (Backend)
- GET /events — Fetch events (supports filters and pagination)
- POST /events — Add new event
- PUT /events/:id — Update event
- DELETE /events/:id — Delete event
- POST /events/:id/register — Register attendee
- GET /events/:id/attendees — Get attendees of event
- GET /analytics — View analytics summary


## UI/UX Design Choices

- Responsive layout (desktop + mobile)
- Clean, minimal UI
- Reusable components: Button, Input, Modal, Table
- Form validations for event creation and registration



