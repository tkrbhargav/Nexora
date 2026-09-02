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
	type AddUserFormData,
	addUserSchema,
} from "@/features/users/schemas/user-schema";
import type { User } from "@/features/users/types/user.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

type AddUserFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	initialData?: User | null;
};

const EMPTY_DEFAULTS: AddUserFormData = {
	name: "",
	email: "",
	role: undefined as unknown as AddUserFormData["role"],
	status: undefined as unknown as AddUserFormData["status"],
	type: undefined as unknown as AddUserFormData["type"],
};

export function AddUserForm({ open, onOpenChange, initialData }: AddUserFormProps) {
	const isEditMode = !!initialData;

	const form = useForm<AddUserFormData>({
		resolver: zodResolver(addUserSchema),
		defaultValues: EMPTY_DEFAULTS,
	});

	// Reset form with initial data when opening in edit mode
	useEffect(() => {
		if (open && initialData) {
			form.reset({
				name: initialData.name,
				email: initialData.email,
				role: initialData.role,
				status: initialData.status,
				type: initialData.type,
			});
		} else if (open && !initialData) {
			form.reset(EMPTY_DEFAULTS);
		}
	}, [open, initialData, form]);

	function onSubmit(data: AddUserFormData) {
		if (isEditMode) {
			console.log("Update user:", { id: initialData?.id, ...data });
		} else {
			console.log("New user:", data);
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
					<SheetTitle>{isEditMode ? "Edit User" : "Add New User"}</SheetTitle>
					<SheetDescription>
						{isEditMode
							? "Update the user details below."
							: "Fill in the details below to create a new user."}
					</SheetDescription>
				</SheetHeader>

				<form id="add-user-form" onSubmit={form.handleSubmit(onSubmit)}>
					<FieldGroup className="px-4">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-user-name">Name</FieldLabel>
									<Input
										{...field}
										id="add-user-name"
										placeholder="Enter full name"
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
							name="email"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-user-email">Email</FieldLabel>
									<Input
										{...field}
										id="add-user-email"
										type="email"
										placeholder="Enter email address"
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
							name="role"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-user-role">Role</FieldLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger
											id="add-user-role"
											className="w-full"
											aria-invalid={fieldState.invalid}
										>
											<SelectValue placeholder="Select a role" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="admin">Admin</SelectItem>
											<SelectItem value="user">User</SelectItem>
											<SelectItem value="editor">Editor</SelectItem>
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
									<FieldLabel htmlFor="add-user-status">Status</FieldLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger
											id="add-user-status"
											className="w-full"
											aria-invalid={fieldState.invalid}
										>
											<SelectValue placeholder="Select status" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="active">Active</SelectItem>
											<SelectItem value="inactive">Inactive</SelectItem>
										</SelectContent>
									</Select>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>

						<Controller
							name="type"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-user-type">Type</FieldLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger
											id="add-user-type"
											className="w-full"
											aria-invalid={fieldState.invalid}
										>
											<SelectValue placeholder="Select type" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="service">Service</SelectItem>
											<SelectItem value="retail">Retail</SelectItem>
										</SelectContent>
									</Select>
									{fieldState.invalid && (
										<FieldError errors={[fieldState.error]} />
									)}
								</Field>
							)}
						/>
					</FieldGroup>
				</form>

				<SheetFooter>
					<Button type="submit" form="add-user-form">
						{isEditMode ? "Save Changes" : "Add User"}
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
