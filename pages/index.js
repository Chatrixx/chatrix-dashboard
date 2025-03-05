import CustomChart from "@/components/custom/chart";
import DatePickerWithRange from "@/components/custom/date-range-picker";

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export default function Home() {
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <DatePickerWithRange />
      </div>
      <div className="flex gap-4">
        <CustomChart />
        <CustomChart />
      </div>
    </div>
  );
}
