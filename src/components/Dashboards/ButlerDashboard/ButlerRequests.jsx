// src/components/ButlerRequests.jsx
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/**
 * ButlerRequests
 * - lists pending requests from /api/requests/pending
 * - Approve button calls POST /api/requests/:id/approve with butlerId
 */

export default function ButlerRequests() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const butler = JSON.parse(localStorage.getItem("Butler"));

  const notify = (m, t = "info") => {
    if (t === "success") toast.success(m);
    else if (t === "error") toast.error(m);
    else toast.info(m);
  };

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${mainUri}/api/requests/pending`);
      const data = await res.json();
      if (!data.success) {
        notify(data.message || "Failed", "error");
        return;
      }
      setRequests(data.requests || []);
    } catch (err) {
      console.error(err);
      notify("Network error", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const approve = async (reqId) => {
    if (!butler.id) return notify("Butler id required", "error");
    try {
      const res = await fetch(`${mainUri}/api/requests/${reqId}/approve`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ butlerId: butler.id }),
      });
      const data = await res.json();
      if (!data.success) {
        notify(data.message || "Approve failed", "error");
        return;
      }
      notify("Approved", "success");
      // remove from UI
      setRequests((prev) => prev.filter((r) => r._id !== reqId));
    } catch (err) {
      console.error(err);
      notify("Network error", "error");
    }
  };

  return (
    
    <div className="p-6 bg-white rounded-lg shadow max-w-3xl mt-28 ml-[500px]">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6 mt-10">
        <h1 className="text-black font-bold text-4xl sm:text-4xl text-center">
          Welcome{" "}
          <span className="text-[#4f46e5]">
            {butler?.name} Hostel No.{butler?.hostelNo}
          </span>
        </h1> <br />
      </div>
      <ToastContainer />

      <h2 className="text-xl font-semibold mb-4">Pending Food Requests</h2>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="space-y-3">
          {requests.length === 0 ? (
            <div className="text-gray-500">No pending requests.</div>
          ) : (
            requests.map((r) => (
              <div
                key={r._id}
                className="border rounded p-3 flex items-start justify-between"
              >
                <div>
                  <div className="text-sm font-semibold">
                    {r.item.name} — Rs. {r.item.price}
                  </div>
                  <div className="text-xs text-gray-500">
                    For: {new Date(r.requestedFor).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-gray-500">
                    Student: {r.studentName || r.studentId?.name} — AC:{" "}
                    {r.studentAcNo || r.studentId?.acNo || "-"}
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => approve(r._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded"
                  >
                    Approve
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}
