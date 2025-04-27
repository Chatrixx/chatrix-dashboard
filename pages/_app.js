import "@/styles/globals.css";
import { Geist } from "next/font/google";

const GeistFont = Geist({
  display: "swap",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-geist",
});

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import { AuthProvider } from "@/context/auth";

const queryClient = new QueryClient();

export default function App({ Component, pageProps }) {
  const getLayout = Component.getLayout || ((page) => page);
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <Toaster />
        <main
          className={`${GeistFont.className} font-sans bg-[#FBFDFE] min-h-screen`}
        >
          {getLayout(<Component {...pageProps} />)}
        </main>
      </QueryClientProvider>
    </AuthProvider>
  );
}
