import { MoreHorizontalIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Props<TData> = {
	row: TData;
	onView?: (row: TData) => void;
	onEdit?: (row: TData) => void;
	onDelete?: (row: TData) => void;
};

export function DataTableActions<TData>({
	row,
	onView,
	onEdit,
	onDelete,
}: Props<TData>) {
	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" size="icon">
					<MoreHorizontalIcon className="size-4" />
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="end">
				{onView && (
					<DropdownMenuItem onClick={() => onView(row)}>View</DropdownMenuItem>
				)}

				{onEdit && (
					<DropdownMenuItem onClick={() => onEdit(row)}>Edit</DropdownMenuItem>
				)}

				{onDelete && (
					<DropdownMenuItem
						className="text-destructive"
						onClick={() => onDelete(row)}
					>
						Delete
					</DropdownMenuItem>
				)}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
