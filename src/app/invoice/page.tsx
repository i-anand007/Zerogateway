'use client';

import Image from 'next/image';
import { Badge } from 'rizzui';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import appwriteService from '../appwrite';
import { AppwriteUsersApi } from '../appwrite_api';


export default function Checkout() {
  const [isLoading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [userData, setUserData] = useState({});
  const [profileImage, setProfileImage] = useState("");
  const [error, setError] = useState(null);

  const searchParams = useSearchParams();
  const paymentId = searchParams.get('id');

  useEffect(() => {
    if (!paymentId) return;

    setLoading(true);

    async function dataFetching() {
      try {
        const response = await appwriteService.getPaymentsInfo(paymentId);
        setData(response.documents[0]);
        const userToData = await AppwriteUsersApi.get(
          response.documents[0].userto
        )
        setUserData(userToData)
        const profileDP = await appwriteService.getFilePreview(userData.prefs.profile_pic)
        console.log(profileDP)
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    }

    dataFetching();
  }, [paymentId]);

  useEffect(() => {
    console.log('Data:', data);
  }, [data]);

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center bg-gradient-to-tr from-[#136A8A] to-[#267871] p-2 md:p-4 lg:p-8">
      <div className="mx-auto w-full rounded-xl bg-white px-4 py-9 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl dark:bg-gray-50">
        <div className="">
        <div className="font-bold text-center text-3xl mb-8 ">INVOICE</div>
          <div className="flex items-center justify-between mb-8">
            <div className="flex flex-col items-left">
              {/* <Image className="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png" */}
              width={50}
              height={50}
                alt="Logo" />
              <div className="text-gray-700 font-semibold text-lg">{userData.name}</div>
            </div>
            <div className="text-gray-700">
              
              <div className="text-sm">Date: {(data.$createdAt)?.slice(0, 10)}</div>
              <div className="text-sm">Invoice No: {data.$id} </div>
            </div>
          </div>
          <div className="flex items-center justify-between mb-8 border-b-2 border-gray-300 ">
            <div className="mb-6">
              <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
              <div className="text-gray-700 mb-2">{userData.name}</div>
              <div className="text-gray-700 mb-2">{userData.email}</div>
            </div>
            <div className="mb-6 text-end">

              {data.status == null ? (
                <Badge color="warning">Pending</Badge>
              ) : data.status == "Rejected" ? (
                <Badge color="danger">Rejected</Badge>
              ) : (
                <Badge>Success</Badge>
              )}

              <h2 className="text-2xl font-bold mb-4">Bill From:</h2>
              <div className="text-gray-700 mb-2">{data.name || "Unknown"}</div>
              <div className="text-gray-700 mb-2">{data.email}</div>
              <div className="text-gray-700 mb-2">{data.phone}</div>
            </div>
          </div>

          <table className="w-full text-left mb-8">
            <thead>
              <tr>
                <th className="text-gray-700 font-bold uppercase py-2">Description</th>
                <th className="text-gray-700 font-bold uppercase py-2 text-right">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="py-4 text-gray-700">{data.purpose}</td>
                <td className="py-4 text-gray-700 text-right">₹{data.amount}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-end mb-8">
            <div className="text-gray-700 mt-1 mr-4">Total:</div>
            <div className="text-gray-700 font-bold text-xl">₹{data.amount}</div>
          </div>

          <div className="border-t-2 border-gray-300 pt-8 ">
            <div className="text-gray-700 mb-2">Thank you for doing business with us. Have a great day!</div>
          </div>
        </div>
      </div>
    </div>
  );
}
