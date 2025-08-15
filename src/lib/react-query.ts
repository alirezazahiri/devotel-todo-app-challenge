import { MutationCache, QueryCache, QueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const showToast = (error: unknown) => {
  const errorMessage = error instanceof Error ? error.message : "Unknown error";
  toast.error(`Error: ${errorMessage}`);
};

export const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: (error: unknown) => {
      console.log({ QUERY_CLIENT_ERROR: error });
      showToast(error);
    },
  }),
  mutationCache: new MutationCache({
    onError: (error: unknown) => {
      console.log({ MUTATION_CACHE_ERROR: error });
      showToast(error);
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
