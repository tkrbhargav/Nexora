import { UserTable } from "@/features/users";
import { AppBreadCrumb } from "@/components/app-breadcrumb";

export default function UsersPage() {
	return (
		<div className="space-y-6">
			<AppBreadCrumb
				title="Users"
				description="Manage your users and their permissions."
			/>

			<UserTable />
		</div>
	);
}
