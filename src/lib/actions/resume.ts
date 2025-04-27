'use server';
import { extractResumeSections } from '@/config/parseSections';
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


export async function getResumeSections(threadId: string)  {
  try {
    if (!threadId) {
      return { success: false, error: 'Threadid is required', data: null };
    }

    const res = await fetchWithAuth(`/api/threads/${threadId}/resume`);

    if (!res.ok) {
      return { success: false, error: 'Failed to fetch resume content', data: null };
    }
    const data = await res.json();
    const parsedResumeSections = extractResumeSections(data.response);

    return {
      success: true,
      data: { sections: parsedResumeSections, resumeText: data.response },
      error:null
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
