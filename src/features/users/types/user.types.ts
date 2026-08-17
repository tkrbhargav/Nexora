export type User = {
	id: string;
	name: string;
	email: string;
	role: "admin" | "user" | "editor";
	status: "active" | "inactive";
	type: "service" | "retail";
	createdAt: string;
};
