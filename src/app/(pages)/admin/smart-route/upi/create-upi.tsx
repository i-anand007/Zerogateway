'use client';

import { useState } from 'react';
import { PiXBold } from 'react-icons/pi';
import { Input, Button, ActionIcon, Title, Select } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import appwriteService from '@/app/appwrite';


export default function CreateUPI() {
  const { closeModal } = useModal();
  const [isLoading, setLoading] = useState(false);
  const [UPI, setUPI] = useState('');
  const [merchant, setMerchant] = useState<object>({
    label: 'Non Merchant', value: 'false'
  });

  const upiType = [
    { label: 'Non Merchant', value: 'false' },
    { label: 'Merchant', value: 'true' },
  ];

  const Submit = async () => {
    const user = await appwriteService.getCurrentUser()
    console.log(user?.$id, UPI, merchant)
    const formattedData = {
      createdAt: new Date(),
    };
    console.log(formattedData)
    setLoading(true);
    setTimeout(() => {
      console.log('formattedData', formattedData);
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
        label="UPI Id"
        placeholder="Enter UPI Id"
        className="col-span-half"
        onChange={(e) => { setUPI(e.target.value) }}
      />

      <Select
        label="UPI Type"
        value={merchant}
        options={upiType}
        onChange={setMerchant}
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
