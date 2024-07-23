"use client"

import PageHeader from '@/app/shared/page-header';
import { useEffect, useState } from 'react';
import Loading from '@/components/loading';
import appwriteService from '@/app/appwrite';
import PlansTable from '@/app/shared/plans/plans-table';
import toast from 'react-hot-toast';

const pageHeader = {
  title: 'Plans ',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Plans',
    },
  ],
};




export default function PlansPage() {
  const [data, setData] = useState(null);
  const [formattedData, setFormattedData] = useState(null);

  useEffect(() => {
    async function getPlans() {
      try {
        const rawData = await appwriteService.listPlan();
        if (rawData.documents) {
          setData(rawData);

          // Format the data here after setting Data
          const formattedData = rawData.documents.map(item => ({
            id: item.$id,
            plan_name: item.plan_name,
            plan_base_price: item.plan_base_price,
            plan_discount: item.plan_discount,
            plan_price: item.plan_price,
            validity: item.validity,
            createdAt: item.$createdAt,
            status: item.status ? 'Active' : 'Blocked',
          }));
          setFormattedData(formattedData); 
        }
      } catch (error) {
        console.error(error);
      }
    }

    getPlans(); // Call the async function inside useEffect

  }, []); 

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ModalButton label="Add New Role" view={<CreateRole />} /> */}
      </PageHeader>
      {formattedData === null ? (
        <Loading />
      ) : (
        <PlansTable data={formattedData} />
      )}
    </>
  );
}
