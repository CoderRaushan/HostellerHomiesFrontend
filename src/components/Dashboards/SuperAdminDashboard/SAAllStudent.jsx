import React, { useEffect, useState } from "react";
import { getAllStudents } from "../../../utils"; // ✅ your provided function

function SAAllStudent() {
  const [hostelNo, setHostelNo] = useState("1");
  const [allStudents, setAllStudents] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch students when hostelNo changes
  useEffect(() => {
    if (hostelNo) getAll();
  }, [hostelNo]);

  // ✅ Fetch all students for selected hostel
  const getAll = async () => {
    try {
      setLoading(true);
      const data = await getAllStudents(hostelNo); // ✅ pass hostel number here
      if (data && Array.isArray(data.students)) {
        setAllStudents(data.students);
      } else {
        setAllStudents([]);
      }
    } catch (err) {
      console.error("Error fetching students:", err);
      setAllStudents([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex-1 min-h-screen bg-gray-50 overflow-x-hidden lg:ml-64 transition-all duration-300">
      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          🧑‍🎓 All Students by Hostel
        </h1>

        {/* 🏢 Hostel Selector */}
        <div className="flex items-center justify-center mb-6">
          <select
            name="hostelNo"
            id="hostelNo"
            className="p-2 border rounded-md"
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

        {/* 🕒 Loading State */}
        {loading && (
          <div className="text-center text-gray-600 py-6">Loading students...</div>
        )}

        {/* 🚫 No Hostel Selected */}
        {!loading && !hostelNo && (
          <div className="text-center text-gray-500">
            Please select a hostel to view students.
          </div>
        )}

        {/* 🚫 No Students Found */}
        {!loading && hostelNo && allStudents.length === 0 && (
          <div className="text-center text-gray-500">
            No students found in this hostel.
          </div>
        )}

        {/* 🧱 Student Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {allStudents.map((student) => (
            <div
              key={student._id}
              className="bg-white rounded-2xl shadow-md border border-gray-200 p-5 hover:shadow-lg transition-transform hover:-translate-y-1"
            >
              <img
                src={student.profilePhoto}
                alt={student.name}
                className="w-24 h-24 rounded-full mx-auto mb-3 object-cover"
              />
              <h2 className="text-lg font-semibold text-gray-800 text-center">
                {student.name}
              </h2>
              <p className="text-sm text-gray-500 text-center">URN: {student.urn}</p>
              <p className="text-sm text-gray-500 text-center">Branch:{student.dept}</p>
              <p className="text-sm text-gray-600 text-center">
                Room No: {student.room_no}
              </p>
              <p className="text-sm text-gray-600 text-center">
                Batch: {student.batch}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SAAllStudent;
