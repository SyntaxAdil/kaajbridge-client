import { auth } from "../lib/auth/auth";
import { headers as getNextHeaders } from "next/headers";

const BASE_URL = process.env.NEXT_PUBLIC_URL || "/api";

export async function apiRequest(endpoint, options = {}) {
    const { token } = await auth.api.getToken({
        headers: await getNextHeaders(),
    });

    const requestHeaders = {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
    };

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: requestHeaders,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "API request failed");
    }

    return response.json();
}