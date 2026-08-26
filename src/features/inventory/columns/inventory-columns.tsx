import type { ColumnDef } from "@tanstack/react-table";

import { DataTableActions } from "@/components/data-table/data-table-actions";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";

import type { InventoryItem } from "../types/inventory.types";

type InventoryColumnsProps = {
	onView: (item: InventoryItem) => void;
	onEdit: (item: InventoryItem) => void;
	onDelete: (item: InventoryItem) => void;
};

export function getInventoryColumns({
	onView,
	onEdit,
	onDelete,
}: InventoryColumnsProps): ColumnDef<InventoryItem>[] {
	return [
		{
			accessorKey: "name",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Name" />
			),
			enableSorting: true,
		},

		{
			accessorKey: "sku",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="SKU" />
			),
			enableSorting: true,
		},

		{
			accessorKey: "category",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Category" />
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
			accessorKey: "quantity",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Quantity" />
			),
			enableSorting: true,
		},

		{
			accessorKey: "price",
			header: ({ column }) => (
				<DataTableColumnHeader column={column} title="Price" />
			),
			enableSorting: true,
			cell: ({ row }) => {
				const price = Number.parseFloat(row.getValue("price"));
				const formatted = new Intl.NumberFormat("en-US", {
					style: "currency",
					currency: "USD",
				}).format(price);
				return formatted;
			},
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
