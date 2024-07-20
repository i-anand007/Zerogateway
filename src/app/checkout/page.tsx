'use client';

import Image from 'next/image';
import { Button, Input, FileInput, Title } from 'rizzui';
import { QRCode } from 'react-qrcode-logo';
import { useState } from 'react';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import * as animationData from '@/components/lottie/loading-hand.json'

import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import Loading from '@/components/loading';
import Lottie from 'lottie-react';


export default function Checkout() {
  const [isLoading, setLoading] = useState(false)
  const [Amount, setAmount] = useState('')
  const [UTR, setUTR] = useState('')
  const [BankTxnID, setBankTxnID] = useState('')
  const [Screenshot, setScreenshot] = useState('')
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const formData = {
    amount: Amount,
    utr: UTR,
    bankTxnId: BankTxnID,
    Screenshot
  }
  const onSubmit = () => {
    console.log(formData)
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center bg-gradient-to-tr from-[#136A8A] to-[#267871] p-4 md:p-12 lg:p-28">
      <div className={'mx-auto w-full max-w-md rounded-xl bg-white px-4 py-9 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl dark:bg-gray-50'} >
        <div className="flex flex-col items-center">

          {isLoading ? <Lottie animationData={animationData} /> :
            <>
              <div className="relative -top-1/3 aspect-square w-[110px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[130px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[200px]">
                <Image
                  src="https://isomorphic-furyroad.s3.amazonaws.com/public/profile-image.webp"
                  alt="profile-pic"
                  fill
                  sizes="(max-width: 768px) 100vw"
                  className="aspect-auto"
                />
              </div>
              <Title
                as="h2"
                className="mb-7 text-center text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-10 lg:text-4xl lg:leading-normal"
              >
                Paying to  {' '}
                <span className="bg-gradient-to-r from-[#136A8A] to-[#267871] bg-clip-text text-transparent">
                  User
                </span>

              </Title>

              <Tabs defaultValue="upi" className="items-center content-center">
                <TabsList className="grid grid-cols-2 ">
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                  <TabsTrigger value="bank">BANK</TabsTrigger>
                </TabsList>
                <TabsContent value="upi">
                  <Form
                    onSubmit={onSubmit}
                  >
                    {() => (
                      <div className="space-y-5 lg:space-y-6 mt-5 w-96">
                        <Input
                          type="number"
                          size={isMedium ? 'lg' : 'xl'}
                          label="Amount ₹"
                          placeholder="Enter Amount"
                          onChange={(e) => setAmount(e.target.value)}
                          className="[&>label>span]:font-medium col-s"
                        />
                        {Amount === '' ?

                          <></> :
                          <>
                            <h3>Pay With UPI</h3>
                            <div className="flex flex-row mt-3 items-center border rounded-lg shadow md:flex-row md:max-w-xl ">
                              <QRCode value="upi://pay?pa=patyes@yesbank" qrStyle="dots" eyeRadius={5} />
                              <div className="flex flex-col justify-between p-6 leading-normal items-center">
                                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">Scan the QR using any UPI app on your phone</h5>
                                <Image src="/images/upi_apps_icons.png" alt={''} width={200} height={50} />
                              </div>
                            </div>

                            <Input
                              label="UTR"
                              placeholder="Enter your UTR"
                              size={isMedium ? 'lg' : 'xl'}
                              className="[&>label>span]:font-medium"
                            />

                            <FileInput label="Upload Screenshot" onChange={(e) => setScreenshot(e.target.files[0])} />

                            <Button
                              className="w-full"
                              type="submit"
                              size={isMedium ? 'lg' : 'xl'}
                            >
                              Proceed
                            </Button>
                          </>
                        }

                      </div>
                    )}
                  </Form>
                </TabsContent>

                <TabsContent value="bank">
                  <Form
                    onSubmit={onSubmit}
                  >
                    {() => (
                      <div className="space-y-5 lg:space-y-6 mt-5">
                        <Input
                          type="number"
                          size={isMedium ? 'lg' : 'xl'}
                          label="Amount ₹"
                          placeholder="Enter Amount"
                          className="[&>label>span]:font-medium col-s"
                        />

                        <h3>Pay With UPI</h3>
                        <div className="flex flex-col mt-3 items-center border rounded-lg shadow md:flex-row md:max-w-xl ">
                          <div className="flex flex-col justify-between p-6 leading-normal items-center">
                            <div className="mb-2 text-xl font-bold tracking-tight text-gray-900">Scan the QR using any UPI app on your phone</div>
                          </div>
                        </div>

                        <Input
                          label="Bank Txn ID"
                          placeholder="Enter your Bank Txn ID"
                          size={isMedium ? 'lg' : 'xl'}
                          className="[&>label>span]:font-medium"
                        />

                        <Button
                          className="w-full"
                          type="submit"
                          size={isMedium ? 'lg' : 'xl'}
                        >
                          Proceed
                        </Button>
                      </div>
                    )}
                  </Form>
                </TabsContent>
              </Tabs>
            </>
          }
        </div>
      </div>
    </div>
  );
}
