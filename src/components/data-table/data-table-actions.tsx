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
		<div onClick={(e) => e.stopPropagation()}>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="ghost"
						size="icon"
						onClick={(e) => e.stopPropagation()}
					>
						<MoreHorizontalIcon className="size-4" />
					</Button>
				</DropdownMenuTrigger>

				<DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
					{onView && (
						<DropdownMenuItem
							onClick={(e) => {
								e.stopPropagation();
								onView(row);
							}}
						>
							View
						</DropdownMenuItem>
					)}

					{onEdit && (
						<DropdownMenuItem
							onClick={(e) => {
								e.stopPropagation();
								onEdit(row);
							}}
						>
							Edit
						</DropdownMenuItem>
					)}

					{onDelete && (
						<DropdownMenuItem
							className="text-destructive"
							onClick={(e) => {
								e.stopPropagation();
								onDelete(row);
							}}
						>
							Delete
						</DropdownMenuItem>
					)}
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
