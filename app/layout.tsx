import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NotificationContextProvider } from "@/components/providers/NotificationContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";

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
              <Navbar />
              <main className="min-h-screen  flex flex-col items-center">
                <div className="flex-1 w-full flex flex-col gap-20 items-center">
                  {children}

                  <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
                    <p>
                      Powered by{" "}
                      <a
                        href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
                        target="_blank"
                        className="font-bold hover:underline"
                        rel="noreferrer"
                      >
                        Supabase
                      </a>
                    </p>
                    <ThemeSwitcher />
                  </footer>
                </div>
              </main>
            </TooltipProvider>
          </ThemeProvider>
        </NotificationContextProvider>
      </body>
    </html>
  );
}
