'use client';

import { Button, cn } from 'rizzui';
// import cn from '@utils/class-names';
import { useScrollableSlider } from '@/hooks/use-scrollable-slider';
import {
  PiBank,
  PiCaretLeftBold,
  PiCaretRightBold,
  PiCube,
  PiCurrencyBtc,
  PiCurrencyCircleDollar,
  PiDotsThreeCircleDuotone,
  PiFolder,
  PiMoneyBold,
  PiMoneyThin,
  PiXCircleBold,
} from 'react-icons/pi';
import TransactionCard, {
  TransactionType,
} from '@/components/cards/transaction-card';
import appwriteService from '@/app/appwrite';
import { useEffect, useState } from 'react';
import { AppwriteUsersApi } from '@/app/appwrite_api';
import PageHeader from '@/app/shared/page-header';
import Loading from '@/components/loading';
import BillingTable from './transaction-table';

type FileStatsType = {
  className?: string;
};


const pageHeader = {
  title: 'All Billing ',
  breadcrumb: [
    {
      href: '/',
      name: 'Dashboard',
    },
    {
      name: 'Billing',
    },
  ],
};


// const statData: TransactionType[] =
//   [
//     {
//       title: 'Today',
//       amount: '16,085',
//       icon: PiBank,
//     },
//     {
//       title: 'Approved',
//       amount: '38,503',
//       icon: PiMoneyBold,
//     },
//     {
//       title: 'Pending',
//       amount: '25,786',
//       icon: PiDotsThreeCircleDuotone,
//     },
//     {
//       title: 'Declined',
//       amount: '27,432',
//       icon: PiXCircleBold,
//     },
//   ];

// export function StatGrid() {


//   return (
//     <>
//       {statData.map((stat: any, index: number) => {
//         return (
//           <TransactionCard
//             key={'transaction-card-' + index}
//             transaction={stat}
//             className="min-w-[300px]"
//           />
//         );
//       })}
//     </>
//   );
// }

export default function FileStats({ className }: FileStatsType) {
  const {
    sliderEl,
    sliderPrevBtn,
    sliderNextBtn,
    scrollToTheRight,
    scrollToTheLeft,
  } = useScrollableSlider();

  const [data, setData] = useState(null || {});
  const [allUser, setAllUser] = useState(null || {});
  const [formattedData, setFormattedData] = useState<object | null>(null);

  const [today, setToday] = useState(0)
  const [approved, setApproved] = useState(0)
  const [pending, setPending] = useState(0)
  const [declined, setDeclined] = useState(0)

  const statData: TransactionType[] =
    [
      {
        title: 'Today',
        amount: today,
        icon: PiBank,
      },
      {
        title: 'Approved',
        amount: approved,
        icon: PiMoneyBold,
      },
      {
        title: 'Pending',
        amount: pending,
        icon: PiDotsThreeCircleDuotone,
      },
      {
        title: 'Declined',
        amount: declined,
        icon: PiXCircleBold,
      },
    ];

  useEffect(() => {

    async function getBilling() {

      const userId = await appwriteService.getCurrentUser()

      const rawData = await appwriteService.listPayments(
        userId?.$id!
      )

      console.log(rawData)
      const all_User = await AppwriteUsersApi.list()
      setAllUser(all_User.users)

      console.log(all_User)
      if (rawData.documents) {
        setData(rawData);

        // Define a function to find user by id and return their name
        const idToUser = (id: string) => {
          const user = all_User.users.find(user => user.$id === id);
          return user ? user.name : "Unknown";
        };

        const checkStatus = (status: boolean) => {
          switch (status) {
            case null:
              return "Pending";
            case true:
              return "Approved";
            case false:
              return "Declined"
          }
        }











        const todayDate = new Date().toISOString().split('T')[0];
        console.log(todayDate)
        // Map over the documents and create an array of status sums
        const results = rawData.documents.map(item => {
          const createdAt = item.$createdAt.split('T')[0];
          console.log(createdAt)

          if (item.status === true) {
            return {
              approved: item.amount,
              today: createdAt === todayDate ? item.amount : 0,
              pending: 0,
              declined: 0,
            };
          } else if (item.status === false) {
            return {
              approved: 0,
              today: 0,
              pending: 0,
              declined: item.amount,
            };
          } else if (item.status === null) {
            return {
              approved: 0,
              today: 0,
              pending: item.amount,
              declined: 0,
            };
          } else {
            return {
              approved: 0,
              today: 0,
              pending: 0,
              declined: 0,
            };
          }
        });

        const summary = results.reduce(
          (acc, curr) => {
            acc.today += curr.today;
            acc.pending += curr.pending;
            acc.approved += curr.approved;
            acc.declined += curr.declined;
            return acc;
          },
          { today: 0, pending: 0, approved: 0, declined: 0 }
        );


        setToday(summary.today)
        setPending(summary.pending)
        setApproved(summary.approved)
        setDeclined(summary.declined)





        // Format the data after setting Data
        const formattedData = rawData.documents.map(item => ({
          id: item.$id,
          from: idToUser(item.userfrom),
          purpose: item.purpose,
          name: item.name,
          email: item.email,
          phone: item.phone,
          payment_mode: item.payment_mode,
          upi_acc: item.upi_acc,
          amount: item.amount,
          utr: item.utr,
          screenshot: item.screenshot,
          createdAt: item.$createdAt,
          status: checkStatus(item.status),
        }));
        setFormattedData(formattedData);
        console.log(formattedData)
      }


    };
    getBilling();

  }, []);

  return (
    <>
      <div
        className={cn(
          'relative flex w-auto items-center overflow-hidden',
          className
        )}
      >
        <Button
          title="Prev"
          variant="text"
          ref={sliderPrevBtn}
          onClick={() => scrollToTheLeft()}
          className="!absolute -left-1 top-0 z-10 !h-full w-20 !justify-start rounded-none bg-gradient-to-r from-gray-0 via-gray-0/70 to-transparent px-0 ps-1 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden"
        >
          <PiCaretLeftBold className="h-5 w-5" />
        </Button>
        <div className="w-full overflow-hidden">
          <div
            ref={sliderEl}
            className="custom-scrollbar-x grid grid-flow-col gap-5 overflow-x-auto scroll-smooth 2xl:gap-6 "
          >


            {statData.map((stat: any, index: number) => {
              return (
                <TransactionCard
                  key={'transaction-card-' + index}
                  transaction={stat}
                  className="min-w-[300px]"
                />
              );
            })}


          </div>
        </div>
        <Button
          title="Next"
          variant="text"
          ref={sliderNextBtn}
          onClick={() => scrollToTheRight()}
          className="dark: !absolute -right-2 top-0 z-10 !h-full w-20 !justify-end rounded-none bg-gradient-to-l from-gray-0 via-gray-0/70 to-transparent px-0 pe-2 text-gray-500 hover:text-gray-900 dark:from-gray-50 dark:via-gray-50/70 3xl:hidden "
        >
          <PiCaretRightBold className="h-5 w-5" />
        </Button>
      </div>




      {formattedData === null ? (
        <Loading />
      ) : (
        <BillingTable data={formattedData} />
      )}
    </>
  );
}
