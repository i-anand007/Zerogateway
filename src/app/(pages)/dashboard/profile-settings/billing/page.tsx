"use client"

import PageHeader from '@/app/shared/page-header';
import { useEffect, useState } from 'react';
import Loading from '@/components/loading';
import appwriteService from '@/app/appwrite';
import BillingTable from '../billing/billing-table';
import toast from 'react-hot-toast';
import { AppwriteUsersApi } from '@/app/appwrite_api';


export default function PlansPage() {
  const [data, setData] = useState(null || {});
  const [allUser, setAllUser] = useState(null || {});
  const [formattedData, setFormattedData] = useState<object | null>(null);

  useEffect(() => {

    async function getBilling() {

      const userId = await appwriteService.getCurrentUser()
      console.log(userId)

      const rawData = await appwriteService.listPayments(
        "userfrom",
        userId?.$id!)
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
          status: item.status ? 'Active' : 'Blocked',
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
    {formattedData === null ? (
      <Loading />
    ) : (
      <BillingTable data={formattedData} />
    )}
  </>
);
}
