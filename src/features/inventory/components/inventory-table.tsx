import type {
	ColumnFiltersState,
	PaginationState,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { getInventoryColumns } from "../columns/inventory-columns";
import inventoryData from "../data/inventory.json";
import type { InventoryItem } from "../types/inventory.types";
import { AddInventoryItemForm } from "./add-inventory-item-form";

export function InventoryTable() {
	const [sorting, setSorting] = useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const [globalFilter, setGlobalFilter] = useState("");

	const [formOpen, setFormOpen] = useState(false);
	const [editingItem, setEditingItem] = useState<InventoryItem | null>(null);

	const handleEdit = (item: InventoryItem) => {
		setEditingItem(item);
		setFormOpen(true);
	};

	const handleFormClose = (open: boolean) => {
		setFormOpen(open);
		if (!open) setEditingItem(null);
	};

	const handleAddNew = () => {
		setEditingItem(null);
		setFormOpen(true);
	};

	const columns = useMemo(
		() =>
			getInventoryColumns({
				onView: (item) => {
					console.log("View item:", item);
				},

				onEdit: handleEdit,

				onDelete: (item) => {
					console.log("Delete item:", item);
				},
			}),
		[],
	);

	const items = inventoryData as InventoryItem[];

	return (
		<>
			<DataTable
				columns={columns}
				data={items}
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
				buttonTitle="Add Item"
				onButtonClick={handleAddNew}
				onRowClick={handleEdit}
			/>

			<AddInventoryItemForm
				open={formOpen}
				onOpenChange={handleFormClose}
				initialData={editingItem}
			/>
		</>
	);
}

