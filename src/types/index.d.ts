declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: "development" | "production" | "test";
      NEXT_PUBLIC_API_BASE: string;
      //   any other env variables
    }
  }
}

export {};
