"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Aperture, Menu, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { getProfileAction, signOutAction } from "@/app/actions";

interface ProfileProps {
  updated_at: Date;
  username: string;
  full_name: string;
  avatar_url: string;
}

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileData, setProfileData] = useState<ProfileProps | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await getProfileAction();
        console.log(profile);
        setProfileData(profile);
      } catch (error) {
        console.error("Error fetching profile data:", error);
      }
    };
    fetchProfile();
  }, []);

  const logout = () => {
    signOutAction().then(() => {
      console.log("Logged out successfully");
    });
  };

  const avatarUrl = useMemo(() => {
    return (
      profileData?.avatar_url ||
      encodeURI("https://api.dicebear.com/9.x/miniavs/png?seed=1")
    );
  }, [profileData]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col border-b bg-background">
      {/* Navbar Header */}
      <div className="flex h-14 items-center px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/dashboard"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-foreground"
        >
          <Aperture className="h-5 w-5 text-foreground" />
          <span className="sr-only">Dashboard</span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 ml-6">
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className="flex h-9 items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                Dashboard
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Dashboard</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/calendar"
                className="flex h-9 items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                Kalender
                <span className="sr-only">Kalender</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Kalender</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/create-leave-request"
                className="flex h-9 items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                Vraag verlof aan
                <span className="sr-only">Vraag verlof aan</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Vraag verlof aan</TooltipContent>
          </Tooltip>
          {/* Add more navigation items as needed */}
        </nav>

        {/* Spacer */}
        <div className="flex-1"></div>

        {/* Search Input (Desktop Only) */}
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Zoeken..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>

        {/* Profile Dropdown */}
        <div className="hidden md:flex items-center ml-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <img
                  src={avatarUrl}
                  alt="Avatar"
                  className="h-8 w-8 rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                Welkom, {profileData?.full_name || "John Doe"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Instellingen</DropdownMenuItem>
              <DropdownMenuItem>Hulp</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Uitloggen</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <Menu
            className={`h-6 w-6 transition-transform duration-200 ${
              isMobileMenuOpen ? "rotate-90" : ""
            }`}
          />
          <span className="sr-only">
            {isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Navbar;
