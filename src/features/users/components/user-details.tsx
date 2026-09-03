import {
	AtSign,
	BadgeCheck,
	Calendar,
	Check,
	Copy,
	Edit,
	Hash,
	Mail,
	MoreHorizontal,
	Shield,
	ShoppingBag,
	Tag,
	Trash2,
	User as UserIcon,
	Wrench,
} from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

import { AppBreadCrumb } from "@/components/app-breadcrumb";

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
import { cn } from "@/lib/utils";
import { useAppStore } from "@/store";
import usersData from "../data/users.json";
import type { User } from "../types/user.types";

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

function monthsAgo(iso: string) {
	return Math.floor(daysAgo(iso) / 30);
}

function getStatusStyle(status: User["status"]) {
	return status === "active"
		? "border-emerald-500/30 text-emerald-500 bg-emerald-500/8"
		: "border-border text-muted-foreground bg-muted/40";
}

function getRoleStyle(role: User["role"]) {
	return role === "admin"
		? "border-primary/30 text-primary bg-primary/8"
		: role === "editor"
			? "border-amber-500/30 text-amber-500 bg-amber-500/8"
			: "border-border text-muted-foreground bg-muted/40";
}

function getTypeStyle(type: User["type"]) {
	return type === "service"
		? "border-border text-muted-foreground bg-muted/40"
		: "border-border text-muted-foreground bg-muted/40";
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

// ─── Main Component ───────────────────────────────────────────────────────────

export function UserDetails() {
	const { userId } = useParams<{ userId: string }>();
	const navigate = useNavigate();
	const currentUser = useAppStore((s) => s.user);

	const isAdmin = currentUser?.role
		? ["super-admin", "admin", "manager"].includes(currentUser.role)
		: window.location.pathname.startsWith("/admin");
	const basePath = isAdmin ? "/admin" : "";

	const users = usersData as User[];
	const user = users.find((u) => u.id === userId) || users[0];

	const [idCopied, setIdCopied] = useState(false);
	const [emailCopied, setEmailCopied] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);

	const handleCopyId = () => {
		navigator.clipboard.writeText(user.id);
		setIdCopied(true);
		setTimeout(() => setIdCopied(false), 2000);
	};

	const handleCopyEmail = () => {
		navigator.clipboard.writeText(user.email);
		setEmailCopied(true);
		setTimeout(() => setEmailCopied(false), 2000);
	};

	const initials = user.name
		.split(" ")
		.map((w) => w[0])
		.join("")
		.toUpperCase()
		.slice(0, 2);

	const days = daysAgo(user.createdAt);
	const months = monthsAgo(user.createdAt);

	return (
		<div className="flex flex-col gap-5 w-full max-w-[1400px] mx-auto pb-10">
			{/* ── Header & Breadcrumb ───────────────────────────── */}
			<AppBreadCrumb
				title="User Details"
				description="View and manage user profile and account details."
				items={[
					{ label: "Users", href: `${basePath}/users` },
					{ label: user.name, href: `${basePath}/users/${user.id}` },
				]}
				action={
					<div className="flex items-center gap-3">
						<span className="text-xs text-muted-foreground">View:</span>
						<select
							value={user.id}
							onChange={(e) => navigate(`${basePath}/users/${e.target.value}`)}
							className="h-8 text-xs rounded-lg bg-card border border-border px-2.5 py-1 text-foreground focus:outline-none focus:ring-1 focus:ring-primary"
						>
							{users.map((u) => (
								<option key={u.id} value={u.id}>
									{u.name}
								</option>
							))}
						</select>
					</div>
				}
			/>

			<Card className="gap-0 py-0 ring-1 ring-border">
				<CardContent className="p-6">
					<div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
						<div className="relative shrink-0">
							<Avatar className="size-16 rounded-lg ring-1 ring-border">
								<AvatarFallback className="rounded-lg bg-primary/12 text-primary text-lg font-bold">
									{initials}
								</AvatarFallback>
							</Avatar>
							<span
								className={cn(
									"absolute -bottom-1 -right-1 size-3.5 rounded-full border-2 border-card",
									user.status === "active"
										? "bg-emerald-500"
										: "bg-muted-foreground/40",
								)}
							/>
						</div>

						{/* Identity */}
						<div className="flex flex-col gap-1.5 flex-1 min-w-0">
							<div className="flex items-center gap-2 flex-wrap">
								<h1 className="text-xl font-bold text-foreground tracking-tight">
									{user.name}
								</h1>
								<Badge
									variant="outline"
									className={cn(
										"text-[11px] font-semibold px-2 py-0 h-5 rounded-md capitalize",
										getStatusStyle(user.status),
									)}
								>
									{user.status}
								</Badge>
								<Badge
									variant="outline"
									className={cn(
										"text-[11px] font-semibold px-2 py-0 h-5 rounded-md capitalize",
										getRoleStyle(user.role),
									)}
								>
									{user.role}
								</Badge>
								<Badge
									variant="outline"
									className={cn(
										"text-[11px] font-semibold px-2 py-0 h-5 rounded-md capitalize",
										getTypeStyle(user.type),
									)}
								>
									{user.type}
								</Badge>
							</div>
							<div className="flex items-center gap-1.5 text-sm text-muted-foreground">
								<AtSign size={13} />
								<span className="truncate">{user.email}</span>
							</div>
							<p className="text-xs text-muted-foreground">
								Member since {formatDateShort(user.createdAt)} · {days} days ago
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
								{idCopied ? "Copied" : `#${user.id}`}
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
									<div className="absolute right-0 top-9 z-50 w-40 rounded-lg border border-border bg-card shadow-lg overflow-hidden">
										<button
											type="button"
											onClick={() => setMenuOpen(false)}
											className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-foreground hover:bg-accent/60 transition-colors"
										>
											<Mail size={13} className="text-muted-foreground" />
											Send Email
										</button>
										<button
											type="button"
											onClick={() => setMenuOpen(false)}
											className="flex w-full items-center gap-2.5 px-3 py-2 text-xs text-destructive hover:bg-destructive/10 transition-colors border-t border-border/50"
										>
											<Trash2 size={13} />
											Delete User
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
						label: "Days Active",
						value: days.toLocaleString(),
						sub: `Since ${formatDateShort(user.createdAt)}`,
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
						value: user.type.charAt(0).toUpperCase() + user.type.slice(1),
						sub: "Division segment",
						icon: user.type === "service" ? Wrench : ShoppingBag,
					},
					{
						label: "Access Level",
						value: user.role.charAt(0).toUpperCase() + user.role.slice(1),
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
								<span className="text-[11px] text-muted-foreground">{sub}</span>
							</div>
						</CardContent>
					</Card>
				))}
			</div>

			{/* ── Two-column content ────────────────────────────────── */}
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
				{/* LEFT — Account Info ─────────────────────────────── */}
				<div className="lg:col-span-5 xl:col-span-5 flex flex-col gap-5">
					{/* Account Information */}
					<Card className="gap-0 py-0 ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-0 flex flex-row items-center justify-between">
							<CardTitle className="text-base font-semibold text-foreground">
								Account Information
							</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pt-2 pb-5">
							<DetailRow
								label="User ID"
								icon={Hash}
								value={
									<span className="font-mono text-foreground">
										#{user.id.padStart(4, "0")}
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
							<DetailRow label="Full Name" icon={UserIcon} value={user.name} />
							<DetailRow
								label="Email"
								icon={AtSign}
								value={
									<a
										href={`mailto:${user.email}`}
										className="text-primary hover:underline underline-offset-2 truncate"
									>
										{user.email}
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
								label="Role"
								icon={Shield}
								value={
									<span
										className={cn(
											"inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-semibold border capitalize",
											getRoleStyle(user.role),
										)}
									>
										{user.role}
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
											getStatusStyle(user.status),
										)}
									>
										<span
											className={cn(
												"size-1.5 rounded-full",
												user.status === "active"
													? "bg-emerald-500"
													: "bg-muted-foreground/60",
											)}
										/>
										{user.status}
									</span>
								}
							/>
							<DetailRow
								label="Account Type"
								icon={user.type === "service" ? Wrench : ShoppingBag}
								value={
									<span className="capitalize text-foreground font-medium">
										{user.type} division
									</span>
								}
							/>
							<DetailRow
								label="Member Since"
								icon={Calendar}
								value={
									<span className="text-foreground">
										{formatDate(user.createdAt)}
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
										href={`mailto:${user.email}`}
										className="text-primary hover:underline underline-offset-2"
									>
										{user.email}
									</a>
								}
							/>
							<DetailRow
								label="Address"
								icon={AtSign}
								value={
									user.type === "service"
										? "Tech Park 4, Silicon Way"
										: "Main Ave 18, Commerce City"
								}
							/>
						</CardContent>
					</Card>
				</div>

				{/* RIGHT — Access + Timeline ───────────────────────── */}
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
										getRoleStyle(user.role),
									)}
								>
									{user.role}
								</Badge>
							</CardAction>
						</CardHeader>
						<CardContent className="px-6 pt-4 pb-5 flex flex-col gap-4">
							{/* Role description */}
							<p className="text-sm text-muted-foreground leading-relaxed">
								{user.role === "admin"
									? "Full system access including user management, billing controls, security configuration, and role provisioning across all divisions."
									: user.role === "editor"
										? "Content management access with publishing rights, analytics visibility, media library control, and client portal administration."
										: "Standard operational access for order fulfilment, inventory browsing, customer support workflows, and catalog management."}
							</p>

							{/* Permissions grid */}
							<div className="flex flex-col gap-2">
								<span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
									Granted Permissions
								</span>
								<div className="flex flex-wrap gap-2">
									{(user.role === "admin"
										? [
												"Manage Users",
												"Billing Controls",
												"System Config",
												"Security Audits",
												"API Access",
												"Role Provisioning",
											]
										: user.role === "editor"
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

							{/* Division */}
							<div className="flex items-center gap-3 pt-1 border-t border-border/50">
								<div className="size-9 rounded-lg bg-muted/40 flex items-center justify-center shrink-0 border border-border/60">
									{user.type === "service" ? (
										<Wrench size={16} className="text-muted-foreground" />
									) : (
										<ShoppingBag size={16} className="text-muted-foreground" />
									)}
								</div>
								<div className="flex flex-col gap-0.5">
									<span className="text-sm font-medium text-foreground capitalize">
										{user.type} Division
									</span>
									<span className="text-xs text-muted-foreground">
										{user.type === "service"
											? "Technical services, infrastructure, and system operations."
											: "Retail operations, customer relations, and product catalog."}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					{/* Account Timeline */}
					<Card className="gap-0 py-0 ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-0 flex flex-row items-center justify-between">
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
										desc: `${user.name} joined as ${user.role} in the ${user.type} division.`,
										date: formatDate(user.createdAt),
									},
									{
										icon: Shield,
										iconCls:
											user.role === "admin"
												? "bg-primary/12 text-primary"
												: user.role === "editor"
													? "bg-amber-500/12 text-amber-500"
													: "bg-muted/40 text-muted-foreground",
										title: "Role Assigned",
										desc: `Access level set to "${user.role}" with ${user.type} division permissions.`,
										date: formatDateShort(user.createdAt),
									},
									{
										icon: BadgeCheck,
										iconCls:
											user.status === "active"
												? "bg-emerald-500/12 text-emerald-500"
												: "bg-muted/40 text-muted-foreground",
										title: "Status Verified",
										desc: `Account status confirmed as "${user.status}".`,
										date: formatDateShort(user.createdAt),
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

					{/* Summary Grid */}
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
										value: user.email,
										isLink: true,
									},
									{
										label: "Member Since",
										value: formatDate(user.createdAt),
										isLink: false,
									},
									{
										label: "Role",
										value:
											user.role.charAt(0).toUpperCase() + user.role.slice(1),
										isLink: false,
									},
									{
										label: "Division",
										value:
											user.type.charAt(0).toUpperCase() +
											user.type.slice(1) +
											" Division",
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
