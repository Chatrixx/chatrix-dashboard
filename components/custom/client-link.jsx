import Link from "next/link";
import React from "react";

export default function ClientLink({ userId, children }) {
  return <Link href={`/clients/${userId}`}>{children}</Link>;
}
