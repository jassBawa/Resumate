import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { processDocument } from '@/lib/embeddings';
import { auth } from '@clerk/nextjs/server';

export async function PATCH(request: Request,   { params }: { params: Promise<{ id: string }> }) {
  try {
    const { userId } = await auth();
    if (!userId) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

    const {id: threadId} = await params;
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    if (!file.name.endsWith('.docx') && !file.name.endsWith('.pdf')) {
      return NextResponse.json({ error: 'Only .docx or .pdf files allowed' }, { status: 400 });
    }

    // Update thread with fileId first
    await prisma.thread.update({
      where: { id: threadId },
      data: {
        fileId: file.name,
      },
    });

    // Process embeddings
    await processDocument(file, threadId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error uploading resume' }, { status: 500 });
  }
}
