import CustomChart from "@/components/custom/chart";
import DatePickerWithRange from "@/components/custom/date-range-picker";
import RatioPieChart from "@/components/custom/pie-chart";

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export default function Home() {
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-6">Dashboard</h2>
        <DatePickerWithRange />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <CustomChart />
        </div>
        <div className="col-span-4">
          <RatioPieChart />
        </div>
      </div>
    </div>
  );
}
