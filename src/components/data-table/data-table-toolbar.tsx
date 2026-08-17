import type { Table } from "@tanstack/react-table";

import { Input } from "@/components/ui/input";

import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { DataTableViewOptions } from "./data-table-view-options";

type Props<TData> = {
	table: Table<TData>;
	search: string;
	onSearchChange: (value: string) => void;
};

export function DataTableToolbar<TData>({
	table,
	search,
	onSearchChange,
}: Props<TData>) {
	return (
		<div className="flex items-center justify-between gap-2">
			<div className="flex flex-1 items-center gap-2">
				<Input
					placeholder="Search..."
					value={search}
					onChange={(event) => onSearchChange(event.target.value)}
					className="h-8 w-[250px]"
				/>

				<DataTableFacetedFilter
					column={table.getColumn("status")}
					title="Status"
					options={[
						{
							label: "Active",
							value: "active",
						},
						{
							label: "Inactive",
							value: "inactive",
						},
					]}
				/>

				<DataTableFacetedFilter
					column={table.getColumn("type")}
					title="Type"
					options={[
						{
							label: "Service",
							value: "service",
						},
						{
							label: "Retail",
							value: "retail",
						},
					]}
				/>
			</div>

			<DataTableViewOptions table={table} />
		</div>
	);
}
