# Netflix Clone

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Netlify](https://img.shields.io/badge/Deployed%20on-Netlify-00C7B7?logo=netlify&logoColor=white)

A full-stack Netflix clone built with the **MERN** stack. It uses the
[TMDB API](https://www.themoviedb.org/) for movie/TV data, JWT cookie-based
authentication, search with history, trailers, and a responsive Netflix-style UI.

## 🔗 Live demo

**https://ministream-gg.netlify.app/**

> ℹ️ The live demo hosts the **frontend only**, so the UI is fully browsable but
> sign-up / login / movie data need the backend. Run the project locally (see
> [Run locally](#run-locally)) for the complete experience.

## Tech stack

| Layer    | Tech |
|----------|------|
| Frontend | React 18, Vite, Tailwind CSS, Zustand, React Router, Axios |
| Backend  | Node.js, Express, MongoDB (Mongoose), JWT, bcrypt |
| Data     | TMDB API |

## Features

- Sign up / log in / log out with JWT stored in an httpOnly cookie
- Browse trending movies & TV shows by category
- Watch trailers, see similar titles and details
- Search movies, TV shows and people (with search history)
- Protected API routes

## Project structure

```
.
├── backend/            # Express API (auth, movies, tv, search)
│   ├── config/         # db + env config
│   ├── controller/     # route handlers
│   ├── middleware/     # protectRoute (JWT auth)
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes (/api/v1/...)
│   └── server.js       # app entry point
├── frontend/           # React + Vite app (builds to frontend/dist)
├── netlify.toml        # Netlify config (frontend-only deploy)
├── .env.example        # template for required env vars
└── package.json        # backend scripts + the production build script
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18 or newer
- A free [MongoDB Atlas](https://www.mongodb.com/atlas) database (or local MongoDB)
- A free [TMDB API](https://www.themoviedb.org/settings/api) account

## Environment variables

Create a `.env` file in the **project root** (copy from `.env.example`):

| Variable       | Description |
|----------------|-------------|
| `MONGO_ID`     | MongoDB connection string |
| `PORT`         | Backend port (default `5000`) |
| `JWT_SECRET`   | Long random string used to sign auth tokens |
| `NODE_ENV`     | `development` or `production` |
| `TMDB_API_KEY` | TMDB **API Read Access Token** (v4 auth, sent as a Bearer token) |

> The `.env` file is git-ignored — never commit your real secrets.

## Run locally

### Option A — development (hot reload, two terminals)

The Vite dev server runs the UI on port **5173** and proxies `/api` requests
to the backend on port **5000** (see `frontend/vite.config.js`).

```bash
# 1. Backend (project root)
npm install
npm run dev          # starts Express with nodemon on http://localhost:5000

# 2. Frontend (in a second terminal)
cd frontend
npm install
npm run dev          # starts Vite on http://localhost:5173
```

Open **http://localhost:5173**.

### Option B — production mode (single server, one terminal)

This builds the frontend and lets Express serve both the API and the static
React build from one port.

```bash
# from the project root
npm run build        # installs deps + builds frontend/dist
npm start            # serves everything on http://localhost:5000
```

Open **http://localhost:5000** (make sure `NODE_ENV=production` in `.env`).

## Deploying to Netlify (frontend only)

This repo includes a `netlify.toml` that deploys **only the React frontend**.

1. Push this repo to GitHub.
2. On [Netlify](https://app.netlify.com/) → **Add new site → Import from Git**.
3. Pick this repo. The build settings come from `netlify.toml`:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `dist`
4. Deploy.

> ⚠️ **Important:** Netlify can only host static files — it does **not** run the
> Express server. So on the deployed Netlify site the UI will load and look
> correct, but **logging in and loading movies will not work** until you also
> host the backend (see below). To use the app fully, run it locally with the
> steps above.

## Making it fully work in production

Netlify hosts the frontend; the Express backend needs a Node host. Two ways:

**Easiest — host the whole app on one Node host (recommended).**
Because `npm run build` + `npm start` already serve the frontend and API
together, you can deploy the entire repo to [Render](https://render.com/),
[Railway](https://railway.app/) or [Fly.io](https://fly.io/):
- Build command: `npm run build`
- Start command: `npm start`
- Add the same env vars from `.env`, with `NODE_ENV=production`

**Keep the frontend on Netlify + backend elsewhere.**
1. Deploy the backend to Render/Railway → you get a URL like
   `https://your-backend.onrender.com`.
2. Make the Netlify frontend talk to it. Either:
   - **Proxy (simplest):** uncomment the `/api/*` redirect block in
     `netlify.toml` and point it at your backend URL. The frontend keeps using
     relative `/api` calls and cookies stay same-origin. **or**
   - **Direct:** set `axios.defaults.baseURL` from a `VITE_API_URL` env var,
     enable CORS on the backend with `credentials: true` and the Netlify origin,
     and set the auth cookie with `sameSite: "none"` and `secure: true` in
     production.
3. In Netlify → Site settings → Environment variables, add any `VITE_*` vars
   you introduced (Vite only exposes vars prefixed with `VITE_`).

## Troubleshooting

**Port 5000 already in use (Windows):**

```powershell
netstat -ano | findstr :5000      # find the PID using the port
taskkill /PID <pid> /F            # kill it
```

## Acknowledgements

- Movie & TV data provided by [The Movie Database (TMDB)](https://www.themoviedb.org/).
  This product uses the TMDB API but is not endorsed or certified by TMDB.
- Built by **Shreyansh Gupta**.
- Deployment configuration and documentation assisted by
  [Claude Code](https://claude.com/claude-code).

## License

Released under the terms of the [LICENSE](LICENSE) file in this repository.
