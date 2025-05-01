// lib/apiFetch.ts
'use server';

import { ENV_CONFIG } from '@/config/config';
import { auth } from '@clerk/nextjs/server';

export async function fetchWithAuth(path: string, options: RequestInit = {}) {
  const { getToken } = await auth();
  const token = await getToken();
  const headers = new Headers(options.headers);
  if (token) {
    headers.set('Authorization', `Bearer ${token}`);
  }
  const baseUrl = ENV_CONFIG.BASE_URL;

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store',
  });

  return response;
}
