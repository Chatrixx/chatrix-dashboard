import CustomerCard from "@/components/custom/customer-card";
import MainLayout from "@/components/custom/layout/main-layout";

export default function Customers() {
  // Sample patient data
  const patients = [
    {
      name: "Sarah Johnson",
      disease: "Type 2 Diabetes",
      phoneNumber: "+1 (555) 123-4567",
      email: "sarah.j@example.com",
      socialMedia: {
        twitter: "@sarahj",
        facebook: "sarahjohnson",
        instagram: "sarah.johnson",
      },
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Michael Chen",
      disease: "Hypertension",
      phoneNumber: "+1 (555) 987-6543",
      email: "m.chen@example.com",
      socialMedia: {
        twitter: "@mchen",
        instagram: "michael.chen",
      },
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
    {
      name: "Emily Rodriguez",
      disease: "Asthma",
      phoneNumber: "+1 (555) 456-7890",
      email: "e.rodriguez@example.com",
      socialMedia: {
        facebook: "emilyrodriguez",
        instagram: "em.rodriguez",
      },
      avatarUrl: "/placeholder.svg?height=40&width=40",
    },
  ];

  return (
    <div className="space-y-4 p-4 w-full animate-fade-in">
      <div className="flex flex-col gap-2">
        {patients.map((patient, index) => (
          <CustomerCard key={index} patient={patient} />
        ))}
      </div>
    </div>
  );
}

Customers.getLayout = (children) => <MainLayout>{children}</MainLayout>;
