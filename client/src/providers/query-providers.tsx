import { QueryClientProvider } from "@tanstack/react-query";
import type React from "react";
import { queryClient } from "../api/qeury-client";

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};
