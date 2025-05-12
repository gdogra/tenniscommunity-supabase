// src/app/api/matches/route.ts
import { NextResponse } from 'next/server';
import fakeData from '@/data/fakeData.json';

export async function GET() {
  return NextResponse.json(fakeData.matches);
}

