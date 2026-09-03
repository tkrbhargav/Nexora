import { OrganizationTable } from "@/features/organization";
import { AppBreadCrumb } from "@/components/app-breadcrumb";

export default function OrganizationsPage() {
	return (
		<div className="space-y-6">
			<AppBreadCrumb
				title="Organizations"
				description="Manage your organizations and their details."
			/>

			<OrganizationTable />
		</div>
	);
}