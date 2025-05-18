import CustomInstagramIconColored from "@/assets/icons/CustomInstagramIconColored";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CustomerContactInformationView({ data }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">İletişim Bilgileri</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        <div className="flex items-center space-x-2">
          <span className="inline-flex items-center justify-center w-5 h-5">
            <Phone className="w-4 h-4 text-gray-500" />
          </span>
          <span className="text-sm text-gray-800 dark:text-gray-200">
            {data?.phone}
          </span>
        </div>

        {data?.channels.instagram && (
          <Link
            href={`https://instagram.com/${data?.channels.instagram?.profile_info?.ig_username}`}
            className="inline-flex items-center space-x-2 -ml-2 px-3 py-1 rounded-full bg-purple-400 text-white text-sm font-medium w-fit"
          >
            <Instagram className="w-4 h-4" />
            <span>@{data?.channels?.instagram?.profile_info?.ig_username}</span>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
