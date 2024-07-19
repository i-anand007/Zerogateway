import { AppwriteUsersApi } from '@/app/appwrite_api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const data = await req.json()
    try {
      const result = await AppwriteUsersApi.updateStatus(
        data.id , data.status
      )
      return NextResponse.json(result, { status: 200 });
    } catch (error) {
      return NextResponse.json({ error }, { status: 500 });
    }
  }