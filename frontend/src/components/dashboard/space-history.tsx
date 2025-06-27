'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { toast } from 'sonner';
import { Star, Users, Calendar } from 'lucide-react';

interface SpaceHistoryEntry {
  joinedAt: string;
  space: {
    id: string;
    name: string;
    creator: { name: string | null };
    _count: { participants: number };
  };
}

const StarRating = ({ spaceId }: { spaceId: string }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleRating = async (newRating: number) => {
    try {
      const response = await fetch('/api/spaces/rate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ spaceId, score: newRating }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      setRating(newRating);
      toast.success('Your rating has been saved!');
    } catch (error) {
      console.error(error);
      toast.error('Could not save your rating. Please try again.');
    }
  };

  return (
    <div className="flex items-center">
      {[...Array(5)].map((_, index) => {
        const ratingValue = index + 1;
        return (
          <button
            key={ratingValue}
            onClick={() => handleRating(ratingValue)}
            onMouseEnter={() => setHover(ratingValue)}
            onMouseLeave={() => setHover(0)}
            className="transition-colors duration-200"
          >
            <Star
              className={`h-5 w-5 ${ratingValue <= (hover || rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`}
            />
          </button>
        );
      })}
    </div>
  );
};

export const SpaceHistory = () => {
  const { data: session, status } = useSession();
  const [history, setHistory] = useState<SpaceHistoryEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated') {
      const fetchHistory = async () => {
        try {
          const response = await fetch('/api/users/space-history');
          if (!response.ok) throw new Error('Failed to fetch space history');
          const data = await response.json();
          setHistory(data);
        } catch (error) {
          console.error(error);
          toast.error('Could not load your space history.');
        } finally {
          setIsLoading(false);
        }
      };
      fetchHistory();
    }
  }, [status]);

  if (status === 'loading' || isLoading) {
    return (
      <Card className="bg-gray-800/50 border-gray-700 text-white">
        <CardHeader>
          <CardTitle>Your Recent Spaces</CardTitle>
          <CardDescription>A log of the conversations you've joined.</CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-16 w-full mb-4" />
          <Skeleton className="h-16 w-full" />
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-gray-800/50 border-gray-700 text-white">
      <CardHeader>
        <CardTitle>Your Recent Spaces</CardTitle>
        <CardDescription>A log of the conversations you've joined.</CardDescription>
      </CardHeader>
      <CardContent>
        {history.length > 0 ? (
          <div className="space-y-4">
            {history.map((entry) => (
              <div key={entry.space.id} className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
                <div>
                  <p className="font-semibold">{entry.space.name}</p>
                  <div className="flex items-center text-sm text-gray-400 mt-1">
                    <Users className="h-4 w-4 mr-2" />
                    <span>{entry.space._count.participants} participants</span>
                    <Calendar className="h-4 w-4 ml-4 mr-2" />
                    <span>{new Date(entry.joinedAt).toLocaleDateString()}</span>
                  </div>
                </div>
                <StarRating spaceId={entry.space.id} />
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">You haven't joined any spaces yet.</p>
        )}
      </CardContent>
    </Card>
  );
};
