// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const mainUri = import.meta.env.VITE_MAIN_URI;

// function SIHome() {
//   const [staff, setStaff] = useState([]);
//   const [loading, setLoading] = useState(true);

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

//   // ✅ UI
//   if (loading)
//     return <p className="text-center text-lg pt-24">Loading staff details...</p>;

//   return (
//     <div className="min-h-screen w-full bg-[#f3e8ff] px-4 sm:px-8 md:px-16 pt-24 pb-20 overflow-x-hidden overflow-y-auto lg:pl-64">
//       <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6">
//         <h1 className="text-3xl font-bold text-gray-800 mt-4 text-center">
//           All Staff Members
//         </h1>

//         {/* ✅ Staff Cards (View Only) */}
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
//               <p className="text-gray-600 mb-2">{member.role || "Unknown Role"}</p>

//               <div className="text-sm text-gray-500 text-center space-y-1">
//                 {member.email && <p>Email: {member.email}</p>}
//                 {member.phone && <p>Phone: {member.phone}</p>}
//                 {member.hostelNo && <p>Hostel No: {member.hostelNo}</p>}
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

// export default SIHome;
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mainUri = import.meta.env.VITE_MAIN_URI;

function SIHome() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedHostel, setSelectedHostel] = useState("ALL");

  // ✅ Fetch staff details (with filter)
  const fetchStaff = async (hostelNo = "ALL") => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("⚠️ User not authenticated!", { position: "top-center" });
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(
        `${mainUri}/api/auth/securityinch/get-all-staff-details?hostelNo=${hostelNo}`,
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
    fetchStaff(selectedHostel);
  }, [selectedHostel]);

  if (loading)
    return <p className="text-center text-lg pt-24">Loading staff details...</p>;

  return (
    <div className="min-h-screen w-full bg-[#f3e8ff] px-4 sm:px-8 md:px-16 pt-24 pb-20 overflow-x-hidden overflow-y-auto lg:pl-64">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6">
        <h1 className="text-3xl font-bold text-gray-800 mt-4 text-center">
          All Staff Members
        </h1>

        {/* ✅ Dropdown Filter */}
        <div className="mt-4">
          <label className="mr-2 font-semibold text-gray-700">
            Select Hostel:
          </label>
          <select
            value={selectedHostel}
            onChange={(e) => setSelectedHostel(e.target.value)}
            className="border border-gray-400 rounded-md p-2 text-gray-700"
          >
            <option value="ALL">ALL</option>
            <option value="1">Hostel 1</option>
            <option value="2">Hostel 2</option>
            <option value="3">Hostel 3</option>
            <option value="4">Hostel 4</option>
            <option value="5">Hostel 5</option>
          </select>
        </div>

        {/* ✅ Staff Cards */}
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
            </div>
          ))}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SIHome;
