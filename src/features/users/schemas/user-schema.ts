import { z } from "zod";

export const addUserSchema = z.object({
	name: z.string().min(1, { message: "Name is required." }),
	email: z.string().email({ message: "Please enter a valid email address." }),
	role: z.enum(["admin", "user", "editor"], {
		message: "Please select a role.",
	}),
	status: z.enum(["active", "inactive"], {
		message: "Please select a status.",
	}),
	type: z.enum(["service", "retail"], {
		message: "Please select a type.",
	}),
});

export type AddUserFormData = z.infer<typeof addUserSchema>;
