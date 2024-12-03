// Generate a new component with the name Navbar

import React from "react";
import Link from "next/link";
import { Logo } from "@/components/icons/Logo";
import {
  Home,
  LineChart,
  Package,
  Package2,
  Search,
  Settings,
  ShoppingCart,
  Users2,
} from "lucide-react";
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
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Navbar = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col border-b bg-background">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
        <nav className="flex items-center space-x-6">
          <Link
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground"
          >
            <Logo />
            <span className="sr-only">Dashboard</span>
          </Link>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-fit items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-fit"
              >
                {/* <Home className="h-5 w-5" /> */}
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
                className="flex h-9 w-fit items-center justify-center rounded-lg text-accent-foreground transition-colors hover:text-foreground md:h-8 md:w-fit"
              >
                {/* <ShoppingCart className="h-5 w-5" /> */}
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
                className="flex h-9 w-fit items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-fit"
              >
                {/* <Package className="h-5 w-5" /> */}
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
                className="flex h-9 w-fit items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-fit"
              >
                {/* <Users2 className="h-5 w-5" /> */}
                Aanvragen
                <span className="sr-only">Aanvragen</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Aanvragen</TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="#"
                className="flex h-9 w-fit items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-fit"
              >
                {/* <LineChart className="h-5 w-5" /> */}
                Admin Dashboard
                <span className="sr-only">Admin Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="bottom">Admin Dashboard</TooltipContent>
          </Tooltip>
        </nav>
        <div className="relative ml-auto flex-1 md:grow-0">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search..."
            className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="overflow-hidden rounded-full"
            >
              <Settings className="h-5 w-5 text-muted-foreground" />
              {/* <Image
                src="/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
              /> */}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            {/* <DropdownMenuItem>Admin Dashboard</DropdownMenuItem> */}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-red-600">Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
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
            {/* <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recent Orders</BreadcrumbPage>
            </BreadcrumbItem> */}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Navbar;
