import { AppwriteUsersApi } from '@/app/appwrite_api';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(req: NextRequest) {
    const data = await req.json()

    try {
        const response = await AppwriteUsersApi.updatePassword(
            data.id, data.password
        )
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    
}