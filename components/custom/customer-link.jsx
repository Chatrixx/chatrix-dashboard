import Link from "next/link";
import React from "react";

export default function CustomerLink({ userId, children }) {
  return <Link href={`/customers/${userId}`}>{children}</Link>;
}
