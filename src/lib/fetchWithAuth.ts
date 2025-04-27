// lib/apiFetch.ts
"use server";

import { auth } from "@clerk/nextjs/server";

export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const { getToken } = await auth();
  const token = await getToken();

  if (!token) {
    throw new Error("Authentication token missing.");
  }

  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return response;
}
