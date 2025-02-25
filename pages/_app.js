import { DashboardSidebar } from "@/components/custom/sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <SidebarProvider>
        <DashboardSidebar />
        <div className="flex-1 container p-4">
          <Component {...pageProps} />
        </div>
      </SidebarProvider>
    </>
  );
}
