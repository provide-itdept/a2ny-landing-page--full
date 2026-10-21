CREATE TABLE IF NOT EXISTS service_categories (
  id BIGSERIAL PRIMARY KEY, name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL,
  description TEXT NOT NULL DEFAULT '', display_order INTEGER NOT NULL DEFAULT 0, is_active BOOLEAN NOT NULL DEFAULT TRUE
);
CREATE TABLE IF NOT EXISTS services (
  id BIGSERIAL PRIMARY KEY, category_id BIGINT REFERENCES service_categories(id) ON DELETE SET NULL,
  name TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, short_description TEXT NOT NULL DEFAULT '', full_description TEXT NOT NULL DEFAULT '',
  meta_title TEXT NOT NULL DEFAULT '', meta_description TEXT NOT NULL DEFAULT '', canonical_url TEXT, is_published BOOLEAN NOT NULL DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
CREATE TABLE IF NOT EXISTS authors (
  id BIGSERIAL PRIMARY KEY, full_name TEXT NOT NULL, professional_title TEXT NOT NULL DEFAULT '', biography TEXT NOT NULL DEFAULT '',
  profile_image TEXT, credentials TEXT NOT NULL DEFAULT '', profile_url TEXT
);
CREATE TABLE IF NOT EXISTS blog_posts (
  id BIGSERIAL PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, excerpt TEXT NOT NULL DEFAULT '', content TEXT NOT NULL DEFAULT '',
  featured_image TEXT, featured_image_alt TEXT, author_id BIGINT REFERENCES authors(id) ON DELETE SET NULL, meta_title TEXT NOT NULL DEFAULT '',
  meta_description TEXT NOT NULL DEFAULT '', canonical_url TEXT, published_at TIMESTAMPTZ, updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), status TEXT NOT NULL DEFAULT 'draft'
);
CREATE TABLE IF NOT EXISTS projects (
  id BIGSERIAL PRIMARY KEY, title TEXT NOT NULL, slug TEXT UNIQUE NOT NULL, industry TEXT NOT NULL DEFAULT '', challenge TEXT NOT NULL DEFAULT '',
  solution TEXT NOT NULL DEFAULT '', technologies JSONB NOT NULL DEFAULT '[]', verified_results TEXT NOT NULL DEFAULT '', images JSONB NOT NULL DEFAULT '[]', status TEXT NOT NULL DEFAULT 'draft'
);
CREATE TABLE IF NOT EXISTS faq_items (
  id BIGSERIAL PRIMARY KEY, question TEXT NOT NULL, answer TEXT NOT NULL, service_id BIGINT REFERENCES services(id) ON DELETE SET NULL,
  display_order INTEGER NOT NULL DEFAULT 0, is_published BOOLEAN NOT NULL DEFAULT FALSE
);
CREATE INDEX IF NOT EXISTS services_published_idx ON services (is_published, slug);
CREATE INDEX IF NOT EXISTS blog_posts_status_published_idx ON blog_posts (status, published_at DESC);
