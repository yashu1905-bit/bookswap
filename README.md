# BookSwap

BookSwap is a responsive community book exchange application built with Next.js, Express, MongoDB/Mongoose, and Socket.io.

## Features

- Register, sign in/out, bcrypt password hashing, signed JWT in an HttpOnly cookie, and protected API endpoints
- Browse, search, filter, and sort available books; create, update, and remove your own listings
- Upload book cover images locally, with optional Cloudinary storage
- User profiles and public reader profiles
- Wishlist, exchange offers, pending/accepted/rejected/cancelled/completed states, exchange history, and notifications
- Persisted exchange chat with Socket.io and REST message history
- Post-exchange ratings and reviews
- Input validation, centralized API errors, CORS, Helmet, and authentication rate limiting

## Requirements

Node.js 20 or newer, npm, and a reachable MongoDB instance (local MongoDB Community Server or MongoDB Atlas).

## Run locally

1. In `backend/`, copy `.env.example` to `.env`. Set `MONGODB_URI` and replace `JWT_SECRET` with a long, random secret. Never commit `.env` files.
2. In `frontend/`, copy `.env.example` to `.env.local`.
3. Install dependencies in both apps:

   ```sh
   cd backend && npm install
   cd ../frontend && npm install
   ```

4. Start the API in one terminal and the web app in another:

   ```sh
   cd backend && npm run dev
   cd frontend && npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000). The API health check is [http://localhost:5000/api/health](http://localhost:5000/api/health).

The app starts empty; register an account and list books from at least two accounts to try a complete exchange. MongoDB must be reachable before the API starts. For Atlas, allow your development IP and URL-encode special characters in the database password.

## Free deployment (Render + MongoDB Atlas + Cloudinary)

The included `render.yaml` deploys the frontend and API together as one web service. Keeping them on the same origin lets the HttpOnly login cookie and Socket.io chat work without cross-site cookie settings. The free Render instance sleeps after 15 minutes without traffic and can take about a minute to wake. Its disk is temporary, so configure Cloudinary before relying on uploaded book covers.

1. Push this project to a GitHub repository. Do not push `.env` files, `node_modules`, or uploaded images.
2. Create a MongoDB Atlas Free cluster. Add a database user and allow network access from `0.0.0.0/0` so Render can connect, using a strong password. Copy the connection string and replace its database username/password and database name as needed.
3. Create a free Cloudinary account and copy its cloud name, API key, and API secret. These credentials are entered only in Render, never in source code.
4. In Render, choose **New → Blueprint**, connect the GitHub repository, and deploy the detected `render.yaml`. Enter the Atlas `MONGODB_URI` when prompted; Render generates the JWT secret.
5. In the Render service’s Environment settings, add `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, and `CLOUDINARY_API_SECRET`. Trigger a redeploy.
6. Open the `onrender.com` URL shown on the service. Check `/api/health`, create an account, list a book, and test a swap and chat.

Atlas Free clusters currently include 512 MB of storage, up to 10 GB incoming and 10 GB outgoing transfer per rolling seven days, and may pause after 30 days with no connections. Cloudinary Free has a monthly 25-credit allowance. Render Free is suitable for a portfolio/demo deployment, not a production service with uptime guarantees. See the current provider limits before launch.

For local development, `frontend/.env.local` may still point at `http://localhost:5000`; the deployed same-origin app defaults to its own `/api` and Socket.io endpoints when those variables are not set.

## Environment settings

`backend/.env.example` documents the API port, MongoDB URI, JWT secret and lifetime, frontend origin, secure-cookie toggle, upload directory/size limit, and optional Cloudinary credentials. `frontend/.env.example` contains the API and Socket.io base URLs. In production, use HTTPS and set `COOKIE_SECURE=true`.

## API overview

- `/api/auth`: register, login, logout, current user
- `/api/users`: own and public profiles
- `/api/books`: listing CRUD, search/filter, image upload
- `/api/exchanges`: create and manage exchange requests
- `/api/wishlist`: saved books
- `/api/notifications`: list and mark notifications read
- `/api/exchanges/:id/messages`: authorized chat history; live messages use Socket.io
- `/api/reviews`: post a review for a completed exchange

## Deployment notes

Use a unique high-entropy JWT secret, HTTPS, least-privilege MongoDB credentials, backups, and an exact `CLIENT_ORIGIN`. Local image storage is intended for development or a single persistent server; use Cloudinary or object storage for hosted deployments. Multi-instance deployments should use shared object storage and a Socket.io adapter such as Redis. Configure your hosting platform to support WebSockets and persistent environment variables. The exchange completion action is a community-confirmed status, not proof of physical delivery.

## Verification

Run `npm run typecheck` and `npm run build` in `frontend/`. Backend startup requires MongoDB; run `npm run dev` after configuring its environment. This project does not include seeded accounts or sample books.
