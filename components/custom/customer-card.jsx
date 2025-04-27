import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Twitter, Facebook, Instagram } from "lucide-react";
import CustomerLink from "./customer-link";

export default function PatientCard({ patient, isSelected }) {
  // Get initials for avatar fallback
  const initials = patient.name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    // TODO: Replace patient with customer later
    <CustomerLink userId={patient?.id ?? "123456789"}>
      <Card
        className={`w-full hover:shadow-md transition-shadow cursor-pointer ${isSelected ? "border-primary" : ""}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={patient.avatarUrl} alt={patient.name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              <div>
                <h3 className="font-medium text-base">{patient.name}</h3>
                <Badge
                  variant="outline"
                  className="mt-1 bg-primary/10 hover:bg-primary/20 text-primary"
                >
                  {patient.disease}
                </Badge>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                <div className="flex items-center">
                  <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>{patient.phoneNumber}</span>
                </div>
                <div className="flex items-center">
                  <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                  <span>{patient.email}</span>
                </div>
              </div>

              <div className="flex space-x-2 pt-1">
                {patient.socialMedia.twitter && (
                  <span
                    className="text-muted-foreground"
                    aria-label="Twitter profile"
                  >
                    <Twitter className="h-4 w-4" />
                  </span>
                )}
                {patient.socialMedia.facebook && (
                  <span
                    className="text-muted-foreground"
                    aria-label="Facebook profile"
                  >
                    <Facebook className="h-4 w-4" />
                  </span>
                )}
                {patient.socialMedia.instagram && (
                  <span
                    className="text-muted-foreground"
                    aria-label="Instagram profile"
                  >
                    <Instagram className="h-4 w-4" />
                  </span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </CustomerLink>
  );
}
