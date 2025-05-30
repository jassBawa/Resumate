'use server';
// lib/actions/resume.ts
import { ResumeSections } from '@/types';
import { fetchWithAuth } from '../fetchWithAuth';

interface SaveResumeResponse {
  success: boolean;
  data?: {
    updatedAt: string;
  };
  error?: string;
}

export const saveResumeSections = async (
  threadId: string,
  sections: ResumeSections,
  title: string
): Promise<SaveResumeResponse> => {
  try {
    if (!threadId || !sections) {
      return {
        success: false,
        error: 'Thread ID and sections are required',
      };
    }

    const res = await fetchWithAuth(`/api/threads/${threadId}/resume`, {
      method: 'PATCH',
      body: JSON.stringify({ sections, title }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      return {
        success: false,
        error: `Server error: ${errorText}`,
      };
    }

    const responseData = await res.json();

    return {
      success: true,
      data: {
        updatedAt: responseData.updatedAt || new Date().toISOString(), // fallback
      },
    };
  } catch (err: any) {
    console.error('Save failed:', err);
    return {
      success: false,
      error: err?.message || 'An unknown error occurred',
    };
  }
};
