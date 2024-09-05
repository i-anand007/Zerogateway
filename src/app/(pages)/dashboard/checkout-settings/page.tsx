'use client'

import React, { useEffect, useState } from "react";
import { AdvancedCheckbox, Button, CheckboxGroup, FileInput, Input, Select, Text, Textarea } from 'rizzui';
import appwriteService from "@/app/appwrite";
import FormGroup from "@/app/shared/form-group";
import PageHeader from "@/app/shared/page-header";
import ImagePreview from "@/app/shared/image-preview";
import EyeIcon from "@/components/icons/eye";
import ModalButton from "@/app/shared/modal-button";
import toast from "react-hot-toast";

export default function App() {

  const pageHeader = {
    title: 'Checkout Settings',
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
    { label: 'Enable', value: true },
    { label: 'Disabled', value: false },
  ];

  const [user_id, setUser_id] = useState('')


  const [purpose, setPurpose] = useState({
    "label": "Disabled",
    "value": false
  })
  const [name, setName] = useState({
    "label": "Disabled",
    "value": false
  })
  const [phone, setPhone] = useState({
    "label": "Disabled",
    "value": false
  })
  const [email, setEmail] = useState({
    "label": "Disabled",
    "value": false
  })
  const [advertisement, setAdvertisement] = useState({
    "label": "Disabled",
    "value": false
  })

  const [message, setMessage] = useState()
  const [advertisementImage, setAdvertisementImage] = useState('')

  useEffect(() => {
    const userInfo = async () => {
      const data = await appwriteService.getCurrentUser()
      setUser_id(data?.$id!)

      const response = await appwriteService.get_checkout_settings(data?.$id!)
      console.log(response)

      function dataToOption (setter: any , data: boolean) {
        if (data === true) {
          setter({ label: 'Enable', value: true })
        } else {
          setter({ label: 'Disabled', value: false })
        }
      }

      dataToOption(setPurpose, response.documents[0].purpose)
      dataToOption(setName, response.documents[0].name)
      dataToOption(setPhone, response.documents[0].phone)
      dataToOption(setEmail, response.documents[0].email)
      dataToOption(setAdvertisement, response.documents[0].advertisement)
      setMessage(response.documents[0].message)
      setAdvertisementImage(response.documents[0].advertisementImage)

    }
    userInfo()
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
                setMessage(e.target.value)
                // setMessage(e)
              }}
              className="col-span-2"
            />

            {/* <Button
              className="w-full col-span-2"  // Button spans the full width of the grid (2 columns)
              onClick={() => {
                appwriteService.checkout_settings(user_id, { 'gender': "sa" });
              }}
            >
              Update
            </Button> */}
          </FormGroup>
          <FormGroup
            title="Checkout Advertisement"
            description="The advertisement image you set will be visible to your customers on the checkout page"
            className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11 grid grid-cols-2 gap-4"
          >
            <Select
              label="Advertisement Image"
              options={Options}
              value={advertisement.label}
              onChange={(e: any) => {
                setAdvertisement(e)
              }}
              className="col-span-1"  
            />
            
            <div className="flex items-end space-x-4">
              <FileInput
                label="Upload Advertisement Image"
                placeholder="dfsgdfg"
                className="flex-grow"
                onChange={async (e: any) => {
                  const response = await appwriteService.uploadFile(e.target.files[0])
                  setAdvertisementImage(response?.$id!)
                  toast.success('Image Loaded')
                }}
              />
              {advertisementImage === '' ?
                <></>
                :
                <ModalButton
                  label=""
                  icon={<EyeIcon className="h-4 w-4" />}
                  view={<ImagePreview id={advertisementImage} />}
                  customSize="650px"
                  className="flex-col max-w-4"
                />
              }
            </div>

            <Button
              className="w-full col-span-2"  // Button spans the full width of the grid (2 columns)
              onClick={async () => {

               await appwriteService.checkout_settings(user_id, { 
                  'purpose': purpose.value,
                  'name': name.value,
                  'phone': phone.value,
                  'email': email.value,
                  'message' : message,
                  'advertisement' : advertisement.value,
                  'advertisementImage' : advertisementImage
                });
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