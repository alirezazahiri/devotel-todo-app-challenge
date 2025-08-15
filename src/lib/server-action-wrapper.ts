export type ServerActionState<T> = {
  success: boolean;
  response?: T;
  error?: string;
};

export const serverActionWrapper = async <T>(
  action: () => Promise<T>
): Promise<ServerActionState<T>> => {
  try {
    const response = await action();
    return {
      success: true,
      response,
    };
  } catch (error) {
    console.error("Server action wrapper error:", error);
    return {
      success: false,
      error: (error as Error).message,
    };
  }
};
