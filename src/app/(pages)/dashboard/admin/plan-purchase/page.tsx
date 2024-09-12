"use client"

import PageHeader from '@/app/shared/page-header';
import { useEffect, useState } from 'react';
import Loading from '@/components/loading';
import appwriteService from '@/app/appwrite';
import BillingTable from './billing-table';
import toast from 'react-hot-toast';
import { AppwriteUsersApi } from '@/app/appwrite_api';

const pageHeader = {
  title: 'All Plan Purchases ',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Billing',
    },
  ],
};




export default function PlansPage() {
  const [data, setData] = useState(null || {});
  const [allUser, setAllUser] = useState(null || {});
  const [formattedData, setFormattedData] = useState<object | null>(null);

  useEffect(() => {

    async function getBilling() {

      const userId = await appwriteService.getCurrentUser()

      const rawData = await appwriteService.listPayments(
        "userto",
        userId?.$id!
        // "66adf858e2d98ce14727"
      )
      console.log(rawData)
      const all_User = await AppwriteUsersApi.list()
      setAllUser(all_User.users)

      console.log(all_User)
      if (rawData.documents) {
        setData(rawData);

        // Define a function to find user by id and return their name
        const idToUser = (id: string) => {
          const user = all_User.users.find(user => user.$id === id);
          return user ? user.name : "Unknown";
        };

        const checkStatus = (status: boolean) => {
          switch (status) {
            case null:
              return "Pending";
            case true:
              return "Approved";
            case false:
              return "Declined"
          }
        }

        // Format the data after setting Data
        const formattedData = rawData.documents.map(item => ({
          id: item.$id,
          from: idToUser(item.userfrom),
          purpose: item.purpose,
          name: item.name,
          email: item.email,
          phone: item.phone,
          payment_mode: item.payment_mode,
          upi_acc: item.upi_acc,
          amount: item.amount,
          screenshot: item.screenshot,
          createdAt: item.$createdAt,
          status: checkStatus(item.status),
        }));
        setFormattedData(formattedData);
        console.log(formattedData)
      }
    }

    console.log("first")

    getBilling();

  }, []);

  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb}>
        {/* <ModalButton label="Add New Role" view={<CreateRole />} /> */}
      </PageHeader>
      {formattedData === null ? (
        <Loading />
      ) : (
        <BillingTable data={formattedData} />
      )}
    </>
  );
}
