-- Supabase initialization SQL
-- Run this in the Supabase SQL editor for your project.

-- Users table (optional if you rely on Supabase Auth)
create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  email text unique,
  role text default 'user',
  created_at timestamptz default now()
);

-- Properties table
create table if not exists public.properties (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  type text not null,
  location text not null,
  description text,
  price numeric,
  owner_id uuid not null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Property images
create table if not exists public.property_images (
  id uuid primary key default gen_random_uuid(),
  property_id uuid references public.properties(id) on delete cascade,
  url text not null,
  created_at timestamptz default now()
);

-- Indexes
create index if not exists idx_properties_owner_id on public.properties(owner_id);

-- RLS: simple example (customize for production)
-- Enable row level security if you want per-user access control and then create policies.
-- alter table public.properties enable row level security;
-- Run this in the Supabase SQL editor if you're not using Prisma migrations

-- users table (if you don't rely entirely on Supabase Auth for profiles)
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  role text DEFAULT 'user',
  created_at timestamptz DEFAULT now()
);

-- properties
CREATE TABLE IF NOT EXISTS properties (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  type text NOT NULL,
  location text NOT NULL,
  description text,
  price numeric,
  owner_id uuid REFERENCES users(id) ON DELETE SET NULL,
  created_at timestamptz DEFAULT now()
);

-- property images
CREATE TABLE IF NOT EXISTS property_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  property_id uuid REFERENCES properties(id) ON DELETE CASCADE,
  url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Row Level Security policies (example)
-- Enable RLS on properties and property_images
ALTER TABLE IF EXISTS properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE IF EXISTS property_images ENABLE ROW LEVEL SECURITY;

-- Allow anyone to SELECT properties (public listings)
CREATE POLICY if_not_exists_select_properties ON properties
  FOR SELECT USING (true);

-- Allow authenticated users to INSERT properties only if owner_id = auth.uid()
CREATE POLICY if_not_exists_insert_properties ON properties
  FOR INSERT WITH CHECK (auth.uid()::uuid = owner_id);

-- For property_images, allow inserts only if the property belongs to the user
CREATE POLICY if_not_exists_insert_images ON property_images
  FOR INSERT WITH CHECK (
    (SELECT owner_id FROM properties WHERE properties.id = property_images.property_id) = auth.uid()::uuid
  );

-- Allow owners to UPDATE their own properties
CREATE POLICY if_not_exists_update_properties_owner ON properties
  FOR UPDATE USING (owner_id = auth.uid()::uuid) WITH CHECK (owner_id = auth.uid()::uuid);

-- Allow owners to DELETE their own properties
CREATE POLICY if_not_exists_delete_properties_owner ON properties
  FOR DELETE USING (owner_id = auth.uid()::uuid);

-- Allow admin users (role='admin' in users table) to UPDATE/DELETE any property
-- Note: this checks the users table for a matching auth UID; ensure users are synced/created
CREATE POLICY if_not_exists_admin_override ON properties
  FOR ALL USING (
    (SELECT role FROM users WHERE users.id = auth.uid()::uuid) = 'admin'
  );

-- Sample test data (replace owner_id with a real user uuid from your Supabase Auth)
-- INSERT INTO properties (title, type, location, description, price, owner_id) VALUES ('Sample Apartment', 'Apartment', 'Lusaka', 'Cozy 2BR', 2500, '00000000-0000-0000-0000-000000000000');

