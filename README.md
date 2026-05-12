# 🏕️ WanderLust — Airbnb-Inspired Rental Platform

WanderLust is a full-stack web application inspired by Airbnb, where users can browse, create, and manage property listings. It includes user authentication, listing management, reviews, and form validation.

---

## 🚀 Features

- 🔐 User Authentication (Register / Login / Logout) using Passport.js
- 🏠 Create, Read, Update, Delete (CRUD) property listings
- ⭐ Leave and delete reviews on listings
- ✅ Server-side form validation using Joi
- 🔒 Authorization — only owners can edit/delete their listings
- 💬 Flash messages for user feedback
- 📱 Responsive UI built with EJS templates and EJS-Mate layouts

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Backend | Node.js, Express.js |
| Database | MongoDB, Mongoose |
| Templating | EJS, EJS-Mate |
| Authentication | Passport.js, passport-local, passport-local-mongoose |
| Validation | Joi |
| Styling | CSS |
| Other | Method-Override, Connect-Flash, Express-Session, Cookie-Parser |

---

## 📁 Project Structure

```
WanderLust/
├── classroom/        # Practice/reference files
├── init/             # Database seed/init scripts
├── models/           # Mongoose models (User, Listing, Review)
├── public/           # Static assets (CSS, JS, images)
├── routes/           # Express route handlers
├── utils/            # Utility functions (error handling, etc.)
├── views/            # EJS templates and layouts
├── app.js            # Express app configuration
├── index.js          # Server entry point
├── middleware.js     # Custom middleware (auth checks, etc.)
├── schema.js         # Joi validation schemas
└── package.json
```

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) installed
- [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/abdullah2161008/WanderLust-AirBnb-renting-website-.git
cd WanderLust-AirBnb-renting-website-
```

2. **Install dependencies**

```bash
npm install
```

3. **Set up environment variables**

Create a `.env` file in the root directory and add:

```env
MONGO_URL=your_mongodb_connection_string
SESSION_SECRET=your_secret_key
```

4. **Seed the database (optional)**

```bash
node init/index.js
```

5. **Start the server**

```bash
node index.js
```

6. **Open in browser**

```
http://localhost:3000
```

---

## 📦 Dependencies

```json
"connect-flash": "^0.1.1",
"cookie-parser": "^1.4.7",
"ejs": "^3.1.10",
"ejs-mate": "^4.0.0",
"express": "^5.1.0",
"express-session": "^1.18.2",
"joi": "^18.0.1",
"method-override": "^3.0.0",
"mongoose": "^8.18.0",
"passport": "^0.7.0",
"passport-local": "^1.0.0",
"passport-local-mongoose": "^8.0.0"
```

---

## 👤 Author

**Abdullah Khan**
- GitHub: [@abdullah2161008](https://github.com/abdullah2161008)

---

## 📄 License

This project is licensed under the **ISC License**.
