'use client';

import { STATUSES, type User } from '@/data/users-data';
import { Text, Badge, Tooltip, Checkbox, ActionIcon, Button, Select } from 'rizzui';
import { HeaderCell } from '@/components/ui/table';
import EyeIcon from '@/components/icons/eye';
import PencilIcon from '@/components/icons/pencil';
import AvatarCard from '@/components/ui/avatar-card';
import DateCell from '@/components/ui/date-cell';
import DeletePopover from '@/app/shared/delete-popover';
import CompanyCard from '@/components/ui/user-company-card';
import EditUser from '../edit-user';
import ModalButton from '../../modal-button';
import ModalButtonIcon from '../../modal-button-icon';
import { useModal } from '../../modal-views/use-modal';
import { PiCheckCircleBold, PiClockBold, PiXCircleBold } from 'react-icons/pi';
import { useState } from 'react';
import axios from 'axios';

function getStatusBadge(status: User['status']) {
  switch (status) {
    case STATUSES.Deactivate:
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
  { label: 'Deactivate', value: 'Deactivate' },
];


export const getColumns = ({
  data,
  sortConfig,
  checkedItems,
  onDeleteItem,
  onHeaderCellClick,
  handleSelectAll,
  onChecked,
}: Columns) => [
    // {
    //   title: (
    //     <div className="flex items-center gap-3 whitespace-nowrap ps-3">
    //       <Checkbox
    //         title={'Select All'}
    //         onChange={handleSelectAll}
    //         checked={checkedItems.length === data.length}
    //         className="cursor-pointer"
    //       />
    //       User ID
    //     </div>
    //   ),
    //   dataIndex: 'checked',
    //   key: 'checked',
    //   width: 30,
    //   render: (_: any, row: User) => (
    //     <div className="inline-flex ps-3">
    //       <Checkbox
    //         className="cursor-pointer"
    //         checked={checkedItems.includes(row.id)}
    //         {...(onChecked && { onChange: () => onChecked(row.id) })}
    //         label={`#${row.id}`}
    //       />
    //     </div>
    //   ),
    // },
    {
      title: <HeaderCell title="Name" />,
      dataIndex: 'fullName',
      key: 'fullName',
      width: 250,
      render: (_: string, user: User) => (
        <AvatarCard
          src={user.avatar}
          name={user.fullName}
          description={user.email}
        />
      ),
    },
    {
      title: (
        <HeaderCell
          title="Phone"
        />
      ),
      dataIndex: 'phone',
      key: 'fullName',
      width: 100,
      render: (role: string) => role,
    },

    {
      title: (
        <HeaderCell
          title="Role"
          sortable
          ascending={
            sortConfig?.direction === 'asc' && sortConfig?.key === 'role'
          }
        />
      ),
      onHeaderCell: () => onHeaderCellClick('role'),
      dataIndex: 'role',
      key: 'role',
      width: 100,
      render: (role: string) => role,
    },

    // {
    //   title: <HeaderCell title="Company Name" />,
    //   dataIndex: 'companyName',
    //   key: 'fullName',
    //   width: 200,
    //   render: (_: string, user: User) => (
    //     <CompanyCard
    //       name={user.companyName}
    //       description={user.companyEmail} />
    //   ),
    // },

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
    //   title: <HeaderCell title="Permissions" />,
    //   dataIndex: 'permissions',
    //   key: 'permissions',
    //   width: 200,
    //   render: (permissions: User['permissions'][]) => (
    //     <div className="flex items-center gap-2">
    //       {permissions.map((permission) => (
    //         <Badge
    //           key={permission}
    //           rounded="lg"
    //           variant="outline"
    //           className="border-muted font-normal text-gray-500"
    //         >
    //           {permission}
    //         </Badge>
    //       ))}
    //     </div>
    //   ),
    // },


    // {
    //   title: <HeaderCell
    //     title="Status"
    //     sortable
    //     ascending={
    //       sortConfig?.direction === 'asc' && sortConfig?.key === 'createdAt'
    //     }
    //   />,
    //   onHeaderCell: () => onHeaderCellClick('status'),
    //   dataIndex: 'status',
    //   key: 'status',
    //   width: 100,
    //   render: (status: User['status']) => getStatusBadge(status),
    // },
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
      render: (status: string, user: User) => {

        return <StatusSelect selectItem={status} userId={user.id} />;
      },
    },
    {
      title: <></>,
      dataIndex: 'action',
      key: 'action',
      width: 100,
      render: (_: string, user: User) => (
        <div className="flex items-center justify-end gap-3 pe-3">


          <Tooltip size="sm" content={'Edit User'} placement="top" color="invert">
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
              onClick={(e) => editUser(user.id)}
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>

          <Tooltip size="sm" content={'View User'} placement="top" color="invert">
            <ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <EyeIcon className="h-4 w-4" />
            </ActionIcon>
          </Tooltip>
          {/* <EditUser /> */}
          {/* <ModalButtonIcon
            icon=<ActionIcon
              as="span"
              size="sm"
              variant="outline"
              className="hover:!border-gray-900 hover:text-gray-700"
            >
              <PencilIcon className="h-4 w-4" />
            </ActionIcon>
            view=<EditUser (user.id) />
            customSize="600px"
            className="mt-0"
          /> */}



          <DeletePopover
            title={`Delete this user`}
            description={`Are you sure you want to delete user - ${user.fullName} ?`}
            onDelete={() => onDeleteItem(user.id)}
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
    console.log(userId)
    if (data.value == 'Active') {
      axios.post('/api/v1/users/update/status',
        {
          "id": userId,
          "status": true
        }
      )
    } else {
      axios.post('/api/v1/users/update/status',
        {
          "id": userId,
          "status": false
        }
      )
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
    case 'Deactivate':
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
