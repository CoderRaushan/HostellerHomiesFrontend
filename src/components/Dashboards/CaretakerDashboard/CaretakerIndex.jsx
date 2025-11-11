import { Outlet } from "react-router-dom";
import { Sidebar } from "../Common/Sidebar";
import { Topbar } from "../Common/Topbar";
import { useEffect, useState } from "react";

export default function CaretakerIndex() {
  const dashboard = "Caretaker";
  const links = [
    {
      text: "Home",
      url: "/caretaker-dashboard",
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
      text: "Register Student",
      url: "/caretaker-dashboard/register-student",
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
            d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z"
          />
        </svg>
      ),
    },
    {
      text: "All Students",
      url: "/caretaker-dashboard/all-students",
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
            d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z"
          />
        </svg>
      ),
    },
    {
      text: "Rooms",
      url: "/caretaker-dashboard/rooms",
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
            d="M2.25 18.75V9.75a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25v9m-19.5 0h19.5m-15-9V6a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0110.5 6v3.75m-3 0h6"
          />
        </svg>
      ),
    },
    {
      text: "Guard Selector",
      url: "/caretaker-dashboard/security-guard-selector",
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
            d="M2.25 18.75V9.75a2.25 2.25 0 012.25-2.25h15a2.25 2.25 0 012.25 2.25v9m-19.5 0h19.5m-15-9V6a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0110.5 6v3.75m-3 0h6"
          />
        </svg>
      ),
    },
  ];

  const caretaker = JSON.parse(localStorage.getItem("Caretaker"));

  const [notifications, setNotifications] = useState([
    368115, 347403, 377902, 369420,
  ]);

  useEffect(() => {
    setNotifications([368115, 347403, 377902, 369420]);
  }, []);

  return (
    <div className="flex">
      <Sidebar links={links} />
      <Topbar name={caretaker?.name} notifications={notifications} />
      <div className="w-full bg-[#f3e8ff] h-screen">
        <Outlet />
      </div>
    </div>
  );
}
