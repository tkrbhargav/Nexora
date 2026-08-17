import type { Column } from "@tanstack/react-table";
import { PlusCircleIcon } from "lucide-react";

import { Button } from "@/components/ui/button";

import {
	DropdownMenu,
	DropdownMenuCheckboxItem,
	DropdownMenuContent,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export type FacetedFilterOption = {
	label: string;
	value: string;
};

type Props<TData, TValue> = {
	column?: Column<TData, TValue>;
	title: string;
	options: FacetedFilterOption[];
};

export function DataTableFacetedFilter<TData, TValue>({
	column,
	title,
	options,
}: Props<TData, TValue>) {
	if (!column) {
		return null;
	}

	const selectedValues =
		(column.getFilterValue() as string[] | undefined) ?? [];

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button variant="outline">
					<PlusCircleIcon className="mr-2 size-4" />
					{title}
				</Button>
			</DropdownMenuTrigger>

			<DropdownMenuContent align="start">
				<DropdownMenuLabel>{title}</DropdownMenuLabel>

				<DropdownMenuSeparator />

				{options.map((option) => {
					const checked = selectedValues.includes(option.value);

					return (
						<DropdownMenuCheckboxItem
							key={option.value}
							checked={checked}
							onCheckedChange={(value) => {
								const next = value
									? [...selectedValues, option.value]
									: selectedValues.filter((item) => item !== option.value);

								column.setFilterValue(next.length ? next : undefined);
							}}
						>
							{option.label}
						</DropdownMenuCheckboxItem>
					);
				})}
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
