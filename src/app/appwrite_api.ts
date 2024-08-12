import { Client, Users } from 'node-appwrite';

const appwriteApiClient = new Client()

appwriteApiClient
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_ADMIN_APIKEY!);

export const AppwriteUsersApi = new Users(appwriteApiClient);