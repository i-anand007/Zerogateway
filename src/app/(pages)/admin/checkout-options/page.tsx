"use client"

import axios from 'axios';
import PageHeader from '@/app/shared/page-header';
import UsersTable from '@/app/shared/users-management/users-table';
import { useEffect, useState } from 'react';
import Loading from '@/components/loading';

const pageHeader = {
  title: 'Users and Management ',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Users Management',
    },
  ],
};



export default function UsersManagement() {
  
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
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ModalButton label="Add New Role" view={<CreateRole />} /> */}
      </PageHeader>
      {/* <RolesGrid /> */}
      {Data === null ? (
        <Loading/>
      ) : (
        <UsersTable data={Data} /> // Render UsersTable once usersData is not null
      )}
    </>
  );
}
