import type { Metadata } from "next";
import "@/app/globals.css";
import Logic from "./logic";

// export const metadata: Metadata = {
//   title: "App Name",
//   description: "Write your app description",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html>
      <body>
            <Logic children={children} />
      </body>
    </html>
  );

}
