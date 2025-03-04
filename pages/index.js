import CustomChart from "@/components/custom/chart";

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

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
