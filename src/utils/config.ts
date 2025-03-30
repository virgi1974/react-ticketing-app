const isProd = import.meta.env.PROD;
export const API_BASE = isProd
  ? `${import.meta.env.VITE_API_URL}/api/v1` // Production: full URL
  : "/api/v1"; // Development: proxy path
