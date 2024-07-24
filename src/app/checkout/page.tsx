'use client';

import Image from 'next/image';
import { Button, Input, FileInput, Title, Tooltip, ActionIcon } from 'rizzui';
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
import { checkoutUpiSchema, CheckoutUpiSchema } from '@/utils/validators/checkout-upi.schema';
import { checkoutBankSchema, CheckoutBankSchema } from '@/utils/validators/checkout-bank.schema';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { PiChecksBold, PiFilesBold } from 'react-icons/pi';
import BankCard from '@/components/cards/bank-card';


export default function Checkout(
) {
  const [isLoading, setLoading] = useState(false)
  const [ID, setID] = useState<number>()
  const [name, setname] = useState<string>()
  const [amount, setAmount] = useState<number>()
  const [amountDisable, setAmountDisable] = useState<boolean>()
  const [UPI_ID, setUPI_ID] = useState<string>()
  const [UPI_TYPE_Merchant, setUPI_TYPE_Merchant] = useState<boolean>()
  const [isPurpose, setIsPurpose] = useState<boolean>()
  const [purpose, setPurpose] = useState<string>()
  const [isBank, setIsBank] = useState<boolean>()
  const [bank_Name, setBank_Name] = useState<string>()
  const [account_No, setAccount_No] = useState<number>()
  const [account_Name, setAccount_Name] = useState<number>()
  const [IFSC, setIFSC] = useState<string>()
  const [UTR, setUTR] = useState<string>()
  const [BankTxnID, setBankTxnID] = useState<string>()
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const [isCopied, setIsCopied] = useState(false);
  const [state, copyToClipboard] = useCopyToClipboard();
  
  const formData = {
    amount,
    utr: UTR,
    bankTxnId: BankTxnID,
    screenshot
  }

  const onSubmit = () => {
    console.log(formData)
  };


  const handleCopyToClipboard = (data: string) => {
    copyToClipboard(data);
    setIsCopied(() => true);
    setTimeout(() => {
      setIsCopied(() => false);
    }, 3000);
  };


  return (

    <div className="relative flex min-h-screen w-full flex-col justify-center bg-gradient-to-tr from-[#136A8A] to-[#267871] p-4 md:p-12 lg:p-28">
      <div className={'mx-auto w-full max-w-md rounded-xl bg-white px-4 py-9 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl dark:bg-gray-50'} >
        <div className="absolute top-0 right-0 mt-2 mr-2 bg-black text-white px-2 py-1 rounded-md">
          ID -
        </div>
        <div className="items-center">

          {isLoading ? <Lottie animationData={animationData} /> :
            <>
              <div className="flex flex-row mb-5 items-center">
                <div className="relative -top-1/5 aspect-square w-[70px] overflow-hidden rounded-full border-[6px] bg-gray-100 shadow-profilePic @2xl:w-[80px] @5xl:-top-2/3 @5xl:w-[150px] dark:border-gray-50 3xl:w-[100px]">
                  <Image
                    src="https://isomorphic-furyroad.s3.amazonaws.com/public/profile-image.webp"
                    alt="profile-pic"
                    fill
                    className=""
                  />
                </div>
                <Title
                  as="h2"
                  className="rizzui-title-h3 font-bold ml-4 text-[16px] leading-snug md:text-xl md:!leading-normal lg:text-xl lg:leading-normaltex"
                >
                  Paying to  {' '}  <br />
                  <span className="bg-gradient-to-r from-[#136A8A] to-[#267871] bg-clip-text text-transparent text-center text-[20px] leading-snug md:text-2xl md:!leading-normal lg:text-2xl lg:leading-normaltex ">
                    User
                  </span>

                </Title>
              </div>

              <div className="space-y-5 lg:space-y-6 mb-5">
                <Input
                  type="number"
                  size={isMedium ? 'lg' : 'xl'}
                  label="Amount ₹"
                  placeholder="Enter Amount"
                  value={amount}
                  className="[&>label>span]:font-medium col-s"
                  readOnly={amountDisable}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    const value = e.target.value.trim();
                    if (value === '' || !isNaN(parseFloat(value))) {
                      setAmount(value === '' ? undefined : parseFloat(value));
                    }
                  }}
                />
              </div>

              {amount == null || isNaN(amount) ? (
                <></>
              ) : (
                <Tabs defaultValue="upi" className="items-center content-center">
                <TabsList className="grid grid-cols-2 ">
                  <TabsTrigger value="upi">UPI</TabsTrigger>
                  <TabsTrigger value="bank">BANK</TabsTrigger>
                </TabsList>
                <TabsContent value="upi">
                  <Form<CheckoutUpiSchema>
                    validationSchema={checkoutUpiSchema}
                    onSubmit={onSubmit}
                  >
                    {({ register, formState: { errors } }) => (
                      <div className="space-y-5 lg:space-y-6 mt-5">

                        <>
                          <div className="flex flex-row items-center border rounded-lg shadow md:flex-row md:max-w-xl ">
                            <QRCode value="upi://pay?pa=patyes@yesbank" qrStyle="dots" eyeRadius={5} />
                            <div className="flex flex-col justify-between p-2 leading-normal ">
                              <h5 className="text-[14px] leading-snug md:text-l md:!leading-normal lg:text-xl lg:leading-normaltex">Scan the QR using any UPI app on your phone</h5>
                              <Image className='m-3' src="/images/upi_apps_icons.png" alt={''} width={150} height={50} />
                              <BankCard title='UPI ID' data={UPI_ID}/>
                            </div>
                          </div>

                          <Input
                            label="UTR"
                            placeholder="Enter your UTR"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('utr')}
                            error={errors.utr ? "Please provide correct UTR." : undefined}
                            onChange={(e) => setUTR(e.target.value)}
                          />

                          <FileInput label="Upload Screenshot"
                            {...register('screenshot')}
                            error={errors.screenshot ? "Please Upload Image" : undefined}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                setScreenshot(files[0]);
                              }
                            }}
                          />

                          <Button
                            className="w-full"
                            type="submit"
                            size={isMedium ? 'lg' : 'xl'}
                          >
                            Proceed
                          </Button>
                        </>
                      </div>
                    )}
                  </Form>
                </TabsContent>

                <TabsContent value="bank">
                  <Form<CheckoutBankSchema>
                    validationSchema={checkoutBankSchema}
                    onSubmit={onSubmit}
                  // onSubmit={onSubmit}
                  >
                    {({ register, formState: { errors } }) => (
                      <div className="space-y-5 lg:space-y-6 mt-5">

                        <>
                          <div className="space-y-2 lg:space-y-2">
                      
                            <BankCard title={"Bank Name"} data={bank_Name}/>
                            <BankCard title={"A/C Holder's Name"} data={account_Name}/>
                            <BankCard title={"A/C Number"} data={account_No}/>
                            <BankCard title={"IFSC Code"} data={IFSC}/>

                          </div>

                          <Input
                            label="Bank Txn ID"
                            placeholder="Enter Bank Txn ID"
                            size={isMedium ? 'lg' : 'xl'}
                            className="[&>label>span]:font-medium"
                            {...register('utr')}
                            error={errors.utr ? "Please provide correct UTR." : undefined}
                            onChange={(e) => setUTR(e.target.value)}
                          />

                          <FileInput label="Upload Screenshot"
                            {...register('screenshot')}
                            error={errors.screenshot ? "Please Upload Image" : undefined}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const files = e.target.files;
                              if (files && files.length > 0) {
                                setScreenshot(files[0]);
                              }
                            }}
                          />

                          <Button
                            className="w-full"
                            type="submit"
                            size={isMedium ? 'lg' : 'xl'}
                          >
                            Proceed
                          </Button>
                        </>
                      </div>
                    )}
                  </Form>
                </TabsContent>


              </Tabs>
              )}

              
            </>
          }
        </div>
      </div>
    </div>
  );
}
