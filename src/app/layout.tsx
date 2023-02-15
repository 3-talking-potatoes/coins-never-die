"use client";
import { RecoilRoot } from "recoil";
import "./globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/galmuri@latest/dist/galmuri.css"
          />
        </head>
        <QueryClientProvider client={queryClient}>
          <body className="bg-yellow-100">{children}</body>
        </QueryClientProvider>
      </html>
    </RecoilRoot>
  );
}
