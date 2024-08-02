'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { useRouter } from 'next/router';
import appwriteService from '@/app/appwrite';
import toast from 'react-hot-toast';

export default function CreateBANK() {
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);
  const [bank_name, setBank_name] = useState('');
  const [account_name, setAccount_name] = useState('');
  const [account_number, setAccount_number] = useState('');
  const [ifsc, setIfsc] = useState('');

  const Submit = async () => {
    setLoading(true);
    setTimeout(async () => {
      const user = await appwriteService.getCurrentUser()
      const addUPI = await appwriteService.addAdminBANK({
        user_Id: user?.$id,
        account_name : account_name,
        bank_name : bank_name,
        account_number : account_number,
        ifsc : ifsc,
      })
      {
        addUPI.$id ?
        toast.success('UPI Added')
        :
        <></>
      }
      setLoading(false);
      closeModal();
    }, 600);
  };

  return (
    <div className="grid grid-cols-1 gap-6 p-6 @container md:grid-cols-2 [&_.rizzui-input-label]:font-medium [&_.rizzui-input-label]:text-gray-900">
      <div className="col-span-full flex items-center justify-between">
        <Title as="h4" className="font-semibold">
          Add a new UPI
        </Title>
        <ActionIcon size="sm" variant="text" onClick={closeModal}>
          <PiXBold className="h-auto w-5" />
        </ActionIcon>
      </div>

      
      <Input
        label="Bank Name"
        placeholder="Bank Name"
        className="col-span-half"
        onChange={(e) => {setBank_name(e.target.value) }}
      />

      <Input
        label="Account Holder Name"
        placeholder="Enter Account Holder Name"
        className="col-span-half"
        onChange={(e) => {setAccount_name(e.target.value) }}
      />

      <Input
        label="Account Number"
        placeholder="Enter Account Number"
        className="col-span-half"
        onChange={(e) => {setAccount_number(e.target.value) }}
      />

      <Input
        label="IFSC Code"
        placeholder="Enter IFSC Code"
        className="col-span-half"
        onChange={(e) => {setIfsc(e.target.value) }}
      />

      <div className="col-span-full flex items-center justify-end gap-4">
        <Button
          variant="outline"
          onClick={closeModal}
          className="w-full @xl:w-auto"
        >
          Cancel
        </Button>
        <Button
          isLoading={isLoading}
          onClick={() => { Submit() }}
          className="w-full @xl:w-auto"
        >
          Add UPI
        </Button>
      </div>
    </div>
  );
}
