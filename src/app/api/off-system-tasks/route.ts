import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const tasks = await prisma.offSystemTask.findMany({
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(tasks);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch tasks' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const task = await prisma.offSystemTask.create({
      data: {
        id: data.id,
        content: data.content,
        pipelineDate: data.pipelineDate
      }
    });
    return NextResponse.json(task, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create task' }, { status: 500 });
  }
}
