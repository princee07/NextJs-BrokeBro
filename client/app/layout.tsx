import Navbar from '@/components/layout/Navbar';

import '@/app/styles/global.css';

import Footer from '@/components/layout/Footer'
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Navbar />
       
        <main>{children}</main>
      <Footer/>
      </body>
    </html>
  );
}