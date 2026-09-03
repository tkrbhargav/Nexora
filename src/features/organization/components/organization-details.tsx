import {
	AtSign,
	BadgeCheck,
	BadgeDollarSign,
	Building2,
	Calendar,
	Check,
	Copy,
	Edit,
	Globe,
	Hash,
	MoreHorizontal,
	Star,
	Tag,
	Trash2,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { AppBreadCrumb } from "@/components/app-breadcrumb";

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
import organizationsData from "../data/organizations.json";
import type { Organization } from "../types/organization.types";

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

function getStatusStyle(status: Organization["status"]) {
	return status === "active"
		? "border-emerald-500/30 text-emerald-500 bg-emerald-500/8"
		: "border-border text-muted-foreground bg-muted/40";
}

function getPlanStyle(plan: Organization["plan"]) {
	switch (plan) {
		case "enterprise":
			return "border-primary/30 text-primary bg-primary/8";
		case "professional":
			return "border-amber-500/30 text-amber-500 bg-amber-500/8";
		case "starter":
			return "border-border text-muted-foreground bg-muted/40";
		default:
			return "border-border text-muted-foreground bg-muted/40";
	}
}

function getPlanFeatures(plan: Organization["plan"]) {
	switch (plan) {
		case "enterprise":
			return [
				"Unlimited Users",
				"Priority Support",
				"Custom Integrations",
				"SLA Guarantee",
				"Advanced Analytics",
				"Dedicated Account Manager",
			];
		case "professional":
			return [
				"Up to 50 Users",
				"Email Support",
				"API Access",
				"Advanced Reports",
				"Custom Branding",
			];
		case "starter":
			return [
				"Up to 10 Users",
				"Basic Support",
				"Standard Reports",
				"Core Features",
			];
		default:
			return ["Up to 5 Users", "Community Support", "Basic Features"];
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

export function OrganizationDetails() {
	const { orgId } = useParams<{ orgId: string }>();
	const navigate = useNavigate();
	const currentUser = useAppStore((s) => s.user);

	const isAdmin = currentUser?.role
		? ["super-admin", "admin", "manager"].includes(currentUser.role)
		: window.location.pathname.startsWith("/admin");
	const basePath = isAdmin ? "/admin" : "";

	const organizations = organizationsData as Organization[];
	const org = organizations.find((o) => o.id === orgId) || organizations[0];

	const [emailCopied, setEmailCopied] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleCopyEmail = () => {
		navigator.clipboard.writeText(org.email);
		setEmailCopied(true);
		setTimeout(() => setEmailCopied(false), 2000);
	};

	const days = daysAgo(org.createdAt);
	const months = Math.floor(days / 30);

	// Initials from org name
	const initials = org.name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	const timeline = [
		{
			icon: Building2,
			iconCls: "bg-primary/12 text-primary",
			title: "Organization Registered",
			desc: `${org.name} was onboarded in the ${org.industry} industry.`,
			date: formatDate(org.createdAt),
		},
		{
			icon: BadgeDollarSign,
			iconCls:
				org.plan === "enterprise"
					? "bg-primary/12 text-primary"
					: org.plan === "professional"
						? "bg-amber-500/12 text-amber-500"
						: "bg-muted/40 text-muted-foreground",
			title: "Plan Assigned",
			desc: `Subscription plan set to "${org.plan.charAt(0).toUpperCase() + org.plan.slice(1)}".`,
			date: formatDateShort(org.createdAt),
		},
		{
			icon: BadgeCheck,
			iconCls:
				org.status === "active"
					? "bg-emerald-500/12 text-emerald-500"
					: "bg-muted/40 text-muted-foreground",
			title: "Status Confirmed",
			desc: `Organization status verified as "${org.status}".`,
			date: formatDateShort(org.createdAt),
		},
	];

	return (
		<div className="flex flex-col gap-5 w-full max-w-[1400px] mx-auto pb-10">
			{/* ── Header & Breadcrumb ───────────────────────────── */}
			<AppBreadCrumb
				title="Organization Details"
				description="View and manage organization profile and subscription."
				items={[
					{ label: "Organizations", href: `${basePath}/organizations` },
					{ label: org.name, href: `${basePath}/organizations/${org.id}` },
				]}
				action={
					<div className="flex items-center gap-3">
						<span className="text-xs text-muted-foreground">View:</span>
						<select
							value={org.id}
							onChange={(e) =>
								navigate(`${basePath}/organizations/${e.target.value}`)
							}
							className="h-8 text-xs rounded-lg bg-card border border-border px-2.5 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
						>
							{organizations.map((o) => (
								<option key={o.id} value={o.id}>
									{o.name}
								</option>
							))}
						</select>
					</div>
				}
			/>

			{/* ── Header Card ───────────────────────────────────────── */}
			<Card className="gap-0 py-0 ring-1 ring-border">
				<CardContent className="p-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
						{/* Avatar */}
						<div className="size-16 rounded-lg bg-primary/12 flex items-center justify-center shrink-0 border border-primary/20">
							<span className="text-xl font-bold text-primary">{initials}</span>
						</div>

						{/* Identity */}
						<div className="flex flex-col gap-1.5 flex-1 min-w-0">
							<div className="flex items-center gap-2 flex-wrap">
								<h1 className="text-xl font-bold text-foreground tracking-tight">
									{org.name}
								</h1>
								<Badge
									variant="outline"
									className={cn(
										"text-[11px] font-semibold px-2 py-0 h-5 rounded-md capitalize",
										getStatusStyle(org.status),
									)}
								>
									<span
										className={cn(
											"size-1.5 rounded-full mr-1.5",
											org.status === "active"
												? "bg-emerald-500"
												: "bg-muted-foreground/60",
										)}
									/>
									{org.status}
								</Badge>
								<Badge
									variant="outline"
									className={cn(
										"text-[11px] font-semibold px-2 py-0 h-5 rounded-md capitalize",
										getPlanStyle(org.plan),
									)}
								>
									{org.plan}
								</Badge>
								<Badge
									variant="outline"
									className="text-[11px] font-semibold px-2 py-0 h-5 rounded-md border-border text-muted-foreground bg-muted/40 capitalize"
								>
									{org.industry}
								</Badge>
							</div>
							<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
								<AtSign size={13} />
								<span>{org.email}</span>
							</div>
							<p className="text-xs text-muted-foreground">
								Registered {formatDateShort(org.createdAt)} · {days} days ago
							</p>
						</div>

						{/* Actions */}
						<div className="flex items-center gap-2 shrink-0">
							<Button
								size="sm"
								variant="outline"
								className="h-8 text-xs gap-1.5 rounded-lg"
								onClick={handleCopyEmail}
							>
								{emailCopied ? (
									<Check size={13} className="text-emerald-500" />
								) : (
									<Copy size={13} />
								)}
								{emailCopied ? "Copied" : "Copy Email"}
							</Button>

							<Button
								size="sm"
								className="h-8 text-xs gap-1.5 rounded-lg font-medium"
							>
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
									<div className="absolute right-0 top-9 z-50 w-44 rounded-lg border border-border bg-card shadow-lg overflow-hidden">
										<button
											type="button"
											onClick={() => setMenuOpen(false)}
											className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-foreground hover:bg-accent/60 transition-colors"
										>
											<Globe size={13} className="text-muted-foreground" />
											Visit Website
										</button>
										<button
											type="button"
											onClick={() => setMenuOpen(false)}
											className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-destructive hover:bg-destructive/10 transition-colors border-t border-border/50"
										>
											<Trash2 size={13} />
											Delete Organization
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
						label: "Days Registered",
						value: days.toLocaleString(),
						sub: `Since ${formatDateShort(org.createdAt)}`,
						icon: Calendar,
					},
					{
						label: "Months Active",
						value: months.toString(),
						sub: "Full calendar months",
						icon: Calendar,
					},
					{
						label: "Current Plan",
						value: org.plan.charAt(0).toUpperCase() + org.plan.slice(1),
						sub: "Subscription tier",
						icon: Star,
					},
					{
						label: "Industry",
						value: org.industry.charAt(0).toUpperCase() + org.industry.slice(1),
						sub: "Sector classification",
						icon: Building2,
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
				{/* LEFT — Org Info ──────────────────────────────────── */}
				<div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-5">
					<Card className="gap-0 py-0 ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-0">
							<CardTitle className="text-base font-semibold text-foreground">
								Organization Information
							</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pt-2 pb-5">
							<DetailRow
								label="Org ID"
								icon={Hash}
								value={
									<span className="font-mono">#{org.id.padStart(4, "0")}</span>
								}
							/>
							<DetailRow label="Name" icon={Building2} value={org.name} />
							<DetailRow
								label="Email"
								icon={AtSign}
								value={
									<a
										href={`mailto:${org.email}`}
										className="text-primary hover:underline underline-offset-2 truncate"
									>
										{org.email}
									</a>
								}
								action={
									<button
										type="button"
										onClick={handleCopyEmail}
										className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent/60"
									>
										{emailCopied ? (
											<Check size={12} className="text-emerald-500" />
										) : (
											<Copy size={12} />
										)}
										{emailCopied ? "Copied" : "Copy"}
									</button>
								}
							/>
							<DetailRow
								label="Industry"
								icon={Globe}
								value={
									<span className="capitalize text-foreground font-medium">
										{org.industry}
									</span>
								}
							/>
							<DetailRow
								label="Status"
								icon={Tag}
								value={
									<span
										className={cn(
											"inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold border capitalize",
											getStatusStyle(org.status),
										)}
									>
										<span
											className={cn(
												"size-1.5 rounded-full",
												org.status === "active"
													? "bg-emerald-500"
													: "bg-muted-foreground/60",
											)}
										/>
										{org.status}
									</span>
								}
							/>
							<DetailRow
								label="Plan"
								icon={Star}
								value={
									<span
										className={cn(
											"inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold border capitalize",
											getPlanStyle(org.plan),
										)}
									>
										{org.plan}
									</span>
								}
							/>
							<DetailRow
								label="Registered"
								icon={Calendar}
								value={
									<span className="text-foreground">
										{formatDate(org.createdAt)}
									</span>
								}
							/>
						</CardContent>
					</Card>
				</div>

				{/* RIGHT — Plan + Timeline ─────────────────────────── */}
				<div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-5">
					{/* Plan & Features */}
					<Card className="gap-0 py-0 ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-0 flex flex-row items-center justify-between">
							<CardTitle className="text-base font-semibold text-foreground">
								Plan &amp; Features
							</CardTitle>
							<CardAction>
								<Badge
									variant="outline"
									className={cn(
										"text-[11px] font-semibold px-2 py-0.5 rounded-md capitalize",
										getPlanStyle(org.plan),
									)}
								>
									{org.plan}
								</Badge>
							</CardAction>
						</CardHeader>
						<CardContent className="px-6 pt-4 pb-5 flex flex-col gap-4">
							{/* Plan description */}
							<p className="text-sm text-muted-foreground leading-relaxed">
								{org.plan === "enterprise"
									? "Full-featured enterprise plan with unlimited users, dedicated support, custom integrations, and guaranteed SLA for large-scale operations."
									: org.plan === "professional"
										? "Professional plan for growing teams with expanded user capacity, API access, advanced reporting, and custom branding capabilities."
										: org.plan === "starter"
											? "Starter plan for small teams getting up and running with core platform features and basic support."
											: "Free plan with limited access to core features for evaluation purposes."}
							</p>

							{/* Features */}
							<div className="flex flex-col gap-2">
								<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Included Features
								</span>
								<div className="flex flex-wrap gap-2">
									{getPlanFeatures(org.plan).map((feature) => (
										<span
											key={feature}
											className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border/60 bg-muted/30 text-foreground/80"
										>
											<BadgeCheck
												size={12}
												className="text-primary/70 shrink-0"
											/>
											{feature}
										</span>
									))}
								</div>
							</div>

							{/* Industry context */}
							<div className="flex items-center gap-3 pt-1 border-t border-border/50">
								<div className="size-9 rounded-lg bg-muted/40 flex items-center justify-center shrink-0 border border-border/60">
									<Building2 size={16} className="text-muted-foreground" />
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-sm font-medium text-foreground capitalize">
										{org.industry} Industry
									</span>
									<span className="text-xs text-muted-foreground">
										{org.industry === "technology"
											? "Software, hardware, and digital services sector."
											: org.industry === "healthcare"
												? "Medical, clinical, and wellness services sector."
												: org.industry === "finance"
													? "Banking, investment, and financial services sector."
													: org.industry === "education"
														? "Learning, training, and academic institutions sector."
														: "Consumer goods, e-commerce, and sales sector."}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Timeline */}
					<Card className="gap-0 py-0 ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-0">
							<CardTitle className="text-base font-semibold text-foreground">
								Organization Timeline
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
									{ label: "Email", value: org.email, isLink: true },
									{
										label: "Registered",
										value: formatDate(org.createdAt),
										isLink: false,
									},
									{
										label: "Plan",
										value: org.plan.charAt(0).toUpperCase() + org.plan.slice(1),
										isLink: false,
									},
									{
										label: "Industry",
										value:
											org.industry.charAt(0).toUpperCase() +
											org.industry.slice(1),
										isLink: false,
									},
								].map(({ label, value, isLink }) => (
									<div
										key={label}
										className="flex flex-col gap-1 p-4 rounded-lg border border-border/60 bg-muted/20"
									>
										<span className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
											{label}
										</span>
										{isLink ? (
											<a
												href={`mailto:${value}`}
												className="text-sm font-medium text-primary hover:underline underline-offset-2 truncate"
											>
												{value}
											</a>
										) : (
											<span className="text-sm font-medium text-foreground">
												{value}
											</span>
										)}
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
