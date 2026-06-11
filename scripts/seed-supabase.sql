-- =============================================================
-- CampusPark — Supabase Schema + Seed Data
-- Run this in your Supabase Dashboard → SQL Editor → New Query
-- =============================================================

-- 1. Create ZONES table
CREATE TABLE IF NOT EXISTS zones (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT NOT NULL,
  description TEXT DEFAULT '',
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- 2. Create SLOTS table
CREATE TABLE IF NOT EXISTS slots (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  number      TEXT NOT NULL,
  zone        UUID NOT NULL REFERENCES zones(id) ON DELETE CASCADE,
  status      TEXT NOT NULL DEFAULT 'AVAILABLE',
  updated_at  TIMESTAMPTZ DEFAULT now(),
  assigned_to TEXT
);

-- 3. Enable Row Level Security (RLS) but allow public access via anon key
--    This is fine for a demo project. For production, add proper policies.
ALTER TABLE zones ENABLE ROW LEVEL SECURITY;
ALTER TABLE slots ENABLE ROW LEVEL SECURITY;

-- Allow all operations for anonymous users (demo/portfolio project)
CREATE POLICY "Allow all access to zones" ON zones
  FOR ALL USING (true) WITH CHECK (true);

CREATE POLICY "Allow all access to slots" ON slots
  FOR ALL USING (true) WITH CHECK (true);

-- =============================================================
-- 4. Seed Data — Zones
-- =============================================================
INSERT INTO zones (id, name, description) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Main Faculty Wing', 'Closest to the Science and Arts departments.'),
  ('a0000000-0000-0000-0000-000000000002', 'North Annex', 'Near the Administration Building.'),
  ('a0000000-0000-0000-0000-000000000003', 'West Gate', 'Ideal for Sports and Library access.');

-- =============================================================
-- 5. Seed Data — Slots
-- =============================================================
INSERT INTO slots (number, zone, status) VALUES
  -- Zone A: Main Faculty Wing
  ('A-1', 'a0000000-0000-0000-0000-000000000001', 'OCCUPIED'),
  ('A-2', 'a0000000-0000-0000-0000-000000000001', 'AVAILABLE'),
  ('A-3', 'a0000000-0000-0000-0000-000000000001', 'AVAILABLE'),
  ('A-4', 'a0000000-0000-0000-0000-000000000001', 'OCCUPIED'),
  ('A-5', 'a0000000-0000-0000-0000-000000000001', 'AVAILABLE'),
  ('A-6', 'a0000000-0000-0000-0000-000000000001', 'OCCUPIED'),
  -- Zone B: North Annex
  ('B-1', 'a0000000-0000-0000-0000-000000000002', 'AVAILABLE'),
  ('B-2', 'a0000000-0000-0000-0000-000000000002', 'OCCUPIED'),
  ('B-3', 'a0000000-0000-0000-0000-000000000002', 'RESERVED'),
  -- Zone C: West Gate
  ('C-1', 'a0000000-0000-0000-0000-000000000003', 'AVAILABLE'),
  ('C-2', 'a0000000-0000-0000-0000-000000000003', 'AVAILABLE'),
  ('C-3', 'a0000000-0000-0000-0000-000000000003', 'OCCUPIED');
