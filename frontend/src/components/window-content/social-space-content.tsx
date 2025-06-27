'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { Skeleton } from '@/components/ui/skeleton';
import { PlusCircle, Users } from 'lucide-react';

interface Space {
  id: string;
  name: string;
  roomName: string;
  creator: {
    name: string | null;
  };
  createdAt: string;
}

const CreateSpaceForm = ({ onSpaceCreated }: { onSpaceCreated: () => void }) => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error('Space name cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/spaces', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        throw new Error('Failed to create space');
      }

      setName('');
      toast.success('Space created successfully!');
      onSpaceCreated();
    } catch (error) {
      console.error(error);
      toast.error('Could not create space. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="mb-6 bg-gray-800/50 border-gray-700">
      <CardHeader>
        <CardTitle className="text-white">Create a New Space</CardTitle>
        <CardDescription>Start a conversation on any topic.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex items-center gap-4">
          <Input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What do you want to talk about?"
            className="flex-grow bg-transparent border-gray-600 focus:ring-1 focus:ring-blue-500 text-white"
          />
          <Button type="submit" disabled={isSubmitting || !name.trim()}>
            {isSubmitting ? 'Creating...' : 'Create'}
            <PlusCircle className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export const SocialSpaceContent = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchSpaces = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/spaces');
      if (!response.ok) throw new Error('Failed to fetch spaces');
      const data = await response.json();
      setSpaces(data);
    } catch (error) {
      console.error(error);
      toast.error('Could not fetch available spaces.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSpaces();
    }
  }, [status, fetchSpaces]);

  const handleJoinSpace = (roomName: string) => {
    router.push(`/spaces/${roomName}`);
  };

  if (status === 'loading') {
    return (
      <div className="p-4 md:p-6 h-full overflow-y-auto">
        <Skeleton className="h-32 w-full mb-6" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
        <Skeleton className="h-20 w-full mb-4" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="p-4 h-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2 text-white">Join the Conversation</h2>
          <p className="text-gray-400">Please sign in to access Spaces.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-4 md:p-6 h-full overflow-y-auto text-white">
      <CreateSpaceForm onSpaceCreated={fetchSpaces} />
      
      <h2 className="text-2xl font-bold mb-4 text-white">Active Spaces</h2>
      
      {isLoading ? (
        <>
          <Skeleton className="h-20 w-full mb-4" />
          <Skeleton className="h-20 w-full mb-4" />
        </>
      ) : spaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {spaces.map((space) => (
            <Card key={space.id} className="bg-gray-800/60 border-gray-700 hover:bg-gray-800/80 transition-colors">
              <CardHeader>
                <CardTitle className="text-white truncate">{space.name}</CardTitle>
                <CardDescription>Created by {space.creator.name || 'Anonymous'}</CardDescription>
              </CardHeader>
              <CardContent className="flex justify-between items-center">
                <div className="flex items-center text-gray-400">
                  <Users className="h-4 w-4 mr-2" />
                  {/* Participant count will be added later */}
                  <span className="text-sm">Live</span>
                </div>
                <Button onClick={() => handleJoinSpace(space.roomName)}>Join Space</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-10 border-2 border-dashed border-gray-700 rounded-lg">
          <h3 className="text-xl font-semibold text-white">No Active Spaces</h3>
          <p className="text-gray-400 mt-2">Why not start one?</p>
        </div>
      )}
    </div>
  );
};

export default SocialSpaceContent;
