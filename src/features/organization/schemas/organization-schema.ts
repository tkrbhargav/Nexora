import { z } from "zod";

export const addOrganizationSchema = z.object({
	name: z.string().min(1, { message: "Organization name is required." }),
	email: z.string().email({ message: "Please enter a valid email address." }),
	industry: z.enum(
		["technology", "healthcare", "finance", "education", "retail"],
		{
			message: "Please select an industry.",
		},
	),
	status: z.enum(["active", "inactive"], {
		message: "Please select a status.",
	}),
	plan: z.enum(["free", "starter", "professional", "enterprise"], {
		message: "Please select a plan.",
	}),
});

export type AddOrganizationFormData = z.infer<typeof addOrganizationSchema>;
