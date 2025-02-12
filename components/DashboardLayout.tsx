// components/DashboardLayout.js
"use client";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { USER_NAV_ITEMS, ADMIN_NAV_ITEMS } from "../utils/navigation";
import { ReactNode } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import Image from "next/image";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Sync active navigation with the current route
    setActiveNav(pathname);
  }, [pathname]);

  const isAdminRoute = pathname.startsWith("/admin");
  const navItems = isAdminRoute ? ADMIN_NAV_ITEMS : USER_NAV_ITEMS;

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
        <div className="p-6 flex justify-end items-center lg:hidden">
          {/* <h1 className="text-2xl font-bold text-primary">My Dashboard</h1> */}
          <button onClick={toggleSidebar} className="text-primary">
            <FaTimes size={24} />
          </button>
        </div>
        <div className="pt-6 hidden lg:flex items-center justify-center">
          <Image
            src={"/ritmanLogo.jpg"}
            alt="ritmman logo"
            width={100}
            height={100}
          />
        </div>
        {!isAdminRoute && (
          <section className="flex gap-2 items-center justify-center mt-10">
            <div className="border-4 border-black w-20 h-20 rounded-lg">
              <Image
                src={"/profile.jpeg"}
                alt="profile"
                height={100}
                width={100}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div>
              <p className="text-sm">Student ID</p>
              <p className="text-sm font-semibold">23456745</p>
              <p className="text-sm">Level</p>
            </div>
          </section>
        )}
        <div className="flex items-center justify-center">
          <nav className="mt-10 max-w-[50%] max-auto">
            {navItems.map((item) => (
              <div
                key={item.id}
                className={`flex items-center transition-all p-4 ${
                  item.label === "Settings" ? "mt-10" : ""
                } cursor-pointer ${
                  activeNav === item.path
                    ? "text-secondary hover:text-secondary"
                    : "text-inactive hover:text-secondary"
                }`}
                onClick={() => handleNavClick(item.path)}
              >
                <p className="mr-2 font-bold">{item.icon}</p>
                <p className="text-[0.8rem]  font-medium">{item.label}</p>
              </div>
            ))}
          </nav>
        </div>
        <div className="mt-8">
          <p className="text-center text-[0.9rem] font-bold text-black">
            2024/2025
          </p>
          <p className="text-center text-inactive">Current Session</p>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-2 lg:p-6 bg-[#E2E8F0]">
        <div className="">
          <section className="flex gap-4">
            <div className="w-[75%] hidden lg:flex">
              <div className="text-center flex-1">
                <p className="font-bold">Programme type</p>
                <p>-----</p>
              </div>
              <div className="border-l flex-1 border-black text-center">
                <p className="font-bold">Programme type</p>
                <p>-----</p>
              </div>
              <div className="border-l flex-1 border-black text-center">
                <p className="font-bold">Programme type</p>
                <p>-----</p>
              </div>
              <div className="border-l flex-1 border-black text-center">
                <p className="font-bold">Status</p>
                <p>-----</p>
              </div>
            </div>
            <div className="flex items-center justify-center space-x-2 lg:space-x-4 cursor-pointer">
              <span className="mr-4">
                <FaRegBell />
              </span>
              <span>
                <Image
                  src={"/profile.jpeg"}
                  alt="profile"
                  width={50}
                  style={{ borderRadius: "50%" }}
                  height={50}
                />
              </span>
              <span>John Big man</span>
              <span>
                <MdOutlineKeyboardArrowRight />
              </span>
            </div>
          </section>
          <button
            onClick={toggleSidebar}
            className="text-primary lg:hidden mb-4"
          >
            <FaBars size={24} />
          </button>
        </div>
        <div className="mt-20">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
