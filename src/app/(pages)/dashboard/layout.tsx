import type { Metadata } from "next";
"use client"
import "@/app/globals.css";
import { useEffect, useState } from "react";
import appwriteService from "@/app/appwrite";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import LithiumLayout from "@/layouts/lithium/lithium-layout";
import GlobalDrawer from "../../shared/drawer-views/container";
import GlobalModal from "../../shared/modal-views/container";
import { inter, lexendDeca } from "../../fonts";
import { cn } from "rizzui";
import Cookies from "js-cookie";
import BerylliumLayout from "@/layouts/beryllium/beryllium-layout";


// export const metadata: Metadata = {
//   title: "App Name",
//   description: "Write your app description",
// };


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
        localStorage.setItem("theme", "light")
    }
    
    if (Cookies.get("user_name") == "" || !Cookies.get("user_name")) {
        const getUser = async () => {
            const response:any = await appwriteService.getCurrentUser()
            Cookies.set("user_loggedIn", "true")
            Cookies.set("user_name", response?.name)
            Cookies.set("user_email", response?.email)
            Cookies.set("profile_pic", response?.prefs.profile_pic)
            Cookies.set("user_labels", response?.labels)               
        }
        getUser()
    }
}, []);

if (Cookies.get("user_loggedIn")) {
    return (
        <html
            suppressHydrationWarning
        >
            <body
                suppressHydrationWarning
                className={cn(inter.variable, lexendDeca.variable, "font-inter")}
            >
                <ThemeProvider>
                    <BerylliumLayout>
                        {children}
                    </BerylliumLayout>
                    <GlobalDrawer />
                    <GlobalModal />
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    )
} else {
    return (
        <html
            suppressHydrationWarning
        >
            <body
                suppressHydrationWarning
                className={cn(inter.variable, lexendDeca.variable, "font-inter")}
            >
                        {children}
                <Toaster />
            </body>
        </html>
    )
}



}
