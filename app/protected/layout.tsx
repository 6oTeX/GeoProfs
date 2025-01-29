import { ThemeSwitcher } from "@/components/theme-switcher";
import { GeistSans } from "geist/font/sans";
import { ThemeProvider } from "next-themes";
// import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { NotificationContextProvider } from "@/components/providers/NotificationContext";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ReactNode } from "react";
import Navbar from "@/components/Navbar";
import RecentApplications from "@/components/recent-applications";

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
    <main className="min-h-screen flex flex-col items-center">
      <Navbar />
      <div className="flex-1 w-full flex flex-col gap-20 pt-8 items-center">
        {children}
      </div>
    </main>
  );
}
