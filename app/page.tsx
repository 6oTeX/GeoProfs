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
                Functies
              </Link>
              <Link
                href="#testimonials"
                className="flex items-center text-lg font-medium text-muted-foreground"
              >
                Getuigenissen
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
                <Link href="#features">Functies</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="#testimonials">Getuigenissen</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <nav className="hidden md:flex">
            <Button asChild>
              <Link href="/sign-in">Inloggen</Link>
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
              Functies
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Ontdek hoe Geoprofs uw bedrijf kan revolutioneren op het gebied van verlofbeheer.
            </p>
          </div>
          <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Eenvoudige verlofaanvragen</CardTitle>
                <CardDescription>
                  Gestroomlijnd proces voor verlofaanvragen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Calendar className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Ziekmeldingen</CardTitle>
                <CardDescription>
                  Snelle en eenvoudige ziekmeldingen.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Clock className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Teamkalender</CardTitle>
                <CardDescription>
                  Bekijk in één oogopslag de beschikbaarheid van uw team.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Users className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Mobiele app</CardTitle>
                <CardDescription>
                  Beheer uw verlof overal met onze mobiele app.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Smartphone className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Goedkeuringsworkflows</CardTitle>
                <CardDescription>
                  Aanpasbare goedkeuringsprocessen voor verschillende verloftypes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Rapportage en analyses</CardTitle>
                <CardDescription>
                  Krijg inzichten in verlofpatronen en teambeschikbaarheid.
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
              Getuigenissen
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7 mb-8">
              Lees wat onze klanten over Geoprofs zeggen.
            </p>
          </div>
          <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Gestroomlijnd proces</CardTitle>
                <CardDescription>
                  Sarah Johnson, HR Manager bij TechCorp
                </CardDescription>
              </CardHeader>
              <CardContent>
                Geoprofs heeft ons verlofbeheer volledig gestroomlijnd. Het is gebruiksvriendelijk en heeft ons talloze uren bespaard.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Verbeterde teamcommunicatie</CardTitle>
                <CardDescription>
                  Mark Lee, teamleider bij InnovateCo
                </CardDescription>
              </CardHeader>
              <CardContent>
                De teamkalenderfunctie heeft onze communicatie en planning enorm verbeterd. We weten altijd wie er beschikbaar is.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Perfect voor remote teams</CardTitle>
                <CardDescription>
                  Emily Chen, CEO van RemoteWorks
                </CardDescription>
              </CardHeader>
              <CardContent>
                Als volledig remote bedrijf is Geoprofs van onschatbare waarde geweest bij het beheren van de beschikbaarheid en het verlof van ons wereldwijde team.
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="container py-8 md:py-12 lg:py-24">
          <div className="mx-auto flex max-w-[58rem] flex-col items-center justify-center gap-4 text-center">
            <h2 className="font-heading text-3xl leading-[1.1] sm:text-3xl md:text-6xl">
              Klaar om uw verlofbeheer te vereenvoudigen?
            </h2>
            <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
              Sluit u aan bij duizenden bedrijven die Geoprofs al gebruiken om hun verlofprocessen te stroomlijnen.
            </p>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input type="email" placeholder="Voer uw zakelijke e-mailadres in" />
              <Button type="submit">
                Begin nu
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="py-6 md:px-8 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 Geoprofs. Alle rechten voorbehouden.
          </p>
          <nav className="flex gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:underline">
              Voorwaarden
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
