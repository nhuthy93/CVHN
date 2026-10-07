import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const order = await prisma.order.update({
      where: { id: params.id },
      data: {
        pipelineDate: data.pipelineDate,
        content: data.content,
        isDone: data.isDone
      }
    });
    return NextResponse.json(order);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update order' }, { status: 500 });
  }
}
