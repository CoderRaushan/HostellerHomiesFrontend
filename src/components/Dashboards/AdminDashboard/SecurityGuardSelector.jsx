// // component dashboard admindas securityGuard
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
//     status: "Inactive",
//   });
//   const [editingId, setEditingId] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const token= localStorage.getItem("token");

//   // Fetch all guards
//   const fetchGuards = () => {
//     fetch(`${API_BASE_URL}/api/guard`, {
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//     })
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
//       headers: { "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//        },
//       body: JSON.stringify(form),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setLoading(false);
//         if (data.success) {
//           setForm({
//             name: "",
//             guardId: "",
//             shift: "Day",
//             post: "",
//             contact: "",
//             status: "Inactive",
//           });
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
//       status: g.status || "Inactive",
//     });
//     setEditingId(g._id);
//   };

//   // Handle delete
//   const handleDelete = (id) => {
//     if (!window.confirm("Are you sure you want to delete this guard?")) return;
//     fetch(`${API_BASE_URL}/api/guard/delete/${id}`, {
//       method: "DELETE",
//       headers: { "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`
//        },
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         if (data.success) fetchGuards();
//         else alert(data.message || "Failed to delete guard");
//       })
//       .catch(() => alert("Error deleting guard"));
//   };

//   return (
//     <div className="min-h-screen bg-white flex items-center justify-center p-4 mt-16">
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
//             <div>
//               <label className="block text-sm font-medium">Status</label>
//               <select
//                 name="status"
//                 value={form.status}
//                 onChange={handleChange}
//                 className="w-full border rounded px-3 py-2"
//               >
//                 <option value="Active">Active</option>
//                 <option value="Inactive">Inactive</option>
//               </select>
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
//                   setForm({
//                     name: "",
//                     guardId: "",
//                     shift: "Day",
//                     post: "",
//                     contact: "",
//                     status: "Inactive",
//                   });
//                 }}
//                 className="px-4 py-2 rounded border border-gray-400 text-gray-700"
//               >
//                 Cancel
//               </button>
//             )}
//           </div>
//         </form>

//         <h3 className="text-xl font-semibold mb-2 text-[#4f46e5] text-center">
//           All Guards
//         </h3>
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
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const API_BASE_URL = import.meta.env.VITE_MAIN_URI;

function CaretakerGuardDashboard() {
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch guards
  const fetchGuards = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/guard`, {
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
  };

  useEffect(() => {
    fetchGuards();
  }, []);

  // Handle shift/status update
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
        toast.success(
          `${field.charAt(0).toUpperCase() + field.slice(1)} updated to ${value}`
        );
      } else {
        toast.error(data.message || "Failed to update");
      }
    } catch (err) {
      toast.error("Server error while updating");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4 mt-16">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl p-6 md:p-10">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-[#4f46e5] text-center">
          All Security Guards
        </h2>

        <div className="overflow-x-auto">
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
              {guards.length === 0 ? (
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
                        onChange={(e) =>
                          handleUpdate(g._id, "shift", e.target.value)
                        }
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
                        onChange={(e) =>
                          handleUpdate(g._id, "status", e.target.value)
                        }
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
      </div>

      {/* Toast Container */}
      <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}

export default CaretakerGuardDashboard;
