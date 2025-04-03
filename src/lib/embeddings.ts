import { prisma } from './prisma';
import openai from './openai';

export async function processDocument(file: File, threadId: string): Promise<void> {
  // Upload file to vector store
  const fileBatch = await openai.vectorStores.fileBatches.uploadAndPoll(
    process.env.OPENAI_VECTOR_STORE_ID!,
    {
      files: [file],
    }
  );

  console.log('fileBatch', fileBatch)

  // Store file reference in database
  await prisma.thread.update({
    where: { id: threadId },
    data: { 
      fileId: file.name,
    },
  });
}

