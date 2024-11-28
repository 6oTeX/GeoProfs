"use server";
import { supabaseClient } from "@/lib/supabaseClient";
import axios from "axios";

export const test_action = async (formData: FormData) => {
  
  const reason = "sick";
  const explanation = "I am sick";
  const start_date = "2024-11-28";
  const end_date = "2024-11-28";

  await axios.post(`http://localhost:3000/api/leave-requests?reason=${reason}&explanation=${explanation}&start-date=${start_date}&end-date=${end_date}`).then(data => [
    console.log(data.data)
  ]).catch(error => {
    console.log(error)
  })
};
