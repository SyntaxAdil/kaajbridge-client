<div align="center">

# 🌉 KaajBridge

### A modern job portal built for Diploma Engineers in Bangladesh

Bridging verified talent with real opportunity — fast-track hiring, curated job portfolios, and a role-based platform for seekers, recruiters, and admins.

[![Live Site](https://img.shields.io/badge/Live-kaajbridge.vercel.app-6366f1?style=for-the-badge&logo=vercel&logoColor=white)](https://kaajbridge.vercel.app)
[![Client Repo](https://img.shields.io/badge/Frontend-Next.js%2016-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://github.com/SyntaxAdil/kaajbridge-client)
[![Server Repo](https://img.shields.io/badge/Backend-Express.js-303030?style=for-the-badge&logo=express&logoColor=white)](https://github.com/SyntaxAdil/kaajbridge-server)

![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat-square&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)
![Bun](https://img.shields.io/badge/Bun-000000?style=flat-square&logo=bun&logoColor=white)
![Better Auth](https://img.shields.io/badge/Auth-better--auth-8b5cf6?style=flat-square)
![License](https://img.shields.io/badge/license-Unlicensed-lightgrey?style=flat-square)

</div>

---

## 📚 Table of Contents

- [Overview](#-overview)
- [Repositories](#-repositories)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Roles & Access Control](#-roles--access-control)
- [Architecture Notes](#-architecture-notes)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [SEO](#-seo)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧭 Overview

KaajBridge solves a real gap: **Diploma Engineering graduates in Bangladesh are underserved by mainstream job portals**, which skew toward 4-year degree holders. KaajBridge gives them a dedicated space — verified companies, fast-track hiring pipelines, and a UI built to feel modern and trustworthy rather than generic.

The platform is split into two repositories, deployed independently.

## 🔗 Repositories

| Repo | Description | Stack |
|---|---|---|
| [`kaajbridge-client`](https://github.com/SyntaxAdil/kaajbridge-client) | Frontend web app | Next.js 16, Tailwind, better-auth |
| [`kaajbridge-server`](https://github.com/SyntaxAdil/kaajbridge-server) | REST API | Express.js, MongoDB |

---

## ✨ Features

<table>
<tr>
<td width="50%" valign="top">

**For Job Seekers**
- 🔍 Search & filter jobs by skill, type, experience, location
- 💾 Save jobs for later
- 🏢 Browse verified company profiles
- 📝 Apply directly through the platform

</td>
<td width="50%" valign="top">

**For Recruiters**
- 📋 Post, edit, and delete job listings
- 🏢 Manage company profile & branding
- 📊 View hiring analytics
- ✅ Get verified status on the platform

</td>
</tr>
<tr>
<td width="50%" valign="top">

**For Admins**
- 🛡️ Platform-wide moderation
- 👥 Manage users, jobs, and companies
- 📈 Global analytics overview

</td>
<td width="50%" valign="top">

**Platform-wide**
- 🔐 Email/password + Google OAuth login
- ✉️ Transactional email via Resend
- 🌓 Dark mode by default
- 🌐 Full SEO: sitemap, robots.txt, OG metadata

</td>
</tr>
</table>

---

## 🧱 Tech Stack

<div align="center">

| Layer | Technology |
|---|---|
| **Framework** | Next.js 16 (App Router · Turbopack) |
| **Styling** | Tailwind CSS · shadcn/ui · Lucide Icons |
| **Animation** | Motion |
| **Auth** | better-auth (MongoDB adapter · JWT sessions) |
| **Backend API** | Express.js |
| **Database** | MongoDB |
| **Email** | Resend |
| **Hosting** | Vercel |
| **Package Manager** | Bun |

</div>

---

## 🔐 Roles & Access Control

```
seeker     →  browse, save, apply
recruiter  →  post jobs, manage company, view analytics
admin      →  full platform moderation
```

| Route | Access |
|---|---|
| `/jobs`, `/companies` | Public |
| `/dashboard/**` | Authenticated |
| `/my-jobs/**`, `/my-companies/**` | Recruiter / Admin |
| `/saved/**` | Seeker |
| `/dashboard/admin/**` | Admin only |

Enforced centrally in `src/proxy.js` (Next.js 16's replacement for `middleware.ts`), which checks session + role before allowing access.

---

## ⚙️ Architecture Notes

<details>
<summary><strong>🔒 Server / Client boundary (click to expand)</strong></summary>

<br>

`api-client.js` and `auth.js` depend on Node-only APIs (`next/headers`, the MongoDB driver) and must **never** be imported into a Client Component — directly or transitively — or the production build breaks trying to bundle `fs`/`net`/`tls`/`dns` for the browser.

Two clean data-flow patterns are used instead:

1. **Initial page data** → fetched in Server Components (`page.jsx`) → passed down as props (`FeaturedJobs`, `FeaturedCompanies`, `Banner`)
2. **User-triggered actions** (create/update/delete/save) → routed through Next.js Route Handlers under `src/app/api/**`, which call the server-only `apiRequest` helper. Client Components call these via plain `fetch()`, never the service layer directly.

</details>

<details>
<summary><strong>🛰️ Proxy (formerly Middleware)</strong></summary>

<br>

As of Next.js 16, `middleware.ts` is renamed to `proxy.ts`/`proxy.js` and runs on the **Node.js runtime** by default (previously Edge). This means `auth.api.getSession()`, backed by MongoDB, can safely run directly inside the proxy layer — no Edge/Node conflict.

</details>

---

## 📁 Project Structure

```
kaajbridge-client/
├── src/
│   ├── app/
│   │   ├── (main)/page.jsx     # Home — Server Component, fetches initial data
│   │   ├── api/                # Route Handlers (proxy to Express API)
│   │   ├── layout.js           # Root layout + SEO metadata
│   │   ├── robots.js           # Dynamic robots.txt
│   │   └── sitemap.js          # Dynamic sitemap.xml
│   ├── components/ui/          # Shared UI primitives
│   ├── lib/auth/auth.js        # Server-only better-auth instance
│   ├── pages/                  # Feature components
│   ├── section/                # Page sections (Banner, etc.)
│   ├── services/               # API service layer (server-only)
│   └── proxy.js                # Route protection & role-based redirects
└── public/                     # Static assets

kaajbridge-server/
└── (Express REST API — see kaajbridge-server repo)
```

---

## 🚀 Getting Started

### Prerequisites
- [Bun](https://bun.sh/)
- MongoDB instance (local or Atlas)
- Google OAuth credentials
- Resend API key

### Clone both repos

```bash
git clone https://github.com/SyntaxAdil/kaajbridge-client.git
git clone https://github.com/SyntaxAdil/kaajbridge-server.git
```

### Frontend setup

```bash
cd kaajbridge-client
bun install
```

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_SITE_URL=https://kaajbridge.vercel.app
MONGODB_URI=your_mongodb_connection_string
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
RESEND_API_KEY=your_resend_api_key
```

```bash
bun run dev
```

Visit **[http://localhost:3000](http://localhost:3000)**

### Backend setup

```bash
cd kaajbridge-server
bun install
bun run dev
```

### Production build

```bash
bun run build
bun run start
```

---

## 🌐 SEO

- ✅ Dynamic `robots.js` — disallows authenticated routes
- ✅ Dynamic `sitemap.js` — includes live job & company listings
- ✅ Full Open Graph + Twitter Card metadata
- ✅ Google Search Console verification support

---

## 🤝 Contributing

Contributions are welcome. Please open an issue to discuss significant changes before submitting a pull request.

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Open a pull request

---

## 📄 License

This project is currently **unlicensed / private**. Update this section once a license is chosen.

---

<div align="center">

Built with ❤️ for Diploma Engineers in Bangladesh.

</div>