import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const spaceHistory = await prisma.spaceParticipant.findMany({
      where: {
        userId: session.user.id,
      },
      include: {
        space: {
          include: {
            _count: {
              select: { participants: true },
            },
            creator: {
              select: { name: true },
            },
          },
        },
      },
      orderBy: {
        joinedAt: 'desc',
      },
    });

    return NextResponse.json(spaceHistory);

  } catch (error) {
    console.error('Error fetching space history:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
