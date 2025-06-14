import React from "react";
import {
  CheckCircleIcon,
  XCircleIcon,
  ClockIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/24/solid";

const statusSteps = [
  { id: 1, name: "Sent", icon: PaperAirplaneIcon },
  { id: 2, name: "In Progress", icon: ClockIcon },
  { id: 3, name: "Success", icon: CheckCircleIcon },
  { id: 4, name: "Pending", icon: XCircleIcon },
];

const EventStatus = ({ currentStatus }) => {
  const current = currentStatus?.status || "";

  const getStatusClass = (stepName) => {
    if (stepName === current) {
      return "text-[#4f46e5]"; // Indigo for the current status
    } else if (
      ["Success", "Failure"].includes(current) &&
      (stepName === "Sent" || stepName === "In Progress")
    ) {
      return "text-green-400"; // Green for success
    } else if (stepName === "Pending" && current === "Pending") {
      return "text-red-400"; // Red for pending status
    }
    return "text-black/60"; // Default text color for other steps
  };

  const renderSteps = () => {
    const visibleSteps =
      current === "Pending"
        ? ["Sent", "In Progress", "Pending"]
        : current === "Success"
        ? ["Sent", "In Progress", "Success"]
        : ["Sent", "In Progress", "Failure"];
    return visibleSteps.map((step, index) => {
      const StepIcon = statusSteps.find((s) => s.name === step)?.icon;
      return (
        <div key={step} className="flex items-center border-b pb-2">
          {StepIcon && <StepIcon className={`h-6 w-6 ${getStatusClass(step)}`} />}
          <span className={`ml-2 text-sm font-medium ${getStatusClass(step)}`}>
            {step}
          </span>
          {index < visibleSteps.length - 1 && (
            <div className="w-10 h-1 bg-black/40 mx-2 rounded-full" />
          )}
        </div>
      );
    });
  };

  return (
 <div className="p-4 sm:p-6 shadow-lg rounded-xl bg-white text-black border mb-4 w-full max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto">

     <h2 className="text-3xl font-bold text-[#4f46e5] text-center mt-4 mb-4">Event Fund Request</h2>


      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
        <div className="flex flex-col gap-1 border p-4 rounded-lg shadow-sm bg-[#f3e8ff]">
          <p><strong>Event Details:</strong> {currentStatus.eventDetails}</p>
          <p><strong>Fund Required:</strong> ₹{currentStatus.fundRequired}</p>
        </div>
        <div className="border p-4 rounded-lg shadow-sm bg-[#f3e8ff]">
          <p><strong>Status:</strong> <span className={`font-semibold ${getStatusClass(current)}`}>{current}</span></p>
        </div>
      </div>

      {/* Progress Steps */}
      {/* <div className="flex flex-col items-center justify-center mt-4 gap-2">
        <h3 className="text-lg font-semibold mb-2 text-[#4f46e5]">Progress</h3>
        <div className="flex gap-4">{renderSteps()}</div>
      </div> */}
    </div>
  );
};

export default EventStatus;
