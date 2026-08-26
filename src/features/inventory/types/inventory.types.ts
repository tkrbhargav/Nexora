export type InventoryItem = {
	id: string;
	name: string;
	sku: string;
	category: "electronics" | "furniture" | "clothing" | "food" | "tools";
	status: "in_stock" | "low_stock" | "out_of_stock";
	quantity: number;
	price: number;
	createdAt: string;
};
