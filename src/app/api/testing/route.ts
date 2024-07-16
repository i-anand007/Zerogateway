import { AppwriteUsersApi } from '@/app/appwrite_api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {

  try {
    const result = await AppwriteUsersApi.get("668f913800255453fc35")
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }

}
