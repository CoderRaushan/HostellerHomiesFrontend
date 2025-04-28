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
