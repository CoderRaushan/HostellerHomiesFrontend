
// import React, { useEffect, useState } from "react";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// const mainUri = import.meta.env.VITE_MAIN_URI;
// const UpdateGuard = () => {
//   const [staff, setStaff] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [showModal, setShowModal] = useState(false);
//   const [selectedStaff, setSelectedStaff] = useState(null);

//   // ✅ Fetch all staff details
//   const fetchStaff = async () => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("⚠️ User not authenticated!", { position: "top-center" });
//       setLoading(false);
//       return;
//     }

//     try {
//       const res = await fetch(`${mainUri}/api/auth/securityinch/get-all-staff-details`, {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       if (data.success) {
//         setStaff(data.StaffDetails);
//       } else {
//         toast.error("❌ Failed to fetch staff details.", {
//           position: "top-center",
//           autoClose: 3000,
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       console.error("Error fetching staff:", error);
//       toast.error("❌ Server error while fetching staff.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchStaff();
//   }, []);

//   // ✅ Delete staff handler
//   const handleDelete = async (id, role) => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("⚠️ User not authenticated!", { position: "top-center" });
//       return;
//     }

//     if (!window.confirm("Are you sure you want to delete this staff member?"))
//       return;

//     try {
//       const res = await fetch(`${mainUri}/api/auth/delete-guard`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ id, role })
//       });

//       const data = await res.json();

//       if (data.success) {
//         toast.success("✅ Staff deleted successfully!", {
//           position: "top-center",
//           autoClose: 1500,
//           theme: "colored",
//         });
//         fetchStaff();
//       } else {
//         toast.error(data?.errors?.[0]?.msg || "❌ Failed to delete staff.", {
//           position: "top-center",
//           autoClose: 3000,
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       console.error("Error deleting staff:", error);
//       toast.error("❌ Server error while deleting staff.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   // ✅ Open update modal
//   const handleUpdateClick = (staffMember) => {
//     setSelectedStaff(staffMember);
//     setShowModal(true);
//   };

//   // ✅ Update staff handler
//   const handleUpdateSubmit = async (e) => {
//     e.preventDefault();
//     const token = localStorage.getItem("token");
//     if (!token) {
//       toast.error("⚠️ User not authenticated!", { position: "top-center" });
//       return;
//     }
//     console.log(selectedStaff);
//     try {
//       const res = await fetch(
//         `${mainUri}/api/auth/update-guard`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//           body: JSON.stringify(selectedStaff),
//         }
//       );

//       const data = await res.json();

//       if (data.success) {
//         toast.success("✅ Staff updated successfully!", {
//           position: "top-center",
//           autoClose: 1500,
//           theme: "colored",
//         });
//         setShowModal(false);
//         fetchStaff();
//       } else {
//         toast.error(data?.errors?.[0]?.msg || "❌ Failed to update staff.", {
//           position: "top-center",
//           autoClose: 3000,
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       console.error("Error updating staff:", error);
//       toast.error("❌ Server error while updating staff.", {
//         position: "top-center",
//         autoClose: 3000,
//         theme: "colored",
//       });
//     }
//   };

//   // ✅ Handle input change in modal
//   const handleChange = (e) => {
//     setSelectedStaff({ ...selectedStaff, [e.target.name]: e.target.value });
//   };

//   // ✅ UI
//   if (loading)
//     return (
//       <p className="text-center text-lg pt-24">Loading staff details...</p>
//     );

//   return (
//     <div className="min-h-screen w-full bg-[#f3e8ff] px-4 sm:px-8 md:px-16 pt-24 pb-20 overflow-x-hidden overflow-y-auto lg:pl-64">
//       <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6">
//         <h1 className="text-3xl font-bold text-gray-800 mt-4 text-center">
//           All Staff Members
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
//           {staff.map((member) => (
//             <div
//               key={member._id}
//               className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center border border-gray-200"
//             >
//               <img
//                 src={member.profilePhoto}
//                 alt="profile"
//                 className="w-20 h-20 rounded-full object-cover mb-3"
//               />
//               <h2 className="text-lg font-semibold text-gray-900">
//                 {member.name || "No Name"}
//               </h2>
//               <p className="text-gray-600 mb-2">
//                 {member.role || "Unknown Role"}
//               </p>

//               <div className="text-sm text-gray-500 text-center space-y-1">
//                 {member.email && <p>Email: {member.email}</p>}
//                 {member.phone && <p>Phone: {member.phone}</p>}
//                 {member.hostelNo && <p>Hostel No: {member.hostelNo}</p>}
//               </div>

//               <div className="flex gap-5 mt-4">
//                 <button
//                   className="text-blue-600 hover:text-blue-800"
//                   onClick={() => handleUpdateClick(member)}
//                 >
//                   <FaEdit size={20} />
//                 </button>
//                 <button
//                   className="text-red-600 hover:text-red-800"
//                   onClick={() => handleDelete(member._id,member.role)}
//                 >
//                   <FaTrash size={20} />
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* ✅ Update Modal */}
//         {showModal && selectedStaff && (
//           <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
//             <div className="bg-white p-6 rounded-xl w-96 shadow-lg max-h-[90vh] overflow-y-auto ">
//               <h2 className="text-xl font-semibold mb-4 text-center">
//                 Update Staff
//               </h2>
//               <form onSubmit={handleUpdateSubmit}>
//                 <label className="block mb-2 font-medium">Name:</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={selectedStaff.name || ""}
//                   onChange={handleChange}
//                   className="border p-2 w-full rounded mb-3"
//                 />

//                 {/* <label className="block mb-2 font-medium">Email:</label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={selectedStaff.email || ""}
//                   onChange={handleChange}
//                   className="border p-2 w-full rounded mb-3"
//                 /> */}

//                 <label className="block mb-2 font-medium">Phone:</label>
//                 <input
//                   type="text"
//                   name="phone"
//                   value={selectedStaff.phone || ""}
//                   onChange={handleChange}
//                   className="border p-2 w-full rounded mb-3"
//                 />
//                 {/* <label className="block mb-2 font-medium">Role:</label>
//                 <select
//                   name="role"
//                   required
//                   value={selectedStaff.role || ""}
//                   onChange={handleChange}
//                   className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                 >
//                   <option value="">-- Select Role --</option>
//                   <option value="Caretaker">Caretaker</option>
//                   <option value="Manager">Manager</option>
//                   <option value="Warden">Warden</option>
//                   <option value="Guard">Guard</option>
//                   <option value="Student">Student</option>
//                   <option value="PrivilegeStudent">PrivilegeStudent</option>
//                 </select> */}

//                 <label className="block mb-2 mt-2 font-medium">Hostel No:</label>
//                 <select
//                   type="number"
//                   name="hostelNo"
//                   required
//                   value={selectedStaff.hostelNo || ""}
//                   onChange={handleChange}
//                   className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                 >
//                   <option value="">-- Select Hostel No --</option>
//                   <option value="1">Hostel 1</option>
//                   <option value="2">Hostel 2</option>
//                   <option value="3">Hostel 3</option>
//                   <option value="4">Hostel 4</option>
//                   <option value="5">Hostel 5</option>
//                   <option value="NA">NA</option>
//                 </select>

//                 <div className="flex justify-end gap-3 mt-4">
//                   <button
//                     type="button"
//                     onClick={() => setShowModal(false)}
//                     className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     type="submit"
//                     className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
//                   >
//                     Update
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>
//         )}
//       </div>

//       {/* ✅ Toast Container */}
//       <ToastContainer />
//     </div>
//   );
// };

// export default UpdateGuard;

import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mainUri = import.meta.env.VITE_MAIN_URI;

const UpdateGuard = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [selectedHostel, setSelectedHostel] = useState("ALL");

  // ✅ Fetch all staff details (with optional hostel filter)
  const fetchStaff = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("⚠️ User not authenticated!", { position: "top-center" });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${mainUri}/api/auth/securityinch/get-all-staff-details?hostelNo=${selectedHostel}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      if (data.success) {
        setStaff(data.StaffDetails);
      } else {
        toast.error("❌ Failed to fetch staff details.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error fetching staff:", error);
      toast.error("❌ Server error while fetching staff.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStaff();
  }, [selectedHostel]); // refetch when hostel changes

  // ✅ Delete staff
  const handleDelete = async (id, role) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("⚠️ User not authenticated!", { position: "top-center" });
      return;
    }

    if (!window.confirm("Are you sure you want to delete this staff member?"))
      return;

    try {
      const res = await fetch(`${mainUri}/api/auth/delete-guard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, role }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("✅ Staff deleted successfully!", {
          position: "top-center",
          autoClose: 1500,
          theme: "colored",
        });
        fetchStaff();
      } else {
        toast.error(data?.errors?.[0]?.msg || "❌ Failed to delete staff.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error deleting staff:", error);
      toast.error("❌ Server error while deleting staff.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // ✅ Update modal open
  const handleUpdateClick = (staffMember) => {
    setSelectedStaff(staffMember);
    setShowModal(true);
  };

  // ✅ Submit update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("⚠️ User not authenticated!", { position: "top-center" });
      return;
    }

    try {
      const res = await fetch(`${mainUri}/api/auth/update-guard`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(selectedStaff),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("✅ Staff updated successfully!", {
          position: "top-center",
          autoClose: 1500,
          theme: "colored",
        });
        setShowModal(false);
        fetchStaff();
      } else {
        toast.error(data?.errors?.[0]?.msg || "❌ Failed to update staff.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating staff:", error);
      toast.error("❌ Server error while updating staff.", {
        position: "top-center",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  // ✅ Input change in modal
  const handleChange = (e) => {
    setSelectedStaff({ ...selectedStaff, [e.target.name]: e.target.value });
  };

  if (loading)
    return <p className="text-center text-lg pt-24">Loading staff details...</p>;

  return (
    <div className="min-h-screen w-full bg-[#f3e8ff] px-4 sm:px-8 md:px-16 pt-24 pb-20 overflow-x-hidden overflow-y-auto lg:pl-64">
      
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6">
        
        <h1 className="text-3xl font-bold text-gray-800 mt-4 text-center">
          All Staff Members
        </h1>
        <div className="w-full flex justify-center mb-4">
          <select
            value={selectedHostel}
            onChange={(e) => setSelectedHostel(e.target.value)}
            className="border border-gray-400 px-3 py-2 rounded-lg bg-white shadow-sm"
          >
            <option value="ALL">All</option>
            <option value="1">Hostel 1</option>
            <option value="2">Hostel 2</option>
            <option value="3">Hostel 3</option>
            <option value="4">Hostel 4</option>
            <option value="5">Hostel 5</option>
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6 w-full">
          {staff.map((member) => (
            <div
              key={member._id}
              className="bg-white shadow-lg rounded-2xl p-6 flex flex-col items-center border border-gray-200"
            >
              <img
                src={member.profilePhoto}
                alt="profile"
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
              <h2 className="text-lg font-semibold text-gray-900">
                {member.name || "No Name"}
              </h2>
              <p className="text-gray-600 mb-2">{member.role || "Unknown Role"}</p>

              <div className="text-sm text-gray-500 text-center space-y-1">
                {member.email && <p>Email: {member.email}</p>}
                {member.phone && <p>Phone: {member.phone}</p>}
                {member.hostelNo && <p>Hostel No: {member.hostelNo}</p>}
              </div>

              <div className="flex gap-5 mt-4">
                <button
                  className="text-blue-600 hover:text-blue-800"
                  onClick={() => handleUpdateClick(member)}
                >
                  <FaEdit size={20} />
                </button>
                <button
                  className="text-red-600 hover:text-red-800"
                  onClick={() => handleDelete(member._id, member.role)}
                >
                  <FaTrash size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ✅ Update Modal */}
        {showModal && selectedStaff && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
            <div className="bg-white p-6 rounded-xl w-96 shadow-lg max-h-[90vh] overflow-y-auto">
              <h2 className="text-xl font-semibold mb-4 text-center">
                Update Staff
              </h2>
              <form onSubmit={handleUpdateSubmit}>
                <label className="block mb-2 font-medium">Name:</label>
                <input
                  type="text"
                  name="name"
                  value={selectedStaff.name || ""}
                  onChange={handleChange}
                  className="border p-2 w-full rounded mb-3"
                />

                <label className="block mb-2 font-medium">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  value={selectedStaff.phone || ""}
                  onChange={handleChange}
                  className="border p-2 w-full rounded mb-3"
                />

                <label className="block mb-2 mt-2 font-medium">Hostel No:</label>
                <select
                  name="hostelNo"
                  required
                  value={selectedStaff.hostelNo || ""}
                  onChange={handleChange}
                  className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                >
                  <option value="">-- Select Hostel No --</option>
                  <option value="1">Hostel 1</option>
                  <option value="2">Hostel 2</option>
                  <option value="3">Hostel 3</option>
                  <option value="4">Hostel 4</option>
                  <option value="5">Hostel 5</option>
                </select>

                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Update
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>

      <ToastContainer />
    </div>
  );
};

export default UpdateGuard;
