import { InventoryTable } from "@/features/inventory";

export default function InventoryPage() {
	return (
		<div className="space-y-6">
			<div>
				<h1 className="text-2xl font-bold tracking-tight">Inventory</h1>
				<p className="text-muted-foreground">
					Manage your inventory items and stock levels.
				</p>
			</div>

			<InventoryTable />
		</div>
	);
}