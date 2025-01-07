"use server";
import { createClient } from "@supabase/supabase-js";

export const test_action = async (formData: FormData) => {
  console.log(formData.get("project_name"));
  console.log(formData.get("start_date"));
  console.log(formData.get("end_date"));

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );

  const { data, error } = await supabase.from("projects").insert([
    {
      name: formData.get("project_name"),
      start_date: formData.get("start_date"),
      end_date: formData.get("end_date"),
    },
  ]);

  console.log(data);
  console.log(error);
};
