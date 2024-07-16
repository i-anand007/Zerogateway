import { AppwriteUsersApi } from '@/app/appwrite_api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
    try {
        const result = await AppwriteUsersApi.list()
        await console.log("bac"+ result)
        return NextResponse.json(result, { status: 200 });
      } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
      }
}