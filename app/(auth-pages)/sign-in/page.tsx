import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/FormMessage";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default async function Login({
  searchParams,
}: {
  searchParams: Message;
}) {
  const sp = await Promise.resolve(searchParams);
  const { success, error, message } = sp || {};

  return (
    <form className="flex-1 flex flex-col min-w-64">
      <h1 className="text-2xl font-medium">Login</h1>
      <p className="text-sm text-foreground">
        Nog geen account?
        <a className="text-foreground font-medium underline">
          Vraag er een aan
        </a>
      </p>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-8">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="info@geoprofs.nl" required />
        <div className="flex justify-between items-center">
          <Label htmlFor="password">Wachtwoord</Label>
          <Link
            className="text-xs text-foreground underline"
            href="/forgot-password"
          >
            Wachtwoord vergeten?
          </Link>
        </div>
        <Input
          type="password"
          name="password"
          placeholder="Jouw wachtwoord"
          required
        />
        <SubmitButton pendingText="Inloggen..." formAction={signInAction}>
          Inloggen
        </SubmitButton>
        <FormMessage message={{ success, error, message }} />
      </div>
    </form>
  );
}
