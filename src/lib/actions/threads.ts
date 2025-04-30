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
    }); // Assuming this is a GET request for a specific thread
    const result = await response.json();

    if (!result.success) {
      console.error(
        `Failed to fetch thread with ID ${threadId}:`,
        result.error
      );
      return { data: null, error: 'Failed to fetch thread' }; // Return null if no thread found
    }
    return { data: result.data, error: null };
  } catch (error) {
    console.error(
      `Unexpected error fetching thread with ID ${threadId}:`,
      error
    );
    return {
      data: null,
      error: `Unexpected error fetching thread with ID ${threadId}: ${error}`,
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
    // console.log(result);
    return { data: result.data, error: null, sucess: true };
  } catch (error) {
    console.error(
      `Unexpected error fetching  resume with public ID ${publicId}:`,
      error
    );
    return {
      data: null,
      error: `Unexpected error fetching public ID ${publicId}: ${error}`,
    };
  }
}
