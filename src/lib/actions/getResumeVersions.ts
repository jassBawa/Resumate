'use server';
import { ResumeVersion } from '@prisma/client';
import { fetchWithAuth } from '../fetchWithAuth';
import { ResumeSections } from '@/config/parseSections';

export async function getResumeVersions(threadId: string) {
  try {
    if (!threadId) {
      return { success: false, error: 'Threadid is required', data: null };
    }

    const res = await fetchWithAuth(`/api/threads/${threadId}/versions`);

    if (!res.ok) {
      return {
        success: false,
        error: 'Failed to fetch resume content',
        data: null,
      };
    }
    const data = await res.json();
    return {
      success: true,
      data: {
        versions: data.versions as ResumeVersion[],
      },
      error: null,
    };
  } catch (error) {
    console.error('Unexpected error fetching threads:', error);
    return {
      success: false,
      data: null,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
export async function revertToVersionAction(
  threadId: string,
  versionId: string
) {
  try {
    if (!threadId) {
      return { success: false, error: 'Threadid is required', data: null };
    }

    const res = await fetchWithAuth(
      `/api/threads/${threadId}/revert/${versionId}`,
      { method: 'PATCH' }
    );

    if (!res.ok) {
      return {
        success: false,
        error: 'Failed to revert',
        data: null,
      };
    }
    const data = await res.json();
    console.log(data);
    return {
      success: true,
      data: data.parsedSections as ResumeSections,
      error: null,
    };
  } catch (error) {
    console.error('Unexpected error fetching threads:', error);
    return {
      success: false,
      data: null,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
