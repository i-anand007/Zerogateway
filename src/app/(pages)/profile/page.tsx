import appwriteService from '@/app/appwrite';
import ProfileSettingsView from '@/app/shared/account-settings/profile-settings';
import { metaObject } from '@/config/site.config';
import { useEffect } from 'react';

export const metadata = {
  ...metaObject('Profile'),
};

const userData = async () => {
  const data = await appwriteService.getCurrentUser()
  console.log(data)  
}

userData()

export default function ProfileSettingsFormPage() {
  return <ProfileSettingsView />;
}
