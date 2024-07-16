import { Query } from 'appwrite';
import { NextRequest, NextResponse } from 'next/server';
import { Client, Users } from 'node-appwrite';

export async function GET(req: NextRequest) {

    const client = new Client()

        .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
        .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '66891c1700100c0a7591')
        .setKey('7a7d17c5e2be9b4e8b8454764f108060e3aa3c8d531cfc5f1b28a33356cd45958870c8d6a8e17a65e7701f4e7b325b28a3dc23a2ead8a0c593719efb184bc3f12da9c146fffee009dda06d59baf8bca263aff95671dc1ec9ede9520c00d2602353fdd0a904303132356e72daaab19f022f5f9cd432065502cd773cad864bc268'); // Your secret API key


    const users = new Users(client);
    const result = await users.list(
        [
            Query.equal("name", "Anand Mishra")
        ],
        // 'helloentrepreneurs0077'
    );
    try {
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        return NextResponse.json({error}, { status: 500 });
    }
}
