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
    <div className="relative flex min-h-screen w-full flex-col justify-center bg-gradient-to-tr from-[#136A8A] to-[#267871] p-2 md:p-4 lg:p-8">
  <div className="mx-auto w-full rounded-xl bg-white px-4 py-9 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl dark:bg-gray-50">
  <div className="">
    <div className="flex items-center justify-between mb-8">
        <div className="flex flex-col items-left">
            <img className="h-8 w-8 mr-2" src="https://tailwindflex.com/public/images/logos/favicon-32x32.png"
                alt="Logo" />
            <div className="text-gray-700 font-semibold text-lg">Your Company Name</div>
        </div>
        <div className="text-gray-700">
            <div className="font-bold text-xl mb-2">INVOICE</div>
            <div className="text-sm">Date: {}</div>
            <div className="text-sm">Invoice #: 66967524002da1bc9b6a</div>
        </div>
    </div>
    <div className="border-b-2 border-gray-300 pb-8 mb-8">
        <h2 className="text-2xl font-bold mb-4">Bill To:</h2>
        <div className="text-gray-700 mb-2">John Doe</div>
        <div className="text-gray-700 mb-2">123 Main St.</div>
        <div className="text-gray-700 mb-2">Anytown, USA 12345</div>
        <div className="text-gray-700">johndoe@example.com</div>
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
                <td className="py-4 text-gray-700">Product 1</td>
                <td className="py-4 text-gray-700 text-right">$100.00</td>
            </tr>
        </tbody>
    </table>
    <div className="flex justify-end mb-8">
        <div className="text-gray-700 mt-1 mr-4">Total:</div>
        <div className="text-gray-700 font-bold text-xl">$450.50</div>
    </div>
    <div className="border-t-2 border-gray-300 pt-8 ">
        <div className="text-gray-700 mb-2">Thank you for doing business with us. Have a great day!</div>
    </div>
</div>
  </div>
</div>
  );
}
