'use server';
import { revalidatePath } from 'next/cache';
import { fetchWithAuth } from '../fetchWithAuth';

export async function getThreads() {
  try {
    const response = await fetchWithAuth('/api/threads');
    const result = await response.json();

    if (!result.success) {
      console.error('Failed to fetch threads:', result.error);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error('Unexpected error fetching threads:', error);
    return [];
  }
}

export async function getThreadById(threadId: string) {
  try {
    const response = await fetchWithAuth(`/api/threads/${threadId}`, {
      next: {
        tags: [`thread-${threadId}`],
      },
    });
    const result = await response.json();

    if (!response.ok) {
      if (response.status === 404) {
        console.warn(`Thread not found with ID ${threadId}`);
        return { data: null, error: 'Thread not found', status: 404 };
      }
      console.error(`Failed to fetch thread with ID ${threadId}:`, result);
      return { data: null, error: 'Failed to fetch thread', status: response.status };
    }

    if (!result.success) {
      console.error(`Failed to fetch thread with ID ${threadId}:`, result);
      return { data: null, error: 'Failed to fetch thread', status: 500 };
    }

    return { data: result.data, error: null, status: 200 };
  } catch (error) {
    console.error(`Unexpected error fetching thread with ID ${threadId}:`, error);
    return {
      data: null,
      error: `Unexpected error fetching thread with ID ${threadId}: ${error}`,
      status: 500,
    };
  }
}

export async function createThread(title: string) {
  try {
    const response = await fetchWithAuth(`/api/threads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error('Failed to create thread:', result.error);
      throw new Error(result.error);
    }

    revalidatePath('/dashboard');
    return result.data;
  } catch (error) {
    console.error('Unexpected error creating thread:', error);
    throw error;
  }
}

export async function getShareableResumeById(publicId: string) {
  try {
    const response = await fetchWithAuth(`/api/public-resume/${publicId}`); // Assuming this is a GET request for a specific thread
    const result = await response.json();

    if (response.status == 404) {
      return { data: null, error: result, status: 404 };
    }
    return { data: result.data, error: null, status: 200 };
  } catch (error) {
    console.error(`Unexpected error fetching  resume with public ID ${publicId}:`, error);
    return {
      data: null,
      error: `Unexpected error fetching public ID ${publicId}: ${error}`,
      status: 500,
    };
  }
}

export async function updateResumeSharing(threadId: string, isSharable: boolean) {
  try {
    const response = await fetchWithAuth(`/api/threads/${threadId}`, {
      method: 'PATCH',
      body: JSON.stringify({ isSharable }),
    });
    const result = await response.json();

    if (!response.ok) {
      return {
        data: null,
        error: result.error || 'Failed to update sharing status',
        success: false,
      };
    }

    return {
      data: result.thread,
      error: null,
      success: true,
    };
  } catch (error) {
    console.error(`Unexpected error updating resume with thread ID ${threadId}:`, error);
    return {
      data: null,
      error: `Unexpected error: ${error}`,
      success: false,
    };
  }
}
