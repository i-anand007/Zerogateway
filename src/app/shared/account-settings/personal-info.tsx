'use client';

import toast from 'react-hot-toast';
import Image from 'next/image';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiEnvelopeSimple, PiPassword, PiSealCheckFill, PiUserCircleThin } from 'react-icons/pi';
import { Loader, Text, Input, Button, cn, Title, FileInput } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import { useBerylliumSidebars } from '@/layouts/beryllium/beryllium-utils';
import {
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import { useEffect, useState } from 'react';
import appwriteService from '@/app/appwrite';
import Cookies from 'js-cookie';

export function ProfileHeader({
  title,
  description,
  children,
}: React.PropsWithChildren<{ title?: string; description?: string; profie_image?: string }>) {
  const { layout } = useLayout();
  const { expandedLeft } = useBerylliumSidebars();

  return (
    <div
      className={cn(
        'relative z-0 pt-10  ',
        layout === LAYOUT_OPTIONS.BERYLLIUM 
      )}
    >
      <div className="relative z-10 mx-auto flex w-full flex-wrap items-center justify-start border-b border-dashed border-muted pb-10">
        <div className="relative -top-1/3 aspect-square w-[80px] overflow-hidden rounded-full border-[6px] border-white bg-gray-100 shadow-profilePic @2xl:w-[100px] @5xl:-top-2/3 @5xl:w-[100px] dark:border-gray-50 3xl:w-[100px]">
          <img
            src={Cookies.get("profile_pic")}
            alt="profile-pic"
            className="aspect-auto"
          />
        </div>
        <div className='ml-5'>
          <Title
            as="h2"
            className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900"
          >
            {title}
            {/* <PiSealCheckFill className="h-5 w-5 text-primary md:h-6 md:w-6" /> */}
          </Title>

            <Text className="text-sm text-gray-500">{description}</Text>

        </div>
        {children}
      </div>
    </div>
  );
}

export default function PersonalInfoView() {

  interface UserData {
    name: string;
    email: string;
  }

  const [selectedFile, setSelectedFile] = useState(null);  
  const[userData, setUserData] = useState<UserData  | null>()

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const uploadProfileImage = async () => {
    if (!selectedFile) return;
    const response = await appwriteService.uploadFile(selectedFile);
    const pImage = await appwriteService.getFilePreview(response.$id)
    await appwriteService.updatePrefs({'profile_pic': response.$id });
    Cookies.set("profile_pic", pImage.href)
  };


  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  useEffect(() => {
    const userData = async () => {
      const data = await appwriteService.getCurrentUser()
      setUserData(data)
      console.log(data)
    }
    userData()
  });

  return (
    <div className='@container'>
      <ProfileHeader
        title={Cookies.get("user_name")}
        description={Cookies.get("user_email")}
      />

      <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
        <FormGroup
          title="Profile Image"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <FileInput
            placeholder="Profile Image"
            className="flex-grow"
            onChange={handleFileChange}
          />
          <Button
            className="w-full"
            onClick={uploadProfileImage}
          >
            Update Profile Image
          </Button>
        </FormGroup>

        <FormGroup
          title="Name"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            placeholder={userData?.name}
            className="flex-grow"
            onChange={() => { }}
          />
          <Button
            className="w-full"
            onClick={() => { }}
          >
            Update Name
          </Button>
        </FormGroup>

        <FormGroup
          title="Email Address"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            className="flex-grow"
            prefix={
              <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
            }
            type="email"
            placeholder={userData?.email}
            onChange={() => { }}
          />

          <Button
            className="w-full"
            onClick={() => { }}
          >
            Update Email
          </Button>

        </FormGroup>

        <FormGroup
          title="Password"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            className="flex-grow"
            prefix={
              <PiPassword className="h-6 w-6 text-gray-500" />
            }
            type="text"
            placeholder=""
            onChange={() => { }}
          />

          <Button
            className="w-full"
            onClick={() => { }}
          >
            Update Password
          </Button>
        </FormGroup>
      </div>
    </div> 
    
    // <Form<PersonalInfoFormTypes>
    //   validationSchema={personalInfoFormSchema}
    //   // resetValues={reset}
    //   onSubmit={onSubmit}
    //   className="@container"
    //   useFormProps={{
    //     mode: 'onChange',
    //     defaultValues,
    //   }}
    // >
    //   {({ register, control, setValue, getValues, formState: { errors } }) => {
    //     return (
    //       <>





    //         <div>
    //           <input type="file" onChange={handleFileChange} />
    //           <button onClick={handleClick}>Upload File</button>
    //         </div>


    //         <FormGroup
    //           title="Your Photo"
    //           description="This will be displayed on your profile."
    //           className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
    //         >
    //           <div className="flex flex-col gap-6 @container @3xl:col-span-2">
    //             <AvatarUpload
    //               name="avatar"
    //               setValue={setValue}
    //               getValues={getValues}
    //               error={errors?.avatar?.message as string}
    //             />
    //           </div>
    //         </FormGroup>

    //         <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
    //           <FormGroup
    //             title="Name"
    //             className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
    //           >
    //             <Input
    //               placeholder="Full Name"
    //               error={errors.first_name?.message}
    //               className="flex-grow"
    //               onChange={() => { }}
    //             />
    //             <Button
    //               className="w-full"
    //               onClick={() => { }}
    //             >
    //               Update Name
    //             </Button>
    //           </FormGroup>

    //           <FormGroup
    //             title="Email Address"
    //             className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
    //           >
    //             <Input
    //               className="flex-grow"
    //               prefix={
    //                 <PiEnvelopeSimple className="h-6 w-6 text-gray-500" />
    //               }
    //               type="email"
    //               placeholder="georgia.young@example.com"
    //               {...register('email')}
    //               error={errors.email?.message}
    //               onChange={() => { }}
    //             />

    //             <Button
    //               className="w-full"
    //               onClick={() => { }}
    //             >
    //               Update Email
    //             </Button>

    //           </FormGroup>

    //           <FormGroup
    //             title="Password"
    //             className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
    //           >
    //             <Input
    //               className="flex-grow"
    //               prefix={
    //                 <PiPassword className="h-6 w-6 text-gray-500" />
    //               }
    //               type="text"
    //               placeholder=""
    //               onChange={() => { }}
    //             />

    //             <Button
    //               className="w-full"
    //               onClick={() => { }}
    //             >
    //               Update Password
    //             </Button>

    //           </FormGroup>




    //           {/* <FormGroup
    //             title="Role"
    //             className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
    //           >
    //             <Controller
    //               control={control}
    //               name="role"
    //               render={({ field: { value, onChange } }) => (
    //                 <Select
    //                   dropdownClassName="!z-10"
    //                   inPortal={false}
    //                   placeholder="Select Role"
    //                   options={roles}
    //                   onChange={onChange}
    //                   value={value}
    //                   className="col-span-full"
    //                   getOptionValue={(option) => option.value}
    //                   displayValue={(selected) =>
    //                     roles?.find((r) => r.value === selected)?.label ?? ''
    //                   }
    //                   error={errors?.role?.message as string}
    //                 />
    //               )}
    //             />
    //           </FormGroup>

    //           <FormGroup
    //             title="Country"
    //             className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
    //           >
    //             <Controller
    //               control={control}
    //               name="country"
    //               render={({ field: { onChange, value } }) => (
    //                 <Select
    //                   dropdownClassName="!z-10"
    //                   inPortal={false}
    //                   placeholder="Select Country"
    //                   options={countries}
    //                   onChange={onChange}
    //                   value={value}
    //                   className="col-span-full"
    //                   getOptionValue={(option) => option.value}
    //                   displayValue={(selected) =>
    //                     countries?.find((con) => con.value === selected)
    //                       ?.label ?? ''
    //                   }
    //                   error={errors?.country?.message as string}
    //                 />
    //               )}
    //             />
    //           </FormGroup>

    //           <FormGroup
    //             title="Timezone"
    //             className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
    //           >
    //             <Controller
    //               control={control}
    //               name="timezone"
    //               render={({ field: { onChange, value } }) => (
    //                 <Select
    //                   dropdownClassName="!z-10"
    //                   inPortal={false}
    //                   prefix={<PiClock className="h-6 w-6 text-gray-500" />}
    //                   placeholder="Select Timezone"
    //                   options={timezones}
    //                   onChange={onChange}
    //                   value={value}
    //                   className="col-span-full"
    //                   getOptionValue={(option) => option.value}
    //                   displayValue={(selected) =>
    //                     timezones?.find((tmz) => tmz.value === selected)
    //                       ?.label ?? ''
    //                   }
    //                   error={errors?.timezone?.message as string}
    //                 />
    //               )}
    //             />
    //           </FormGroup>

    //           <FormGroup
    //             title="Bio"
    //             className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
    //           >
    //             <Controller
    //               control={control}
    //               name="bio"
    //               render={({ field: { onChange, value } }) => (
    //                 <QuillEditor
    //                   value={value}
    //                   onChange={onChange}
    //                   className="@3xl:col-span-2 [&>.ql-container_.ql-editor]:min-h-[100px]"
    //                   labelClassName="font-medium text-gray-700 dark:text-gray-600 mb-1.5"
    //                 />
    //               )}
    //             />
    //           </FormGroup>

    //           <FormGroup
    //             title="Portfolio Projects"
    //             description="Share a few snippets of your work"
    //             className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
    //           >
    //             <div className="mb-5 @3xl:col-span-2">
    //               <UploadZone
    //                 name="portfolios"
    //                 getValues={getValues}
    //                 setValue={setValue}
    //                 error={errors?.portfolios?.message as string}
    //               />
    //             </div>
    //           </FormGroup> */}
    //         </div>

    //         {/* <FormFooter
    //           // isLoading={isLoading}
    //           altBtnText="Cancel"
    //           submitBtnText="Save"
    //         /> */}
    //       </>
    //     );
    //   }}
    // </Form>
  );
}
