import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/FormMessage";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function Signup({ searchParams }: { searchParams: Message }) {
  if ("message" in searchParams) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={searchParams} />
      </div>
    );
  }

  return (
    <>
      <form className="flex flex-col min-w-64 max-w-64 mx-auto">
        <h1 className="text-2xl font-medium">Registreren</h1>
        <p className="text-sm text text-foreground">
          Heeft u al een account?&nbsp;
          <Link className="text-primary font-medium underline" href="/sign-in">
            Log in
          </Link>
        </p>
        <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
          <Label htmlFor="email">Email</Label>
          <Input name="email" placeholder="info@geoprofs.nl" required />
          <Label htmlFor="password">Wachtwoord</Label>
          <Input
            type="password"
            name="password"
            placeholder="Jouw wachtwoord"
            minLength={6}
            required
          />
          <SubmitButton
            formAction={signUpAction}
            pendingText="Aan het registreren..."
          >
            Registreren
          </SubmitButton>
          <FormMessage message={searchParams} />
        </div>
      </form>
    </>
  );
}
