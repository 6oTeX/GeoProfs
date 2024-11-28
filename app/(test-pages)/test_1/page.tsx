import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/submit-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { test_action } from "./action";

export default function test_1() {
  return (
    <div>
      <form action="test_1" method="PUT">
        <SubmitButton style={{ width: "100%" }} formAction={test_action}>
          Test leave-request
        </SubmitButton>
      </form>
    </div>
  );
}
