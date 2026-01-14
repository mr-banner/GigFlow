# 🚀 GigFlow – Freelancing Platform

🔗 **Live Frontend:** https://gig-flow-5cq1.vercel.app  

**GigFlow** is a modern full-stack freelancing platform where **clients post gigs**, **freelancers bid on projects**, and **hiring happens through a secure, role-based workflow** with atomic transactions.

---

## 🌟 Project Highlights

- 🔐 Secure JWT authentication with HTTP-only cookies  
- 👥 Role-based system (Client & Freelancer)  
- 💼 End-to-end gig posting & bidding flow  
- 🔥 Atomic hiring logic using MongoDB transactions  
- 🛡️ Strong security & access control  
- ⚡ Deployed on Vercel with serverless backend  

---

## 🧠 Core Features

### 🔐 Authentication
- User registration & login  
- JWT-based authentication  
- Tokens stored securely in HTTP-only cookies  
- Auto login via `/auth/getUser`  
- Secure logout  

---

### 👤 User Roles

#### 🧑‍💼 Client
- Post new gigs  
- View bids on their gigs  
- Hire or reject freelancers  

#### 🧑‍💻 Freelancer
- Browse open gigs  
- Submit bids  
- Track bid status: **pending / hired / rejected**

---

## 💼 Gig Management

- Create gigs (authenticated users only)  
- Browse only open gigs  
- Search gigs by title or description  
- View detailed gig information  
- View only your own gigs  

### 📌 Gig Status
- `open`  
- `assigned`  

---

## 💰 Bidding System (Core Logic)

### 🔄 Bidding Flow
1. Freelancer submits a bid on an open gig  
2. Only one bid per user per gig (strictly enforced)  
3. Client views all bids on their gig  
4. Client can:
   - Hire one freelancer  
   - Reject other bids  

---

## 🔥 Hiring Logic (Atomic & Secure)

When a bid is hired:

1. Gig status → **assigned**  
2. Selected bid status → **hired**  
3. All other bids → **rejected**  
4. Executed atomically using **MongoDB transactions**

✔ Ensures data consistency & prevents race conditions  

---

## 📄 Pages Overview

| Route | Description |
|------|------------|
| `/` | Landing page |
| `/login` | User login |
| `/register` | User registration |
| `/gigs` | Browse open gigs |
| `/gigs/:id` | Gig details & bidding |
| `/post-gig` | Create a new gig |
| `/my-gigs` | Gigs posted by user |
| `/my-bids` | Bids submitted by user |
| `/dashboard` | User dashboard |

---

## 🔌 Backend API Endpoints

### 🔐 Authentication

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/auth/register` | Register user |
| POST | `/api/auth/login` | Login |
| GET | `/api/auth/getUser` | Get current user |
| POST | `/api/auth/logout` | Logout |

---

### 💼 Gigs

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/gigs` | Create gig |
| GET | `/api/gigs` | Get all open gigs |
| GET | `/api/gigs/:id` | Get gig details |
| GET | `/api/gigs/my` | Get user’s gigs |

---

### 💰 Bids

| Method | Endpoint | Description |
|------|---------|------------|
| POST | `/api/bids` | Submit bid |
| GET | `/api/bids/:gigId` | Get bids (owner only) |
| PATCH | `/api/bids/:bidId/hire` | Hire freelancer |
| PATCH | `/api/bids/:bidId/reject` | Reject bid |
| GET | `/api/bids/my` | Get user’s bids |

---

## 🛡️ Security

- JWT verification middleware  
- Role-based access control  
- HTTP-only cookies  
- CORS configured with credentials  
- Duplicate bid prevention  
- Owner-only access to bids  

---

## 🧱 Tech Stack

### 🎨 Frontend
- React (Vite)  
- Tailwind CSS  
- shadcn/ui  
- Axios  
- Context API  

### ⚙️ Backend
- Node.js  
- Express  
- MongoDB + Mongoose  
- JWT Authentication  
- Cookie-based auth  

### 🚀 Deployment
- Frontend: Vercel  
- Backend: Vercel Serverless Functions  
- Database: MongoDB Atlas  

---

## ⚙️ Environment Variables

### Backend `.env`
```env
PORT=8080
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key


# 🧪 Local Setup
Backend
cd server
npm install
npm run dev

Frontend
cd client
npm install
npm run dev
