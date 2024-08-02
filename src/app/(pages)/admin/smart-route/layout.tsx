import PageHeader from '@/app/shared/page-header';
import Nav from './navigation';

const pageHeader = {
  title: 'Admin Smart Route',
  breadcrumb: [
    {
      href: '/',
      name: 'Home',
    },
    {
      name: 'Smart Route',
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
      <Nav />
      {children}
    </>
  );
}
