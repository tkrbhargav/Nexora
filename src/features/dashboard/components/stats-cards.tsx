import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	ArrowDownRight,
	ArrowUpRight,
	DollarSign,
	ShoppingCart,
	TrendingUp,
	Users,
} from "lucide-react";

interface StatCardProps {
	title: string;
	value: string;
	change: number;
	icon: React.ElementType;
	iconClassName: string;
}

function StatCard({
	title,
	value,
	change,
	icon: Icon,
	iconClassName,
}: StatCardProps) {
	const isPositive = change >= 0;

	return (
		<Card className="gap-0 py-0 ring-1 ring-border">
			<CardContent className="flex items-center gap-4 p-5">
				<div
					className={cn(
						"flex items-center justify-center size-12 rounded-full shrink-0",
						iconClassName,
					)}
				>
					<Icon size={20} />
				</div>
				<div className="flex flex-col gap-1 min-w-0">
					<span className="text-xs text-muted-foreground font-medium">
						{title}
					</span>
					<span className="text-xl font-bold tracking-tight text-foreground">
						{value}
					</span>
					<div className="flex items-center gap-1.5">
						{isPositive ? (
							<ArrowUpRight size={14} className="text-emerald-500" />
						) : (
							<ArrowDownRight size={14} className="text-destructive" />
						)}
						<span
							className={cn(
								"text-xs font-semibold",
								isPositive ? "text-emerald-500" : "text-destructive",
							)}
						>
							{Math.abs(change)}%
						</span>
						<span className="text-xs text-muted-foreground">vs. last week</span>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}

const STATS: StatCardProps[] = [
	{
		title: "Total Revenue",
		value: "$24,780.00",
		change: 12.5,
		icon: DollarSign,
		iconClassName: "bg-primary/15 text-primary",
	},
	{
		title: "Total Orders",
		value: "1,248",
		change: 8.3,
		icon: ShoppingCart,
		iconClassName: "bg-chart-3/15 text-chart-3",
	},
	{
		title: "Total Customers",
		value: "856",
		change: 14.2,
		icon: Users,
		iconClassName: "bg-chart-2/15 text-chart-2",
	},
	{
		title: "Conversion Rate",
		value: "3.24%",
		change: -2.1,
		icon: TrendingUp,
		iconClassName: "bg-chart-1/15 text-chart-1",
	},
];

export function StatsCards() {
	return (
		<div className="flex items-center gap-4">
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-1">
				{STATS.map((stat) => (
					<StatCard key={stat.title} {...stat} />
				))}
			</div>
		</div>
	);
}
