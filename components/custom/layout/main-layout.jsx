import AppNavbar from "@/components/custom/navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <AppNavbar />
      <div className="w-full px-10 py-6 max-lg:px-6 max-md:px-4">
        {children}
      </div>
    </>
  );
}
