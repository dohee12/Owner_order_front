// /app/providers/with-store

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { queryClient } from "@/shared/api/query-client";

export const withStore = (component: () => React.ReactNode) => () => {
  return (
    <QueryClientProvider client={queryClient}>
      {component()}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
