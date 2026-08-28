export type DashboardResponse = {
	totalRevenue?: number;
	totalOrders?: number;
	totalCustomers?: number;
	conversionRate?: number;
	[key: string]: unknown;
};
