import { Outlet } from "react-router-dom";
import { Sidebar } from "../Common/Sidebar";
import { Topbar } from "../Common/Topbar";
import { useEffect, useState } from "react";

export default function ButlerIndex() {
  const dashboard = "Butler";
  const links = [
    {
      text: "FoodRequest",
      url: "/butler-dashboard/food-request",
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
      text: "Manage Items",
      url: "/butler-dashboard/manage-items",
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
      text: "Mess Off",
      url: "/butler-dashboard/mess",
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
      text: "Bill Table",
      url: "/butler-dashboard/bill-table",
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
    // {
    //   text: "Attendance",
    //   url: "/guard-dashboard/attendance",
    //   svg: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-6 h-6"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M9 12l2 2 4-4m2-4h.01M9 2h6a2 2 0 012 2v1a2 2 0 002 2v11a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 002-2V4a2 2 0 012-2z"
    //       />
    //     </svg>
    //   ),
    // },
    // {
    //   text: "Rooms",
    //   url: "/guard-dashboard/rooms",
    //   svg: (
    //     <svg
    //       xmlns="http://www.w3.org/2000/svg"
    //       fill="none"
    //       viewBox="0 0 24 24"
    //       strokeWidth={1.5}
    //       stroke="currentColor"
    //       className="w-6 h-6"
    //     >
    //       <path
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         d="M9 12l2 2 4-4m2-4h.01M9 2h6a2 2 0 012 2v1a2 2 0 002 2v11a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 002-2V4a2 2 0 012-2z"
    //       />
    //     </svg>
    //   ),
    // },
  ];

  const butler = JSON.parse(localStorage.getItem("Butler"));

  const [notifications, setNotifications] = useState([
    368115, 347403, 377902, 369420,
  ]);

  useEffect(() => {
    setNotifications([368115, 347403, 377902, 369420]);
  }, []);

  return (
    <div className="flex">
      <Sidebar links={links} />
      <Topbar name={butler?.name} notifications={notifications} />
      <div className="w-full bg-[#f3e8ff] h-screen">
        <Outlet />
      </div>
    </div>
  );
}
