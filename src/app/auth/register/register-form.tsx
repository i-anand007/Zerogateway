'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SubmitHandler } from 'react-hook-form';
import { Password, Checkbox, Button, Input, Text } from 'rizzui';
import { useMedia } from '@/hooks/use-media';
import { Form } from '@/components/ui/form';
import { routes } from '@/config/routes';
import { RegisterSchema, registerSchema } from '@/utils/validators/register.schema';
import appwriteService from '@/app/appwrite';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const initialValues = {
  fullName: '',
  email: '',
  password: '',
};

export default function RegisterForm() {
  const isMedium = useMedia('(max-width: 1200px)', false);
  const router = useRouter();
  const [reset, setReset] = useState({});
  const onSubmit: SubmitHandler<RegisterSchema> = async (data) => {
    console.log("hii");
    console.log(data);
    const email = data.email
    const name = data.name
    // const phone = `+91${data.number.toString()}`
    const password = data.password
    const response = await appwriteService.createUserAccount({ email, password, name })
    console.log(response)
    if (response.$id) {
      await appwriteService.updatePrefs({
        payment_pages: 0,
        validity: new Date(),
        profile_pic: "",
      })
      // const updatePhonne = await appwriteService.updatePhone({ phone, password})
      // await console.log(updatePhonne)
      toast.success('Account Created')
      // router.push('/');
    } else if (!response.$id) {
      toast.error('Account Not Created')
    }
    setReset({ ...initialValues});
  };

  return (
    <>
      <Form<RegisterSchema>
        validationSchema={registerSchema}
        resetValues={reset}
        onSubmit={onSubmit}
        useFormProps={{
          defaultValues: initialValues,
        }}
      >
        {({ register, formState: { errors } }) => (
          <div className="space-y-5 lg:space-y-6">
            <Input
              type="text"
              size={isMedium ? 'lg' : 'xl'}
              label="Full Name"
              placeholder="Enter your Full Name"
              className="[&>label>span]:font-medium"
              {...register('name')}
              error={errors.email?.message}
            />
            <Input
              type="email"
              size={isMedium ? 'lg' : 'xl'}
              label="Email"
              placeholder="Enter your email"
              className="[&>label>span]:font-medium"
              {...register('email')}
              error={errors.email?.message}
            />
            {/* <Input
              type="number"
              size={isMedium ? 'lg' : 'xl'}
              label="Mobile Number"
              placeholder="Enter your Mobile Number"
              className="[&>label>span]:font-medium"
              {...register('number')}
              error={errors.number?.message}
            /> */}
            <Password
              label="Password"
              placeholder="Enter your password"
              size={isMedium ? 'lg' : 'xl'}
              {...register('password')}
              className="[&>label>span]:font-medium"
              error={errors.password?.message}
            />
            {/* <div className="col-span-2 flex items-start text-gray-700">
              <Checkbox
                {...register('isAgreed')}
                className="[&>label.items-center]:items-start [&>label>div.leading-none]:mt-0.5 [&>label>div.leading-none]:sm:mt-0 [&>label>span]:font-medium"
                label={
                  <Text as="span" className="ps-1 text-gray-500">
                    By signing up you have agreed to our{' '}
                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      Terms
                    </Link>{' '}
                    &{' '}
                    <Link
                      href="/"
                      className="font-semibold text-gray-700 transition-colors hover:text-primary"
                    >
                      Privacy Policy
                    </Link>
                  </Text>
                }
              />
            </div> */}
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
      <Text className="mt-6 text-center text-[15px] leading-loose text-gray-500 md:mt-7 lg:mt-9 lg:text-base">
        Already have an account?{' '}
        <Link
          href={"/auth/login"}
          className="font-semibold text-gray-700 transition-colors hover:text-primary"
        >
          Sign In
        </Link>
      </Text>
    </>
  );
}
