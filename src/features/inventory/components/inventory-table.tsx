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

	const [addItemOpen, setAddItemOpen] = useState(false);

	const columns = useMemo(
		() =>
			getInventoryColumns({
				onView: (item) => {
					console.log("View item:", item);
				},

				onEdit: (item) => {
					console.log("Edit item:", item);
				},

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
				onButtonClick={() => setAddItemOpen(true)}
			/>

			<AddInventoryItemForm open={addItemOpen} onOpenChange={setAddItemOpen} />
		</>
	);
}
