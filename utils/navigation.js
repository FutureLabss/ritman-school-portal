// utils/navigation.js
import { IoHomeOutline } from "react-icons/io5";
import { BiDetail } from "react-icons/bi";
import { MdOutlinePayment } from "react-icons/md";
import { LuSettings } from "react-icons/lu";
import { BiSupport } from "react-icons/bi";
import { TbLogout2 } from "react-icons/tb";
export const USER_NAV_ITEMS = [
    {
      id: 1,
      label: "Dashboard",
      icon: <IoHomeOutline size={20} className="font-bold" />,
      path: "/student/dashboard",
    },
    {
      id: 2,
      label: "Details",
      icon: <BiDetail size={20} className="font-bold"  />,
      path: "/student/details",
    },
    {
        id: 3,
        label: "Payment",
        icon: <MdOutlinePayment size={20} className="font-bold" />,
        path: "/student/payment",
      },
    {
      id: 4,
      label: "Settings",
      icon: <LuSettings size={20} className="font-bold" />,
      path: "/student/settings",
    },
    {
      id: 5,
      label: "Support",
      icon: <BiSupport  size={20} className="font-bold" />,
      path: "/student/profile",
    },
    {
        id:6,
        label: "Logout",
        icon: <TbLogout2  size={20} className="font-bold" />,
        path: "/student/logout",
    }
  ];

  // utils/navigation.js
export const ADMIN_NAV_ITEMS = [
    {
      id: 1,
      label: "Student Applications",
      icon: "🏠", // Replace with actual icons or components
      path: "/admin/applications",
    },
    {
      id: 2,
      label: "Users",
      icon: "👥",
      path: "/admin/users",
    },
    {
      id: 3,
      label: "Analytics",
      icon: "📊",
      path: "/admin/analytics",
    },
    {
        id: 4,
        label: "Settings",
        icon: <LuSettings />,
        path: "/admin/settings",
      },
      {
        id: 5,
        label: "Support",
        icon: <BiSupport />,
        path: "/admin/profile",
      },
      {
          id:6,
          label: "Logout",
          icon: <TbLogout2 />,
          path: "/admin/logout",
      }
  ];