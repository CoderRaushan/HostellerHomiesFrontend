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
  { id: 4, name: "pending", icon: XCircleIcon },
];

const EventStatus = ({ currentStatus }) => {
  const current = currentStatus?.status || "";

  const getStatusClass = (stepName) => {
    if (stepName === current) {
      return "text-blue-400";
    } else if (
      ["Success", "Failure"].includes(current) &&
      (stepName === "Sent" || stepName === "In Progress")
    ) {
      return "text-green-400";
    } else if (stepName === "pending" && current === "pending") {
      return "text-red-400";
    }
    return "text-white/60";
  };

  const renderSteps = () => {
    const visibleSteps =
    current === "pending"
      ? ["Sent", "In Progress", "pending"]
      : current === "success"
      ? ["Sent", "In Progress", "success"]
      : ["Sent", "In Progress", "failed"];
    return visibleSteps.map((step, index) => {
      const StepIcon = statusSteps.find((s) => s.name === step)?.icon;
      return (
        <div key={step} className="flex items-center border-b pb-2">
          {StepIcon && <StepIcon className={`h-6 w-6 ${getStatusClass(step)}`} />}
          <span className={`ml-2 text-sm font-medium ${getStatusClass(step)}`}>
            {step}
          </span>
          {index < visibleSteps.length - 1 && (
            <div className="w-10 h-1 bg-white/40 mx-2 rounded-full" />
          )}
        </div>
      );
    });
  };

  return (
    <div className="p-6 shadow-lg rounded-xl bg-[#111828] text-white border mb-4">
      <h2 className="text-xl font-bold mb-4">Event Fund Request</h2>

      {/* Event Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
        <div className="flex flex-col gap-1 border p-3 rounded-lg">
          <p><strong>Event Details:</strong> {currentStatus.eventDetails}</p>
          <p><strong>Fund Required:</strong> ₹{currentStatus.fundRequired}</p>
        </div>
        <div className="border p-3 rounded-lg">
          <p><strong>Status:</strong> {current}</p>
        </div>
      </div>

      {/* Progress Steps */}
      <div className="flex flex-col items-center justify-center mt-4 gap-2">
        <h3 className="text-lg font-semibold mb-2">Progress</h3>
        <div className="flex gap-4">{renderSteps()}</div>
      </div>
    </div>
  );
};

export default EventStatus;
