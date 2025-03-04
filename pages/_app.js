import Navbar from "@/components/custom/navbar";
import { DashboardSidebar } from "@/components/custom/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
    </>
  );
}
