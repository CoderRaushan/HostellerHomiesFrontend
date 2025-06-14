import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Complaints() {
  const mainUri = import.meta.env.VITE_MAIN_URI;

  const [unsolvedComplaints, setComplaints] = useState([]);
  const [resolvedComplaints, setResolvedComplaints] = useState([]);
  const [allComplaints, setAllComplaints] = useState([]);
  const [graphLabels, setGraphLabels] = useState([]);
  const [graphCounts, setGraphCounts] = useState([]);

  const getComplaints = async () => {
    const hostels = JSON.parse(localStorage.getItem("admin"));
    const response = await fetch(`${mainUri}/api/complaint/hostel`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostel: hostels.hostel }),
    });

    const data = await response.json();
    if (data.success) {
      const complaints = data.complaints.map((complaint) => {
        const date = new Date(complaint.date).toLocaleDateString("en-US", {
          day: "numeric",
          month: "short",
          year: "numeric",
        });
        return {
          id: complaint._id,
          type: complaint.type,
          title: complaint.title,
          desc: complaint.description,
          student: complaint.student.name,
          room: complaint.student.room_no,
          status: complaint.status,
          date,
        };
      });

      setAllComplaints(complaints);

      const resolved = complaints.filter((c) => c.status.toLowerCase() !== "pending");
      setResolvedComplaints(resolved);
      setComplaints(complaints.filter((c) => c.status.toLowerCase() === "pending"));
    }
  };

  const dismissComplaint = async (id) => {
    const response = await fetch(`${mainUri}/api/complaint/resolve/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Complaint Dismissed", { autoClose: 2000 });
      const updated = allComplaints.filter((c) => c.id !== id);
      const resolved = allComplaints.find((c) => c.id === id);
      setAllComplaints(updated);
      setComplaints(updated.filter((c) => c.status.toLowerCase() === "pending"));
      setResolvedComplaints([...resolvedComplaints, resolved]);
    } else {
      toast.error("Something went wrong", { autoClose: 2000 });
    }
  };

  useEffect(() => {
    getComplaints();
  }, []);

  useEffect(() => {
    const countByDate = {};
    allComplaints.forEach((c) => {
      countByDate[c.date] = (countByDate[c.date] || 0) + 1;
    });

    const sortedDates = Object.keys(countByDate).sort(
      (a, b) => new Date(a) - new Date(b)
    );

    setGraphLabels(sortedDates);
    setGraphCounts(sortedDates.map((date) => countByDate[date]));
  }, [allComplaints]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-10 items-center justify-start pt-32 px-4 bg-[#f3e8ff]">
      <h1 className="text-[#4f46e5] font-bold text-4xl md:text-5xl text-center">Complaints</h1>

      <div className="flex flex-col md:flex-row gap-8 w-full max-w-6xl justify-center items-stretch">
        {/* Chart Section */}
        <div className="bg-white p-5 rounded-xl shadow-xl flex-1 w-full max-w-md">
          <h2 className="text-[#4f46e5] font-semibold text-lg mb-2">Complaints Trend</h2>
          <div className="h-64 w-full">
            <Line
              data={{
                labels: graphLabels,
                datasets: [
                  {
                    label: "No. of Complaints",
                    pointHoverBackgroundColor: "#4f46e5",
                    borderColor: "#4f46e5",
                    backgroundColor: "rgba(79, 70, 229, 0.1)",
                    fill: true,
                    tension: 0.4,
                    data: graphCounts,
                  },
                ],
              }}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                  x: { ticks: { maxRotation: 45, minRotation: 30 } },
                  y: { beginAtZero: true, precision: 0 },
                },
              }}
            />
          </div>
        </div>

        {/* Complaints List */}
        <div className="bg-white p-5 rounded-xl shadow-xl flex-1 w-full max-w-md overflow-y-auto">
          <span className="text-[#4f46e5] font-bold text-lg">New Complaints</span>
          <ul role="list" className="divide-y divide-[#4f46e5] text-black mt-3 max-h-64 overflow-y-auto">
            {unsolvedComplaints.length === 0 ? (
              <li className="text-gray-500 py-4">No new complaints!</li>
            ) : (
              unsolvedComplaints.map((complaint) => (
                <li
                  key={complaint.id}
                  className="py-3 px-3 rounded hover:bg-gray-100 transition-all"
                >
                  <div className="flex items-center space-x-4">
                    <div className="text-[#4f46e5]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                        />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{complaint.title}</p>
                      <p className="text-sm truncate text-gray-500">{complaint.desc}</p>
                    </div>
                    <button
                      className="text-green-600 hover:underline text-sm"
                      onClick={() => dismissComplaint(complaint.id)}
                    >
                      Solved
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover={false}
        theme="dark"
      />
    </div>
  );
}

export default Complaints;
