// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EventRequestVerification = () => {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const token = localStorage.getItem("token");
//   const [events, setEvents] = useState([]);
//   const [remarks, setRemarks] = useState({});
//   const [loading, setLoading] = useState(true);
//   const warden=JSON.parse(localStorage.getItem("Warden"));
//   console.log(warden.hostelNo)

//   const fetchEvents = async () => {
//     try {
//       const res = await axios.get(`${mainUri}/api/Event/EventFund/get?hostelNumber=${warden?.hostelNo}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       console.log(res.data.eventFundData)
//       setEvents(res.data.eventFundData);
//     } catch {
//       toast.error("Failed to fetch data");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchEvents();
//   }, []);

//   const handleAction = async (id, action) => {
//     try {
//       await axios.put(
//         `${mainUri}/api/Event/EventFund/warden/action`,
//         {
//           eventFundId: id,
//           status: action,
//           remark: remarks[id] || "",
//         },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       toast.success(`Request ${action}!`);
//       fetchEvents();
//     } catch {
//       toast.error("Failed to update");
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 mt-24">
//       <h2 className="text-center text-xl font-bold text-black mb-6">
//         Warden Event Fund Requests
//       </h2>
//       {loading ? (
//         <p>Loading...</p>
//       ) : (
//         events
//           .filter((e) => e.status === "pending")
//           .map((event) => (
//             <div
//               key={event._id}
//               className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm mb-4"
//             >
//               <h3 className="text-[#4f46e5] font-semibold text-lg mb-1">
//                 {event.name} - {event.urn}
//               </h3>
//               <p>{event.eventDetails}</p>
//               <p className="text-sm text-gray-600 mb-2">
//                 ₹{event.fundRequired} | Hostel {event.hostelNumber}
//               </p>
//               <textarea
//                 placeholder="Remark (optional)"
//                 className="border w-full px-3 py-2 rounded-md mb-2"
//                 value={remarks[event._id] || ""}
//                 onChange={(e) =>
//                   setRemarks((prev) => ({ ...prev, [event._id]: e.target.value }))
//                 }
//               />
//               <div className="flex gap-3">
//                 <button
//                   onClick={() => handleAction(event._id, "approved")}
//                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
//                 >
//                   Approve
//                 </button>
//                 <button
//                   onClick={() => handleAction(event._id, "rejected")}
//                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
//                 >
//                   Reject
//                 </button>
//               </div>
//             </div>
//           ))
//       )}
//       <ToastContainer />
//     </div>
//   );
// };

// export default EventRequestVerification;
// // // import React, { useEffect, useState } from "react";
// // // import axios from "axios";
// // // import { ToastContainer, toast } from "react-toastify";
// // // import "react-toastify/dist/ReactToastify.css";

// // // const EventRequestVerification = () => {
// // //   const mainUri = import.meta.env.VITE_MAIN_URI;
// // //   const token = localStorage.getItem("token");
// // //   const [events, setEvents] = useState([]);
// // //   const [remarks, setRemarks] = useState({});
// // //   const [loading, setLoading] = useState(true);

// // //   // ✅ Fetch all event fund requests (last 1 month only)
// // //   const fetchEvents = async () => {
// // //     try {
// // //       const res = await axios.get(`${mainUri}/api/Event/EventFund/get`, {
// // //         headers: { Authorization: `Bearer ${token}` },
// // //       });
// // //       setEvents(res.data.eventFundData);
// // //     } catch (err) {
// // //       toast.error("Failed to fetch event fund requests");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     fetchEvents();
// // //   }, []);

// // //   // ✅ Approve or Reject Request
// // //   const handleAction = async (id, action) => {
// // //     try {
// // //       await axios.put(
// // //         `${mainUri}/api/Event/EventFund/warden/action`,
// // //         {
// // //           eventFundId: id,
// // //           status: action,
// // //           remark: remarks[id] || "",
// // //         },
// // //         {
// // //           headers: { Authorization: `Bearer ${token}` },
// // //         }
// // //       );
// // //       toast.success(`Request ${action}!`);
// // //       fetchEvents(); // refresh list
// // //     } catch (err) {
// // //       toast.error("Failed to update request");
// // //     }
// // //   };

// // //   return (
// // //     <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 mt-24 ">
// // //       <h2 className="text-center text-2xl font-bold text-black mb-6">
// // //         Warden Event Fund Requests
// // //       </h2>

// // //       {loading ? (
// // //         <p className="text-center text-gray-600">Loading...</p>
// // //       ) : (
// // //         <>
// // //           {/* ✅ Pending Requests Section */}
// // //           <h3 className="text-lg font-semibold text-gray-700 mt-6 mb-3">
// // //             Pending Requests
// // //           </h3>

// // //           {events.filter((e) => e.status === "pending").length === 0 && (
// // //             <p className="text-gray-500 mb-4">No pending requests 🎉</p>
// // //           )}

// // //           {events
// // //             .filter((e) => e.status === "pending")
// // //             .map((event) => (
// // //               <div
// // //                 key={event._id}
// // //                 className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm mb-4"
// // //               >
// // //                 <h3 className="text-[#4f46e5] font-semibold text-lg mb-1">
// // //                   {event.name} - {event.urn}
// // //                 </h3>
// // //                 <p className="text-gray-700 mb-1">{event.eventDetails}</p>
// // //                 <p className="text-sm text-gray-600 mb-2">
// // //                   ₹{event.fundRequired} | Hostel {event.hostelNumber}
// // //                 </p>

// // //                 <textarea
// // //                   placeholder="Remark (optional)"
// // //                   className="border w-full px-3 py-2 rounded-md mb-2"
// // //                   value={remarks[event._id] || ""}
// // //                   onChange={(e) =>
// // //                     setRemarks((prev) => ({
// // //                       ...prev,
// // //                       [event._id]: e.target.value,
// // //                     }))
// // //                   }
// // //                 />

// // //                 <div className="flex gap-3">
// // //                   <button
// // //                     onClick={() => handleAction(event._id, "approved")}
// // //                     className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
// // //                   >
// // //                     Approve
// // //                   </button>
// // //                   <button
// // //                     onClick={() => handleAction(event._id, "rejected")}
// // //                     className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
// // //                   >
// // //                     Reject
// // //                   </button>
// // //                 </div>
// // //               </div>
// // //             ))}

// // //           {/* ✅ Last Month's Verified Requests */}
// // //           <h3 className="text-lg font-semibold text-gray-700 mt-8 mb-3">
// // //             Last Month’s Verified Requests
// // //           </h3>

// // //           {events.filter((e) => e.status !== "pending").length === 0 && (
// // //             <p className="text-gray-500">No verified requests in the last month.</p>
// // //           )}

// // //           {events
// // //             .filter((e) => e.status !== "pending")
// // //             .map((event) => (
// // //               <div
// // //                 key={event._id}
// // //                 className="p-5 border border-gray-200 rounded-lg bg-gray-50 shadow-sm mb-4"
// // //               >
// // //                 <h3 className="text-[#4f46e5] font-semibold text-lg mb-1">
// // //                   {event.name} - {event.urn}
// // //                 </h3>
// // //                 <p className="text-gray-700 mb-1">{event.eventDetails}</p>
// // //                 <p className="text-sm text-gray-600">
// // //                   ₹{event.fundRequired} | Hostel {event.hostelNumber}
// // //                 </p>

// // //                 <p className="text-sm mt-1">
// // //                   <strong>Status:</strong>{" "}
// // //                   <span
// // //                     className={
// // //                       event.status.includes("approved")
// // //                         ? "text-green-600"
// // //                         : "text-red-600"
// // //                     }
// // //                   >
// // //                     {event.status}
// // //                   </span>
// // //                 </p>

// // //                 {event.wardenApproval?.remark && (
// // //                   <p className="text-gray-500 text-sm mt-1">
// // //                     <strong>Remark:</strong> {event.wardenApproval.remark}
// // //                   </p>
// // //                 )}

// // //                 <p className="text-xs text-gray-400 mt-1">
// // //                   Updated: {new Date(event.updatedAt).toLocaleDateString()}
// // //                 </p>
// // //               </div>
// // //             ))}
// // //         </>
// // //       )}
// // //       <ToastContainer />
// // //     </div>
// // //   );
// // // };

// // // export default EventRequestVerification;

// // import React, { useEffect, useState } from "react";
// // import axios from "axios";
// // import { ToastContainer, toast } from "react-toastify";
// // import "react-toastify/dist/ReactToastify.css";

// // const EventRequestVerification = () => {
// //   const mainUri = import.meta.env.VITE_MAIN_URI;
// //   const token = localStorage.getItem("token");
// //   const warden = JSON.parse(localStorage.getItem("Warden"));
// //   const [events, setEvents] = useState([]);
// //   const [history, setHistory] = useState([]);
// //   const [remarks, setRemarks] = useState({});
// //   const [loading, setLoading] = useState(true);
// //   const [activeTab, setActiveTab] = useState("pending");

// //   // ✅ Fetch Event Requests
// //   const fetchEvents = async () => {
// //     try {
// //       const res = await axios.get(`${mainUri}/api/Event/EventFund/get?hostelNumber=${warden?.hostelNo}`, {
// //         headers: { Authorization: `Bearer ${token}` },
// //       });
// //       console.log(res);

// //       const allData = res.data.eventFundData || [];

// //       // Warden pending requests
// //       const pendingRequests = allData.filter((e) => e.status === "pending");

// //       // Verified history (last 1 month)
// //       const oneMonthAgo = new Date();
// //       oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

// //       const verifiedHistory = allData.filter(
// //         (e) =>
// //           (e.status === "approved" || e.status === "rejected") &&
// //           new Date(e.updatedAt) >= oneMonthAgo
// //       );

// //       setEvents(pendingRequests);
// //       setHistory(verifiedHistory);
// //     } catch(err) {
// //       console.log(err);
// //       toast.error("Failed to fetch event requests");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     fetchEvents();
// //   }, []);

// //   // ✅ Approve or Reject
// //   const handleAction = async (id, action) => {
// //     try {
// //       await axios.put(
// //         `${mainUri}/api/Event/EventFund/warden/action`,
// //         {
// //           eventFundId: id,
// //           status: action,
// //           remark: remarks[id] || "",
// //         },
// //         {
// //           headers: { Authorization: `Bearer ${token}` },
// //         }
// //       );
// //       toast.success(`Request ${action}!`);
// //       fetchEvents();
// //     } catch {
// //       toast.error("Failed to update request");
// //     }
// //   };

// //   return (
// //     <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 mt-24">
// //       <h2 className="text-center text-2xl font-bold text-black mb-6">
// //         Warden Event Fund Management
// //       </h2>

// //       {/* Tabs */}
// //       <div className="flex justify-center gap-6 mb-6">
// //         <button
// //           className={`px-4 py-2 rounded-md font-semibold ${
// //             activeTab === "pending"
// //               ? "bg-indigo-600 text-white"
// //               : "bg-gray-200 text-gray-700"
// //           }`}
// //           onClick={() => setActiveTab("pending")}
// //         >
// //           Pending Requests
// //         </button>
// //         <button
// //           className={`px-4 py-2 rounded-md font-semibold ${
// //             activeTab === "history"
// //               ? "bg-indigo-600 text-white"
// //               : "bg-gray-200 text-gray-700"
// //           }`}
// //           onClick={() => setActiveTab("history")}
// //         >
// //           Last 1 Month History
// //         </button>
// //       </div>

// //       {loading ? (
// //         <p className="text-center text-gray-600">Loading...</p>
// //       ) : activeTab === "pending" ? (
// //         events.length === 0 ? (
// //           <p className="text-center text-gray-500">No pending requests 🎉</p>
// //         ) : (
// //           events.map((event) => (
// //             <div
// //               key={event._id}
// //               className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm mb-4"
// //             >
// //               <h3 className="text-[#4f46e5] font-semibold text-lg mb-1">
// //                 {event.name} - {event.urn}
// //               </h3>
// //               <p className="text-gray-800 mb-1">{event.eventDetails}</p>
// //               <p className="text-sm text-gray-600 mb-2">
// //                 ₹{event.fundRequired} | Hostel {event.hostelNumber}
// //               </p>

// //               <textarea
// //                 placeholder="Remark (optional)"
// //                 className="border w-full px-3 py-2 rounded-md mb-2"
// //                 value={remarks[event._id] || ""}
// //                 onChange={(e) =>
// //                   setRemarks((prev) => ({
// //                     ...prev,
// //                     [event._id]: e.target.value,
// //                   }))
// //                 }
// //               />

// //               <div className="flex gap-3">
// //                 <button
// //                   onClick={() => handleAction(event._id, "approved")}
// //                   className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
// //                 >
// //                   Approve
// //                 </button>
// //                 <button
// //                   onClick={() => handleAction(event._id, "rejected")}
// //                   className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
// //                 >
// //                   Reject
// //                 </button>
// //               </div>
// //             </div>
// //           ))
// //         )
// //       ) : (
// //         // ✅ History Tab
// //         <div>
// //           {history.length === 0 ? (
// //             <p className="text-center text-gray-500">
// //               No verified requests in the last month.
// //             </p>
// //           ) : (
// //             history.map((event) => (
// //               <div
// //                 key={event._id}
// //                 className="p-5 border border-gray-200 rounded-lg bg-gray-50 shadow-sm mb-4"
// //               >
// //                 <h3 className="text-[#4f46e5] font-semibold text-lg mb-1">
// //                   {event.name} - {event.urn}
// //                 </h3>
// //                 <p className="text-gray-800 mb-1">{event.eventDetails}</p>
// //                 <p className="text-sm text-gray-600 mb-1">
// //                   ₹{event.fundRequired} | Hostel {event.hostelNumber}
// //                 </p>

// //                 <p className="text-sm">
// //                   <strong>Status:</strong>{" "}
// //                   {event.status === "approved" ? (
// //                     <span className="text-green-600">Approved</span>
// //                   ) : (
// //                     <span className="text-red-600">Rejected</span>
// //                   )}
// //                 </p>

// //                 {event.wardenApproval?.remark && (
// //                   <p className="text-gray-600 text-sm mt-1">
// //                     <strong>Remark:</strong> {event.wardenApproval.remark}
// //                   </p>
// //                 )}

// //                 <p className="text-xs text-gray-400 mt-1">
// //                   Updated: {new Date(event.updatedAt).toLocaleDateString()}
// //                 </p>
// //               </div>
// //             ))
// //           )}
// //         </div>
// //       )}

// //       <ToastContainer />
// //     </div>
// //   );
// // };

// // export default EventRequestVerification;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventRequestVerification = () => {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const token = localStorage.getItem("token");
  const warden = JSON.parse(localStorage.getItem("Warden"));
  const [events, setEvents] = useState([]);
  const [history, setHistory] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");

  // ✅ Fetch data from backend
  const fetchEvents = async () => {
  try {
    setLoading(true);
    const res = await axios.get(
      `${mainUri}/api/Event/EventFund/get?hostelNumber=${warden?.hostelNo}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );

    if (res.data.success) {
      const allData = res.data.eventFundData || [];

      // Pending = Waiting for warden action
      const pendingRequests = allData.filter((e) => e.status === "pending");

      // History = Requests already processed by warden in last 1 month
      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const verifiedHistory = allData.filter(
        (e) =>
          (e.status === "warden_approved" || e.status === "warden_rejected") &&
          new Date(e.updatedAt) >= oneMonthAgo
      );

      setEvents(pendingRequests);
      setHistory(verifiedHistory);

      // 🟢 Optional: show success msg
      // toast.success("Event data fetched successfully!");
    } else {
      // 🔴 Show backend error message if success is false
      toast.error(res.data.msg || "Failed to fetch event data");
    }
  } catch (err) {
    // 🔴 Catch and display backend msg
    const errorMsg =
      err.response?.data?.msg || "Failed to fetch event data from server";
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEvents();
  }, []);

  // ✅ Handle Approve / Reject
  const handleAction = async (id, action) => {
  try {
    const res = await axios.put(
      `${mainUri}/api/Event/EventFund/warden/action`,
      {
        eventFundId: id,
        status: action,
        remark: remarks[id] || "",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 🟢 Display backend success message
    toast.success(res.data.msg || `Request ${action} successfully!`);
    fetchEvents();
  } catch (err) {
    // 🔴 Display backend error message
    const errorMsg =
      err.response?.data?.msg || "Failed to update request";
    toast.error(errorMsg);
  }
};

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 mt-24">
      <h2 className="text-center text-2xl font-bold text-black mb-6">
        Warden Event Fund Management
      </h2>

      {/* Tabs */}
      <div className="flex justify-center gap-6 mb-6">
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "pending"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("pending")}
        >
          Pending Requests
        </button>
        <button
          className={`px-4 py-2 rounded-md font-semibold ${
            activeTab === "history"
              ? "bg-indigo-600 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setActiveTab("history")}
        >
          Last 1 Month History
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : activeTab === "pending" ? (
        // ✅ Pending tab
        events.length === 0 ? (
          <p className="text-center text-gray-500">No pending requests 🎉</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm mb-4"
            >
              <h3 className="text-[#4f46e5] font-semibold text-lg mb-1">
                {event.name} - {event.urn}
              </h3>
              <p className="text-gray-800 mb-1">{event.eventDetails}</p>
              <p className="text-sm text-gray-600 mb-2">
                ₹{event.fundRequired} | Hostel {event.hostelNumber}
              </p>

              <textarea
                placeholder="Remark (optional)"
                className="border w-full px-3 py-2 rounded-md mb-2"
                value={remarks[event._id] || ""}
                onChange={(e) =>
                  setRemarks((prev) => ({
                    ...prev,
                    [event._id]: e.target.value,
                  }))
                }
              />

              <div className="flex gap-3">
                <button
                  onClick={() => handleAction(event._id, "approved")}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                >
                  Approve
                </button>
                <button
                  onClick={() => handleAction(event._id, "rejected")}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md"
                >
                  Reject
                </button>
              </div>
            </div>
          ))
        )
      ) : (
        // ✅ History tab
        <div>
          {history.length === 0 ? (
            <p className="text-center text-gray-500">
              No requests verified in the last month.
            </p>
          ) : (
            history
              .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
              .map((event) => (
                <div
                  key={event._id}
                  className="p-5 border border-gray-200 rounded-lg bg-gray-50 shadow-sm mb-4"
                >
                  <h3 className="text-[#4f46e5] font-semibold text-lg mb-1">
                    {event.name} - {event.urn}
                  </h3>
                  <p>{event.eventDetails}</p>
                  <p className="text-sm text-gray-600 mb-1">
                    ₹{event.fundRequired} | Hostel {event.hostelNumber}
                  </p>
                  <p className="text-sm">
                    <strong>
                      Warden Status: {event.wardenApproval?.status}
                    </strong>{" "}
                    | <strong>Remark:</strong>{" "}
                    {event.wardenApproval?.remark || "None"}
                  </p>
                  <p className="text-sm">
                    <strong>
                      Current Status:{" "} {event.status}</strong>{" "}
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Updated: {new Date(event.updatedAt).toLocaleString()}
                  </p>
                </div>
              ))
          )}
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default EventRequestVerification;
