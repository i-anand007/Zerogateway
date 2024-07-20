'use client';

import dynamic from 'next/dynamic';
import toast from 'react-hot-toast';
import { SubmitHandler, Controller } from 'react-hook-form';
import { PiClock, PiEnvelopeSimple, PiPassword } from 'react-icons/pi';
import { Form } from '@/components/ui/form';
import { Loader, Text, Input, Button } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
// import FormFooter from '@/components/form-footer';
import {
  defaultValues,
  personalInfoFormSchema,
  PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import UploadZone from '@/components/ui/file-upload/upload-zone';
import { countries, roles, timezones } from '@/data/forms/my-details';
import AvatarUpload from '@/components/ui/file-upload/avatar-upload';
import { ProfileHeader } from './profile-settings';
import { useState } from 'react';
import appwriteService from '@/app/appwrite';

const Select = dynamic(() => import('rizzui').then((mod) => mod.Select), {
  ssr: false,
  loading: () => (
    <div className="grid h-10 place-content-center">
      <Loader variant="spinner" />
    </div>
  ),
});

const QuillEditor = dynamic(() => import('@/components/ui/quill-editor'), {
  ssr: false,
});

export default function PersonalInfoView({ $id }: { $id: string }) {

  const [resource, setResource] = useState();

  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event: any) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleClick = () => {
    if (!selectedFile) return;
    appwriteService.uploadFile(selectedFile);
  };


  const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
    toast.success(<Text as="b">Successfully added!</Text>);
    console.log('Profile settings data ->', {
      ...data,
    });
  };

  return (
    <div className='@container'>
      <ProfileHeader
        title="Olivia Rhye"
        description="olivia@example.com"
      />

      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleClick}>Upload File</button>
      </div>



      <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
        <FormGroup
          title="Name"
          className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
        >
          <Input
            placeholder="Full Name"
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
            placeholder="georgia.young@example.com"
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
