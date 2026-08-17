import type { Column } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

type Props<TData, TValue> = {
	column: Column<TData, TValue>;
	title: string;
};

export function DataTableColumnHeader<TData, TValue>({
	column,
	title,
}: Props<TData, TValue>) {
	if (!column.getCanSort()) {
		return <div>{title}</div>;
	}

	const sorted = column.getIsSorted();

	return (
		<Button
			variant="ghost"
			className="-ml-3 h-8"
			onClick={() => column.toggleSorting()}
		>
			{title}

			{sorted === "asc" && <ArrowUpIcon className="ml-2 size-4" />}

			{sorted === "desc" && <ArrowDownIcon className="ml-2 size-4" />}

			{!sorted && <ChevronsUpDownIcon className="ml-2 size-4" />}
		</Button>
	);
}
