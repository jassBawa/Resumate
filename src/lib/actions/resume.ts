'use server';
import { fetchWithAuth } from '../fetchWithAuth';

export async function uploadResume(threadId: string, formData: FormData) {
  try {
    const file = formData.get('file') as File;
    if (!file) {
      return { success: false, error: 'No file provided' };
    }

    await fetchWithAuth(`/api/threads/${threadId}/upload-resume`, {
      method: 'PATCH',
      body: formData,
    });

    return { success: true };
  } catch (error) {
    console.error('Unexpected error fetching threads:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}

export async function getResumeSections(threadId: string) {
  try {
    if (!threadId) {
      return { success: false, error: 'Threadid is required', data: null };
    }

    const res = await fetchWithAuth(`/api/threads/${threadId}/resume`);

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
        sections: data.parsedSections,
        threadData: data.threadData,
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

export async function deleteResume(threadId: string) {
  try {
    const response = await fetchWithAuth(
      `/api/threads/${threadId}/delete-resume`,
      {
        method: 'PATCH',
      }
    );

    const result = await response.json();

    if (!response.ok) {
      console.error(
        `Failed to delete resume: ${response.status} - ${result.error}`
      );
      return {
        success: false,
        error: result.error || 'Failed to delete resume',
      };
    }

    return { success: true };
  } catch (error) {
    console.error('Unexpected error deleting resume:', error);
    return {
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    };
  }
}
