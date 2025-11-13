

// // // import { useState, useRef, useEffect } from "react";
// // // import { Bar } from "react-chartjs-2";
// // // import { ToastContainer, toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";
// // // import LoadingBar from "react-top-loading-bar";

// // // // ====================== HISTORY COMPONENT (MOVED OUTSIDE) ======================
// // // const History = ({ history, searchTerm, setSearchTerm }) => {
// // //   const filteredHistory = history.filter((h) => {
// // //     if (!h || !h.student) return false;

// // //     const search = searchTerm.trim().toLowerCase();
// // //     if (!search) return true;

// // //     const { name = "", accountNumber = "", room_no = "" } = h.student;
// // //     const from = new Date(h.leaving_date)
// // //       .toLocaleDateString()
// // //       .toLowerCase();
// // //     const to = new Date(h.return_date).toLocaleDateString().toLowerCase();
// // //     const status = h.status?.toLowerCase() || "";

// // //     return (
// // //       name.toLowerCase().includes(search) ||
// // //       accountNumber.toString().toLowerCase().includes(search) ||
// // //       room_no.toString().toLowerCase().includes(search) ||
// // //       from.includes(search) ||
// // //       to.includes(search) ||
// // //       status.includes(search)
// // //     );
// // //   });

// // //   return (
// // //     <div className="bg-white px-4 sm:px-5 py-5 rounded-xl shadow-lg w-full max-w-4xl overflow-auto mt-6">
// // //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
// // //         <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
// // //           <span className="text-black font-bold text-xl">
// // //             Last 1-Month Mess-Off History
// // //           </span>
// // //           <input
// // //             type="text"
// // //             placeholder="Search by any field..."
// // //             value={searchTerm}
// // //             onChange={(e) => setSearchTerm(e.target.value)}
// // //             className="mt-2 sm:mt-0 border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:ring-2 focus:ring-[#4f46e5] focus:outline-none text-gray-700"
// // //           />
// // //         </div>
// // //         <span className="bg-[#4f46e5] text-white px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto">
// // //           Records:{filteredHistory.length}
// // //         </span>
// // //       </div>

// // //       {filteredHistory.length === 0 ? (
// // //         <p className="text-gray-500 italic text-center py-3">
// // //           No matching records found.
// // //         </p>
// // //       ) : (
// // //         <table className="min-w-full divide-y divide-gray-200">
// // //           <thead className="bg-gray-100">
// // //             <tr>
// // //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">
// // //                 Student Name
// // //               </th>
// // //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">
// // //                 Account Number
// // //               </th>
// // //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">
// // //                 Room No
// // //               </th>
// // //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">
// // //                 From
// // //               </th>
// // //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">
// // //                 To
// // //               </th>
// // //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">
// // //                 Status
// // //               </th>
// // //             </tr>
// // //           </thead>
// // //           <tbody className="bg-white divide-y divide-gray-100 text-gray-800">
// // //             {filteredHistory.map((h) => (
// // //               <tr key={h._id}>
// // //                 <td className="px-3 py-2">{h.student?.name || "N/A"}</td>
// // //                 <td className="px-3 py-2">{h.student?.accountNumber || "N/A"}</td>
// // //                 <td className="px-3 py-2">{h.student?.room_no || "N/A"}</td>
// // //                 <td className="px-3 py-2">
// // //                   {new Date(h.leaving_date).toLocaleDateString()}
// // //                 </td>
// // //                 <td className="px-3 py-2">
// // //                   {new Date(h.return_date).toLocaleDateString()}
// // //                 </td>
// // //                 <td
// // //                   className={`px-3 py-2 font-medium ${
// // //                     h.status === "approved"
// // //                       ? "text-green-600"
// // //                       : h.status === "rejected"
// // //                       ? "text-red-600"
// // //                       : "text-yellow-600"
// // //                   }`}
// // //                 >
// // //                   {h.status}
// // //                 </td>
// // //               </tr>
// // //             ))}
// // //           </tbody>
// // //         </table>
// // //       )}
// // //     </div>
// // //   );
// // // };

// // // // ====================== MAIN MESSOFF COMPONENT ======================
// // // function ButlerMessoff() {
// // //   const mainUri = import.meta.env.VITE_MAIN_URI;

// // //   const [progress, setProgress] = useState(0);
// // //   const [newReqs, setNewReqs] = useState([]);
// // //   const [approvedReqs, setApprovedReqs] = useState(0);
// // //   const [rejectedReqs, setRejectedReqs] = useState(0);
// // //   const [history, setHistory] = useState([]); 
// // //   const [searchTerm, setSearchTerm] = useState(""); 
// // //   const graphData = useRef([approvedReqs, rejectedReqs, newReqs.length]);
// // //   const token = localStorage.getItem("token");
// // //   const butler = JSON.parse(localStorage.getItem("Butler"));
// // //   // ====================== FETCH PENDING REQUESTS ======================
// // //   const getRequests = async () => {
// // //     try {
// // //       setProgress(30);
// // //       console.log("calling get requests");
// // //       console.log(`${mainUri}/api/messoff/list`)
// // //       const res = await fetch(`${mainUri}/api/messoff/list`, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           "Authorization": `Bearer ${token}`,
// // //         },
// // //         body: JSON.stringify({ HostelNo: butler.hostelNo }),
// // //       });
// // //       setProgress(50);
// // //       const data = await res.json();
// // //       console.log(data)
// // //       if (data.success) {
// // //         data.list.forEach((req) => {
// // //           req.id = req._id;
// // //           req.from = new Date(req.leaving_date).toDateString().slice(4, 10);
// // //           req.to = new Date(req.return_date).toDateString().slice(4, 10);
// // //           req._id = req.student._id;
// // //         });
// // //         setNewReqs(data.list);
// // //         setApprovedReqs(data.approved);
// // //         setRejectedReqs(data.rejected);
// // //         graphData.current = [data.approved, data.rejected, data.list.length];
// // //       }
// // //       setProgress(100);
// // //     } catch (err) {
// // //       console.error(err);
// // //       toast.error("Failed to fetch pending requests");
// // //     }
// // //   };

// // //   // ====================== FETCH HISTORY ======================
// // //   const getMessHistory = async () => {
// // //     try {
// // //       setProgress(30);
// // //       const res = await fetch(`${mainUri}/api/messoff/admin/history`, {
// // //         method: "POST",
// // //         headers: { "Content-Type": "application/json",
// // //           "Authorization": `Bearer ${token}`,
// // //         },
// // //       });
// // //       setProgress(60);
// // //       const data = await res.json();
// // //       if (data.success) {
// // //         setHistory(data.history || []);
// // //       } else {
// // //         toast.error("Failed to fetch mess-off history");
// // //       }
// // //       setProgress(100);
// // //     } catch (err) {
// // //       console.error(err);
// // //       toast.error("Error fetching mess-off history");
// // //     }
// // //   };

// // //   // ====================== APPROVE/REJECT ======================
// // //   const updateRequest = async (id, status) => {
// // //     const res = await fetch(`${mainUri}/api/messoff/update`, {
// // //       method: "POST",
// // //       headers: { "Content-Type": "application/json",
// // //         "Authorization": `Bearer ${token}`,
// // //        },
// // //       body: JSON.stringify({ id, status }),
// // //     });
// // //     const data = await res.json();
// // //     if (data.success) {
// // //       const student = newReqs.find((req) => req.id === id)?.student;
// // //       toast.success(
// // //         `Request from ${student?.name || "student"} has been ${status}`,
// // //         {
// // //           position: "top-right",
// // //           autoClose: 3000,
// // //           hideProgressBar: false,
// // //           closeOnClick: true,
// // //           draggable: true,
// // //         }
// // //       );
// // //     } else {
// // //       toast.error("Something went wrong");
// // //     }
// // //   };

// // //   const approve = (id) => {
// // //     setNewReqs((prev) => prev.filter((req) => req.id !== id));
// // //     updateRequest(id, "approved");
// // //   };

// // //   const reject = (id) => {
// // //     setNewReqs((prev) => prev.filter((req) => req.id !== id));
// // //     updateRequest(id, "rejected");
// // //   };

// // //   // ====================== LIFECYCLE ======================
// // //   useEffect(() => {
// // //     getRequests();
// // //     getMessHistory();
// // //   }, []);

// // //   // ====================== GRAPH ======================
// // //   const graph = (
// // //     <div className="bg-white p-4 rounded-xl shadow-lg">
// // //       <Bar
// // //         data={{
// // //           labels: ["Accepted", "Rejected", "Pending"],
// // //           datasets: [
// // //             {
// // //               label: "Requests",
// // //               data: graphData.current,
// // //               backgroundColor: [
// // //                 "rgba(79, 70, 229, 0.8)",
// // //                 "rgba(220, 38, 38, 0.8)",
// // //                 "rgba(245, 158, 11, 0.8)",
// // //               ],
// // //               borderColor: ["#4f46e5", "#dc2626", "#f59e0b"],
// // //               borderWidth: 1,
// // //               borderRadius: 8,
// // //               barThickness: 60,
// // //             },
// // //           ],
// // //         }}
// // //         options={{
// // //           responsive: true,
// // //           plugins: {
// // //             legend: {
// // //               position: "top",
// // //               labels: { font: { weight: "bold" }, color: "#000" },
// // //             },
// // //             title: {
// // //               display: true,
// // //               text: "Mess-Off Request Status",
// // //               color: "#000",
// // //               font: { size: 16, weight: "bold" },
// // //             },
// // //           },
// // //           scales: {
// // //             y: {
// // //               beginAtZero: true,
// // //               ticks: { color: "#000", precision: 0 },
// // //               grid: { color: "rgba(0, 0, 0, 0.1)" },
// // //             },
// // //             x: {
// // //               ticks: { color: "#000" },
// // //               grid: { color: "rgba(0, 0, 0, 0.1)" },
// // //             },
// // //           },
// // //         }}
// // //       />
// // //     </div>
// // //   );

// // //   // ====================== MAIN RETURN ======================
// // //   return (
// // //     <div className="w-full min-h-screen flex flex-col gap-6 items-center justify-start pt-24 pb-10 px-4 bg-[#f3e8ff] lg:pl-64">
// // //       <LoadingBar
// // //         color="#4f46e5"
// // //         progress={progress}
// // //         onLoaderFinished={() => setProgress(0)}
// // //       />

// // //       <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl mb-2 text-center">
// // //         Mess-Off Management
// // //       </h1>

// // //       <div className="w-full max-w-4xl">{graph}</div>

// // //       {/* Pending Requests */}
// // //       <div className="bg-white px-4 sm:px-6 py-5 rounded-xl shadow-lg w-full max-w-xl max-h-[26rem] sm:max-h-96 overflow-auto">
// // //         <div className="flex items-center justify-between mb-4">
// // //           <span className="text-black font-bold text-xl">Pending Requests</span>
// // //           <span className="bg-[#4f46e5] text-white px-3 py-1 rounded-full text-sm font-medium">
// // //             {newReqs.length} pending
// // //           </span>
// // //         </div>

// // //         <ul role="list" className="divide-y divide-gray-200 text-black">
// // //           {newReqs.length === 0 ? (
// // //             <li className="py-4 text-center text-gray-500 italic">
// // //               No pending requests
// // //             </li>
// // //           ) : (
// // //             newReqs.map((req) => (
// // //               <li
// // //                 className="py-3 px-4 my-2 rounded-lg border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all"
// // //                 key={req.id}
// // //               >
// // //                 <div className="flex items-center space-x-4">
// // //                   <div className="flex-1 min-w-0">
// // //                     <p className="text-sm font-medium text-black">
// // //                       <strong>{req.student.name}</strong>
// // //                     </p>
// // //                     <div className="flex items-center mt-1 flex-wrap gap-2 text-xs text-gray-500">
// // //                       <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
// // //                         <strong>Ac: {req.student.accountNumber}</strong> {" | "}
// // //                         <strong>Room: {req.student.room_no}</strong> {" | "}
// // //                         <strong>URN: {req.student.urn}</strong>
// // //                       </span>
// // //                       <span className="font-medium">From:</span> {req.from}
// // //                       <span className="font-medium">To:</span> {req.to}
// // //                     </div>
// // //                   </div>
// // //                   <div className="flex gap-2">
// // //                     <button
// // //                       className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm"
// // //                       onClick={() => approve(req.id)}
// // //                     >
// // //                       Approve
// // //                     </button>
// // //                     <button
// // //                       className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm"
// // //                       onClick={() => reject(req.id)}
// // //                     >
// // //                       Reject
// // //                     </button>
// // //                   </div>
// // //                 </div>
// // //               </li>
// // //             ))
// // //           )}
// // //         </ul>
// // //       </div>

// // //       {/* Stats */}
// // //       <div className="w-full max-w-xl mx-4 mt-2 flex flex-col sm:flex-row gap-4 sm:justify-between">
// // //         <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center">
// // //           <p className="text-sm text-gray-500">Approved</p>
// // //           <p className="text-2xl font-bold text-[#4f46e5]">{approvedReqs}</p>
// // //         </div>
// // //         <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center">
// // //           <p className="text-sm text-gray-500">Rejected</p>
// // //           <p className="text-2xl font-bold text-red-600">{rejectedReqs}</p>
// // //         </div>
// // //         <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center">
// // //           <p className="text-sm text-gray-500">Pending</p>
// // //           <p className="text-2xl font-bold text-amber-500">{newReqs.length}</p>
// // //         </div>
// // //       </div>

// // //       {/* History Section */}
// // //       <History history={history} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

// // //       <ToastContainer />
// // //     </div>
// // //   );
// // // }

// // // export default ButlerMessoff;
// // import { useState, useRef, useEffect } from "react";
// // import { Bar } from "react-chartjs-2";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";
// // import LoadingBar from "react-top-loading-bar";

// // // ====================== HISTORY COMPONENT (MOVED OUTSIDE) ======================
// // const History = ({ history, searchTerm, setSearchTerm }) => {
// //   const filteredHistory = history.filter((h) => {
// //     if (!h || !h.student) return false;

// //     const search = searchTerm.trim().toLowerCase();
// //     if (!search) return true;

// //     const { name = "", accountNumber = "", room_no = "" } = h.student || {};
// //     const from = h.leaving_date ? new Date(h.leaving_date).toLocaleDateString().toLowerCase() : "";
// //     const to = h.return_date ? new Date(h.return_date).toLocaleDateString().toLowerCase() : "";
// //     const status = (h.status || "").toLowerCase();

// //     return (
// //       name.toLowerCase().includes(search) ||
// //       (accountNumber || "").toString().toLowerCase().includes(search) ||
// //       (room_no || "").toString().toLowerCase().includes(search) ||
// //       from.includes(search) ||
// //       to.includes(search) ||
// //       status.includes(search)
// //     );
// //   });

// //   return (
// //     <div className="bg-white px-4 sm:px-5 py-5 rounded-xl shadow-lg w-full max-w-4xl overflow-auto mt-6">
// //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
// //         <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
// //           <span className="text-black font-bold text-xl">Last 1-Month Mess-Off History</span>
// //           <input
// //             type="text"
// //             placeholder="Search by any field..."
// //             value={searchTerm}
// //             onChange={(e) => setSearchTerm(e.target.value)}
// //             className="mt-2 sm:mt-0 border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:ring-2 focus:ring-[#4f46e5] focus:outline-none text-gray-700"
// //           />
// //         </div>
// //         <span className="bg-[#4f46e5] text-white px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto">
// //           Records: {filteredHistory.length}
// //         </span>
// //       </div>

// //       {filteredHistory.length === 0 ? (
// //         <p className="text-gray-500 italic text-center py-3">No matching records found.</p>
// //       ) : (
// //         <table className="min-w-full divide-y divide-gray-200">
// //           <thead className="bg-gray-100">
// //             <tr>
// //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Student Name</th>
// //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Account Number</th>
// //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Room No</th>
// //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">From</th>
// //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">To</th>
// //               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
// //             </tr>
// //           </thead>
// //           <tbody className="bg-white divide-y divide-gray-100 text-gray-800">
// //             {filteredHistory.map((h) => (
// //               <tr key={h._id}>
// //                 <td className="px-3 py-2">{h.student?.name || "N/A"}</td>
// //                 <td className="px-3 py-2">{h.student?.accountNumber || "N/A"}</td>
// //                 <td className="px-3 py-2">{h.student?.room_no || "N/A"}</td>
// //                 <td className="px-3 py-2">{h.leaving_date ? new Date(h.leaving_date).toLocaleDateString() : "—"}</td>
// //                 <td className="px-3 py-2">{h.return_date ? new Date(h.return_date).toLocaleDateString() : "—"}</td>
// //                 <td
// //                   className={`px-3 py-2 font-medium ${
// //                     h.status === "approved" ? "text-green-600" : h.status === "rejected" ? "text-red-600" : "text-yellow-600"
// //                   }`}
// //                 >
// //                   {h.status || "—"}
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       )}
// //     </div>
// //   );
// // };

// // // ====================== MAIN MESSOFF COMPONENT ======================
// // function ButlerMessoff() {
// //   const mainUri = import.meta.env.VITE_MAIN_URI;

// //   const [progress, setProgress] = useState(0);
// //   const [newReqs, setNewReqs] = useState([]);
// //   const [approvedReqs, setApprovedReqs] = useState(0);
// //   const [rejectedReqs, setRejectedReqs] = useState(0);
// //   const [history, setHistory] = useState([]);
// //   const [searchTerm, setSearchTerm] = useState("");
// //   const [graphData, setGraphData] = useState([0, 0, 0]);
// //   const [monthFilter, setMonthFilter] = useState(""); // optional month filter for admin history (YYYY-MM)
// //   const token = localStorage.getItem("token");
// //   const butler = JSON.parse(localStorage.getItem("Butler") || "{}");

// //   // ====================== FETCH PENDING REQUESTS ======================
// //   const getRequests = async () => {
// //     try {
// //       setProgress(20);
// //       const res = await fetch(`${mainUri}/api/messoff/list`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({ HostelNo: butler.hostelNo }),
// //       });
// //       setProgress(50);
// //       const data = await res.json();
// //       if (data && data.success) {
// //         // Do NOT overwrite _id. Keep MessOff docs as-is.
// //         const prepared = (data.list || []).map((req) => {
// //           return {
// //             ...req,
// //             // keep original id for backend call
// //             messOffId: req._id,
// //             studentId: req.student?._id,
// //             from: req.leaving_date ? new Date(req.leaving_date).toDateString().slice(4, 10) : "—",
// //             to: req.return_date ? new Date(req.return_date).toDateString().slice(4, 10) : "—",
// //           };
// //         });
// //         setNewReqs(prepared);
// //         setApprovedReqs(data.approved || 0);
// //         setRejectedReqs(data.rejected || 0);
// //         setGraphData([data.approved || 0, data.rejected || 0, prepared.length]);
// //       } else {
// //         toast.error("Failed to fetch pending requests");
// //       }
// //       setProgress(100);
// //     } catch (err) {
// //       console.error("getRequests error:", err);
// //       toast.error("Failed to fetch pending requests");
// //       setProgress(100);
// //     }
// //   };

// //   // ====================== FETCH HISTORY (ADMIN) ======================
// //   const getMessHistory = async (month = "") => {
// //     try {
// //       setProgress(20);
// //       const res = await fetch(`${mainUri}/api/messoff/admin/history`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify(month ? { month } : {}),
// //       });
// //       setProgress(60);
// //       const data = await res.json();
// //       if (data && data.success) {
// //         setHistory(data.history || []);
// //       } else {
// //         toast.error("Failed to fetch mess-off history");
// //       }
// //       setProgress(100);
// //     } catch (err) {
// //       console.error("getMessHistory error:", err);
// //       toast.error("Error fetching mess-off history");
// //       setProgress(100);
// //     }
// //   };

// //   // ====================== APPROVE/REJECT ======================
// //   const updateRequest = async (messOffId, status) => {
// //     try {
// //       setProgress(10);
// //       const res = await fetch(`${mainUri}/api/messoff/update`, {
// //         method: "POST",
// //         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
// //         body: JSON.stringify({ id: messOffId, status }),
// //       });
// //       setProgress(50);
// //       const data = await res.json();
// //       if (data && data.success) {
// //         // success toast & refresh lists
// //         // To show student name in toast, try to find request from current state
// //         const req = newReqs.find((r) => r.messOffId === messOffId);
// //         const studName = req?.student?.name || "student";
// //         toast.success(`Request from ${studName} has been ${status}`, {
// //           position: "top-right",
// //           autoClose: 3000,
// //         });

// //         // optimistic UI changes: remove the request and refresh counts/history
// //         setNewReqs((prev) => prev.filter((r) => r.messOffId !== messOffId));

// //         // refresh counts and history
// //         await getRequests();
// //         await getMessHistory(monthFilter);
// //       } else {
// //         toast.error(data?.message || "Something went wrong");
// //       }
// //     } catch (err) {
// //       console.error("updateRequest error:", err);
// //       toast.error("Something went wrong while updating request");
// //     } finally {
// //       setProgress(100);
// //     }
// //   };

// //   const approve = (messOffId) => updateRequest(messOffId, "approved");
// //   const reject = (messOffId) => updateRequest(messOffId, "rejected");

// //   // ====================== LIFECYCLE ======================
// //   useEffect(() => {
// //     getRequests();
// //     getMessHistory(monthFilter);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, [monthFilter]);

// //   // ====================== GRAPH ======================
// //   const graph = (
// //     <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-4xl">
// //       <Bar
// //         data={{
// //           labels: ["Accepted", "Rejected", "Pending"],
// //           datasets: [
// //             {
// //               label: "Requests",
// //               data: graphData,
// //               backgroundColor: ["rgba(79, 70, 229, 0.8)", "rgba(220, 38, 38, 0.8)", "rgba(245, 158, 11, 0.8)"],
// //               borderColor: ["#4f46e5", "#dc2626", "#f59e0b"],
// //               borderWidth: 1,
// //               borderRadius: 8,
// //               barThickness: 60,
// //             },
// //           ],
// //         }}
// //         options={{
// //           responsive: true,
// //           plugins: {
// //             legend: { position: "top", labels: { font: { weight: "bold" }, color: "#000" } },
// //             title: { display: true, text: "Mess-Off Request Status", color: "#000", font: { size: 16, weight: "bold" } },
// //           },
// //           scales: {
// //             y: { beginAtZero: true, ticks: { color: "#000", precision: 0 }, grid: { color: "rgba(0, 0, 0, 0.1)" } },
// //             x: { ticks: { color: "#000" }, grid: { color: "rgba(0, 0, 0, 0.1)" } },
// //           },
// //         }}
// //       />
// //     </div>
// //   );

// //   // months dropdown for admin history (last 6 months)
// //   const monthsList = (() => {
// //     const arr = [];
// //     const now = new Date();
// //     for (let i = 0; i < 6; i++) {
// //       const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
// //       const y = d.getFullYear();
// //       const m = String(d.getMonth() + 1).padStart(2, "0");
// //       arr.push({ label: d.toLocaleString("default", { month: "long", year: "numeric" }), value: `${y}-${m}` });
// //     }
// //     return arr;
// //   })();

// //   // ====================== MAIN RETURN ======================
// //   return (
// //     <div className="w-full min-h-screen flex flex-col gap-6 items-center justify-start pt-24 pb-10 px-4 bg-[#f3e8ff] lg:pl-64">
// //       <LoadingBar color="#4f46e5" progress={progress} onLoaderFinished={() => setProgress(0)} />

// //       <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl mb-2 text-center">Mess-Off Management</h1>

// //       <div className="w-full max-w-4xl">{graph}</div>

// //       {/* Pending Requests */}
// //       <div className="bg-white px-4 sm:px-6 py-5 rounded-xl shadow-lg w-full max-w-xl max-h-[26rem] sm:max-h-96 overflow-auto">
// //         <div className="flex items-center justify-between mb-4">
// //           <span className="text-black font-bold text-xl">Pending Requests</span>
// //           <span className="bg-[#4f46e5] text-white px-3 py-1 rounded-full text-sm font-medium">{newReqs.length} pending</span>
// //         </div>

// //         <ul role="list" className="divide-y divide-gray-200 text-black">
// //           {newReqs.length === 0 ? (
// //             <li className="py-4 text-center text-gray-500 italic">No pending requests</li>
// //           ) : (
// //             newReqs.map((req) => (
// //               <li className="py-3 px-4 my-2 rounded-lg border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all" key={req.messOffId}>
// //                 <div className="flex items-center space-x-4">
// //                   <div className="flex-1 min-w-0">
// //                     <p className="text-sm font-medium text-black">
// //                       <strong>{req.student?.name || "N/A"}</strong>
// //                     </p>
// //                     <div className="flex items-center mt-1 flex-wrap gap-2 text-xs text-gray-500">
// //                       <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
// //                         <strong>Ac: {req.student?.accountNumber || "N/A"}</strong> {" | "}
// //                         <strong>Room: {req.student?.room_no || "N/A"}</strong> {" | "}
// //                         <strong>URN: {req.student?.urn || "N/A"}</strong>
// //                       </span>
// //                       <span className="font-medium">From:</span> {req.from}
// //                       <span className="font-medium">To:</span> {req.to}
// //                     </div>
// //                   </div>
// //                   <div className="flex gap-2">
// //                     <button
// //                       className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm"
// //                       onClick={() => approve(req.messOffId)}
// //                     >
// //                       Approve
// //                     </button>
// //                     <button
// //                       className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm"
// //                       onClick={() => reject(req.messOffId)}
// //                     >
// //                       Reject
// //                     </button>
// //                   </div>
// //                 </div>
// //               </li>
// //             ))
// //           )}
// //         </ul>
// //       </div>

// //       {/* Stats */}
// //       <div className="w-full max-w-xl mx-4 mt-2 flex flex-col sm:flex-row gap-4 sm:justify-between">
// //         <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center">
// //           <p className="text-sm text-gray-500">Approved</p>
// //           <p className="text-2xl font-bold text-[#4f46e5]">{approvedReqs}</p>
// //         </div>
// //         <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center">
// //           <p className="text-sm text-gray-500">Rejected</p>
// //           <p className="text-2xl font-bold text-red-600">{rejectedReqs}</p>
// //         </div>
// //         <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center">
// //           <p className="text-sm text-gray-500">Pending</p>
// //           <p className="text-2xl font-bold text-amber-500">{newReqs.length}</p>
// //         </div>
// //       </div>

// //       {/* Admin history filter */}
// //       <div className="w-full max-w-4xl flex justify-end gap-3">
// //         <select
// //           value={monthFilter}
// //           onChange={(e) => setMonthFilter(e.target.value)}
// //           className="border px-3 py-2 rounded"
// //         >
// //           <option value="">Last 1 month (default)</option>
// //           {monthsList.map((m) => (
// //             <option key={m.value} value={m.value}>
// //               {m.label}
// //             </option>
// //           ))}
// //         </select>
// //         <button
// //           className="bg-[#4f46e5] text-white px-3 py-2 rounded"
// //           onClick={() => {
// //             getMessHistory(monthFilter);
// //             getRequests();
// //           }}
// //         >
// //           Refresh
// //         </button>
// //       </div>

// //       {/* History Section */}
// //       <History history={history} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

// //       <ToastContainer />
// //     </div>
// //   );
// // }

// // export default ButlerMessoff;
// // frontend: ButlerMessoff.jsx
// import { useState, useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import LoadingBar from "react-top-loading-bar";

// const History = ({ history, searchTerm, setSearchTerm }) => {
//   const filteredHistory = history.filter((h) => {
//     if (!h || !h.student) return false;
//     const search = searchTerm.trim().toLowerCase();
//     if (!search) return true;
//     const { name = "", accountNumber = "", room_no = "" } = h.student || {};
//     const from = h.leaving_date ? new Date(h.leaving_date).toLocaleDateString().toLowerCase() : "";
//     const to = h.return_date ? new Date(h.return_date).toLocaleDateString().toLowerCase() : "";
//     const status = (h.status || "").toLowerCase();
//     return (
//       name.toLowerCase().includes(search) ||
//       (accountNumber || "").toString().toLowerCase().includes(search) ||
//       (room_no || "").toString().toLowerCase().includes(search) ||
//       from.includes(search) ||
//       to.includes(search) ||
//       status.includes(search)
//     );
//   });

//   return (
//     <div className="bg-white px-4 sm:px-5 py-5 rounded-xl shadow-lg w-full max-w-4xl overflow-auto mt-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
//         <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
//           <span className="text-black font-bold text-xl">Last 1-Month Mess-Off History</span>
//           <input
//             type="text"
//             placeholder="Search by any field..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//             className="mt-2 sm:mt-0 border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:ring-2 focus:ring-[#4f46e5] focus:outline-none text-gray-700"
//           />
//         </div>
//         <span className="bg-[#4f46e5] text-white px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto">
//           Records: {filteredHistory.length}
//         </span>
//       </div>

//       {filteredHistory.length === 0 ? (
//         <p className="text-gray-500 italic text-center py-3">No matching records found.</p>
//       ) : (
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-100">
//             <tr>
//               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Student Name</th>
//               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Account Number</th>
//               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Room No</th>
//               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">From</th>
//               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">To</th>
//               <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-100 text-gray-800">
//             {filteredHistory.map((h) => (
//               <tr key={h._id}>
//                 <td className="px-3 py-2">{h.student?.name || "N/A"}</td>
//                 <td className="px-3 py-2">{h.student?.accountNumber || "N/A"}</td>
//                 <td className="px-3 py-2">{h.student?.room_no || "N/A"}</td>
//                 <td className="px-3 py-2">{h.leaving_date ? new Date(h.leaving_date).toLocaleDateString() : "—"}</td>
//                 <td className="px-3 py-2">{h.return_date ? new Date(h.return_date).toLocaleDateString() : "—"}</td>
//                 <td className={`px-3 py-2 font-medium ${h.status === "approved" ? "text-green-600" : h.status === "rejected" ? "text-red-600" : "text-yellow-600"}`}>
//                   {h.status || "—"}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// function ButlerMessoff() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const [progress, setProgress] = useState(0);
//   const [newReqs, setNewReqs] = useState([]);
//   const [approvedReqs, setApprovedReqs] = useState(0);
//   const [rejectedReqs, setRejectedReqs] = useState(0);
//   const [history, setHistory] = useState([]);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [graphData, setGraphData] = useState([0, 0, 0]);
//   const [monthFilter, setMonthFilter] = useState("");
//   const token = localStorage.getItem("token");
//   const butler = JSON.parse(localStorage.getItem("Butler") || "{}");

//   const getRequests = async () => {
//     try {
//       setProgress(20);
//       const res = await fetch(`${mainUri}/api/messoff/list`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ HostelNo: butler.hostelNo }),
//       });
//       setProgress(50);
//       const data = await res.json();
//       if (data && data.success) {
//         const prepared = (data.list || []).map((req) => ({
//           ...req,
//           messOffId: req._id,            // keep mess doc id separate
//           studentId: req.student?._id,
//           status: req.status,
//           from: req.leaving_date ? new Date(req.leaving_date).toDateString().slice(4, 10) : "—",
//           to: req.return_date ? new Date(req.return_date).toDateString().slice(4, 10) : "—",
//         }));
//         setNewReqs(prepared);
//         setApprovedReqs(data.approved || 0);
//         setRejectedReqs(data.rejected || 0);
//         setGraphData([data.approved || 0, data.rejected || 0, prepared.length]);
//       } else {
//         toast.error("Failed to fetch pending requests");
//       }
//       setProgress(100);
//     } catch (err) {
//       console.error("getRequests error:", err);
//       toast.error("Failed to fetch pending requests");
//       setProgress(100);
//     }
//   };

//   const getMessHistory = async (month = "") => {
//     try {
//       setProgress(20);
//       const res = await fetch(`${mainUri}/api/messoff/admin/history`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify(month ? { month } : {}),
//       });
//       setProgress(60);
//       const data = await res.json();
//       if (data && data.success) {
//         setHistory(data.history || []);
//       } else {
//         toast.error("Failed to fetch mess-off history");
//       }
//       setProgress(100);
//     } catch (err) {
//       console.error("getMessHistory error:", err);
//       toast.error("Error fetching mess-off history");
//       setProgress(100);
//     }
//   };

//   const updateRequest = async (messOffId, status) => {
//     try {
//       setProgress(10);
//       const res = await fetch(`${mainUri}/api/messoff/update`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ id: messOffId, status }),
//       });
//       setProgress(50);
//       const data = await res.json();
//       if (data && data.success) {
//         const req = newReqs.find((r) => r.messOffId === messOffId);
//         const studName = req?.student?.name || "student";
//         toast.success(`Request from ${studName} has been ${status}`, { position: "top-right", autoClose: 3000 });
//         setNewReqs((prev) => prev.filter((r) => r.messOffId !== messOffId));
//         await getRequests();
//         await getMessHistory(monthFilter);
//       } else {
//         toast.error(data?.message || "Something went wrong");
//       }
//     } catch (err) {
//       console.error("updateRequest error:", err);
//       toast.error("Something went wrong while updating request");
//     } finally {
//       setProgress(100);
//     }
//   };

//   const approve = (messOffId) => {
//     const req = newReqs.find(r => r.messOffId === messOffId);
//     if (!req) return;
//     const action = req.status === 'on_pending' ? 'completed' : 'approved';
//     updateRequest(messOffId, action);
//   };

//   const reject = (messOffId) => updateRequest(messOffId, 'rejected');

//   useEffect(() => {
//     getRequests();
//     getMessHistory(monthFilter);
//     // eslint-disable-next-line
//   }, [monthFilter]);

//   const graph = (
//     <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-4xl">
//       <Bar
//         data={{
//           labels: ["Accepted", "Rejected", "Pending"],
//           datasets: [{ label: "Requests", data: graphData, backgroundColor: ["rgba(79,70,229,0.8)","rgba(220,38,38,0.8)","rgba(245,158,11,0.8)"], borderColor: ["#4f46e5","#dc2626","#f59e0b"], borderWidth: 1, borderRadius: 8, barThickness: 60 }],
//         }}
//         options={{ responsive: true, plugins: { legend: { position: "top" }, title: { display: true, text: "Mess-Off Request Status" } }, scales: { y: { beginAtZero: true } } }}
//       />
//     </div>
//   );

//   const monthsList = (() => {
//     const arr = [];
//     const now = new Date();
//     for (let i = 0; i < 6; i++) {
//       const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
//       const y = d.getFullYear();
//       const m = String(d.getMonth() + 1).padStart(2, "0");
//       arr.push({ label: d.toLocaleString("default", { month: "long", year: "numeric" }), value: `${y}-${m}` });
//     }
//     return arr;
//   })();

//   return (
//     <div className="w-full min-h-screen flex flex-col gap-6 items-center justify-start pt-24 pb-10 px-4 bg-[#f3e8ff] lg:pl-64">
//       <LoadingBar color="#4f46e5" progress={progress} onLoaderFinished={() => setProgress(0)} />
//       <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl mb-2 text-center">Mess-Off Management</h1>
//       <div className="w-full max-w-4xl">{graph}</div>

//       <div className="bg-white px-4 sm:px-6 py-5 rounded-xl shadow-lg w-full max-w-xl max-h-[26rem] sm:max-h-96 overflow-auto">
//         <div className="flex items-center justify-between mb-4">
//           <span className="text-black font-bold text-xl">Pending Requests</span>
//           <span className="bg-[#4f46e5] text-white px-3 py-1 rounded-full text-sm font-medium">{newReqs.length} pending</span>
//         </div>

//         <ul role="list" className="divide-y divide-gray-200 text-black">
//           {newReqs.length === 0 ? (
//             <li className="py-4 text-center text-gray-500 italic">No pending requests</li>
//           ) : (
//             newReqs.map((req) => (
//               <li className="py-3 px-4 my-2 rounded-lg border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all" key={req.messOffId}>
//                 <div className="flex items-center space-x-4">
//                   <div className="flex-1 min-w-0">
//                     <p className="text-sm font-medium text-black"><strong>{req.student?.name || "N/A"}</strong></p>
//                     <div className="flex items-center mt-1 flex-wrap gap-2 text-xs text-gray-500">
//                       <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
//                         <strong>Ac: {req.student?.accountNumber || "N/A"}</strong> {" | "}
//                         <strong>Room: {req.student?.room_no || "N/A"}</strong> {" | "}
//                         <strong>URN: {req.student?.urn || "N/A"}</strong>
//                       </span>
//                       <span className="text-xs px-2 py-0.5 rounded bg-gray-100">
//                         {req.status === 'on_pending' ? 'Mess ON request' : 'Mess OFF request'}
//                       </span>
//                       <span className="font-medium">From:</span> {req.from}
//                       <span className="font-medium">To:</span> {req.to}
//                     </div>
//                   </div>
//                   <div className="flex gap-2">
//                     <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm" onClick={() => approve(req.messOffId)}>Approve</button>
//                     <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm" onClick={() => reject(req.messOffId)}>Reject</button>
//                   </div>
//                 </div>
//               </li>
//             ))
//           )}
//         </ul>
//       </div>

//       <div className="w-full max-w-xl mx-4 mt-2 flex flex-col sm:flex-row gap-4 sm:justify-between">
//         <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center"><p className="text-sm text-gray-500">Approved</p><p className="text-2xl font-bold text-[#4f46e5]">{approvedReqs}</p></div>
//         <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center"><p className="text-sm text-gray-500">Rejected</p><p className="text-2xl font-bold text-red-600">{rejectedReqs}</p></div>
//         <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center"><p className="text-sm text-gray-500">Pending</p><p className="text-2xl font-bold text-amber-500">{newReqs.length}</p></div>
//       </div>

//       <div className="w-full max-w-4xl flex justify-end gap-3">
//         <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className="border px-3 py-2 rounded">
//           <option value="">Last 1 month (default)</option>
//           {monthsList.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
//         </select>
//         <button className="bg-[#4f46e5] text-white px-3 py-2 rounded" onClick={() => { getMessHistory(monthFilter); getRequests(); }}>Refresh</button>
//       </div>

//       <History history={history} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
//       <ToastContainer />
//     </div>
//   );
// }

// export default ButlerMessoff;
// ButlerMessoff.jsx (updated: graph & counts now reflect selected month)
import { useState, useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

const History = ({ history, searchTerm, setSearchTerm }) => {
  const filteredHistory = history.filter((h) => {
    if (!h || !h.student) return false;
    const search = searchTerm.trim().toLowerCase();
    if (!search) return true;
    const { name = "", accountNumber = "", room_no = "" } = h.student || {};
    const from = h.leaving_date ? new Date(h.leaving_date).toLocaleDateString().toLowerCase() : "";
    const to = h.return_date ? new Date(h.return_date).toLocaleDateString().toLowerCase() : "";
    const status = (h.status || "").toLowerCase();
    return (
      name.toLowerCase().includes(search) ||
      (accountNumber || "").toString().toLowerCase().includes(search) ||
      (room_no || "").toString().toLowerCase().includes(search) ||
      from.includes(search) ||
      to.includes(search) ||
      status.includes(search)
    );
  });

  return (
    <div className="bg-white px-4 sm:px-5 py-5 rounded-xl shadow-lg w-full max-w-4xl overflow-auto mt-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
        <div className="flex flex-col sm:flex-row sm:items-center sm:gap-4 w-full">
          <span className="text-black font-bold text-xl">Last 1-Month Mess-Off History</span>
          <input
            type="text"
            placeholder="Search by any field..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="mt-2 sm:mt-0 border border-gray-300 rounded-lg px-3 py-2 w-full sm:w-64 focus:ring-2 focus:ring-[#4f46e5] focus:outline-none text-gray-700"
          />
        </div>
        <span className="bg-[#4f46e5] text-white px-3 py-1 rounded-full text-sm font-medium self-start sm:self-auto">
          Records: {filteredHistory.length}
        </span>
      </div>

      {filteredHistory.length === 0 ? (
        <p className="text-gray-500 italic text-center py-3">No matching records found.</p>
      ) : (
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Student Name</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Account Number</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Room No</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">From</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">To</th>
              <th className="px-3 py-2 text-left text-xs font-medium text-gray-700 uppercase">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100 text-gray-800">
            {filteredHistory.map((h) => (
              <tr key={h._id}>
                <td className="px-3 py-2">{h.student?.name || "N/A"}</td>
                <td className="px-3 py-2">{h.student?.accountNumber || "N/A"}</td>
                <td className="px-3 py-2">{h.student?.room_no || "N/A"}</td>
                <td className="px-3 py-2">{h.leaving_date ? new Date(h.leaving_date).toLocaleDateString() : "—"}</td>
                <td className="px-3 py-2">{h.return_date ? new Date(h.return_date).toLocaleDateString() : "—"}</td>
                <td className={`px-3 py-2 font-medium ${h.status === "approved" ? "text-green-600" : h.status === "rejected" ? "text-red-600" : "text-yellow-600"}`}>
                  {h.status || "—"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

function ButlerMessoff() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [progress, setProgress] = useState(0);
  const [newReqs, setNewReqs] = useState([]);
  const [approvedReqs, setApprovedReqs] = useState(0);
  const [rejectedReqs, setRejectedReqs] = useState(0);
  const [pendingCountForMonth, setPendingCountForMonth] = useState(0);
  const [history, setHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [graphData, setGraphData] = useState([0, 0, 0]);
  const [monthFilter, setMonthFilter] = useState("");
  const token = localStorage.getItem("token");
  const butler = JSON.parse(localStorage.getItem("Butler") || "{}");

  // fetch pending actionable requests for butler (always fetch)
  const getRequests = async () => {
    try {
      setProgress(20);
      const res = await fetch(`${mainUri}/api/messoff/list`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ HostelNo: butler.hostelNo }),
      });
      setProgress(50);
      const data = await res.json();
      if (data && data.success) {
        const prepared = (data.list || []).map((req) => ({
          ...req,
          messOffId: req._id,
          studentId: req.student?._id,
          status: req.status,
          from: req.leaving_date ? new Date(req.leaving_date).toDateString().slice(4, 10) : "—",
          to: req.return_date ? new Date(req.return_date).toDateString().slice(4, 10) : "—",
        }));
        setNewReqs(prepared);
      } else {
        toast.error("Failed to fetch pending requests");
      }
      setProgress(100);
    } catch (err) {
      console.error("getRequests error:", err);
      toast.error("Failed to fetch pending requests");
      setProgress(100);
    }
  };

  // fetch admin history for selected month and compute counts/graph
  const getMessHistory = async (month = "") => {
    try {
      setProgress(20);
      const res = await fetch(`${mainUri}/api/messoff/admin/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(month ? { month } : {}),
      });
      setProgress(60);
      const data = await res.json();
      if (data && data.success) {
        const hist = data.history || [];
        setHistory(hist);

        // compute counts based on history array
        const approved = hist.filter(h => h.status === 'approved' || h.status === 'completed').length;
        const rejected = hist.filter(h => h.status === 'rejected').length;
        const pending = hist.filter(h => h.status === 'pending' || h.status === 'on_pending').length;

        setApprovedReqs(approved);
        setRejectedReqs(rejected);
        setPendingCountForMonth(pending);
        setGraphData([approved, rejected, pending]);
      } else {
        toast.error("Failed to fetch mess-off history");
      }
      setProgress(100);
    } catch (err) {
      console.error("getMessHistory error:", err);
      toast.error("Error fetching mess-off history");
      setProgress(100);
    }
  };

  const updateRequest = async (messOffId, status) => {
    try {
      setProgress(10);
      const res = await fetch(`${mainUri}/api/messoff/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: messOffId, status }),
      });
      setProgress(50);
      const data = await res.json();
      if (data && data.success) {
        const req = newReqs.find((r) => r.messOffId === messOffId);
        const studName = req?.student?.name || "student";
        toast.success(`Request from ${studName} has been ${status}`, { position: "top-right", autoClose: 3000 });
        setNewReqs((prev) => prev.filter((r) => r.messOffId !== messOffId));
        // refresh both actionable list and month-based stats/history
        await getRequests();
        await getMessHistory(monthFilter);
      } else {
        toast.error(data?.message || "Something went wrong");
      }
    } catch (err) {
      console.error("updateRequest error:", err);
      toast.error("Something went wrong while updating request");
    } finally {
      setProgress(100);
    }
  };

  const approve = (messOffId) => {
    const req = newReqs.find(r => r.messOffId === messOffId);
    if (!req) return;
    const action = req.status === 'on_pending' ? 'completed' : 'approved';
    updateRequest(messOffId, action);
  };

  const reject = (messOffId) => updateRequest(messOffId, 'rejected');

  useEffect(() => {
    // when monthFilter changes we refresh both lists:
    getRequests();
    getMessHistory(monthFilter);
    // eslint-disable-next-line
  }, [monthFilter]);

  const graph = (
    <div className="bg-white p-4 rounded-xl shadow-lg w-full max-w-4xl">
      <Bar
        data={{
          labels: ["Accepted", "Rejected", "Pending"],
          datasets: [{ label: "Requests", data: graphData, backgroundColor: ["rgba(79,70,229,0.8)","rgba(220,38,38,0.8)","rgba(245,158,11,0.8)"], borderColor: ["#4f46e5","#dc2626","#f59e0b"], borderWidth: 1, borderRadius: 8, barThickness: 60 }],
        }}
        options={{
          responsive: true,
          plugins: { legend: { position: "top" }, title: { display: true, text: "Mess-Off Request Status" } },
          scales: { y: { beginAtZero: true, ticks: { precision: 0 } } }
        }}
      />
    </div>
  );

  const monthsList = (() => {
    const arr = [];
    const now = new Date();
    for (let i = 0; i < 6; i++) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      arr.push({ label: d.toLocaleString("default", { month: "long", year: "numeric" }), value: `${y}-${m}` });
    }
    return arr;
  })();

  return (
    <div className="w-full min-h-screen flex flex-col gap-6 items-center justify-start pt-24 pb-10 px-4 bg-[#f3e8ff] lg:pl-64">
      <LoadingBar color="#4f46e5" progress={progress} onLoaderFinished={() => setProgress(0)} />
      <h1 className="text-black font-bold text-3xl sm:text-4xl md:text-5xl mb-2 text-center">Mess-Off Management</h1>

      <div className="w-full max-w-4xl">{graph}</div>

      <div className="bg-white px-4 sm:px-6 py-5 rounded-xl shadow-lg w-full max-w-xl max-h-[26rem] sm:max-h-96 overflow-auto">
        <div className="flex items-center justify-between mb-4">
          <span className="text-black font-bold text-xl">Pending Requests</span>
          <span className="bg-[#4f46e5] text-white px-3 py-1 rounded-full text-sm font-medium">{newReqs.length} pending</span>
        </div>

        <ul role="list" className="divide-y divide-gray-200 text-black">
          {newReqs.length === 0 ? (
            <li className="py-4 text-center text-gray-500 italic">No pending requests</li>
          ) : (
            newReqs.map((req) => (
              <li className="py-3 px-4 my-2 rounded-lg border border-gray-100 hover:bg-gray-50 hover:shadow-md transition-all" key={req.messOffId}>
                <div className="flex items-center space-x-4">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-black"><strong>{req.student?.name || "N/A"}</strong></p>
                    <div className="flex items-center mt-1 flex-wrap gap-2 text-xs text-gray-500">
                      <span className="bg-gray-100 px-2 py-1 rounded text-gray-700">
                        <strong>Ac: {req.student?.accountNumber || "N/A"}</strong> {" | "}
                        <strong>Room: {req.student?.room_no || "N/A"}</strong> {" | "}
                        <strong>URN: {req.student?.urn || "N/A"}</strong>
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded bg-gray-100">
                        {req.status === 'on_pending' ? 'Mess ON request' : 'Mess OFF request'}
                      </span>
                      <span className="font-medium">From:</span> {req.from}
                      <span className="font-medium">To:</span> {req.to}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button className="bg-green-100 hover:bg-green-200 text-green-700 px-3 py-1 rounded-md text-sm" onClick={() => approve(req.messOffId)}>Approve</button>
                    <button className="bg-red-100 hover:bg-red-200 text-red-700 px-3 py-1 rounded-md text-sm" onClick={() => reject(req.messOffId)}>Reject</button>
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <div className="w-full max-w-xl mx-4 mt-2 flex flex-col sm:flex-row gap-4 sm:justify-between">
        <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center"><p className="text-sm text-gray-500">Approved</p><p className="text-2xl font-bold text-[#4f46e5]">{approvedReqs}</p></div>
        <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center"><p className="text-sm text-gray-500">Rejected</p><p className="text-2xl font-bold text-red-600">{rejectedReqs}</p></div>
        <div className="flex-1 bg-white px-4 py-3 rounded-xl shadow-md text-center"><p className="text-sm text-gray-500">Pending</p><p className="text-2xl font-bold text-amber-500">{pendingCountForMonth}</p></div>
      </div>

      <div className="w-full max-w-4xl flex justify-end gap-3">
        <select value={monthFilter} onChange={(e) => setMonthFilter(e.target.value)} className="border px-3 py-2 rounded">
          <option value="">Last 1 month (default)</option>
          {monthsList.map((m) => <option key={m.value} value={m.value}>{m.label}</option>)}
        </select>
        <button className="bg-[#4f46e5] text-white px-3 py-2 rounded" onClick={() => { getMessHistory(monthFilter); getRequests(); }}>
          Refresh
        </button>
      </div>

      <History history={history} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <ToastContainer />
    </div>
  );
}

export default ButlerMessoff;
