<p align="center">
  <img src="https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react&logoColor=white" />
  <img src="https://img.shields.io/badge/TypeScript-5.8-3178C6?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Vite-6.x-646CFF?style=for-the-badge&logo=vite&logoColor=white" />
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-5.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?style=for-the-badge&logo=mongodb&logoColor=white" />
  <img src="https://img.shields.io/badge/Deployed-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white" />
</p>

# 🅿️ CampusPark — Smart Parking Assistance System

> A real-time campus parking management system that helps faculty find, reserve, and manage parking slots across multiple zones — with a dedicated admin control panel.

### 🔗 [Live Demo →  campus-park-lovat.vercel.app](https://campus-park-lovat.vercel.app/)

**Demo Credentials (Admin Portal):**  `admin123` / `campus-secure`

---

## ✨ Key Features

### 👩‍🏫 User Portal (Teacher View)
- **Real-time slot availability** across 3 campus zones with color-coded status indicators
- **One-click reservation** system with time-window enforcement (8:00 AM – 6:00 PM)
- **Live availability trends** — interactive bar chart (Recharts) showing zone-wise occupancy
- **Push-style notifications** when occupied slots become free

### 🛡️ Admin Portal
- **Secure authentication** with dedicated admin login screen
- **Full CRUD operations** — add/remove parking slots and zones in real time
- **Status management** — mark slots as Available, Occupied, Reserved, or Maintenance
- **Inline editing** — rename zones directly from the dashboard

### ⚡ Architecture Highlights
- **Dual-backend architecture** — Supabase (production) + Express/MongoDB (development)
- **Zero cold-start deployment** — Supabase SDK eliminates server spin-up delays
- **Environment-driven backend switching** — toggle between backends via a single env variable
- **Responsive design** — fully functional on desktop, tablet, and mobile

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite |
| **Styling** | Tailwind CSS, Lucide Icons |
| **Charts** | Recharts |
| **Primary Backend** | Supabase (PostgreSQL + Row Level Security) |
| **Secondary Backend** | Express.js 5, Mongoose, MongoDB |
| **Deployment** | Vercel (Frontend) |
| **AI Integration** | Google Gemini API *(parking insights — optional)* |

---

## 📁 Project Structure

```
campuspark/
├── index.html                  # Entry point
├── App.tsx                     # Root component — state management & routing
├── types.ts                    # TypeScript interfaces & enums
├── constants.ts                # Initial seed data constants
│
├── components/
│   ├── UserDashboard.tsx       # Teacher view — slots, charts, reservations
│   ├── AdminDashboard.tsx      # Admin panel — full CRUD controls
│   ├── AdminLogin.tsx          # Secure admin authentication
│   ├── Navbar.tsx              # Top bar with notification bell
│   └── Sidebar.tsx             # Role switcher sidebar
│
├── services/
│   ├── storageService.ts       # Backend switcher (Supabase ↔ Express)
│   ├── supabaseClient.ts       # Supabase SDK initialization
│   ├── supabaseStorageService.ts  # Supabase CRUD operations
│   └── geminiService.ts        # Gemini AI parking insights
│
├── server/                     # Express.js backend
│   ├── index.js                # Server entry point
│   ├── models/                 # Mongoose schemas (Slot, Zone)
│   └── routes/                 # REST API routes
│
├── scripts/
│   └── seed-supabase.sql       # Database schema + seed data for Supabase
│
└── vite.config.ts              # Vite configuration
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A [Supabase](https://supabase.com) account *(free tier works)*

### 1. Clone & Install

```bash
git clone https://github.com/dev-gautam21/campus-park.git
cd campus-park
npm install
```

### 2. Set Up Supabase

1. Create a new project at [supabase.com](https://supabase.com)
2. Go to **SQL Editor** → paste and run `scripts/seed-supabase.sql`
3. Go to **Settings → API** → copy your **Project URL** and **anon key**

### 3. Configure Environment

Create a `.env.local` file in the project root:

```env
# Backend mode: 'supabase' (default) or 'express' (for local MongoDB)
VITE_BACKEND=supabase

# Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here

# Optional: Gemini AI for parking insights
GEMINI_API_KEY=your-gemini-key-here
```

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## 🔄 Backend Architecture

CampusPark features a **dual-backend architecture** for optimal performance across different environments:

```
┌─────────────────────────────────────────────────────┐
│                    Frontend (React)                  │
│                    storageService.ts                 │
│              ┌────────────┴────────────┐            │
│         VITE_BACKEND              VITE_BACKEND      │
│         = 'supabase'              = 'express'       │
│              │                         │            │
│    ┌─────────▼─────────┐    ┌─────────▼──────────┐ │
│    │  Supabase SDK      │    │  fetch() → REST    │ │
│    │  (Direct DB calls) │    │  API calls         │ │
│    └─────────┬─────────┘    └─────────┬──────────┘ │
└──────────────┼─────────────────────────┼────────────┘
               │                         │
    ┌──────────▼──────────┐   ┌─────────▼──────────┐
    │  Supabase Cloud     │   │  Express.js Server  │
    │  (PostgreSQL + RLS) │   │  + MongoDB           │
    │  ⚡ Always-on        │   │  📦 localhost:5001   │
    └─────────────────────┘   └─────────────────────┘
```

| | Supabase (Production) | Express (Development) |
|---|---|---|
| **Cold start** | None — always on | ~30-50s on free-tier hosting |
| **Speed** | ~200ms response | Depends on hosting |
| **Database** | PostgreSQL (cloud) | MongoDB (local) |
| **Use case** | Live demo / deployed app | Local development |

---

## 📸 Screenshots

<details>
<summary><b>User Dashboard</b> — Real-time slot availability with reservation controls</summary>
<br>
<img src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" alt="CampusPark User Dashboard" width="100%" />
</details>

---

## 🤝 Local Development with Express Backend

If you prefer to work with the Express/MongoDB backend:

```bash
# 1. Set backend to express
# In .env.local: VITE_BACKEND=express

# 2. Start MongoDB locally

# 3. Start the Express server
cd server
npm install
echo "MONGO_URI=mongodb://localhost:27017/campuspark" > .env
npm start

# 4. Start the frontend (in another terminal)
npm run dev
```

---

## 📄 License

This project is built for educational and portfolio purposes.

---

<p align="center">
  Built with ❤️ by <a href="https://github.com/dev-gautam21">Gautam Sharma</a>
</p>
