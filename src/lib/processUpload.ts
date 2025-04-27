import { prisma } from './prisma';
import openai from './openai';
import { ENV_CONFIG } from '@/config/config';

export async function processUpload(
  file: File,
  threadId: string
): Promise<void> {
  try {
    // Step 1: Upload file to OpenAI for embeddings
    const uFile = await openai.files.create({ file, purpose: 'assistants' });

    // Step 2: Upload file to vector store (for embeddings storage)
    await openai.vectorStores.files.create(ENV_CONFIG.OPENAI_VECTOR_STORE_ID, {
      file_id: uFile.id,
    });

    // Step 3: Store file reference in database
    await prisma.thread.update({
      where: { id: threadId },
      data: {
        fileId: uFile.id, // Save the OpenAI file ID (not just the file name)
      },
    });
  } catch (error) {
    console.error('Error processing document:', error);
    throw new Error('Failed to process document with OpenAI');
  }
}
