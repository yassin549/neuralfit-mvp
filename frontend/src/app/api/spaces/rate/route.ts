import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const { spaceId, score } = await req.json();

    if (!spaceId || !score) {
      return NextResponse.json({ message: 'Missing spaceId or score' }, { status: 400 });
    }

    if (typeof score !== 'number' || score < 1 || score > 5) {
        return NextResponse.json({ message: 'Score must be a number between 1 and 5' }, { status: 400 });
    }

    // Use upsert to create a new rating or update an existing one
    const rating = await prisma.rating.upsert({
      where: {
        userId_spaceId: {
          userId: session.user.id,
          spaceId: spaceId,
        },
      },
      update: {
        score: score,
      },
      create: {
        userId: session.user.id,
        spaceId: spaceId,
        score: score,
      },
    });

    return NextResponse.json(rating, { status: 201 });

  } catch (error) {
    console.error('Error submitting rating:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
