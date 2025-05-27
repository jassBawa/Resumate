import openai from '@/lib/openai';
import { prisma } from '@/lib/prisma';
import { getResumeSystemPrompt } from '@/config/prompts';
import { ENV_CONFIG } from '@/config/config';

export async function parseAndStoreResume(threadId: string) {
  console.log('[parseAndStoreResume] Called with threadId:', threadId);

  // Fetch the thread
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
  });

  if (!thread || !thread.fileId) {
    console.warn('[parseAndStoreResume] Thread or file not found');
    throw new Error('Thread or file not found');
  }
  if (
    thread.parsedSections &&
    typeof thread.parsedSections === 'object' &&
    Object.keys(thread.parsedSections).length > 0
  ) {
    console.log('[parseAndStoreResume] Returning cached parsedSections');
    return { parsedResume: thread.parsedSections, thread };
  }

  // Fetch resume file content from OpenAI vector store
  const fileContent = await openai.vectorStores.files.content(
    ENV_CONFIG.OPENAI_VECTOR_STORE_ID,
    thread.fileId
  );

  const resumeText = fileContent?.data.map((item) => item.text).join('\n');
  if (!resumeText) {
    console.error('[parseAndStoreResume] Resume text not found');
    throw new Error('Resume text not found');
  }

  // Use OpenAI to parse the resume
  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    messages: [
      { role: 'system', content: getResumeSystemPrompt() },
      { role: 'user', content: resumeText },
    ],
  });

  const response = completion.choices[0].message.content;
  if (!response) {
    console.error('[parseAndStoreResume] No response from OpenAI');
    throw new Error('No response from OpenAI');
  }

  const parsedResumeJSON = JSON.parse(response).parsedResume;

  if (!parsedResumeJSON) {
    console.error('[parseAndStoreResume] Failed to parse <parsedResume> block');
    throw new Error('Failed to parse <parsedResume> block');
  }

  // Save parsed sections to the database
  await prisma.thread.update({
    where: { id: thread.id },
    data: {
      parsedSections: parsedResumeJSON,
      resumeText: resumeText,
    },
  });

  console.log('[parseAndStoreResume] Parse and save complete.');
  return { thread };
}
