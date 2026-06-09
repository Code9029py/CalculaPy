/**
 * Persistencia simple de las calculadoras visitadas por el usuario.
 * Guarda los slugs en localStorage en orden de uso (más reciente primero).
 * Se usa para la sección "Usadas recientemente" de la home.
 */

const STORAGE_KEY = "calcupy:recent-calculators";
const MAX_STORED = 10;

function safeGet(): string[] {
  if (typeof window === "undefined") {
    return [];
  }
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    const parsed: unknown = JSON.parse(stored);
    return Array.isArray(parsed)
      ? parsed.filter((value): value is string => typeof value === "string")
      : [];
  } catch {
    return [];
  }
}

function safeSet(list: string[]) {
  if (typeof window === "undefined") {
    return;
  }
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch {
    // Ignorar errores (modo privado, cuota llena, etc.)
  }
}

/**
 * Registra una calculadora como usada ahora. La mueve al frente del
 * historial. Idempotente: registrar la misma calculadora dos veces no
 * duplica entradas.
 */
export function recordCalculatorUse(slug: string) {
  if (!slug) {
    return;
  }
  const current = safeGet();
  const filtered = current.filter((stored) => stored !== slug);
  filtered.unshift(slug);
  safeSet(filtered.slice(0, MAX_STORED));
}

/**
 * Devuelve los slugs más recientes (máximo `limit`, default 3).
 * El primero del array es el último usado.
 */
export function getRecentCalculators(limit = 3): string[] {
  return safeGet().slice(0, Math.max(0, limit));
}
