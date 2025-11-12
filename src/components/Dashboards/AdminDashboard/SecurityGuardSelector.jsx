
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_MAIN_URI;

function SecurityGuardSelector() {
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedHostel, setSelectedHostel] = useState("ALL");
  const token = localStorage.getItem("token");

  // ✅ Fetch guards with hostel filter
  const fetchGuards = async (hostelNo = "ALL") => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/guard?hostelNo=${hostelNo}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      if (data.success) setGuards(data.guards);
      else toast.error(data.message || "Failed to load guards");
    } catch (err) {
      toast.error("Error fetching guards");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchGuards(selectedHostel);
  }, [selectedHostel]);

  // ✅ Handle shift/status update
  const handleUpdate = async (id, field, value) => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/api/guard/update/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ [field]: value }),
      });
      const data = await res.json();

      if (data.success) {
        setGuards((prev) =>
          prev.map((g) => (g._id === id ? { ...g, [field]: value } : g))
        );
        toast.success(`${field} updated to ${value}`);
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (err) {
      toast.error("Server error while updating");
    }
    setLoading(false);
  };

  // return (
  //   <div className="flex justify-center px-4 py-6 mt-20 sm:mt-16">
  //     <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-10">
  //       <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-[#4f46e5] text-center">
  //         Security Guards
  //       </h2>

  //       {/* ✅ Hostel Filter Dropdown */}
  //       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-4 mb-4">
  //         <label className="font-medium text-gray-700 text-sm sm:text-base">
  //           Filter by Hostel:
  //         </label>
  //         <select
  //           value={selectedHostel}
  //           onChange={(e) => setSelectedHostel(e.target.value)}
  //           className="border border-gray-400 rounded-md p-2 text-gray-700 text-sm sm:text-base w-full sm:w-auto"
  //         >
  //           <option value="ALL">ALL</option>
  //           <option value="1">Hostel 1</option>
  //           <option value="2">Hostel 2</option>
  //           <option value="3">Hostel 3</option>
  //           <option value="4">Hostel 4</option>
  //           <option value="5">Hostel 5</option>
  //         </select>
  //       </div>

  //       {/* ✅ Guards Table / Cards */}
  //       <div className="overflow-x-auto hidden md:block">
  //         <table className="min-w-full border text-sm">
  //           <thead>
  //             <tr className="bg-purple-100 text-left">
  //               <th className="px-3 py-2 border">Profile</th>
  //               <th className="px-3 py-2 border">Name</th>
  //               <th className="px-3 py-2 border">Email</th>
  //               <th className="px-3 py-2 border">Phone</th>
  //               <th className="px-3 py-2 border">Hostel No</th>
  //               <th className="px-3 py-2 border">Shift</th>
  //               <th className="px-3 py-2 border">Status</th>
  //             </tr>
  //           </thead>
  //           <tbody>
  //             {loading ? (
  //               <tr>
  //                 <td colSpan={7} className="text-center py-4 text-gray-500">
  //                   Loading...
  //                 </td>
  //               </tr>
  //             ) : guards.length === 0 ? (
  //               <tr>
  //                 <td colSpan={7} className="text-center py-4 text-gray-500">
  //                   No guards found.
  //                 </td>
  //               </tr>
  //             ) : (
  //               guards.map((g) => (
  //                 <tr key={g._id} className="hover:bg-gray-50">
  //                   <td className="border px-2 py-1 text-center">
  //                     <img
  //                       src={g.profilePhoto}
  //                       alt={g.name}
  //                       className="w-10 h-10 rounded-full object-cover mx-auto"
  //                     />
  //                   </td>
  //                   <td className="border px-3 py-2">{g.name}</td>
  //                   <td className="border px-3 py-2">{g.email}</td>
  //                   <td className="border px-3 py-2">{g.phone}</td>
  //                   <td className="border px-3 py-2 text-center">{g.hostelNo}</td>
  //                   <td className="border px-3 py-2">
  //                     <select
  //                       value={g.shift || "Day"}
  //                       onChange={(e) => handleUpdate(g._id, "shift", e.target.value)}
  //                       disabled={loading}
  //                       className="border rounded px-2 py-1 w-full"
  //                     >
  //                       <option value="Day">Day</option>
  //                       <option value="Night">Night</option>
  //                     </select>
  //                   </td>
  //                   <td className="border px-3 py-2">
  //                     <select
  //                       value={g.status || "Inactive"}
  //                       onChange={(e) => handleUpdate(g._id, "status", e.target.value)}
  //                       disabled={loading}
  //                       className={`border rounded px-2 py-1 w-full ${
  //                         g.status === "Active"
  //                           ? "bg-green-100 text-green-700"
  //                           : "bg-red-100 text-red-700"
  //                       }`}
  //                     >
  //                       <option value="Active">Active</option>
  //                       <option value="Inactive">Inactive</option>
  //                     </select>
  //                   </td>
  //                 </tr>
  //               ))
  //             )}
  //           </tbody>
  //         </table>
  //       </div>

  //       {/* ✅ Mobile Cards View */}
  //       <div className="grid gap-4 md:hidden ">
  //         {loading ? (
  //           <p className="text-center text-gray-500">Loading...</p>
  //         ) : guards.length === 0 ? (
  //           <p className="text-center text-gray-500">No guards found.</p>
  //         ) : (
  //           guards.map((g) => (
  //             <div
  //               key={g._id}
  //               className="border rounded-xl p-4 shadow-sm hover:shadow-md transition"
  //             >
  //               <div className="flex items-center gap-3 mb-3">
  //                 <img
  //                   src={g.profilePhoto}
  //                   alt={g.name}
  //                   className="w-12 h-12 rounded-full object-cover"
  //                 />
  //                 <div>
  //                   <h3 className="font-semibold text-gray-800">{g.name}</h3>
  //                   <p className="text-sm text-gray-600">{g.email}</p>
  //                 </div>
  //               </div>
  //               <p className="text-sm mb-1">
  //                 <span className="font-semibold">Phone:</span> {g.phone}
  //               </p>
  //               <p className="text-sm mb-2">
  //                 <span className="font-semibold">Hostel:</span> {g.hostelNo}
  //               </p>
  //               <div className="flex flex-col sm:flex-row gap-2">
  //                 <select
  //                   value={g.shift || "Day"}
  //                   onChange={(e) => handleUpdate(g._id, "shift", e.target.value)}
  //                   disabled={loading}
  //                   className="border rounded px-2 py-1 w-full text-sm"
  //                 >
  //                   <option value="Day">Day</option>
  //                   <option value="Night">Night</option>
  //                 </select>
  //                 <select
  //                   value={g.status || "Inactive"}
  //                   onChange={(e) => handleUpdate(g._id, "status", e.target.value)}
  //                   disabled={loading}
  //                   className={`border rounded px-2 py-1 w-full text-sm ${
  //                     g.status === "Active"
  //                       ? "bg-green-100 text-green-700"
  //                       : "bg-red-100 text-red-700"
  //                   }`}
  //                 >
  //                   <option value="Active">Active</option>
  //                   <option value="Inactive">Inactive</option>
  //                 </select>
  //               </div>
  //             </div>
  //           ))
  //         )}
  //       </div>
  //     </div>

  //     {/* Toast Container */}
  //     <ToastContainer position="top-right" autoClose={2500} theme="colored" />
  //   </div>
  // );
  return (
  <div className="flex justify-center px-4 py-6 mt-20 sm:mt-16 bg-gray-100 min-h-screen">
    <div className="w-full max-w-6xl bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-10">
      <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-6 text-[#4f46e5] text-center">
        Security Guards
      </h2>

      {/* ✅ Hostel Filter Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-4 mb-4">
        <label className="font-medium text-gray-700 text-sm sm:text-base">
          Filter by Hostel:
        </label>
        <select
          value={selectedHostel}
          onChange={(e) => setSelectedHostel(e.target.value)}
          className="border border-gray-400 rounded-md p-2 text-gray-700 text-sm sm:text-base w-full sm:w-auto"
        >
          <option value="ALL">ALL</option>
          <option value="1">Hostel 1</option>
          <option value="2">Hostel 2</option>
          <option value="3">Hostel 3</option>
          <option value="4">Hostel 4</option>
          <option value="5">Hostel 5</option>
        </select>
      </div>

      {/* ✅ Guards Table for Desktop */}
      <div className="overflow-x-auto hidden md:block">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-purple-100 text-left">
              <th className="px-3 py-2 border">Profile</th>
              <th className="px-3 py-2 border">Name</th>
              <th className="px-3 py-2 border">Email</th>
              <th className="px-3 py-2 border">Phone</th>
              <th className="px-3 py-2 border">Hostel No</th>
              <th className="px-3 py-2 border">Shift</th>
              <th className="px-3 py-2 border">Status</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  Loading...
                </td>
              </tr>
            ) : guards.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No guards found.
                </td>
              </tr>
            ) : (
              guards.map((g) => (
                <tr key={g._id} className="hover:bg-gray-50">
                  <td className="border px-2 py-1 text-center">
                    <img
                      src={g.profilePhoto}
                      alt={g.name}
                      className="w-10 h-10 rounded-full object-cover mx-auto"
                    />
                  </td>
                  <td className="border px-3 py-2">{g.name}</td>
                  <td className="border px-3 py-2">{g.email}</td>
                  <td className="border px-3 py-2">{g.phone}</td>
                  <td className="border px-3 py-2 text-center">{g.hostelNo}</td>
                  <td className="border px-3 py-2">
                    <select
                      value={g.shift || "Day"}
                      onChange={(e) => handleUpdate(g._id, "shift", e.target.value)}
                      disabled={loading}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="Day">Day</option>
                      <option value="Night">Night</option>
                    </select>
                  </td>
                  <td className="border px-3 py-2">
                    <select
                      value={g.status || "Inactive"}
                      onChange={(e) => handleUpdate(g._id, "status", e.target.value)}
                      disabled={loading}
                      className={`border rounded px-2 py-1 w-full ${
                        g.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Mobile Cards View — Fixed and Responsive */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden bg-gray-100 p-2 rounded-lg">
        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : guards.length === 0 ? (
          <p className="text-center text-gray-500">No guards found.</p>
        ) : (
          guards.map((g) => (
            <div
              key={g._id}
              className="bg-white border rounded-xl p-4 shadow-md z-0 transition-all hover:shadow-lg"
            >
              <div className="flex items-center gap-3 mb-3">
                <img
                  src={g.profilePhoto}
                  alt={g.name}
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-semibold text-gray-800">{g.name}</h3>
                  <p className="text-sm text-gray-600">{g.email}</p>
                </div>
              </div>
              <p className="text-sm mb-1">
                <span className="font-semibold">Phone:</span> {g.phone}
              </p>
              <p className="text-sm mb-2">
                <span className="font-semibold">Hostel:</span> {g.hostelNo}
              </p>
              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  value={g.shift || "Day"}
                  onChange={(e) => handleUpdate(g._id, "shift", e.target.value)}
                  disabled={loading}
                  className="border rounded px-2 py-1 w-full text-sm bg-white"
                >
                  <option value="Day">Day</option>
                  <option value="Night">Night</option>
                </select>
                <select
                  value={g.status || "Inactive"}
                  onChange={(e) => handleUpdate(g._id, "status", e.target.value)}
                  disabled={loading}
                  className={`border rounded px-2 py-1 w-full text-sm ${
                    g.status === "Active"
                      ? "bg-green-100 text-green-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
          ))
        )}
      </div>
    </div>

    {/* Toast Container */}
    <ToastContainer position="top-right" autoClose={2500} theme="colored" />
  </div>
);
}

export default SecurityGuardSelector;
