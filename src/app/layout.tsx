"use client";
import { RecoilRoot } from "recoil";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RecoilRoot>
      <html lang="en">
        <head />
        <body>{children}</body>
      </html>
    </RecoilRoot>
  );
}
