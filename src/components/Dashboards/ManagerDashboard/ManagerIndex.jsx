import { Outlet } from "react-router-dom";
import { Sidebar } from "../Common/Sidebar";
import { Topbar } from "../Common/Topbar";
import { useEffect, useState } from "react";

export default function ManagerIndex() {
  const dashboard = "manager";
  const links = [
    {
      text: "Home",
      url: "/manager-dashboard",
      for: dashboard,
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
          />
        </svg>
      ),
    },
    {
      text: "Bill  Table",
      url: "/manager-dashboard/bill-table",
      svg: (
        <svg
          className="h-7 w-7"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path stroke="none" d="M0 0h24v24H0z" />{" "}
          <path d="M3 19l15 -15l3 3l-6 6l2 2a14 14 0 0 1 -14 4" />
        </svg>
      ),
    },
    {
      text: "Complaints",
      url: "/manager-dashboard/complaints",
      svg: (
        <svg
          className="h-6 w-6"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <circle cx="12" cy="12" r="10" />{" "}
          <path d="M16 16s-1.5-2-4-2-4 2-4 2" />{" "}
          <line x1="9" y1="9" x2="9.01" y2="9" />{" "}
          <line x1="15" y1="9" x2="15.01" y2="9" />
        </svg>
      ),
    },
    {
      text: "Suggestions",
      url: "/manager-dashboard/suggestions",
      svg: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 3a6.75 6.75 0 016.75 6.75c0 2.1-.98 3.98-2.53 5.22-.9.72-1.47 1.84-1.47 3.03v.75a.75.75 0 01-.75.75h-4.5a.75.75 0 01-.75-.75v-.75c0-1.19-.57-2.31-1.47-3.03A6.727 6.727 0 015.25 9.75 6.75 6.75 0 0112 3zm-3 18h6"
          />
        </svg>
      ),
    },
  ];

  const admin = JSON.parse(localStorage.getItem("admin"));

  const [notifications, setNotifications] = useState([
    368115, 347403, 377902, 369420,
  ]);

  useEffect(() => {
    setNotifications([368115, 347403, 377902, 369420]);
  }, []);

  return (
    <div className="flex">
      <Sidebar links={links} />
      <Topbar name={admin?.name} notifications={notifications} />
      <div className="w-full bg-[#f3e8ff] h-screen">
        <Outlet />
      </div>
    </div>
  );
}
