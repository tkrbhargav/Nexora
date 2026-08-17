import type { ColumnDef } from "@tanstack/react-table";

import { DataTableActions } from "@/components/data-table/data-table-actions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import type { User } from "../types/user.types";

type UserColumnsProps = {
	onView: (user: User) => void;
	onEdit: (user: User) => void;
	onDelete: (user: User) => void;
};

export function getUserColumns({
	onView,
	onEdit,
	onDelete,
}: UserColumnsProps): ColumnDef<User>[] {
	return [
		{
			accessorKey: "name",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Name" />
			),
			enableSorting: true,
		},

		{
			accessorKey: "email",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Email" />
			),
			enableSorting: true,
		},

		{
			accessorKey: "role",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Role" />
			),
			enableSorting: true,
			enableColumnFilter: true,
		},

		{
			accessorKey: "status",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Status" />
			),
			enableSorting: true,
			enableColumnFilter: true,
		},

		{
			accessorKey: "createdAt",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Created At" />
			),
			enableSorting: true,
		},

		{
			id: "actions",
			enableHiding: false,
			enableSorting: false,

			cell: ({ row }) => (
				<DataTableActions
					row={row.original}
					onView={onView}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			),
		},
	];
}
