"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  Twitter,
  Facebook,
  Instagram,
  Calendar,
  MapPin,
  X,
} from "lucide-react";

export default function CustomerDetailCard({ patient, onClose }) {
  // Get initials for avatar fallback
  const initials = patient.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <Card className="h-full overflow-auto">
      <CardHeader className="relative pb-2">
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-4"
          onClick={onClose}
          aria-label="Close details"
        >
          <X className="h-4 w-4" />
        </Button>
        <CardTitle>Patient Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col items-center text-center space-y-3">
          <Avatar className="h-24 w-24 border">
            <AvatarImage src={patient.avatarUrl} alt={patient.name} />
            <AvatarFallback className="bg-primary/10 text-primary text-xl">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">{patient.name}</h2>
            <Badge
              variant="outline"
              className="mt-1 bg-primary/10 hover:bg-primary/20 text-primary"
            >
              {patient.disease}
            </Badge>
            {patient.age && (
              <p className="text-sm text-muted-foreground mt-1">
                Age: {patient.age}
              </p>
            )}
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Contact Information</h3>
          <div className="grid gap-3">
            <div className="flex items-center">
              <Phone className="h-4 w-4 mr-3 text-muted-foreground" />
              <span>{patient.phoneNumber}</span>
            </div>
            <div className="flex items-center">
              <Mail className="h-4 w-4 mr-3 text-muted-foreground" />
              <span>{patient.email}</span>
            </div>
            {patient.address && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>{patient.address}</span>
              </div>
            )}
          </div>
        </div>

        {patient.nextAppointment && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-medium">Next Appointment</h3>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-3 text-muted-foreground" />
                <span>{patient.nextAppointment}</span>
              </div>
            </div>
          </>
        )}

        {patient.medicalHistory && patient.medicalHistory.length > 0 && (
          <>
            <Separator />
            <div className="space-y-4">
              <h3 className="font-medium">Medical History</h3>
              <ul className="list-disc pl-5 space-y-1">
                {patient.medicalHistory.map((item, index) => (
                  <li key={index}>{item}</li>
                ))}
              </ul>
            </div>
          </>
        )}

        <Separator />

        <div className="space-y-4">
          <h3 className="font-medium">Social Media</h3>
          <div className="flex space-x-4">
            {patient.socialMedia.twitter && (
              <a
                href={`https://twitter.com/${patient.socialMedia.twitter.replace("@", "")}`}
                className="flex items-center text-muted-foreground hover:text-primary"
                aria-label="Twitter profile"
              >
                <Twitter className="h-5 w-5 mr-2" />
                <span>{patient.socialMedia.twitter}</span>
              </a>
            )}
            {patient.socialMedia.facebook && (
              <a
                href={`https://facebook.com/${patient.socialMedia.facebook}`}
                className="flex items-center text-muted-foreground hover:text-primary"
                aria-label="Facebook profile"
              >
                <Facebook className="h-5 w-5 mr-2" />
                <span>{patient.socialMedia.facebook}</span>
              </a>
            )}
            {patient.socialMedia.instagram && (
              <a
                href={`https://instagram.com/${patient.socialMedia.instagram}`}
                className="flex items-center text-muted-foreground hover:text-primary"
                aria-label="Instagram profile"
              >
                <Instagram className="h-5 w-5 mr-2" />
                <span>{patient.socialMedia.instagram}</span>
              </a>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
