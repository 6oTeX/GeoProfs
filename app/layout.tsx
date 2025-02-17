import { NotificationContextProvider } from "@/components/providers/NotificationContext";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import { TooltipProvider } from "@/components/ui/tooltip";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import { ReactNode } from "react";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "GeoProfs",
  description: "A simple app to manage your vacations & holidays",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={GeistSans.className} suppressHydrationWarning>
      <body className="bg-background text-foreground">
        <NotificationContextProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <TooltipProvider>
              <main className="min-h-screen  flex flex-col items-center">
                <div className="flex-1 w-full flex flex-col gap-20 items-center">
                  {children}
                  <ThemeSwitcher />
                </div>
              </main>
            </TooltipProvider>
          </ThemeProvider>
        </NotificationContextProvider>
      </body>
    </html>
  );
}
