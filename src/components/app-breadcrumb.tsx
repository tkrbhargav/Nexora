import * as React from "react";
import { Link } from "react-router";
import {
	Breadcrumb,
	BreadcrumbItem,
	BreadcrumbLink,
	BreadcrumbList,
	BreadcrumbPage,
	BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { cn } from "@/lib/utils";

interface AppBreadCrumbProps {
	title: string;
	description?: string;
	items?: {
		label: string;
		href: string;
	}[];
	action?: React.ReactNode;
	className?: string;
}

export function AppBreadCrumb({
	title,
	description,
	items,
	action,
	className,
}: AppBreadCrumbProps) {
	return (
		<div className={cn("space-y-2", className)}>
			{/* Header on top */}
			<div className="flex items-start justify-between gap-4">
				<div>
					<h1 className="text-2xl font-bold tracking-tight">{title}</h1>
					{description && (
						<p className="text-muted-foreground">{description}</p>
					)}
				</div>
				{action && <div className="shrink-0">{action}</div>}
			</div>

			{/* Breadcrumb on bottom (optional) */}
			{items && items.length > 0 && (
				<Breadcrumb>
					<BreadcrumbList>
						{items.map((item, index) => {
							const isLast = index === items.length - 1;
							return (
								<React.Fragment key={item.href}>
									<BreadcrumbItem>
										{isLast ? (
											<BreadcrumbPage>{item.label}</BreadcrumbPage>
										) : (
											<BreadcrumbLink asChild>
												<Link to={item.href}>{item.label}</Link>
											</BreadcrumbLink>
										)}
									</BreadcrumbItem>
									{!isLast && <BreadcrumbSeparator />}
								</React.Fragment>
							);
						})}
					</BreadcrumbList>
				</Breadcrumb>
			)}
		</div>
	);
}
