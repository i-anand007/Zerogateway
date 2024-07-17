"use client"

import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { inter, lexendDeca } from "../fonts";
import { cn } from "rizzui";
import { useEffect } from "react";
import Cookies from "js-cookie";
import appwriteService from "../appwrite";

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
