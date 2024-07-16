"use client"

import { usersData } from '@/data/users-data';
import axios from 'axios';
import PageHeader from '@/app/shared/page-header';
import ModalButton from '@/app/shared/modal-button';
import RolesGrid from '@/app/shared/users-management/roles-grid';
import UsersTable from '@/app/shared/users-management/users-table';
import CreateRole from '@/app/shared/users-management/create-role';
import { useEffect } from 'react';

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

  useEffect(() => {
    async function getUser() {
      try {
        const response = await axios.get('/api/v1/users');
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    }
    getUser()
    console.log("first")
  }, []);

  

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        <ModalButton label="Add New Role" view={<CreateRole />} />
      </PageHeader>
      <RolesGrid />
      <UsersTable data={usersData} />
    </>
  );
}
