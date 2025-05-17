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
        <div className="flex items-center">
          <Phone className="h-4 w-4 mr-2 text-gray-500" />
          <span>{data?.phone}</span>
        </div>
        {data?.channels.instagram && (
          <Link
            className="flex"
            href={`https://instagram.com/${data?.channels.instagram?.profile_info?.ig_username}`}
          >
            <div className="inline-flex items-center px-3 py-1 rounded-full text-white text-sm font-medium bg-gradient-to-r from-[#F9CE34] via-[#EE2A7B] to-[#6228D7] opacity-90">
              <Instagram className="h-4 w-4 mr-2" />@
              {data?.channels?.instagram?.profile_info?.ig_username}
            </div>
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
