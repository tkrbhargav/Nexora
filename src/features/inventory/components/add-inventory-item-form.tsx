import { Button } from "@/components/core/button";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/core/field";
import { Input } from "@/components/core/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/core/select";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetFooter,
	SheetHeader,
	SheetTitle,
} from "@/components/core/sheet";
import {
	type AddInventoryItemFormData,
	addInventoryItemSchema,
} from "@/features/inventory/schemas/inventory-schema";
import type { InventoryItem } from "@/features/inventory/types/inventory.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type AddInventoryItemFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialData?: InventoryItem | null;
};

const EMPTY_DEFAULTS: AddInventoryItemFormData = {
	name: "",
	sku: "",
	category: undefined as unknown as AddInventoryItemFormData["category"],
	status: undefined as unknown as AddInventoryItemFormData["status"],
	quantity: 0,
	price: 0,
};

export function AddInventoryItemForm({
	open,
	onOpenChange,
	initialData,
}: AddInventoryItemFormProps) {
	const isEditMode = !!initialData;

	const form = useForm<AddInventoryItemFormData>({
		resolver: zodResolver(addInventoryItemSchema),
		defaultValues: EMPTY_DEFAULTS,
	});

	// Reset form with initial data when opening in edit mode
	useEffect(() => {
		if (open && initialData) {
			form.reset({
				name: initialData.name,
				sku: initialData.sku,
				category: initialData.category,
				status: initialData.status,
				quantity: initialData.quantity,
				price: initialData.price,
			});
		} else if (open && !initialData) {
			form.reset(EMPTY_DEFAULTS);
		}
	}, [open, initialData, form]);

	function onSubmit(data: AddInventoryItemFormData) {
		if (isEditMode) {
			console.log("Update inventory item:", { id: initialData?.id, ...data });
		} else {
			console.log("New inventory item:", data);
		}
		form.reset(EMPTY_DEFAULTS);
		onOpenChange(false);
	}

	return (
		<Sheet
			open={open}
			onOpenChange={(value) => {
				if (!value) form.reset(EMPTY_DEFAULTS);
				onOpenChange(value);
			}}
		>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>{isEditMode ? "Edit Inventory Item" : "Add New Inventory Item"}</SheetTitle>
					<SheetDescription>
						{isEditMode
							? "Update the item details below."
							: "Fill in the details below to add a new item to inventory."}
					</SheetDescription>
				</SheetHeader>

				<form
					id="add-inventory-form"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup className="px-4">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-inv-name">Name</FieldLabel>
									<Input
										{...field}
										id="add-inv-name"
										placeholder="Enter item name"
										aria-invalid={fieldState.invalid}
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="sku"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-inv-sku">SKU</FieldLabel>
									<Input
										{...field}
										id="add-inv-sku"
										placeholder="Enter SKU code"
										aria-invalid={fieldState.invalid}
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="category"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-inv-category">Category</FieldLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger
											id="add-inv-category"
											className="w-full"
											aria-invalid={fieldState.invalid}
										>
											<SelectValue placeholder="Select a category" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="electronics">Electronics</SelectItem>
											<SelectItem value="furniture">Furniture</SelectItem>
											<SelectItem value="clothing">Clothing</SelectItem>
											<SelectItem value="food">Food</SelectItem>
											<SelectItem value="tools">Tools</SelectItem>
										</SelectContent>
									</Select>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="status"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-inv-status">Status</FieldLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger
											id="add-inv-status"
											className="w-full"
											aria-invalid={fieldState.invalid}
										>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="in_stock">In Stock</SelectItem>
											<SelectItem value="low_stock">Low Stock</SelectItem>
											<SelectItem value="out_of_stock">Out of Stock</SelectItem>
										</SelectContent>
									</Select>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="quantity"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-inv-quantity">Quantity</FieldLabel>
									<Input
										{...field}
										id="add-inv-quantity"
										type="number"
										value={field.value ?? ""}
										onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
										placeholder="Enter quantity"
										aria-invalid={fieldState.invalid}
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="price"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-inv-price">Price ($)</FieldLabel>
									<Input
										{...field}
										id="add-inv-price"
										type="number"
										step="0.01"
										value={field.value ?? ""}
										onChange={(e) => field.onChange(e.target.value === "" ? 0 : Number(e.target.value))}
										placeholder="Enter price"
										aria-invalid={fieldState.invalid}
										autoComplete="off"
									/>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>

				<SheetFooter>
					<Button type="submit" form="add-inventory-form">
						{isEditMode ? "Save Changes" : "Add Item"}
					</Button>
					<Button
						type="button"
						variant="outline"
						onClick={() => onOpenChange(false)}
					>
						Cancel
					</Button>
				</SheetFooter>
			</SheetContent>
		</Sheet>
	);
}

