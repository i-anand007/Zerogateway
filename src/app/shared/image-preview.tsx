'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image'
import { PiXBold } from 'react-icons/pi';
import { ActionIcon } from 'rizzui';
import { useModal } from '@/app/shared/modal-views/use-modal';
import appwriteService from '../appwrite';

interface ImagePreviewProps {
    id: string;
}

const ImagePreview: React.FC<ImagePreviewProps> = ({ id }) => {
    const { closeModal } = useModal();
    const [isLoading, setLoading] = useState(true);
    const [image, setImage] = useState('');

    useEffect(() => {
        const userData = async () => {
            const image = await appwriteService.getFilePreview(id)
            setImage(image.href)
            console.log(image)
            console.log(image.href)
            setLoading(false)
        };
        userData();
    }, []);

    return (
        <div className='relative p-2'>
            <div className="absolute top-0 right-0 bg-white p-2 rounded-full border-2">
                <ActionIcon size="sm" variant="text" onClick={closeModal}>
                    <PiXBold className="h-auto w-5" />
                </ActionIcon>
            </div>
            <Image
                src={image}
                width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }}
                alt={''} />
        </div>
    );
}

export default ImagePreview;