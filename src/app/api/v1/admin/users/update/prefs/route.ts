import { AppwriteUsersApi } from '@/app/appwrite_api';
import { NextRequest, NextResponse } from 'next/server';
import toast from 'react-hot-toast';

export async function PATCH(req: NextRequest) {
    const data = await req.json()
    const prefs = data.prefs
    const userId = data.id
    try {
        if (prefs === 'clear') {
            const update_response = await AppwriteUsersApi.updatePrefs(
                userId,
                prefs
            );
            return NextResponse.json(update_response, { status: 200 });
        }

        const currentPrefs = await AppwriteUsersApi.getPrefs(userId);

        if (typeof prefs === 'object' && !Array.isArray(prefs) && prefs !== null) {
            if ('key' in prefs && 'value' in prefs) {
                currentPrefs[prefs.key] = prefs.value;
            } else {
                Object.assign(currentPrefs, prefs);
            }
        }

        // Update the preferences
        const update_response = await AppwriteUsersApi.updatePrefs(
            userId,
            currentPrefs
        );
        return NextResponse.json(update_response, { status: 200 });
    } catch (error) {
        console.log("updatePrefs error: " + error);
        return NextResponse.json(error, { status: 500 });
    }
}