import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5분
      gcTime: 10 * 60 * 1000, // 10분
    },
  },
});

export const withStore = (component: () => React.ReactNode) => () => {
  return (
    <QueryClientProvider client={queryClient}>
      {component()}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
