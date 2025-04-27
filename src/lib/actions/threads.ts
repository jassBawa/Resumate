"use server"
import { revalidatePath } from "next/cache"
import { fetchWithAuth } from "../fetchWithAuth";


export async function getThreads() {
  
  try {
    const response = await fetchWithAuth('/api/threads')
    const result = await response.json();

    if (!result.success) {
      console.error("Failed to fetch threads:", result.error);
      return [];
    }

    return result.data;
  } catch (error) {
    console.error("Unexpected error fetching threads:", error);
    return [];
  }
}

export async function createThread(title: string) {
  try {
    const response = await fetchWithAuth(`/api/threads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    const result = await response.json();

    if (!result.success) {
      console.error("Failed to create thread:", result.error);
      throw new Error(result.error);
    }

    revalidatePath("/dashboard");
    return result.data;
  } catch (error) {
    console.error("Unexpected error creating thread:", error);
    throw error;
  }
}