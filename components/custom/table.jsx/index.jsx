import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ChevronDown, Loader2 } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./table-pagination";

export function DataTable({
  columns,
  data,
  enableColumnHiding = false,
  isBorderActive = false,
  filteredKey,
  isPaginationActive = false,
  title,
  isFilled = false,
  isServerSide = false,
  isLoading = false,
  pagination,
  autoCapitalizeCells = true,
  columnOptions = [],
  onRowClick,
  rowClass = "",
}) {
  const modifiedColumns = columns.map((column) => {
    if (
      typeof column.header === "string" &&
      columnOptions.includes(column.header)
    ) {
      return { ...column, enableHiding: true };
    }
    return { ...column, enableHiding: false };
  });

  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns: modifiedColumns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    manualPagination: isServerSide,
    pageCount: isServerSide
      ? (pagination?.pageCount ?? -1)
      : Math.ceil(data?.length / (pagination?.pageSize ?? 10)),
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex: pagination?.pageIndex ?? 0,
        pageSize: isPaginationActive
          ? (pagination?.pageSize ?? 10)
          : data?.length,
      },
    },
  });

  return (
    <div className="w-full">
      <div
        className={
          filteredKey?.length || enableColumnHiding
            ? "flex items-center py-4"
            : "  "
        }
      >
        {title && <Label className="text-base font-semibold">{title}</Label>}
        {filteredKey && (
          <Input
            placeholder={`Filter ${filteredKey ?? ""}...`}
            value={table.getColumn(filteredKey ?? "")?.getFilterValue() ?? ""}
            onChange={(event) =>
              table
                .getColumn(filteredKey ?? "")
                ?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        )}
        {enableColumnHiding && (
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="ml-auto">
                Columns <ChevronDown />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {typeof column.columnDef.header === "string"
                        ? column.columnDef.header
                        : column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <div className={isBorderActive ? "rounded-md border" : ""}>
        <Table>
          <TableHeader>
            {!isLoading &&
              table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead className="text-[12px]" key={header.id}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...(header.column.getCanSort() && {
                              onClick: header.column.getToggleSortingHandler(),
                            })}
                            className={`flex items-center space-x-1 ${
                              header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : ""
                            }`}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                            {{
                              asc: " 🔼",
                              desc: " 🔽",
                            }[header.column.getIsSorted()] ?? null}
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
          </TableHeader>
          {isLoading && (
            <TableBody>
              <TableRow>
                <TableCell colSpan={modifiedColumns?.length}>
                  <div className="py-4 w-full animate-fade-in">
                    <Loader2 className="mx-auto animate-spin" size={32} />
                  </div>
                </TableCell>
              </TableRow>
            </TableBody>
          )}

          {!isLoading && table && data?.length > 0 && (
            <TableBody className="animate-fade-in dark:bg-black dark:text-white">
              {(table?.getRowModel()?.rows?.length ?? 0) > 0 ? (
                table?.getRowModel()?.rows?.map((row) => (
                  <TableRow
                    onClick={() => {
                      onRowClick(row.original);
                    }}
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                    className={`text-[12px] !min-h-[41px] ${
                      autoCapitalizeCells ? "capitalize " : " "
                    } ${rowClass ?? ""}
                    `}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell
                        className={
                          isFilled
                            ? "text-[12px] h-[50px] p-0 dark:text-white"
                            : "text-[12px] !min-h-[41px]"
                        }
                        key={cell.id}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={modifiedColumns?.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          )}
        </Table>
      </div>
      {isPaginationActive && (
        <DataTablePagination
          table={table}
          onPageChange={pagination?.onPageChange}
          onRowsPerPageChange={pagination?.onRowsPerPageChange}
        />
      )}
    </div>
  );
}
