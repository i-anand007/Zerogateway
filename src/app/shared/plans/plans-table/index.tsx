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

export default function PlansTable({ data }: { data: any }) {
  interface Columns {
  data: any;
  sortConfig: Object;
  checkedItems: string[];
  onHeaderCellClick: (value: string) => { onClick: () => void };
  onDeleteItem: (id: string) => void;
  onChecked: (recordKey: string) => void;
  handleSelectAll: () => void;
  onEditItem: (id: string) => void; // Ensure this matches your actual requirement
}
  const [pageSize, setPageSize] = useState(10);

  const onHeaderCellClick = (value: string) => ({
    onClick: () => {
      handleSort(value);
    },
  });

  const onDeleteItem = useCallback((id: string) => {
    handleDelete(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const columns = useMemo(() =>
    getColumns({
      data,
      sortConfig,
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
      sortConfig.key,
      sortConfig.direction,
      selectedRowKeys, // Ensure selectedRowKeys is defined somewhere in your component
      onHeaderCellClick,
      onDeleteItem,
      handleRowSelect,
      handleSelectAll,
    ]);

  const { visibleColumns, checkedColumns, setCheckedColumns } =
    useColumn(columns);

  return (
    <div className="mt-14">
      <FilterElement
        updateFilter={updateFilter}
        handleReset={handleReset}
        onSearch={handleSearch}
        searchTerm={searchTerm} isFiltered={false} filters={{}}      />
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
