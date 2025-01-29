"use client";
import React, { useState } from "react";
import { UsersTable } from "@/components/UsersTable";
import AccountCreationForm from "@/components/AccountCreationForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState("users");

  return (
    <div className="p-6 w-min-full">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-4">
        <TabsList className="flex flex-row space-x-4  w-[1000px] mx-auto">
          <TabsTrigger className="flex w-6/12" value="users">
            Users
          </TabsTrigger>
          <TabsTrigger className="flex w-6/12" value="create">
            Create Account
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="bg-background shadow-md border rounded-lg p-4">
        {activeTab === "users" && <UsersTable users={[]} />}
        {activeTab === "create" && (
          <AccountCreationForm
            onCreateAccount={function (data: {
              firstName: string;
              lastName: string;
              email: string;
              password: string;
              role: string;
              team: string;
            }): void {
              throw new Error("Function not implemented.");
            }}
          />
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
