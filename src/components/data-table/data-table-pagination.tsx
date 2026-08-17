import type { Table } from "@tanstack/react-table";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props<TData> = {
	table: Table<TData>;
};

export function DataTablePagination<TData>({ table }: Props<TData>) {
	return (
		<div className="flex items-center justify-between">
			<div className="text-muted-foreground text-sm">
				Page {table.getState().pagination.pageIndex + 1}
			</div>

			<div className="flex items-center gap-2">
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
	);
}
