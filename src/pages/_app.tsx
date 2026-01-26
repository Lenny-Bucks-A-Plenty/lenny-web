import React from "react";
import { type AppType } from "next/app";
import { lexend, jetbrainsMono } from "@/fonts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "@/styles/globals.css";
import { TooltipProvider } from "@/components/ui/tooltip";

const MyApp: AppType = ({ Component, pageProps }) => {
  const [queryClient] = React.useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid refetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      }),
  )

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <main className={`${lexend.variable} ${jetbrainsMono.variable} font-sans`}>
          <Component {...pageProps} />
        </main>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default MyApp;
