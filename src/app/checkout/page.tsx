import SignUpForm from './sign-up-form';
import Image from 'next/image';
import { metaObject } from '@/config/site.config';
import { cn, Tab, Title } from 'rizzui';

export const metadata = {
  ...metaObject('Sign Up 3'),
};

export default function Checkout() {
  return (
    <>



      <div className="relative flex min-h-screen w-full flex-col justify-center bg-gradient-to-tr from-[#136A8A] to-[#267871] p-4 md:p-12 lg:p-28">
        <div className={'mx-auto w-full max-w-md rounded-xl bg-white px-4 py-9 sm:px-6 md:max-w-xl md:px-10 md:py-12 lg:max-w-[700px] lg:px-16 xl:rounded-2xl 3xl:rounded-3xl dark:bg-gray-50'} >
          <div className="flex flex-col items-center">
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
              User
            </Title>
          </div>
          <SignUpForm />
        </div>
      </div>

    </>
  );
}
