import CustomInstagramIconColored from "@/assets/icons/CustomInstagramIconColored";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Instagram, Mail, Phone } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function CustomerContactInformationView({ data }) {
  return (
    <Card className="max-h-fit">
      <CardHeader>
        <CardTitle className="text-lg">İletişim Bilgileri</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        <div className="flex items-center space-x-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span className="text-sm text-primary">{data?.phone}</span>
        </div>

        {data?.channels.instagram && (
          <div className="flex items-center gap-2">
            <Instagram className="w-4 h-4 text-gray-500" />
            <Link
              target="_blank"
              href={`https://instagram.com/${data?.channels.instagram?.profile_info?.ig_username}`}
              className=" text-xs inline-flex px-3 py-1 rounded-sm bg-gradient-to-r from-orange-500/15 via-pink-500/15 to-purple-500/15  text-pink-800 font-medium"
            >
              <span>
                @{data?.channels?.instagram?.profile_info?.ig_username}
              </span>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
