# 🌟 Frecuencia Mahatma 441 — Plataforma Completa

## ✅ Estado Actual

Todo está **100% listo para desplegar**:

- ✅ Landing page con testimonios en vivo
- ✅ Plataforma con 41 aulas
- ✅ Admin panel para gestionar todo
- ✅ Supabase integrado para guardar testimonios

---

## 📋 Archivos Incluidos

```
deploy-final/
├── index.html                    # Redirige a landing.html
├── landing.html                  # Página de inicio (testimonios + link a tu sitio)
├── plataforma.html               # Plataforma (aulas + admin)
├── app.jsx                       # App React principal
├── components-1.jsx              # Componentes UI
├── components-3.jsx              # Modales y galerías
├── components-4.jsx              # Admin panel + gestión testimonios
├── components-testimonios.jsx    # Componentes de testimonios (legacy)
├── aulas-data.js                 # 41 aulas con datos
├── file-store.js                 # Almacenamiento de archivos
├── supabase-config.js            # Conexión a Supabase ⭐
├── styles.css                    # Estilos principales
├── styles-2.css                  # Estilos de aulas
├── styles-admin.css              # Estilos admin panel
├── styles-mobile.css             # Responsive
├── styles-resumen.css            # Estilos resumen
├── tweaks-panel.jsx              # Panel de tweaks
├── SETUP-SUPABASE.sql            # Script SQL ya ejecutado ✅
└── README.md                      # Este archivo
```

---

## 🚀 Pasos para Desplegar

### 1. Descargá la carpeta `deploy-final`

### 2. Descomprimilo en tu computadora

### 3. Subí TODO a Cloudflare Workers (o tu servidor)

Opción A: **Cloudflare Workers**
- Entra a https://dash.cloudflare.com
- Crea un nuevo Worker
- Copia el código de tu worker (puede servir archivos estáticos)
- Sube todos los archivos HTML, JS, CSS
- Deploy

Opción B: **Vercel, Netlify, GitHub Pages**
- Sube la carpeta `deploy-final` a tu repositorio
- Configura el deploy automático
- Listo

---

## 🔐 Credenciales de Supabase

Las credenciales ya están en `supabase-config.js`:

```javascript
const SUPABASE_URL = "https://udtenqjlofjduuwffjja.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_JpIAa1iXYAyOVMLBlpBp6w_D8BaSKer";
```

✅ **Ya está configurado**, no necesitas hacer nada.

---

## 👥 Códigos de Acceso

En `app.jsx` está configurado:

**Admin:**
- Código: `ealumina441`
- Acceso completo a todo

**Alumnos:**
- `mahatma441`
- `kumara2024`
- `esenia441`
- `arcoiris441`

Para agregar más códigos, edita `app.jsx` línea ~14.

---

## 📝 Cómo Agregar Testimonios

### Opción 1: Desde Admin Panel (recomendado)

1. Entra a plataforma: aprieta "Ingresar a Plataforma"
2. Código de admin: `ealumina441`
3. Engranaje arriba a la derecha → "Gestionar Testimonios"
4. Completa:
   - **Nombre**: nombre de la persona
   - **Mensaje**: su experiencia (texto corto)
   - **Video**: link de Google Drive (opcional)
5. Aprieta "Agregar Testimonio"
6. **Automáticamente** aparece en la landing page

### Opción 2: Directamente en Supabase

1. Entra a https://app.supabase.com
2. Tu proyecto → **Table Editor**
3. Tabla `testimonios` → **Insert** → agrega fila
4. Llena los campos
5. **Save** → aparece en la landing page al instante

---

## 🎥 Links de Videos en Google Drive

Para compartir un video de Google Drive:

1. Sube el video a Google Drive
2. Click derecho → **Compartir**
3. Cambiar a **Cualquiera con el link** (o público)
4. Copia el link: `https://drive.google.com/file/d/XXXX/view?usp=sharing`
5. Pega en admin panel o Supabase

El código extrae automáticamente el ID del archivo y lo muestra en un modal.

---

## 🔄 Flujo de la Plataforma

```
landing.html (primera vez)
    ↓
Testimonio + "Ingresar a Plataforma"
    ↓
plataforma.html (login)
    ↓
Código de acceso
    ↓
Plataforma completa (41 aulas)
    ↓
Admin panel (engranaje)
    ↓
Gestionar testimonios
```

---

## 💾 Dónde se Guardan los Testimonios

**Base de datos:** Supabase (`https://udtenqjlofjduuwffjja.supabase.co`)
**Tabla:** `testimonios`
**Campos:**
- `id` - UUID único
- `nombre` - Nombre de la persona
- `mensaje` - Su experiencia
- `videoUrl` - Link Google Drive
- `created_at` - Fecha de creación
- `updated_at` - Fecha de última edición

✅ **No se pierden** — están en la nube
✅ **Se sincronizan** — en tiempo real
✅ **Puedes eliminar** — desde admin panel

---

## ⚙️ Cambios de Configuración

### Cambiar códigos de acceso

Archivo: `app.jsx`
Línea: ~14

```javascript
const CODIGO_ADMIN = "ealumina441";
const CODIGOS_ALUMNOS = [
  "mahatma441",
  "kumara2024",
  "esenia441",
  "arcoiris441"
];
```

### Cambiar link de tu sitio web

Archivo: `app.jsx`
Línea: ~23

```javascript
const SITIO_PERSONAL = "https://claudio-martinez-terapeuta.vercel.app/";
```

### Cambiar contacto (email/WhatsApp)

Archivo: `app.jsx`
Línea: ~25-28

```javascript
const CONTACTO = {
  email: "esenios2022@gmail.com",
  whatsappNum: "59893422022",
  whatsappMostrar: "+598 93422022",
};
```

---

## 🎨 Personalización

Todo está listo para tweaks desde la plataforma:

- **Fondo**: 4 opciones diferentes
- **Colores**: Esmeralda, Real, Amatista
- **Tipografía**: Serif, Sans, Mixto

Los tweaks se guardan en `localStorage` automáticamente.

---

## 📱 Responsive

✅ Funciona en:
- Desktop
- Tablet
- Mobile

Toda la plataforma es completamente responsiva.

---

## 🆘 Soporte

Si algo no funciona:

1. **Revisa la consola** (F12 → Console)
2. **Verifica las credenciales** de Supabase
3. **Prueba en incógnito** (sin cache)
4. **Contacta a Claudio** en WhatsApp +598 93422022

---

## 📅 Próximos Pasos (Opcional)

- Agregar más aulas (edita `aulas-data.js`)
- Personalizar colores y fuentes
- Agregar más testimonios
- Integrar con tu sitio web

---

**¡Listo para usar! 🚀**

Descargá, descomprimilo, subí y ¡a volar!
