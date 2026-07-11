"use server";

import { auth } from "../lib/auth/auth";
import { headers } from "next/headers";

const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function apiRequest(endpoint, options = {}) {
  let token = null;

  try {
    const sessionHeaders = await headers();

    const tokenData = await auth.api.getToken({
      headers: sessionHeaders,
    });

    token = tokenData?.token ?? null;
  } catch {}

  const requestHeaders = new Headers(options.headers || {});

  if (!requestHeaders.has("Content-Type") && options.body) {
    requestHeaders.set("Content-Type", "application/json");
  }

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: requestHeaders,
    cache: "no-store",
  });

  let data = null;

  const contentType = response.headers.get("content-type");

  if (contentType?.includes("application/json")) {
    data = await response.json();
  } else {
    data = await response.text();
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        data ||
        `Request failed with status ${response.status}`
    );
  }

  return data;
}
