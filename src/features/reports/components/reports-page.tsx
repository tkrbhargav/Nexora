import { useState } from "react";
import { AppBreadCrumb } from "@/components/app-breadcrumb";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RevenueChart } from "@/features/dashboard/components/revenue-chart";
import { SalesChannelChart } from "@/features/dashboard/components/sales-channel-chart";
import { TopProducts } from "@/features/dashboard/components/top-products";
import inventoryData from "@/features/inventory/data/inventory.json";
import orgsData from "@/features/organization/data/organizations.json";
import usersData from "@/features/users/data/users.json";
import {
	Building2,
	Download,
	FileSpreadsheet,
	Filter,
	TrendingUp,
	Users,
	Warehouse,
} from "lucide-react";

export function ReportsPage() {
	const [timeframe, setTimeframe] = useState("30d");
	const [exporting, setExporting] = useState(false);

	const totalItems = inventoryData.length;
	const totalStockValue = inventoryData.reduce((acc, i) => acc + i.price * i.quantity, 0);
	const totalOrgs = orgsData.length;
	const totalUsers = usersData.length;

	const handleExport = (_type: string) => {
		setExporting(true);
		setTimeout(() => setExporting(false), 1500);
	};

	return (
		<div className="flex flex-col gap-5 w-full mx-auto pb-10">
			{/* Breadcrumb & Top Actions */}
			<AppBreadCrumb
				title="Reports & Analytics"
				description="Deep insights on sales performance, inventory valuation, user growth, and organization activity."
				items={[{ label: "Reports", href: "#" }]}
				action={
					<div className="flex items-center gap-2">
						{/* Timeframe Selector */}
						<div className="flex items-center gap-1.5 bg-card border border-border rounded-lg px-2.5 h-9 text-xs">
							<Filter size={13} className="text-muted-foreground" />
							<select
								value={timeframe}
								onChange={(e) => setTimeframe(e.target.value)}
								className="bg-transparent text-foreground focus:outline-none text-xs font-medium"
							>
								<option value="7d">Last 7 Days</option>
								<option value="30d">Last 30 Days</option>
								<option value="90d">Last 90 Days</option>
								<option value="ytd">Year To Date</option>
							</select>
						</div>

						{/* Export Buttons */}
						<Button
							variant="outline"
							size="sm"
							onClick={() => handleExport("csv")}
							className="h-9 text-xs gap-1.5 rounded-lg"
						>
							<FileSpreadsheet size={14} />
							CSV
						</Button>
						<Button
							size="sm"
							onClick={() => handleExport("pdf")}
							className="h-9 text-xs gap-1.5 rounded-lg font-medium"
						>
							<Download size={14} />
							{exporting ? "Generating..." : "Export PDF"}
						</Button>
					</div>
				}
			/>

			{/* Metric Cards Summary */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
				<Card className="ring-1 ring-border">
					<CardContent className="p-5 flex items-center gap-4">
						<div className="size-11 rounded-xl bg-primary/12 text-primary flex items-center justify-center shrink-0">
							<TrendingUp size={20} />
						</div>
						<div className="flex flex-col gap-0.5">
							<span className="text-xs text-muted-foreground font-medium">Inventory Valuation</span>
							<span className="text-xl font-bold tracking-tight text-foreground">
								${totalStockValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
							</span>
							<span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
								↑ +12.4% vs last period
							</span>
						</div>
					</CardContent>
				</Card>

				<Card className="ring-1 ring-border">
					<CardContent className="p-5 flex items-center gap-4">
						<div className="size-11 rounded-xl bg-amber-500/12 text-amber-500 flex items-center justify-center shrink-0">
							<Warehouse size={20} />
						</div>
						<div className="flex flex-col gap-0.5">
							<span className="text-xs text-muted-foreground font-medium">Catalog Items</span>
							<span className="text-xl font-bold tracking-tight text-foreground">{totalItems} SKUs</span>
							<span className="text-[11px] text-muted-foreground font-semibold">
								Across all warehouses
							</span>
						</div>
					</CardContent>
				</Card>

				<Card className="ring-1 ring-border">
					<CardContent className="p-5 flex items-center gap-4">
						<div className="size-11 rounded-xl bg-blue-500/12 text-blue-500 flex items-center justify-center shrink-0">
							<Building2 size={20} />
						</div>
						<div className="flex flex-col gap-0.5">
							<span className="text-xs text-muted-foreground font-medium">Organizations</span>
							<span className="text-xl font-bold tracking-tight text-foreground">{totalOrgs} Enterprise</span>
							<span className="text-[11px] text-emerald-500 font-semibold flex items-center gap-1">
								↑ 100% Active Status
							</span>
						</div>
					</CardContent>
				</Card>

				<Card className="ring-1 ring-border">
					<CardContent className="p-5 flex items-center gap-4">
						<div className="size-11 rounded-xl bg-purple-500/12 text-purple-500 flex items-center justify-center shrink-0">
							<Users size={20} />
						</div>
						<div className="flex flex-col gap-0.5">
							<span className="text-xs text-muted-foreground font-medium">Platform Users</span>
							<span className="text-xl font-bold tracking-tight text-foreground">{totalUsers} Accounts</span>
							<span className="text-[11px] text-muted-foreground font-semibold">
								Service & Retail
							</span>
						</div>
					</CardContent>
				</Card>
			</div>

			{/* Revenue Chart Section */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
				<div className="lg:col-span-8">
					<RevenueChart />
				</div>
				<div className="lg:col-span-4">
					<SalesChannelChart />
				</div>
			</div>

			{/* Top Products & Stock Analysis Section */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
				<div className="lg:col-span-7">
					<TopProducts />
				</div>
				<div className="lg:col-span-5 flex flex-col gap-5">
					<Card className="ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-2">
							<CardTitle className="text-base font-semibold">Inventory Breakdown</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pb-5 space-y-4">
							{inventoryData.map((item) => (
								<div key={item.id} className="flex flex-col gap-1.5">
									<div className="flex items-center justify-between text-xs font-medium">
										<span className="text-foreground font-semibold">{item.name}</span>
										<span className="text-muted-foreground">{item.quantity} units (${(item.price * item.quantity).toFixed(2)})</span>
									</div>
									<div className="h-1.5 rounded-full bg-muted/40 overflow-hidden">
										<div
											className="h-full bg-primary rounded-full"
											style={{ width: `${Math.min((item.quantity / 500) * 100, 100)}%` }}
										/>
									</div>
								</div>
							))}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
