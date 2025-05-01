import { SidebarProvider } from "@/components/ui/sidebar";
import TopBar from "../topbar";
import AppSidebar from "../sidebar";

export default function MainLayout({ children }) {
  return (
    <SidebarProvider defaultOpen={true}>
      <div className="flex w-full">
        <AppSidebar />
        <div
          style={{
            flexBasis: "100%",
          }}
          className="flex-1 overflow-auto ml-auto"
        >
          <TopBar />
          <div className="p-4">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
