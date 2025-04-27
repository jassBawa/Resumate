import { prisma } from './prisma';
import openai from './openai';
import { ENV_CONFIG } from '@/config/config';

export async function processDocument(
  file: File,
  threadId: string
): Promise<void> {
  const uFile = await openai.files.create({ file, purpose: 'assistants' });

  // Upload file to vector store
  await openai.vectorStores.files.create(ENV_CONFIG.OPENAI_VECTOR_STORE_ID, {
    file_id: uFile.id,
  });

  // Store file reference in database
  await prisma.thread.update({
    where: { id: threadId },
    data: {
      fileId: uFile.id,
    },
  });
}
