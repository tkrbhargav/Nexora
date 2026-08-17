import type { Table } from "@tanstack/react-table";
import { Settings2Icon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props<TData> = {
	table: Table<TData>;
};

export function DataTableViewOptions<TData>({ table }: Props<TData>) {
	const columns = table
		.getAllLeafColumns()
		.filter((column) => column.getCanHide());

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<Settings2Icon className="mr-2 size-4" />
					Columns
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Show columns</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{columns.map((column) => (
					<DropdownMenuCheckboxItem
						key={column.id}
						checked={column.getIsVisible()}
						onCheckedChange={(value) => column.toggleVisibility(Boolean(value))}
					>
						{column.id}
					</DropdownMenuCheckboxItem>
				))}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
