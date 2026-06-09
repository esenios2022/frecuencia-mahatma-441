// =============================================================================
// file-store.js — Almacén de archivos de la plataforma (PDF, DOC, audio, etc.)
// =============================================================================
// Guarda los archivos que sube el admin DENTRO del navegador, usando IndexedDB
// (aguanta cientos de MB, a diferencia de localStorage que es de ~5MB).
//
// MODO ACTUAL: "local" — los archivos quedan en ESTE navegador. Sirve para
// cargar, probar y descargar ya mismo. Para que TODOS los alumnos los vean en
// internet, el próximo paso es conectar Cloudflare R2 (un "depósito" online):
// cuando esté, solo cambia la función subir()/bajar() de acá y el resto sigue igual.
//
// API pública -> window.FMFiles
//   await FMFiles.save(file, meta)   -> { id, name, size, mime }
//   await FMFiles.get(id)            -> registro completo (incluye blob)
//   await FMFiles.url(id)            -> objectURL para <a>, <audio>, <img>
//   await FMFiles.download(id, name) -> dispara la descarga
//   await FMFiles.remove(id)
//   await FMFiles.list()             -> [{id, name, size, mime, createdAt}]
//   await FMFiles.totalSize()        -> bytes ocupados
//   FMFiles.human(bytes)             -> "1.2 MB"
// =============================================================================

(function () {
  const DB_NAME = "fm441-files";
  const STORE = "files";
  const VERSION = 1;

  let _dbPromise = null;

  function openDB() {
    if (_dbPromise) return _dbPromise;
    _dbPromise = new Promise((resolve, reject) => {
      if (!("indexedDB" in window)) {
        reject(new Error("Este navegador no soporta almacenamiento de archivos (IndexedDB)."));
        return;
      }
      const req = indexedDB.open(DB_NAME, VERSION);
      req.onupgradeneeded = () => {
        const db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          db.createObjectStore(STORE, { keyPath: "id" });
        }
      };
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error || new Error("No pude abrir la base de archivos"));
    });
    return _dbPromise;
  }

  function tx(mode) {
    return openDB().then((db) => db.transaction(STORE, mode).objectStore(STORE));
  }

  function genId() {
    return "f_" + Date.now().toString(36) + "_" + Math.random().toString(36).slice(2, 8);
  }

  const _urlCache = new Map();

  const FMFiles = {
    mode: "local", // "local" | "r2" (futuro)

    async save(file, meta = {}) {
      const store = await tx("readwrite");
      const id = genId();
      const record = {
        id,
        name: meta.name || file.name || "archivo",
        mime: file.type || meta.mime || "application/octet-stream",
        size: file.size || 0,
        blob: file,
        createdAt: Date.now(),
      };
      await new Promise((resolve, reject) => {
        const r = store.put(record);
        r.onsuccess = resolve;
        r.onerror = () => reject(r.error);
      });
      return { id, name: record.name, size: record.size, mime: record.mime };
    },

    async get(id) {
      const store = await tx("readonly");
      return new Promise((resolve, reject) => {
        const r = store.get(id);
        r.onsuccess = () => resolve(r.result || null);
        r.onerror = () => reject(r.error);
      });
    },

    async url(id) {
      if (_urlCache.has(id)) return _urlCache.get(id);
      const rec = await this.get(id);
      if (!rec || !rec.blob) return null;
      const u = URL.createObjectURL(rec.blob);
      _urlCache.set(id, u);
      return u;
    },

    async download(id, filename) {
      const rec = await this.get(id);
      if (!rec || !rec.blob) {
        alert("No encuentro ese archivo en este navegador. Puede que se haya subido en otro dispositivo.");
        return;
      }
      const u = URL.createObjectURL(rec.blob);
      const a = document.createElement("a");
      a.href = u;
      a.download = filename || rec.name || "archivo";
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(u), 4000);
    },

    async remove(id) {
      const store = await tx("readwrite");
      await new Promise((resolve, reject) => {
        const r = store.delete(id);
        r.onsuccess = resolve;
        r.onerror = () => reject(r.error);
      });
      if (_urlCache.has(id)) {
        URL.revokeObjectURL(_urlCache.get(id));
        _urlCache.delete(id);
      }
    },

    async list() {
      const store = await tx("readonly");
      return new Promise((resolve, reject) => {
        const out = [];
        const r = store.openCursor();
        r.onsuccess = () => {
          const c = r.result;
          if (c) {
            const { id, name, size, mime, createdAt } = c.value;
            out.push({ id, name, size, mime, createdAt });
            c.continue();
          } else resolve(out);
        };
        r.onerror = () => reject(r.error);
      });
    },

    async totalSize() {
      const items = await this.list();
      return items.reduce((s, i) => s + (i.size || 0), 0);
    },

    human(bytes) {
      if (!bytes && bytes !== 0) return "—";
      if (bytes < 1024) return bytes + " B";
      if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(0) + " KB";
      return (bytes / (1024 * 1024)).toFixed(1) + " MB";
    },
  };

  window.FMFiles = FMFiles;
})();
