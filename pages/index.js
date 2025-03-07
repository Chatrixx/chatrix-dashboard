import CustomChart from "@/components/custom/chart";
import DatePickerWithRange from "@/components/custom/date-range-picker";
import ChatsLineChart from "@/components/custom/area-chart";
import RatioPieChart from "@/components/custom/pie-chart";
import { useState } from "react";

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
// });

export default function Home() {
  const [numOfDays, setNumOfDays] = useState(17);
  const data = Array.from({ length: numOfDays }, (_, i) => ({
    day: `Day ${i.toString() + 1}`,
    chats: Math.floor(100 + Math.random() * 100),
    phoneNumbers: Math.floor(Math.random() * 100),
  }));
  return (
    <div>
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold mb-6"></h2>
        <DatePickerWithRange onDateChange={setNumOfDays} />
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-8">
          <CustomChart data={data} />
        </div>
        <div className="col-span-4 h-full">
          <RatioPieChart />
        </div>
        <div className="col-span-8">
          <ChatsLineChart data={data} />
        </div>
      </div>
    </div>
  );
}
