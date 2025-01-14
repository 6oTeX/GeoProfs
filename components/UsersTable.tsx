"use client";
import React from "react";
import { useState } from "react";
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
import { ArrowUpDown, ChevronDown, MoreHorizontal, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { cn } from "@/utils/cn";

export type User = {
  id: string;
  balance: number;
  werknemer: {
    firstName: string;
    lastName: string;
    email: string;
  };
  status: "Aanwezig" | "Afwezig";
  section: {
    team: string;
    role: string;
  };
};

export interface IUserView {
  // Additional or different fields as needed
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  balance: number;
  status: string;
  team: string;
  role: string;
}

// Column definitions: outside the component for clarity
export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "werknemer",
    header: "Werknemer",
    cell: ({ row }) => {
      const { firstName, lastName, email } = row.original.werknemer;
      return (
        <div>
          <div className="capitalize font-semibold">
            {firstName} {lastName}
          </div>
          <div className="lowercase text-muted-foreground">{email}</div>
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: "Saldo",
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.balance}</div>;
    },
  },
  {
    accessorKey: "status",
    header: () => <div className="text-right">Status</div>,
    cell: ({ row }) => {
      const status = row.original.status;
      return (
        <div
          className={cn(
            status === "Aanwezig" ? "text-green-600" : "text-red-600",
            "text-right font-bold"
          )}
        >
          {status}
        </div>
      );
    },
  },
];

interface UsersTableProps {
  users: User[];
}

export function UsersTable({ users }: UsersTableProps) {
  // Local copy of user data so we can update on edit
  const [internalUsers, setInternalUsers] = useState<User[]>(users);

  // Extract all unique teams from initial users (ensure no duplicates)
  const UserTeams = React.useMemo(() => {
    const teamsSet = new Set(users.map((user) => user.section.team));
    return Array.from(teamsSet);
  }, [users]);

  const UserRol = React.useMemo(() => {
    const RolSet = new Set(users.map((user) => user.section.role));
    return Array.from(RolSet);
  }, [users]);

  // Table states
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = useState({});
  const [filterStatus, setFilterStatus] = useState<string>("alle");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedsection, setSelectedsection] = useState<string>(
    UserTeams[0] || ""
  );

  // Dialog states
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDialog, setShowDialog] = useState(false);
  const [editMode, setEditMode] = useState(false);

  // Editable fields in the dialog
  const [editFirstName, setEditFirstName] = useState("");
  const [editLastName, setEditLastName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editbalance, setEditbalance] = useState(0);
  const [editStatus, setEditStatus] = useState<"Aanwezig" | "Afwezig">(
    "Aanwezig"
  );
  const [editTeam, setEditTeam] = useState("");
  const [editRole, setEditRole] = useState("");

  // Filtered data
  const filteredData = React.useMemo(() => {
    let filtered = [...internalUsers];
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
    if (selectedsection) {
      filtered = filtered.filter(
        (user) => user.section.team === selectedsection
      );
    }
    return filtered;
  }, [internalUsers, filterStatus, searchQuery, selectedsection]);

  // Table
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

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    autoTable(doc, {
      head: [["Werknemer", "Email", "Saldo", "Status"]],
      body: filteredData.map((user) => [
        `${user.werknemer.firstName} ${user.werknemer.lastName}`,
        user.werknemer.email,
        user.balance.toString(),
        user.status,
      ]),
    });
    doc.save("users_table.pdf");
  };

  // Handle row click -> open dialog
  const handleRowClick = (user: User) => {
    setSelectedUser(user);
    setEditFirstName(user.werknemer.firstName);
    setEditLastName(user.werknemer.lastName);
    setEditEmail(user.werknemer.email);
    setEditbalance(user.balance);
    setEditStatus(user.status);
    setEditTeam(user.section.team);
    setEditRole(user.section.role);
    setShowDialog(true);
    setEditMode(false);
  };

  const closeDialog = () => {
    setShowDialog(false);
    setSelectedUser(null);
  };

  // Toggle edit mode
  const handleEdit = () => {
    setEditMode(!editMode);
  };

  // Save changes
  const handleSave = () => {
    if (!selectedUser) return;

    const updatedUser: User = {
      ...selectedUser,
      balance: editbalance,
      status: editStatus,
      werknemer: {
        ...selectedUser.werknemer,
        firstName: editFirstName,
        lastName: editLastName,
        email: editEmail,
      },
      section: {
        ...selectedUser.section,
        team: editTeam,
        role: editRole,
      },
    };

    setInternalUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? updatedUser : u))
    );
    setEditMode(false);
  };

  return (
    <div className="w-full border rounded-lg p-4">
      <div className="flex items-center justify-between pb-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold">Personeel</h1>
          <h3 className="text-base">Aanwezigheid van actieve werknemers</h3>
        </div>
        <div className="flex items-center space-x-2">
          <Select value={selectedsection} onValueChange={setSelectedsection}>
            <SelectTrigger className="w-fit">
              <SelectValue placeholder="Select a group" />
            </SelectTrigger>
            <SelectContent>
              {UserTeams.map((section) => (
                <SelectItem key={section} value={section}>
                  {section}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input
            placeholder="Zoeken (naam of email)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Button variant="outline" onClick={exportToPDF}>
            Exporteren als PDF
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
            onClick={() => setFilterStatus("Aanwezig")}
            className={
              filterStatus === "Aanwezig"
                ? "bg-background"
                : "bg-transparent text-muted-foreground"
            }
          >
            Aanwezig
          </Button>
          <Button
            variant="outline"
            onClick={() => setFilterStatus("Afwezig")}
            className={
              filterStatus === "Afwezig"
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
                <TableRow
                  key={row.id}
                  className="border-b hover:bg-accent cursor-pointer"
                  // When a row is clicked, open the dialog
                  onClick={() => handleRowClick(row.original)}
                >
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
                  Geen resultaten gevonden.
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
            Vorige
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Volgende
          </Button>
        </div>
      </div>

      {/* Dialog for user details */}
      {showDialog && selectedUser && (
        <Dialog open={showDialog} onOpenChange={closeDialog}>
          <DialogContent className="max-w-lg">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Gebruiker Details</h2>
              <Button variant="ghost" onClick={closeDialog}>
                X
              </Button>
            </div>
            {/* Editable fields */}
            <div className="space-y-4">
              <div>
                <Label>Voornaam</Label>
                <Input
                  value={
                    editMode ? editFirstName : selectedUser.werknemer.firstName
                  }
                  onChange={(e) => setEditFirstName(e.target.value)}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label>Achternaam</Label>
                <Input
                  value={
                    editMode ? editLastName : selectedUser.werknemer.lastName
                  }
                  onChange={(e) => setEditLastName(e.target.value)}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label>Email</Label>
                <Input
                  value={editMode ? editEmail : selectedUser.werknemer.email}
                  onChange={(e) => setEditEmail(e.target.value)}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label>Saldo</Label>
                <Input
                  type="number"
                  value={editMode ? editbalance : selectedUser.balance}
                  onChange={(e) => setEditbalance(Number(e.target.value))}
                  disabled={!editMode}
                />
              </div>
              <div>
                <Label>Status</Label>
                <select
                  value={editMode ? editStatus : selectedUser.status}
                  onChange={(e) =>
                    setEditStatus(e.target.value as "Aanwezig" | "Afwezig")
                  }
                  disabled={!editMode}
                  className="border border-gray-300 rounded p-2 w-full"
                >
                  <option value="Aanwezig">Aanwezig</option>
                  <option value="Afwezig">Afwezig</option>
                </select>
              </div>
              <div>
                <Label>Team</Label>
                <select
                  value={editTeam}
                  onChange={(e) => setEditTeam(e.target.value)}
                  disabled={!editMode}
                  className="border border-gray-300 rounded p-2 w-full"
                >
                  {UserTeams.map((team) => (
                    <option key={team} value={team}>
                      {team}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <Label>Rol</Label>
                <select
                  value={editRole}
                  onChange={(e) => setEditRole(e.target.value)}
                  disabled={!editMode}
                  className="border border-gray-300 rounded p-2 w-full"
                >
                  {UserRol.map((rol) => (
                    <option key={rol} value={rol}>
                      {rol}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <DialogFooter className="mt-4">
              {!editMode ? (
                <Button onClick={handleEdit}>Bewerken</Button>
              ) : (
                <Button onClick={handleSave}>Opslaan</Button>
              )}
              <Button variant="outline" onClick={closeDialog}>
                Sluiten
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
