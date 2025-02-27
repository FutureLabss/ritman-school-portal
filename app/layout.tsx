"use client";

// import type { Metadata } from "next";
// import { Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import { FormProvider } from "@/context/FormContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "@/context/UserContext";

// const poppins = Poppins({
//   variable: "--font-poppins",
//   subsets: ["latin"],
//   weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
// });

const queryClient = new QueryClient();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <UserProvider>
              <FormProvider>{children}</FormProvider>
            </UserProvider>
          </AuthProvider>
        </QueryClientProvider>
      </body>
    </html>
  );
}
