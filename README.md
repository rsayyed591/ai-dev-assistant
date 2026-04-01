# 🚀 AI Dev Assistant

A full-stack AI-powered developer tool that helps you **rewrite text naturally** and **generate clean Git commit messages** using customizable tone and intelligent prompts.

Built with a modern stack and designed for real-world usage.

---

## ✨ Features

* ✍️ **Text Rephraser**

  * Humanizes and rewrites text
  * Supports custom tone (professional, casual, friendly, etc.)
  * Clean, copy-ready output

* 🧠 **Commit Message Generator**

  * Generates Conventional Commit messages
  * Smart type detection (feat, fix, refactor, etc.)
  * Concise and production-ready output

* 🔐 **Authentication**

  * JWT-based login/register system
  * Protected routes for all AI features

* 📜 **History Tracking**

  * Stores last 10 requests per user
  * Includes input, output, tone, and type

* ⚡ **Rate Limiting**

  * Prevents abuse
  * Applied per user/IP

---

## 🏗️ Project Structure

```
ai-dev-assistant/
│
├── ai-dev-assistant-backend/   # Express + MongoDB API
│
├── ai-dev-assistant-frontend/  # React frontend (Vercel deployed)
│
└── README.md
```

---

## 🛠️ Tech Stack

### Frontend

* React
* Tailwind CSS
* Axios

### Backend

* Node.js
* Express.js
* MongoDB (Mongoose)
* JWT Authentication
* Groq API (LLM)

---

## 🌐 Live Demo

* Frontend: https://ai-dev-assistant-frontend.vercel.app
* Backend: https://ai-dev-assistant-two.vercel.app

---

## ⚙️ Environment Variables

### Backend (`.env`)

```
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret_key
GROQ_API_KEY=your_groq_api_key
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```
git clone https://github.com/your-username/ai-dev-assistant.git
cd ai-dev-assistant
```

---

### 2️⃣ Setup Backend

```
cd ai-dev-assistant-backend
npm install
npm run dev
```

---

### 3️⃣ Setup Frontend

```
cd ai-dev-assistant-frontend
npm install
npm run dev
```

---

## 🔐 API Endpoints

### Auth

* `POST /api/auth/register`
* `POST /api/auth/login`

### AI Features

* `POST /api/rephrase`
* `POST /api/commit`

### User

* `GET /api/profile`
* `GET /api/history`

---

## 🧪 Example Request

### Rephrase

```
POST /api/rephrase
Authorization: Bearer <token>
```

```json
{
  "text": "fix this asap bro",
  "tone": "polite and professional"
}
```

---

### Commit

```
POST /api/commit
Authorization: Bearer <token>
```

```json
{
  "context": "added login api and fixed token bug",
  "tone": "concise"
}
```

---

## 💡 Future Improvements

* Google OAuth login
* Tone presets & user preferences
* VS Code extension
* Usage analytics dashboard
* Multi-language support

---

## 👨‍💻 Author

**Rehan Sayyed**

---

## ⭐ Contributing

Feel free to fork the repo and submit pull requests.

---

## 📄 License

This project is open-source and available under the MIT License.
