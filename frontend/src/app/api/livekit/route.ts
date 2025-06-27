import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/lib/auth';
import { AccessToken } from 'livekit-server-sdk';
import prisma from '@/lib/prisma';

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.id || !session.user.name) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    const url = new URL(req.url);
    const room = url.searchParams.get('room');

    if (!room) {
      return NextResponse.json({ message: 'Missing "room" query parameter' }, { status: 400 });
    }

    const space = await prisma.space.findUnique({
      where: { roomName: room },
    });

    if (!space) {
      return NextResponse.json({ message: 'Space not found' }, { status: 404 });
    }

    const apiKey = process.env.LIVEKIT_API_KEY;
    const apiSecret = process.env.LIVEKIT_API_SECRET;
    const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

    if (!apiKey || !apiSecret || !wsUrl) {
      console.error('LiveKit server environment variables are not set');
      return NextResponse.json({ message: 'LiveKit server configuration error' }, { status: 500 });
    }

    const at = new AccessToken(apiKey, apiSecret, {
      identity: session.user.id,
      name: session.user.name,
    });

    at.addGrant({ room, roomJoin: true, canPublish: true, canSubscribe: true });

    const token = await at.toJwt();

    // Record user participation
    await prisma.spaceParticipant.upsert({
      where: { userId_spaceId: { userId: session.user.id, spaceId: space.id } },
      update: {},
      create: { userId: session.user.id, spaceId: space.id },
    });

    return NextResponse.json({ token });

  } catch (error) {
    console.error('Error generating LiveKit token:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
