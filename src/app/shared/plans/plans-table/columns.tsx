'use client';

import { Text, Badge, Tooltip, Checkbox, ActionIcon, Button, Select } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import CompanyCard from '@/components/ui/user-company-card';
import ModalButton from '../../modal-button';
import ModalButtonIcon from '../../modal-button-icon';
import { useModal } from '../../modal-views/use-modal';
import { PiCheckCircleBold, PiClockBold, PiXCircleBold } from 'react-icons/pi';
import { useState } from 'react';
import axios from 'axios';
import appwriteService from '@/app/appwrite';
import { STATUSES } from '@/data/users-data';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


export type Plan = {
  id: string;
  plan_name: string;
  plan_base_price: string;
  plan_discount: string;
  plan_price: string;
  validity: string;
  status: string;
};

function getStatusBadge(status: Plan['status']) {
  switch (status) {
    case STATUSES.Blocked:
      return (
        <div className="flex items-center">
          <Badge color="danger" renderAsDot />

          <Text className="ms-2 font-medium text-red-dark">{status}</Text>
        </div>
      );
    case STATUSES.Active:
      return (
        <div className="flex items-center">
          <Badge color="success" renderAsDot />
          <Text className="ms-2 font-medium text-green-dark">{status}</Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <Badge renderAsDot className="bg-gray-400" />
          <Text className="ms-2 font-medium text-gray-600">{status}</Text>
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
  { label: 'Active', value: 'Active' },
  { label: 'Blocked', value: 'Blocked' },
];


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
          title="Name"
        />
      ),
      dataIndex: 'plan_name',
      key: 'id',
      width: 100,
    },

    {
      title: (
        <HeaderCell
          title="Base Price"
        />
      ),
      dataIndex: 'plan_base_price',
      key: 'id',
      width: 80,
      render: (plan_base_price: string) => `₹ ${plan_base_price}`
    },

    {
      title: (
        <HeaderCell
          title="Discount"
        />
      ),
      dataIndex: 'plan_discount',
      key: 'id',
      width: 80,
      render: (plan_discount: string) => `${plan_discount} %`
    },

    {
      title: (
        <HeaderCell
          title="Price"
        />
      ),
      dataIndex: 'plan_price',
      key: 'id',
      width: 80,
      render: (plan_price: string) => `₹ ${plan_price}`
    },

    {
      title: (
        <HeaderCell
          title="Payment Pages"
        />
      ),
      dataIndex: 'payment_pages',
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
          title="Validity"
        />
      ),
      dataIndex: 'validity',
      key: 'id',
      width: 80,
      render: (validity: string) => `${validity} Days`
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
      render: (status: string, plan: Plan) => {

        return <StatusSelect selectItem={status} userId={plan.id} />;
      },
    },
    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_: string, plan: Plan) => (
        <div className="flex items-center justify-end gap-3 pe-3">

          <DeletePopover
            title={`Delete this user`}
            description={`Are you sure you want to delete Plan ?`}
            onDelete={() => {
              appwriteService.deletePlan(plan.id);
              onDeleteItem(plan.id);
            }}
          />
        </div>
      ),
    },
  ];

function StatusSelect({ selectItem, userId }: { selectItem?: string; userId: string }) {
  const selectItemValue = statusOptions.find(
    (option: { label: string | undefined; }) => option.label === selectItem
  );
  const [value, setValue] = useState(selectItemValue);
  const userStatusChange = async (data: any) => {
    setValue(data)
    if (data.value == 'Active') {
      appwriteService.updatePlan(
        {
          "id": userId,
          payload:
          {
            "status": true

          }
        }
      )
      toast.success("Plan Activated")
} else {
  appwriteService.updatePlan(
    {
      "id": userId,
      payload:
      {
        "status": false

      }
    }
  )
  toast.success("Plan Blocked")
}
  }
return (
  <Select
    dropdownClassName="!z-10"
    className="min-w-[140px]"
    inPortal={false}
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
    case 'Blocked':
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
