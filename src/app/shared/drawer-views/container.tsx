'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Drawer } from 'rizzui';
import { useDrawer } from '@/app/shared/drawer-views/use-drawer';

export default function GlobalDrawer() {
  const { isOpen, view, placement, customSize, closeDrawer } = useDrawer();
  const pathname = usePathname();

  useEffect(() => {
    closeDrawer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Convert customSize to a number if it is a string
  const numericCustomSize = typeof customSize === 'string' ? parseFloat(customSize) : customSize;

  return (
    <Drawer
      isOpen={isOpen}
      onClose={closeDrawer}
      placement={placement}
      customSize={numericCustomSize} // Ensure customSize is of type number or undefined
      overlayClassName="dark:bg-opacity-40 dark:backdrop-blur-md"
      containerClassName="dark:bg-gray-100"
      className="z-[9999]"
    >
      {view}
    </Drawer>
  );
}
