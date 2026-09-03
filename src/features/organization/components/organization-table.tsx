import type {
	ColumnFiltersState,
	PaginationState,
	SortingState,
	VisibilityState,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router";

import { DataTable } from "@/components/data-table/data-table";
import { useAppStore } from "@/store";
import { getOrganizationColumns } from "../columns/organization-columns";
import organizationsData from "../data/organizations.json";
import type { Organization } from "../types/organization.types";
import { AddOrganizationForm } from "./add-organization-form";

export function OrganizationTable() {
	const navigate = useNavigate();
	const currentUser = useAppStore((s) => s.user);
	const isAdmin = currentUser?.role
		? ["super-admin", "admin", "manager"].includes(currentUser.role)
		: window.location.pathname.startsWith("/admin");
	const basePath = isAdmin ? "/admin" : "";
	const [sorting, setSorting] = useState<SortingState>([]);

	const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

	const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

	const [pagination, setPagination] = useState<PaginationState>({
		pageIndex: 0,
		pageSize: 10,
	});

	const [globalFilter, setGlobalFilter] = useState("");

	const [formOpen, setFormOpen] = useState(false);
	const [editingOrg, setEditingOrg] = useState<Organization | null>(null);

	const handleEdit = (organization: Organization) => {
		setEditingOrg(organization);
		setFormOpen(true);
	};

	const handleFormClose = (open: boolean) => {
		setFormOpen(open);
		if (!open) setEditingOrg(null);
	};

	const handleAddNew = () => {
		setEditingOrg(null);
		setFormOpen(true);
	};

	const columns = useMemo(
		() =>
			getOrganizationColumns({
				onView: (organization) => {
					navigate(`${basePath}/organizations/${organization.id}`);
				},

				onEdit: handleEdit,

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
				onButtonClick={handleAddNew}
				onRowClick={(organization) => {
					navigate(`${basePath}/organizations/${organization.id}`);
				}}
			/>

			<AddOrganizationForm
				open={formOpen}
				onOpenChange={handleFormClose}
				initialData={editingOrg}
			/>
		</>
	);
}

