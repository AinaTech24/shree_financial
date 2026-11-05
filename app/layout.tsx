import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CookieBanner from "@/components/CookieBanner";
import WhatsAppFab from "@/components/WhatsAppFab";

const roboto = Roboto({
  weight: ["300", "400", "500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-roboto",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: { default: "Shah Financial Services | AMFI Registered Mutual Fund Distributor", template: "%s | Shah Financial Services" },
  description:
    "Shah Financial Services is an AMFI registered Mutual Fund Distribution company founded in 2007 in Khambhat, Gujarat. Goal-based mutual fund investing, PMS, retirement, education and more.",
  icons: { icon: "/img/misc/favicon.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={roboto.variable}>
      <body className={roboto.className}>
        <Header />
        <main>{children}</main>
        <Footer />
        <WhatsAppFab />
        <CookieBanner />
      </body>
    </html>
  );
}
