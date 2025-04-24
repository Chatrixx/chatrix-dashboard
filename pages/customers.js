import CustomerCard from "@/components/custom/customer-card";
import CustomerDetailCard from "@/components/custom/customer-detail-card";
import DatePickerWithRange from "@/components/custom/date-range-picker";
import MainLayout from "@/components/custom/layout/main-layout";
import { useState } from "react";

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

  const [selectedPatient, setSelectedPatient] = useState(null);

  const handlePatientClick = (patient) => {
    setSelectedPatient(patient);
  };

  const handleCloseDetail = () => {
    setSelectedPatient(null);
  };

  return (
    <div className="space-y-4 p-4 w-full animate-fade-in">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-6">Danışanlar</h2>
        <DatePickerWithRange />
      </div>
      <div className="flex gap-2">
        <div
          className={`transition-all duration-300 ${selectedPatient ? "basis-[50%] " : "basis-full"}`}
        >
          <div className="flex flex-col gap-2">
            {patients.map((patient, index) => (
              <CustomerCard
                onClick={() => handlePatientClick(patient)}
                key={index}
                patient={patient}
              />
            ))}
          </div>
        </div>
        <div
          className={`
            ${selectedPatient ? "basis-[50%]" : "basis-0"}
            transition-opacity duration-300 ${selectedPatient ? "opacity-100" : "opacity-0"}`}
        >
          {selectedPatient && (
            <CustomerDetailCard
              patient={selectedPatient}
              onClose={handleCloseDetail}
            />
          )}
        </div>
      </div>
    </div>
  );
}

Customers.getLayout = (children) => <MainLayout>{children}</MainLayout>;
