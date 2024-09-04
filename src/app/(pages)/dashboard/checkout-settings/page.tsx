'use client'

import React, { useEffect, useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/20/solid";
import { AdvancedCheckbox, Button, CheckboxGroup, Input, Select, Text, Textarea } from 'rizzui';
import appwriteService from "@/app/appwrite";
import FormGroup from "@/app/shared/form-group";
import PageHeader from "@/app/shared/page-header";

const options = [
  {
    value: 'single',
    title: 'Single Payment',
    description: 'Charge a one-time fee',
  },
  {
    value: 'double',
    title: 'Single Payment',
    description: 'Charge a one-time fee',
  }
]

export default function App() {

  const pageHeader = {
    title: 'Profile Settings',
    breadcrumb: [
      {
        href: '/dashboard',
        name: 'Dashboard',
      },
      {
        name: 'Checkout Settings',
      },
    ],
  };


  const Options = [
    { label: 'Enable', value: 'true' },
    { label: 'Disabled', value: 'false' },
  ];

  const [user_id, setUser_id] = useState('')


  const [purpose, setPurpose] = useState({
    "label": "Disabled",
    "value": "false"
  })
  const [name, setName] = useState({
    "label": "Disabled",
    "value": "false"
  })
  const [phone, setPhone] = useState({
    "label": "Disabled",
    "value": "false"
  })
  const [email, setEmail] = useState({
    "label": "Disabled",
    "value": "false"
  })
  const [message, setMessage] = useState()

  useEffect(() => {
    const userInfo = async () => {
      const data = await appwriteService.getCurrentUser()
      setUser_id(data?.$id!)
    }
    userInfo()
    setPurpose({
      "label": "Enable",
      "value": "true"
    })
  }, [])

  return (
    <>

      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <div className='@container'>
        <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">

          <FormGroup
            title="User Input"
            description="You can customize the payment flow and capture customer details by enabling user inputs"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11 grid grid-cols-2 gap-4"  // Use grid with 2 columns
          >

            <Select
              label="Purpose"
              options={Options}
              value={purpose.label}
              onChange={(e: any) => {
                setPurpose(e)
              }}
              className="col-span-1"  
            />

            <Select
              label="Name"
              options={Options}
              value={name.label}
              onChange={(e: any) => {
                setName(e)
              }}
              className="col-span-1" 
            />

            <Select
              label="Phone"
              options={Options}
              value={phone.label}
              onChange={(e: any) => {
                setPhone(e)
              }}
              className="col-span-1" 
            />

            <Select
              label="Email"
              options={Options}
              value={email.label}
              onChange={(e: any) => {
                setEmail(e)
              }}
              className="col-span-1"  // Each select takes half the width
            />

            <Button
              className="w-full col-span-2"  // Button spans the full width of the grid (2 columns)
              onClick={() => {
                appwriteService.updatePrefs(user_id, { 'gender': gender });
              }}
            >
              Update
            </Button>

          </FormGroup>
          <FormGroup
            title="Checkout Message"
            description="The message you set will be visible to your customers on the checkout page"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11 grid grid-cols-2 gap-4"
          >

            <Textarea
              label="Message"
              value={message}
              onChange={(e: any) => {
                console.log(e.target.value)
                // setMessage(e)
              }}
              className="col-span-2"
            />

            <Button
              className="w-full col-span-2"  // Button spans the full width of the grid (2 columns)
              onClick={() => {
                appwriteService.checkout_settings({ 'gender': gender });
              }}
            >
              Update
            </Button>
          </FormGroup>
          <FormGroup
            title="Checkout Advertisement"
            description="The advertisement image you set will be visible to your customers on the checkout page"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11 grid grid-cols-2 gap-4"
          >

            <Textarea
              label="Email"
              value={purpose}
              onChange={(e: any) => {
                setPurpose(e.value)
              }}
              className="col-span-1"
            />

            <Button
              className="w-full col-span-2"  // Button spans the full width of the grid (2 columns)
              onClick={() => {
                appwriteService.updatePrefs({ 'gender': gender });
              }}
            >
              Update
            </Button>
          </FormGroup>
        </div>
      </div>
    </>
  );
}