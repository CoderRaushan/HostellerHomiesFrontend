import { useState, useRef, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

function MessOff() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const getRequests = async () => {
    setProgress(30);
    const hostels = JSON.parse(localStorage.getItem("admin"));
    const res = await fetch(`${mainUri}/api/messoff/list`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostels.hostel }),
    });
    setProgress(40);
    const data = await res.json();
    setProgress(60);
    if (data.success) {
      data.list.map((req) => {
        req.id = req._id;
        req.from = new Date(req.leaving_date).toDateString().slice(4, 10);
        req.to = new Date(req.return_date).toDateString().slice(4, 10);
        req._id = req.student._id;
        req.student.name = req.student.name;
        req.student.room_no = req.student.room_no;
        req.status = req.status;
        setProgress(progress + 10);
      });
      setProgress(80);
      setNewReqs(data.list);
      setApprovedReqs(data.approved);
      setRejectedReqs(data.rejected);
      graphData.current = [approvedReqs, rejectedReqs, newReqs.length];
    }
    setProgress(100);
  };

  const updateRequest = async (id, status) => {
    const res = await fetch(`${mainUri}/api/messoff/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, status }),
    });
    const data = await res.json();
    if (data.success) {
      let student = newReqs.find((req) => req.id === id).student;
      toast.success(`Request from ${student.name} has been ${status}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    } else {
      toast.error("Something went wrong", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const [progress, setProgress] = useState(0);
  const [newReqs, setNewReqs] = useState([]);
  const [approvedReqs, setApprovedReqs] = useState(0);
  const [rejectedReqs, setRejectedReqs] = useState(0);
  const graphData = useRef([approvedReqs, rejectedReqs, newReqs.length]);

  const approve = (id) => {
    setNewReqs((newReqs) => newReqs.filter((req) => req.id !== id));
    updateRequest(id, "approved");
  };

  const reject = (id) => {
    setNewReqs((newReqs) => newReqs.filter((req) => req.id !== id));
    updateRequest(id, "rejected");
  };

  const graph = (
    <div className="bg-white p-4 rounded-xl shadow-lg">
      <Bar
        data={{
          labels: ["Accepted", "Rejected", "Pending"],
          datasets: [
            {
              label: "Requests",
              data: graphData.current,
              backgroundColor: [
                "rgba(79, 70, 229, 0.8)", // Indigo for accepted
                "rgba(220, 38, 38, 0.8)", // Red for rejected
                "rgba(245, 158, 11, 0.8)", // Amber for pending
              ],
              borderColor: ["#4f46e5", "#dc2626", "#f59e0b"],
              borderWidth: 1,
              borderRadius: 8,
              barThickness: 60,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: {
              position: "top",
              labels: {
                font: {
                  weight: "bold",
                },
                color: "#000",
              },
            },
            title: {
              display: true,
              text: "Mess-Off Request Status",
              color: "#000",
              font: {
                size: 16,
                weight: "bold",
              },
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "#000",
                precision: 0,
              },
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
            x: {
              ticks: {
                color: "#000",
              },
              grid: {
                color: "rgba(0, 0, 0, 0.1)",
              },
            },
          },
        }}
      />
    </div>
  );

  useEffect(() => {
    getRequests();
  }, [newReqs.length, approvedReqs, rejectedReqs]);

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 items-center justify-center pt-16 pb-10 bg-[#f3e8ff]">
      <LoadingBar
        color="#4f46e5"
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
      <h1 className="text-black font-bold text-4xl md:text-5xl mb-2">
        Mess-Off Management
      </h1>

      <div className="w-full max-w-xl px-4">{graph}</div>

      <div className="bg-white px-6 py-5 rounded-xl shadow-lg w-full max-w-xl mx-4 max-h-96 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-black font-bold text-xl">Pending Requests</span>
          <span className="bg-[#4f46e5] text-white px-3 py-1 rounded-full text-sm font-medium">
            {newReqs.length} pending
          </span>
        </div>

        <ul role="list" className="divide-y divide-gray-200 text-black">
          {newReqs.length === 0 ? (
            <li className="py-4 text-center text-gray-500 italic">
              No pending requests
            </li>
          ) : (
            newReqs.map((req) => (
              <li
                className="py-3 px-4 my-2 rounded-lg border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all"
                key={req.id}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0 text-[#4f46e5]">
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
                        d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black">
                      {req.student.name}
                    </p>
                    <div className="flex items-center mt-1">
                      <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                        Room: {req.student.room_no}
                      </span>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-xs text-gray-500">
                        <span className="font-medium">From:</span> {req.from}{" "}
                        <span className="font-medium">To:</span> {req.to}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="group relative p-1 rounded-full bg-green-50 hover:bg-green-100 transition-colors"
                      onClick={() => approve(req.id)}
                      title="Approve"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 text-green-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        Approve
                      </span>
                    </button>
                    <button
                      className="group relative p-1 rounded-full bg-red-50 hover:bg-red-100 transition-colors"
                      onClick={() => reject(req.id)}
                      title="Reject"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={2}
                        stroke="currentColor"
                        className="w-6 h-6 text-red-600"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <span className="absolute hidden group-hover:block bg-black text-white text-xs px-2 py-1 rounded -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
                        Reject
                      </span>
                    </button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="w-full max-w-xl mx-4 mt-2 flex justify-between">
        <div className="bg-white px-4 py-3 rounded-xl shadow-md w-48 text-center">
          <p className="text-sm text-gray-500">Approved</p>
          <p className="text-2xl font-bold text-[#4f46e5]">{approvedReqs}</p>
        </div>
        <div className="bg-white px-4 py-3 rounded-xl shadow-md w-48 text-center">
          <p className="text-sm text-gray-500">Rejected</p>
          <p className="text-2xl font-bold text-red-600">{rejectedReqs}</p>
        </div>
        <div className="bg-white px-4 py-3 rounded-xl shadow-md w-48 text-center">
          <p className="text-sm text-gray-500">Pending</p>
          <p className="text-2xl font-bold text-amber-500">{newReqs.length}</p>
        </div>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick={true}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={true}
        pauseOnHover={false}
        theme="light"
      />
    </div>
  );
}

export default MessOff;
