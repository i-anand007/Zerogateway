'use client';

import { useCallback, useMemo, useState } from 'react';
import dynamic from 'next/dynamic';
import { useTable } from '@/hooks/use-table';
import { useColumn } from '@/hooks/use-column';
import ControlledTable from '@/components/controlled-table';
import { getColumns } from './columns';
import FilterElement from './filter-element';

const TableFooter = dynamic(() => import('@/app/shared/table-footer'), {
  ssr: false,
});

const filterState = {
  role: '',
  status: '',
};

// Define appropriate TypeScript types for your component props and other elements
interface TableProps {
  data: any[];
}

interface ColumnConfig {
  data: any[];
  sortConfig: Object;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => { onClick: () => void };
  onDeleteItem: (id: string) => void;
  onChecked: (recordKey: string) => void;
  handleSelectAll: () => void;
  onEditItem: (id: string) => void;
}

export default function PlansTable({ data }: TableProps) {
  const [pageSize, setPageSize] = useState(10);

  const {
    isLoading,
    isFiltered,
    tableData,
    currentPage,
    totalItems,
    handlePaginate,
    filters,
    updateFilter,
    searchTerm,
    handleSearch,
    sortConfig,
    handleSort,
    selectedRowKeys,
    setSelectedRowKeys,
    handleRowSelect,
    handleSelectAll,
    handleDelete,
    handleReset,
  } = useTable(data, pageSize, filterState);

  // Memoize onHeaderCellClick with useCallback
  const onHeaderCellClick = useCallback((value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  }), [handleSort]);

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
  }, [handleDelete]);

  // Memoize columns to avoid unnecessary re-renders
  const columns = useMemo(() =>
    getColumns({
      data,
      checkedItems: selectedRowKeys,
      onHeaderCellClick,
      onDeleteItem,
      onChecked: handleRowSelect,
      handleSelectAll,
      onEditItem: (id) => {
        // Implement your logic for onEditItem if needed
      },
    }), [
    data,
    selectedRowKeys,
    onHeaderCellClick,
    onDeleteItem,
    handleRowSelect,
    handleSelectAll,
  ]);

  const { visibleColumns, checkedColumns, setCheckedColumns } = useColumn(columns);

  return (
    <div className="mt-14">
      <FilterElement
        updateFilter={updateFilter}
        handleReset={handleReset}
        onSearch={handleSearch}
        searchTerm={searchTerm}
        isFiltered={isFiltered}
        filters={filters}
      />
      <ControlledTable
        variant="modern"
        data={tableData}
        isLoading={isLoading}
        showLoadingText={true}
        // @ts-ignore
        columns={visibleColumns}
        paginatorOptions={{
          pageSize,
          setPageSize,
          total: totalItems,
          current: currentPage,
          onChange: (page: number) => handlePaginate(page),
        }}
        tableFooter={
          <TableFooter
            checkedItems={selectedRowKeys}
            handleDelete={(ids: string[]) => {
              setSelectedRowKeys([]);
              handleDelete(ids);
            }}
          />
        }
        className="rounded-md border border-muted text-sm shadow-sm [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:h-60 [&_.rc-table-placeholder_.rc-table-expanded-row-fixed>div]:justify-center [&_.rc-table-row:last-child_td.rc-table-cell]:border-b-0 [&_thead.rc-table-thead]:border-t-0"
      />
    </div>
  );
}
