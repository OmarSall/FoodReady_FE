export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://localhost:3000";

export const ENDPOINTS = {
    COMPANIES: {
        REGISTER: "/companies/register",
    }
} as const;