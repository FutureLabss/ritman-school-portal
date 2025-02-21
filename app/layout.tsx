"use client";

// import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { FormProvider } from "@/context/FormContext";
import { QueryClient, QueryClientProvider } from "react-query";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
});

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <FormProvider>{children}</FormProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
