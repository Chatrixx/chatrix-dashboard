/* eslint-disable prettier/prettier */
/* eslint-disable import/no-unresolved */
import { Table } from "@tanstack/react-table";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// interface DataTablePaginationProps<TData> {
//   table: Table<TData>;
//   onPageChange?: (page: number) => void;
//   onRowsPerPageChange?: (take: number) => void;
// }

export function DataTablePagination({
  table,
  onPageChange,
  onRowsPerPageChange,
}) {
  console.log("TEst");
  return (
    <div className="flex items-center justify-between px-2 mt-3">
      <div className="flex items-center space-x-2">
        <p className="text-sm font-sm">Rows per page</p>
        <Select
          value={`${table.getState().pagination.pageSize}`}
          onValueChange={(value) => {
            const newSize = Number(value);
            table.setPageSize(newSize);
            onRowsPerPageChange?.(newSize);
          }}
        >
          <SelectTrigger className="h-8 w-[70px]">
            <SelectValue placeholder={table.getState().pagination.pageSize} />
          </SelectTrigger>
          <SelectContent side="top">
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <SelectItem key={pageSize} value={`${pageSize}`}>
                {pageSize}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <div className="flex w-[100px] items-center justify-center text-sm font-sm">
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {!Number.isNaN(table.getPageCount()) ? table.getPageCount() : 0}
        </div>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => {
            const newPage = 0;
            table.setPageIndex(newPage);
            onPageChange?.(newPage);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            table.previousPage();
            onPageChange?.(table.getState().pagination.pageIndex - 1);
          }}
          disabled={!table.getCanPreviousPage()}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="h-8 w-8 p-0"
          onClick={() => {
            table.nextPage();
            onPageChange?.(table.getState().pagination.pageIndex + 1);
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          className="hidden h-8 w-8 p-0 lg:flex"
          onClick={() => {
            table.setPageIndex(table.getPageCount() - 1);
            onPageChange?.(table.getPageCount() - 1);
          }}
          disabled={!table.getCanNextPage()}
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
