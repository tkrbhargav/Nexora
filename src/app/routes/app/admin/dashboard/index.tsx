import { RecentActivity } from "@/features/dashboard/components/recent-activity";
import { RevenueChart } from "@/features/dashboard/components/revenue-chart";
import { SalesChannelChart } from "@/features/dashboard/components/sales-channel-chart";
import { StatsCards } from "@/features/dashboard/components/stats-cards";
import { TopProducts } from "@/features/dashboard/components/top-products";
import { useAppStore } from "@/store";
import { AppBreadCrumb } from "@/components/app-breadcrumb";

export default function DashboardPage() {
	const user = useAppStore((s) => s.user);

	return (
		<div className="flex flex-col gap-6 ">
			<AppBreadCrumb
				title="Dashboard"
				description={`Welcome back, ${user?.name || "Admin"}! Here's what's happening with your business.`}
			/>

			<StatsCards />

			<div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
				<div className="lg:col-span-3 flex">
					<RevenueChart />
				</div>
				<div className="lg:col-span-2 flex">
					<SalesChannelChart />
				</div>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				<RecentActivity />
				<TopProducts />
			</div>
		</div>
	);
}
