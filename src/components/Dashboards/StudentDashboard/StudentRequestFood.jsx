
// import { useEffect, useMemo, useState } from "react";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const ITEMS = [
//   { name: "Milk", price: 20 },
//   { name: "Paratha", price: 18 },
//   { name: "Butter", price: 8 },
//   { name: "Bread", price: 10 },
//   { name: "Vegetable", price: 40 },
//   { name: "Sweet", price: 25 },
//   { name: "Egg Fry", price: 12 },
//   { name: "Butter Fry", price: 15 },
// ];

// // return YYYY-MM-DD for local date
// function todayISODateLocal() {
//   const d = new Date();
//   const tzoffset = d.getTimezoneOffset() * 60000;
//   return new Date(d - tzoffset).toISOString().slice(0, 10);
// }

// function isBefore7AMLocal(date = new Date()) {
//   // Accept either a Date object or fallback to now
//   const h = date.getHours();
//   return h < 7;
// }

// export default function StudentRequestFood() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   // parse student object safely and accept multiple id keys
//   const rawStudent = (() => {
//     try {
//       return JSON.parse(localStorage.getItem("Student") || "null");
//     } catch {
//       return null;
//     }
//   })();

//   const studentId = rawStudent?._id || rawStudent?.id || null;
//   const studentName = rawStudent?.name || rawStudent?.fullName || "";
//   const studentAccount =
//     rawStudent?.accountNumber || rawStudent?.acNo || rawStudent?.roomNo || "";

//   const [selected, setSelected] = useState(ITEMS[0]);
//   const [history, setHistory] = useState([]); // all requests
//   const [loading, setLoading] = useState(false);
//   const [showHistory, setShowHistory] = useState(false); // toggle: false => only pending shown
//   const [submitting, setSubmitting] = useState(false);

//   const notify = (msg, type = "info") => {
//     if (type === "success") toast.success(msg);
//     else if (type === "error") toast.error(msg);
//     else toast.info(msg);
//   };

//   // compute "before 7 AM" flag once per render (keeps logic simple)
//   const before7AM = useMemo(() => isBefore7AMLocal(new Date()), []);

//   // load requests (history)
//   useEffect(() => {
//     if (!studentId || !mainUri) return;
//     setLoading(true);
//     fetch(`${mainUri}/api/requests/student/${studentId}`)
//       .then((r) => r.json())
//       .then((data) => {
//         if (data.success) setHistory(data.requests || []);
//         else notify(data.message || "Failed to load history", "error");
//       })
//       .catch(() => notify("Network error", "error"))
//       .finally(() => setLoading(false));
//   }, [studentId, mainUri]);

//   // submit new request (always for today)
//   const submitRequest = async () => {
//     // block if before 7 AM local time
//     if (isBefore7AMLocal(new Date())) {
//       notify("Requests are disabled before 7:00 AM. Try after 07:00.", "error");
//       return;
//     }

//     if (!studentId) return notify("Student not logged in", "error");
//     setSubmitting(true);
//     try {
//       const body = {
//         studentId,
//         item: { name: selected.name, price: selected.price },
//         requestedFor: new Date(todayISODateLocal()).toISOString(),
//         name: studentName,
//         accountNumber: studentAccount,
//       };

//       const res = await fetch(`${mainUri}/api/requests/create`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(body),
//       });

//       const data = await res.json();
//       if (!data.success) {
//         notify(data.message || "Request failed", "error");
//         return;
//       }

//       notify("Request sent", "success");
//       // put new request at top of history
//       setHistory((prev) => [data.request, ...prev]);
//       // ensure pending view shows it immediately
//       setShowHistory(false);
//     } catch (err) {
//       console.error(err);
//       notify("Network error", "error");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   // derived arrays
//   const pendingRequests = history.filter((r) => r.status === "pending");
//   // currentRequests to display when not showing full history:
//   // Show today's pending requests first (requestedFor date equals today local)
//   const todayIso = todayISODateLocal();
//   const todaysPending = pendingRequests.filter((r) => {
//     try {
//       const reqDate = new Date(r.requestedFor);
//       const tzoffset = reqDate.getTimezoneOffset() * 60000;
//       const isoLocal = new Date(reqDate - tzoffset).toISOString().slice(0, 10);
//       return isoLocal === todayIso;
//     } catch {
//       return false;
//     }
//   });

//   // fallback: if no today's pending, show all pending for quick access
//   const currentToShow =
//     todaysPending.length > 0 ? todaysPending : pendingRequests;

//   return (
//     // wrapper forces white bg and full height; inline style to override parent dark backgrounds if any
//     <div
//       className="w-full min-h-screen mt-[60px]"
//       style={{ backgroundColor: "#ffffff" }}
//     >
//       <ToastContainer />
//       <div className="max-w-3xl mx-auto p-4">
//         <div className="bg-white rounded-lg shadow p-4">
//           {/* header + toggles */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
//             <div>
//               <h2 className="text-lg font-semibold">Request Food</h2>
//             </div>

//             <div className="flex items-center gap-2">
//               <div className="inline-flex items-center bg-gray-50 px-3 py-2 rounded-md text-sm text-gray-700">
//                 {todayIso}{" "}
//                 <span className="ml-2 text-xs text-gray-400">(today)</span>
//               </div>
//             </div>
//           </div>

//           {/* form */}
//           <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end ">
//             <div className="sm:col-span-2">
//               <label className="block text-sm text-gray-600 mb-1">
//                 Select item
//               </label>
//               <select
//                 className="w-full border rounded px-3 py-2"
//                 value={`${selected.name}|${selected.price}`}
//                 onChange={(e) => {
//                   const [name, price] = e.target.value.split("|");
//                   setSelected({ name, price: Number(price) });
//                 }}
//               >
//                 {ITEMS.map((it) => (
//                   <option key={it.name} value={`${it.name}|${it.price}`}>
//                     {it.name} (Rs. {it.price})
//                   </option>
//                 ))}
//               </select>
//             </div>

//             <div className="flex gap-3 items-end">
//               <button
//                 onClick={submitRequest}
//                 disabled={submitting || before7AM}
//                 className={`w-full ${
//                   submitting || before7AM ? "opacity-60 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
//                 } text-white px-4 py-2 rounded font-semibold`}
//               >
//                 {submitting ? "Requesting..." : "Request"}
//               </button>
//               <button
//                 onClick={() => setShowHistory((s) => !s)}
//                 className="px-3 py-2 border rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold"
//               >
//                 {showHistory ? "Hide History" : "History"}
//               </button>
//             </div>
//           </div>

//           {/* show small helper if before 7 AM */}
//           {before7AM && (
//             <div className="mt-3 text-sm text-red-600">
//               Requests are disabled before 07:00 AM local time.
//             </div>
//           )}

//           {/* Pending / Current requests (default view) */}
//           {!showHistory && (
//             <div className="mt-6">
//               <h3 className="text-md font-medium mb-3">
//                 Current Pending Requests
//               </h3>

//               {loading ? (
//                 <div className="text-sm text-gray-500">Loading...</div>
//               ) : currentToShow.length === 0 ? (
//                 <div className="text-sm text-gray-500">
//                   No pending requests.
//                 </div>
//               ) : (
//                 <div className="space-y-3">
//                   {currentToShow.map((r) => (
//                     <div
//                       key={r._id}
//                       className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border rounded p-3"
//                     >
//                       <div>
//                         <div className="text-sm font-semibold">
//                           {r.item.name} — Rs. {r.item.price}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           For: {new Date(r.requestedFor).toLocaleDateString()} •
//                           Requested: {new Date(r.createdAt).toLocaleString()}
//                         </div>
//                       </div>
//                       <div className="text-xs text-yellow-600 font-medium">
//                         Status: {r.status}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Full history (toggle) */}
//           {showHistory && (
//             <div className="mt-6">
//               <h3 className="text-md font-medium mb-3">Request History</h3>

//               {loading ? (
//                 <div className="text-sm text-gray-500">Loading...</div>
//               ) : history.length === 0 ? (
//                 <div className="text-sm text-gray-500">No requests yet.</div>
//               ) : (
//                 <div className="space-y-3">
//                   {history.map((r) => (
//                     <div
//                       key={r._id}
//                       className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border rounded p-3"
//                     >
//                       <div>
//                         <div className="text-sm font-semibold">
//                           {r.item.name} — Rs. {r.item.price}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           For: {new Date(r.requestedFor).toLocaleDateString()} •
//                           Requested: {new Date(r.createdAt).toLocaleString()}
//                         </div>
//                         <div className="text-xs mt-1">
//                           Status:{" "}
//                           <span
//                             className={`font-medium ${
//                               r.status === "pending"
//                                 ? "text-yellow-600"
//                                 : r.status === "approved"
//                                 ? "text-green-600"
//                                 : "text-red-600"
//                             }`}
//                           >
//                             {r.status}
//                           </span>
//                         </div>
//                       </div>

//                       <div className="text-xs text-gray-500 sm:text-right">
//                         {r.studentName ? <div>{r.studentName}</div> : null}
//                         {r.studentAcNo ? <div>AC: {r.studentAcNo}</div> : null}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
import { useEffect, useMemo, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// return YYYY-MM-DD for local date
function todayISODateLocal() {
  const d = new Date();
  const tzoffset = d.getTimezoneOffset() * 60000;
  return new Date(d - tzoffset).toISOString().slice(0, 10);
}

function isBefore7AMLocal(date = new Date()) {
  const h = date.getHours();
  return h < 7;
}

export default function StudentRequestFood() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  // parse student object safely and accept multiple id keys
  const rawStudent = (() => {
    try {
      return JSON.parse(localStorage.getItem("Student") || "null");
    } catch {
      return null;
    }
  })();

  const studentId = rawStudent?._id || rawStudent?.id || null;
  const studentName = rawStudent?.name || rawStudent?.fullName || "";
  const studentAccount =
    rawStudent?.accountNumber || rawStudent?.acNo || rawStudent?.roomNo || "";
  // optional hostelNo (if student object contains it)
  const studentHostelNo =
    rawStudent?.hostelNo || rawStudent?.hostel || rawStudent?.hostel_id || "";

  const [items, setItems] = useState([]); // fetched items [{name, price}, ...]
  const [itemsLoading, setItemsLoading] = useState(false);
  const [selected, setSelected] = useState(null); // selected item object or null

  const [history, setHistory] = useState([]); // all requests
  const [loading, setLoading] = useState(false);
  const [showHistory, setShowHistory] = useState(false); // toggle: false => only pending shown
  const [submitting, setSubmitting] = useState(false);

  const notify = (msg, type = "info") => {
    if (type === "success") toast.success(msg);
    else if (type === "error") toast.error(msg);
    else toast.info(msg);
  };

  // compute "before 7 AM" flag once per render
  const before7AM = useMemo(() => isBefore7AMLocal(new Date()), []);

  // load requests (history)
  useEffect(() => {
    if (!studentId || !mainUri) return;
    setLoading(true);
    fetch(`${mainUri}/api/requests/student/${studentId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success) setHistory(data.requests || []);
        else notify(data.message || "Failed to load history", "error");
      })
      .catch(() => notify("Network error", "error"))
      .finally(() => setLoading(false));
  }, [studentId, mainUri]);

  // load items from backend (lite format: [{name, price}, ...])
  useEffect(() => {
    if (!mainUri) return;
    const fetchItems = async () => {
      setItemsLoading(true);
      try {
        // use studentHostelNo if available, otherwise fetch all
        const url = studentHostelNo
          ? `${mainUri}/api/items/lite/all?hostelNo=${encodeURIComponent(
              studentHostelNo
            )}`
          : `${mainUri}/api/items/lite/all`;

        const res = await fetch(url);
        if (!res.ok) {
          // try to parse error message
          let body = null;
          try {
            body = await res.json();
          } catch {}
          throw new Error(
            body?.message || `Failed to load items (${res.status})`
          );
        }
        const data = await res.json();
        if (!data.success) throw new Error(data.message || "Failed to load items");

        // data.items expected to be array of { name, price }
        setItems(Array.isArray(data.items) ? data.items : []);
        // initialize selected if not set
        setSelected((prev) => {
          if (prev && prev.name && prev.price != null) return prev;
          return Array.isArray(data.items) && data.items.length > 0
            ? data.items[0]
            : null;
        });
      } catch (err) {
        console.error("loadItems:", err);
        notify(err.message || "Network error while loading items", "error");
      } finally {
        setItemsLoading(false);
      }
    };

    fetchItems();
  }, [mainUri, studentHostelNo]);

  // submit new request (always for today)
  const submitRequest = async () => {
    // block if before 7 AM local time
    if (isBefore7AMLocal(new Date())) {
      notify("Requests are disabled before 7:00 AM. Try after 07:00.", "error");
      return;
    }

    if (!studentId) return notify("Student not logged in", "error");
    if (!selected || !selected.name) return notify("No item selected", "error");

    setSubmitting(true);
    try {
      const body = {
        studentId,
        item: { name: selected.name, price: selected.price },
        requestedFor: new Date(todayISODateLocal()).toISOString(),
        name: studentName,
        accountNumber: studentAccount,
        hostelNo:rawStudent?.hostelNo,
      };

      const res = await fetch(`${mainUri}/api/requests/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        // parse possible error
        let errBody = null;
        try {
          errBody = await res.json();
        } catch {}
        const errMsg = errBody?.message || `Request failed (${res.status})`;
        notify(errMsg, "error");
        return;
      }

      const data = await res.json();
      if (!data.success) {
        notify(data.message || "Request failed", "error");
        return;
      }

      notify("Request sent", "success");
      // put new request at top of history
      setHistory((prev) => [data.request, ...prev]);
      // ensure pending view shows it immediately
      setShowHistory(false);
    } catch (err) {
      console.error(err);
      notify("Network error", "error");
    } finally {
      setSubmitting(false);
    }
  };

  // derived arrays for display
  const pendingRequests = history.filter((r) => r.status === "pending");
  const todayIso = todayISODateLocal();
  const todaysPending = pendingRequests.filter((r) => {
    try {
      const reqDate = new Date(r.requestedFor);
      const tzoffset = reqDate.getTimezoneOffset() * 60000;
      const isoLocal = new Date(reqDate - tzoffset).toISOString().slice(0, 10);
      return isoLocal === todayIso;
    } catch {
      return false;
    }
  });

  const currentToShow = todaysPending.length > 0 ? todaysPending : pendingRequests;

  return (
    <div
      className="w-full min-h-screen mt-[60px]"
      style={{ backgroundColor: "#ffffff" }}
    >
      <ToastContainer />
      <div className="max-w-3xl mx-auto p-4">
        <div className="bg-white rounded-lg shadow p-4">
          {/* header + toggles */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
            <div>
              <h2 className="text-lg font-semibold">Request Food</h2>
            </div>

            <div className="flex items-center gap-2">
              <div className="inline-flex items-center bg-gray-50 px-3 py-2 rounded-md text-sm text-gray-700">
                {todayIso}{" "}
                <span className="ml-2 text-xs text-gray-400">(today)</span>
              </div>
            </div>
          </div>

          {/* form */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 items-end ">
            <div className="sm:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Select item</label>

              {itemsLoading ? (
                <div className="w-full border rounded px-3 py-2 text-sm text-gray-500">Loading items...</div>
              ) : items.length === 0 ? (
                <div className="w-full border rounded px-3 py-2 text-sm text-gray-500">No items available</div>
              ) : (
                <select
                  className="w-full border rounded px-3 py-2"
                  value={`${selected?.name || ""}|${selected?.price ?? ""}`}
                  onChange={(e) => {
                    const [name, price] = e.target.value.split("|");
                    setSelected({ name, price: Number(price) });
                  }}
                >
                  {items.map((it) => (
                    <option key={it.name} value={`${it.name}|${it.price}`}>
                      {it.name} (Rs. {it.price})
                    </option>
                  ))}
                </select>
              )}
            </div>

            <div className="flex gap-3 items-end">
              <button
                onClick={submitRequest}
                disabled={submitting || before7AM || itemsLoading || !selected}
                className={`w-full ${submitting || before7AM || itemsLoading || !selected ? "opacity-60 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white px-4 py-2 rounded font-semibold`}
              >
                {submitting ? "Requesting..." : "Request"}
              </button>
              <button
                onClick={() => setShowHistory((s) => !s)}
                className="px-3 py-2 border rounded-md text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold"
              >
                {showHistory ? "Hide History" : "History"}
              </button>
            </div>
          </div>

          {/* show small helper if before 7 AM */}
          {before7AM && (
            <div className="mt-3 text-sm text-red-600">Requests are disabled before 07:00 AM local time.</div>
          )}

          {/* Pending / Current requests (default view) */}
          {!showHistory && (
            <div className="mt-6">
              <h3 className="text-md font-medium mb-3">Current Pending Requests</h3>

              {loading ? (
                <div className="text-sm text-gray-500">Loading...</div>
              ) : currentToShow.length === 0 ? (
                <div className="text-sm text-gray-500">No pending requests.</div>
              ) : (
                <div className="space-y-3">
                  {currentToShow.map((r) => (
                    <div key={r._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border rounded p-3">
                      <div>
                        <div className="text-sm font-semibold">{r.item.name} — Rs. {r.item.price}</div>
                        <div className="text-xs text-gray-500">For: {new Date(r.requestedFor).toLocaleDateString()} • Requested: {new Date(r.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="text-xs text-yellow-600 font-medium">Status: {r.status}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Full history (toggle) */}
          {showHistory && (
            <div className="mt-6">
              <h3 className="text-md font-medium mb-3">Request History</h3>

              {loading ? (
                <div className="text-sm text-gray-500">Loading...</div>
              ) : history.length === 0 ? (
                <div className="text-sm text-gray-500">No requests yet.</div>
              ) : (
                <div className="space-y-3">
                  {history.map((r) => (
                    <div key={r._id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border rounded p-3">
                      <div>
                        <div className="text-sm font-semibold">{r.item.name} — Rs. {r.item.price}</div>
                        <div className="text-xs text-gray-500">For: {new Date(r.requestedFor).toLocaleDateString()} • Requested: {new Date(r.createdAt).toLocaleString()}</div>
                        <div className="text-xs mt-1">Status: <span className={`font-medium ${r.status === "pending" ? "text-yellow-600" : r.status === "approved" ? "text-green-600" : "text-red-600"}`}>{r.status}</span></div>
                      </div>

                      <div className="text-xs text-gray-500 sm:text-right">
                        {r.studentName ? <div>{r.studentName}</div> : null}
                        {r.studentAcNo ? <div>AC: {r.studentAcNo}</div> : null}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
