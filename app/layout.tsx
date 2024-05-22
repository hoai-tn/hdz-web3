import type { Metadata } from "next";
import { Slackey } from "next/font/google";
import Navbar from "./components/Navbar";
import Providers from "./Providers";
import Footer from "./components/Footer";
import { Web3Modal } from "./context/web3modal";
import "./globals.css";

const inter = Slackey({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" style={{ scrollBehavior: "smooth" }}>
      <body className={inter.className} suppressHydrationWarning={true}>
        <Providers>
          <Web3Modal>
            <div>
              <Navbar />
              <div className="min-h-[18rem]">{children}</div>
            </div>
            <Footer />
          </Web3Modal>
        </Providers>
      </body>
    </html>
  );
}
