

# ⚖️ LegalAI
> **Next-Gen Legal Assistance. Justice, Simplified.**

LegalAI is an intelligent legal assistant designed to simplify complex legal documents and provide instant answers to legal queries. Built with a modern "Ethereal" UI and powered by advanced LLMs (Groq/Llama 3), it empowers users to understand their legal standing with ease.
<img width="1873" height="879" alt="legalai-homepage" src="https://github.com/user-attachments/assets/e56473ab-bf25-41c5-a691-7a263e338593" />









---

## ✨ Features

### 📄 **Smart Document Analysis**
- Upload legal contracts or agreements as PDF files.
- Extract text automatically and analyze the latest document with one click.
- **Risk Detection**: Identifies potential legal risks with severity badges.
- Copy analysis summaries instantly to clipboard for sharing or review.
- **Bilingual Analysis**: Choose between **English** or **Hindi** output.
- https://github.com/user-attachments/assets/b9c90045-1cf9-48cf-b7ba-375d9db022e7

### 🧾 **Document Workflow & History**
- Dashboard shows uploaded PDF history, analysis status, and most recent upload date.
- Secure upload history is stored per user and refreshed in real time.
- Drag-and-drop PDF upload with progress feedback and file validation.

### 🤖 **Quick Legal Q&A**
- Ask legal questions directly from the Home page.
- Public AI chat endpoint for fast, plain-language legal guidance.
- Supports smart, contextual answers for common legal scenarios.
- https://github.com/user-attachments/assets/f116e11d-23a1-43d1-bdf9-b879865a8d2e

### 🎨 **Ethereal Modern UI**
- A polished, responsive interface with:
  - **Glassmorphism**: Translucent cards and panels.
  - **Mesh Gradients**: Dynamic, soft backgrounds.
  - **Micro-interactions**: Smooth button transitions and animated cards.

### 🔐 **Secure Authentication**
- User Signup and Login via JWT (JSON Web Tokens).
- Protected dashboard routes enforce session-based access.
- Ready for future OAuth / Google login integration.
- https://github.com/user-attachments/assets/0645c0e5-0fcc-446b-9b44-b1cb778b381e








---

## 🛠️ Tech Stack

- **Frontend**: React.js, React Router, CSS Modules (Glassmorphism design system).
- **Backend**: FastAPI (Python), Motor (MongoDB Async Driver).
- **AI Engine**: Groq API (Llama-3.1-8b-instant model).
- **Database**: MongoDB.
- **Tools**: `lucide-react` (Icons), `axios` (API requests).

---

## 🚀 Getting Started

> **Note**: This application is designed to be run **locally** on your computer. There is no deployed version.

### Prerequisites
- Node.js & npm
- Python 3.9+
- MongoDB (Running locally or Atlas URI)
- Groq API Key

### 1. Backend Setup
Navigate to the backend directory:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
pip install -r requirements.txt
```

Create a `.env` file in `backend/` with your credentials:
```ini
MONGO_URI=mongodb://localhost:27017
DB_NAME=ai_legal_sentinel
SECRET_KEY=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

Run the server:
```bash
uvicorn app.main:app --reload
```

### 2. Frontend Setup
Navigate to the frontend directory:
```bash
cd frontend
npm install
npm start
```
The app will open at `http://localhost:3000`.

---

## 📂 Project Structure

```
Legal_AI/
├── backend/            # FastAPI Server
│   ├── app/
│   │   ├── api/        # Routes (auth, ai, pdf)
│   │   ├── core/       # Config & Security
│   │   ├── models/     # Pydantic Schemas
│   │   ├── services/   # AI Logic (Groq, PDF extraction)
│   └── main.py         # Entry point
│
├── frontend/           # React Application
│   ├── src/
│   │   ├── components/ # Reusable UI (Layout, Navbar)
│   │   ├── pages/      # Views (Home, Dashboard, Analysis)
│   │   ├── styles/     # Global CSS & Variables
│   │   └── services/   # API integration
```

---

## 🛡️ License
This project is for educational purposes. Legal advice provided by AI should be verified by professional counsel.
