'use client';

import Link from 'next/link';
import SearchWidget from '@/components/search/search';
import HamburgerButton from '@/layouts/hamburger-button';
import Logo from '@/components/logo';
import { PiMagnifyingGlass } from 'react-icons/pi';
import cn from '@/utils/class-names';
import Sidebar from '@/layouts/beryllium/beryllium-sidebar-drawer';
import HeaderMenuRight from '@/layouts/header-menu-right';
import StickyHeader from '@/layouts/sticky-header';
import Image from 'next/image'

export default function Header({ className }: { className?: string }) {
  return (
    <StickyHeader
      className={cn(
        'z-[990] justify-between bg-white xl:pe-8  dark:bg-gray-50/50',
        className
      )}
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
            width={500}
            height={500}
            alt="Picture of the author"
          />
        </Link>
      </div>

      <div className="flex w-full items-center justify-between gap-5 xl:w-[calc(100%_-_190px)] 2xl:w-[calc(100%_-_310px)] 3xl:gap-6">
        <div className="flex max-w-2xl items-center xl:w-auto">
          <HamburgerButton
            view={<Sidebar className="static w-full 2xl:w-full" />}
          />
          <Link
            aria-label="Site Logo"
            href="/"
            className="me-4 w-20 shrink-0 text-gray-800 hover:text-gray-900 lg:me-5 xl:hidden"
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

        <div className="flex items-center justify-between">
          <HeaderMenuRight />
        </div>
      </div>
    </StickyHeader>
  );
}
