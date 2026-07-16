import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider } from "react-router";
import { AppProvider } from "./provider";
import { router } from "./rotuer";

const queryClient = new QueryClient();

export default function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<AppProvider>
				<RouterProvider router={router} />
			</AppProvider>
		</QueryClientProvider>
	);
}
