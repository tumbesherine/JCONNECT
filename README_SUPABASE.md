# Supabase setup (quick guide)

This project uses Supabase for Auth, Storage, and as the primary backend (Postgres). Follow these steps to finish setup locally and on Supabase.

1) Environment variables

- In your local project, set these in `.env` or `.env.local` (do NOT commit secrets):

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=service_role_key  # only for server/admin tasks, keep secure
DATABASE_URL=postgresql://...              # optional if using Prisma migrations locally
DIRECT_URL=postgresql://...                # required by Prisma for some commands
```

2) Create tables in Supabase

- Open your Supabase project > SQL Editor. Run the SQL in `supabase/init.sql` to create `properties` and `property_images` tables. If you rely fully on Supabase Auth for users you can skip creating the `users` table.

3) Create a storage bucket

- In the Supabase console > Storage > Create a bucket named `property-images` (public or private depending on your app needs).

4) Verify API keys

- Ensure `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are present in `.env.local` for the browser client. Server-side service role key should be stored in your deployment environment variables and not committed.

5) Database migrations

- This project expects the `properties` and `property_images` tables to exist in your Supabase Postgres database. You can create them by running the SQL in `supabase/init.sql` from the Supabase SQL editor. If you prefer migrations, use your own migration tooling — Prisma is not required.

6) Run the app

```
npm install
npm run dev
```

7) Troubleshooting

- If uploads fail, confirm the storage bucket name (`property-images`) and the Supabase keys.
- If Supabase auth endpoints return 401, check cookie forwarding in `utils/supabase/server.ts` and make sure your browser accepts cookies for the Supabase domain.
