import { OrganizationTable } from "@/features/organization";

export default function OrganizationsPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">Organizations</h1>
				<p className="text-muted-foreground">
					Manage your organizations and their details.
				</p>
			</div>

			<OrganizationTable />
		</div>
	);
}