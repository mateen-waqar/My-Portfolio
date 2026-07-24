# 🚀 My Portfolio

> Personal developer portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS** — showcasing my projects, skills, and experience as a software engineer.

**🔗 Live Site:** [mateenwaqar-portfolio.vercel.app](https://mateenwaqar-portfolio.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)

---

## 📖 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Getting Started](#-getting-started)
- [Project Structure](#-project-structure)
- [Environment Variables](#-environment-variables)
- [Available Scripts](#-available-scripts)
- [Deployment](#-deployment)
- [Contact](#-contact)

---

## 📌 About

This repository contains the source code for my personal portfolio website — a single place to showcase who I am, what I build, and how to get in touch. It's built to be fast, responsive, and easy to maintain, using a modern Next.js + TypeScript + Tailwind stack.

## ✨ Features

- ⚡ Built with **Next.js App Router** for fast, optimized rendering
- 🎨 Styled with **Tailwind CSS** and **shadcn/ui** components
- 📱 Fully responsive across mobile, tablet, and desktop
- 🧩 Modular, reusable component architecture
- 🔍 SEO-friendly with optimized metadata
- ✅ Linted and formatted with **ESLint** + **Prettier** for consistent code quality
- 🚀 Deployed on **Vercel** with continuous deployment from `main`

## 🛠️ Tech Stack

| Category | Technology |
|---|---|
| Framework | [Next.js](https://nextjs.org) |
| Language | [TypeScript](https://www.typescriptlang.org) |
| Styling | [Tailwind CSS](https://tailwindcss.com) |
| UI Components | [shadcn/ui](https://ui.shadcn.com) |
| Linting/Formatting | ESLint, Prettier |
| Deployment | [Vercel](https://vercel.com) |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18 or later recommended)
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/mateen-waqar/My-Portfolio.git

# Move into the project directory
cd My-Portfolio

# Install dependencies
npm install
```

### Run Locally

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the result.

## 📂 Project Structure

```
My-Portfolio/
├── public/              # Static assets (images, icons, etc.)
├── src/                 # Application source code
│   ├── app/             # App Router pages and layouts
│   ├── components/      # Reusable UI components
│   └── ...
├── .env.example         # Sample environment variables
├── components.json      # shadcn/ui configuration
├── tailwind.config.ts   # Tailwind CSS configuration
├── next.config.ts       # Next.js configuration
└── PRODUCTION_READINESS.md  # Pre-deployment checklist
```

## 🔐 Environment Variables

Copy `.env.example` to `.env.local` and fill in the required values before running the project:

```bash
cp .env.example .env.local
```

> See `.env.example` for the full list of variables required (e.g. API keys, contact form service credentials).

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the app in development mode |
| `npm run build` | Builds the app for production |
| `npm run start` | Runs the built app in production mode |
| `npm run lint` | Lints the codebase with ESLint |

## ☁️ Deployment

This project is deployed on [Vercel](https://vercel.com), the platform built by the creators of Next.js. Every push to `main` triggers an automatic deployment.

To deploy your own copy:

1. Push your code to a GitHub repository
2. Import the repository on [Vercel](https://vercel.com/new)
3. Add the required environment variables (see `.env.example`)
4. Deploy 🚀

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📬 Contact

**Mateen Waqar**

- 🌐 Portfolio: [mateenwaqar-portfolio.vercel.app](https://mateenwaqar-portfolio.vercel.app)
- 💻 GitHub: [@mateen-waqar](https://github.com/mateen-waqar)

---

<p align="center">Made with ❤️ by Mateen Waqar</p>