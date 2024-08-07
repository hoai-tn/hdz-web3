import type { Metadata } from "next";
import { Slackey } from "next/font/google";
import Navbar from "./components/Navbar";
import ThemeProviders from "./Providers";
import Footer from "./components/Footer";
import { Web3Modal } from "./context/web3modal";
import "./globals.css";
import StoreProvider from "./StoreProvider";
import { LoadingProvider } from "./context/LoadingContent";
import Loader from "@/app/components/Loader";

const inter = Slackey({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Cat Cool Kit",
  description: "Cat Cool Kit beside you",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <StoreProvider>
          <ThemeProviders>
            <Web3Modal>
              <LoadingProvider>
                <div>
                  <Navbar />
                  <div className="min-h-[18rem]">{children}</div>
                </div>
                <Footer />
              </LoadingProvider>
            </Web3Modal>
          </ThemeProviders>
        </StoreProvider>
      </body>
    </html>
  );
}
