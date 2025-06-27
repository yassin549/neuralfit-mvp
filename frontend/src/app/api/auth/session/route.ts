import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth-utils';

export async function GET() {
  try {
    const user = await getCurrentUser();
    return NextResponse.json({ user });
  } catch (error) {
    console.error('Failed to get session:', error);
    return NextResponse.json({ user: null, error: 'Authentication check failed' }, { status: 500 });
  }
}
