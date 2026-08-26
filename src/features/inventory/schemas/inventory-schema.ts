import { z } from "zod";

export const addInventoryItemSchema = z.object({
	name: z.string().min(1, { message: "Item name is required." }),
	sku: z.string().min(1, { message: "SKU is required." }),
	category: z.enum(
		["electronics", "furniture", "clothing", "food", "tools"],
		{
			message: "Please select a category.",
		},
	),
	status: z.enum(["in_stock", "low_stock", "out_of_stock"], {
		message: "Please select a status.",
	}),
	quantity: z.coerce
		.number({ message: "Quantity must be a number." })
		.int({ message: "Quantity must be a whole number." })
		.min(0, { message: "Quantity cannot be negative." }),
	price: z.coerce
		.number({ message: "Price must be a number." })
		.min(0, { message: "Price cannot be negative." }),
});

export type AddInventoryItemFormData = z.infer<typeof addInventoryItemSchema>;
