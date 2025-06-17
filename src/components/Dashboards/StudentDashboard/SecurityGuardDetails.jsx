import { useState, useEffect } from "react";
import axios from "axios";

function SecurityGuardDetails() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [guardDetails, setGuardDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${mainUri}/api/guard/guards`);
        console.log("API Response:", response.data);
        setGuardDetails(response.data || []);
      } catch (err) {
        setError("Failed to fetch security guard details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div
        className="flex justify-center items-center h-screen text-lg font-semibold"
        style={{ backgroundColor: "#f3e8ff", color: "#4f46e5" }}
      >
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex justify-center items-center h-screen text-lg"
        style={{ backgroundColor: "#f3e8ff", color: "#e11d48" }}
      >
        {error}
      </div>
    );
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6"
      style={{ backgroundColor: "#f3e8ff" }}
    >
      <div
        className="rounded-3xl p-8 max-w-3xl w-full shadow-2xl"
        style={{ backgroundColor: "#ffffff" }}
      >
        <h2
          className="text-3xl font-bold text-center mb-8"
          style={{ color: "#4f46e5" }}
        >
          Security Guard Details
        </h2>

        {guardDetails.map(
          (guard, index) =>
            guard.onDuty && (
              <div
                key={index}
                className="mb-6 p-6 rounded-2xl shadow-md"
                style={{ backgroundColor: "#f9f9f9" }}
              >
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#000000" }}
                >
                  <span style={{ color: "#4f46e5" }}>Guard ID:</span>{" "}
                  {guard.guardId}
                </p>
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#000000" }}
                >
                  <span style={{ color: "#4f46e5" }}>Name:</span> {guard.name}
                </p>
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#000000" }}
                >
                  <span style={{ color: "#4f46e5" }}>Shift:</span> {guard.shift}
                </p>
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#000000" }}
                >
                  <span style={{ color: "#4f46e5" }}>Contact:</span>{" "}
                  {guard.contact}
                </p>
                <p
                  className="text-lg font-semibold mb-2"
                  style={{ color: "#000000" }}
                >
                  <span style={{ color: "#4f46e5" }}>Post:</span> {guard.post}
                </p>
                {/* <p className="text-lg font-semibold" style={{ color: "#000000" }}>
                <span style={{ color: "#4f46e5" }}>On Duty:</span>{" "}
                <span className="ml-1" style={{ color: guard.onDuty ? "#22c55e" : "#ef4444" }}>
                  {guard.onDuty ? "Yes" : "No"}
                </span>
              </p> */}
              </div>
            )
        )}

        {guardDetails.filter((guard) => guard.onDuty).length === 0 && (
          <p
            className="text-center text-xl font-medium"
            style={{ color: "#000000" }}
          >
            No guards currently on duty.
          </p>
        )}
      </div>
    </div>
  );
}

export default SecurityGuardDetails;
