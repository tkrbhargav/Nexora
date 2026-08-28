import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
	AlertCircle,
	CheckCircle2,
	Package,
	RefreshCw,
	UserPlus,
} from "lucide-react";

interface ActivityItem {
	id: number;
	icon: React.ElementType;
	iconClassName: string;
	description: string;
	time: string;
}

const ACTIVITIES: ActivityItem[] = [
	{
		id: 1,
		icon: Package,
		iconClassName: "bg-primary/12 text-primary",
		description: "New order #ORD-1258 received",
		time: "2 minutes ago",
	},
	{
		id: 2,
		icon: UserPlus,
		iconClassName: "bg-chart-2/12 text-chart-2",
		description: "New user John Doe registered",
		time: "15 minutes ago",
	},
	{
		id: 3,
		icon: RefreshCw,
		iconClassName: "bg-chart-1/12 text-chart-1",
		description: 'Product "Premium Plan" updated',
		time: "1 hour ago",
	},
	{
		id: 4,
		icon: AlertCircle,
		iconClassName: "bg-destructive/12 text-destructive",
		description: "Payment failed for order #ORD-1255",
		time: "2 hours ago",
	},
	{
		id: 5,
		icon: CheckCircle2,
		iconClassName: "bg-chart-3/12 text-chart-3",
		description: "Order #ORD-1253 completed",
		time: "3 hours ago",
	},
];

export function RecentActivity() {
	return (
		<Card className="gap-0 py-0 ring-1 ring-border flex-1">
			<CardHeader className="flex flex-row items-center justify-between px-6 pt-5 pb-0">
				<CardTitle className="text-base font-semibold text-foreground">Recent Activity</CardTitle>
				<CardAction>
					<Button variant="outline" size="sm" className="text-xs h-8">
						View all
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent className="px-6 pt-4 pb-5">
				<div className="flex flex-col gap-1">
					{ACTIVITIES.map((activity) => (
						<div
							key={activity.id}
							className="flex items-center gap-3.5 py-3 border-b border-border/50 last:border-0"
						>
							<div
								className={cn(
									"flex items-center justify-center size-9 rounded-lg shrink-0",
									activity.iconClassName,
								)}
							>
								<activity.icon size={16} />
							</div>
							<span className="text-sm text-foreground flex-1 min-w-0 truncate">
								{activity.description}
							</span>
							<span className="text-xs text-muted-foreground whitespace-nowrap shrink-0">
								{activity.time}
							</span>
						</div>
					))}
				</div>
			</CardContent>
		</Card>
	);
}
