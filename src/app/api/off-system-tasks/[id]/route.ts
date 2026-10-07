import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const task = await prisma.offSystemTask.update({
      where: { id: params.id },
      data: {
        content: data.content,
        pipelineDate: data.pipelineDate
      }
    });
    return NextResponse.json(task);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update task' }, { status: 500 });
  }
}
