'use client';

import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, ActionIcon, Select } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import { PiCheckCircleBold, PiClockBold, PiXCircleBold } from 'react-icons/pi';
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';
import appwriteService from '@/app/appwrite';

function getStatusBadge(status: User['status']) {
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

const editUser = async (id: string) => {
  console.log(id)
}

const statusOptions = [
  { label: 'Active', value: 'Active' },
  { label: 'Blocked', value: 'Blocked' },
];

const KYCstatusOptions = [
  { label: 'Pending', value: 'Pending' },
  { label: 'Approved', value: 'Approved' },
  { label: 'Rejected', value: 'Rejected' },
];


export const getColumns = ({
  sortConfig,
  onDeleteItem,
  onHeaderCellClick,
}: Columns) => [
    {
      title: <HeaderCell title="UPI Id" />,
      dataIndex: 'upi_id',
      key: 'upi_id',
      width: 150,
    },

    // {
    //   title: (
    //     <HeaderCell
    //       title="Phone"
    //     />
    //   ),
    //   dataIndex: 'phone',
    //   key: 'fullName',
    //   width: 100,
    //   render: (role: string) => role,
    // },

    {
      title: (
        <HeaderCell
          title="UPI Type"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'merchant'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('merchant'),
      dataIndex: 'merchant',
      key: 'merchant',
      width: 100,
      render: (merchant: string) => merchant,
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
      width: 100,
      render: (value: Date) => <DateCell date={value} />,
    },

    // {
    //   title: (
    //     <HeaderCell
    //       title="Status"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
    //       }
    //     />
    //   ),
    //   dataIndex: 'status',
    //   key: 'status',
    //   width: 50,
    //   onHeaderCell: () => onHeaderCellClick('status'),
    //   render: (status: string, user: User) => {

    //     return <StatusSelect selectItem={status} userId={user.id} />;
    //   },
    // },

    // {
    //   title: (
    //     <HeaderCell
    //       title="KYC Status"
    //       sortable
    //       ascending={
    //         sortConfig?.direction === 'asc' && sortConfig?.key === 'status'
    //       }
    //     />
    //   ),
    //   dataIndex: 'KYCstatus',
    //   key: 'KYCstatus',
    //   width: 50,
    //   onHeaderCell: () => onHeaderCellClick('KYCstatus'),
    //   render: (KYCstatus: string, user: User) => {
    //     return <KYCStatusSelect selectKYCItem={KYCstatus} userId={user.id} />;
    //   },
    // },


    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_: string, user: User) => (
        <div className="flex items-center justify-end gap-3 pe-3">


          <DeletePopover
            title={`Delete this user`}
            description={`Are you sure you want to delete user - ${user.fullName} ?`}
            onDelete={async () => {
              onDeleteItem(user.id);
              await appwriteService.deleteAdminUPI(user.id);
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
      await appwriteService.updateAdminUPIstatus(
        {
          "id": userId,
          payload : {
            "status": true
          }
        }
      )
      toast.success('Blocked')
    } else {
      await appwriteService.updateAdminUPIstatus(
        {
          "id": userId,
          payload : {
            "status": false
          }
        }
      )
      toast.success('Blocked')
    }
  }
  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[100px]"
      inPortal={true}
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



  
function KYCStatusSelect({ selectKYCItem, userId }: { selectKYCItem?: string; userId: string }) {
  const selectKYCItemValue = KYCstatusOptions.find(
    (option: { label: string | undefined; }) => option.label === selectKYCItem
  );
  const [KYCvalue, setKYCValue] = useState(selectKYCItemValue);
  const userKYCStatusChange = async (data: any) => {
    setKYCValue(data)
    if (data.value == 'Pending') {
      axios.patch('/api/v1/admin/users/update/prefs',
        {
          "id": userId,
          "prefs": { 'KYC': 'Pending' }
        }
      )
      toast.success('KYC Updated')
    } else 
    if (data.value == 'Approved') {
      axios.patch('/api/v1/admin/users/update/prefs',
        {
          "id": userId,
          "prefs": { 'KYC': 'Approved' }
        }
      )
      toast.success('KYC Updated')
    } else
    if (data.value == 'Rejected') {
      axios.patch('/api/v1/admin/users/update/prefs',
        {
          "id": userId,
          "prefs": { 'KYC': 'Rejected' }
        }
      )
      toast.success('KYC Updated')
    }
  }
  return (
    <Select
      dropdownClassName="!z-10"
      className="min-w-[100px]"
      inPortal={true}
      placeholder="Select Status"
      options={KYCstatusOptions}
      value={KYCvalue}
      onChange={(e) => userKYCStatusChange(e)}
      displayValue={(option: { value: any }) =>
        renderKYCOptionDisplayValue(option.value as string)
      }
    />
  );
}


function renderKYCOptionDisplayValue(KYCvalue: string) {
  switch (KYCvalue) {
    case 'Rejected':
      return (
        <div className="flex items-center">
          <PiXCircleBold className="shrink-0 fill-red-dark  text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {KYCvalue}
          </Text>
        </div>
      );
    case 'Pending':
      return (
        <div className="flex items-center">
          <PiClockBold className="shrink-0 fill-orange-600  text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {KYCvalue}
          </Text>
        </div>
      );
    default:
      return (
        <div className="flex items-center">
          <PiCheckCircleBold className="shrink-0 fill-green-dark text-base" />
          <Text className="ms-1.5 text-sm font-medium capitalize text-gray-700">
            {KYCvalue}
          </Text>
        </div>
      );
  }
}
