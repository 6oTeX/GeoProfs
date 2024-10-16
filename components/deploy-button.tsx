"use client";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { supabaseClient } from "@/lib/supabaseClient";

export default function DeployButton() {
  const handleInserts = (payload: { new: any }) => {
    const newNotification = payload.new;
    toast(newNotification.message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    supabaseClient
      .from("notifications")
      .insert([newNotification])
      .then(() => {
        console.log("Notification added to the database");
      });
  };

  return (
    <>
      <Button
        onClick={() => {
          handleInserts({ new: { message: "Test Toast" } });
        }}
        className="flex items-center gap-2"
        size={"sm"}
      >
        <svg
          className="h-3"
          viewBox="0 0 76 65"
          fill="hsl(var(--background)/1)"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M37.5274 0L75.0548 65H0L37.5274 0Z" fill="inherit" />
        </svg>
        <span>Test Toast</span>
      </Button>
    </>
  );
}
