import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processDocument } from '@/lib/embeddings';
import openai from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.name.endsWith('.docx') && !file.name.endsWith('.pdf')) {
      return NextResponse.json(
        { error: 'Only .docx and .pdf files are supported' },
        { status: 400 }
      );
    }

    // Create OpenAI thread first
    const openaiThread = await openai.beta.threads.create();

    // Use OpenAI thread ID for our database
    const thread = await prisma.thread.create({
      data: {
        id: openaiThread.id,
        userId: 'jass', // Hardcoded user as required
        fileId: file.name,
        resumeText: '',
      },
    });

    // Process the document and store in vector store
    await processDocument(file, openaiThread.id);

    return NextResponse.json({
      success: true,
      threadId: thread.id,
      fileName: file.name,
    });
  } catch (error) {
    console.error('Error uploading file:', error);
    return NextResponse.json(
      { error: 'Error uploading file' },
      { status: 500 }
    );
  }
}
