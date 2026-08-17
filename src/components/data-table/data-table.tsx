import {
	type ColumnDef,
	type ColumnFiltersState,
	flexRender,
	getCoreRowModel,
	getFilteredRowModel,
	getPaginationRowModel,
	getSortedRowModel,
	type PaginationState,
	type SortingState,
	useReactTable,
	type VisibilityState,
} from "@tanstack/react-table";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";

type DataTableProps<TData, TValue> = {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];

	sorting: SortingState;
	onSortingChange: (sorting: SortingState) => void;

	columnFilters: ColumnFiltersState;
	onColumnFiltersChange: (filters: ColumnFiltersState) => void;

	columnVisibility: VisibilityState;
	onColumnVisibilityChange: (visibility: VisibilityState) => void;

	pagination: PaginationState;
	onPaginationChange: (pagination: PaginationState) => void;

	globalFilter: string;
	onGlobalFilterChange: (value: string) => void;

	pageCount?: number;
	manualSorting?: boolean;
	manualFiltering?: boolean;
	manualPagination?: boolean;
};

export function DataTable<TData, TValue>({
	columns,
	data,

	sorting,
	onSortingChange,

	columnFilters,
	onColumnFiltersChange,

	columnVisibility,
	onColumnVisibilityChange,

	pagination,
	onPaginationChange,

	globalFilter,
	onGlobalFilterChange,

	pageCount,
	manualSorting = false,
	manualFiltering = false,
	manualPagination = false,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,

		state: {
			sorting,
			columnFilters,
			columnVisibility,
			pagination,
			globalFilter,
		},

		onSortingChange: (updater) => {
			const next = typeof updater === "function" ? updater(sorting) : updater;

			onSortingChange(next);
		},

		onColumnFiltersChange: (updater) => {
			const next =
				typeof updater === "function" ? updater(columnFilters) : updater;

			onColumnFiltersChange(next);
		},

		onColumnVisibilityChange: (updater) => {
			const next =
				typeof updater === "function" ? updater(columnVisibility) : updater;

			onColumnVisibilityChange(next);
		},

		onPaginationChange: (updater) => {
			const next =
				typeof updater === "function" ? updater(pagination) : updater;

			onPaginationChange(next);
		},

		onGlobalFilterChange: (updater) => {
			const next =
				typeof updater === "function" ? updater(globalFilter) : updater;

			onGlobalFilterChange(next);
		},

		getCoreRowModel: getCoreRowModel(),
		getSortedRowModel: manualSorting ? undefined : getSortedRowModel(),
		getFilteredRowModel: manualFiltering ? undefined : getFilteredRowModel(),
		getPaginationRowModel: manualPagination
			? undefined
			: getPaginationRowModel(),

		manualSorting,
		manualFiltering,
		manualPagination,
		...(pageCount !== undefined && { pageCount }),

		enableHiding: true,
		enableSorting: true,
	});

	return (
		<div className="space-y-4">
			<DataTableToolbar
				table={table}
				search={globalFilter}
				onSearchChange={onGlobalFilterChange}
			/>

			<div className="rounded-md border">
				<Table>
					<TableHeader>
						{table.getHeaderGroups().map((headerGroup) => (
							<TableRow key={headerGroup.id}>
								{headerGroup.headers.map((header) => (
									<TableHead key={header.id}>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext(),
												)}
									</TableHead>
								))}
							</TableRow>
						))}
					</TableHeader>

					<TableBody>
						{table.getRowModel().rows.length ? (
							table.getRowModel().rows.map((row) => (
								<TableRow key={row.id}>
									{row.getVisibleCells().map((cell) => (
										<TableCell key={cell.id}>
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

			<DataTablePagination table={table} />
		</div>
	);
}
