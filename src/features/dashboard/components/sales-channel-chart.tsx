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
		<Card className="gap-0 py-0 ring-1 ring-border w-full">
			<CardHeader className="px-6 pt-5 pb-0">
				<CardTitle className="text-base font-semibold text-foreground">Sales by Channel</CardTitle>
			</CardHeader>

			<CardContent className="px-6 pt-4 pb-5 flex flex-col gap-5">
				<div className="flex items-center gap-6">
					<div className="relative shrink-0">
						<ResponsiveContainer width={180} height={180}>
							<PieChart>
								<Pie
									data={CHANNEL_DATA}
									cx="50%"
									cy="50%"
									innerRadius={55}
									outerRadius={80}
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
							<span className="text-[11px] text-muted-foreground">Total</span>
							<span className="text-lg font-bold tracking-tight text-foreground">$24,780</span>
						</div>
					</div>

					<div className="flex flex-col gap-2.5 flex-1 min-w-0">
						{CHANNEL_DATA.map((item) => (
							<div key={item.name} className="flex items-center gap-3 text-sm">
								<div
									className="size-3 rounded-full shrink-0"
									style={{ backgroundColor: item.color }}
								/>
								<span className="text-foreground font-medium min-w-[90px] truncate">
									{item.name}
								</span>
								<span className="text-muted-foreground text-xs ml-auto">{item.percentage}%</span>
								<span className="text-foreground font-medium text-xs tabular-nums w-[72px] text-right">
									${item.value.toLocaleString("en-US", { minimumFractionDigits: 2 })}
								</span>
							</div>
						))}
					</div>
				</div>

				<Button variant="outline" className="w-fit text-sm">
					View full report
				</Button>
			</CardContent>
		</Card>
	);
}
