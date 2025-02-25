import React from "react";
import { Card, CardContent } from "../ui/card";

export default function UserCard({ user, className }) {
  return (
    <Card className={className}>
      <CardContent>
        <h3>{user.name}</h3>
        <p>{user.email}</p>
      </CardContent>
    </Card>
  );
}
