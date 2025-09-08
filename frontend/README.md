# Chatty

A full-stack, real-time chat application with modern features, built using React, Node.js, Express, MongoDB, and Socket.io.

---

## Features

- **User Authentication**: Signup, login, and email verification with OTP.
- **Real-Time Messaging**: Instant chat using Socket.io.
- **Typing Indicators**: See when others are typing.
- **Media Support**: Send audio, documents, GIFs, and emojis.
- **Profile Management**: Update user info and password.
- **Responsive UI**: Works on both desktop and mobile.
- **Dark Mode**: Toggle between light and dark themes.

---

## Tech Stack

- **Frontend**: React, Redux, Tailwind CSS, Vite
- **Backend**: Node.js, Express, Socket.io
- **Database**: MongoDB (via Mongoose), supabase (for media storage)
- **Authentication**: JWT, bcrypt
- **Other**: Nodemailer (for OTP), Supabase (for media storage), Giphy API (GIFs), Emoji Mart

---

## Folder Structure

```
frontend/
  ├── public/
  ├── src/
  │   ├── assets/
  │   ├── components/
  │   ├── hooks/
  │   ├── images/
  │   ├── layout/
  │   ├── pages/
  │   ├── redux/
  │   ├── section/
  │   ├── socket/
  │   └── utils/
  ├── .env
  ├── package.json
  └── ...
```

---

## Getting Started

### Prerequisites

- Node.js (v18 or v20 recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/chatty.git
   cd chatty
   ```

2. **Install frontend dependencies:**
   ```bash
   cd frontend
   npm install
   ```

3. **Install backend dependencies:**
   ```bash
   cd ../backend
   npm install
   ```

4. **Set up environment variables:**
   - Copy `.env.example` to `.env` in both `frontend` and `backend` folders and fill in the required values.

5. **Start the backend server:**
   ```bash
   npm start
   ```

6. **Start the frontend dev server:**
   ```bash
   cd ../frontend
   npm run dev
   ```

---

## Environment Variables

- **Frontend**:  
  Configure API endpoints and third-party keys in `frontend/.env`.

- **Backend**:  
  Set up MongoDB URI, JWT secret, and email credentials in `backend/.env`.

---

## Scripts

- `npm run dev` — Start frontend in development mode
- `npm run build` — Build frontend for production
- `npm run lint` — Lint frontend code

---

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

---


## Acknowledgements

- [React](https://react.dev/)
- [Node.js](https://nodejs.org/)
- [Socket.io](https://socket.io/)
- [MongoDB](https://mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Giphy API](https://developers.giphy.com/docs/)