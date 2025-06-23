import openai from '@/lib/openai';
import { prisma } from '@/lib/prisma';
import { getResumeSystemPrompt } from '@/config/prompts';
import { ENV_CONFIG } from '@/config/config';
import { applyDiff, createDiff } from '@/lib/utils';

export async function parseAndStoreResume(threadId: string) {
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
    const latestVersion = await prisma.resumeVersion.findFirst({
      where: { threadId: thread.id },
      orderBy: { createdAt: 'desc' },
      select: { id: true },
    });

    return {
      thread,
      currentVersionId: latestVersion?.id ?? null,
    };
  }

  // Fetch resume file content from OpenAI vector store
  const fileContent = await openai.vectorStores.files.content(
    ENV_CONFIG.OPENAI_VECTOR_STORE_ID,
    thread.fileId
  );

  const resumeText = fileContent?.data.map(item => item.text).join('\n');
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
    console.error('[parseAndStoreResume] No response from OpenAI');
    throw new Error('No response from OpenAI');
  }

  const parsedResumeJSON = JSON.parse(response).parsedResume;
  if (!parsedResumeJSON) {
    console.error('[parseAndStoreResume] Failed to parse <parsedResume> block');
    throw new Error('Failed to parse <parsedResume> block');
  }

  // Create first diff version (from empty object {})
  const initialDiff = JSON.parse(JSON.stringify(createDiff({}, parsedResumeJSON)));
  const version = await prisma.resumeVersion.create({
    data: {
      threadId: thread.id,
      diff: initialDiff,
      title: 'Initial full version',
    },
  });

  // Create new assistant thread
  const openaiThread = await openai.beta.threads.create();
  // Add the new parsedSections as first message to thread
  const openaiThreadRes = await openai.beta.threads.messages.create(openaiThread.id, {
    role: 'user',
    content: `This is my updated resume in JSON:\n\n${JSON.stringify(parsedResumeJSON)}`,
  });

  await prisma.thread.update({
    where: { id: thread.id },
    data: {
      parsedSections: parsedResumeJSON,
      resumeText: resumeText,
      openaiThreadId: openaiThreadRes.thread_id,
    },
  });

  return { thread, currentVersionId: version?.id ?? null };
}

export async function updateResumeSections(
  threadId: string,
  newSections: any,
  title = `Changes at ${new Date().toLocaleString()}`
) {
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: {
      versions: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!thread) {
    throw new Error('Thread not found');
  }

  const base = thread.parsedSections ?? {};

  const diff = JSON.parse(JSON.stringify(createDiff(base, newSections)));

  // Skip if no meaningful diff
  if (!diff || Object.keys(diff).length === 0) {
    return { updatedAt: new Date().toISOString(), skipped: true };
  }

  // Create new assistant thread
  const openaiThread = await openai.beta.threads.create();

  // Add the new parsedSections as first message to thread
  const openaiRes = await openai.beta.threads.messages.create(openaiThread.id, {
    role: 'user',
    content: `This is my updated resume in JSON:\n\n${JSON.stringify(newSections)}`,
  });

  await prisma.resumeVersion.create({
    data: {
      threadId,
      diff,
      title,
    },
  });

  const result = await prisma.thread.update({
    where: { id: threadId },
    data: {
      parsedSections: newSections,
      updatedAt: new Date(),
      openaiThreadId: openaiRes.thread_id,
    },
  });

  return { updatedAt: result.updatedAt.toISOString(), skipped: false };
}

export async function revertToVersion(threadId: string, versionId: string) {
  const thread = await prisma.thread.findUnique({
    where: { id: threadId },
    include: {
      versions: {
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!thread) throw new Error('Thread not found');

  const targetIndex = thread.versions.findIndex(v => v.id === versionId);
  if (targetIndex === -1) throw new Error('Version not found');

  // Start reconstruction from empty object
  let reconstructed: any = {};

  for (let i = 0; i <= targetIndex; i++) {
    let diff = thread.versions[i].diff;

    if (typeof diff === 'string') {
      diff = JSON.parse(diff);
    }

    if (!diff) {
      throw new Error(`Missing diff data at version index ${i}`);
    }

    try {
      reconstructed = applyDiff(reconstructed, diff);
    } catch (err) {
      console.error(`[revertToVersion] Error applying diff at index ${i}`, err);
      throw new Error(`Failed to apply diff at index ${i}`);
    }
  }

  const now = new Date();

  const currentState = thread.parsedSections ?? {};
  const revertDiff = JSON.parse(JSON.stringify(createDiff(currentState, reconstructed)));

  // Save new version only if state changed
  if (Object.keys(revertDiff).length > 0) {
    await prisma.resumeVersion.create({
      data: {
        threadId,
        diff: revertDiff,
        title: `Reverted to version ${targetIndex + 1} at ${now.toISOString()}`,
      },
    });
  }

  const updated = await prisma.thread.update({
    where: { id: threadId },
    data: {
      parsedSections: reconstructed,
      updatedAt: now,
    },
  });

  return {
    parsedSections: reconstructed,
    updatedAt: updated.updatedAt.toISOString(),
  };
}
