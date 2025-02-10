// components/DashboardLayout.js
"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { USER_NAV_ITEMS, ADMIN_NAV_ITEMS } from "../utils/navigation";
import { ReactNode } from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const isAdminRoute = pathname.startsWith("admin");
  const navItems = isAdminRoute ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

  useEffect(() => {
    // Sync active navigation with the current route
    setActiveNav(pathname);
  }, [pathname]);

  const handleNavClick = (path: string) => {
    setActiveNav(path);
    router.push(path);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white shadow-lg transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0`}
      >
        <div className="p-6 flex justify-between items-center lg:hidden">
          <h1 className="text-2xl font-bold text-primary">My Dashboard</h1>
          <button onClick={toggleSidebar} className="text-primary">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="p-6 hidden lg:block">
          <h1 className="text-2xl font-bold text-primary">My Dashboard</h1>
        </div>
        <nav className="mt-6">
          {navItems.map((item) => (
            <div
              key={item.id}
              className={`flex items-center p-4 cursor-pointer ${
                activeNav === item.path
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => handleNavClick(item.path)}
            >
              <span className="mr-3">{item.icon}</span>
              <span className="text-sm font-medium">{item.label}</span>
            </div>
          ))}
        </nav>
      </div>

      {/* Content Area */}
      <div className="flex-1">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <button
            onClick={toggleSidebar}
            className="text-primary lg:hidden mb-4"
          >
            <FaBars size={24} />
          </button>
          {children} {/* Render the content based on the active navigation */}
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
