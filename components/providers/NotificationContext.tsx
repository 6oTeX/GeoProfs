"use client";
import { supabaseClient } from "@/lib/supabaseClient";
import { toast, ToastContainer } from "react-toastify";
import { createContext, ReactNode, useEffect } from "react";

interface Notification {
  id: string;
  type: string;
  message: string;
}

export const NotificationContext = createContext(
  {} as {
    addNotification: (notification: Notification) => void;
  },
);

const handleInserts = (payload: { new: any }) => {
  const newNotification = payload.new;
  toast(newNotification.message);

  supabaseClient
    .from("notifications")
    .insert([newNotification])
    .then(() => {
      console.log("Notification added to the database");
    });
};

export function NotificationContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const addNotification = (notification: Notification) => {
    toast(notification.message);
  };

  supabaseClient
    .channel("notifications")
    .on(
      "postgres_changes",
      { event: "INSERT", schema: "public", table: "notifications" },
      handleInserts,
    )
    .subscribe();

  return (
    <NotificationContext.Provider value={{ addNotification }}>
      <ToastContainer />
      {children}
    </NotificationContext.Provider>
  );
}
