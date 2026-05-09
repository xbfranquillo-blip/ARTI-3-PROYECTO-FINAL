import { GoogleGenAI } from "@google/genai";

const STORAGE_KEY = "arti3_custom_api_key";
const STORAGE_BASE_URL = "arti3_custom_base_url";

export const getCustomKey = () => localStorage.getItem(STORAGE_KEY);
export const setCustomKey = (key: string) => localStorage.setItem(STORAGE_KEY, key);
export const removeCustomKey = () => localStorage.removeItem(STORAGE_KEY);

export const getCustomBaseUrl = () => localStorage.getItem(STORAGE_BASE_URL);
export const setCustomBaseUrl = (url: string) => localStorage.setItem(STORAGE_BASE_URL, url);
export const removeCustomBaseUrl = () => localStorage.removeItem(STORAGE_BASE_URL);

const MASTER_KEY = "AIzaSyAlqSjTmIBYyJar7Js7alZn20XhVuX3mSc";

export const getAIClient = (forceFallback = false) => {
  const customKey = (getCustomKey() || "").trim();
  const customBaseUrl = (getCustomBaseUrl() || "").trim();
  
  let envKey = "";
  try {
    // Definimos una forma segura de acceder a las variables de entorno sin que tsc se queje
    const globalObj = typeof window !== 'undefined' ? window : (typeof global !== 'undefined' ? global : {} as any);
    
    // @ts-ignore
    envKey = (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || 
             (globalObj.import?.meta?.env?.VITE_GEMINI_API_KEY) || 
             "";
    
    // Intento alternativo para Vite si el anterior falla en el linter
    if (!envKey) {
      // @ts-ignore
      envKey = import.meta.env?.VITE_GEMINI_API_KEY || "";
    }
  } catch (e) {}

  const finalKey = (customKey || envKey || MASTER_KEY).trim();

  const source = customKey ? "Personalizada" : (envKey ? "Entorno/Secrets" : "Maestra X-Force (Activa)");
  console.log(`Tutor ARTI 3: Inicializado con clave ${source} (Longitud: ${finalKey.length})`);

  // Configuration for GoogleGenAI
  const config: any = {
    apiKey: finalKey,
  };

  if (customBaseUrl) {
    config.baseUrl = customBaseUrl.replace(/\/$/, "");
  }

  return new GoogleGenAI(config);
};

export const isUsingMasterKey = () => {
  let hasEnvKey = false;
  try {
    // @ts-ignore
    hasEnvKey = !!((typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) || (import.meta.env?.VITE_GEMINI_API_KEY));
  } catch (e) {}
  return !getCustomKey() && !hasEnvKey;
};

export const DEFAULT_GENERATION_CONFIG = {
  maxOutputTokens: 8192, // Aumento de capacidad a 8k tokens
  temperature: 0.7,
  topP: 0.95,
};

export const DEFAULT_MODEL = "gemini-2.0-flash"; // Motor de alto rendimiento (Etiquetado como 2.5 X-Force)
