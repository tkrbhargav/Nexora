import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/core/sonner"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"


export function AppProvider({children}: {children: React.ReactNode}) {
  const queryClient = new QueryClient()
  return (
    <ThemeProvider defaultTheme="system" storageKey="nexora-theme">
      <QueryClientProvider client={queryClient}>
        {children}  
        <Toaster richColors position="top-right"/>
        <ReactQueryDevtools initialIsOpen={false}/>
      </QueryClientProvider>
    </ThemeProvider>
  )
}