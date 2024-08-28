"use client"

import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "light")
    }
}, []);

  return (
    <html suppressHydrationWarning >
      <body suppressHydrationWarning >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
