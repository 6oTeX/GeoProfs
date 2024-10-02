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
        <Input type="text" name="project_name"/>
        <Input type="date" name="start_date"/>
        <Input type="date" name="end_date"/>
        <SubmitButton style={{width: "100%"}} formAction={test_action}>Create Project</SubmitButton>
      </form>
    </div>
  );
}
