import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/context/auth";
import { LogOut, Mail, User } from "lucide-react";
import React from "react";

export default function ProfileSettingsView() {
  const user = useAuth().user;
  const { logout } = useAuth();

  return (
    <Card className="w-full max-w-xl p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg grid grid-cols-[auto_1fr] gap-x-6 gap-y-4 items-start">
      <img
        src={user?.logo}
        alt="Profile Photo"
        className="w-24 h-24 rounded-full border-4 border-gray-200 dark:border-gray-700 shadow-md row-span-3"
      />

      <div className="flex items-center space-x-3">
        <User className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        <p className="text-xl font-semibold text-gray-900 dark:text-white">
          {user?.name}
        </p>
      </div>

      <div className="flex items-center space-x-3">
        <Mail className="w-6 h-6 text-gray-500 dark:text-gray-400" />
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {user?.email}
        </p>
      </div>

      <div>
        <Button onClick={logout} variant="outline" className="mt-2" size="sm">
          <LogOut className="mr-2 h-4 w-4" />
          Çıkış Yap
        </Button>
      </div>
    </Card>
  );
}
