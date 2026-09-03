import type {
	ColumnFiltersState,
	PaginationState,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { DataTable } from "@/components/data-table/data-table";
import { useAppStore } from "@/store";
import { getUserColumns } from "../columns/user-columns";
import usersData from "../data/users.json";
import type { User } from "../types/user.types";
import { AddUserForm } from "./add-user-form";

export function UserTable() {
	const navigate = useNavigate();
	const currentUser = useAppStore((s) => s.user);
	const isAdmin = currentUser?.role
		? ["super-admin", "admin", "manager"].includes(currentUser.role)
		: window.location.pathname.startsWith("/admin");
	const basePath = isAdmin ? "/admin" : "";

	const [sorting, setSorting] = useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const [globalFilter, setGlobalFilter] = useState("");

	const [formOpen, setFormOpen] = useState(false);
	const [editingUser, setEditingUser] = useState<User | null>(null);

	const handleEdit = (user: User) => {
		setEditingUser(user);
		setFormOpen(true);
	};

	const handleFormClose = (open: boolean) => {
		setFormOpen(open);
		if (!open) setEditingUser(null);
	};

	const handleAddNew = () => {
		setEditingUser(null);
		setFormOpen(true);
	};

	const columns = useMemo(
		() =>
			getUserColumns({
				onView: (user) => {
					navigate(`${basePath}/users/${user.id}`);
				},

				onEdit: handleEdit,

				onDelete: (user) => {
					console.log("Delete user:", user);
				},
			}),
		[],
	);

	const users = usersData as User[];

	return (
		<>
			<DataTable
				columns={columns}
				data={users}
				sorting={sorting}
				onSortingChange={setSorting}
				columnFilters={columnFilters}
				onColumnFiltersChange={setColumnFilters}
				columnVisibility={columnVisibility}
				onColumnVisibilityChange={setColumnVisibility}
				pagination={pagination}
				onPaginationChange={setPagination}
				globalFilter={globalFilter}
				onGlobalFilterChange={setGlobalFilter}
				buttonTitle="Add User"
				onButtonClick={handleAddNew}
				onRowClick={(user) => {
					navigate(`${basePath}/users/${user.id}`);
				}}
			/>

			<AddUserForm
				open={formOpen}
				onOpenChange={handleFormClose}
				initialData={editingUser}
			/>
		</>
	);
}
