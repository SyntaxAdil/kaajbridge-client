"use server";

import { auth } from "../lib/auth/auth";
import { headers } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";

export async function apiRequest(
  endpoint,
  options = {}
) {
  try {
    const sessionHeaders = await headers();

    const tokenData = await auth.api.getToken({
      headers: sessionHeaders,
    });

    const token = tokenData?.token;

    const requestHeaders = {
      "Content-Type": "application/json",
      ...options.headers,
    };

    if (token) {
      requestHeaders.Authorization = `Bearer ${token}`;
    }

    const response = await fetch(
      `${BASE_URL}${endpoint}`,
      {
        ...options,
        headers: requestHeaders,
        cache: "no-store",
      }
    );

    let data = null;

    try {
      data = await response.json();
    } catch (err) {
      data = null;
    }

    if (!response.ok) {
      console.error("API ERROR:", {
        endpoint,
        status: response.status,
        data,
      });

      throw new Error(
        data?.message ||
        `Request failed with status ${response.status}`
      );
    }

    return data;
  } catch (error) {
    console.error("API REQUEST FAILED:", error);

    throw error;
  }
}