import Link from "next/link";
import {
  ArrowRight,
  Calendar,
  CheckCircle2,
  Clock,
  Menu,
  Smartphone,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

export default function GeoprofsLandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="container z-40 bg-background">
        <div className="flex h-20 items-center justify-between py-6">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="items-center space-x-2 md:flex">
              <span className="font-bold text-xl">Geoprofs</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-lg font-medium text-muted-foreground"
              >
                Features
              </Link>
              <Link
                href="#testimonials"
                className="flex items-center text-lg font-medium text-muted-foreground"
              >
                Testimonials
              </Link>
            </nav>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href="#features">Features</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#testimonials">Testimonials</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <nav className="hidden md:flex">
            <Button asChild>
              <Link href="/sign-in">Login</Link>
            </Button>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section
          id="features"
          className="container space-y-6 bg-slate-50 py-8 dark:bg-transparent md:py-12 lg:py-24"
        >
          <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Features
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Discover how Geoprofs can revolutionize your company&apos;s
              time-off management process.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Easy Leave Requests</CardTitle>
                <CardDescription>
                  Streamlined process for time-off requests.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Sick Day Reporting</CardTitle>
                <CardDescription>
                  Quick and easy sick day notifications.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Clock className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Team Calendar</CardTitle>
                <CardDescription>
                  Visualize your team&apos;s availability at a glance.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Users className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mobile App</CardTitle>
                <CardDescription>
                  Manage time-off on the go with our mobile application.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Smartphone className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Approval Workflows</CardTitle>
                <CardDescription>
                  Customizable approval processes for different leave types.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Reporting & Analytics</CardTitle>
                <CardDescription>
                  Gain insights into leave patterns and team availability.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ArrowRight className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
          </div>
        </section>
        <section id="testimonials" className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Testimonials
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mb-8">
              See what our customers are saying about Geoprofs.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Streamlined Our Process</CardTitle>
                <CardDescription>
                  Sarah Johnson, HR Manager at TechCorp
                </CardDescription>
              </CardHeader>
              <CardContent>
                Geoprofs has completely streamlined our leave management
                process. It&apos;s user-friendly and has saved us countless
                hours.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Improved Team Communication</CardTitle>
                <CardDescription>
                  Mark Lee, Team Lead at InnovateCo
                </CardDescription>
              </CardHeader>
              <CardContent>
                The team calendar feature has greatly improved our communication
                and planning. We always know who&apos;s available.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Perfect for Remote Teams</CardTitle>
                <CardDescription>
                  Emily Chen, CEO of RemoteWorks
                </CardDescription>
              </CardHeader>
              <CardContent>
                As a fully remote company, Geoprofs has been invaluable in
                managing our global team&apos;s time-off and availability.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Ready to simplify your leave management?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Join thousands of companies already using Geoprofs to streamline
              their time-off processes.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Enter your work email" />
              <Button type="submit">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Geoprofs. All rights reserved.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Terms
            </Link>
            <Link href="#" className="hover:underline">
              Privacy
            </Link>
            <Link href="#" className="hover:underline">
              Contact
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
