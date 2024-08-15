"use client"
import "@/app/globals.css";
import { Toaster } from "react-hot-toast";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <>
      <html suppressHydrationWarning >
        <body suppressHydrationWarning >
          {children}
          <Toaster />
        </body>
      </html>
    </>
  );
}
