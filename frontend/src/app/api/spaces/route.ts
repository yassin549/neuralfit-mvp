import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

// GET all spaces
export async function GET() {
  try {
    const spaces = await prisma.space.findMany({
      orderBy: { createdAt: 'desc' },
      include: {
        creator: {
          select: { name: true, image: true },
        },
      },
    });
    return NextResponse.json(spaces);
  } catch (error) {
    console.error('Error fetching spaces:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}

// POST a new space
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const { name } = await req.json();
    if (!name) {
      return NextResponse.json({ message: 'Space name is required' }, { status: 400 });
    }

    // Generate a unique room name to avoid conflicts
    const roomName = `${name.replace(/\s+/g, '-')}-${uuidv4()}`;

    const space = await prisma.space.create({
      data: {
        name,
        roomName,
        creatorId: session.user.id,
      },
    });

    return NextResponse.json(space, { status: 201 });
  } catch (error) {
    console.error('Error creating space:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
