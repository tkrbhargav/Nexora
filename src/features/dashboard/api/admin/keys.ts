export const adminDashboard = {
	all: ["admin", "dashboard"] as const,
	data: () => [...adminDashboard.all, "data"] as const,
};
