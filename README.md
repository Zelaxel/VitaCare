# 🩺 VitaCare - Medical Appointment Management System

**VitaCare** is a modern healthcare platform designed for medical appointment scheduling. The system allows patients to book appointments by medical departments and specialists, with automated HTML email confirmations.

---

## 🛠️ Tech Stack

### Backend
*   **Python:** Managed via **uv** for quick dependency management.
*   **FastAPI:** Synchronous web framework.
*   **SQLModel & Pydantic:** Local database.
*   **FastAPI-Mail / SMTPlib:** Secure backend mail engine for dispatching notifications.
*   **Calendar Sync:** Powered by **Cronofy** to add appointments directly into doctors' and patients' real-world calendars (Google, Outlook, Apple Calendar).

### Frontend
*   **Angular:** Component-based framework for a responsive Single Page Application.

---

## 📦 Installation & Setup

### Prerequisites
Before running the application, ensure you have the following installed:
*   **Frontend Environment:**
    *   [Node.js](https://nodejs.org/) `v22.22.x`
    *   [Angular CLI](https://angular.dev/) `v21.2.x`
    *   [npm](https://www.npmjs.com/) `v11.11.x`
*   **Backend Environment:**
    *   [uv](https://github.com/astral-sh/uv) `>= 0.10.9`

Also create a `.env` file in the `backend/` directory, copy the following structure and fill in your credentials:
*  mail
*  password
*  CRONOFY_CLIENT_ID
*  CRONOFY_CLIENT_SECRET
*  CRONOFY_REDIRECT_URI

### Setup
```bash
# Install dependencies to gestion the backend and frontend.
npm install

# Install The depependencies for the backend and frontend.
npm run sync

# Set up the backend and frontend.
npm run dev
```

---

## 🚀 Try the service
Once the aplication is up and running, you can access the service through your browser: [http://localhost:4200](http://localhost:4200)
