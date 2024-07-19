import { routes } from '@/config/routes';
import PageHeader from '@/app/shared/page-header';
import ProfileSettingsNav from '@/app/shared/account-settings/navigation';

const pageHeader = {
  title: 'Profile Settings',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Profile Settings',
    },
  ],
};

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
      <ProfileSettingsNav />
      {children}
    </>
  );
}
