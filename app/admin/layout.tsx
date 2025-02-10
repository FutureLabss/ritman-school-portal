import DashboardLayout from "@/components/DashboardLayout";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}
export default function AdminDashboardLayout({ children }: Props) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
