import { InventoryTable } from "@/features/inventory";
import { AppBreadCrumb } from "@/components/app-breadcrumb";

export default function InventoryPage() {
	return (
		<div className="space-y-6">
			<AppBreadCrumb
				title="Inventory"
				description="Manage your inventory items and stock levels."
			/>

			<InventoryTable />
		</div>
	);
}