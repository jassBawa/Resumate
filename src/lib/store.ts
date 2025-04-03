import { ThreadData, FileData } from '@/types';

class Store {
  private threads: Map<string, ThreadData> = new Map();
  private files: Map<string, FileData> = new Map();

  // Thread operations
  createThread(user: string, threadId: string): ThreadData {
    const thread: ThreadData = {
      user,
      threadId,
      fileIds: [],
      createdAt: new Date().toISOString(),
    };
    this.threads.set(threadId, thread);
    return thread;
  }

  getThread(threadId: string): ThreadData | undefined {
    return this.threads.get(threadId);
  }

  // File operations
  addFile(fileId: string, fileName: string, threadId: string): FileData {
    const file: FileData = {
      id: fileId,
      name: fileName,
      threadId,
      uploadedAt: new Date().toISOString(),
    };
    this.files.set(fileId, file);

    // Update thread's fileIds
    const thread = this.threads.get(threadId);
    if (thread) {
      thread.fileIds.push(fileId);
    }

    return file;
  }

  getFile(fileId: string): FileData | undefined {
    return this.files.get(fileId);
  }

  // Get all files for a thread
  getThreadFiles(threadId: string): FileData[] {
    return Array.from(this.files.values()).filter(file => file.threadId === threadId);
  }
}

export const store = new Store(); 