'use client';

import React from 'react';
import { defaultColumns } from './column';
import MainTable from '../../table/main-table';
import { useDirection } from '@/hooks/use-direction';
import WidgetCard from '@/components/cards/widget-card';
import { Person, defaultData } from '@/data/tan-table-data';
import { CustomExpandedComponent } from '../custom-table-components';
import { useTanStackTable } from '../custom-table-components/use-TanStack-Table';
import TableToolbar from '../table/table-toolbar';
import TablePagination from '@/components/table/table-pagination';

export default function Table() {
  const { direction } = useDirection();
  const { table, setData } = useTanStackTable<Person>({
    tableData: defaultData,
    columnConfig: defaultColumns,
    options: {
      initialState: {
        pagination: {
          pageIndex: 0,
          pageSize: 7,
        },
      },
      meta: {
        handleDeleteRow: (row) => {
          setData((prev) => prev.filter((r) => r.id !== row.id));
        },
      },
      enableColumnResizing: true,
      columnResizeDirection: direction as any,
      columnResizeMode: 'onChange',
    },
  });

  return (
    <>
      <WidgetCard title={'Table'} className="flex flex-col gap-4">
      <TableToolbar table={table} />
        <MainTable
          table={table}
          variant={'minimal'}
          components={{
            expandedComponent: CustomExpandedComponent,
          }}
        />
        <TablePagination table={table} />
      </WidgetCard>
    </>
  );
}
