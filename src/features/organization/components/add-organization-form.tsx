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
	type AddOrganizationFormData,
	addOrganizationSchema,
} from "@/features/organization/schemas/organization-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";

type AddOrganizationFormProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
};

export function AddOrganizationForm({
	open,
	onOpenChange,
}: AddOrganizationFormProps) {
	const form = useForm<AddOrganizationFormData>({
		resolver: zodResolver(addOrganizationSchema),
		defaultValues: {
			name: "",
			email: "",
			industry: undefined,
			status: undefined,
			plan: undefined,
		},
	});

	function onSubmit(data: AddOrganizationFormData) {
		console.log("New organization:", data);
		form.reset();
		onOpenChange(false);
	}

	return (
		<Sheet
			open={open}
			onOpenChange={(value) => {
				if (!value) form.reset();
				onOpenChange(value);
			}}
		>
			<SheetContent>
				<SheetHeader>
					<SheetTitle>Add New Organization</SheetTitle>
					<SheetDescription>
						Fill in the details below to create a new organization.
					</SheetDescription>
				</SheetHeader>

				<form
					id="add-organization-form"
					onSubmit={form.handleSubmit(onSubmit)}
				>
					<FieldGroup className="px-4">
						<Controller
							name="name"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-org-name">Name</FieldLabel>
									<Input
										{...field}
										id="add-org-name"
										placeholder="Enter organization name"
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
									<FieldLabel htmlFor="add-org-email">Email</FieldLabel>
									<Input
										{...field}
										id="add-org-email"
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
							name="industry"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-org-industry">Industry</FieldLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger
											id="add-org-industry"
											className="w-full"
											aria-invalid={fieldState.invalid}
										>
											<SelectValue placeholder="Select an industry" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="technology">Technology</SelectItem>
											<SelectItem value="healthcare">Healthcare</SelectItem>
											<SelectItem value="finance">Finance</SelectItem>
											<SelectItem value="education">Education</SelectItem>
											<SelectItem value="retail">Retail</SelectItem>
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
									<FieldLabel htmlFor="add-org-status">Status</FieldLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger
											id="add-org-status"
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
							name="plan"
							control={form.control}
							render={({ field, fieldState }) => (
								<Field data-invalid={fieldState.invalid}>
									<FieldLabel htmlFor="add-org-plan">Plan</FieldLabel>
									<Select value={field.value} onValueChange={field.onChange}>
										<SelectTrigger
											id="add-org-plan"
											className="w-full"
											aria-invalid={fieldState.invalid}
										>
											<SelectValue placeholder="Select a plan" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="free">Free</SelectItem>
											<SelectItem value="starter">Starter</SelectItem>
											<SelectItem value="professional">Professional</SelectItem>
											<SelectItem value="enterprise">Enterprise</SelectItem>
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
					<Button type="submit" form="add-organization-form">
						Add Organization
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
