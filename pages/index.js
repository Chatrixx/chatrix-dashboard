import Image from "next/image";
import { Poppins } from "next/font/google";
import { DashboardSidebar } from "@/components/custom/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import CustomChart from "@/components/custom/chart";

import NavigationBar from "@/components/custom/navbar";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export default function Home() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
      </div>
      <CustomChart />
    </div>
  );
}
