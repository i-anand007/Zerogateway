import { metaObject } from '@/config/site.config';
import UPI from './upi';

export const metadata = {
  ...metaObject('Profile Settings'),
};

export default function ProfileSettingsFormPage() {
  return <UPI />;
}
