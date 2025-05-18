import { connectToDB } from '@/lib/db';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectToDB();
    return NextResponse.json({ status: 'success' });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to connect to DB' }, { status: 500 });
  }
}
