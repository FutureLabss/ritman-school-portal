import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
// import Image from "next/image";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Ritman School Portal",
  description: "School Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        {/* <div className="flex justify-start p-4 lg:p-10 lg:ml-20">
          <Image src="/ritmanLogo.jpg" alt="Logo" width={80} height={80} />
        </div> */}
        {children}
      </body>
    </html>
  );
}
