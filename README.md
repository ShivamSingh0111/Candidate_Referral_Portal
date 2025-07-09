# Candidate Referral Management System
```
Welcome! This project is a full-stack Candidate Referral Management System, inspired by real-world HR workflows. It lets you refer candidates, track their status, and manage everything from a modern dashboard.

```
## Features
- User registration & login (JWT authentication)
- Dashboard with:
  - List of referred candidates (search & filter included)
  - Referral form (resume upload, PDF only)
  - Status update (Pending, Reviewed, Hired)
  - Metrics/stat cards (totals, by status)
- Responsive, clean UI (React + Material-UI)
- RESTful API (Node.js, Express, MongoDB)
- Input validation & error handling throughout

## Tech Stack
- **Frontend:** React, Vite, Material-UI
- **Backend:** Node.js, Express, MongoDB, Joi

## Getting Started

### 1. Clone the repository
```bash
# Clone the repo
git clone <your-repo-url>
cd Candidate_referral_App
```

### 2. Backend Setup
```bash
cd Backend
npm install
npm start
```

### 3. Frontend Setup
```bash
cd ../Frontend
npm install
npm run dev
```

### 4. API Endpoints
For all API details, see [API_DOCS.md](./API_DOCS.md).

## Assumptions & Limitations
- Resume files are stored locally (for cloud, integrate AWS S3 or similar)
- No email/SMS notifications
- No admin panel (basic dashboard only)

## Folder Structure
```
Candidate_referral_App/
  Backend/      # Node.js + Express API
  Frontend/     # React + Vite + MUI frontend
  README.md     # Project overview & setup
  API_DOCS.md   # API documentation
```

**Deployed Links:**
- Backend API: [https://candidate-referral-portal-9fyf.onrender.com](https://candidate-referral-portal-9fyf.onrender.com)
- Frontend App: [https://candidate-referral-portal-three.vercel.app/](https://candidate-referral-portal-three.vercel.app/)

---

If you have any questions or want to contribute, feel free to open an issue or PR. Happy coding!
