# 💼 ResMatch - Resume to Job Match Analyzer

ResMatch is a web application that helps job seekers evaluate how well their resume aligns with a specific job description. It uses intelligent keyword analysis to highlight missing terms, skills, and concepts—empowering applicants to improve their chances of landing interviews.

---

## ✨ Features

- 🔍 Upload your resume (`.txt` format only)
- 📋 Paste any job description
- 📊 Receive an analysis highlighting missing keywords or mismatches
- ⚡ Smooth UI/UX with animations and responsiveness
- 🔐 Secure local backend integrated with OpenAI API

---

## 🛠️ Tech Stack

| Frontend       | Backend        | Other Tools        |
|----------------|----------------|--------------------|
| React          | Node.js + Express | OpenAI API        |
| HTML/CSS       | dotenv         | FileReader API     |
| CSS Animations |                |                    |

---

## 📁 Project Structure

resmatch/
├── resmatch-backend/ # Node + Express server with API logic
├── .gitignore
└── README.md

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/resmatch.git
cd resmatch

### 2. Set up Backend
cd resmatch-backend
npm install

Create a .env file inside resmatch-backend/
OPENAI_API_KEY=your_openai_api_key_here

Start the backend server:
node server.js

### 3. Set up Frontend
cd ..
npm install
npm start


