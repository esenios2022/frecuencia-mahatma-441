-- EJECUTÁ ESTO EN SUPABASE SQL EDITOR
-- Primero elimina la tabla antigua (si existe)
DROP TABLE IF EXISTS testimonios CASCADE;

-- Crea la tabla nueva con las columnas correctas
CREATE TABLE testimonios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  video_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Habilita RLS (Row Level Security)
ALTER TABLE testimonios ENABLE ROW LEVEL SECURITY;

-- Política: Permitir lectura pública
CREATE POLICY "Permitir lectura pública"
  ON testimonios FOR SELECT
  USING (true);

-- Política: Permitir inserción pública
CREATE POLICY "Permitir inserción pública"
  ON testimonios FOR INSERT
  WITH CHECK (true);

-- Política: Permitir eliminación pública
CREATE POLICY "Permitir eliminación pública"
  ON testimonios FOR DELETE
  USING (true);

-- Política: Permitir actualización pública
CREATE POLICY "Permitir actualización pública"
  ON testimonios FOR UPDATE
  USING (true);
