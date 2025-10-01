This README explains the remaining steps to finish setup and deployment for the jconnects project (Supabase-only backend).

1) Environment (local)
- Create `.env.local` and add your Supabase keys (do NOT commit secrets):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=service_role_key  # optional, keep secure for server tasks
```

2) Create database tables and storage bucket in Supabase
- Open Supabase > SQL Editor and run `supabase/init.sql` in this repo to create `properties` and `property_images` tables.
- In Supabase > Storage create a bucket named `property-images` (public or private depending on your needs).

3) Install and build locally

```
npm install
npx tsc --noEmit
npx next build
```

4) Deploy
- On Vercel (recommended for Next.js): set the environment variables in the project settings (NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY). If you use server-side service keys, store them as secure environment variables.

5) Troubleshooting
- If uploads fail, verify the `property-images` bucket exists and Supabase keys are correct.
- If auth fails, ensure cookies are being forwarded and that `utils/supabase/server.ts` cookie handling is working in your deployment environment.

If you want, I can add RLS policies or a simple SQL migration script tailored for Supabase to lock down access. Tell me which you'd like next.
This README explains the remaining steps to finish setup and deployment for the jconnects project.

1) Environment (local)
- Copy `.env.local` and `.env` as needed. The `.env` file must contain:
  - DATABASE_URL: Postgres connection string used by Prisma
  - DIRECT_URL: Direct connection string for Prisma (optional depending on setup)
- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are present in `.env.local` for client usage.

2) Prisma
- If you want to use Prisma migrations:
  - npx prisma migrate dev --name init
- If you already have an existing DB and want to introspect:
  - npx prisma db pull
  - npx prisma generate

3) Supabase (if using Supabase db and storage)
- In the Supabase dashboard:
  - Create a bucket named `property-images` (public or private depending on your needs).
  - Run the SQL in `supabase/init.sql` if you wish to add the tables without Prisma.

4) Install and build locally
- npm install
- npx tsc --noEmit
- npx next build

5) Troubleshooting
- If Prisma reports missing env vars, ensure `.env` contains DATABASE_URL and DIRECT_URL.
- If Supabase upload fails, verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are correct and the `property-images` bucket exists.

If you want, I can attempt to run `npx prisma migrate dev` and `npx next build` here — but I need real DB credentials in `.env` to do it. If you provide them (or run locally and paste errors), I'll patch anything that fails.
