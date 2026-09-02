import type { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

const PAGE_SIZE_OPTIONS = [10, 20, 50, 100];

type Props<TData> = {
	table: Table<TData>;
};

export function DataTablePagination<TData>({ table }: Props<TData>) {
	const { pageIndex, pageSize } = table.getState().pagination;
	const totalRows = table.getFilteredRowModel().rows.length;
	const startRow = pageIndex * pageSize + 1;
	const endRow = Math.min((pageIndex + 1) * pageSize, totalRows);

	return (
		<div className="flex items-center justify-between gap-4 flex-wrap">
			{/* Row info */}
			<div className="text-muted-foreground text-sm">
				Showing {totalRows > 0 ? startRow : 0}–{endRow} of {totalRows} rows
			</div>

			<div className="flex items-center gap-4">
				{/* Page size selector */}
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground whitespace-nowrap">Rows per page</span>
					<Select
						value={String(pageSize)}
						onValueChange={(value) => {
							table.setPageSize(Number(value));
						}}
					>
						<SelectTrigger className="h-8 w-[72px] text-sm">
							<SelectValue />
						</SelectTrigger>
						<SelectContent>
							{PAGE_SIZE_OPTIONS.map((size) => (
								<SelectItem key={size} value={String(size)}>
									{size}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
				</div>

				{/* Page nav */}
				<div className="flex items-center gap-2">
					<span className="text-sm text-muted-foreground tabular-nums">
						Page {pageIndex + 1} of {table.getPageCount() || 1}
					</span>

					<Button
						variant="outline"
						size="sm"
						disabled={!table.getCanPreviousPage()}
						onClick={() => table.previousPage()}
					>
						<ChevronLeftIcon className="size-4" />
						Previous
					</Button>

					<Button
						variant="outline"
						size="sm"
						disabled={!table.getCanNextPage()}
						onClick={() => table.nextPage()}
					>
						Next
						<ChevronRightIcon className="size-4" />
					</Button>
				</div>
			</div>
		</div>
	);
}

