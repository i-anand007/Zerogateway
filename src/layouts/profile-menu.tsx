'use client';
import { Title, Text, Avatar, Button, Popover, Badge } from 'rizzui';
import cn from '@/utils/class-names';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import appwriteService from '@/app/appwrite';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
import getDaysDifference from '@/hooks/use-date-difference';


export default function ProfileMenu({
  buttonClassName,
  avatarClassName,
  username = false,
}: {
  buttonClassName?: string;
  avatarClassName?: string;
  username?: boolean;
}) {
  return (
    <ProfileMenuPopover>
      <Popover.Trigger>
        <button
          className={cn(
            'w-9 shrink-0 rounded-full outline-none focus-visible:ring-[1.5px] focus-visible:ring-gray-400 focus-visible:ring-offset-2 active:translate-y-px sm:w-10',
            buttonClassName
          )}
        >
          <Avatar
            src={Cookies.get("profile_pic")}
            name={Cookies.get("user_name") || ''}
            className={cn('!h-9 w-9 sm:!h-10 sm:!w-10', avatarClassName)}
          />

        </button>
      </Popover.Trigger>

      <Popover.Content className="z-[9999] p-0 dark:bg-gray-100 [&>svg]:dark:fill-gray-100">
        <DropdownMenu />
      </Popover.Content>
    </ProfileMenuPopover>
  );
}

function ProfileMenuPopover({ children }: React.PropsWithChildren<{}>) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <Popover
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      shadow="sm"
      placement="bottom-end"
    >
      {children}
    </Popover>
  );
}

const menuItems = [
  {
    name: 'Profile Settings',
    href: "/dashboard/profile-settings",
  },
];

const prefs = {
  "payment_pages": "0",
  "validity": "0",
  "KYC": "true"
}


function DropdownMenu() {
  const [payment_pages, setPayment_pages] = useState()
  const [validity, setValidity] = useState<number | undefined>(undefined)

  useEffect(() => {
    const getCurrentUserData = async () => {
      const response = await appwriteService.getCurrentUser()
      setPayment_pages(response?.prefs.payment_pages)
      const val = new Date(response?.prefs.validity)
      const daysDifference = getDaysDifference(val);
      setValidity(daysDifference)
    }

    getCurrentUserData()
  }, []);



  const router = useRouter();



  const logout = async () => {
    await appwriteService.logout()
    Cookies.set("user_loggedIn", "false")
    Cookies.set("user_id", "")
    Cookies.set("user_name", "")
    Cookies.set("user_email", "")
    Cookies.set("profile_pic", "")
    Cookies.set("user_labels", [])
    toast.success('Logged Out')
    router.push('/auth/login');
  }
  return (
    <div className="w-64 text-left rtl:text-right">
      <div className="flex items-center border-b border-gray-300 px-6 pb-5 pt-6">
        <Avatar
          src={Cookies.get("profile_pic")}
          name={Cookies.get("user_name") || ''}
        />
        <div className="ms-3">
          <Title as="h6" className="font-semibold">
            {Cookies.get("user_name")}
          </Title>
          <Text className="text-gray-600">{Cookies.get("user_email")?.slice(0, 22)}</Text>
        </div>
      </div>
      <div className="grid px-3.5 py-2 font-medium text-gray-700">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="group my-0.5 flex items-center rounded-md px-2.5 py-2 hover:bg-gray-100 focus:outline-none hover:dark:bg-gray-50/50"
          >
            {item.name}
          </Link>
        ))}
      </div>
      {payment_pages && validity !== undefined && validity > 0 ?
        <>
          <div className="border-t border-gray-300 px-6 pb-3 pt-4 flex flex-row justify-between">
            <p className="h-auto font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0">
              Payment Pages  -
            </p>
            {payment_pages < 5 ? (
              <Badge color="danger">{payment_pages}</Badge>
            ) : payment_pages < 50 ? (
              <Badge color="warning">{payment_pages}</Badge>
            ) : (
              <Badge>{payment_pages}</Badge>
            )}
          </div>

          <div className="border-t border-gray-300 px-6 pb-3 pt-4 flex flex-row justify-between">
            <p className="h-auto font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0">
              Validity  -
            </p>
            {validity <= 0 ? (
              <Badge color="danger">{0 + ' Days'}</Badge>
            ) :
              validity < 5 ? (
                <Badge color="danger">{validity + ' Days'}</Badge>
              ) :
                validity < 10 ? (
                  <Badge color="warning">{validity + ' Days'}</Badge>
                ) : (
                  <Badge>{validity + ' Days'}</Badge>
                )}
          </div>
        </>
        :
        <></>
      }
      {validity !== undefined && validity <= 0 ?
        <>
          <div className="border-t border-gray-300 px-6 pb-3 pt-4 flex flex-row justify-between bg-red-600">
            <p className="h-auto font-medium outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0 text-white">
              Plan Not Active
            </p>
          </div>
        </> : <>
        <div className="border-t border-gray-300 px-6 pb-3 pt-4 flex flex-row justify-between bg-green-600">
            <p className="h-auto font-medium outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0 text-white">
              {validity} Day Left
            </p>
          </div>
        </>
      }
      <div className="border-t border-gray-300 px-6 py-4">
        <Button
          className="h-auto w-full justify-start p-0 font-medium text-gray-700 outline-none focus-within:text-gray-600 hover:text-gray-900 focus-visible:ring-0"
          variant="text"
          onClick={() => logout()}
        >
          Sign Out
        </Button>
      </div>
    </div>
  );
}
