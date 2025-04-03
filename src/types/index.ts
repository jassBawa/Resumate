export interface ThreadData {
  user: string;
  threadId: string;
  fileIds: string[];
  createdAt: string;
}

export interface FileData {
  id: string;
  name: string;
  threadId: string;
  uploadedAt: string;
}