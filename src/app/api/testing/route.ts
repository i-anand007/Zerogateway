// import { AppwriteUsersApi } from '@/app/appwrite_api';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {

//   try {
//     const result = await AppwriteUsersApi.get("668f913800255453fc35")
//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }

// }


import appwriteService from '@/app/appwrite';
import { AppwriteUsersApi } from '@/app/appwrite_api';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const rawdata = await AppwriteUsersApi.list()
  //   const result  = rawdata.users.map(item => ({
  //     id: item.$id,
  //     fullName: item.name,
  //     email: item.email,
  //     role: item.labels.includes("Administrator") ? 'Administrator' : 'Customer',
  //     createdAt: item.$createdAt,
  //     status: item.status ? 'Active' : 'Deactivated', // Example status transformation
  // }));
    return NextResponse.json(rawdata, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}