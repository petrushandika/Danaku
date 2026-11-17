# Danaku

Personal finance web app for tracking spending, planning monthly budgets, and keeping an overview of assets. Built by [Petrus Handika](https://github.com/petrushandika).

**[Screenshots & case study](https://petrushandika.com/danaku/)** · **[Ask a question](https://github.com/petrushandika/Danaku/discussions)** · **[Report a bug](https://github.com/petrushandika/Danaku/issues)**

![Danaku public features page](documentation/images/features-preview.webp)

*Public marketing-page capture from a local instance, previously published in the portfolio. Not an authenticated financial dashboard, evidence of customer adoption, or verification of every advertised feature.*

## What is in the repository?

- **Setup:** account, income-source and spending-category configuration.
- **Budgeting:** monthly allocations and budget summaries.
- **Spending:** transaction entry, editing and deletion.
- **Reports and assets:** reporting views and asset tracking.
- **Accounts:** registration, email verification, login and profile pages.

These areas are present in the source; this README is not an end-to-end test report. The repository also includes AI, subscription/payment, media upload and social-login integrations that need their own provider configuration. Do not assume a fresh checkout supports them without setup.

## Preview and status

The linked portfolio case study contains real local captures and contribution notes. It is **not a live demo** of the signed-in application.

The previously advertised `https://danaku.site` failed TLS hostname validation during this documentation update. Until that is resolved, use the case study for a preview rather than entering personal or financial information on that domain.

## Stack

| Layer | Implementation |
| --- | --- |
| Frontend | Next.js, React, TypeScript, Tailwind CSS, TanStack Query |
| Backend | NestJS, TypeScript, Prisma |
| Database | PostgreSQL |
| Charts and forms | Recharts, React Hook Form, Zod |

```text
frontend/       Next.js application
backend/        NestJS API and Prisma schema
documentation/  Product, setup and technical reference documents
```

## Local setup

Use a supported Node.js LTS release compatible with the package manifests (Node 22.12+ is a reasonable starting point), npm and a **dedicated local PostgreSQL database**. This sequence is checked against the source scripts and environment templates, but a fresh full-stack installation has not been exercised for this README update.

```bash
git clone https://github.com/petrushandika/Danaku.git
cd Danaku
```

### 1. Configure the backend

```bash
cd backend
cp .env.example .env
npm ci
```

Edit `backend/.env` before running database commands:

- Set `DATABASE_URL` to a disposable local PostgreSQL database. Do not use a production connection.
- Replace `JWT_SECRET` and `JWT_REFRESH_SECRET` with separate random secrets.
- Set `PORT=8000` and `NEXT_PUBLIC_APP_URL=http://localhost:3050`.
- Configure `MAIL_*` for a local mail catcher or a test SMTP service. Email verification is required for password login.
- Review the Google/Facebook, Cloudinary, Groq and Midtrans fields. OAuth strategies are instantiated at startup; the template placeholders are not functional provider credentials. Never use production payment keys for local exploration.

For each secret, generate a new value locally:

```bash
node -e "console.log(require('node:crypto').randomBytes(32).toString('hex'))"
```

After verifying that the database URL is local:

```bash
npm run db:generate
npm run db:push
npm run dev
```

`db:push` changes the target schema. There is no committed Prisma migration directory at the reviewed revision, so this guide does not pretend `migrate deploy` is a ready-made installation path. Seeding is deliberately omitted: review seed code before executing it.

API base: `http://localhost:8000/api` · Swagger: `http://localhost:8000/api/docs`.

### 2. Start the frontend in another terminal

From the repository root:

```bash
cd frontend
cp .env.example .env.local
npm ci
npm run dev
```

Keep `NEXT_PUBLIC_API_URL=http://localhost:8000/api` and the app/NextAuth URLs at `http://localhost:3050`. Replace `NEXTAUTH_SECRET` with a fresh random secret. Open **http://localhost:3050**.

### Known setup boundaries

- The frontend currently uses a `next lint` script while depending on Next.js 16. Do not interpret that script as a verified working lint command.
- Email delivery, OAuth, uploads, AI features and payment flows require separate configuration and testing.
- This project is not a bank connection, custody service, security certification or financial advice. Start with dummy data; do not load sensitive financial records into an unreviewed deployment.

## Contributing

Bug reports, documentation corrections and focused fixes are welcome. See [CONTRIBUTING.md](CONTRIBUTING.md) for the workflow. Use Discussions for setup questions and ideas; use Issues for reproducible bugs. Never publish credentials, database dumps or personal financial information.

If you find the project useful, a star helps other developers discover it. No star exchanges or artificial engagement are requested.

## Further reading

- [Product requirements](documentation/PRD.md)
- [Setup reference](documentation/SETUP_GUIDE.md)
- [API reference](documentation/API.md)
- [User guide](documentation/USER_GUIDE.md)

Some older documents describe plans rather than the current implementation. Check the source and package scripts when instructions differ.

## License

The backend package metadata declares MIT, but there is no root `LICENSE` file. This update does not grant new licensing rights or assume that declaration covers the entire repository. Ask the maintainer for clarification before redistributing the whole project.
