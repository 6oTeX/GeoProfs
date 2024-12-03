// components/Navbar.tsx
import React, { useState } from "react";
import Link from "next/link";
import { Logo } from "@/components/icons/Logo";
import { Menu, X, Search, Settings } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col border-b bg-background">
      {/* Navbar Header */}
      <div className="flex h-14 items-center px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="#"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-primary-foreground"
        >
          <Logo />
          <span className="sr-only">Dashboard</span>
        </Link>
        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-6 ml-6">
          {/* Navigation Links */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
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
                href="#"
                className="flex h-9 items-center rounded-lg text-foreground transition-colors hover:text-foreground"
              >
                Calender
                <span className="sr-only">Calender</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Calender</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                Status
                <span className="sr-only">Status</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Status</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 items-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
              >
                Aanvragen
                <span className="sr-only">Aanvragen</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Aanvragen</TooltipContent>
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
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        {/* Settings Dropdown (Desktop Only) */}
        <div className="hidden md:flex items-center ml-4">
          <DropdownMenu
            open={isSettingsOpen}
            onOpenChange={setIsSettingsOpen}
          >
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="overflow-hidden rounded-full"
              >
                <Settings
                  className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                    isSettingsOpen ? "rotate-90" : ""
                  }`}
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                Logout
              </DropdownMenuItem>
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
      {/* Breadcrumb (Desktop Only) */}
      <div className="border-t px-4 py-2 sm:px-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Calender</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-50 bg-white flex flex-col transform transition-transform duration-300 ${
          isMobileMenuOpen
            ? "translate-x-0 pointer-events-auto"
            : "translate-x-full pointer-events-none"
        }`}
      >
        {/* Mobile Menu Header */}
        <div className="flex items-center justify-between px-4 py-4 border-b h-14">
          {/* Logo */}
          <Link href="#" className="flex items-center">
            <Logo />
            <span className="sr-only">Logo</span>
          </Link>
          {/* Search Input */}
          <div className="flex-1 mx-4">
            <Input
              type="search"
              placeholder="Search..."
              className="w-full rounded-lg bg-background pl-8"
            />
          </div>
          {/* Close Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            className="text-gray-700"
          >
            <X className="h-6 w-6" />
            <span className="sr-only">Close Menu</span>
          </button>
        </div>
        {/* Mobile Menu Content */}
        <div className="border-t flex-1 flex flex-col">
          <nav className="flex flex-col px-4 py-4 space-y-4 flex-1">
            <Link href="#" className="text-lg font-medium">
              Dashboard
            </Link>
            <Link href="#" className="text-lg font-medium">
              Verlof aanvragen
            </Link>
            <Link href="#" className="text-lg font-medium">
              Verlof overzicht
            </Link>
            <Link href="#" className="text-lg font-medium">
              Ziektemeldingen
            </Link>
            <hr className="my-4" />
            <Link href="#" className="text-lg font-medium">
              Teamplanning
            </Link>
            <Link href="#" className="text-lg font-medium">
              Afdelingsoverzicht
            </Link>
            <hr className="my-4" />
            <Link href="#" className="text-lg font-medium">
              Settings
            </Link>
            {/* Logout Button */}
            <div className="mt-auto flex h-full items-end mb-4">
              <Button
                variant="destructive"
                className="w-full"
                onClick={() => {
                  // Handle logout
                }}
              >
                Logout
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
