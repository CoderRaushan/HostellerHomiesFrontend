
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash } from "react-icons/fa";

function SAHome() {
  const [hostelNo, setHostelNo] = useState("1");
  const [staffData, setStaffData] = useState({});
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState(null);

  const mainUri = import.meta.env.VITE_MAIN_URI;
  const token = localStorage.getItem("token");
  const saadmin = JSON.parse(localStorage.getItem("SuperAdmin"));

  // Fetch staff data by hostel number
  const fetchStaff = async () => {
    if (!hostelNo) return;
    setLoading(true);
    try {
      const { data } = await axios.post(
        `${mainUri}/api/auth/get-all-staff-details`,
        { hostelNo },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (data.success) setStaffData(data.staff);
      else setStaffData({});
    } catch (err) {
      console.error("Error fetching staff:", err);
      setStaffData({});
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hostelNo) fetchStaff();
  }, [hostelNo]);

  // ✅ Handle input change in modal
  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedStaff((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Handle delete
  const handleDelete = async (id, role) => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("⚠️ User not authenticated!", { position: "top-center" });
      return;
    }

    if (!window.confirm("Are you sure you want to delete this staff member?"))
      return;

    try {
      const res = await fetch(`${mainUri}/api/auth/delete-staff`, {
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

  // ✅ Handle update
  const handleUpdateSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("⚠️ User not authenticated!", { position: "top-center" });
      return;
    }

    try {
      const res = await fetch(`${mainUri}/api/auth/update-staff`, {
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

  // ✅ Reusable section for each role
  const RoleSection = ({ title, people }) => {
    if (!people || people.length === 0) return null;
    return (
      <div className="mb-10 w-full">
        <h2 className="text-2xl font-bold text-gray-800 mb-4 flex justify-center">
          {title}
        </h2>

        <div className="flex flex-wrap justify-center gap-6">
          {people.map((p) => (
            <div
              key={p._id}
              className="relative bg-white rounded-2xl shadow-lg border border-gray-200 p-6 w-64 flex flex-col items-center hover:shadow-xl transition-transform hover:-translate-y-1"
            >
              {/* Edit / Delete Buttons */}
              <div className="absolute top-3 right-3 flex gap-2">
                <button
                  onClick={() => {
                    setSelectedStaff(p);
                    setShowModal(true);
                  }}
                  className="text-blue-600 hover:text-blue-800"
                  title="Edit"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => handleDelete(p._id, p.role)}
                  className="text-red-600 hover:text-red-800"
                  title="Delete"
                >
                  <FaTrash />
                </button>
              </div>

              <img
                src={
                  p.profilePhoto ||
                  "https://cdn-icons-png.flaticon.com/512/149/149071.png"
                }
                alt={p.name}
                className="w-20 h-20 rounded-full object-cover mb-3"
              />
              <h3 className="text-lg font-medium text-gray-900 text-center">
                {p.name || "No Name"}
              </h3>
              <p className="text-sm text-gray-600 text-center mb-1">
                Role: {p.role || "Unknown Role"}
              </p>
              <p className="text-sm text-gray-600 text-center mb-1">
                Email: {p.email || "NA"}
              </p>
              <p className="text-sm text-gray-600 text-center mb-1">
                Contact: {p.phone || "NA"}
              </p>
              <p className="text-sm text-gray-600 text-center mb-1">
                Hostel No: {p.hostelNo || "NA"}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen w-full bg-[#f3e8ff] px-4 sm:px-8 md:px-16 pt-24 pb-20 overflow-x-hidden overflow-y-auto lg:pl-64">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6">
        {/* Page Title */}
        <h1 className="text-black font-bold text-4xl sm:text-5xl text-center">
          Welcome <span className="text-[#4f46e5]">{saadmin?.name}</span>
        </h1>
        <h1 className="text-3xl font-bold text-gray-800 mt-4 text-center">
          🧑‍💼 Hostel Staff Directory
        </h1>

        {/* Hostel Selector */}
        <div className="flex justify-center mt-4">
          <select
            className="p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-400"
            onChange={(e) => setHostelNo(e.target.value)}
            value={hostelNo}
          >
            <option value="">Select Hostel</option>
            <option value="1">Hostel 1</option>
            <option value="2">Hostel 2</option>
            <option value="3">Hostel 3</option>
            <option value="4">Hostel 4</option>
            <option value="5">Hostel 5</option>
          </select>
        </div>

        {/* Loading / Empty States */}
        {loading && (
          <p className="text-center text-gray-600 text-lg pt-10">
            Loading staff details...
          </p>
        )}

        {!loading && !hostelNo && (
          <p className="text-center text-gray-500 text-lg pt-10">
            Please select a hostel to view staff details.
          </p>
        )}

        {/* Staff Details */}
        {!loading && hostelNo && (
          <div className="w-full mt-8">
            <RoleSection title="Warden" people={staffData.wardens} />
            <RoleSection title="Manager" people={staffData.managers} />
            <RoleSection title="Caretaker" people={staffData.caretakers} />
            <RoleSection
              title="Security Incharge"
              people={staffData.securityIncharges}
            />
            <RoleSection title="Guard" people={staffData.guards} />
            <RoleSection
              title="Privileged Students"
              people={staffData.privilegedStudents}
            />
          </div>
        )}

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
                  <option value="NA">NA</option>
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

        <ToastContainer />
      </div>
    </div>
  );
}

export default SAHome;
