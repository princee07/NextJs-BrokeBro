import NavbarWrapper from '@/components/layout/NavbarWrapper';
import Footer from '@/components/layout/Footer';
import DiscountBar from '@/components/layout/DiscountBar';
import "../app/styles/global.css";
import type { ReactNode } from "react";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <DiscountBar />
        <NavbarWrapper />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
