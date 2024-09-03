'use client';

import { Text, Badge, Tooltip, Checkbox, ActionIcon, Button, Select } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import CompanyCard from '@/components/ui/user-company-card';
import ModalButton from '@/app/shared/modal-button';
import ModalButtonIcon from '@/app/shared/modal-button-icon';
import { useModal } from '@/app/shared/modal-views/use-modal';
import { PiCheckCircleBold, PiClockBold, PiXCircleBold } from 'react-icons/pi';
import { useState } from 'react';
import axios from 'axios';
import appwriteService from '@/app/appwrite';
import { STATUSES } from '@/data/users-data';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import ImagePreview from '@/app/shared/image-preview';


export type Billing = {
  id: string;
  from: string;
  purpose: string;
  name: string;
  email: string;
  phone: string;
  payment_mode: string;
  upi_acc: string;
  amount: number;
  screenshot: string;
  createdAt: string;
  status: string;
};

function getStatusBadge(status: Billing['status']) {
  switch (status) {
    case 'true':
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />

          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    case 'false':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    case 'null':
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{"Pending"}</Text>
        </div>
      );
  }
}

type Columns = {
  data: any[];
  sortConfig?: any;
  handleSelectAll: any;
  checkedItems: string[];
  onDeleteItem: (id: string) => void;
  onEditItem: (id: string) => void;
  onHeaderCellClick: (value: string) => void;
  onChecked?: (id: string) => void;
};

const statusOptions = [
  { label: 'Approved', value: 'Approved' },
  { label: 'Declined', value: 'Declined' },
];

// const statusOptions = [
//   { label: 'Active', value: 'Active' },
//   { label: 'Blocked', value: 'Blocked' },
// ];

export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) =>
  [

    {
      title: (
        <HeaderCell
          title="From"
        />
      ),
      dataIndex: 'from',
      key: 'id',
      width: 100,
    },

    {
      title: (
        <HeaderCell
          title="Purpose"
        />
      ),
      dataIndex: 'purpose',
      key: 'id',
      width: 80,
      // render: (purpose: string) => `${purpose}`
    },

    {
      title: (
        <HeaderCell
          title="Name"
        />
      ),
      dataIndex: 'name',
      key: 'id',
      width: 80,
      // render: (plan_discount: string) => `${plan_discount} %`
    },

    {
      title: (
        <HeaderCell
          title="Email"
        />
      ),
      dataIndex: 'email',
      key: 'id',
      width: 80,
      // render: (plan_price: string) => `₹ ${plan_price}`
    },

    {
      title: (
        <HeaderCell
          title="Phone"
        />
      ),
      dataIndex: 'phone',
      key: 'id',
      width: 80,
    },

    {
      title: (
        <HeaderCell
          title="Payment Mode"
        />
      ),
      dataIndex: 'payment_mode',
      key: 'id',
      width: 80,
    },

    {
      title: (
        <HeaderCell
          title="UPI / ACC No."
        />
      ),
      dataIndex: 'upi_acc',
      key: 'id',
      width: 80,
    },


    // {
    //   title: (
    //     <HeaderCell
    //       title="Platform fees"
    //     />
    //   ),
    //   dataIndex: 'platform_fees',
    //   key: 'id',
    //   width: 50,
    //   render: (platform_fees: string) => `${platform_fees} %`
    // },

    {
      title: (
        <HeaderCell
          title="UTR"
        />
      ),
      dataIndex: 'utr',
      key: 'id',
      width: 80,
      // render: (validity: string) => `${validity} Days`
    },

    {
      title: (
        <HeaderCell
          title="Amount"
        />
      ),
      dataIndex: 'amount',
      key: 'id',
      width: 80,
      // render: (validity: string) => `${validity} Days`
    },

    {
      title: (
        <HeaderCell
          title="Screenshot"
        />
      ),
      dataIndex: 'screenshot',
      key: 'id',
      width: 10,
      render: (screenshot: string) => 
        <ModalButton
          label=""
          icon={<EyeIcon className="h-4 w-4" />}
          view={<ImagePreview id={screenshot} />}
          customSize="650px"
          className="flex-col max-w-4"
        />
      
    },

    {
      title: (
        <HeaderCell
          title="Created"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 80,
      render: (value: Date) => <DateCell date={value} />,
    },

    {
      title: (
        <HeaderCell
          title="Status"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
          }
        />
      ),
      dataIndex: 'status',
      key: 'status',
      width: 50,
      onHeaderCell: () => onHeaderCellClick('status'),
      render: (status: string, billing: Billing) => {

        return <StatusSelect selectItem={status} userId={billing.id} />;
      },
    },
    // {
    //   title: <></>,
    //   dataIndex: 'action',
    //   key: 'action',
    //   width: 100,
    //   render: (_: string, plan: Plan) => (
    //     <div className="flex items-center justify-end gap-3 pe-3">

    //       <DeletePopover
    //         title={`Delete this user`}
    //         description={`Are you sure you want to delete Plan ?`}
    //         onDelete={() => {
    //           appwriteService.deletePlan(plan.id);
    //           onDeleteItem(plan.id);
    //         }}
    //       />
    //     </div>
    //   ),
    // },
  ];

function StatusSelect({ selectItem, userId }: { selectItem?: string; userId: string }) {
  const selectItemValue = statusOptions.find(
    (option: { label: string | undefined; }) => option.label === selectItem
  );
  const [value, setValue] = useState(selectItemValue);
  const userStatusChange = async (data: any) => {
    setValue(data)
    console.log(data)
    if (data.value == 'Approved') {
      appwriteService.updatePaymentStatus(
        {
          "id": userId,
          payload:
          {
            "status": true

          }
        }
      )
      toast.success("Payment Approved")
    } else if (data.value == 'Declined') {
      appwriteService.updatePaymentStatus(
        {
          "id": userId,
          payload:
          {
            "status": false

          }
        }
      )
      toast.success("Payment Declined")
    }
  }
  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[140px]"
      // inPortal={false}
      placeholder="Select Status"
      options={statusOptions}
      value={value}
      onChange={(e) => userStatusChange(e)}
      displayValue={(option: { value: any }) =>
        renderOptionDisplayValue(option.value as string)
      }
    />
  );
}


function renderOptionDisplayValue(value: string) {
  switch (value) {
    case 'Declined':
      return (
        <div className="flex items-center">
          <PiXCircleBold className="shrink-0 fill-red-dark  text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <PiCheckCircleBold className="shrink-0 fill-green-dark text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {value}
          </Text>
        </div>
      );
  }
}
