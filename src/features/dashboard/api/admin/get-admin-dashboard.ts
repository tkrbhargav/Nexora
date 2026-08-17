import { api } from "@/lib/api-client";
import { useQuery } from "@tanstack/react-query";
import { adminDashboard } from "./keys";

async function getClientDashboard(): Promise<DashboardResponse> {
	const { data } = await api.get("/dashboard/summary");
	return data;
}
export const useGetClientDashboardData = () => {
	return useQuery({
		queryKey: [...adminDashboard.all, "client"],
		queryFn: getClientDashboard,
	});
};
