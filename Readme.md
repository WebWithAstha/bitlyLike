# 🔗 Bitly Like – Link Analytics Dashboard

A full-stack mini Bitly clone built as part of an SDE assignment. This app allows users to shorten long URLs and view detailed analytics including click counts, devices, and more.

---

## 🧪 Assignment: Micro-SaaS – Link Analytics Dashboard

### 🧩 Project Brief
Build a full-stack URL shortener and analytics dashboard. Users can create shortened links and track their performance — including clicks, locations, and devices.

---

## 🔐 Authentication

- JWT-based login using a hardcoded user.
- Credentials to test:
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

## ✅ Evaluation Criteria

- [x] URL shortening & redirection
- [x] Click & device tracking
- [x] JWT-based authentication
- [x] Responsive and clean UI
- [x] Async operations for analytics logging
- [x] Deployment & documentation

---

## 🙌 Author

Made with ❤️ by [Astha Lodhi](https://github.com/WebWithAstha)
