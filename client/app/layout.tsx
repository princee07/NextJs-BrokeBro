import NavbarWrapper from '@/components/layout/NavbarWrapper';
import "../app/styles/global.css";
import type { ReactNode } from "react";
export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NavbarWrapper />
        <main>{children}</main>
      </body>
    </html>
  );
}
