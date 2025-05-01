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
          className="flex-1 ml-auto h-[100vh] max-h-[100vh] flex flex-col overflow-hidden"
        >
          <TopBar />
          <div className="p-4 basis-full overflow-y-scroll">{children}</div>
        </div>
      </div>
    </SidebarProvider>
  );
}
