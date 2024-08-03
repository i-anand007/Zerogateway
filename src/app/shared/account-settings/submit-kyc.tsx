'use client';

import toast from 'react-hot-toast';
import { SubmitHandler } from 'react-hook-form';
import { Text, Input, Button, cn, Title, FileInput, Select, Badge } from 'rizzui';
import FormGroup from '@/app/shared/form-group';
import * as animationData from '@/components/lottie/loading-hand.json'
import Lottie from 'lottie-react';
import { useLayout } from '@/hooks/use-layout';
import { LAYOUT_OPTIONS } from '@/config/enums';
import {
    PersonalInfoFormTypes,
} from '@/utils/validators/personal-info.schema';
import { useEffect, useState } from 'react';
import appwriteService from '@/app/appwrite';
import ModalButton from '../modal-button';
import EyeIcon from '@/components/icons/eye';
import ImagePreview from '../image-preview';

export function ProfileHeader({
    title,
    description,
    children,
}: React.PropsWithChildren<{ title?: string; description?: string; profie_image?: string }>) {
    const { layout } = useLayout();

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
                    <Badge className={`mb-2 ml-2 inline-flex items-center gap-3 text-xl font-bold ${description === 'Approved' ? 'bg-green-500' :
                        description === 'Rejected' ? 'bg-red-500' :
                            'bg-orange-500'
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


    const [isLoading, setIsLoading] = useState(true)
    const [gender, setGender] = useState()
    const [dob, setDob] = useState()
    const [address, setAddress] = useState()
    const [aadhar_front, setAadhar_front] = useState<string>('');
    const [aadhar_back, setAadhar_back] = useState<string>('');
    const [pan_card, setPan_card] = useState<string>('');
    const [KYCStatus, setKYCStatus] = useState<string>('');

    useEffect(() => {
        const userData = async () => {
            const data = await appwriteService.getCurrentUser();
            setKYCStatus(data?.prefs.KYC || '');
            setGender(data?.prefs.gender || '');
            setDob(data?.prefs.dob || '');
            setAddress(data?.prefs.address || '');
            setAadhar_front(data?.prefs.aadhar_front || '');
            setAadhar_back(data?.prefs.aadhar_back || '');
            setPan_card(data?.prefs.pan_card || '');
            setIsLoading(false)
        };
        userData();
    }, []);




    return (
        <>

            {isLoading ?
                <div className="w-full h-screen flex items-center justify-center">
                    <Lottie animationData={animationData} />
                </div>

                :

                <>
                    <div className='@container'>
                        <ProfileHeader
                            title="KYC Status"
                            description={KYCStatus}
                        />

                        {KYCStatus === 'Approved' ?
                            <></>
                            :
                            <div className="mb-10 grid gap-7 divide-y divide-dashed divide-gray-200 @2xl:gap-9 @3xl:gap-11">
                                <FormGroup
                                    title="Personal Info"
                                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                                >


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
                                            appwriteService.updatePrefs({'gender': gender });
                                            appwriteService.updatePrefs({'dob': dob });
                                            appwriteService.updatePrefs({'address': address });
                                        }}
                                    >
                                        Update Personal Info
                                    </Button>
                                </FormGroup>

                                <FormGroup
                                    title="Documents Upload"
                                    className="pt-7 @2xl:pt-9 @3xl:grid-cols-12 @3xl:pt-11"
                                >
                                    <div className="flex items-end space-x-4">
                                        <FileInput
                                            label="Upload Aadhar Front"
                                            placeholder="Profile Image"
                                            className="flex-grow"
                                            onChange={async (e: any) => {
                                                const response = await appwriteService.uploadFile(e.target.files[0])
                                                setAadhar_front(response.$id)
                                            }}
                                        />
                                        {aadhar_front === ' ' ?
                                            <></>
                                            :
                                            <ModalButton
                                                label=""
                                                icon={<EyeIcon className="h-4 w-4" />}
                                                view={<ImagePreview id={aadhar_front} />}
                                                customSize="650px"
                                                className="flex-col max-w-4"
                                            />
                                        }
                                    </div>
                                    <div className="flex items-end space-x-4">
                                        <FileInput
                                            label="Upload Aadhar Back"
                                            placeholder="Profile Image"
                                            className="flex-grow"
                                            onChange={async (e: any) => {
                                                const response = await appwriteService.uploadFile(e.target.files[0])
                                                setAadhar_back(response.$id)
                                            }}
                                        />
                                        {aadhar_back === ' ' ?
                                            <></>
                                            :
                                            <ModalButton
                                                label=""
                                                icon={<EyeIcon className="h-4 w-4" />}
                                                view={<ImagePreview id={aadhar_back} />}
                                                customSize="650px"
                                                className="flex-col max-w-4"
                                            />
                                        }
                                    </div>
                                    <div className="flex items-end space-x-4">
                                        <FileInput
                                            label="Upload Pan Card"
                                            placeholder="Profile Image"
                                            className="flex-grow"
                                            onChange={async (e: any) => {
                                                const response = await appwriteService.uploadFile(e.target.files[0])
                                                setPan_card(response?.$id)
                                            }}
                                        />
                                        {pan_card === ' ' ?
                                            <></>
                                            :
                                            <ModalButton
                                                label=""
                                                icon={<EyeIcon className="h-4 w-4" />}
                                                view={<ImagePreview id={pan_card} />}
                                                customSize="650px"
                                                className="flex-col max-w-4"
                                            />
                                        }
                                    </div>
                                    <Button
                                        className="mt-6 flex-grow"
                                        onClick={async () => {
                                            console.log(
                                                aadhar_front,
                                                aadhar_back,
                                                pan_card
                                            )
                                            await appwriteService.updatePrefs({ 'aadhar_front': aadhar_front });
                                            await appwriteService.updatePrefs({ 'aadhar_back': aadhar_back });
                                            await appwriteService.updatePrefs({ 'pan_card': pan_card });
                                            toast.success('Document Uploaded')
                                        }}
                                    >
                                        Upload Documents
                                    </Button>
                                </FormGroup>
                            </div>
                        }
                    </div>
                </>
            }
        </>



    );
}
