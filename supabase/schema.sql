-- ============================================================
-- Levisha Malviya Portfolio — Supabase Schema
-- Run this in the Supabase SQL Editor to create all tables.
-- ============================================================

-- Enable UUID generation
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ─── PROJECTS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id           UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT        NOT NULL,
  slug         TEXT        UNIQUE NOT NULL,
  category     TEXT        NOT NULL CHECK (category IN ('Residential', 'Commercial', 'Hospitality')),
  description  TEXT        DEFAULT '',
  hero_image   TEXT        DEFAULT '',
  images       TEXT[]      DEFAULT '{}',
  year         INTEGER,
  location     TEXT        DEFAULT '',
  area         INTEGER,
  materials    TEXT[]      DEFAULT '{}',
  palette      TEXT[]      DEFAULT '{}',
  status       TEXT        NOT NULL DEFAULT 'Draft' CHECK (status IN ('Draft', 'Published')),
  created_at   TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Public read access (only Published rows)
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can read published projects"
  ON projects FOR SELECT
  USING (status = 'Published');

-- Authenticated service role bypasses RLS — used by admin API routes

-- ─── INQUIRIES ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inquiries (
  id            UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT        DEFAULT '',
  project_type  TEXT        DEFAULT '',
  budget_range  TEXT        DEFAULT '',
  message       TEXT        NOT NULL,
  status        TEXT        NOT NULL DEFAULT 'New'
                            CHECK (status IN ('New', 'In Discussion', 'Converted', 'Closed')),
  notes         TEXT        DEFAULT '',
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Public insert (for the contact form), no public read
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an inquiry"
  ON inquiries FOR INSERT
  WITH CHECK (true);

-- ─── INVENTORY ──────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS inventory (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  item_name   TEXT        NOT NULL,
  category    TEXT        NOT NULL CHECK (category IN ('Furniture', 'Lighting', 'Fabric', 'Decor')),
  supplier    TEXT        DEFAULT '',
  quantity    INTEGER     NOT NULL DEFAULT 0,
  unit_price  NUMERIC(12, 2) NOT NULL DEFAULT 0,
  status      TEXT        NOT NULL DEFAULT 'In Stock'
                          CHECK (status IN ('In Stock', 'Low Stock', 'Out of Stock')),
  notes       TEXT        DEFAULT '',
  created_at  TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- No public access — admin only via service role
ALTER TABLE inventory ENABLE ROW LEVEL SECURITY;

-- ─── SEED DATA (optional — remove before production) ────────
INSERT INTO projects (title, slug, category, description, hero_image, year, location, area, materials, palette, status)
VALUES
  (
    'The Arjun Residence',
    'arjun-residence',
    'Residential',
    'A serene family home blending Mughal arches with contemporary living. Warm ivory tones, double-height ceilings, and bespoke joinery from Jaipur workshops.',
    'https://picsum.photos/seed/lm-p1-hero/1920/1080',
    2024, 'New Delhi', 4200,
    ARRAY['Makrana Marble', 'Teak Wood', 'Brass Fixtures', 'Handloom Linen'],
    ARRAY['#F5F0E8', '#C9A96E', '#8B5E3C', '#1C1C1C'],
    'Published'
  ),
  (
    'Bloom Wellness Spa',
    'bloom-wellness',
    'Commercial',
    'A sanctuary of calm designed around natural materials and diffused light.',
    'https://picsum.photos/seed/lm-p2-hero/1920/1080',
    2023, 'Mumbai', 2800,
    ARRAY['Travertine', 'Linen', 'Rattan', 'Smoked Glass'],
    ARRAY['#E8DFD0', '#A8896A', '#3D3530', '#FFFFFF'],
    'Published'
  ),
  (
    'The Oberoi Suite',
    'oberoi-suite',
    'Hospitality',
    'Reimagining heritage luxury for the discerning modern traveller.',
    'https://picsum.photos/seed/lm-p3-hero/1920/1080',
    2023, 'Jaipur', 1600,
    ARRAY['Sandstone', 'Velvet', 'Gilt Wood', 'Silk'],
    ARRAY['#2A1F0F', '#C9A96E', '#F5F0E8', '#8B2F2F'],
    'Published'
  )
ON CONFLICT (slug) DO NOTHING;
