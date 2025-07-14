import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ChatHistoryProvider } from "../context/ChatHistoryContext";
import type { ReactNode } from "react";

const queryClient = new QueryClient();

interface AppProvidersProps {
  children: ReactNode;
}

export const AppProviders = ({ children }: AppProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChatHistoryProvider>{children}</ChatHistoryProvider>
    </QueryClientProvider>
  );
};
