'use client';

import { useEffect, useState } from 'react';
import appwriteService from '@/app/appwrite';
import Loading from '@/components/loading';
import Table from './table';


export default function UPI() {
  const [Data, setData] = useState<any>(null)
  
  useEffect(() => {
    async function getUser() {
      const user = await appwriteService.getCurrentUser()
      try {
        const response = await appwriteService.listUserUPI(user?.$id!);
        if (response) {
          setData(response);
        }        
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
    
  }, []);  

  return (
    <>
    {Data === null ? (
      <Loading/>
    ) : (
      <Table data={Data} />
    )}
  </>
  );
}
