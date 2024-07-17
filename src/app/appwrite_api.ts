import { Client, Users } from 'node-appwrite';

const appwriteApiClient = new Client()

appwriteApiClient
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT || 'https://cloud.appwrite.io/v1')
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID || '669519590004b6369e2e')
    .setKey(process.env.NEXT_PUBLIC_APPWRITE_ADMIN_APIKEY || "de3d57f7b3198c21e142104106a61f3554eacf1b078e33834892e49fd6ddc411d239963a35bb20f221b6e596cdcb0c68e5c409b9d623cf5f1315641c774a44ee500099cc68dca43ca8c5f560cb3906ad2b2efd1c1fe258e687309bd886966fb19b06b0bd26c66e3d802ec0e4c37db25ed06921042bce33a4e961091282768ff1");

export const AppwriteUsersApi = new Users(appwriteApiClient);