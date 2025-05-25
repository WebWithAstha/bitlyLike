# 🔗 Bitly Like – Link Analytics Dashboard

A full-stack web application that allows users to shorten long URLs and view detailed analytics such as click counts, devices, and more. Inspired by the core functionality of Bitly, this project is built from scratch with a unique UI and custom implementation to showcase full-stack development and micro-SaaS architecture.

---

## 🧩 Project Overview

This platform replicates the key functionality of modern URL shorteners while offering an original design and experience. Users can create short links, manage them, and track their performance via a feature-rich analytics dashboard.

---

## 🔐 Authentication

- JWT-based login system.
- Sample test credentials:

  ```
  Email: intern@dacoid.com  
  Password: Test123
  ```
- Each shortened link is associated with a user ID for multi-user support.

---

## 🔗 Short Link Creation

- Inputs:
  - Long URL
  - Custom alias (optional)
  - Expiration date (optional)
- Output:
  - A shortened URL like:  
    `https://yourdomain.com/x9kQ2A`

---

## 📊 Analytics Dashboard

- Table includes:
  - Original URL
  - Short URL
  - Total clicks
  - Created date
  - Expiration status
- Graphs:
  - Clicks over time (line/bar)
  - Device/Browser breakdown

---

## ⚙️ Async Redirection

- On link click:
  - Redirects to the original URL
  - Asynchronously logs analytics:
    - Timestamp
    - Device Type
    - IP Address
- Loading spinner is shown during fetch operations

---

## 🎁 Bonus Features (not ready yet but coming soon)

- [ ] QR Code Generator
- [ ] Pagination & Search in Dashboard

---

## 🛠️ Tech Stack

**Frontend:**  
React.js, Redux Toolkit, Recharts, TailwindCSS

**Backend:**  
Node.js, Express.js

**Database:**  
MongoDB

---

## 🚀 Live Demo

👉 [View Project Live](http://bitly-like-git-main-astha-lodhis-projects.vercel.app/)

---

## 📂 GitHub Repository

🔗 [GitHub Repo](https://github.com/WebWithAstha/bitlyLike.git)

---

## 📦 Getting Started

### 🔧 Setup Backend
```bash
cd backend
npm install
npm start
```

### 🌐 Setup Frontend
```bash
cd frontend
npm install
npm run dev
```

> ⚠️ Make sure your MongoDB server is running or use MongoDB Atlas.

---

## 🔑 Test Credentials

```
Email: intern@dacoid.com  
Password: Test123
```

---


## 🙌 Author

Made with ❤️ by [Astha Lodhi](https://github.com/WebWithAstha)
