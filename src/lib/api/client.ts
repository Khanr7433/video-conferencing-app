import axios from "axios";

const getToken = (): string | null => {
    if (typeof document !== "undefined") {
        const cookieMatch = document.cookie.match(/token=([^;]+)/);
        if (cookieMatch) return cookieMatch[1];
    }

    return null;
};

export const apiClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_DOMAIN || "",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,
});

apiClient.interceptors.request.use(
    (config) => {
        let token = getToken();

        if (!token && config.headers?.Authorization) {
            const authHeader = config.headers.Authorization as string;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
