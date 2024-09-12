'use client';

import Link from 'next/link';
import { Badge, ActionIcon } from 'rizzui';
import cn from '@/utils/class-names';
import SearchWidget from '@/components/search/search';
import MessagesDropdown from '@/layouts/messages-dropdown';
import NotificationDropdown from '@/layouts/notification-dropdown';
import ProfileMenu from '@/layouts/profile-menu';
import SettingsButton from '@/components/settings/settings-button';
import HamburgerButton from '@/layouts/hamburger-button';
import Logo from '@/components/logo';
import Image from 'next/image'
import {
  PiBellSimpleRingingDuotone,
  PiChatsCircleDuotone,
  PiGearDuotone,
  PiMagnifyingGlassDuotone,
} from 'react-icons/pi';
import HeaderMenuLeft from '@/layouts/lithium/lithium-menu';
// import Sidebar from '@/layouts/hydrogen/sidebar';
import StickyHeader from '@/layouts/sticky-header';
import Sidebar from '../beryllium/beryllium-sidebar-drawer';

function HeaderMenuRight() {
  return (
    <div className="ms-auto flex shrink-0 items-center gap-2 text-gray-700 xs:gap-3 xl:gap-4">
      <MessagesDropdown>
        <ActionIcon
          aria-label="Messages"
          variant="text"
          className={cn(
            ' relative h-[34px] w-[34px] overflow-hidden rounded-full md:h-9 md:w-9 3xl:h-10 3xl:w-10 '
          )}
        >
          <PiChatsCircleDuotone className="h-6 w-auto" />
          <Badge
            renderAsDot
            color="success"
            enableOutlineRing
            className="absolute right-1 top-2.5 -translate-x-1 -translate-y-1/4"
          />
        </ActionIcon>
      </MessagesDropdown>
      <NotificationDropdown>
        <ActionIcon
          aria-label="Notification"
          variant="text"
          className={cn(
            'relative h-[34px] w-[34px] overflow-hidden rounded-full md:h-9 md:w-9 3xl:h-10 3xl:w-10'
          )}
        >
          <PiBellSimpleRingingDuotone className="h-6 w-auto" />
          <Badge
            renderAsDot
            color="warning"
            enableOutlineRing
            className="absolute right-1 top-2.5 -translate-x-1 -translate-y-1/4"
          />
        </ActionIcon>
      </NotificationDropdown>
      <SettingsButton className="rounded-full text-gray-700 shadow-none backdrop-blur-none hover:text-gray-1000 3xl:h-10 3xl:w-10 dark:bg-gray-100/0">
        <PiGearDuotone className="h-[22px] w-auto animate-spin-slow" />
      </SettingsButton>
      <ProfileMenu
        buttonClassName="w-auto sm:w-auto p-1 border border-gray-300"
        avatarClassName="!w-7 !h-7 sm:!h-8 sm:!w-8"
      />
    </div>
  );
}

export default function Header() {
  return (
    <StickyHeader
      className={'z-[990] justify-between 2xl:py-5 2xl:pl-6  3xl:px-8'}
    >
      <div className="hidden items-center gap-3 xl:flex">
        <Link
          aria-label="Site Logo"
          href={'/'}
          className="me-4 hidden w-[155px] shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:block"
        >
          {/* <Logo className="max-w-[155px]" /> */}
          <Image
              src="/logo.png"
              width={1500}
              height={800}
              alt="Picture of the author"
            />
        </Link>
        <HeaderMenuLeft />
      </div>
      <div className="flex w-full items-center gap-5 xl:w-auto 3xl:gap-6">
        <div className="flex w-full max-w-2xl items-center xl:w-auto">
          <HamburgerButton
            view={<Sidebar className="static w-full 2xl:w-full" />}
          />
          <Link
            aria-label="Site Logo"
            href={'/'}
            className="me-4 w-9 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
          >
            {/* <Logo iconOnly={true} /> */}
            <Image
              src="/logo.png"
              width={1500}
              height={800}
              alt="Picture of the author"
            />
          </Link>
        </div>
        <HeaderMenuRight />
      </div>
    </StickyHeader>
  );
}
