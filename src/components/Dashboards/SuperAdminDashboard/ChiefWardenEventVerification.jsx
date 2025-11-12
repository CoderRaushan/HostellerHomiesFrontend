import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ChiefWardenEventVerification = () => {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const token = localStorage.getItem("token");
  const [events, setEvents] = useState([]);
  const [history, setHistory] = useState([]);
  const [remarks, setRemarks] = useState({});
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("pending");
  const [selectedHostel, setSelectedHostel] = useState("1"); // 🧩 Default hostel

  // Fetch all event requests (with hostel filter)
  const fetchEvents = async () => { 
  try {
    setLoading(true);
    const res = await axios.get(
      `${mainUri}/api/Event/EventFund/get?hostelNumber=${selectedHostel}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      const allData = res.data.eventFundData || [];

      const pendingRequests = allData.filter(
        (e) => e.status === "warden_approved"
      );

      const oneMonthAgo = new Date();
      oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

      const recentHistory = allData.filter(
        (e) =>
          (e.status === "chief_approved" ||
            e.status === "chief_rejected" ||
            e.status === "warden_rejected") &&
          new Date(e.updatedAt) >= oneMonthAgo
      );

      setEvents(pendingRequests);
      setHistory(recentHistory);

      // 🟢 Optional: show a success message
      // toast.success("Event fund data loaded successfully!");
    } else {
      // 🔴 Show message if backend indicates failure
      toast.error(res.data.msg || "Failed to load data");
    }
  } catch (err) {
    const errorMsg =
      err.response?.data?.msg || "Failed to fetch data from server";
    toast.error(errorMsg);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    fetchEvents();
  }, [selectedHostel]); // 🧩 Re-fetch whenever hostel changes

  const handleAction = async (id, action) => {
  try {
    const res = await axios.put(
      `${mainUri}/api/Event/EventFund/chief/action`,
      {
        eventFundId: id,
        status: action,
        remark: remarks[id] || "",
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    // 🟢 Show backend success message
    toast.success(res.data.msg || `Request ${action} successfully!`);

    // Refresh the data
    fetchEvents();
  } catch (err) {
    // 🔴 Show backend error message properly
    const errorMsg =
      err.response?.data?.msg || "Something went wrong. Please try again.";
    toast.error(errorMsg);
  }
};


  return (
    <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md p-6 mt-24">
      <h2 className="text-center text-2xl font-bold text-black mb-6">
        Chief Warden Event Fund Management
      </h2>

      {/* 🧩 Hostel Filter Dropdown */}
      <div className="flex justify-center mb-6">
        <select
          value={selectedHostel}
          onChange={(e) => setSelectedHostel(e.target.value)}
          className="border border-gray-300 px-4 py-2 rounded-md text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        >
          <option value="1">Hostel 1</option>
          <option value="2">Hostel 2</option>
          <option value="3">Hostel 3</option>
          <option value="4">Hostel 4</option>
          <option value="5">Hostel 5</option>
        </select>
      </div>

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
        <p>Loading...</p>
      ) : activeTab === "pending" ? (
        events.length === 0 ? (
          <p>No new requests for Hostel {selectedHostel}.</p>
        ) : (
          events.map((event) => (
            <div
              key={event._id}
              className="p-5 border border-gray-200 rounded-lg bg-white shadow-sm mb-4"
            >
              <h3 className="text-[#4f46e5] font-semibold text-lg mb-1">
                {event.name} - {event.urn}
              </h3>
              <p className="text-gray-800">{event.eventDetails}</p>
              <p className="text-sm text-gray-600 mb-2">
                ₹{event.fundRequired} | Hostel {event.hostelNumber}
              </p>
              <p className="text-sm text-green-700 mb-2">
                <strong>Warden Remark:</strong>{" "}
                {event.wardenApproval?.remark || "None"}
              </p>

              <textarea
                placeholder="Chief remark"
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
        // History Tab
        <div>
          {history.length === 0 ? (
            <p>No history for Hostel {selectedHostel} (last 1 month).</p>
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
                    {event.chiefApproval?.status != "pending" && (
                      <>
                        <strong>
                          Chief Warden Status: {event.chiefApproval?.status}
                        </strong>{" "}
                        |{" "}<strong>Remark:</strong>{" "}
                        {event.chiefApproval?.remark || "None"}
                      </>
                    )}
                  </p>

                  <p className="text-sm">
                    <strong>Current Status: {event?.status}</strong>{" "}
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

export default ChiefWardenEventVerification;
