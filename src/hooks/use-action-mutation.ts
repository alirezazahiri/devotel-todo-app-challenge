import { useActionState, useEffect, useTransition } from "react";
import { ServerActionState } from "@/lib/server-action-wrapper";

export type UseActionMutationProps<T> = {
  initialState?: ServerActionState<T> | null;
  onSuccess?: (state: ServerActionState<T>) => void;
  onError?: (state: ServerActionState<T>, error: string) => void;
};

type UseActionMutationReturn<T> = {
  mutate: (payload: FormData) => void;
  isPending: boolean;
  data: ServerActionState<T> | null;
};

type Action<T> = (
  data: ServerActionState<T> | null,
  formData: FormData
) => ServerActionState<T> | Promise<ServerActionState<T> | null> | null;

export const useActionMutation = <T>(
  action: Action<T>,
  { initialState, onSuccess, onError }: UseActionMutationProps<T>
): UseActionMutationReturn<T> => {
  const [formState, serverAction] = useActionState(
    action,
    initialState || null
  );
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (isPending) return;

    if (formState && !formState.success && formState.error) {
      onError?.(formState, formState.error);
    } else if (formState && formState.success && formState.response) {
      onSuccess?.(formState);
    }
  }, [isPending, formState]);

  const mutate = (payload: FormData) => {
    startTransition(async () => {
      serverAction(payload);
    });
  };

  return {
    mutate,
    isPending,
    data: formState,
  };
};
