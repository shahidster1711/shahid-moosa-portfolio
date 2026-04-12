# shahid-moosa-portfolio
Exported from Caffeine project: Shahid Moosa Portfolio

## Deploying to Hostinger

The portfolio is a static React SPA built with Vite. It is automatically built and deployed to Hostinger via FTP on every push to `main`.

### One-time Setup: Add FTP Secrets to GitHub

Go to **GitHub → Settings → Secrets and variables → Actions → New repository secret** and add the following three secrets:

| Secret name    | Value                          |
|----------------|-------------------------------|
| `FTP_SERVER`   | `37.44.245.121`               |
| `FTP_USERNAME` | `u873719529.shahidster.tech`  |
| `FTP_PASSWORD` | _(your Hostinger FTP password)_ |

After adding the secrets, push to `main` and the workflow will build the frontend and upload the output to `public_html/` on Hostinger automatically.

### Manual Build & Deploy

If you prefer to upload manually:

```bash
cd src/frontend
pnpm install --prefer-offline
pnpm build
```

Then upload the entire contents of `src/frontend/dist/` (not the folder itself, but the files inside it) to `public_html/` on Hostinger via FTP or the File Manager.

> **Important:** The `dist/` folder already includes an `.htaccess` file that enables SPA routing on Hostinger's Apache server. Do **not** skip this file when uploading.

