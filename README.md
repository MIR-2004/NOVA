# Nova - Online Image Editing Tool

## Overview
Nova is a modern, browser-based image editor. Create and manage projects, upload assets, and edit with powerful tools like crop, resize, text, adjustments, and AI-assisted features — all from your browser.

> Try the app — [Go to website](https://nova-eta-three.vercel.app/)

## Features
- **Authentication**: Secure sign-in/sign-up powered by Clerk. Protected routes for `/dashboard` and `/editor`.
- **Projects**: Create, view, update, and delete projects. Project limits and usage tracked per plan.
- **Editor Tools**: Crop, resize, text, adjustments, background removal (AI), and more with a `fabric`-powered canvas.
- **Asset Uploads**: Image uploads to ImageKit with automatic thumbnail generation.
- **Realtime Data**: Convex for realtime storage of users, projects, and usage.
- **Responsive UI**: Next.js App Router with TailwindCSS v4 and shadcn/ui components.

## Tech Stack
### App
- **Next.js 15 (App Router)**
- **React 19**
- **TailwindCSS 4**
- **shadcn/ui (Radix primitives)**

### Auth & Data
- **Clerk** for authentication and route protection
- **Convex** for realtime database and serverless functions

### Media
- **ImageKit** for image storage, CDN, and transformations

## Project Structure
- `app/` — Next.js App Router pages and UI, including `dashboard` and `editor`
- `convex/` — Convex schema and functions (`users.js`, `projects.js`)
- `app/api/imagekit/upload/route.js` — Server route for authenticated ImageKit uploads
- `middleware.js` — Protects `/dashboard` and `/editor` via Clerk

## Environment Variables
Create a `.env.local` in the project root with the following keys:

```env
# Next.js
NEXT_PUBLIC_APP_URL=http://localhost:3000

# Clerk (Auth)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_...
CLERK_SECRET_KEY=sk_...

# Clerk issuer for Convex auth config
# Use the issuer domain from your Clerk JWT template for "convex"
VITE_CLERK_ISSUER_DOMAIN=https://<your-clerk-issuer-domain>

# Convex
NEXT_PUBLIC_CONVEX_URL=https://<your-convex-deployment>.convex.cloud

# ImageKit
NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY=public_...
IMAGEKIT_PRIVATE_KEY=private_...
NEXT_PUBLIC_IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/<your_imagekit_id>
```

Notes:
- `convex/auth.config.js` reads `VITE_CLERK_ISSUER_DOMAIN` for JWT verification.
- The Next.js client uses `NEXT_PUBLIC_CONVEX_URL` in `app/ConvexClientProvider.jsx`.
- The ImageKit upload route requires all three ImageKit variables and an authenticated Clerk user.

## Getting Started
1. Install dependencies:
   ```bash
   npm install
   ```
2. Configure `.env.local` as above.
3. Initialize and deploy Convex (first-time setup):
   ```bash
   npx convex dev
   # or: npx convex deploy
   ```
   Copy your Convex deployment URL into `NEXT_PUBLIC_CONVEX_URL`.
4. Run the app:
   ```bash
   npm run dev
   ```
5. Open `http://localhost:3000`.

## Usage
1. Sign in with Clerk.
2. Go to `Dashboard` to create a new project and upload an image (uploads via ImageKit).
3. Open a project in the `Editor` to use tools (crop, resize, text, AI helpers).
4. Changes persist via Convex; thumbnails are generated via ImageKit transformations.

## Scripts
- `npm run dev` — Start Next.js with Turbopack
- `npm run build` — Build for production
- `npm run start` — Start production server
- `npm run lint` — Run ESLint

## Contact
- **Email**: mir.saif.ali2004@gmail.com
