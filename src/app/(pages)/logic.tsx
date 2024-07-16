"use client"
import "@/app/globals.css";
import { useEffect } from "react";
import appwriteService from "@/app/appwrite";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "next-themes";
import LithiumLayout from "@/layouts/lithium/lithium-layout";
import GlobalDrawer from "../shared/drawer-views/container";
import GlobalModal from "../shared/modal-views/container";
import { inter, lexendDeca } from "../fonts";
import { cn } from "rizzui";
import Cookies from "js-cookie";


export default function Logic({
    children,
}: {
    children: React.ReactNode
}) {
    useEffect(() => {
        if (!localStorage.getItem("theme")) {
            localStorage.setItem("theme", "light")
        }

        if (Cookies.get("user_name") == "" || !Cookies.get("user_name")) {
            const getUser = async () => {
                const response:any = await appwriteService.getCurrentUser()
                console.log(response)
                Cookies.set("user_loggedIn", "true")
                Cookies.set("user_name", response?.name)
                Cookies.set("user_labels", response?.labels)
            }
            getUser()
        }
    }, []);

    return (
        <html
            suppressHydrationWarning
        >
            <body
                suppressHydrationWarning
                className={cn(inter.variable, lexendDeca.variable, "font-inter")}
            >
                <ThemeProvider>
                    <LithiumLayout>
                        {children}
                    </LithiumLayout>
                    <GlobalDrawer />
                    <GlobalModal />
                </ThemeProvider>
                <Toaster />
            </body>
        </html>
    )
}
