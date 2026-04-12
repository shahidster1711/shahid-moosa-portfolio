# Shahid Moosa — Portfolio

A personal portfolio website for **Shahid Moosa**, a distributed systems engineer. Built with a Techno-Brutalist dark aesthetic — electric cyan accents, ambient glow effects, and immersive 3D elements — the site is designed to balance technical credibility with memorable visual presence.

---

## Table of Contents

- [About](#about)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Deploying to Hostinger](#deploying-to-hostinger)
- [License](#license)

---

## About

This portfolio showcases Shahid Moosa's work, skills, and background as a distributed systems engineer. The design language — sharp minimalism on near-black backgrounds with carefully placed cyan glow and warm amber terminal accents — creates a "hacker's workbench" aesthetic that feels both professional and distinctive.

🌐 **Live site:** [shahidmoosa.com](https://shahidmoosa.com) *(update this link once deployed)*

---

## Tech Stack

| Layer      | Technology                                  |
|------------|---------------------------------------------|
| UI         | [React 19](https://react.dev/)              |
| Build tool | [Vite 5](https://vitejs.dev/)               |
| Language   | [TypeScript](https://www.typescriptlang.org/) |
| Styling    | [Tailwind CSS](https://tailwindcss.com/)    |
| 3D / WebGL | [Three.js](https://threejs.org/) + [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber/) |
| Animation  | [Motion](https://motion.dev/)               |
| UI primitives | [Radix UI](https://www.radix-ui.com/)    |
| State      | [Zustand](https://zustand-demo.pmnd.rs/)    |
| Linter     | [Biome](https://biomejs.dev/)               |
| Package manager | [pnpm](https://pnpm.io/)              |
| CI/CD      | [GitHub Actions](https://docs.github.com/en/actions) |
| Hosting    | [Hostinger](https://www.hostinger.com/) (Apache, FTPS) |

---

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v20 or later
- [pnpm](https://pnpm.io/installation) v9 or later

```bash
# Install pnpm if you don't have it
npm install -g pnpm@9
```

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/shahidster1711/shahid-moosa-portfolio.git
cd shahid-moosa-portfolio

# 2. Install frontend dependencies
cd src/frontend
pnpm install --prefer-offline
```

### Run locally

```bash
# From src/frontend/
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser. The dev server supports Hot Module Replacement (HMR), so changes are reflected instantly.

### Type-check

```bash
pnpm typecheck
```

### Lint & format

```bash
# Check for issues
pnpm check

# Auto-fix issues
pnpm fix
```

---

## Deploying to Hostinger

The portfolio is a static React SPA built with Vite. It is automatically built and deployed to Hostinger via FTPS on every push to `main` using the workflow defined in [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

### One-time Setup: Add FTP Secrets to GitHub

Go to **GitHub → Settings → Secrets and variables → Actions → New repository secret** and add the following three secrets:

| Secret name    | Where to find it                                                      |
|----------------|-----------------------------------------------------------------------|
| `FTP_SERVER`   | Hostinger control panel → **Hosting → FTP Accounts** (hostname field) |
| `FTP_USERNAME` | Same FTP Accounts panel (username field)                              |
| `FTP_PASSWORD` | The password you set when creating the FTP account                    |

After adding the secrets, push any commit to `main`. The workflow will:
1. Check out the code
2. Install Node 20 and pnpm 9
3. Run `pnpm build` inside `src/frontend/`
4. Upload the contents of `src/frontend/dist/` to `public_html/` via FTPS

### Manual Build & Deploy

If you prefer to upload manually:

```bash
cd src/frontend
pnpm install --prefer-offline
pnpm build
```

Upload the entire **contents** of `src/frontend/dist/` (not the folder itself) to `public_html/` on Hostinger via FTP or the File Manager.

> **Important:** The `dist/` folder includes an `.htaccess` file that enables SPA routing on Hostinger's Apache server. Do **not** skip this file — without it, refreshing any route other than `/` will return a 404.

### Troubleshooting

| Problem | Likely cause | Fix |
|---------|-------------|-----|
| Workflow fails with "Login incorrect" | Wrong FTP credentials in secrets | Double-check `FTP_USERNAME` and `FTP_PASSWORD` in GitHub secrets |
| Workflow fails with "Connection refused" or "ENOTFOUND" | Wrong hostname or port | Verify `FTP_SERVER` value; the workflow uses FTPS on port 21. Confirm the hostname in Hostinger's FTP Accounts panel |
| Site shows old content after deploy | Browser cache | Hard-refresh (`Ctrl+Shift+R`) or clear cache |
| Routes other than `/` return 404 | Missing `.htaccess` | Ensure the `.htaccess` file was uploaded to `public_html/` |
| Site root (`/`) returns 403 Forbidden | Apache/LiteSpeed has directory listing disabled and no directory index set | Ensure the `.htaccess` file in `public_html/` contains `DirectoryIndex index.html` at the top |

---

## License

This project is for personal portfolio use. All rights reserved © Shahid Moosa.

