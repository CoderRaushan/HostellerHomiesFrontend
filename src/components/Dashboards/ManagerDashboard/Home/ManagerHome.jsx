

import { ShortCard } from "./ShortCard";
import { List } from "./List";
import { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { getAllStudents } from "../../../../utils";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function ManagerHome() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const manager = JSON.parse(localStorage.getItem("Manager"));


  const [noOfStudents, setNoOfStudents] = useState(0);
  const [complaints, setComplaints] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [messReqs, setMessReqs] = useState([]);
  const token = localStorage.getItem("token");

  const getStudentCount = async () => {
    const res = await getAllStudents();
    if (res.success) {
      setNoOfStudents(res.students.length);
    }
  };

  const getComplaints = async () => {
    const response = await fetch(`${mainUri}/api/complaint/hostel`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
       },
      body: JSON.stringify({ HostelNo: manager.hostelNo || "1" }),
    });

    const data = await response.json();
    if (data.success) {
      setComplaints(data.complaints);
    } else {
      toast.error("Something failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const getSuggestions = async () => {
    const response = await fetch(`${mainUri}/api/suggestion/hostel`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({ HostelNo: manager.hostelNo || "1" }),
    });

    const data = await response.json();
    if (data.success) {
      setSuggestions(
        data.suggestions.filter((suggestion) => suggestion.status === "pending")
      );
    } else {
      toast.error("Something failed", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const getRequests = async () => {
    const res = await fetch(`${mainUri}/api/messoff/list`, {
      method: "POST",
      headers: { "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
       },
      body: JSON.stringify({ HostelNo: manager.hostelNo || "1" }),
    });

    const data = await res.json();
    if (data.success) {
      data.list.map((req) => {
        req.id = req._id;
        req.from = new Date(req.leaving_date).toDateString().slice(4, 10);
        req.to = new Date(req.return_date).toDateString().slice(4, 10);
        req._id = req.student._id;
        req.student.name = req.student.name;
        req.student.room_no = req.student.room_no;
        req.status = req.status;
        req.title = `${req.student.name} [ Room: ${req.student.room_no}]`;
        req.desc = `${req.from} to ${req.to}`;
      });
      setMessReqs(data.list);
    }
  };

  function transformApiData(apiData) {
    const complaintMap = new Map();
    (apiData || []).forEach((complaint) => {
      const date = new Date(complaint.date);
      const formattedDate = date.toLocaleDateString("en-US", {
        timeZone: "UTC",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      });
      complaintMap.set(
        formattedDate,
        (complaintMap.get(formattedDate) || 0) + 1
      );
    });

    return Array.from(complaintMap.entries()).map(([date, count]) => ({
      name: date,
      DailyComplaints: count,
    }));
  }

  useEffect(() => {
    getRequests();
    getStudentCount();
    getComplaints();
    getSuggestions();
  }, []);

  const messIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#4f46e5"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
      />
    </svg>
  );

  const suggestionIcon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="#4f46e5"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  );

  const data = transformApiData(complaints);

const graph = (
  <div className="bg-gradient-to-br from-white to-gray-50 p-5 rounded-2xl shadow-lg border border-gray-100 w-full sm:w-[48%] lg:w-[32%] h-[320px] flex flex-col justify-between transition-all hover:shadow-xl hover:-translate-y-1">
    <div className="flex-1">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 20, bottom: 10, left: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#4f46e5" stopOpacity={0.9} />
              <stop offset="95%" stopColor="#4f46e5" stopOpacity={0.05} />
            </linearGradient>
          </defs>
          <XAxis dataKey="name" tick={{ fill: "#6b7280", fontSize: 12 }} />
          <YAxis tick={{ fill: "#6b7280", fontSize: 12 }} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#ffffff",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
            }}
          />
          <Legend verticalAlign="top" height={36} />
          <Area
            type="monotone"
            dataKey="DailyComplaints"
            stroke="#4f46e5"
            strokeWidth={2}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>

    <Link
      to="/manager-dashboard/complaints"
      className="py-3 text-lg text-center rounded-lg w-full text-black border-blue-600 border-2 hover:bg-blue-600 transition-all"
    >
      Manage Complaints
    </Link>
  </div>
);


  return (
    <div className="min-h-screen w-full bg-[#f3e8ff] px-4 sm:px-8 md:px-16 pt-10 pb-20 overflow-x-hidden overflow-y-auto lg:pl-64">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6 mt-10">
        <h1 className="text-black font-bold text-4xl sm:text-5xl text-center">
          Welcome{" "}
          <span className="text-[#4f46e5]">{manager?.name || "manager"}!</span>
        </h1>
        <h2 className="text-black text-xl text-center">
          Manager Hostel No , {manager?.hostelNo || "1"}
        </h2>

        {/* Cards */}
        <div className="flex flex-wrap justify-center gap-4 w-full">
          <ShortCard title="Total Students" number={noOfStudents} />
          <ShortCard title="Total Complaints" number={complaints.length} />
          <ShortCard title="Total Suggestions" number={suggestions.length} />
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row flex-wrap justify-center gap-4 w-full mt-6">
          <div className="w-full sm:w-[48%] lg:w-[32%]">
            <List list={messReqs} title="mess" icon={messIcon} />
          </div>
          {graph}
          <div className="w-full sm:w-[48%] lg:w-[32%]">
            <List
              list={suggestions}
              title="suggestions"
              icon={suggestionIcon}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerHome;
