'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Password, Switch, Button, Input, Text, Tab } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { ProfileHeader } from '../shared/account-settings/profile-settings';

const initialValues = {
  email: '',
  password: '',
  isAgreed: false,
};

export default function SignUpForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const [reset, setReset] = useState({});
  const onSubmit = (data: any) => {
    console.log(data);
    setReset({ ...initialValues, isAgreed: false });
  };

  return (
    <>



      <Form
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="number"
              size={isMedium ? 'lg' : 'xl'}
              label="Amount ₹"
              placeholder="Enter Amount"
              className="[&>label>span]:font-medium col-s"
              {...register('email')}
              error={errors.email?.message}
            />
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              className="[&>label>span]:font-medium"
              {...register('password')}
              error={errors.password?.message}
            />


            <Tab >
              <Tab.List className="flex justify-center font-medium col-s">
                <Tab.ListItem>
                  UPI
                </Tab.ListItem>
                <Tab.ListItem>
                  BANK
                </Tab.ListItem>

              </Tab.List>
              <Tab.Panels>
                <Tab.Panel>
                  <div>
                    <h3>Pay With UPI</h3>
                    <a href="#" className="flex flex-col mt-3 items-centerborder rounded-lg shadow md:flex-row md:max-w-xl ">
                      <Image className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" 
                      src="https://isomorphic-furyroad.s3.amazonaws.com/public/profile-image.webp"
                      alt="profile-pic"
                      width={500}
                      height={500}
                      />
                        <div className="flex flex-col justify-between p-6 leading-normal">
                          <h5 className="mb-2text-2xl font-bold tracking-tight text-gray-900">Scan the QR using any UPI app on your phone</h5>
                          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.</p>
                        </div>
                    </a>
                  </div>
                </Tab.Panel>
                <Tab.Panel><h5 className="mb-2text-2xl font-bold tracking-tight text-gray-900 text-center">Bank payments not enabled</h5></Tab.Panel>
              </Tab.Panels>
            </Tab>


            <Button
              className="w-full"
              type="submit"
              size={isMedium ? 'lg' : 'xl'}
            >
              Create Account
            </Button>
          </div>
        )}
      </Form>


    </>
  );
}
