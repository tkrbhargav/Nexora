import type { ColumnDef } from "@tanstack/react-table";

import { DataTableActions } from "@/components/data-table/data-table-actions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import type { Organization } from "../types/organization.types";

type OrganizationColumnsProps = {
	onView: (organization: Organization) => void;
	onEdit: (organization: Organization) => void;
	onDelete: (organization: Organization) => void;
};

export function getOrganizationColumns({
	onView,
	onEdit,
	onDelete,
}: OrganizationColumnsProps): ColumnDef<Organization>[] {
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
			accessorKey: "industry",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Industry" />
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
			accessorKey: "plan",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Plan" />
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
