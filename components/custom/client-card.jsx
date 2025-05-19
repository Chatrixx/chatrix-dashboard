import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Phone, Mail, Twitter, Facebook, Instagram } from "lucide-react";
import ClientLink from "./client-link";

export default function ClientCard({ client, isSelected }) {
  // Get initials for avatar fallback
  const initials = client?.full_name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .toUpperCase()
    .substring(0, 2);

  return (
    <ClientLink userId={client?._id ?? "123456789"}>
      <Card
        className={`hover:bg-secondary duration-100 animate-fade-in w-full hover:shadow-sm transition-all cursor-pointer ${isSelected ? "border-primary" : ""}`}
      >
        <CardContent className="p-4">
          <div className="flex items-start space-x-4">
            <Avatar className="h-12 w-12 border">
              <AvatarImage src={client?.profile_pic} alt={client.full_name} />
              <AvatarFallback className="bg-primary/10 text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-1">
              <div>
                <h3 className="medium tracking-[-0.025em]">
                  {client.full_name}
                </h3>
              </div>

              <div className="text-sm text-muted-foreground space-y-1">
                {client.phone && (
                  <div className="flex items-center">
                    <Phone className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span>{client.phone}</span>
                  </div>
                )}
                {client.email && (
                  <div hidden={true} className="flex items-center">
                    <Mail className="h-3.5 w-3.5 mr-2 text-muted-foreground" />
                    <span>{client.email}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </ClientLink>
  );
}
