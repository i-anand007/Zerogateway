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
import { loginSchema, LoginSchema } from '@/utils/validators/login.schema';
import { checkoutUpiSchema, CheckoutUpiSchema } from '@/utils/validators/checkout-upi.schema';


export default function Checkout() {
  const [isLoading, setLoading] = useState(false)
  const [Amount, setAmount] = useState('')
  const [UTR, setUTR] = useState('')
  const [BankTxnID, setBankTxnID] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const formData = {
    amount: Amount,
    utr: UTR,
    bankTxnId: BankTxnID,
    screenshot
  }
  const onSubmit = () => {
    console.log(formData)
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col justify-center bg-gradient-to-tr from-[#136A8A] to-[#267871] p-4 md:p-12 lg:p-28">
  <div className="mx-auto w-full rounded-xl bg-white px-4 py-9 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl dark:bg-gray-50">
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
            Paying to {'- '}
            <span className="bg-gradient-to-r from-[#136A8A] to-[#267871] bg-clip-text text-transparent">
              User
            </span>
          </Title>

          <div className="space-y-5 lg:space-y-6 mb-5">
            <Input
              type="number"
              size={isMedium ? 'lg' : 'xl'}
              label="Amount ₹"
              placeholder="Enter Amount"
              onChange={(e) => setAmount(e.target.value)}
              className="[&>label>span]:font-medium col-s w-full" // Adjusted to w-full for full width
            />
          </div>

          {/* Other form elements or components */}
          
        </>
      }

    </div>
  </div>
</div>
  );
}
