// import React, { useEffect, useState } from "react";

// const API_BASE_URL = import.meta.env.VITE_MAIN_URI;

// function SecurityGuardSelector() {
//   const [guards, setGuards] = useState([]);
//   const [form, setForm] = useState({
//     name: "",
//     guardId: "",
//     shift: "Day",
//     post: "",
//     contact: "",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Fetch all guards
//   const fetchGuards = () => {
//     fetch(`${API_BASE_URL}/api/guard`)
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) setGuards(data.guards);
//       });
//   };

//   useEffect(() => {
//     fetchGuards();
//   }, []);

//   // Handle form input
//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   // Handle form submit (Add or Update)
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setLoading(true);
//     const url = editingId
//       ? `${API_BASE_URL}/api/guard/update/${editingId}`
//       : `${API_BASE_URL}/api/guard/add`;
//     const method = editingId ? "PUT" : "POST";
//     fetch(url, {
//       method,
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(form),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setLoading(false);
//         if (data.success) {
//           setForm({ name: "", guardId: "", shift: "Day", post: "", contact: "" });
//           setEditingId(null);
//           fetchGuards();
//         } else {
//           alert(data.message || "Failed to save guard");
//         }
//       })
//       .catch(() => {
//         setLoading(false);
//         alert("Error saving guard");
//       });
//   };

//   // Handle edit
//   const handleEdit = (g) => {
//     setForm({
//       name: g.name,
//       guardId: g.guardId,
//       shift: g.shift,
//       post: g.post,
//       contact: g.contact,
//     });
//     setEditingId(g._id);
//   };

//   // Handle delete
//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete this guard?")) return;
//     fetch(`${API_BASE_URL}/api/guard/delete/${id}`, {
//       method: "DELETE",
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) fetchGuards();
//         else alert(data.message || "Failed to delete guard");
//       })
//       .catch(() => alert("Error deleting guard"));
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4">
//       <div className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6 md:p-10">
//         <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#4f46e5] text-center">
//           {editingId ? "Edit Guard" : "Add New Guard"}
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4 mb-8">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium">Name</label>
//               <input
//                 name="name"
//                 value={form.name}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2"
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Guard ID</label>
//               <input
//                 name="guardId"
//                 value={form.guardId}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2"
//                 disabled={!!editingId}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Shift</label>
//               <select
//                 name="shift"
//                 value={form.shift}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2"
//               >
//                 <option value="Day">Day</option>
//                 <option value="Night">Night</option>
//               </select>
//             </div>
//             <div>
//               <label className="block text-sm font-medium">Post</label>
//               <input
//                 name="post"
//                 value={form.post}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2"
//               />
//             </div>
//             <div className="md:col-span-2">
//               <label className="block text-sm font-medium">Contact</label>
//               <input
//                 name="contact"
//                 value={form.contact}
//                 onChange={handleChange}
//                 required
//                 className="w-full border rounded px-3 py-2"
//               />
//             </div>
//           </div>
//           <div className="flex flex-wrap gap-2 mt-2">
//             <button
//               type="submit"
//               disabled={loading}
//               className="bg-[#4f46e5] text-white px-4 py-2 rounded hover:bg-[#4338ca] transition"
//             >
//               {loading
//                 ? editingId
//                   ? "Updating..."
//                   : "Adding..."
//                 : editingId
//                 ? "Update Guard"
//                 : "Add Guard"}
//             </button>
//             {editingId && (
//               <button
//                 type="button"
//                 onClick={() => {
//                   setEditingId(null);
//                   setForm({ name: "", guardId: "", shift: "Day", post: "", contact: "" });
//                 }}
//                 className="px-4 py-2 rounded border border-gray-400 text-gray-700"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>

//         <h3 className="text-xl font-semibold mb-2 text-[#4f46e5] text-center">All Guards</h3>
//         <div className="overflow-x-auto">
//           <table className="min-w-full border text-sm">
//             <thead>
//               <tr className="bg-purple-100">
//                 <th className="px-2 py-1 border">Name</th>
//                 <th className="px-2 py-1 border">ID</th>
//                 <th className="px-2 py-1 border">Shift</th>
//                 <th className="px-2 py-1 border">Post</th>
//                 <th className="px-2 py-1 border">Contact</th>
//                 <th className="px-2 py-1 border">Status</th>
//                 <th className="px-2 py-1 border">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {guards.length === 0 ? (
//                 <tr>
//                   <td colSpan={7} className="text-center py-4 text-gray-500">
//                     No guards found.
//                   </td>
//                 </tr>
//               ) : (
//                 guards.map((g) => (
//                   <tr key={g._id}>
//                     <td className="border px-2 py-1">{g.name}</td>
//                     <td className="border px-2 py-1">{g.guardId}</td>
//                     <td className="border px-2 py-1">{g.shift}</td>
//                     <td className="border px-2 py-1">{g.post}</td>
//                     <td className="border px-2 py-1">{g.contact}</td>
//                     <td className="border px-2 py-1">{g.status}</td>
//                     <td className="border px-2 py-1">
//                       <button
//                         className="text-blue-600 mr-2"
//                         onClick={() => handleEdit(g)}
//                       >
//                         Edit
//                       </button>
//                       <button
//                         className="text-red-600"
//                         onClick={() => handleDelete(g._id)}
//                       >
//                         Delete
//                       </button>
//                     </td>
//                   </tr>
//                 ))
//               )}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SecurityGuardSelector;

import React, { useEffect, useState } from "react";
import axios from "axios";

const SecurityGuardSelector = () => {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [guards, setGuards] = useState([]);
  const [selectedGuardId, setSelectedGuardId] = useState("");
  const [onDutyGuard, setOnDutyGuard] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch guards on mount
  useEffect(() => {
    fetchGuards();
  }, []);

  const fetchGuards = async () => {
    try {
      const response = await axios.get(
        `${mainUri}/api/guard/guards`
      );
      const guardList = response.data;
      setGuards(guardList);

      const currentOnDuty = guardList.find((g) => g.onDuty);
      if (currentOnDuty) {
        setSelectedGuardId(currentOnDuty.guardId);
        setOnDutyGuard(currentOnDuty);
      } else {
        setSelectedGuardId("");
        setOnDutyGuard(null);
      }
    } catch (error) {
      console.error("Error fetching guards:", error);
    }
  };

  const handleSelectGuard = async (e) => {
    const guardId = e.target.value;
    setSelectedGuardId(guardId);
    setLoading(true);

    try {
      // Set new guard on duty
      await axios.put(`${mainUri}/api/guard/guards/on-duty`, {
        guardId,
      });

      // Refresh the guards list and update the on-duty guard
      await fetchGuards();
    } catch (error) {
      console.error("Error setting guard on duty:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f3e8ff] flex items-center justify-center p-6">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="bg-[#4f46e5] p-5">
          <h2 className="text-2xl font-bold text-white text-center">
            Security Personnel Dashboard
          </h2>
        </div>

        <div className="p-8">
          <h3 className="text-lg font-medium text-gray-800 mb-6">
            Assign Guard on Duty
          </h3>

          <div className="relative mb-8">
            <select
              className="w-full bg-gray-50 border-2 border-gray-200 rounded-xl px-4 py-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-[#4f46e5] focus:border-transparent transition"
              value={selectedGuardId}
              onChange={handleSelectGuard}
            >
              <option value="">-- Select Security Guard --</option>
              {guards.map((guard) => (
                <option key={guard.guardId} value={guard.guardId}>
                  {guard.name} ({guard.shift})
                </option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4">
              <svg
                className="h-5 w-5 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          </div>

          {loading && (
            <div className="flex items-center justify-center p-4 mb-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4f46e5]"></div>
              <span className="ml-3 text-[#4f46e5] font-medium">
                Updating assignment...
              </span>
            </div>
          )}

          {onDutyGuard && !loading && (
            <div className="bg-[#f3e8ff] rounded-2xl p-6 border-l-4 border-[#4f46e5]">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold text-[#4f46e5]">
                  Current Guard On Duty
                </h3>
                <span className="bg-green-100 text-green-800 text-xs font-medium px-3 py-1 rounded-full">
                  Active
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs uppercase font-medium text-gray-500">
                    Name
                  </p>
                  <p className="font-semibold text-black">{onDutyGuard.name}</p>
                </div>
                <div>
                  <p className="text-xs uppercase font-medium text-gray-500">
                    ID
                  </p>
                  <p className="font-semibold text-black">
                    {onDutyGuard.guardId}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase font-medium text-gray-500">
                    Shift
                  </p>
                  <p className="font-semibold text-black">
                    {onDutyGuard.shift}
                  </p>
                </div>
                <div>
                  <p className="text-xs uppercase font-medium text-gray-500">
                    Post
                  </p>
                  <p className="font-semibold text-black">{onDutyGuard.post}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-xs uppercase font-medium text-gray-500">
                    Contact
                  </p>
                  <p className="font-semibold text-black">
                    {onDutyGuard.contact}
                  </p>
                </div>
              </div>
            </div>
          )}

          {!onDutyGuard && !loading && (
            <div className="text-center p-6 bg-gray-50 rounded-xl">
              <p className="text-gray-600">
                No guard currently assigned to duty
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Please select a guard from the dropdown
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityGuardSelector;
