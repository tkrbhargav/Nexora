export type Organization = {
	id: string;
	name: string;
	email: string;
	industry: "technology" | "healthcare" | "finance" | "education" | "retail";
	status: "active" | "inactive";
	plan: "free" | "starter" | "professional" | "enterprise";
	createdAt: string;
};
