'use client';

import toast from 'react-hot-toast';
import Image from 'next/image';
import { SubmitHandler, Controller, useForm } from 'react-hook-form';
import { PiEnvelopeSimple, PiPassword, PiSealCheckFill, PiUserCircleThin } from 'react-icons/pi';
import { Loader, Text, Input, Button, cn, Title, FileInput, Textarea, Select, Badge } from 'rizzui';
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
import { zodResolver } from '@hookform/resolvers/zod';
import { kycUserSchema, KycUserSchema } from '@/utils/validators/kyc-user.schema';
import { z } from 'zod';

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
                <div className='ml-5 flex flex-row'>
                    <Title
                        as="h2"
                        className="mb-2 inline-flex items-center gap-3 text-xl font-bold text-gray-900"
                    >
                        {title} -
                    </Title>
                    <Badge className={`mb-2 ml-2 inline-flex items-center gap-3 text-xl font-bold ${
                        description === 'approved' ? 'bg-green-500' : 'bg-orange-500'
                      }`}
                    >{description}</Badge>
                </div>
                {children}
            </div>
        </div>
    );
}

export default function SubmitKyc() {

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event: any) => {
        setSelectedFile(event.target.files[0]);
    };

    const uploadFile = () => {
        if (!selectedFile) return;
        appwriteService.uploadFile(selectedFile);
    };


    const onSubmit: SubmitHandler<PersonalInfoFormTypes> = (data) => {
        toast.success(<Text as="b">Successfully added!</Text>);
        console.log('Profile settings data ->', {
            ...data,
        });
    };

    const genderOptions = [
        { label: 'Male', value: 'Male' },
        { label: 'Female', value: 'Female' },
    ];


    const [full_name, setFull_name] = useState()
    const [gender, setGender] = useState()
    const [dob, setDob] = useState()
    const [address, setAddress] = useState()
    const [aadhar_front, setAadhar_front] = useState()
    const [aadhar_back, setAadhar_back] = useState()
    const [pan_card, setPan_card] = useState()

    useEffect(() => {
        const userData = async () => {
            const data = await appwriteService.getCurrentUser();
            setFull_name(data?.prefs.full_name || '');
            setGender(data?.prefs.gender || '');
            setDob(data?.prefs.dob || '');
            setAddress(data?.prefs.address || '');
            setAadhar_front(data?.prefs.aadhar_front || '');
            setAadhar_back(data?.prefs.aadhar_back || '');
            setPan_card(data?.prefs.pan_card || '');
        };
        userData();
    }, []);

   
    return (
        <div className='@container'>
            <ProfileHeader
                title="KYC Status"
                description={'Pending'}
            />

            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                <FormGroup
                    title="Personal Info"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                >
                    <Input
                        label="Full Name"
                        value={full_name}
                        className="flex-grow col-span-12"
                        onChange={(e: any) => {
                            setFull_name(e.target.value)
                        }}
                    />

                    <Select
                        label="Gender"
                        options={genderOptions}
                        value={gender}
                        onChange={(e: any) => {
                            setGender(e.value)
                        }}
                        className="flex-grow col-span-12"
                    />
                    <Input
                        type="date"
                        label="Date of Birth"
                        className="flex-grow col-span-12"
                        value={dob}
                        onChange={(e: any) => {
                            setDob(e.target.value)
                        }}
                    />
                    <Input
                        className="flex-grow col-span-12"
                        label="Address"
                        value={address}
                        placeholder="Write you Full Address"
                        onChange={(e: any) => {
                            setAddress(e.target.value)
                        }}
                    />

                    <Button
                        className="w-full flex-grow col-span-12"
                        onClick={() => {
                            appwriteService.updatePrefs({ 'full_name': full_name });
                            appwriteService.updatePrefs({ 'gender': gender });
                            appwriteService.updatePrefs({ 'dob': dob });
                            appwriteService.updatePrefs({ 'address': address });
                        }}
                    >
                        Upload
                    </Button>
                </FormGroup>

                <FormGroup
                    title="Documents Upload"
                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11 "
                >
                    <FileInput
                        label="Upload Aadhar Front"
                        placeholder="Profile Image"
                        className="flex-grow"
                        onChange={handleFileChange}
                    />
                    <FileInput
                        label="Upload Aadhar Back"
                        placeholder="Profile Image"
                        className="flex-grow"
                        onChange={handleFileChange}
                    />
                    <FileInput
                        label="Upload Pan Card"
                        placeholder="Profile Image"
                        className="flex-grow"
                        onChange={handleFileChange}
                    />
                    <Button
                        className="mt-6 flex-grow" >
                        Upload
                    </Button>
                </FormGroup>


            </div>
        </div>

    );
}
