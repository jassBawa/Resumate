import { prisma } from './prisma';
import openai from './openai';

export async function processDocument(file: File, threadId: string): Promise<void> {

  const uFile = await openai.files.create({file, purpose: 'assistants'})

  // Upload file to vector store
  const myVectorStoreFile = await openai.vectorStores.files.create(
    process.env.OPENAI_VECTOR_STORE_ID!,
    {
      file_id: uFile.id
    }
  );

  console.log('fileBatch', myVectorStoreFile)

  // Store file reference in database
  await prisma.thread.update({
    where: { id: threadId },
    data: { 
      fileId: uFile.id,
    },
  });
}

