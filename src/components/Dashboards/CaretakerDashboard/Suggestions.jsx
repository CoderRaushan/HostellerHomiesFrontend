import { useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";

function CaretakerSuggestions() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const caretaker = JSON.parse(localStorage.getItem("Caretaker"));
  const token = localStorage.getItem("token");

  const [loading, setLoading] = useState(true);
  const [loader, setLoader] = useState(false);
  const [suggestions, setSuggestions] = useState([]);
  const [history, setHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchHistory, setSearchHistory] = useState("");

  // ==========================================================
  // 🔹 Get pending hostel suggestions
  // ==========================================================
  const getSuggestions = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${mainUri}/api/suggestion/hostel-suggestions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ HostelNo: caretaker.hostelNo }),
      });

      const data = await res.json();
      if (data.success) {
        const pending = data.suggestions.filter((s) => s.status === "pending");
        setSuggestions(pending);
      } else {
        toast.error("Failed to fetch hostel suggestions");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading hostel suggestions");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // 🔹 Get hostel suggestion history (1 month)
  // ==========================================================
  const getHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${mainUri}/api/suggestion/hostel-suggestions-history`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ HostelNo: caretaker.hostelNo }),
        }
      );

      const data = await res.json();
      if (data.success) {
        setHistory(data.suggestions);
      } else {
        toast.error("Failed to fetch hostel suggestion history");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error loading hostel suggestion history");
    } finally {
      setLoading(false);
    }
  };

  // ==========================================================
  // 🔹 Approve Suggestion
  // ==========================================================
  const approveSuggestion = async (id) => {
    setLoader(true);
    try {
      const res = await fetch(`${mainUri}/api/suggestion/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: "approved" }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success("Suggestion Approved");
        getSuggestions();
      } else {
        toast.error("Something went wrong");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error approving suggestion");
    } finally {
      setLoader(false);
    }
  };

  // ==========================================================
  // 🔹 Search Filtering (Optimized)
  // ==========================================================
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [debouncedHistoryQuery, setDebouncedHistoryQuery] = useState("");

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery.trim().toLowerCase());
    }, 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedHistoryQuery(searchHistory.trim().toLowerCase());
    }, 200);
    return () => clearTimeout(handler);
  }, [searchHistory]);

  const filteredSuggestions = useMemo(() => {
    if (!debouncedQuery) return suggestions;
    return suggestions.filter((s) => {
      const title = String(s.title || "").toLowerCase();
      const desc = String(s.description || "").toLowerCase();
      const name = String(s.student?.name || "").toLowerCase();
      const urn = String(s.student?.urn || "").toLowerCase();
      return (
        title.includes(debouncedQuery) ||
        desc.includes(debouncedQuery) ||
        name.includes(debouncedQuery) ||
        urn.includes(debouncedQuery)
      );
    });
  }, [suggestions, debouncedQuery]);

  const filteredHistory = useMemo(() => {
    if (!debouncedHistoryQuery) return history;
    return history.filter((s) => {
      const title = String(s.title || "").toLowerCase();
      const desc = String(s.description || "").toLowerCase();
      const name = String(s.student?.name || "").toLowerCase();
      const urn = String(s.student?.urn || "").toLowerCase();
      return (
        title.includes(debouncedHistoryQuery) ||
        desc.includes(debouncedHistoryQuery) ||
        name.includes(debouncedHistoryQuery) ||
        urn.includes(debouncedHistoryQuery)
      );
    });
  }, [history, debouncedHistoryQuery]);

  // ==========================================================
  // 🔹 Load Data Initially
  // ==========================================================
  useEffect(() => {
    getSuggestions();
    getHistory();
  }, []);

  // ==========================================================
  // 🔹 UI
  // ==========================================================
  return (
    <div className="m-14 w-full min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-7xl">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-gray-800 font-bold text-4xl mb-2 tracking-tight">
            Hostel Suggestions Dashboard
          </h1>
          <div className="h-1 w-24 bg-blue-600 mx-auto rounded-full"></div>
        </div>

        {/* Two sections side-by-side */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* ===== Pending Suggestions ===== */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 border-b border-gray-200 gap-4">
              <h2 className="text-gray-800 font-semibold text-lg md:text-xl">
                Pending Suggestions
              </h2>
              <input
                type="search"
                placeholder="Search..."
                className="block w-full md:w-60 pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="p-6 max-h-[70vh] overflow-auto">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader />
                </div>
              ) : filteredSuggestions.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                  No pending suggestions found.
                </p>
              ) : (
                filteredSuggestions.map((s) => (
                  <div
                    key={s._id}
                    className="p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition duration-200 shadow-sm hover:shadow-md mb-4"
                  >
                    <p className="text-lg font-semibold text-gray-900">
                      {s.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {s.description}
                    </p>
                    <p className="text-sm text-gray-500 mt-2">
                      By: {s.student?.name} | Room {s.student?.room_no}
                    </p>
                    <button
                      onClick={() => approveSuggestion(s._id)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg mt-3"
                    >
                      {loader ? <Loader /> : "Approve"}
                    </button>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ===== History Section ===== */}
          <div className="bg-white rounded-2xl shadow-xl border border-gray-200">
            <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 border-b border-gray-200 gap-4">
              <h2 className="text-gray-800 font-semibold text-lg md:text-xl">
                Last 1 Month History
              </h2>
              <input
                type="search"
                placeholder="Search history..."
                className="block w-full md:w-60 pl-3 pr-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchHistory}
                onChange={(e) => setSearchHistory(e.target.value)}
              />
            </div>

            <div className="p-6 max-h-[70vh] overflow-auto">
              {loading ? (
                <div className="flex justify-center items-center h-40">
                  <Loader />
                </div>
              ) : filteredHistory.length === 0 ? (
                <p className="text-center text-gray-500 py-10">
                  No history found.
                </p>
              ) : (
                filteredHistory.map((s) => (
                  <div
                    key={s._id}
                    className="p-5 bg-gray-50 hover:bg-gray-100 rounded-xl border border-gray-200 transition duration-200 shadow-sm hover:shadow-md mb-4"
                  >
                    <p className="text-lg font-semibold text-gray-900">
                      {s.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {s.description}
                    </p>
                    <p
                      className={`text-sm font-medium mt-2 ${
                        s.status === "approved"
                          ? "text-green-600"
                          : "text-yellow-600"
                      }`}
                    >
                      Status: {s.status}
                    </p>
                    <p className="text-sm text-gray-500">
                      Date: {new Date(s.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-500">
                      By: {s.student?.name} ({s.student?.urn})
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Refresh Button */}
        <div className="flex justify-end items-center px-6 mt-6">
          <button
            onClick={() => {
              getSuggestions();
              getHistory();
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow-sm transition-colors duration-150"
          >
            Refresh All
          </button>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="light" />
    </div>
  );
}

export default CaretakerSuggestions;
