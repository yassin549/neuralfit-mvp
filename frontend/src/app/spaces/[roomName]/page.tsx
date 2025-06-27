'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { LiveKitRoom, GridLayout, ParticipantTile, ControlBar, useTracks } from '@livekit/components-react';
import '@livekit/components-styles';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';

export default function SpacePage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();
  const roomName = params?.roomName as string;
  const [token, setToken] = useState<string>('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      toast.error('You must be signed in to join a space.');
      router.push('/?window=Social%20Space'); // Redirect to lobby
      return;
    }

    if (status === 'authenticated' && roomName && session?.user?.name) {
      const fetchToken = async () => {
        try {
          const resp = await fetch(`/api/livekit?room=${roomName}`);
          if (!resp.ok) {
            const errorData = await resp.json();
            throw new Error(errorData.message || 'Failed to fetch access token');
          }
          const data = await resp.json();
          setToken(data.token);
        } catch (e: any) {
          console.error(e);
          toast.error(`Error joining space: ${e.message}`);
          router.push('/?window=Social%20Space');
        }
      };

      fetchToken();
    }
  }, [status, roomName, session, router]);

  const handleLeave = () => {
    router.push('/?window=Social%20Space');
  };

  // This sub-component is necessary so that `useParticipants` is called within the LiveKitRoom context.
  const RoomContent = () => {
    const tracks = useTracks();

    return (
      <div className="relative h-full">
        <main className="h-full">
          <GridLayout tracks={tracks}>
            <ParticipantTile />
          </GridLayout>
        </main>

        <div className="absolute top-1/2 left-4 -translate-y-1/2 p-2 rounded-full bg-black/20 backdrop-blur-lg border border-white/10 shadow-lg">
          <ControlBar />
        </div>
      </div>
    );
  };

  if (status === 'loading' || !token) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-900 text-white">
        <h1 className="text-2xl font-bold mb-4">Connecting to Space...</h1>
        <Skeleton className="w-3/4 h-3/4 rounded-lg" />
      </div>
    );
  }

  return (
    <LiveKitRoom
      video={false}
      audio={true}
      token={token}
      serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
      data-lk-theme="default"
      style={{ height: '100dvh' }}
      onDisconnected={handleLeave}
    >
      <RoomContent />
    </LiveKitRoom>
  );
}
