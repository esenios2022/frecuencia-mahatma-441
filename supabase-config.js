// Supabase configuration
const SUPABASE_URL = "https://udtenqjlofjduuwffjja.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_JpIAa1iXYAyOVMLBlpBp6w_D8BaSKer";

// Inicializar cliente de Supabase
const supabaseClient = (() => {
  class SupabaseClient {
    constructor(url, key) {
      this.url = url;
      this.key = key;
    }

    async request(method, path, body = null) {
      const fullUrl = `${this.url}/rest/v1${path}`;
      const headers = {
        "apikey": this.key,
        "Authorization": `Bearer ${this.key}`,
        "Content-Type": "application/json",
      };

      const options = {
        method,
        headers,
      };

      if (body) {
        options.body = JSON.stringify(body);
      }

      try {
        const response = await fetch(fullUrl, options);
        
        if (!response.ok) {
          let errorMsg = `Error ${response.status}`;
          try {
            const errorData = await response.json();
            errorMsg = errorData.message || errorData.error || errorMsg;
          } catch (e) {
            // Si no puede parsear JSON, usa el mensaje por defecto
          }
          throw new Error(errorMsg);
        }
        
        const text = await response.text();
        return text ? JSON.parse(text) : [];
      } catch (error) {
        console.error(`Supabase error (${method} ${path}):`, error);
        throw error;
      }
    }

    async getTestimonios() {
      return this.request("GET", "/testimonios?order=created_at.desc");
    }

    async addTestimonio(data) {
      return this.request("POST", "/testimonios", data);
    }

    async deleteTestimonio(id) {
      return this.request("DELETE", `/testimonios?id=eq.${id}`);
    }

    async updateTestimonio(id, data) {
      return this.request("PATCH", `/testimonios?id=eq.${id}`, data);
    }

    async getAulas() {
      return this.request("GET", "/aulas?order=n.asc");
    }

    async addAula(data) {
      return this.request("POST", "/aulas", data);
    }

    async updateAula(n, data) {
      return this.request("PATCH", `/aulas?n=eq.${n}`, data);
    }

    async deleteAula(n) {
      return this.request("DELETE", `/aulas?n=eq.${n}`);
    }
  }

  return new SupabaseClient(SUPABASE_URL, SUPABASE_ANON_KEY);
})();

// IMPORTANTE: Exportar a window para que los scripts de React puedan usarlo
window.supabaseClient = supabaseClient;
