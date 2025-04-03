import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import { prisma } from '@/lib/prisma';
import { processDocument } from '@/lib/embeddings';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    if (!file.name.endsWith('.docx')) {
      return NextResponse.json(
        { error: 'Only .docx files are supported' },
        { status: 400 }
      );
    }

    // Create a unique ID for this resume
    const uniqueId = uuidv4();

    // Create a thread for this resume
    const thread = await prisma.thread.create({
      data: {
        id: uniqueId,
        userId: 'jass',
        fileId: file.name,
      },
    });

    // Process the document and store in vector store
    await processDocument(file, thread.id);

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
