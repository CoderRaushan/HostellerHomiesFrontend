


import { useState, useEffect } from "react";
import axios from "axios";

function SecurityGuardDetails() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [guardDetails, setGuardDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token= localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${mainUri}/api/guard`,
          {
            headers: { "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
             }
          }
        );
        setGuardDetails(response.data.guards || []);
      } catch (err) {
        setError("Failed to fetch security guard details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [mainUri]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg font-semibold bg-[#f3e8ff] text-[#4f46e5]">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen text-lg bg-[#f3e8ff] text-[#e11d48]">
        {error}
      </div>
    );
  }

  // Filter for guards with status "Active"
  const activeGuards = guardDetails.filter(guard => guard.status === "Active");

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-white mt-16"
    >
      <div
        className="rounded-3xl p-4 sm:p-8 max-w-3xl w-full shadow-2xl bg-white"
      >
        <h2
          className="text-2xl sm:text-3xl font-bold text-center mb-8 text-[#4f46e5]"
        >
          Security Guard Details
        </h2>

        {activeGuards.length > 0 ? (
          activeGuards.map((guard, index) => (
            <div
              key={index}
              className="mb-6 p-4 sm:p-6 rounded-2xl shadow-md bg-[#f9f9f9]"
            >
              <p className="text-base sm:text-lg font-semibold mb-2 text-black">
                <span className="text-[#4f46e5]">Name:</span> {guard.name}
              </p>
              <p className="text-base sm:text-lg font-semibold mb-2 text-black">
                <span className="text-[#4f46e5]">Email:</span> {guard.email}
              </p>
              <p className="text-base sm:text-lg font-semibold mb-2 text-black">
                <span className="text-[#4f46e5]">Shift:</span> {guard.shift}
              </p>
              <p className="text-base sm:text-lg font-semibold mb-2 text-black">
                <span className="text-[#4f46e5]">Contact:</span> {guard.phone}
              </p>
              <p className="text-base sm:text-lg font-semibold text-black">
                <span className="text-[#4f46e5]">Status:</span>{" "}
                <span className="ml-1 text-[#22c55e]">
                  Active
                </span>
              </p>
            </div>
          ))
        ) : (
          <p className="text-center text-lg sm:text-xl font-medium text-black">
            No guards currently on duty.
          </p>
        )}
      </div>
    </div>
  );
}

export default SecurityGuardDetails;