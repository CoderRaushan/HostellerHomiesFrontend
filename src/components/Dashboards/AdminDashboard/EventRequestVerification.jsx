// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const EventRequestVerification = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [statusUpdates, setStatusUpdates] = useState({});
//   const [activeTab, setActiveTab] = useState("Pending");

//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         const response = await axios.get("https://hostellerhomesbackend.onrender.com/api/Event/EventFund/get");
//         setEvents(response.data.eventFundData);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchEventData();
//   }, []);

//   const handleStatusChange = (eventId, newStatus) => {
//     setStatusUpdates((prev) => ({
//       ...prev,
//       [eventId]: newStatus,
//     }));
//   };

//   const updateStatus = async (eventId) => {
//     const selectedStatus = statusUpdates[eventId];
//     if (!selectedStatus) {
//       toast.warn("Please select a status before updating.");
//       return;
//     }
//     try {
//       await axios.put("https://hostellerhomesbackend.onrender.com/api/Event/EventFund/admin/update", {
//         eventFundId: eventId,
//         status: selectedStatus,
//       });
//       setEvents((prevEvents) =>
//         prevEvents.map((event) =>
//           event._id === eventId ? { ...event, status: selectedStatus } : event
//         )
//       );
//       toast.success("Status updated successfully!");
//     } catch (err) {
//       toast.error("Failed to update status.");
//       console.error(err);
//     }
//   };

//   const filteredEvents = events.filter((event) => event.status === activeTab.toLowerCase());

//   const tabs = ["Pending", "Success", "Failed"];

//   if (loading) return <p className="text-center text-black">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 mt-24">
//       <h2 className="text-black text-center text-xl font-bold mb-6">Event Fund Requests</h2>

//       {/* Tabs */}
//       <div className="flex justify-center space-x-4 mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`px-4 py-2 rounded-md ${
//               activeTab === tab
//                 ? "bg-[#4f46e5] text-white"
//                 : "bg-gray-100 text-gray-600 hover:bg-gray-200"
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Event Cards */}
//       {filteredEvents.length === 0 ? (
//         <p className="text-center text-gray-500">No events in "{activeTab}" tab.</p>
//       ) : (
//         filteredEvents.map((event) => (
//           <div key={event._id} className="mb-4 p-5 border border-gray-200 rounded-lg bg-white shadow-sm">
//             <p className="text-gray-700">
//               <span className="font-medium text-black">Requested by:</span> {event.name}
//             </p>
//             <p className="text-gray-700">
//               <span className="font-medium text-black">Fund Details:</span> {event.eventDetails}
//             </p>
//             <p className="text-gray-700">
//               <span className="font-medium text-black">Requested Fund:</span> ₹{event.fundRequired}
//             </p>
//             <p className="text-gray-700">
//               <span className="font-medium text-black">Status:</span>{" "}
//               <span
//                 className={`font-semibold ${
//                   event.status === "success"
//                     ? "text-green-600"
//                     : event.status === "failed"
//                     ? "text-red-600"
//                     : "text-yellow-600"
//                 }`}
//               >
//                 {event.status}
//               </span>
//             </p>

//             {/* Dropdown and button for pending */}
//             {event.status === "pending" && (
//               <div className="mt-4 flex items-center space-x-4">
//                 <select
//                   className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5]"
//                   value={statusUpdates[event._id] || ""}
//                   onChange={(e) => handleStatusChange(event._id, e.target.value)}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="success">Success</option>
//                   <option value="failed">Failed</option>
//                 </select>

//                 <button
//                   className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-md"
//                   onClick={() => updateStatus(event._id)}
//                 >
//                   Update
//                 </button>
//               </div>
//             )}
//           </div>
//         ))
//       )}

//       {/* Toast Container */}
//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// };

// export default EventRequestVerification;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventRequestVerification = () => {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [activeTab, setActiveTab] = useState("Pending");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get(`${mainUri}/api/Event/EventFund/get`);
        setEvents(response.data.eventFundData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEventData();
  }, []);

  const handleStatusChange = (eventId, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [eventId]: newStatus,
    }));
  };

  const updateStatus = async (eventId) => {
    const selectedStatus = statusUpdates[eventId];
    if (!selectedStatus) {
      toast.warn("Please select a status before updating.");
      return;
    }
    try {
      await axios.put(`${mainUri}/api/Event/EventFund/admin/update`, {
        eventFundId: eventId,
        status: selectedStatus,
      });
      setEvents((prevEvents) =>
        prevEvents.map((event) =>
          event._id === eventId ? { ...event, status: selectedStatus } : event
        )
      );
      toast.success("Status updated successfully!");
    } catch (err) {
      toast.error("Failed to update status.");
      console.error(err);
    }
  };

  const filteredEvents = events.filter((event) => event.status === activeTab.toLowerCase());

  const tabs = ["Pending", "Success", "Failed"];

  if (loading) return <p className="text-center text-black">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 mt-24">
      <h2 className="text-black text-center text-xl font-bold mb-6">Event Fund Requests</h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? "bg-[#4f46e5] text-white"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Event Cards with scroll */}
      <div className="max-h-[500px] overflow-y-auto space-y-4">
        {filteredEvents.length === 0 ? (
          <p className="text-center text-gray-500">No events in "{activeTab}" tab.</p>
        ) : (
          filteredEvents.map((event) => (
            <div
              key={event._id}
              className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm"
            >
              <p className="text-gray-700">
                <span className="font-medium text-black">Requested by:</span> {event.name}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-black">Fund Details:</span> {event.eventDetails}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-black">Requested Fund:</span> ₹{event.fundRequired}
              </p>
              <p className="text-gray-700">
                <span className="font-medium text-black">Status:</span>{" "}
                <span
                  className={`font-semibold ${
                    event.status === "success"
                      ? "text-green-600"
                      : event.status === "failed"
                      ? "text-red-600"
                      : "text-yellow-600"
                  }`}
                >
                  {event.status}
                </span>
              </p>

              {/* Dropdown and button for pending */}
              {event.status === "pending" && (
                <div className="mt-4 flex items-center space-x-4">
                  <select
                    className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-[#4f46e5]"
                    value={statusUpdates[event._id] || ""}
                    onChange={(e) => handleStatusChange(event._id, e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="success">Success</option>
                    <option value="failed">Failed</option>
                  </select>

                  <button
                    className="bg-[#4f46e5] hover:bg-[#4338ca] text-white px-4 py-2 rounded-md"
                    onClick={() => updateStatus(event._id)}
                  >
                    Update
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EventRequestVerification;
