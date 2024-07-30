// import { AppwriteUsersApi } from '@/app/appwrite_api';
// import { NextRequest, NextResponse } from 'next/server';

// export async function GET(req: NextRequest) {
//   try {
//     const result = await AppwriteUsersApi.list()
//     return NextResponse.json(result, { status: 200 });
//   } catch (error) {
//     return NextResponse.json({ error }, { status: 500 });
//   }
// }



import { AppwriteUsersApi } from '@/app/appwrite_api';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const rawdata = await AppwriteUsersApi.list()
    const result  = rawdata.users.map(item => ({
      id: item.$id,
      fullName: item.name,
      email: item.email,
      phone: item.phone,
      role: item.labels.includes("Administrator") ? 'Administrator' : 'Customer',
      createdAt: item.$createdAt,
      status: item.status ? 'Active' : 'Blocked', 
      KYCstatus: item.prefs.KYC ? item.prefs.KYC : 'Pending', 
  }));
    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
}