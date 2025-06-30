import { Inter } from "next/font/google";
import "./styles/global.css";
import NavbarWrapper from "@/components/layout/NavbarWrapper";
import Footer from "@/components/layout/Footer";
import ReferralProcessor from "@/components/auth/ReferralProcessor";

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
      <body className={inter.className}>
        <ReferralProcessor />
        <NavbarWrapper />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
