# 🚀 AI Dev Assistant

[![Live Demo](https://img.shields.io/badge/Vercel-Live-success?logo=vercel)](https://ai-dev-assistant-frontend.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)](#)
[![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)](#)
[![MongoDB](https://img.shields.io/badge/MongoDB-47A248?logo=mongodb\&logoColor=white)](#)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **"Helping developers spend less time writing and more time building."**

AI Dev Assistant is a full-stack AI-powered developer tool that helps developers rewrite text naturally and generate clean Conventional Commit messages using customizable tones and intelligent prompts.

---

## 🌐 Live Demo

* **Frontend:** https://ai-dev-assistant-frontend.vercel.app
* **Backend API:** https://ai-dev-assistant-two.vercel.app

---

## 📖 About

AI Dev Assistant is designed to streamline everyday developer workflows by providing fast, focused AI utilities instead of relying on generic chatbot interfaces.

The application currently offers two productivity tools:

* **AI Text Rephraser** for rewriting content in different tones.
* **AI Commit Generator** for producing standardized Conventional Commit messages.

Every authenticated user also gets a personal request history, allowing previous AI generations to be revisited without repeating prompts.

---

## ✨ Features

### ✍️ AI Text Rephraser

* Rewrite text naturally
* Humanize AI-generated content
* Custom writing tones
* Copy-ready output

### 🧠 Commit Message Generator

* Conventional Commit support
* Smart commit type detection
* Clean, production-ready messages
* Concise developer-focused output

### 📜 History

* Stores the last 10 AI requests
* Saves prompts and responses
* Tracks selected tone and generation type

### 🔐 Security

* JWT Authentication
* Protected API routes
* Rate limiting
* User-specific history

---

## 🏗 Architecture

The project follows a decoupled full-stack architecture.

```text
Frontend (Next.js)
        │
        ▼
Authentication (JWT)
        │
        ▼
 Express.js REST API
        │
 ┌──────┴────────┐
 │               │
 ▼               ▼
MongoDB      Groq API
(User Data)   (LLM)
```

The frontend communicates with an Express backend that handles authentication, request validation, AI orchestration, and persistent history storage. AI responses are generated using the Groq API and securely returned to authenticated users.

---

## 🛠 Technology Stack

| Category           | Technology                          |
| ------------------ | ----------------------------------- |
| **Frontend**       | Next.js, React, Tailwind CSS, Axios |
| **Backend**        | Node.js, Express.js                 |
| **Database**       | MongoDB (Mongoose)                  |
| **Authentication** | JSON Web Tokens (JWT)               |
| **AI Provider**    | Groq API                            |
| **Deployment**     | Vercel                              |

---

## 📂 Project Structure

```text
ai-dev-assistant/
│
├── ai-dev-assistant-backend/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   └── services/
│
├── ai-dev-assistant-frontend/
│   ├── app/
│   ├── components/
│   ├── hooks/
│   └── lib/
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

* Node.js 18+
* MongoDB
* Groq API Key

### Clone the repository

```bash
git clone https://github.com/rsayyed591/ai-dev-assistant.git

cd ai-dev-assistant
```

### Backend Setup

```bash
cd ai-dev-assistant-backend

npm install

cp .env.example .env

npm run dev
```

### Frontend Setup

```bash
cd ../ai-dev-assistant-frontend

npm install

npm run dev
```

---

## ⚙️ Environment Variables

### Backend

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

GROQ_API_KEY=your_groq_api_key
```

---

## 🔐 API Endpoints

### Authentication

| Method | Endpoint             |
| ------ | -------------------- |
| POST   | `/api/auth/register` |
| POST   | `/api/auth/login`    |

### AI

| Method | Endpoint        |
| ------ | --------------- |
| POST   | `/api/rephrase` |
| POST   | `/api/commit`   |

### User

| Method | Endpoint       |
| ------ | -------------- |
| GET    | `/api/profile` |
| GET    | `/api/history` |

---

## 💻 Example Requests

### Rephrase Text

```http
POST /api/rephrase
Authorization: Bearer <token>
```

```json
{
  "text": "fix this asap bro",
  "tone": "professional"
}
```

---

### Generate Commit

```http
POST /api/commit
Authorization: Bearer <token>
```

```json
{
  "context": "implemented login api and fixed token validation",
  "tone": "concise"
}
```

---

## 💡 Roadmap

* [ ] Google OAuth
* [ ] GitHub OAuth
* [ ] VS Code Extension
* [ ] Browser Extension
* [ ] Custom prompt presets
* [ ] Team workspaces
* [ ] Usage analytics
* [ ] Multi-language support

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository.
2. Create a feature branch.

```bash
git checkout -b feature/amazing-feature
```

3. Commit your changes.

```bash
git commit -m "feat: add amazing feature"
```

4. Push your branch.

```bash
git push origin feature/amazing-feature
```

5. Open a Pull Request.

---

## 👨‍💻 Author

**Rehan Sayyed**

* 🌐 Portfolio: https://iamrehan.dev
* GitHub: https://github.com/rsayyed591

---

## 📄 License

This project is licensed under the **MIT License**.

See the `LICENSE` file for more information.

---

<div align="center">

### ⭐ Like the project?

If AI Dev Assistant helps improve your workflow, consider giving the repository a **star**.

Built with ❤️ by **Rehan Sayyed**

</div>
