import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from "recharts";

const REVENUE_DATA = [
	{ day: "Mon 18", revenue: 2800 },
	{ day: "Tue 19", revenue: 3200 },
	{ day: "Wed 20", revenue: 2600 },
	{ day: "Thu 21", revenue: 3100 },
	{ day: "Fri 22", revenue: 4200 },
	{ day: "Sat 23", revenue: 4600 },
	{ day: "Sun 24", revenue: 4280 },
];

const SUMMARY = [
	{ label: "Total Revenue", value: "$24,780.00" },
	{ label: "Average Daily", value: "$3,540.00" },
	{ label: "Best Day (Sun)", value: "$8,420.00" },
	{ label: "Growth Rate", value: "12.5%", highlight: true },
];

function formatYAxis(value: number) {
	if (value === 0) return "$0";
	return `$${value / 1000}k`;
}

export function RevenueChart() {
	return (
		<Card className="gap-0 py-0 ring-1 ring-border flex-1">
			<CardHeader className="flex flex-row items-center justify-between px-6 pt-5 pb-0">
				<CardTitle className="text-base font-semibold text-foreground">Revenue Overview</CardTitle>
				<CardAction>
					<select className="text-sm px-3 py-1.5 rounded-lg border border-border bg-background text-foreground cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20">
						<option>This Week</option>
						<option>Last Week</option>
						<option>This Month</option>
					</select>
				</CardAction>
			</CardHeader>

			<CardContent className="px-2 pt-6 pb-2">
				<ResponsiveContainer width="100%" height={260}>
					<AreaChart data={REVENUE_DATA} margin={{ top: 5, right: 20, left: 10, bottom: 0 }}>
						<defs>
							<linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
								<stop offset="0%" stopColor="var(--primary)" stopOpacity={0.3} />
								<stop offset="100%" stopColor="var(--primary)" stopOpacity={0.02} />
							</linearGradient>
						</defs>
						<CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
						<XAxis
							dataKey="day"
							axisLine={false}
							tickLine={false}
							tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
							dy={10}
						/>
						<YAxis
							axisLine={false}
							tickLine={false}
							tick={{ fill: "var(--muted-foreground)", fontSize: 12 }}
							tickFormatter={formatYAxis}
							dx={-5}
						/>
						<Tooltip
							contentStyle={{
								backgroundColor: "var(--popover)",
								border: "1px solid var(--border)",
								borderRadius: "10px",
								color: "var(--popover-foreground)",
								fontSize: 13,
								padding: "8px 14px",
							}}
							formatter={(value?: any) => [`$${Number(value || 0).toLocaleString()}`, "Revenue"]}
							labelStyle={{ color: "var(--muted-foreground)", marginBottom: 4 }}
						/>
						<Area
							type="monotone"
							dataKey="revenue"
							stroke="var(--primary)"
							strokeWidth={2.5}
							fill="url(#revenueGradient)"
							dot={{ r: 4, fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 2 }}
							activeDot={{ r: 6, fill: "var(--primary)", stroke: "var(--background)", strokeWidth: 2 }}
						/>
					</AreaChart>
				</ResponsiveContainer>
			</CardContent>

			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4 px-6 pb-5 pt-2">
				{SUMMARY.map((item) => (
					<div key={item.label} className="flex flex-col gap-0.5">
						<span
							className={cn(
								"text-lg font-bold tracking-tight",
								item.highlight ? "text-emerald-500" : "text-foreground",
							)}
						>
							{item.value}
						</span>
						<span className="text-xs text-muted-foreground">{item.label}</span>
					</div>
				))}
			</div>
		</Card>
	);
}
