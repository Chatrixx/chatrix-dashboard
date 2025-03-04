import Navbar from "@/components/custom/navbar";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  console.log("App -> pageProps", pageProps);
  return (
    <>
      <Navbar />
      <div className="w-full px-10 py-6 max-lg:px-6 max-md:px-4">
        <Component {...pageProps} />
      </div>
    </>
  );
}
