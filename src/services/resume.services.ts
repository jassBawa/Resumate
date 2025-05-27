import openai from '@/lib/openai';
import { prisma } from '@/lib/prisma';
import { getResumeSystemPrompt } from '@/config/prompts';
import { ENV_CONFIG } from '@/config/config';

export async function parseAndStoreResume(threadId: string) {
  // Fetch the thread
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
  });

  if (!thread || !thread.fileId) {
    throw new Error('Thread or file not found');
  }

  // If parsedSections already exists, return it immediately
  if (thread.parsedSections) {
    return { parsedResume: thread.parsedSections, thread };
  }

  // Fetch resume file content from OpenAI vector store
  const fileContent = await openai.vectorStores.files.content(
    ENV_CONFIG.OPENAI_VECTOR_STORE_ID,
    thread.fileId
  );

  const resumeText = fileContent?.data.map((item) => item.text).join('\n');
  if (!resumeText) {
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
    throw new Error('No response from OpenAI');
  }

  const parsedResumeJSON = JSON.parse(response).parsedResume;
  console.log(parsedResumeJSON);
  if (!parsedResumeJSON) {
    throw new Error('Failed to parse <parsedResume> block');
  }

  // Save parsed sections to the database
  await prisma.thread.update({
    where: { id: thread.id },
    data: { parsedSections: parsedResumeJSON, resumeText: resumeText },
  });

  return { parsedResume: parsedResumeJSON, thread };
}
