"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const data: Users[] = [
  {
    id: "m5gr84i9",
    verlofSaldo: 316,
    werknemer: {
      firstName: "Mark",
      lastName: "Johnson",
      email: "ken99@yahoo.com",
    },
    status: "aanwezig",
  },
  {
    id: "m5gr84i9",
    verlofSaldo: 316,
    werknemer: {
      firstName: "Jay",
      lastName: "Rock",
      email: "kegadsgn99@yahoo.com",
    },
    status: "aanwezig",
  },
  {
    id: "m5gr84i9",
    verlofSaldo: 316,
    werknemer: {
      firstName: "Rick",
      lastName: "Stan",
      email: "gasfaf@gmail.com",
    },
    status: "aanwezig",
  },
  {
    id: "3u1reuv4",
    verlofSaldo: 242,
    werknemer: {
      firstName: "Abe",
      lastName: "Smith",
      email: "Abe45@gmail.com",
    },
    status: "afwezig",
  },
  {
    id: "derv1ws0",
    verlofSaldo: 837,
    werknemer: {
      firstName: "Monserrat",
      lastName: "Smith",
      email: "Monserrat44@gmail.com",
    },
    status: "aanwezig",
  },
  {
    id: "5kma53ae",
    verlofSaldo: 874,
    werknemer: {
      firstName: "Silas",
      lastName: "Smith",
      email: "Silas22@gmail.com",
    },
    status: "afwezig",
  },
  {
    id: "bhqecj4p",
    verlofSaldo: 721,
    werknemer: {
      firstName: "Carmella",
      lastName: "Smith",
      email: "carmella@hotmail.com",
    },
    status: "aanwezig",
  },
  {
    id: "bhqecj4p",
    verlofSaldo: 721,
    werknemer: {
      firstName: "Carmella",
      lastName: "Smith",
      email: "carmella@hotmail.com",
    },
    status: "aanwezig",
  },
  {
    id: "bhqecj4p",
    verlofSaldo: 721,
    werknemer: {
      firstName: "Carmella",
      lastName: "Smith",
      email: "carmella@hotmail.com",
    },
    status: "aanwezig",
  },
  {
    id: "bhqecj4p",
    verlofSaldo: 721,
    werknemer: {
      firstName: "Carmella",
      lastName: "Smith",
      email: "carmella@hotmail.com",
    },
    status: "aanwezig",
  },
  {
    id: "bhqecj4p",
    verlofSaldo: 721,
    werknemer: {
      firstName: "Carmella",
      lastName: "Smith",
      email: "carmella@hotmail.com",
    },
    status: "aanwezig",
  },
  {
    id: "bhqecj4p",
    verlofSaldo: 721,
    werknemer: {
      firstName: "Carmella",
      lastName: "Smith",
      email: "carmella@hotmail.com",
    },
    status: "aanwezig",
  },
  {
    id: "bhqecj4p",
    verlofSaldo: 721,
    werknemer: {
      firstName: "Carmella",
      lastName: "Smith",
      email: "carmella@hotmail.com",
    },
    status: "aanwezig",
  },
];

export type Users = {
  id: string;
  verlofSaldo: number;
  werknemer: any;
  status: "aanwezig" | "afwezig";
};

export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "werknemer",
    header: "Werknemer",
    cell: ({ row }) => (
      <div>
        <div className="capitalize font-semibold">
          {row.original.werknemer.firstName} {row.original.werknemer.lastName}
        </div>
        <div className="lowercase text-muted-foreground">
          {row.original.werknemer.email}
        </div>
      </div>
    ),
  },
  {
    accessorKey: "verlofSaldo",
    header: () => <div className="text-right">verlofSaldo</div>,
    cell: ({ row }) => {
      const verlofSaldo = parseFloat(row.getValue("verlofSaldo"));

      const formatted = new Intl.NumberFormat("nl-NL", {
        style: "currency",
        currency: "EUR",
      }).format(verlofSaldo);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div
        className={
          row.original.status === "aanwezig"
            ? "text-green-600 font-bold"
            : "text-red-600 font-bold"
        }
      >
        {row.original.status}
      </div>
    ),
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const Users = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(Users.id)}
            >
              Copy Users ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View Users details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function UsersTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [filterStatus, setFilterStatus] = React.useState<string>("alle");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredData = React.useMemo(() => {
    let filtered = data;
    if (filterStatus !== "alle") {
      filtered = filtered.filter((user) => user.status === filterStatus);
    }
    if (searchQuery) {
      filtered = filtered.filter(
        (user) =>
          `${user.werknemer.firstName} ${user.werknemer.lastName}`
            .toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          user.werknemer.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    return filtered;
  }, [filterStatus, searchQuery]);

  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Werknemer", "Email", "VerlofSaldo", "Status"]],
      body: filteredData.map((user) => [
        `${user.werknemer.firstName} ${user.werknemer.lastName}`,
        user.werknemer.email,
        new Intl.NumberFormat("nl-NL", {
          style: "currency",
          currency: "EUR",
        }).format(user.verlofSaldo),
        user.status,
      ]),
    });
    doc.save("users_table.pdf");
  };

  return (
    <div className="w-full border rounded-lg p-4">
      <div className="flex items-center justify-between pb-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Personeel</h1>
          <h3 className="text-base">Aanwezigheid van actiefe werknemers</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Input
            placeholder="Search by name or email"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline" onClick={exportToPDF}>
            Export as PDF
          </Button>
        </div>
      </div>
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center space-x-4 bg-gray-200 p-1 rounded">
          <Button
            variant="outline"
            onClick={() => setFilterStatus("alle")}
            className={
              filterStatus === "alle"
                ? "bg-background"
                : "bg-transparent text-muted-foreground"
            }
          >
            Alle
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterStatus("aanwezig")}
            className={
              filterStatus === "aanwezig"
                ? "bg-background"
                : "bg-transparent text-muted-foreground"
            }
          >
            Aanwezig
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterStatus("afwezig")}
            className={
              filterStatus === "afwezig"
                ? "bg-background"
                : "bg-transparent text-muted-foreground"
            }
          >
            Afwezig
          </Button>
        </div>
      </div>
      <div className="rounded-md border">
        <Table className="border-collapse border-spacing-0">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} className="border-b">
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
