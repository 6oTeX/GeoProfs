"use client";
import Link from "next/link";
// import { Logo } from "@/components/icons/Logo";
import {
  Home,
  LineChart,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users2,
  Aperture,
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
import { useEffect, useState } from "react";
import { getProfileAction, signOutAction } from "@/app/actions";

interface profileProps {
  updated_at: Date;
  username: string;
  full_name: string;
  avatar_url: string;
}

const Navbar = () => {
  const [profileData, setProfileData] = useState<profileProps | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const profile = await getProfileAction();
      console.log(profile);
      setProfileData(profile);
    };
    fetchProfile();
  }, []);

  const logout = () => {
    signOutAction();
    console.log("Logged out successfully");
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex flex-col border-b bg-background">
      <div className="flex h-14 items-center gap-4 px-4 sm:px-6">
        <nav className="flex items-center space-x-16">
          <Link
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-lg  text-foreground"
          >
            {/* <Logo /> */}
            <span className="sr-only">Dashboard</span>
            <Aperture className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <span>Dashboard</span>
          </Link>
          <Link
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-lg  text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <span>Calender</span>
          </Link>
          <Link
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <span>Status</span>
          </Link>
          <Link
            href="#"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <span>Aanvragen</span>
          </Link>
        </nav>
        <div className="flex ml-auto space-x-4">
          <div className="relative ml-auto flex-1 md:grow-0 sm:hidden md:block">
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
                <Image
                  src={
                    profileData?.avatar_url ||
                    "https://avatars.dicebear.com/api/avataaars/john-doe.svg"
                  }
                  width={36}
                  height={36}
                  alt="Avatar"
                  className="overflow-hidden rounded-full"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                Welkom,&nbsp;{profileData?.full_name || "John Doe"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <div className="border-t px-4 py-2 sm:px-6">
        <Breadcrumb className="hidden md:flex">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Dashboard</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="#">Orders</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Recent Orders</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
    </header>
  );
};

export default Navbar;
