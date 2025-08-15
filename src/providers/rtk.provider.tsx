"use client";

import { store } from "@/lib/redux-store";
import { Provider } from "react-redux";

export const RTKProvider = ({ children }: { children: React.ReactNode }) => {
  return <Provider store={store}>{children}</Provider>;
};
