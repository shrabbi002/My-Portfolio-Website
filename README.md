# Portfolio Website

A full-stack portfolio website built with **Next.js 16**, **Express.js**, and **MongoDB**.

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 16, React 19, Tailwind CSS v4 |
| Backend | Node.js, Express.js 5 |
| Database | MongoDB Atlas (Mongoose) |
| Auth | JWT |
| File Upload | Multer |

## 📁 Project Structure

```
Portfolio/
├── frontend/          # Next.js frontend
│   ├── src/
│   │   ├── app/       # Pages & routes
│   │   ├── components/# Reusable components
│   │   └── lib/       # API client & utilities
│   └── public/        # Static assets
├── backend/           # Express.js API
│   ├── models/        # Mongoose schemas
│   ├── routes/        # API routes
│   ├── uploads/       # Uploaded files
│   └── server.js      # Server entry point
├── .env.example       # Environment variables template
└── README.md
```

## ⚙️ Setup

### 1. Clone the repository
```bash
git clone https://github.com/YOUR_USERNAME/Portfolio.git
cd Portfolio
```

### 2. Install dependencies
```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### 3. Configure environment variables
```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your actual values:
# - MONGODB_URI (MongoDB Atlas connection string)
# - JWT_SECRET (any random string)
# - ADMIN_USERNAME & ADMIN_PASSWORD
# - NEXT_PUBLIC_API_URL
```

### 4. Seed the database (optional)
```bash
cd backend
npm run seed
```

### 5. Run locally
```bash
# Terminal 1 - Backend (port 5000)
cd backend
npm run dev

# Terminal 2 - Frontend (port 3000)
cd frontend
npm run dev
```

Visit `http://localhost:3000` for the site, `http://localhost:3000/admin` for the admin panel.

---

## 🌐 Deployment

### Frontend → Vercel
1. Push to GitHub
2. Import in [Vercel](https://vercel.com)
3. Set **Root Directory** to `frontend`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL` = your backend URL (e.g., `https://your-app.onrender.com/api`)
5. Deploy!

### Backend → Render
1. Push to GitHub
2. Create a **Web Service** in [Render](https://render.com)
3. Set **Root Directory** to `backend`
4. **Build Command**: `npm install`
5. **Start Command**: `npm start`
6. Add environment variables:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`
7. Deploy!

### Alternative: Railway
1. Push to GitHub
2. Create project in [Railway](https://railway.app)
3. Add backend service (root: `backend`)
4. Add frontend service (root: `frontend`)
5. Set environment variables for each

---

## 🔐 Admin Panel

Access at `/admin` with credentials set in environment variables.

**Sections**: Hero, About, Skills, Projects, Research, Experience, Blog, Certifications, Contact, Messages, Settings.

---

## 📄 License

MIT
