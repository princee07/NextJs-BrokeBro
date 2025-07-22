import { Inter } from "next/font/google";
import "./styles/global.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import ReferralProcessor from "@/components/auth/ReferralProcessor";
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";
import { SP } from "next/dist/shared/lib/utils";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "BrokeBro",
  description: "Student Discounts Platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
            <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M844TQKBMV"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M844TQKBMV');
          `}
        </Script>
      </head>
      <body className={inter.className}>
        <ReferralProcessor />
        <NavbarWrapper />
        <main>{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights/>
        {/* Development Test Controls */}
      </body>
    </html>
  );
}