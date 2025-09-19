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

// Request interceptor - Add token to requests
apiClient.interceptors.request.use(
    (config) => {
        // Try to get token from cookies first
        let token = getToken();

        // If no token in cookies, check if it's already in the request headers
        if (!token && config.headers?.Authorization) {
            const authHeader = config.headers.Authorization as string;
            if (authHeader.startsWith("Bearer ")) {
                token = authHeader.substring(7);
            }
        }

        // Set Authorization header if token exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
