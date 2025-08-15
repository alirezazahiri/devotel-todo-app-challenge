import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      console.log({ QUERY_CLIENT_ERROR: error });
      toast.error(`Error: ${error}`);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      console.log({ MUTATION_CACHE_ERROR: error });
      toast.error(`Error: ${error}`);
    },
  }),

  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
      throwOnError: false,
      gcTime: 1000 * 60 * 60 * 24,
    },
  },
});
