import "@/app/globals.css";
import { Toaster } from "react-hot-toast";
import { inter, lexendDeca } from "../fonts";
import { cn } from "rizzui";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      suppressHydrationWarning
    >
      <body
        suppressHydrationWarning
      >
        {children}

      </body>
    </html>
  );
}
