import { UserTable } from "@/features/users";
 
export default function UsersPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">Users</h1>
				<p className="text-muted-foreground">
					Manage your users and their permissions.
				</p>
			</div>

			<UserTable />
		</div>
	);
}