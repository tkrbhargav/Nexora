import {
	AtSign,
	BadgeCheck,
	Bell,
	Building2,
	Calendar,
	Check,
	Clock,
	Copy,
	CreditCard,
	Edit,
	Globe,
	Hash,
	Key,
	Lock,
	LogOut,
	Mail,
	MapPin,
	Monitor,
	Moon,
	Phone,
	Shield,
	ShoppingBag,
	Sun,
	User as UserIcon,
	Wrench,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";

import { AppBreadCrumb } from "@/components/app-breadcrumb";
import { useTheme } from "@/components/theme-provider";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";

// ─── Mock profile data (enriched beyond AuthUser) ────────────────────────────

const PROFILE_DATA = {
	id: "1",
	name: "John Doe",
	email: "john@example.com",
	phone: "+1 (555) 123-4567",
	role: "admin" as const,
	status: "active" as const,
	type: "service" as const,
	location: "San Francisco, CA",
	timezone: "PST (UTC-8)",
	organization: {
		name: "Nexora Technologies",
		industry: "technology" as const,
		plan: "professional" as const,
	},
	createdAt: "2025-01-15T09:30:00Z",
	lastLogin: "2026-09-07T08:15:00Z",
	twoFactorEnabled: true,
};

type ProfileRole = "admin" | "editor" | "user";
type ProfileStatus = "active" | "inactive";

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

function formatDateTime(iso: string) {
	return new Date(iso).toLocaleString("en-US", {
		day: "numeric",
		month: "short",
		year: "numeric",
		hour: "numeric",
		minute: "2-digit",
		hour12: true,
	});
}

function daysAgo(iso: string) {
	return Math.floor((Date.now() - new Date(iso).getTime()) / 86400000);
}

function monthsAgo(iso: string) {
	return Math.floor(daysAgo(iso) / 30);
}

function getStatusStyle(status: ProfileStatus) {
	return status === "active"
		? "border-emerald-500/30 text-emerald-500 bg-emerald-500/8"
		: "border-border text-muted-foreground bg-muted/40";
}

function getRoleStyle(role: ProfileRole) {
	return role === "admin"
		? "border-primary/30 text-primary bg-primary/8"
		: role === "editor"
			? "border-amber-500/30 text-amber-500 bg-amber-500/8"
			: "border-border text-muted-foreground bg-muted/40";
}

function getPlanStyle(plan: string) {
	switch (plan) {
		case "enterprise":
			return "border-primary/30 text-primary bg-primary/8";
		case "professional":
			return "border-amber-500/30 text-amber-500 bg-amber-500/8";
		case "starter":
			return "border-emerald-500/30 text-emerald-500 bg-emerald-500/8";
		default:
			return "border-border text-muted-foreground bg-muted/40";
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
			<div className="flex items-center gap-3 w-40 shrink-0">
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

// ─── Preference Toggle ───────────────────────────────────────────────────────

function PreferenceRow({
	icon: Icon,
	title,
	description,
	enabled,
	onToggle,
	badge,
}: {
	icon: React.ElementType;
	title: string;
	description: string;
	enabled: boolean;
	onToggle: () => void;
	badge?: string;
}) {
	return (
		<div className="flex items-center gap-4 py-4 border-b border-border/50 last:border-0">
			<div className="size-9 rounded-lg bg-muted/40 flex items-center justify-center shrink-0 border border-border/60">
				<Icon size={16} className="text-muted-foreground" />
			</div>
			<div className="flex flex-col gap-0.5 flex-1 min-w-0">
				<div className="flex items-center gap-2">
					<span className="text-sm font-medium text-foreground">{title}</span>
					{badge && (
						<Badge
							variant="outline"
							className="text-[10px] font-semibold px-1.5 py-0 h-4 rounded-md border-emerald-500/30 text-emerald-500 bg-emerald-500/8"
						>
							{badge}
						</Badge>
					)}
				</div>
				<span className="text-xs text-muted-foreground">{description}</span>
			</div>
			<button
				type="button"
				onClick={onToggle}
				className={cn(
					"relative inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors duration-200",
					enabled ? "bg-primary" : "bg-muted",
				)}
			>
				<span
					className={cn(
						"pointer-events-none inline-block size-4 rounded-full bg-white shadow-sm transition-transform duration-200",
						enabled ? "translate-x-4" : "translate-x-0",
					)}
				/>
			</button>
		</div>
	);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function ProfilePage() {
	const navigate = useNavigate();
	const currentUser = useAppStore((s) => s.user);
	const clearUser = useAppStore((s) => s.clearUser);
	const { theme, setTheme } = useTheme();

	const isAdmin = currentUser?.role
		? ["super-admin", "admin", "manager"].includes(currentUser.role)
		: window.location.pathname.startsWith("/admin");
	const basePath = isAdmin ? "/admin" : "";

	// Use store user merged with mock profile data
	const profile = {
		...PROFILE_DATA,
		name: currentUser?.name || PROFILE_DATA.name,
		email: currentUser?.email || PROFILE_DATA.email,
		role: (currentUser?.role as ProfileRole) || PROFILE_DATA.role,
	};

	const [emailCopied, setEmailCopied] = useState(false);
	const [idCopied, setIdCopied] = useState(false);
	const [twoFactor, setTwoFactor] = useState(profile.twoFactorEnabled);
	const [emailNotifs, setEmailNotifs] = useState(true);
	const [pushNotifs, setPushNotifs] = useState(true);
	const [loginAlerts, setLoginAlerts] = useState(true);

	const handleCopyEmail = () => {
		navigator.clipboard.writeText(profile.email);
		setEmailCopied(true);
		setTimeout(() => setEmailCopied(false), 2000);
	};

	const handleCopyId = () => {
		navigator.clipboard.writeText(profile.id);
		setIdCopied(true);
		setTimeout(() => setIdCopied(false), 2000);
	};

	const handleLogout = () => {
		clearUser();
		navigate("/login", { replace: true });
	};

	const initials = profile.name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	const days = daysAgo(profile.createdAt);
	const months = monthsAgo(profile.createdAt);

	return (
		<div className="flex flex-col gap-5 w-full mx-auto pb-10">
			{/* ── Header & Breadcrumb ───────────────────────────── */}
			<AppBreadCrumb
				title="My Profile"
				description="View and manage your account details, security, and preferences."
				items={[
					{ label: "Dashboard", href: `${basePath}/dashboard` },
					{ label: "Profile", href: `${basePath}/profile` },
				]}
			/>

			{/* ── Profile Header Card ──────────────────────────── */}
			<Card className="gap-0 py-0 ring-1 ring-border">
				<CardContent className="p-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
						{/* Avatar */}
						<div className="relative shrink-0">
							<Avatar className="size-16 rounded-lg ring-1 ring-border">
								<AvatarFallback className="rounded-lg bg-primary/12 text-primary text-lg font-bold">
									{initials}
								</AvatarFallback>
							</Avatar>
							<span
								className={cn(
									"absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-card",
									profile.status === "active"
										? "bg-emerald-500"
										: "bg-muted-foreground/40",
								)}
							/>
						</div>

						{/* Identity */}
						<div className="flex flex-col gap-1.5 flex-1 min-w-0">
							<div className="flex items-center gap-2 flex-wrap">
								<h1 className="text-xl font-bold text-foreground tracking-tight">
									{profile.name}
								</h1>
								<Badge
									variant="outline"
									className={cn(
										"text-[11px] font-semibold px-2 py-0 h-5 rounded-md capitalize",
										getStatusStyle(profile.status),
									)}
								>
									{profile.status}
								</Badge>
								<Badge
									variant="outline"
									className={cn(
										"text-[11px] font-semibold px-2 py-0 h-5 rounded-md capitalize",
										getRoleStyle(profile.role),
									)}
								>
									{profile.role}
								</Badge>
							</div>
							<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
								<AtSign size={13} />
								<span className="truncate">{profile.email}</span>
							</div>
							<p className="text-xs text-muted-foreground">
								Member since {formatDateShort(profile.createdAt)} · {days} days
								ago
							</p>
						</div>

						{/* Actions */}
						<div className="flex items-center gap-2 shrink-0">
							<Button
								size="sm"
								variant="outline"
								className="h-8 text-xs gap-1.5 rounded-lg"
								onClick={handleCopyId}
							>
								{idCopied ? (
									<Check size={13} className="text-emerald-500" />
								) : (
									<Copy size={13} />
								)}
								{idCopied ? "Copied" : `#${profile.id.padStart(4, "0")}`}
							</Button>

							<Button
								size="sm"
								className="h-8 text-xs gap-1.5 rounded-lg font-medium"
							>
								<Edit size={13} />
								Edit Profile
							</Button>

							<Button
								size="sm"
								variant="outline"
								className="h-8 text-xs gap-1.5 rounded-lg text-destructive hover:bg-destructive/10 hover:text-destructive border-border"
								onClick={handleLogout}
							>
								<LogOut size={13} />
								Logout
							</Button>
						</div>
					</div>
				</CardContent>
			</Card>

			{/* ── Stats Row ─────────────────────────────────────── */}
			<div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
				{[
					{
						label: "Days Active",
						value: days.toLocaleString(),
						sub: `Since ${formatDateShort(profile.createdAt)}`,
						icon: Calendar,
					},
					{
						label: "Months Onboard",
						value: months.toString(),
						sub: "Full calendar months",
						icon: Calendar,
					},
					{
						label: "Account Type",
						value:
							profile.type.charAt(0).toUpperCase() + profile.type.slice(1),
						sub: "Division segment",
						icon: profile.type === "service" ? Wrench : ShoppingBag,
					},
					{
						label: "Access Level",
						value:
							profile.role.charAt(0).toUpperCase() + profile.role.slice(1),
						sub: "Permission tier",
						icon: Shield,
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
								<span className="text-[11px] text-muted-foreground">
									{sub}
								</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* ── Tabs Section ─────────────────────────────────── */}
			<Tabs defaultValue="overview">
				<TabsList variant="line">
					<TabsTrigger value="overview">Overview</TabsTrigger>
					<TabsTrigger value="security">Security</TabsTrigger>
					<TabsTrigger value="preferences">Preferences</TabsTrigger>
				</TabsList>

				{/* ── TAB: Overview ─────────────────────────────── */}
				<TabsContent value="overview">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
						{/* LEFT — Account Info ────────────────────── */}
						<div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-5">
							{/* Personal Information */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-foreground">
										Personal Information
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-2 pb-5">
									<DetailRow
										label="User ID"
										icon={Hash}
										value={
											<span className="font-mono text-foreground">
												#{profile.id.padStart(4, "0")}
											</span>
										}
										action={
											<button
												type="button"
												onClick={handleCopyId}
												className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-accent/60"
											>
												{idCopied ? (
													<Check size={12} className="text-emerald-500" />
												) : (
													<Copy size={12} />
												)}
												{idCopied ? "Copied" : "Copy"}
											</button>
										}
									/>
									<DetailRow
										label="Full Name"
										icon={UserIcon}
										value={profile.name}
									/>
									<DetailRow
										label="Email"
										icon={AtSign}
										value={
											<a
												href={`mailto:${profile.email}`}
												className="text-primary hover:underline underline-offset-2 truncate"
											>
												{profile.email}
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
										label="Phone"
										icon={Phone}
										value={profile.phone}
									/>
									<DetailRow
										label="Location"
										icon={MapPin}
										value={profile.location}
									/>
									<DetailRow
										label="Timezone"
										icon={Globe}
										value={profile.timezone}
									/>
									<DetailRow
										label="Member Since"
										icon={Calendar}
										value={formatDate(profile.createdAt)}
									/>
								</CardContent>
							</Card>

							{/* Organization */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0 flex flex-row items-center justify-between">
									<CardTitle className="text-base font-semibold text-foreground">
										Organization
									</CardTitle>
									<CardAction>
										<Badge
											variant="outline"
											className={cn(
												"text-[11px] font-semibold px-2 py-0.5 rounded-md capitalize",
												getPlanStyle(profile.organization.plan),
											)}
										>
											{profile.organization.plan}
										</Badge>
									</CardAction>
								</CardHeader>
								<CardContent className="px-6 pt-2 pb-5">
									<DetailRow
										label="Name"
										icon={Building2}
										value={profile.organization.name}
									/>
									<DetailRow
										label="Industry"
										icon={Globe}
										value={
											<span className="capitalize">
												{profile.organization.industry}
											</span>
										}
									/>
									<DetailRow
										label="Plan"
										icon={CreditCard}
										value={
											<span
												className={cn(
													"inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold border capitalize",
													getPlanStyle(profile.organization.plan),
												)}
											>
												{profile.organization.plan}
											</span>
										}
									/>
								</CardContent>
							</Card>

							{/* Contact */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-foreground">
										Contact
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-2 pb-5">
									<DetailRow
										label="Email"
										icon={Mail}
										value={
											<a
												href={`mailto:${profile.email}`}
												className="text-primary hover:underline underline-offset-2"
											>
												{profile.email}
											</a>
										}
									/>
									<DetailRow
										label="Phone"
										icon={Phone}
										value={profile.phone}
									/>
									<DetailRow
										label="Address"
										icon={MapPin}
										value={
											profile.type === "service"
												? "Tech Park 4, Silicon Way"
												: "Main Ave 18, Commerce City"
										}
									/>
								</CardContent>
							</Card>
						</div>

						{/* RIGHT — Role & Timeline ────────────────── */}
						<div className="lg:col-span-7 xl:col-span-7 flex flex-col gap-5">
							{/* Role & Permissions */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0 flex flex-row items-center justify-between">
									<CardTitle className="text-base font-semibold text-foreground">
										Role &amp; Permissions
									</CardTitle>
									<CardAction>
										<Badge
											variant="outline"
											className={cn(
												"text-[11px] font-semibold px-2 py-0.5 rounded-md capitalize",
												getRoleStyle(profile.role),
											)}
										>
											{profile.role}
										</Badge>
									</CardAction>
								</CardHeader>
								<CardContent className="px-6 pt-4 pb-5 flex flex-col gap-4">
									<p className="text-sm text-muted-foreground leading-relaxed">
										{profile.role === "admin"
											? "Full system access including user management, billing controls, security configuration, and role provisioning across all divisions."
											: profile.role === "editor"
												? "Content management access with publishing rights, analytics visibility, media library control, and client portal administration."
												: "Standard operational access for order fulfilment, inventory browsing, customer support workflows, and catalog management."}
									</p>

									<div className="flex flex-col gap-2">
										<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
											Granted Permissions
										</span>
										<div className="flex flex-wrap gap-2">
											{(profile.role === "admin"
												? [
														"Manage Users",
														"Billing Controls",
														"System Config",
														"Security Audits",
														"API Access",
														"Role Provisioning",
													]
												: profile.role === "editor"
													? [
															"Publish Content",
															"Data Export",
															"View Analytics",
															"Media Library",
															"Client Portals",
														]
													: [
															"Order Fulfilment",
															"Inventory View",
															"Customer Support",
															"Catalog Browse",
														]
											).map((perm) => (
												<span
													key={perm}
													className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium border border-border/60 bg-muted/30 text-foreground/80"
												>
													<BadgeCheck
														size={12}
														className="text-primary/70 shrink-0"
													/>
													{perm}
												</span>
											))}
										</div>
									</div>

									<div className="flex items-center gap-3 pt-1 border-t border-border/50">
										<div className="size-9 rounded-lg bg-muted/40 flex items-center justify-center shrink-0 border border-border/60">
											{profile.type === "service" ? (
												<Wrench
													size={16}
													className="text-muted-foreground"
												/>
											) : (
												<ShoppingBag
													size={16}
													className="text-muted-foreground"
												/>
											)}
										</div>
										<div className="flex flex-col gap-0.5">
											<span className="text-sm font-medium text-foreground capitalize">
												{profile.type} Division
											</span>
											<span className="text-xs text-muted-foreground">
												{profile.type === "service"
													? "Technical services, infrastructure, and system operations."
													: "Retail operations, customer relations, and product catalog."}
											</span>
										</div>
									</div>
								</CardContent>
							</Card>

							{/* Account Timeline */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-foreground">
										Account Timeline
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-4 pb-5">
									<div className="flex flex-col">
										{[
											{
												icon: UserIcon,
												iconCls: "bg-primary/12 text-primary",
												title: "Account Created",
												desc: `You joined as ${profile.role} in the ${profile.type} division.`,
												date: formatDate(profile.createdAt),
											},
											{
												icon: Shield,
												iconCls:
													profile.role === "admin"
														? "bg-primary/12 text-primary"
														: profile.role === "editor"
															? "bg-amber-500/12 text-amber-500"
															: "bg-muted/40 text-muted-foreground",
												title: "Role Assigned",
												desc: `Access level set to "${profile.role}" with ${profile.type} division permissions.`,
												date: formatDateShort(profile.createdAt),
											},
											{
												icon: Lock,
												iconCls: twoFactor
													? "bg-emerald-500/12 text-emerald-500"
													: "bg-muted/40 text-muted-foreground",
												title: "Two-Factor Authentication",
												desc: twoFactor
													? "Two-factor authentication is enabled on your account."
													: "Two-factor authentication is not yet enabled.",
												date: formatDateShort(profile.createdAt),
											},
											{
												icon: Clock,
												iconCls: "bg-muted/40 text-muted-foreground",
												title: "Last Login",
												desc: `Most recent sign-in detected.`,
												date: formatDateTime(profile.lastLogin),
											},
											{
												icon: BadgeCheck,
												iconCls:
													profile.status === "active"
														? "bg-emerald-500/12 text-emerald-500"
														: "bg-muted/40 text-muted-foreground",
												title: "Status Verified",
												desc: `Account status confirmed as "${profile.status}".`,
												date: formatDateShort(profile.createdAt),
											},
										].map((event, i, arr) => {
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
															<div className="w-px flex-1 bg-border/40 mt-2 mb-0" />
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

							{/* Profile Summary */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-foreground">
										Profile Summary
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-4 pb-5">
									<div className="grid grid-cols-2 gap-4">
										{[
											{
												label: "Email",
												value: profile.email,
												isLink: true,
											},
											{
												label: "Member Since",
												value: formatDate(profile.createdAt),
												isLink: false,
											},
											{
												label: "Role",
												value:
													profile.role.charAt(0).toUpperCase() +
													profile.role.slice(1),
												isLink: false,
											},
											{
												label: "Organization",
												value: profile.organization.name,
												isLink: false,
											},
											{
												label: "Division",
												value:
													profile.type.charAt(0).toUpperCase() +
													profile.type.slice(1) +
													" Division",
												isLink: false,
											},
											{
												label: "Last Login",
												value: formatDateTime(profile.lastLogin),
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
				</TabsContent>

				{/* ── TAB: Security ─────────────────────────────── */}
				<TabsContent value="security">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
						<div className="lg:col-span-6 flex flex-col gap-5">
							{/* Security Settings */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-foreground">
										Security Settings
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-2 pb-5">
									<PreferenceRow
										icon={Lock}
										title="Two-Factor Authentication"
										description="Add an extra layer of security to your account."
										enabled={twoFactor}
										onToggle={() => setTwoFactor(!twoFactor)}
										badge={twoFactor ? "Active" : undefined}
									/>
									<PreferenceRow
										icon={Bell}
										title="Login Alerts"
										description="Get notified when someone signs into your account."
										enabled={loginAlerts}
										onToggle={() => setLoginAlerts(!loginAlerts)}
									/>
								</CardContent>
							</Card>

							{/* Change Password */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-foreground">
										Change Password
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-4 pb-5 flex flex-col gap-4">
									<p className="text-sm text-muted-foreground leading-relaxed">
										To keep your account secure, we recommend changing your
										password every 90 days.
									</p>
									<div className="flex flex-col gap-3">
										{[
											{
												label: "Current Password",
												placeholder: "Enter current password",
											},
											{
												label: "New Password",
												placeholder: "Enter new password",
											},
											{
												label: "Confirm Password",
												placeholder: "Confirm new password",
											},
										].map(({ label, placeholder }) => (
											<div key={label} className="flex flex-col gap-1.5">
												<label className="text-xs font-medium text-muted-foreground">
													{label}
												</label>
												<input
													type="password"
													placeholder={placeholder}
													className="h-9 rounded-lg bg-muted/30 border border-border/60 px-3 text-sm text-foreground placeholder:text-muted-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary/50 transition-colors"
												/>
											</div>
										))}
									</div>
									<Button
										size="sm"
										className="h-8 text-xs gap-1.5 rounded-lg font-medium w-fit"
									>
										<Key size={13} />
										Update Password
									</Button>
								</CardContent>
							</Card>
						</div>

						<div className="lg:col-span-6 flex flex-col gap-5">
							{/* Active Sessions */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-foreground">
										Active Sessions
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-4 pb-5 flex flex-col gap-0">
									{[
										{
											device: "Windows PC",
											browser: "Chrome 128",
											location: "San Francisco, CA",
											lastActive: "Active now",
											isCurrent: true,
										},
										{
											device: "MacBook Pro",
											browser: "Safari 18",
											location: "San Francisco, CA",
											lastActive: "2 hours ago",
											isCurrent: false,
										},
										{
											device: "iPhone 15",
											browser: "Safari Mobile",
											location: "San Francisco, CA",
											lastActive: "1 day ago",
											isCurrent: false,
										},
									].map((session) => (
										<div
											key={session.device}
											className="flex items-center gap-4 py-4 border-b border-border/50 last:border-0"
										>
											<div className="size-9 rounded-lg bg-muted/40 flex items-center justify-center shrink-0 border border-border/60">
												<Monitor
													size={16}
													className="text-muted-foreground"
												/>
											</div>
											<div className="flex flex-col gap-0.5 flex-1 min-w-0">
												<div className="flex items-center gap-2">
													<span className="text-sm font-medium text-foreground">
														{session.device} · {session.browser}
													</span>
													{session.isCurrent && (
														<Badge
															variant="outline"
															className="text-[10px] font-semibold px-1.5 py-0 h-4 rounded-md border-emerald-500/30 text-emerald-500 bg-emerald-500/8"
														>
															Current
														</Badge>
													)}
												</div>
												<span className="text-xs text-muted-foreground">
													{session.location} · {session.lastActive}
												</span>
											</div>
											{!session.isCurrent && (
												<Button
													size="sm"
													variant="outline"
													className="h-7 text-[11px] rounded-md text-destructive hover:bg-destructive/10 hover:text-destructive border-border"
												>
													Revoke
												</Button>
											)}
										</div>
									))}
								</CardContent>
							</Card>

							{/* Login History */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-foreground">
										Login History
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-4 pb-5">
									<div className="flex flex-col">
										{[
											{
												date: "Sep 7, 2026 · 8:15 AM",
												device: "Chrome · Windows",
												status: "success" as const,
											},
											{
												date: "Sep 6, 2026 · 9:30 PM",
												device: "Safari · macOS",
												status: "success" as const,
											},
											{
												date: "Sep 5, 2026 · 3:45 PM",
												device: "Safari · iPhone",
												status: "success" as const,
											},
											{
												date: "Sep 4, 2026 · 11:20 AM",
												device: "Unknown · Linux",
												status: "failed" as const,
											},
											{
												date: "Sep 3, 2026 · 7:00 AM",
												device: "Chrome · Windows",
												status: "success" as const,
											},
										].map((entry, i) => (
											<div
												key={i}
												className="flex items-center gap-4 py-3 border-b border-border/50 last:border-0"
											>
												<div
													className={cn(
														"size-2 rounded-full shrink-0",
														entry.status === "success"
															? "bg-emerald-500"
															: "bg-destructive",
													)}
												/>
												<div className="flex flex-col gap-0.5 flex-1 min-w-0">
													<span className="text-xs font-medium text-foreground">
														{entry.device}
													</span>
													<span className="text-[11px] text-muted-foreground">
														{entry.date}
													</span>
												</div>
												<Badge
													variant="outline"
													className={cn(
														"text-[10px] font-semibold px-1.5 py-0 h-4 rounded-md capitalize",
														entry.status === "success"
															? "border-emerald-500/30 text-emerald-500 bg-emerald-500/8"
															: "border-destructive/30 text-destructive bg-destructive/8",
													)}
												>
													{entry.status}
												</Badge>
											</div>
										))}
									</div>
								</CardContent>
							</Card>
						</div>
					</div>
				</TabsContent>

				{/* ── TAB: Preferences ──────────────────────────── */}
				<TabsContent value="preferences">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
						<div className="lg:col-span-6 flex flex-col gap-5">
							{/* Notifications */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-foreground">
										Notifications
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-2 pb-5">
									<PreferenceRow
										icon={Mail}
										title="Email Notifications"
										description="Receive updates, reports, and alerts via email."
										enabled={emailNotifs}
										onToggle={() => setEmailNotifs(!emailNotifs)}
									/>
									<PreferenceRow
										icon={Bell}
										title="Push Notifications"
										description="Get real-time push notifications in the browser."
										enabled={pushNotifs}
										onToggle={() => setPushNotifs(!pushNotifs)}
									/>
								</CardContent>
							</Card>

							{/* Regional */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-foreground">
										Regional Settings
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-2 pb-5">
									<DetailRow
										label="Language"
										icon={Globe}
										value="English (US)"
									/>
									<DetailRow
										label="Timezone"
										icon={Clock}
										value={profile.timezone}
									/>
									<DetailRow
										label="Date Format"
										icon={Calendar}
										value="MM/DD/YYYY"
									/>
								</CardContent>
							</Card>
						</div>

						<div className="lg:col-span-6 flex flex-col gap-5">
							{/* Appearance */}
							<Card className="gap-0 py-0 ring-1 ring-border">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-foreground">
										Appearance
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-4 pb-5">
									<p className="text-sm text-muted-foreground leading-relaxed mb-4">
										Choose your preferred theme for the application interface.
									</p>
									<div className="grid grid-cols-3 gap-3">
										{[
											{
												value: "light" as const,
												label: "Light",
												icon: Sun,
											},
											{
												value: "dark" as const,
												label: "Dark",
												icon: Moon,
											},
											{
												value: "system" as const,
												label: "System",
												icon: Monitor,
											},
										].map(({ value, label, icon: Icon }) => (
											<button
												key={value}
												type="button"
												onClick={() => setTheme(value)}
												className={cn(
													"flex flex-col items-center gap-2 p-4 rounded-lg border transition-all duration-200",
													theme === value
														? "border-primary bg-primary/5 ring-1 ring-primary/20"
														: "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/30",
												)}
											>
												<div
													className={cn(
														"size-10 rounded-lg flex items-center justify-center",
														theme === value
															? "bg-primary/12 text-primary"
															: "bg-muted/40 text-muted-foreground",
													)}
												>
													<Icon size={18} />
												</div>
												<span
													className={cn(
														"text-xs font-medium",
														theme === value
															? "text-primary"
															: "text-muted-foreground",
													)}
												>
													{label}
												</span>
												{theme === value && (
													<div className="size-1.5 rounded-full bg-primary" />
												)}
											</button>
										))}
									</div>
								</CardContent>
							</Card>

							{/* Danger Zone */}
							<Card className="gap-0 py-0 ring-1 ring-destructive/30">
								<CardHeader className="px-6 pt-5 pb-0">
									<CardTitle className="text-base font-semibold text-destructive">
										Danger Zone
									</CardTitle>
								</CardHeader>
								<CardContent className="px-6 pt-4 pb-5 flex flex-col gap-4">
									<p className="text-sm text-muted-foreground leading-relaxed">
										Permanently delete your account and all associated data.
										This action cannot be undone.
									</p>
									<Button
										size="sm"
										variant="outline"
										className="h-8 text-xs gap-1.5 rounded-lg font-medium w-fit text-destructive border-destructive/30 hover:bg-destructive/10 hover:text-destructive"
									>
										Delete Account
									</Button>
								</CardContent>
							</Card>
						</div>
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
}
