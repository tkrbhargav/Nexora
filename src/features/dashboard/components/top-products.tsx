import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

interface Product {
	name: string;
	iconClassName: string;
	sales: number;
	revenue: number;
	growth: number;
}

const PRODUCTS: Product[] = [
	{
		name: "Premium Plan",
		iconClassName: "bg-primary/15",
		sales: 324,
		revenue: 9720,
		growth: 18.2,
	},
	{
		name: "Basic Plan",
		iconClassName: "bg-chart-2/15",
		sales: 432,
		revenue: 6480,
		growth: 12.5,
	},
	{
		name: "Add-on Storage",
		iconClassName: "bg-chart-3/15",
		sales: 265,
		revenue: 3975,
		growth: -4.3,
	},
	{
		name: "Custom Domain",
		iconClassName: "bg-chart-1/15",
		sales: 187,
		revenue: 2805,
		growth: 8.1,
	},
	{
		name: "Priority Support",
		iconClassName: "bg-destructive/15",
		sales: 123,
		revenue: 1845,
		growth: 15.3,
	},
];

export function TopProducts() {
	return (
		<Card className="gap-0 py-0 ring-1 ring-border flex-1">
			<CardHeader className="flex flex-row items-center justify-between px-6 pt-5 pb-0">
				<CardTitle className="text-base font-semibold text-foreground">Top Products</CardTitle>
				<CardAction>
					<Button variant="outline" size="sm" className="text-xs h-8">
						View all
					</Button>
				</CardAction>
			</CardHeader>

			<CardContent className="px-6 pt-4 pb-5">
				<Table>
					<TableHeader>
						<TableRow className="hover:bg-transparent border-border/50">
							<TableHead className="text-xs font-medium text-muted-foreground">Product</TableHead>
							<TableHead className="text-xs font-medium text-muted-foreground text-right">Sales</TableHead>
							<TableHead className="text-xs font-medium text-muted-foreground text-right">Revenue</TableHead>
							<TableHead className="text-xs font-medium text-muted-foreground text-right">Growth</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{PRODUCTS.map((product) => {
							const isPositive = product.growth >= 0;
							return (
								<TableRow key={product.name} className="border-border/50">
									<TableCell>
										<div className="flex items-center gap-3">
											<div className={cn("size-8 rounded-lg shrink-0", product.iconClassName)} />
											<span className="text-sm font-medium text-foreground">{product.name}</span>
										</div>
									</TableCell>
									<TableCell className="text-sm text-foreground text-right tabular-nums">
										{product.sales}
									</TableCell>
									<TableCell className="text-sm text-right tabular-nums font-medium text-foreground">
										${product.revenue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
									</TableCell>
									<TableCell className="text-right">
										<div className={cn(
											"inline-flex items-center gap-0.5 text-xs font-semibold",
											isPositive ? "text-emerald-500" : "text-destructive",
										)}>
											{isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
											{Math.abs(product.growth)}%
										</div>
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}
