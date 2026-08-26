import type {
	ColumnFiltersState,
	PaginationState,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { getOrganizationColumns } from "../columns/organization-columns";
import organizationsData from "../data/organizations.json";
import type { Organization } from "../types/organization.types";
import { AddOrganizationForm } from "./add-organization-form";

export function OrganizationTable() {
	const [sorting, setSorting] = useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const [globalFilter, setGlobalFilter] = useState("");

	const [addOrgOpen, setAddOrgOpen] = useState(false);

	const columns = useMemo(
		() =>
			getOrganizationColumns({
				onView: (organization) => {
					console.log("View organization:", organization);
				},

				onEdit: (organization) => {
					console.log("Edit organization:", organization);
				},

				onDelete: (organization) => {
					console.log("Delete organization:", organization);
				},
			}),
		[],
	);

	const organizations = organizationsData as Organization[];

	return (
		<>
			<DataTable
				columns={columns}
				data={organizations}
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
				buttonTitle="Add Organization"
				onButtonClick={() => setAddOrgOpen(true)}
			/>

			<AddOrganizationForm open={addOrgOpen} onOpenChange={setAddOrgOpen} />
		</>
	);
}
