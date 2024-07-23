import { AppwriteUsersApi } from '@/app/appwrite_api';
import { NextRequest, NextResponse } from 'next/server';

export async function DELETE(req: NextRequest) {
    const data = await req.json()
    try {
        await AppwriteUsersApi.delete(data.id);
        return NextResponse.json("Account Deleted", { status: 200 });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500 });
    }
    
}