import { GoogleGenAI } from "@google/genai";

const STORAGE_KEY = "arti3_custom_api_key";

export const getCustomKey = () => localStorage.getItem(STORAGE_KEY);
export const setCustomKey = (key: string) => localStorage.setItem(STORAGE_KEY, key);
export const removeCustomKey = () => localStorage.removeItem(STORAGE_KEY);

// El cliente de IA se inicializa siguiendo el skill gemini-api.
export const isConfigured = () => !!(getCustomKey() || process.env.GEMINI_API_KEY);

export const getAIClient = () => {
  const customKey = getCustomKey();
  const envKey = process.env.GEMINI_API_KEY || "";
  
  const apiKey = (customKey || envKey).trim();
  
  if (!apiKey) {
    return null;
  }

  // El constructor de @google/genai recibe un objeto con apiKey
  return new GoogleGenAI({ apiKey });
};

export const isUsingCustomKey = () => !!getCustomKey();

export const DEFAULT_GENERATION_CONFIG = {
  // Se prefiere definir el tamaño de la respuesta en el systemInstruction, 
  // pero dejamos valores base por compatibilidad.
  temperature: 1,
  topP: 0.95,
};

// Modelo recomendado por el skill para tareas de texto
export const DEFAULT_MODEL = "gemini-3-flash-preview"; 
