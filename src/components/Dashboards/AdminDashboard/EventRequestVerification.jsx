// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const EventRequestVerification = () => {
//   const [events, setEvents] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [statusUpdates, setStatusUpdates] = useState({});
//   const [activeTab, setActiveTab] = useState("Pending");

//   useEffect(() => {
//     const fetchEventData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/Event/EventFund/get");
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
//       alert("Please select a status before updating.");
//       return;
//     }
//     try {
//       await axios.put("http://localhost:3000/api/Event/EventFund/admin/update", {
//         eventFundId: eventId,
//         status: selectedStatus,
//       });
//       setEvents((prevEvents) =>
//         prevEvents.map((event) =>
//           event._id === eventId ? { ...event, status: selectedStatus } : event
//         )
//       );
//       alert("Status updated successfully!");
//     } catch (err) {
//       alert("Failed to update status.");
//       console.error(err);
//     }
//   };

//   const filteredEvents = events.filter((event) => event.status === activeTab.toLowerCase());

//   const tabs = ["Pending", "Success", "Failed"];

//   if (loading) return <p className="text-center text-white">Loading...</p>;
//   if (error) return <p className="text-center text-red-500">Error: {error}</p>;

//   return (
//     <div className="max-w-3xl mx-auto bg-[#111828] rounded-lg shadow-lg p-4 mt-12">
//       <h2 className="text-white text-center text-xl font-bold mb-4">Event Fund Requests</h2>

//       {/* Tabs */}
//       <div className="flex justify-center space-x-4 mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             className={`px-4 py-2 rounded-md ${
//               activeTab === tab
//                 ? "bg-blue-600 text-white"
//                 : "bg-gray-700 text-gray-300 hover:bg-gray-600"
//             }`}
//             onClick={() => setActiveTab(tab)}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Event Cards */}
//       {filteredEvents.length === 0 ? (
//         <p className="text-center text-gray-300">No events in "{activeTab}" tab.</p>
//       ) : (
//         filteredEvents.map((event) => (
//           <div key={event._id} className="mb-4 p-4 border border-gray-700 rounded-lg">
//             <p className="text-gray-300">
//               <span className="font-medium text-white">Requested by:</span> {event.name}
//             </p>
//             <p className="text-gray-300">
//               <span className="font-medium text-white">Fund Details:</span> {event.eventDetails}
//             </p>
//             <p className="text-gray-300">
//               <span className="font-medium text-white">Requested Fund:</span> ₹{event.fundRequired}
//             </p>
//             <p className="text-gray-300">
//               <span className="font-medium text-white">Status:</span>{" "}
//               <span
//                 className={`font-semibold ${
//                   event.status === "success"
//                     ? "text-green-400"
//                     : event.status === "failed"
//                     ? "text-red-400"
//                     : "text-yellow-400"
//                 }`}
//               >
//                 {event.status}
//               </span>
//             </p>

//             {/* Show dropdown and update button only if status is "pending" */}
//             {event.status === "pending" && (
//               <div className="mt-3 flex items-center space-x-4">
//                 <select
//                   className="bg-gray-700 text-white px-3 py-2 rounded-md outline-none"
//                   value={statusUpdates[event._id] || ""}
//                   onChange={(e) => handleStatusChange(event._id, e.target.value)}
//                 >
//                   <option value="">Select Status</option>
//                   <option value="success">Success</option>
//                   <option value="failed">Failed</option>
//                 </select>

//                 <button
//                   className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
//                   onClick={() => updateStatus(event._id)}
//                 >
//                   Update
//                 </button>
//               </div>
//             )}
//           </div>
//         ))
//       )}
//     </div>
//   );
// };

// export default EventRequestVerification;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EventRequestVerification = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [statusUpdates, setStatusUpdates] = useState({});
  const [activeTab, setActiveTab] = useState("Pending");

  useEffect(() => {
    const fetchEventData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/Event/EventFund/get");
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
      await axios.put("http://localhost:3000/api/Event/EventFund/admin/update", {
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

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (error) return <p className="text-center text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-3xl mx-auto bg-[#111828] rounded-lg shadow-lg p-4 mt-12">
      <h2 className="text-white text-center text-xl font-bold mb-4">Event Fund Requests</h2>

      {/* Tabs */}
      <div className="flex justify-center space-x-4 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 rounded-md ${
              activeTab === tab
                ? "bg-blue-600 text-white"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Event Cards */}
      {filteredEvents.length === 0 ? (
        <p className="text-center text-gray-300">No events in "{activeTab}" tab.</p>
      ) : (
        filteredEvents.map((event) => (
          <div key={event._id} className="mb-4 p-4 border border-gray-700 rounded-lg">
            <p className="text-gray-300">
              <span className="font-medium text-white">Requested by:</span> {event.name}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-white">Fund Details:</span> {event.eventDetails}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-white">Requested Fund:</span> ₹{event.fundRequired}
            </p>
            <p className="text-gray-300">
              <span className="font-medium text-white">Status:</span>{" "}
              <span
                className={`font-semibold ${
                  event.status === "success"
                    ? "text-green-400"
                    : event.status === "failed"
                    ? "text-red-400"
                    : "text-yellow-400"
                }`}
              >
                {event.status}
              </span>
            </p>

            {/* Dropdown and button for pending */}
            {event.status === "pending" && (
              <div className="mt-3 flex items-center space-x-4">
                <select
                  className="bg-gray-700 text-white px-3 py-2 rounded-md outline-none"
                  value={statusUpdates[event._id] || ""}
                  onChange={(e) => handleStatusChange(event._id, e.target.value)}
                >
                  <option value="">Select Status</option>
                  <option value="success">Success</option>
                  <option value="failed">Failed</option>
                </select>

                <button
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                  onClick={() => updateStatus(event._id)}
                >
                  Update
                </button>
              </div>
            )}
          </div>
        ))
      )}

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default EventRequestVerification;

