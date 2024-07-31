'use client';


import { useState } from 'react';
import appwriteService from '@/app/appwrite';


export default function UPI() {

  const [selectedFile, setSelectedFile] = useState(null);


  const userData = async () => {
    const data = await appwriteService.getCurrentUser()
    console.log(data)
  }
  userData()

  return (
   <>

   </>
  );
}
