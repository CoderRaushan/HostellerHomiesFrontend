

// // import { useEffect, useState } from "react";
// // import { Input } from "../../LandingSite/AuthPage/Input";
// // import { Doughnut } from "react-chartjs-2";
// // import "chart.js/auto";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // function Mess() {
// //   const mainUri = import.meta.env.VITE_MAIN_URI;
// //   const token = localStorage.getItem("token");

// //   const [leaveDate, setLeaveDate] = useState("");
// //   const [returnDate, setReturnDate] = useState("");
// //   const [requests, setRequests] = useState(0);
// //   const [Messoff, setMessOff] = useState(0);
// //   const [loading, setLoading] = useState(false);
// //   const [historyList, setHistoryList] = useState([]);

// //   const daysofmonthtilltoday = new Date().getDate();

// //   useEffect(() => {
// //     const student = JSON.parse(localStorage.getItem("Student"));
// //     if (student) {
// //       setLoading(true);
// //       fetch(`${mainUri}/api/Messoff/count`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({ student: student.id }),
// //       })
// //         .then((res) => res.json())
// //         .then((result) => {
// //           if (result.success) {
// //             setMessOff(result.approved);
// //             setRequests(result.list.length);
// //           } else {
// //             alert(result.errors?.[0]?.msg || "Error fetching data");
// //           }
// //         })
// //         .finally(() => setLoading(false));
// //       fetch(`${mainUri}/api/Messoff/history`, {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //         body: JSON.stringify({ student: student.id }),
// //       })
// //         .then((res) => res.json())
// //         .then((result) => {
// //           if (result.success) {
// //             setHistoryList(result.history);
// //           }
// //         })
// //         .catch((err) => console.error("History fetch error:", err));
// //     }
// //   }, [requests]);

// //   const handleleaveChange = (e) => setLeaveDate(e.target.value);
// //   const handlereturnChange = (e) => setReturnDate(e.target.value);

// //   const requestMessOff = async (event) => {
// //     console.log("reqiesting")
// //     event.preventDefault();
// //     setLoading(true);
// //     const student = JSON.parse(localStorage.getItem("Student"));
// //     const data = {
// //       student: student?.id,
// //       leaving_date: leaveDate,
// //       return_date: returnDate,
// //     };

// //     const response = await fetch(`${mainUri}/api/Messoff/request`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //         Authorization: `Bearer ${token}`,
// //       },
// //       body: JSON.stringify(data),
// //     });

// //     const result = await response.json();
// //     if (result.success) {
// //       setRequests((prev) => prev + 1);
// //       setLeaveDate("");
// //       setReturnDate("");
// //       toast.success("Mess Off Requested Successfully!", { theme: "dark" });
// //     } else {
// //       toast.error(result.message, { theme: "dark" });
// //     }

// //     setLoading(false);
// //   };

// //   const labels = ["Mess Off", "Requested Mess Off", "Mess Attended"];
// //   const loader = (
// //     <svg
// //       aria-hidden="true"
// //       className="inline w-4 h-4 mr-2 animate-spin text-white fill-blue-600"
// //       viewBox="0 0 100 101"
// //       fill="none"
// //       xmlns="http://www.w3.org/2000/svg"
// //     >
// //       <path
// //         d="M100 50.5908C100 78.2051 77.6142 100.591 50 
// //         100.591C22.3858 100.591 0 78.2051 0 
// //         50.5908C0 22.9766 22.3858 0.59082 50 
// //         0.59082C77.6142 0.59082 100 22.9766 
// //         100 50.5908Z"
// //         fill="currentColor"
// //       />
// //       <path
// //         d="M93.9676 39.0409C96.393 38.4038 
// //         97.8624 35.9116 97.0079 
// //         33.5539C95.2932 28.8227 92.871 24.3692 
// //         89.8167 20.348C85.8452 15.1192 80.8826 
// //         10.7238 75.2124 7.41289C69.5422 
// //         4.10194 63.2754 1.94025 56.7698 
// //         1.05124C51.7666 0.367541 46.6976 
// //         0.446843 41.7345 1.27873C39.2613 
// //         1.69328 37.813 4.19778 38.4501 
// //         6.62326C39.0873 9.04874 41.5694 
// //         10.4717 44.0505 10.1071C47.8511 
// //         9.54855 51.7191 9.52689 55.5402 
// //         10.0491C60.8642 10.7766 65.9928 
// //         12.5457 70.6331 15.2552C75.2735 
// //         17.9648 79.3347 21.5619 82.5849 
// //         25.841C84.9175 28.9121 86.7997 
// //         32.2913 88.1811 35.8758C89.083 
// //         38.2158 91.5421 39.6781 93.9676 
// //         39.0409Z"
// //         fill="currentFill"
// //       />
// //     </svg>
// //   );

// //   return (
// //     <div className="w-full min-h-screen bg-[#f3e8ff] flex flex-col items-center justify-start pt-24 px-4 sm:px-6 md:px-10 lg:px-20 overflow-y-auto">
// //       {/* Header */}
// //       <h1 className="text-[#4f46e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-center">
// //         Mess Off
// //       </h1>

// //       {/* Summary Section */}
// //       <ul className="flex flex-col sm:flex-row gap-3 text-[#4f46e] text-base sm:text-lg md:text-xl text-center mb-6 w-full justify-center">
// //         <li>Total Mess: {daysofmonthtilltoday - Messoff}</li>
// //         <li>Mess Off: {loading ? loader : Messoff}</li>
// //         <li>Requests Sent: {loading ? loader : requests}</li>
// //       </ul>

// //       {/* ✅ Chart + History Section (Side-by-Side, Responsive) */}
// //       <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-8 flex-wrap mb-10">
// //         {/* Chart Section */}
// //         <div className="flex flex-col items-center gap-4 w-full sm:w-[20rem]">
// //           <div className="w-full h-[250px] sm:h-[280px] md:h-[300px]">
// //             <Doughnut
// //               datasetIdKey="id"
// //               data={{
// //                 labels,
// //                 datasets: [
// //                   {
// //                     label: "Mess",
// //                     data: [Messoff, requests, daysofmonthtilltoday - Messoff],
// //                     backgroundColor: ["#F26916", "#EAB308", "#1D4ED8"],
// //                     hoverOffset: 10,
// //                   },
// //                 ],
// //               }}
// //               options={{
// //                 plugins: { legend: { display: false } },
// //                 maintainAspectRatio: false,
// //               }}
// //             />
// //           </div>
// //           <ul className="text-[#4f46e] text-sm sm:text-base">
// //             <li className="flex items-center gap-2">
// //               <span className="w-6 h-4 bg-orange-500 block rounded-sm"></span>{" "}
// //               Mess Off
// //             </li>
// //             <li className="flex items-center gap-2">
// //               <span className="w-6 h-4 bg-yellow-500 block rounded-sm"></span>{" "}
// //               Requested Mess
// //             </li>
// //             <li className="flex items-center gap-2">
// //               <span className="w-6 h-4 bg-blue-500 block rounded-sm"></span>{" "}
// //               Mess Attended
// //             </li>
// //           </ul>
// //         </div>

// //         {/* ✅ History Component */}
// //         <div className="w-full sm:w-[22rem] md:w-[26rem] max-h-[300px] p-4 border rounded-lg shadow bg-white border-neutral-900 overflow-y-auto">
// //           <div className="flex items-center justify-between mb-4">
// //             <h5 className="text-xl font-bold text-[#4f46e]">
// //               Last Month Mess Off History
// //             </h5>
// //           </div>
// //           <div className="flow-root">
// //             <ul className="divide-y divide-gray-300 text-[#4f46e]">
// //               {historyList.length === 0 ? (
// //                 <li className="text-center text-sm">No Mess Off history</li>
// //               ) : (
// //                 historyList.map((h) => (
// //                   <li className="py-3" key={h._id}>
// //                     <div className="flex justify-between items-center">
// //                       <div>
// //                         <p className="text-sm font-medium">
// //                           {h.status.toUpperCase()}
// //                         </p>
// //                         <p className="text-sm text-gray-500">
// //                           {new Date(h.leaving_date).toDateString().slice(4, 10)}{" "}
// //                           to{" "}
// //                           {new Date(h.return_date).toDateString().slice(4, 10)}
// //                         </p>
// //                       </div>
// //                       <p className="text-sm font-semibold text-gray-600">
// //                         {new Date(h.request_date).toDateString().slice(4, 10)}
// //                       </p>
// //                     </div>
// //                   </li>
// //                 ))
// //               )}
// //             </ul>
// //           </div>
// //         </div>
// //       </div>

// //       {/* ✅ Form Section (Below Chart + History) */}
// //       <form
// //         onSubmit={requestMessOff}
// //         className="bg-white w-full lg:w-[40rem] p-6 rounded-lg shadow-xl"
// //       >
// //         <div className="flex flex-col sm:flex-row gap-4">
// //           <Input
// //             field={{
// //               name: "leaving date",
// //               type: "date",
// //               value: leaveDate,
// //               onChange: handleleaveChange,
// //               req: true,
// //             }}
// //           />
// //           <Input
// //             field={{
// //               name: "return date",
// //               type: "date",
// //               value: returnDate,
// //               onChange: handlereturnChange,
// //               req: true,
// //             }}
// //           />
// //         </div>
// //         <button
// //           type="submit"
// //           className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-800 text-lg sm:text-xl rounded-lg px-5 py-2.5 mt-5"
// //         >
// //           {loading ? (
// //             <div className="flex items-center gap-2 justify-center">
// //               {loader} Sending Request...
// //             </div>
// //           ) : (
// //             "Request Mess Off"
// //           )}
// //         </button>
// //         <ToastContainer theme="dark" />
// //       </form>
// //     </div>
// //   );
// // }

// // export default Mess;

// import { useEffect, useState } from "react";
// import { Input } from "../../LandingSite/AuthPage/Input";
// import { Doughnut } from "react-chartjs-2";
// import "chart.js/auto";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Mess() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const token = localStorage.getItem("token");

//   // only single inputs now
//   const [date, setDate] = useState(""); // used as leaving_date OR return_date depending on mode
//   const [mode, setMode] = useState("off"); // 'off' or 'on' (UI mode)
//   const [requests, setRequests] = useState(0);
//   const [Messoff, setMessOff] = useState(0);
//   const [loading, setLoading] = useState(false);
//   const [historyList, setHistoryList] = useState([]);
//   const [pending, setPending] = useState(null); // pending request (off or on)
//   const [approvedActive, setApprovedActive] = useState(null); // approved off (no return_date yet)
//   const [monthFilter, setMonthFilter] = useState("");

//   useEffect(() => {
//     const student = JSON.parse(localStorage.getItem("Student"));
//     if (!student) return;
//     setLoading(true);

//     // fetch counts (you have /count)
//     fetch(`${mainUri}/api/Messoff/count`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ student: student.id })
//     }).then(r => r.json()).then(res => {
//       if (res.success) {
//         setMessOff(res.approved || 0);
//         setRequests(res.list?.length || 0);
//       }
//     }).catch(err => console.error(err));

//     // fetch status to decide UI (pending, approvedActive)
//     fetch(`${mainUri}/api/Messoff/status`, {
//       method: "POST",
//       headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//       body: JSON.stringify({ student: student.id })
//     }).then(r => r.json()).then(res => {
//       if (res.success) {
//         setPending(res.pending || null);
//         setApprovedActive(res.approvedActive || null);
//         // if approved active exists => show 'on' form
//         if (res.pending) {
//           // there is a pending request (either off pending or on_pending)
//           setMode(res.pending.status === 'pending' ? 'off_pending' : 'on_pending');
//         } else if (res.approvedActive) {
//           setMode('on'); // show open form
//         } else {
//           setMode('off'); // default: show off form
//         }
//       }
//     }).catch(err => console.error(err));

//     // fetch history (default last month)
//     fetchHistory(student.id, monthFilter).finally(() => setLoading(false));
//     // eslint-disable-next-line
//   }, [requests, monthFilter]);

//   const fetchHistory = async (studentId, month = "") => {
//     try {
//       const resp = await fetch(`${mainUri}/api/Messoff/history`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ student: studentId, month })
//       });
//       const result = await resp.json();
//       if (result.success) setHistoryList(result.history || []);
//     } catch (err) {
//       console.error("History fetch error:", err);
//     }
//   };

//   // compute tomorrow only (format YYYY-MM-DD)
//   const today = new Date();
//   const tomorrow = new Date(today);
//   tomorrow.setDate(tomorrow.getDate() + 1);
//   const yyyy = tomorrow.getFullYear();
//   const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
//   const dd = String(tomorrow.getDate()).padStart(2, "0");
//   const tomorrowStr = `${yyyy}-${mm}-${dd}`;

//   const handleDateChange = (e) => setDate(e.target.value);

//   // Submit (either off or on depending on mode)
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const student = JSON.parse(localStorage.getItem("Student"));
//     try {
//       if (mode === 'off') {
//         // call /request with leaving_date
//         const resp = await fetch(`${mainUri}/api/Messoff/request`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//           body: JSON.stringify({ student: student.id, leaving_date: date })
//         });
//         const res = await resp.json();
//         if (res.success) {
//           toast.success(res.message || "Mess off requested", { theme: "dark" });
//           setDate("");
//           setRequests(prev => prev + 1);
//         } else toast.error(res.message || "Error", { theme: "dark" });
//       } else if (mode === 'on') {
//         // call /on with return_date
//         const resp = await fetch(`${mainUri}/api/Messoff/on`, {
//           method: "POST",
//           headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//           body: JSON.stringify({ student: student.id, return_date: date })
//         });
//         const res = await resp.json();
//         if (res.success) {
//           toast.success(res.message || "Mess on requested", { theme: "dark" });
//           setDate("");
//           setRequests(prev => prev + 1);
//         } else toast.error(res.message || "Error", { theme: "dark" });
//       }
//     } catch (err) {
//       console.error(err);
//       toast.error("Server error", { theme: "dark" });
//     } finally {
//       // refresh status + history
//       fetch(`${mainUri}/api/Messoff/status`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
//         body: JSON.stringify({ student: student.id })
//       }).then(r => r.json()).then(res => {
//         if (res.success) {
//           setPending(res.pending || null);
//           setApprovedActive(res.approvedActive || null);
//           if (res.pending) {
//             setMode(res.pending.status === 'pending' ? 'off_pending' : 'on_pending');
//           } else if (res.approvedActive) setMode('on');
//           else setMode('off');
//         }
//       });
//       fetchHistory(student.id, monthFilter);
//       setLoading(false);
//     }
//   };

//   const labels = ["Mess Off", "Requested Mess Off", "Mess Attended"];
//   const daysofmonthtilltoday = new Date().getDate();

//   const loader = (
//     <svg aria-hidden="true" className="inline w-4 h-4 mr-2 animate-spin text-white fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path d="M100 50.5908..." fill="currentColor" />
//     </svg>
//   );

//   // months dropdown for history (last 6 months)
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
//     <div className="w-full min-h-screen bg-[#f3e8ff] flex flex-col items-center justify-start pt-24 px-4 sm:px-6 md:px-10 lg:px-20 overflow-y-auto">
//       <h1 className="text-[#4f46e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-center">Mess Off</h1>

//       <ul className="flex flex-col sm:flex-row gap-3 text-[#4f46e] text-base sm:text-lg md:text-xl text-center mb-6 w-full justify-center">
//         <li>Total Mess: {daysofmonthtilltoday - Messoff}</li>
//         <li>Mess Off: {loading ? loader : Messoff}</li>
//         <li>Requests Sent: {loading ? loader : requests}</li>
//       </ul>

//       <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-8 flex-wrap mb-10">
//         <div className="flex flex-col items-center gap-4 w-full sm:w-[20rem]">
//           <div className="w-full h-[250px] sm:h-[280px] md:h-[300px]">
//             <Doughnut datasetIdKey="id" data={{
//               labels,
//               datasets: [{ label: "Mess", data: [Messoff, requests, daysofmonthtilltoday - Messoff], backgroundColor: ["#F26916","#EAB308","#1D4ED8"], hoverOffset: 10 }]
//             }} options={{ plugins: { legend: { display: false } }, maintainAspectRatio: false }} />
//           </div>
//         </div>

//         <div className="w-full sm:w-[22rem] md:w-[26rem] max-h-[300px] p-4 border rounded-lg shadow bg-white border-neutral-900 overflow-y-auto">
//           <div className="flex items-center justify-between mb-4">
//             <h5 className="text-xl font-bold text-[#4f46e]">Mess Off History</h5>
//             <select value={monthFilter} onChange={(e)=> setMonthFilter(e.target.value)} className="border px-2 py-1 rounded">
//               <option value="">Last month (default)</option>
//               {monthsList.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
//             </select>
//           </div>
//           <div className="flow-root">
//             <ul className="divide-y divide-gray-300 text-[#4f46e]">
//               {historyList.length === 0 ? (
//                 <li className="text-center text-sm">No Mess Off history</li>
//               ) : historyList.map(h => (
//                 <li className="py-3" key={h._id}>
//                   <div className="flex justify-between items-center">
//                     <div>
//                       <p className="text-sm font-medium">{h.status.toUpperCase()}</p>
//                       <p className="text-sm text-gray-500">
//                         {new Date(h.leaving_date).toDateString().slice(4,10)} to {h.return_date ? new Date(h.return_date).toDateString().slice(4,10) : "—"}
//                       </p>
//                     </div>
//                     <p className="text-sm font-semibold text-gray-600">{new Date(h.request_date).toDateString().slice(4,10)}</p>
//                   </div>
//                 </li>
//               ))}
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* SINGLE DATE FORM */}
//       <form onSubmit={handleSubmit} className="bg-white w-full lg:w-[40rem] p-6 rounded-lg shadow-xl">
//         {mode === 'off_pending' && pending ? (
//           <div className="mb-4">
//             <p className="text-sm text-orange-600 font-semibold">Your mess-off request is pending ({new Date(pending.request_date).toDateString()})</p>
//             <p className="text-sm text-gray-600">Leaving: {new Date(pending.leaving_date).toDateString().slice(4,10)}</p>
//           </div>
//         ) : mode === 'on_pending' && pending ? (
//           <div className="mb-4">
//             <p className="text-sm text-orange-600 font-semibold">Your mess-on request is pending ({new Date(pending.request_date).toDateString()})</p>
//             <p className="text-sm text-gray-600">Requested return: {pending.return_date ? new Date(pending.return_date).toDateString().slice(4,10) : '-'}</p>
//           </div>
//         ) : approvedActive ? (
//           // show form to request mess ON (return_date). mode 'on'
//           <>
//             <p className="mb-2 text-sm font-medium text-[#4f46e]">You are currently OFF since {new Date(approvedActive.leaving_date).toDateString().slice(4,10)}. Request Mess ON (select date):</p>
//             <div className="flex gap-4">
//               <Input field={{ name: "return date", type: "date", value: date, onChange: handleDateChange, req: true, min: (new Date()).toISOString().slice(0,10) }} />
//             </div>
//             <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-5 py-2.5 mt-5">
//               {loading ? (<div className="flex items-center gap-2 justify-center">{loader} Sending...</div>) : ("Request Mess On")}
//             </button>
//           </>
//         ) : (
//           // default: show OFF form (single leaving_date input) — only tomorrow allowed
//           <>
//             <p className="mb-2 text-sm font-medium text-[#4f46e]">Request Mess Off — choose leaving date (tomorrow only)</p>
//             <div className="flex gap-4">
//               <Input field={{ name: "leaving date", type: "date", value: date, onChange: handleDateChange, req: true, min: tomorrowStr, max: tomorrowStr }} />
//             </div>
//             <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 mt-5">
//               {loading ? (<div className="flex items-center gap-2 justify-center">{loader} Sending...</div>) : ("Request Mess Off")}
//             </button>
//           </>
//         )}

//         <ToastContainer theme="dark" />
//       </form>
//     </div>
//   );
// }

// export default Mess;
import { useEffect, useState } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { Doughnut } from "react-chartjs-2";
import "chart.js/auto";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Mess() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const token = localStorage.getItem("token");

  // only single inputs now
  const [date, setDate] = useState(""); // used as leaving_date OR return_date depending on mode
  const [mode, setMode] = useState("off"); // 'off' or 'on' (UI mode)
  const [requests, setRequests] = useState(0);
  const [Messoff, setMessOff] = useState(0);
  const [loading, setLoading] = useState(false);
  const [historyList, setHistoryList] = useState([]);
  const [pending, setPending] = useState(null); // pending request (off or on)
  const [approvedActive, setApprovedActive] = useState(null); // approved off (no return_date yet)
  const [monthFilter, setMonthFilter] = useState("");

  // compute tomorrow only (format YYYY-MM-DD)
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, "0");
  const dd = String(tomorrow.getDate()).padStart(2, "0");
  const tomorrowStr = `${yyyy}-${mm}-${dd}`;

  useEffect(() => {
    const student = JSON.parse(localStorage.getItem("Student"));
    if (!student) return;
    setLoading(true);

    // fetch counts (you have /count)
    fetch(`${mainUri}/api/Messoff/count`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ student: student.id })
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          // approved count (mess off) and total requests
          setMessOff(res.approved || 0);
          setRequests(res.list?.length || 0);
        }
      })
      .catch(err => console.error(err));

    // fetch status to decide UI (pending, approvedActive)
    fetch(`${mainUri}/api/Messoff/status`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ student: student.id })
    })
      .then(r => r.json())
      .then(res => {
        if (res.success) {
          setPending(res.pending || null);
          setApprovedActive(res.approvedActive || null);
          // set mode based on server status
          if (res.pending) {
            setMode(res.pending.status === 'pending' ? 'off_pending' : 'on_pending');
          } else if (res.approvedActive) {
            setMode('on');
          } else {
            setMode('off');
          }
        }
      })
      .catch(err => console.error(err));

    // fetch history (default last month)
    fetchHistory(student.id, monthFilter).finally(() => setLoading(false));
    // eslint-disable-next-line
  }, [requests, monthFilter]);

  const fetchHistory = async (studentId, month = "") => {
    try {
      const resp = await fetch(`${mainUri}/api/Messoff/history`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ student: studentId, month })
      });
      const result = await resp.json();
      if (result.success) setHistoryList(result.history || []);
    } catch (err) {
      console.error("History fetch error:", err);
    }
  };

  const handleDateChange = (e) => setDate(e.target.value);

  // ---------- Helper: overlap check ----------
  // returns true if `checkDate` is inside any history record with status approved/completed/pending/on_pending
  const isDateOverlappingHistory = (checkDateStr) => {
    if (!checkDateStr) return false;
    const check = new Date(checkDateStr);
    // normalize (strip time)
    check.setHours(0,0,0,0);

    for (const h of historyList) {
      // consider records that are approved/completed/pending/on_pending (anything that blocks new off)
      const status = (h.status || "").toLowerCase();
      if (!['approved','completed','pending','on_pending'].includes(status)) continue;

      const from = h.leaving_date ? new Date(h.leaving_date) : null;
      const to = h.return_date ? new Date(h.return_date) : null;
      if (from) from.setHours(0,0,0,0);
      if (to) to.setHours(0,0,0,0);

      // If there's a to date, check range; if not, check equality with from
      if (from && to) {
        if (check.getTime() >= from.getTime() && check.getTime() <= to.getTime()) return true;
      } else if (from) {
        if (check.getTime() === from.getTime()) return true;
      }
    }
    return false;
  };

  // ---------- Submit (either off or on depending on mode) ----------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const student = JSON.parse(localStorage.getItem("Student"));
    if (!student) {
      toast.error("Student not found in localStorage");
      setLoading(false);
      return;
    }

    try {
      // ---------- OFF mode validation ----------
      if (mode === 'off') {
        if (!date) {
          toast.error("Select a leaving date (tomorrow only)", { theme: "dark" });
          setLoading(false);
          return;
        }
        // ensure date is tomorrow
        if (date !== tomorrowStr) {
          toast.error("Leaving date must be tomorrow.", { theme: "dark" });
          setLoading(false);
          return;
        }

        // If any pending/on_pending exists, don't allow
        if (pending && (pending.status === 'pending' || pending.status === 'on_pending')) {
          toast.error("You already have a pending request. Wait for it to resolve.", { theme: "dark" });
          setLoading(false);
          return;
        }

        // If approvedActive exists (you're already off) you shouldn't be able to request off again
        if (approvedActive) {
          toast.error("You are already marked OFF. Request Mess ON first.", { theme: "dark" });
          setLoading(false);
          return;
        }

        // Check history overlap (prevents duplicate request on same dates)
        if (isDateOverlappingHistory(date)) {
          toast.error("You already have a mess-off covering that date. Cannot request duplicate.", { theme: "dark" });
          setLoading(false);
          return;
        }

        // All validation passed — call API
        const resp = await fetch(`${mainUri}/api/Messoff/request`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ student: student.id, leaving_date: date })
        });

        const res = await resp.json();
        if (res.success) {
          toast.success(res.message || "Mess off requested", { theme: "dark" });
          setDate("");
          setRequests(prev => prev + 1);
        } else {
          toast.error(res.message || "Error", { theme: "dark" });
        }
      }

      // ---------- ON mode validation ----------
      else if (mode === 'on') {
        if (!date) {
          toast.error("Select a return date.", { theme: "dark" });
          setLoading(false);
          return;
        }

        // must have an active approved off record
        if (!approvedActive) {
          toast.error("No approved mess-off found to request mess-on.", { theme: "dark" });
          setLoading(false);
          return;
        }

        // if there's already a pending on request, block
        if (pending && pending.status === 'on_pending') {
          toast.error("You already have a mess-on request pending.", { theme: "dark" });
          setLoading(false);
          return;
        }

        const ret = new Date(date); ret.setHours(0,0,0,0);
        const leave = new Date(approvedActive.leaving_date); leave.setHours(0,0,0,0);
        const today0 = new Date(); today0.setHours(0,0,0,0);

        if (ret < today0) {
          toast.error("Return date cannot be in the past.", { theme: "dark" });
          setLoading(false);
          return;
        }
        if (ret.getTime() < leave.getTime()) {
          toast.error("Return date cannot be before leaving date.", { theme: "dark" });
          setLoading(false);
          return;
        }

        // double-check there isn't already a history record that makes this redundant
        if (isDateOverlappingHistory(date)) {
          toast.error("There is already a mess-off covering that date.", { theme: "dark" });
          setLoading(false);
          return;
        }

        // All validation passed — call /on
        const resp = await fetch(`${mainUri}/api/Messoff/on`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
          body: JSON.stringify({ student: student.id, return_date: date })
        });
        const res = await resp.json();
        if (res.success) {
          toast.success(res.message || "Mess on requested", { theme: "dark" });
          setDate("");
          setRequests(prev => prev + 1);
        } else {
          toast.error(res.message || "Error", { theme: "dark" });
        }
      }

      // Refresh status + history (same as before)
      const statusResp = await fetch(`${mainUri}/api/Messoff/status`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ student: student.id })
      });
      const statusJson = await statusResp.json();
      if (statusJson.success) {
        setPending(statusJson.pending || null);
        setApprovedActive(statusJson.approvedActive || null);
        if (statusJson.pending) setMode(statusJson.pending.status === 'pending' ? 'off_pending' : 'on_pending');
        else if (statusJson.approvedActive) setMode('on');
        else setMode('off');
      }

      await fetchHistory(student.id, monthFilter);
    } catch (err) {
      console.error(err);
      toast.error("Server error", { theme: "dark" });
    } finally {
      setLoading(false);
    }
  };

  const labels = ["Mess Off", "Requested Mess Off", "Mess Attended"];
  const daysofmonthtilltoday = new Date().getDate();

  const loader = (
    <svg aria-hidden="true" className="inline w-4 h-4 mr-2 animate-spin text-white fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M100 50.5908..." fill="currentColor" />
    </svg>
  );

  // months dropdown for history (last 6 months)
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
    <div className="w-full min-h-screen bg-[#f3e8ff] flex flex-col items-center justify-start pt-24 px-4 sm:px-6 md:px-10 lg:px-20 overflow-y-auto">
      <h1 className="text-[#4f46e] font-bold text-3xl sm:text-4xl lg:text-5xl mb-4 text-center">
        Mess Off
      </h1>

      <ul className="flex flex-col sm:flex-row gap-3 text-[#4f46e] text-base sm:text-lg md:text-xl text-center mb-6 w-full justify-center">
        <li>Total Mess: {daysofmonthtilltoday - Messoff}</li>
        <li>Mess Off: {loading ? loader : Messoff}</li>
        <li>Requests Sent: {loading ? loader : requests}</li>
      </ul>

      <div className="w-full flex flex-col lg:flex-row items-start justify-center gap-8 flex-wrap mb-10">
        <div className="flex flex-col items-center gap-4 w-full sm:w-[20rem]">
          <div className="w-full h-[250px] sm:h-[280px] md:h-[300px]">
            <Doughnut
              datasetIdKey="id"
              data={{
                labels,
                datasets: [
                  {
                    label: "Mess",
                    data: [Messoff, requests, daysofmonthtilltoday - Messoff],
                    backgroundColor: ["#F26916", "#EAB308", "#1D4ED8"],
                    hoverOffset: 10,
                  },
                ],
              }}
              options={{
                plugins: { legend: { display: false } },
                maintainAspectRatio: false,
              }}
            />
          </div>
        </div>

        <div className="w-full sm:w-[22rem] md:w-[26rem] max-h-[300px] p-4 border rounded-lg shadow bg-white border-neutral-900 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h5 className="text-xl font-bold text-[#4f46e]">Mess Off History</h5>
            <select value={monthFilter} onChange={(e)=> setMonthFilter(e.target.value)} className="border px-2 py-1 rounded">
              <option value="">Last month (default)</option>
              {monthsList.map(m => <option key={m.value} value={m.value}>{m.label}</option>)}
            </select>
          </div>
          <div className="flow-root">
            <ul className="divide-y divide-gray-300 text-[#4f46e]">
              {historyList.length === 0 ? (
                <li className="text-center text-sm">No Mess Off history</li>
              ) : historyList.map(h => (
                <li className="py-3" key={h._id}>
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="text-sm font-medium">{h.status.toUpperCase()}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(h.leaving_date).toDateString().slice(4,10)} to {h.return_date ? new Date(h.return_date).toDateString().slice(4,10) : "—"}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-gray-600">{new Date(h.request_date).toDateString().slice(4,10)}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* SINGLE DATE FORM */}
      <form onSubmit={handleSubmit} className="bg-white w-full lg:w-[40rem] p-6 rounded-lg shadow-xl">
        {mode === 'off_pending' && pending ? (
          <div className="mb-4">
            <p className="text-sm text-orange-600 font-semibold">Your mess-off request is pending ({new Date(pending.request_date).toDateString()})</p>
            <p className="text-sm text-gray-600">Leaving: {new Date(pending.leaving_date).toDateString().slice(4,10)}</p>
          </div>
        ) : mode === 'on_pending' && pending ? (
          <div className="mb-4">
            <p className="text-sm text-orange-600 font-semibold">Your mess-on request is pending ({new Date(pending.request_date).toDateString()})</p>
            <p className="text-sm text-gray-600">Requested return: {pending.return_date ? new Date(pending.return_date).toDateString().slice(4,10) : '-'}</p>
          </div>
        ) : approvedActive ? (
          // show form to request mess ON (return_date). mode 'on'
          <>
            <p className="mb-2 text-sm font-medium text-[#4f46e]">You are currently OFF since {new Date(approvedActive.leaving_date).toDateString().slice(4,10)}. Request Mess ON (select date):</p>
            <div className="flex gap-4">
              <Input field={{ name: "return date", type: "date", value: date, onChange: handleDateChange, req: true, min: (new Date()).toISOString().slice(0,10) }} />
            </div>
            <button type="submit" className="w-full text-white bg-green-600 hover:bg-green-700 rounded-lg px-5 py-2.5 mt-5">
              {loading ? (<div className="flex items-center gap-2 justify-center">{loader} Sending...</div>) : ("Request Mess On")}
            </button>
          </>
        ) : (
          // default: show OFF form (single leaving_date input) — only tomorrow allowed
          <>
            <p className="mb-2 text-sm font-medium text-[#4f46e]">Request Mess Off — choose leaving date (tomorrow only)</p>
            <div className="flex gap-4">
              <Input field={{ name: "leaving date", type: "date", value: date, onChange: handleDateChange, req: true, min: tomorrowStr, max: tomorrowStr }} />
            </div>
            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 rounded-lg px-5 py-2.5 mt-5">
              {loading ? (<div className="flex items-center gap-2 justify-center">{loader} Sending...</div>) : ("Request Mess Off")}
            </button>
          </>
        )}

        <ToastContainer theme="dark" />
      </form>
    </div>
  );
}

export default Mess;
