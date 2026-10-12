import { Fragment } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

const CHANNEL_DATA = [
	{ name: "Web", value: 11151, percentage: 45, color: "var(--primary)" },
	{ name: "Mobile App", value: 6195, percentage: 25, color: "var(--chart-2)" },
	{ name: "Referral", value: 3717, percentage: 15, color: "var(--chart-3)" },
	{ name: "Social Media", value: 2478, percentage: 10, color: "var(--chart-1)" },
	{ name: "Others", value: 1239, percentage: 5, color: "var(--muted-foreground)" },
];

export function SalesChannelChart() {
	return (
		<Card className="gap-0 py-0 ring-1 ring-border w-full flex-1 flex flex-col justify-between">
			<CardHeader className="px-5 pt-5 pb-0">
				<CardTitle className="text-base font-semibold text-foreground">Sales by Channel</CardTitle>
			</CardHeader>

			<CardContent className="px-5 pt-4 pb-5 flex flex-col gap-5 flex-1 justify-between">
				<div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5">
					<div className="relative shrink-0 size-[140px] flex items-center justify-center">
						<ResponsiveContainer width={140} height={140}>
							<PieChart>
								<Pie
									data={CHANNEL_DATA}
									cx="50%"
									cy="50%"
									innerRadius={45}
									outerRadius={65}
									paddingAngle={3}
									dataKey="value"
									stroke="none"
								>
									{CHANNEL_DATA.map((entry) => (
										<Cell key={entry.name} fill={entry.color} />
									))}
								</Pie>
							</PieChart>
						</ResponsiveContainer>
						<div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
							<span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">Total</span>
							<span className="text-base font-bold tracking-tight text-foreground">$24,780</span>
						</div>
					</div>

					<div className="grid grid-cols-[auto_1fr_auto_auto] items-center gap-x-2.5 gap-y-2 w-full sm:flex-1 min-w-0 text-xs">
						{CHANNEL_DATA.map((item) => (
							<Fragment key={item.name}>
								<span
									className="size-2.5 rounded-full shrink-0"
									style={{ backgroundColor: item.color }}
								/>
								<span className="text-foreground font-medium truncate">
									{item.name}
								</span>
								<span className="text-muted-foreground text-right tabular-nums pl-1">
									{item.percentage}%
								</span>
								<span className="text-foreground font-semibold tabular-nums text-right pl-2">
									${item.value.toLocaleString("en-US")}
								</span>
							</Fragment>
						))}
					</div>
				</div>

				<Button variant="outline" size="sm" className="w-fit text-xs h-8">
					View full report
				</Button>
			</CardContent>
		</Card>
	);
}
