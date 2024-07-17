"use client"

import axios from 'axios';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import RolesGrid from '@/app/shared/users-management/roles-grid';
import UsersTable from '@/app/shared/users-management/users-table';
import CreateRole from '@/app/shared/users-management/create-role';
import { useEffect, useState } from 'react';
import { usersData } from '@/data/users-data';
import Loading from '@/components/loading';
import { useSearchParams  } from 'next/navigation'

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



export default function BlankPage() {
  const [Data, setData] = useState(null)
  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get('/api/v1/users');
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

  // useEffect(() => {
  //   const searchParams  = useSearchParams()
  //   const search = searchParams.get('id')
  //   async function getEditUser() {
  //     try {
  //       const response = await axios.get('/api/v1/users');
  //       if (response) {
  //         setData(response.data);
  //       }
  //       console.log(response);
        
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }
  //   getUser()
  //   console.log(search)
  // }, []);

  

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
