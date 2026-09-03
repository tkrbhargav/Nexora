import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { AppBreadCrumb } from "@/components/app-breadcrumb";
import {
	AtSign,
	BarChart3,
	Calendar,
	Check,
	Copy,
	DollarSign,
	Edit,
	Hash,
	Layers,
	MoreHorizontal,
	Package,
	Tag,
	Trash2,
	Warehouse,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import inventoryData from "../data/inventory.json";
import type { InventoryItem } from "../types/inventory.types";

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatDate(iso: string) {
	return new Date(iso).toLocaleDateString("en-US", {
		day: "numeric",
		month: "long",
		year: "numeric",
	});
}

function formatDateShort(iso: string) {
	return new Date(iso).toLocaleDateString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
	});
}

function daysAgo(iso: string) {
	return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

function getStatusStyle(status: InventoryItem["status"]) {
	switch (status) {
		case "in_stock":
			return "border-emerald-500/30 text-emerald-500 bg-emerald-500/8";
		case "low_stock":
			return "border-amber-500/30 text-amber-500 bg-amber-500/8";
		case "out_of_stock":
			return "border-destructive/30 text-destructive bg-destructive/8";
	}
}

function getStatusDot(status: InventoryItem["status"]) {
	switch (status) {
		case "in_stock":
			return "bg-emerald-500";
		case "low_stock":
			return "bg-amber-500";
		case "out_of_stock":
			return "bg-destructive";
	}
}

function getStatusLabel(status: InventoryItem["status"]) {
	switch (status) {
		case "in_stock":
			return "In Stock";
		case "low_stock":
			return "Low Stock";
		case "out_of_stock":
			return "Out of Stock";
	}
}

// ─── Detail Row ───────────────────────────────────────────────────────────────

function DetailRow({
	label,
	value,
	icon: Icon,
	action,
}: {
	label: string;
	value: React.ReactNode;
	icon: React.ElementType;
	action?: React.ReactNode;
}) {
	return (
		<div className="flex items-center gap-4 py-3.5 border-b border-border/50 last:border-0">
			<div className="flex items-center gap-3 w-36 shrink-0">
				<Icon size={14} className="text-muted-foreground shrink-0" />
				<span className="text-sm text-muted-foreground">{label}</span>
			</div>
			<div className="flex items-center gap-2 flex-1 min-w-0">
				<span className="text-sm font-medium text-foreground truncate">
					{value}
				</span>
			</div>
			{action && <div className="shrink-0">{action}</div>}
		</div>
	);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function InventoryDetails() {
	const { itemId } = useParams<{ itemId: string }>();
	const navigate = useNavigate();
	const currentUser = useAppStore((s) => s.user);

	const isAdmin = currentUser?.role
		? ["super-admin", "admin", "manager"].includes(currentUser.role)
		: window.location.pathname.startsWith("/admin");
	const basePath = isAdmin ? "/admin" : "";

	const items = inventoryData as InventoryItem[];
	const item = items.find((i) => i.id === itemId) || items[0];

	const [skuCopied, setSkuCopied] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleCopySku = () => {
		navigator.clipboard.writeText(item.sku);
		setSkuCopied(true);
		setTimeout(() => setSkuCopied(false), 2000);
	};

	const days = daysAgo(item.createdAt);
	const totalValue = (item.price * item.quantity).toFixed(2);

	// Category icon/label
	const categoryLabel =
		item.category.charAt(0).toUpperCase() + item.category.slice(1);

	const timeline = [
		{
			icon: Package,
			iconCls: "bg-primary/12 text-primary",
			title: "Item Added to Inventory",
			desc: `${item.name} (SKU: ${item.sku}) was registered under the ${item.category} category.`,
			date: formatDate(item.createdAt),
		},
		{
			icon: Tag,
			iconCls: "bg-muted/40 text-muted-foreground",
			title: "Price Set",
			desc: `Unit price configured at $${item.price.toFixed(2)}.`,
			date: formatDateShort(item.createdAt),
		},
		{
			icon: Warehouse,
			iconCls:
				item.status === "in_stock"
					? "bg-emerald-500/12 text-emerald-500"
					: item.status === "low_stock"
						? "bg-amber-500/12 text-amber-500"
						: "bg-destructive/12 text-destructive",
			title: "Stock Level Recorded",
			desc: `Initial quantity set to ${item.quantity} units — status: ${getStatusLabel(item.status)}.`,
			date: formatDateShort(item.createdAt),
		},
	];

	return (
		<div className="flex flex-col gap-5 w-full max-w-[1400px] mx-auto pb-10">

			{/* ── Header & Breadcrumb ───────────────────────────── */}
			<AppBreadCrumb
				title="Inventory Details"
				description="View and manage item stock, specifications, and history."
				items={[
					{ label: "Inventory", href: `${basePath}/inventory` },
					{ label: item.name, href: `${basePath}/inventory/${item.id}` },
				]}
				action={
					<div className="flex items-center gap-3">
						<span className="text-xs text-muted-foreground">View:</span>
						<select
							value={item.id}
							onChange={(e) => navigate(`${basePath}/inventory/${e.target.value}`)}
							className="h-8 text-xs rounded-lg bg-card border border-border px-2.5 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
						>
							{items.map((i) => (
								<option key={i.id} value={i.id}>
									{i.name}
								</option>
							))}
						</select>
					</div>
				}
			/>

			{/* ── Profile Header Card ───────────────────────────────── */}
			<Card className="gap-0 py-0 ring-1 ring-border">
				<CardContent className="p-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
						{/* Icon */}
						<div className="size-16 rounded-lg bg-primary/12 flex items-center justify-center shrink-0">
							<Package size={28} className="text-primary" />
						</div>

						{/* Identity */}
						<div className="flex flex-col gap-1.5 flex-1 min-w-0">
							<div className="flex items-center gap-2 flex-wrap">
								<h1 className="text-xl font-bold text-foreground tracking-tight">
									{item.name}
								</h1>
								<Badge
									variant="outline"
									className={cn(
										"text-[11px] font-semibold px-2 py-0 h-5 rounded-md",
										getStatusStyle(item.status),
									)}
								>
									<span className={cn("size-1.5 rounded-full mr-1.5", getStatusDot(item.status))} />
									{getStatusLabel(item.status)}
								</Badge>
								<Badge
									variant="outline"
									className="text-[11px] font-semibold px-2 py-0 h-5 rounded-md border-border text-muted-foreground bg-muted/40 capitalize"
								>
									{categoryLabel}
								</Badge>
							</div>
							<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
								<AtSign size={13} />
								<span className="font-mono">{item.sku}</span>
							</div>
							<p className="text-xs text-muted-foreground">
								Added {formatDateShort(item.createdAt)} · {days} days ago
							</p>
						</div>

						{/* Actions */}
						<div className="flex items-center gap-2 shrink-0">
							<Button
								size="sm"
								variant="outline"
								className="h-8 text-xs gap-1.5 rounded-lg"
								onClick={handleCopySku}
							>
								{skuCopied ? (
									<Check size={13} className="text-emerald-500" />
								) : (
									<Copy size={13} />
								)}
								{skuCopied ? "Copied" : item.sku}
							</Button>

							<Button size="sm" className="h-8 text-xs gap-1.5 rounded-lg font-medium">
								<Edit size={13} />
								Edit
							</Button>

							<div className="relative">
								<Button
									variant="outline"
									size="icon"
									className="size-8 rounded-lg text-muted-foreground"
									onClick={() => setMenuOpen((v) => !v)}
								>
									<MoreHorizontal size={15} />
								</Button>
								{menuOpen && (
									<div className="absolute right-0 top-9 z-50 w-40 rounded-lg border border-border bg-card shadow-lg overflow-hidden">
										<button
											type="button"
											onClick={() => setMenuOpen(false)}
											className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-foreground hover:bg-accent/60 transition-colors"
										>
											<BarChart3 size={13} className="text-muted-foreground" />
											View Report
										</button>
										<button
											type="button"
											onClick={() => setMenuOpen(false)}
											className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-destructive hover:bg-destructive/10 transition-colors border-t border-border/50"
										>
											<Trash2 size={13} />
											Delete Item
										</button>
									</div>
								)}
							</div>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* ── Stats Row ─────────────────────────────────────────── */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{[
					{
						label: "Unit Price",
						value: `$${item.price.toFixed(2)}`,
						sub: "Per unit",
						icon: DollarSign,
					},
					{
						label: "Quantity",
						value: item.quantity.toLocaleString(),
						sub: "Units in stock",
						icon: Layers,
					},
					{
						label: "Total Value",
						value: `$${Number(totalValue).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
						sub: "price × quantity",
						icon: BarChart3,
					},
					{
						label: "Days Listed",
						value: days.toLocaleString(),
						sub: `Since ${formatDateShort(item.createdAt)}`,
						icon: Calendar,
					},
				].map(({ label, value, sub, icon: Icon }) => (
					<Card key={label} className="gap-0 py-0 ring-1 ring-border">
						<CardContent className="p-5 flex items-center gap-4">
							<div className="size-10 rounded-lg bg-primary/12 text-primary flex items-center justify-center shrink-0">
								<Icon size={18} />
							</div>
							<div className="flex flex-col gap-0.5 min-w-0">
								<span className="text-xs text-muted-foreground">{label}</span>
								<span className="text-lg font-bold text-foreground tracking-tight">
									{value}
								</span>
								<span className="text-[11px] text-muted-foreground">{sub}</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* ── Two-column content ────────────────────────────────── */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">

				{/* LEFT — Item Info ─────────────────────────────────── */}
				<div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-5">

					<Card className="gap-0 py-0 ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-0">
							<CardTitle className="text-base font-semibold text-foreground">
								Item Information
							</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pt-2 pb-5">
							<DetailRow
								label="Item ID"
								icon={Hash}
								value={
									<span className="font-mono">
										#{item.id.padStart(4, "0")}
									</span>
								}
							/>
							<DetailRow
								label="Name"
								icon={Package}
								value={item.name}
							/>
							<DetailRow
								label="SKU"
								icon={AtSign}
								value={
									<span className="font-mono text-foreground">
										{item.sku}
									</span>
								}
								action={
									<button
										type="button"
										onClick={handleCopySku}
										className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent/60"
									>
										{skuCopied ? (
											<Check size={12} className="text-emerald-500" />
										) : (
											<Copy size={12} />
										)}
										{skuCopied ? "Copied" : "Copy"}
									</button>
								}
							/>
							<DetailRow
								label="Category"
								icon={Layers}
								value={
									<span className="capitalize text-foreground font-medium">
										{item.category}
									</span>
								}
							/>
							<DetailRow
								label="Status"
								icon={Tag}
								value={
									<span
										className={cn(
											"inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold border",
											getStatusStyle(item.status),
										)}
									>
										<span className={cn("size-1.5 rounded-full", getStatusDot(item.status))} />
										{getStatusLabel(item.status)}
									</span>
								}
							/>
							<DetailRow
								label="Quantity"
								icon={Warehouse}
								value={
									<span className="text-foreground font-medium">
										{item.quantity.toLocaleString()} units
									</span>
								}
							/>
							<DetailRow
								label="Unit Price"
								icon={DollarSign}
								value={
									<span className="text-foreground font-medium">
										${item.price.toFixed(2)}
									</span>
								}
							/>
							<DetailRow
								label="Added On"
								icon={Calendar}
								value={
									<span className="text-foreground">
										{formatDate(item.createdAt)}
									</span>
								}
							/>
						</CardContent>
					</Card>
				</div>

				{/* RIGHT — Stock + Timeline ────────────────────────── */}
				<div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-5">

					{/* Stock Analysis */}
					<Card className="gap-0 py-0 ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-0 flex flex-row items-center justify-between">
							<CardTitle className="text-base font-semibold text-foreground">
								Stock Analysis
							</CardTitle>
							<CardAction>
								<Badge
									variant="outline"
									className={cn(
										"text-[11px] font-semibold px-2 py-0.5 rounded-md",
										getStatusStyle(item.status),
									)}
								>
									{getStatusLabel(item.status)}
								</Badge>
							</CardAction>
						</CardHeader>
						<CardContent className="px-6 pt-4 pb-5 flex flex-col gap-4">
							{/* Stock level bar */}
							<div className="flex flex-col gap-2">
								<div className="flex items-center justify-between text-sm">
									<span className="text-muted-foreground">Current stock</span>
									<span className="font-semibold text-foreground">
										{item.quantity} / 500 units
									</span>
								</div>
								<div className="h-2 rounded-full bg-muted/50 overflow-hidden">
									<div
										className={cn(
											"h-full rounded-full transition-all",
											item.status === "in_stock"
												? "bg-emerald-500"
												: item.status === "low_stock"
													? "bg-amber-500"
													: "bg-destructive",
										)}
										style={{ width: `${Math.min((item.quantity / 500) * 100, 100)}%` }}
									/>
								</div>
								<div className="flex items-center justify-between text-xs text-muted-foreground">
									<span>0 units</span>
									<span>500 units (max)</span>
								</div>
							</div>

							{/* Value breakdown */}
							<div className="flex flex-col gap-1 pt-1 border-t border-border/50">
								<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">
									Value Breakdown
								</span>
								{[
									{ label: "Unit Price", value: `$${item.price.toFixed(2)}` },
									{ label: "Units in Stock", value: `${item.quantity.toLocaleString()} units` },
									{
										label: "Total Inventory Value",
										value: `$${Number(totalValue).toLocaleString("en-US", { minimumFractionDigits: 2 })}`,
										highlight: true,
									},
								].map(({ label, value, highlight }) => (
									<div
										key={label}
										className="flex items-center justify-between py-2 border-b border-border/30 last:border-0"
									>
										<span className="text-sm text-muted-foreground">{label}</span>
										<span
											className={cn(
												"text-sm font-semibold",
												highlight ? "text-primary" : "text-foreground",
											)}
										>
											{value}
										</span>
									</div>
								))}
							</div>

							{/* Category context */}
							<div className="flex items-center gap-3 pt-1 border-t border-border/50">
								<div className="size-9 rounded-lg bg-muted/40 flex items-center justify-center shrink-0 border border-border/60">
									<Layers size={16} className="text-muted-foreground" />
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-sm font-medium text-foreground capitalize">
										{item.category} Category
									</span>
									<span className="text-xs text-muted-foreground">
										SKU prefix:{" "}
										<span className="font-mono">{item.sku.split("-")[0]}</span>
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Timeline */}
					<Card className="gap-0 py-0 ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-0">
							<CardTitle className="text-base font-semibold text-foreground">
								Item Timeline
							</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pt-4 pb-5">
							<div className="flex flex-col">
								{timeline.map((event, i, arr) => {
									const Icon = event.icon;
									const isLast = i === arr.length - 1;
									return (
										<div key={i} className="flex gap-4">
											<div className="flex flex-col items-center">
												<div
													className={cn(
														"size-9 rounded-lg flex items-center justify-center shrink-0",
														event.iconCls,
													)}
												>
													<Icon size={15} />
												</div>
												{!isLast && (
													<div className="w-px flex-1 bg-border/40 mt-2" />
												)}
											</div>
											<div
												className={cn(
													"flex flex-col gap-0.5 min-w-0",
													!isLast ? "pb-5" : "pb-0",
												)}
											>
												<div className="flex items-center justify-between gap-2">
													<span className="text-sm font-semibold text-foreground">
														{event.title}
													</span>
													<span className="text-xs text-muted-foreground shrink-0">
														{event.date}
													</span>
												</div>
												<span className="text-xs text-muted-foreground leading-relaxed">
													{event.desc}
												</span>
											</div>
										</div>
									);
								})}
							</div>
						</CardContent>
					</Card>

					{/* Summary */}
					<Card className="gap-0 py-0 ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-0">
							<CardTitle className="text-base font-semibold text-foreground">
								Quick Summary
							</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pt-4 pb-5">
							<div className="grid grid-cols-2 gap-4">
								{[
									{ label: "SKU", value: item.sku },
									{ label: "Added On", value: formatDate(item.createdAt) },
									{
										label: "Category",
										value:
											item.category.charAt(0).toUpperCase() +
											item.category.slice(1),
									},
									{ label: "Total Value", value: `$${Number(totalValue).toLocaleString("en-US", { minimumFractionDigits: 2 })}` },
								].map(({ label, value }) => (
									<div
										key={label}
										className="flex flex-col gap-1 p-4 rounded-lg border border-border/60 bg-muted/20"
									>
										<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
											{label}
										</span>
										<span className="text-sm font-medium text-foreground">
											{value}
										</span>
									</div>
								))}
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}
