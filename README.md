🔧 INSTRUCCIONES PARA ARREGLAR SUPABASE

1️⃣ VE A SUPABASE
   → https://app.supabase.com
   → Tu proyecto: udtenqjlofjduuwffjja

2️⃣ ABRE SQL EDITOR
   → Menú izquierdo → SQL Editor
   → Click en "New Query"

3️⃣ COPIA Y PEGA TODO ESTO:

---
DROP TABLE IF EXISTS testimonios CASCADE;

CREATE TABLE testimonios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  mensaje TEXT NOT NULL,
  videoUrl TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

ALTER TABLE testimonios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Permitir lectura pública"
  ON testimonios FOR SELECT
  USING (true);

CREATE POLICY "Permitir inserción pública"
  ON testimonios FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Permitir eliminación pública"
  ON testimonios FOR DELETE
  USING (true);

CREATE POLICY "Permitir actualización pública"
  ON testimonios FOR UPDATE
  USING (true);
---

4️⃣ EJECUTÁ
   → Click en botón "RUN" (o Ctrl+Enter)
   → Espera a que termine

5️⃣ LISTO
   → La tabla está arreglada
   → Descargá la carpeta deploy-final actualizada
   → Subí a tu servidor
   → ¡Funciona!
