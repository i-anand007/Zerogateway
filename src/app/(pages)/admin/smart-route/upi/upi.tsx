'use client';


import { useEffect, useState } from 'react';
import appwriteService from '@/app/appwrite';
import axios from 'axios';
import Loading from '@/components/loading';
import Table from './table';


export default function UPI() {

  const [selectedFile, setSelectedFile] = useState(null);

  const [Data, setData] = useState(null)
  
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get('/api/v1/admin/users');
        if (response) {
          setData(response.data);
        }
        console.log(response);
        
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
      <Table data={Data} /> // Render UsersTable once usersData is not null
    )}
  </>
  );
}
