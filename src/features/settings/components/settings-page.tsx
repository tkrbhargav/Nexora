import { useState } from "react";
import { AppBreadCrumb } from "@/components/app-breadcrumb";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Bell,
	Check,
	Globe,
	Moon,
	Palette,
	Shield,
	Sliders,
	Sun,
	Copy,
	Save,
} from "lucide-react";

export function SettingsPage() {
	const { theme, setTheme } = useTheme();
	const [saved, setSaved] = useState(false);
	const [apiKeyCopied, setApiKeyCopied] = useState(false);

	// General form state
	const [appName, setAppName] = useState("Nexora Enterprise");
	const [timezone, setTimezone] = useState("UTC-8 (Pacific Standard Time)");
	const [currency, setCurrency] = useState("USD ($)");
	const [language, setLanguage] = useState("English (US)");

	// Security state
	const [apiKey] = useState("nx_live_994827103847291038472901");
	const [twoFactorRequired, setTwoFactorRequired] = useState(true);
	const [sessionTimeout, setSessionTimeout] = useState("60");

	// Notifications state
	const [emailAlerts, setEmailAlerts] = useState(true);
	const [lowStockAlerts, setLowStockAlerts] = useState(true);
	const [weeklyDigest, setWeeklyDigest] = useState(false);

	const handleSave = () => {
		setSaved(true);
		setTimeout(() => setSaved(false), 2500);
	};

	const handleCopyApiKey = () => {
		navigator.clipboard.writeText(apiKey);
		setApiKeyCopied(true);
		setTimeout(() => setApiKeyCopied(false), 2000);
	};

	return (
		<div className="flex flex-col gap-5 w-full mx-auto pb-10">
			{/* Breadcrumb */}
			<AppBreadCrumb
				title="Settings"
				description="Manage application preferences, security, appearance, and integrations."
				items={[{ label: "Settings", href: "#" }]}
				action={
					<Button
						onClick={handleSave}
						size="sm"
						className="h-9 px-4 gap-2 text-xs font-semibold rounded-lg shadow-sm"
					>
						{saved ? <Check size={14} className="text-emerald-400" /> : <Save size={14} />}
						{saved ? "Settings Saved!" : "Save Changes"}
					</Button>
				}
			/>

			{/* Main Tabs Container */}
			<Tabs defaultValue="general" className="w-full">
				<TabsList className="grid w-full grid-cols-4 max-w-md h-10 rounded-lg p-1 bg-muted/50 border border-border/50 mb-6">
					<TabsTrigger value="general" className="text-xs font-medium gap-1.5 rounded-md">
						<Sliders size={13} />
						General
					</TabsTrigger>
					<TabsTrigger value="appearance" className="text-xs font-medium gap-1.5 rounded-md">
						<Palette size={13} />
						Appearance
					</TabsTrigger>
					<TabsTrigger value="security" className="text-xs font-medium gap-1.5 rounded-md">
						<Shield size={13} />
						Security
					</TabsTrigger>
					<TabsTrigger value="notifications" className="text-xs font-medium gap-1.5 rounded-md">
						<Bell size={13} />
						Notifications
					</TabsTrigger>
				</TabsList>

				{/* ── 1. General Tab ──────────────────────────────────────────────── */}
				<TabsContent value="general" className="space-y-5">
					<Card className="ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-2">
							<CardTitle className="text-base font-semibold">General Application Settings</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pb-6 space-y-4">
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
								<div className="space-y-1.5">
									<Label htmlFor="appName" className="text-xs text-muted-foreground">Application Name</Label>
									<Input
										id="appName"
										value={appName}
										onChange={(e) => setAppName(e.target.value)}
										className="h-9 text-sm rounded-lg"
									/>
								</div>

								<div className="space-y-1.5">
									<Label htmlFor="timezone" className="text-xs text-muted-foreground">Default Timezone</Label>
									<select
										id="timezone"
										value={timezone}
										onChange={(e) => setTimezone(e.target.value)}
										className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
									>
										<option value="UTC-8 (Pacific Standard Time)">UTC-8 (Pacific Standard Time)</option>
										<option value="UTC-5 (Eastern Standard Time)">UTC-5 (Eastern Standard Time)</option>
										<option value="UTC+0 (Greenwich Mean Time)">UTC+0 (Greenwich Mean Time)</option>
										<option value="UTC+5:30 (India Standard Time)">UTC+5:30 (India Standard Time)</option>
									</select>
								</div>

								<div className="space-y-1.5">
									<Label htmlFor="currency" className="text-xs text-muted-foreground">Default Currency</Label>
									<select
										id="currency"
										value={currency}
										onChange={(e) => setCurrency(e.target.value)}
										className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
									>
										<option value="USD ($)">USD ($) - US Dollar</option>
										<option value="EUR (€)">EUR (€) - Euro</option>
										<option value="GBP (£)">GBP (£) - British Pound</option>
										<option value="INR (₹)">INR (₹) - Indian Rupee</option>
									</select>
								</div>

								<div className="space-y-1.5">
									<Label htmlFor="language" className="text-xs text-muted-foreground">Language</Label>
									<select
										id="language"
										value={language}
										onChange={(e) => setLanguage(e.target.value)}
										className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
									>
										<option value="English (US)">English (US)</option>
										<option value="Spanish">Spanish</option>
										<option value="French">French</option>
										<option value="German">German</option>
									</select>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* ── 2. Appearance Tab ────────────────────────────────────────────── */}
				<TabsContent value="appearance" className="space-y-5">
					<Card className="ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-2">
							<CardTitle className="text-base font-semibold">Theme & Layout Preferences</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pb-6 space-y-6">
							<div>
								<Label className="text-xs text-muted-foreground mb-3 block">Color Theme</Label>
								<div className="grid grid-cols-3 gap-3 max-w-lg">
									<button
										type="button"
										onClick={() => setTheme("light")}
										className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
											theme === "light"
												? "border-primary bg-primary/10 text-primary"
												: "border-border/60 hover:border-border text-muted-foreground"
										}`}
									>
										<Sun size={20} />
										Light Mode
									</button>
									<button
										type="button"
										onClick={() => setTheme("dark")}
										className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
											theme === "dark"
												? "border-primary bg-primary/10 text-primary"
												: "border-border/60 hover:border-border text-muted-foreground"
										}`}
									>
										<Moon size={20} />
										Dark Mode
									</button>
									<button
										type="button"
										onClick={() => setTheme("system")}
										className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-xs font-medium transition-all ${
											theme === "system"
												? "border-primary bg-primary/10 text-primary"
												: "border-border/60 hover:border-border text-muted-foreground"
										}`}
									>
										<Globe size={20} />
										System Default
									</button>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* ── 3. Security Tab ──────────────────────────────────────────────── */}
				<TabsContent value="security" className="space-y-5">
					<Card className="ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-2">
							<CardTitle className="text-base font-semibold">API Credentials & Security Controls</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pb-6 space-y-5">
							{/* API Key */}
							<div className="space-y-2">
								<Label className="text-xs text-muted-foreground">Production API Key</Label>
								<div className="flex items-center gap-2 max-w-xl">
									<div className="flex-1 font-mono text-xs bg-muted/30 border border-border rounded-lg px-3 py-2 text-foreground truncate">
										{apiKey}
									</div>
									<Button
										type="button"
										variant="outline"
										size="sm"
										onClick={handleCopyApiKey}
										className="h-9 text-xs gap-1.5 rounded-lg shrink-0"
									>
										{apiKeyCopied ? <Check size={13} className="text-emerald-500" /> : <Copy size={13} />}
										{apiKeyCopied ? "Copied" : "Copy Key"}
									</Button>
								</div>
							</div>

							{/* Session Timeout */}
							<div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
								<div className="space-y-1.5">
									<Label htmlFor="timeout" className="text-xs text-muted-foreground">Inactivity Session Timeout</Label>
									<select
										id="timeout"
										value={sessionTimeout}
										onChange={(e) => setSessionTimeout(e.target.value)}
										className="flex h-9 w-full rounded-lg border border-input bg-background px-3 py-1 text-sm shadow-sm"
									>
										<option value="15">15 minutes</option>
										<option value="30">30 minutes</option>
										<option value="60">60 minutes (1 hour)</option>
										<option value="120">120 minutes (2 hours)</option>
									</select>
								</div>
							</div>

							{/* Two Factor Authentication */}
							<div className="flex items-center justify-between p-3.5 rounded-lg border border-border/60 bg-muted/20">
								<div className="space-y-0.5">
									<p className="text-sm font-medium text-foreground">Enforce Two-Factor Authentication (2FA)</p>
									<p className="text-xs text-muted-foreground">Require an authenticator app code on login for all administrative accounts.</p>
								</div>
								<Button
									type="button"
									variant={twoFactorRequired ? "default" : "outline"}
									size="sm"
									onClick={() => setTwoFactorRequired(!twoFactorRequired)}
									className="h-8 text-xs font-semibold px-3 rounded-lg shrink-0"
								>
									{twoFactorRequired ? "Enforced" : "Optional"}
								</Button>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				{/* ── 4. Notifications Tab ─────────────────────────────────────────── */}
				<TabsContent value="notifications" className="space-y-5">
					<Card className="ring-1 ring-border">
						<CardHeader className="px-6 pt-5 pb-2">
							<CardTitle className="text-base font-semibold">Notification Rules</CardTitle>
						</CardHeader>
						<CardContent className="px-6 pb-6 space-y-4">
							{[
								{
									id: "emailAlerts",
									title: "Critical Email Alerts",
									desc: "Receive real-time email alerts for security breaches or system errors.",
									checked: emailAlerts,
									toggle: () => setEmailAlerts(!emailAlerts),
								},
								{
									id: "lowStockAlerts",
									title: "Low Inventory Warnings",
									desc: "Get notified when inventory items fall below minimum reorder thresholds.",
									checked: lowStockAlerts,
									toggle: () => setLowStockAlerts(!lowStockAlerts),
								},
								{
									id: "weeklyDigest",
									title: "Weekly Performance Digest",
									desc: "Receive a weekly automated email summary of sales, stock, and org metrics.",
									checked: weeklyDigest,
									toggle: () => setWeeklyDigest(!weeklyDigest),
								},
							].map((item) => (
								<div key={item.id} className="flex items-center justify-between p-3.5 rounded-lg border border-border/60 bg-muted/20">
									<div className="space-y-0.5">
										<p className="text-sm font-medium text-foreground">{item.title}</p>
										<p className="text-xs text-muted-foreground">{item.desc}</p>
									</div>
									<Button
										type="button"
										variant={item.checked ? "default" : "outline"}
										size="sm"
										onClick={item.toggle}
										className="h-8 text-xs font-semibold px-3 rounded-lg shrink-0"
									>
										{item.checked ? "Enabled" : "Disabled"}
									</Button>
								</div>
							))}
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	);
}
