import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { prisma } from './db';

export async function getCurrentUser() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user?.email) {
    return null;
  }

  try {
    return await prisma.user.findUnique({
      where: { email: session.user.email },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        emailVerified: true,
      },
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return null;
  }
}

export async function requireUser(redirectTo = '/login') {
  const user = await getCurrentUser();
  
  if (!user) {
    throw new Error('Unauthorized');
  }
  
  return user;
}

export async function requireAdmin() {
  const user = await requireUser('/unauthorized');
  
  if (user.role !== 'ADMIN') {
    throw new Error('Forbidden');
  }
  
  return user;
}

export async function getUserById(id: string) {
  try {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
      },
    });
  } catch (error) {
    console.error('Error fetching user by ID:', error);
    return null;
  }
}

export async function updateUserProfile(
  userId: string,
  data: { name?: string; image?: string }
) {
  return prisma.user.update({
    where: { id: userId },
    data: {
      name: data.name,
      image: data.image,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
    },
  });
}

export async function getUserStats(userId: string) {
  const [journalCount, goalCount, completedGoalCount, moodAverage] = await Promise.all([
    prisma.journalEntry.count({ where: { userId } }),
    prisma.goal.count({ where: { userId } }),
    prisma.goal.count({ where: { userId, completed: true } }),
    prisma.moodEntry.aggregate({
      where: { userId },
      _avg: { mood: true },
    }),
  ]);

  return {
    journalCount,
    goalCount,
    completedGoalCount,
    moodAverage: moodAverage._avg.mood || 0,
  };
}

export async function getRecentActivity(userId: string, limit = 5) {
  const [journalEntries, goals, moodEntries] = await Promise.all([
    prisma.journalEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        content: true,
        mood: true,
        createdAt: true,
      },
    }),
    prisma.goal.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
      take: limit,
      select: {
        id: true,
        title: true,
        completed: true,
        updatedAt: true,
      },
    }),
    prisma.moodEntry.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: limit,
      select: {
        id: true,
        mood: true,
        notes: true,
        createdAt: true,
      },
    }),
  ]);

  // Combine and sort all activities by date
  const activities = [
    ...journalEntries.map((entry) => ({
      ...entry,
      type: 'journal' as const,
      date: entry.createdAt,
    })),
    ...goals.map((goal) => ({
      ...goal,
      type: 'goal' as const,
      date: goal.updatedAt,
    })),
    ...moodEntries.map((entry) => ({
      ...entry,
      type: 'mood' as const,
      date: entry.createdAt,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  return activities.slice(0, limit);
}
