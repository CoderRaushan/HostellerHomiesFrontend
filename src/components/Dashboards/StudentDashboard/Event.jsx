// // // import React, { useState, useEffect } from "react";
// // // import axios from "axios";
// // // import { ToastContainer, toast } from "react-toastify";
// // // import {
// // //   CheckCircleIcon,
// // //   XCircleIcon,
// // //   ClockIcon,
// // //   PaperAirplaneIcon,
// // // } from "@heroicons/react/24/solid";
// // // import "react-toastify/dist/ReactToastify.css";

// // // const Event = () => {
// // //   const storedStudent = JSON.parse(localStorage.getItem("Student"));
// // //   const studentId = storedStudent?.id || "";
// // //   const mainUri = import.meta.env.VITE_MAIN_URI;
// // //   const token = localStorage.getItem("token");

// // //   const [formData, setFormData] = useState({
// // //     eventDetails: "",
// // //     fundRequired: "",
// // //     hostelNumber: "",
// // //   });
// // //   const [eventList, setEventList] = useState([]);
// // //   const [loading, setLoading] = useState(true);

// // //   const hostelOptions = [
// // //     { value: "", label: "Select Hostel" },
// // //     { value: 1, label: "Hostel No 1" },
// // //     { value: 2, label: "Hostel No 2" },
// // //     { value: 3, label: "Hostel No 3" },
// // //     { value: 4, label: "Hostel No 4" },
// // //     { value: 5, label: "Hostel No 5" },
// // //   ];

// // //   // ✅ Fetch all events of current student
// // //   const fetchEvents = async () => {
// // //     try {
// // //       setLoading(true);
// // //       const res = await axios.post(
// // //         `${mainUri}/api/Event/EventFund/student/get`,
// // //         { studentId },
// // //         {
// // //           headers: {
// // //             "Content-Type": "application/json",
// // //             Authorization: `Bearer ${token}`,
// // //           },
// // //         }
// // //       );
// // //       if (res.data.success) setEventList(res.data.eventDetails);
// // //       else setEventList([]);
// // //     } catch (err) {
// // //       toast.error("Failed to load event data.");
// // //     } finally {
// // //       setLoading(false);
// // //     }
// // //   };

// // //   useEffect(() => {
// // //     if (studentId) fetchEvents();
// // //   }, [studentId]);

// // //   // ✅ Handle input change
// // //   const handleChange = (e) => {
// // //     const { name, value } = e.target;
// // //     setFormData((prev) => ({ ...prev, [name]: value }));
// // //   };

// // //   // ✅ Submit event fund request
// // //   const handleSubmit = async (e) => {
// // //     e.preventDefault();
// // //     if (!storedStudent) return toast.error("Please login first!");
// // //     if (!formData.hostelNumber)
// // //       return toast.error("Please select a hostel number!");

// // //     const payload = {
// // //       student: studentId,
// // //       name: storedStudent.name,
// // //       urn: storedStudent.urn,
// // //       roomNumber: storedStudent.room_no,
// // //       hostelNumber: formData.hostelNumber,
// // //       eventDetails: formData.eventDetails,
// // //       fundRequired: formData.fundRequired,
// // //     };

// // //     try {
// // //       const res = await axios.post(`${mainUri}/api/Event/EventFund`, payload, {
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Authorization: `Bearer ${token}`,
// // //         },
// // //       });
// // //       if (res.data.success) {
// // //         toast.success("Event Fund Submitted Successfully!");
// // //         setFormData({ eventDetails: "", fundRequired: "", hostelNumber: "" });
// // //         fetchEvents();
// // //       } else toast.error(res.data.msg || "Something went wrong!");
// // //     } catch (err) {
// // //       toast.error(err.response?.data?.msg || "Server Error!");
// // //     }
// // //   };

// // //   const getStatusColor = (status) => {
// // //     switch (status) {
// // //       case "chief_approved":
// // //         return "text-green-600";
// // //       case "warden_approved":
// // //         return "text-blue-600";
// // //       case "warden_rejected":
// // //       case "chief_rejected":
// // //         return "text-red-600";
// // //       case "pending":
// // //       default:
// // //         return "text-yellow-600";
// // //     }
// // //   };

// // //   const statusIcons = {
// // //     pending: ClockIcon,
// // //     warden_approved: CheckCircleIcon,
// // //     chief_approved: CheckCircleIcon,
// // //     warden_rejected: XCircleIcon,
// // //     chief_rejected: XCircleIcon,
// // //   };

// // //   return (
// // //     <div className="flex flex-col justify-center items-center min-h-screen bg-[#f3e8ff] pt-24 px-4 sm:px-6">
// // //       <ToastContainer />
// // //       {/* Form */}
// // //       <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-10">
// // //         <h2 className="text-3xl font-bold text-[#4f46e5] text-center mb-4">
// // //           Event Fund Request
// // //         </h2>
// // //         <form onSubmit={handleSubmit} className="space-y-4">
// // //           <textarea
// // //             name="eventDetails"
// // //             placeholder="Event Details"
// // //             rows="3"
// // //             className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
// // //             value={formData.eventDetails}
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //           <select
// // //             name="hostelNumber"
// // //             className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
// // //             value={formData.hostelNumber}
// // //             onChange={handleChange}
// // //             required
// // //           >
// // //             {hostelOptions.map((h) => (
// // //               <option key={h.value} value={h.value}>
// // //                 {h.label}
// // //               </option>
// // //             ))}
// // //           </select>
// // //           <input
// // //             type="number"
// // //             name="fundRequired"
// // //             placeholder="Fund Required (₹)"
// // //             className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
// // //             value={formData.fundRequired}
// // //             onChange={handleChange}
// // //             required
// // //           />
// // //           <div className="text-center">
// // //             <button
// // //               type="submit"
// // //               className="bg-[#4f46e5] hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
// // //             >
// // //               Submit
// // //             </button>
// // //           </div>
// // //         </form>
// // //       </div>

// // //       {/* List */}
// // //       <div className="w-full max-w-4xl text-black">
// // //         <h2 className="text-xl font-bold mb-4 text-[#4f46e5]">
// // //           Your Event Fund Requests
// // //         </h2>
// // //         {loading ? (
// // //           <p>Loading events...</p>
// // //         ) : eventList.length > 0 ? (
// // //           eventList.map((event) => {
// // //             const Icon = statusIcons[event.status] || PaperAirplaneIcon;
// // //             return (
// // //               <div
// // //                 key={event._id}
// // //                 className="p-5 mb-4 bg-white shadow-md border border-gray-200 rounded-xl"
// // //               >
// // //                 <div className="flex justify-between items-center mb-3">
// // //                   <h3 className="text-lg font-bold text-[#4f46e5]">
// // //                     {event.eventDetails}
// // //                   </h3>
// // //                   <div className="flex items-center gap-2">
// // //                     <Icon className={`h-6 w-6 ${getStatusColor(event.status)}`} />
// // //                     <span
// // //                       className={`font-semibold ${getStatusColor(event.status)}`}
// // //                     >
// // //                       {event.status.replace("_", " ").toUpperCase()}
// // //                     </span>
// // //                   </div>
// // //                 </div>
// // //                 <p><strong>Fund:</strong> ₹{event.fundRequired}</p>
// // //                 <p><strong>Hostel:</strong> {event.hostelNumber}</p>
// // //                 <p className="text-xs text-gray-500">
// // //                   {new Date(event.createdAt).toLocaleString("en-IN")}
// // //                 </p>
// // //                 <div className="mt-2 text-sm text-gray-700">
// // //                   <p><strong>Warden:</strong> {event.wardenApproval?.status || "Pending"} {event.wardenApproval?.remark && `(${event.wardenApproval.remark})`}</p>
// // //                   <p><strong>Chief Warden:</strong> {event.chiefApproval?.status || "Pending"} {event.chiefApproval?.remark && `(${event.chiefApproval.remark})`}</p>
// // //                 </div>
// // //               </div>
// // //             );
// // //           })
// // //         ) : (
// // //           <p className="text-gray-600">No requests found.</p>
// // //         )}
// // //       </div>
// // //     </div>
// // //   );
// // // };

// // // export default Event;

// // import React, { useState, useEffect } from "react";
// // import axios from "axios";
// // import { ToastContainer, toast } from "react-toastify";
// // import {
// //   CheckCircleIcon,
// //   XCircleIcon,
// //   ClockIcon,
// //   PaperAirplaneIcon,
// // } from "@heroicons/react/24/solid";
// // import "react-toastify/dist/ReactToastify.css";

// // const Event = () => {
// //   const storedStudent = JSON.parse(localStorage.getItem("Student"));
// //   const studentId = storedStudent?.id || "";
// //   const mainUri = import.meta.env.VITE_MAIN_URI;
// //   const token = localStorage.getItem("token");

// //   const [formData, setFormData] = useState({
// //     eventDetails: "",
// //     fundRequired: "",
// //     hostelNumber: "",
// //   });
// //   const [eventList, setEventList] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   const hostelOptions = [
// //     { value: "", label: "Select Hostel" },
// //     { value: 1, label: "Hostel No 1" },
// //     { value: 2, label: "Hostel No 2" },
// //     { value: 3, label: "Hostel No 3" },
// //     { value: 4, label: "Hostel No 4" },
// //     { value: 5, label: "Hostel No 5" },
// //   ];

// //   const fetchEvents = async () => {
// //     try {
// //       setLoading(true);
// //       const res = await axios.post(
// //         `${mainUri}/api/Event/EventFund/student/get`,
// //         { studentId },
// //         {
// //           headers: {
// //             "Content-Type": "application/json",
// //             Authorization: `Bearer ${token}`,
// //           },
// //         }
// //       );
// //       if (res.data.success) setEventList(res.data.eventDetails);
// //       else setEventList([]);
// //     } catch (err) {
// //       toast.error("Failed to load event data.");
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   useEffect(() => {
// //     if (studentId) fetchEvents();
// //   }, [studentId]);

// //   const handleChange = (e) => {
// //     const { name, value } = e.target;
// //     setFormData((prev) => ({ ...prev, [name]: value }));
// //   };

// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     if (!storedStudent) return toast.error("Please login first!");
// //     if (!formData.hostelNumber)
// //       return toast.error("Please select a hostel number!");

// //     const payload = {
// //       student: studentId,
// //       name: storedStudent.name,
// //       urn: storedStudent.urn,
// //       roomNumber: storedStudent.room_no,
// //       hostelNumber: formData.hostelNumber,
// //       eventDetails: formData.eventDetails,
// //       fundRequired: formData.fundRequired,
// //     };

// //     try {
// //       const res = await axios.post(`${mainUri}/api/Event/EventFund`, payload, {
// //         headers: {
// //           "Content-Type": "application/json",
// //           Authorization: `Bearer ${token}`,
// //         },
// //       });
// //       if (res.data.success) {
// //         toast.success("Event Fund Submitted Successfully!");
// //         setFormData({ eventDetails: "", fundRequired: "", hostelNumber: "" });
// //         fetchEvents();
// //       } else toast.error(res.data.msg || "Something went wrong!");
// //     } catch (err) {
// //       toast.error(err.response?.data?.msg || "Server Error!");
// //     }
// //   };

// //   // Helper for visual tracker
// //   const getStepStatus = (event) => {
// //     const steps = {
// //       pending: 1,
// //       warden_approved: 2,
// //       chief_approved: 3,
// //       rejected: -1,
// //     };

// //     if (event.status.includes("rejected")) return -1;
// //     return steps[event.status] || 1;
// //   };

// //   return (
// //     <div className="flex flex-col justify-center items-center min-h-screen bg-[#f3e8ff] pt-24 px-4 sm:px-6">
// //       <ToastContainer />
// //       {/* Request Form */}
// //       <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-10">
// //         <h2 className="text-3xl font-bold text-[#4f46e5] text-center mb-4">
// //           Event Fund Request
// //         </h2>
// //         <form onSubmit={handleSubmit} className="space-y-4">
// //           <textarea
// //             name="eventDetails"
// //             placeholder="Event Details"
// //             rows="3"
// //             className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
// //             value={formData.eventDetails}
// //             onChange={handleChange}
// //             required
// //           />
// //           <select
// //             name="hostelNumber"
// //             className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
// //             value={formData.hostelNumber}
// //             onChange={handleChange}
// //             required
// //           >
// //             {hostelOptions.map((h) => (
// //               <option key={h.value} value={h.value}>
// //                 {h.label}
// //               </option>
// //             ))}
// //           </select>
// //           <input
// //             type="number"
// //             name="fundRequired"
// //             placeholder="Fund Required (₹)"
// //             className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
// //             value={formData.fundRequired}
// //             onChange={handleChange}
// //             required
// //           />
// //           <div className="text-center">
// //             <button
// //               type="submit"
// //               className="bg-[#4f46e5] hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
// //             >
// //               Submit
// //             </button>
// //           </div>
// //         </form>
// //       </div>

// //       {/* Events List */}
// //       <div className="w-full max-w-4xl text-black">
// //         <h2 className="text-xl font-bold mb-4 text-[#4f46e5]">
// //           Your Event Fund Requests
// //         </h2>
// //         {loading ? (
// //           <p>Loading events...</p>
// //         ) : eventList.length > 0 ? (
// //           eventList.map((event) => {
// //             const step = getStepStatus(event);
// //             const rejected = step === -1;

// //             return (
// //               <div
// //                 key={event._id}
// //                 className="p-5 mb-5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
// //               >
// //                 <div className="flex justify-between items-center mb-3">
// //                   <h3 className="text-lg font-semibold text-[#4f46e5]">
// //                     {event.eventDetails}
// //                   </h3>
// //                   <PaperAirplaneIcon
// //                     className={`h-6 w-6 ${
// //                       rejected
// //                         ? "text-red-500"
// //                         : step === 3
// //                         ? "text-green-600"
// //                         : "text-yellow-500"
// //                     }`}
// //                   />
// //                 </div>

// //                 <p>
// //                   <strong>Fund:</strong> ₹{event.fundRequired}
// //                 </p>
// //                 <p>
// //                   <strong>Hostel:</strong> {event.hostelNumber}
// //                 </p>
// //                 <p className="text-xs text-gray-500 mb-4">
// //                   {new Date(event.createdAt).toLocaleString("en-IN")}
// //                 </p>

// //                 {/* Flipkart-style Status Tracker */}
// //                 <div className="relative flex justify-between items-center mb-3">
// //                   {["Pending", "Warden", "Chief Warden", "End"].map(
// //                     (label, idx) => {
// //                       const isActive =
// //                         step >= idx + 1 ||
// //                         (label === "End" && step === 3) ||
// //                         (rejected && idx < 3);
// //                       return (
// //                         <div
// //                           key={label}
// //                           className="flex flex-col items-center flex-1 relative"
// //                         >
// //                           <div
// //                             className={`h-6 w-6 rounded-full border-2 ${
// //                               rejected
// //                                 ? "border-red-500 bg-red-500"
// //                                 : isActive
// //                                 ? "border-green-500 bg-green-500"
// //                                 : "border-gray-300 bg-white"
// //                             }`}
// //                           ></div>
// //                           {idx < 3 && (
// //                             <div
// //                               className={`absolute top-3 left-1/2 w-full h-[2px] ${
// //                                 rejected
// //                                   ? "bg-red-500"
// //                                   : isActive
// //                                   ? "bg-green-500"
// //                                   : "bg-gray-300"
// //                               }`}
// //                             ></div>
// //                           )}
// //                           <span className="text-xs mt-2 font-semibold text-gray-700">
// //                             {label}
// //                           </span>
// //                         </div>
// //                       );
// //                     }
// //                   )}
// //                 </div>

// //                 <div className="text-sm text-gray-700 mt-2">
// //                   <p>
// //                     <strong>Warden:</strong>{" "}
// //                     {event.wardenApproval?.status || "Pending"}{" "}
// //                     {event.wardenApproval?.remark &&
// //                       `(${event.wardenApproval.remark})`}
// //                   </p>
// //                   <p>
// //                     <strong>Chief Warden:</strong>{" "}
// //                     {event.chiefApproval?.status || "Pending"}{" "}
// //                     {event.chiefApproval?.remark &&
// //                       `(${event.chiefApproval.remark})`}
// //                   </p>
// //                 </div>
// //               </div>
// //             );
// //           })
// //         ) : (
// //           <p className="text-gray-600">No requests found.</p>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default Event;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import {
//   CheckCircleIcon,
//   XCircleIcon,
//   ClockIcon,
//   PaperAirplaneIcon,
// } from "@heroicons/react/24/solid";
// import "react-toastify/dist/ReactToastify.css";

// const Event = () => {
//   const storedStudent = JSON.parse(localStorage.getItem("Student"));
//   const studentId = storedStudent?.id || "";
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const token = localStorage.getItem("token");

//   const [formData, setFormData] = useState({
//     eventDetails: "",
//     fundRequired: "",
//     hostelNumber: "",
//   });
//   const [eventList, setEventList] = useState([]);
//   const [loading, setLoading] = useState(true);

//   const hostelOptions = [
//     { value: "", label: "Select Hostel" },
//     { value: 1, label: "Hostel No 1" },
//     { value: 2, label: "Hostel No 2" },
//     { value: 3, label: "Hostel No 3" },
//     { value: 4, label: "Hostel No 4" },
//     { value: 5, label: "Hostel No 5" },
//   ];

//   // ✅ Fetch all events
//   const fetchEvents = async () => {
//     try {
//       setLoading(true);
//       const res = await axios.post(
//         `${mainUri}/api/Event/EventFund/student/get`,
//         { studentId },
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       if (res.data.success) setEventList(res.data.eventDetails);
//       else setEventList([]);
//     } catch (err) {
//       toast.error("Failed to load event data.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (studentId) fetchEvents();
//   }, [studentId]);

//   // ✅ Handle Input
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//   };

//   // ✅ Submit Event Request
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!storedStudent) return toast.error("Please login first!");
//     if (!formData.hostelNumber)
//       return toast.error("Please select a hostel number!");

//     const payload = {
//       student: studentId,
//       name: storedStudent.name,
//       urn: storedStudent.urn,
//       roomNumber: storedStudent.room_no,
//       hostelNumber: formData.hostelNumber,
//       eventDetails: formData.eventDetails,
//       fundRequired: formData.fundRequired,
//     };

//     try {
//       const res = await axios.post(`${mainUri}/api/Event/EventFund`, payload, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });
//       if (res.data.success) {
//         toast.success("Event Fund Submitted Successfully!");
//         setFormData({ eventDetails: "", fundRequired: "", hostelNumber: "" });
//         fetchEvents();
//       } else toast.error(res.data.msg || "Something went wrong!");
//     } catch (err) {
//       toast.error(err.response?.data?.msg || "Server Error!");
//     }
//   };

//   // ✅ Determine Step Progress
//   const getStepProgress = (status) => {
//     switch (status) {
//       case "pending":
//         return { step: 1, rejected: false };
//       case "warden_approved":
//         return { step: 2, rejected: false };
//       case "chief_approved":
//         return { step: 3, rejected: false };
//       case "warden_rejected":
//         return { step: 2, rejected: true };
//       case "chief_rejected":
//         return { step: 3, rejected: true };
//       default:
//         return { step: 1, rejected: false };
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center min-h-screen bg-[#f3e8ff] pt-24 px-4 sm:px-6">
//       <ToastContainer />
//       {/* FORM SECTION */}
//       <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-10">
//         <h2 className="text-3xl font-bold text-[#4f46e5] text-center mb-4">
//           Event Fund Request
//         </h2>
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <textarea
//             name="eventDetails"
//             placeholder="Event Details"
//             rows="3"
//             className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
//             value={formData.eventDetails}
//             onChange={handleChange}
//             required
//           />
//           <select
//             name="hostelNumber"
//             className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
//             value={formData.hostelNumber}
//             onChange={handleChange}
//             required
//           >
//             {hostelOptions.map((h) => (
//               <option key={h.value} value={h.value}>
//                 {h.label}
//               </option>
//             ))}
//           </select>
//           <input
//             type="number"
//             name="fundRequired"
//             placeholder="Fund Required (₹)"
//             className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
//             value={formData.fundRequired}
//             onChange={handleChange}
//             required
//           />
//           <div className="text-center">
//             <button
//               type="submit"
//               className="bg-[#4f46e5] hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
//             >
//               Submit
//             </button>
//           </div>
//         </form>
//       </div>

//       {/* EVENTS SECTION */}
//       <div className="w-full max-w-4xl text-black">
//         <h2 className="text-xl font-bold mb-4 text-[#4f46e5]">
//           Your Event Fund Requests
//         </h2>

//         {loading ? (
//           <p>Loading events...</p>
//         ) : eventList.length > 0 ? (
//           eventList.map((event) => {
//             const { step, rejected } = getStepProgress(event.status);

//             return (
//               <div
//                 key={event._id}
//                 className="p-5 mb-5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
//               >
//                 <div className="flex justify-between items-center mb-3">
//                   <h3 className="text-lg font-semibold text-[#4f46e5]">
//                     {event.eventDetails}
//                   </h3>
//                   <PaperAirplaneIcon
//                     className={`h-6 w-6 ${
//                       rejected
//                         ? "text-red-500"
//                         : step === 3
//                         ? "text-green-600"
//                         : "text-yellow-500"
//                     }`}
//                   />
//                 </div>

//                 <p>
//                   <strong>Fund:</strong> ₹{event.fundRequired}
//                 </p>
//                 <p>
//                   <strong>Hostel:</strong> {event.hostelNumber}
//                 </p>
//                 <p className="text-xs text-gray-500 mb-4">
//                   {new Date(event.createdAt).toLocaleString("en-IN")}
//                 </p>

//                 {/* 🚀 FLIPKART-LIKE STATUS TRACKER */}
//                 <div className="relative flex justify-between items-center mb-4 px-4">
//                   {["Pending", "Warden", "Chief Warden", "End"].map(
//                     (label, idx) => {
//                       const circleActive = !rejected && step >= idx + 1;
//                       const lineActive = !rejected && step > idx + 1;
//                       const isRejectedStep =
//                         rejected && (idx + 1) === step; // where rejection occurred

//                       return (
//                         <div
//                           key={label}
//                           className="flex flex-col items-center flex-1 relative"
//                         >
//                           {/* Circle */}
//                           <div
//                             className={`h-6 w-6 rounded-full border-2 z-10 ${
//                               rejected
//                                 ? "border-red-500 bg-red-500"
//                                 : circleActive
//                                 ? "border-green-500 bg-green-500"
//                                 : "border-gray-300 bg-white"
//                             } ${isRejectedStep ? "animate-pulse" : ""}`}
//                           ></div>

//                           {/* Connecting Line */}
//                           {idx < 3 && (
//                             <div
//                               className={`absolute top-3 left-1/2 w-full h-[2px] ${
//                                 rejected
//                                   ? "bg-red-500"
//                                   : lineActive
//                                   ? "bg-green-500"
//                                   : "bg-gray-300"
//                               }`}
//                             ></div>
//                           )}

//                           {/* Label */}
//                           <span className="text-xs mt-2 font-semibold text-gray-700">
//                             {label}
//                           </span>
//                         </div>
//                       );
//                     }
//                   )}
//                 </div>

//                 {/* STATUS DETAILS */}
//                 <div className="text-sm text-gray-700 mt-2">
//                   <p>
//                     <strong>Warden:</strong>{" "}
//                     {event.wardenApproval?.status || "Pending"}{" "}
//                     {event.wardenApproval?.remark &&
//                       `(${event.wardenApproval.remark})`}
//                   </p>
//                   <p>
//                     <strong>Chief Warden:</strong>{" "}
//                     {event.chiefApproval?.status || "Pending"}{" "}
//                     {event.chiefApproval?.remark &&
//                       `(${event.chiefApproval.remark})`}
//                   </p>
//                 </div>
//               </div>
//             );
//           })
//         ) : (
//           <p className="text-gray-600">No requests found.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Event;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import "react-toastify/dist/ReactToastify.css";

const Event = () => {
  const storedStudent = JSON.parse(localStorage.getItem("Student"));
  const studentId = storedStudent?.id || "";
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    eventDetails: "",
    fundRequired: "",
    hostelNumber: "",
  });
  const [eventList, setEventList] = useState([]);
  const [loading, setLoading] = useState(true);

  const hostelOptions = [
    { value: "", label: "Select Hostel" },
    { value: 1, label: "Hostel No 1" },
    { value: 2, label: "Hostel No 2" },
    { value: 3, label: "Hostel No 3" },
    { value: 4, label: "Hostel No 4" },
    { value: 5, label: "Hostel No 5" },
  ];

  // ✅ Fetch all events
  const fetchEvents = async () => {
    try {
      setLoading(true);
      const res = await axios.post(
        `${mainUri}/api/Event/EventFund/student/get`,
        { studentId },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.data.success) setEventList(res.data.eventDetails);
      else setEventList([]);
    } catch (err) {
      toast.error("Failed to load event data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (studentId) fetchEvents();
  }, [studentId]);

  // ✅ Handle Input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Submit Event Request
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!storedStudent) return toast.error("Please login first!");
    if (!formData.hostelNumber)
      return toast.error("Please select a hostel number!");

    const payload = {
      student: studentId,
      name: storedStudent.name,
      urn: storedStudent.urn,
      roomNumber: storedStudent.room_no,
      hostelNumber: formData.hostelNumber,
      eventDetails: formData.eventDetails,
      fundRequired: formData.fundRequired,
    };

    try {
      const res = await axios.post(`${mainUri}/api/Event/EventFund`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.data.success) {
        toast.success("Event Fund Submitted Successfully!");
        setFormData({ eventDetails: "", fundRequired: "", hostelNumber: "" });
        fetchEvents();
      } else toast.error(res.data.msg || "Something went wrong!");
    } catch (err) {
      toast.error(err.response?.data?.msg || "Server Error!");
    }
  };

  // ✅ Determine Step Progress
  const getStepProgress = (status) => {
    switch (status) {
      case "pending":
        return { step: 1, rejected: false };
      case "warden_approved":
        return { step: 2, rejected: false };
      case "chief_approved":
        return { step: 4, rejected: false }; // ✅ FIX: goes to “End”
      case "warden_rejected":
        return { step: 2, rejected: true };
      case "chief_rejected":
        return { step: 3, rejected: true };
      default:
        return { step: 1, rejected: false };
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f3e8ff] pt-24 px-4 sm:px-6">
      <ToastContainer />
      {/* FORM SECTION */}
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg border border-gray-200 mb-10">
        <h2 className="text-3xl font-bold text-[#4f46e5] text-center mb-4">
          Event Fund Request
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <textarea
            name="eventDetails"
            placeholder="Event Details"
            rows="3"
            className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
            value={formData.eventDetails}
            onChange={handleChange}
            required
          />
          <select
            name="hostelNumber"
            className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
            value={formData.hostelNumber}
            onChange={handleChange}
            required
          >
            {hostelOptions.map((h) => (
              <option key={h.value} value={h.value}>
                {h.label}
              </option>
            ))}
          </select>
          <input
            type="number"
            name="fundRequired"
            placeholder="Fund Required (₹)"
            className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
            value={formData.fundRequired}
            onChange={handleChange}
            required
          />
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#4f46e5] hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* EVENTS SECTION */}
      <div className="w-full max-w-4xl text-black">
        <h2 className="text-xl font-bold mb-4 text-[#4f46e5]">
          Your Event Fund Requests
        </h2>

        {loading ? (
          <p>Loading events...</p>
        ) : eventList.length > 0 ? (
          eventList.map((event) => {
            const { step, rejected } = getStepProgress(event.status);

            return (
              <div
                key={event._id}
                className="p-5 mb-5 bg-white border border-gray-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-semibold text-[#4f46e5]">
                    {event.eventDetails}
                  </h3>
                  {/* <PaperAirplaneIcon
                    className={`h-6 w-6 ${
                      rejected
                        ? "text-red-500"
                        : step === 4
                        ? "text-green-600"
                        : "text-yellow-500"
                    }`}
                  /> */}
                  <strong
                    className={
                      event?.status === "pending"
                        ? "text-yellow-500"
                        : event?.status === "warden_approved"
                        ? "text-blue-500"
                        : event?.status === "warden_rejected"
                        ? "text-red-500"
                        : event?.status === "chief_approved"
                        ? "text-green-500"
                        : event?.status === "chief_rejected"
                        ? "text-red-600"
                        : "text-gray-500"
                    }
                  >
                    {event?.status}
                  </strong>
                </div>
                <p>
                  <strong>Fund:</strong> ₹{event.fundRequired}
                </p>
                <p>
                  <strong>Hostel:</strong> {event.hostelNumber}
                </p>
                <p className="text-xs text-gray-500 mb-4">
                  {new Date(event.createdAt).toLocaleString("en-IN")}
                </p>

                {/* 🚀 STATUS TRACKER */}
                <div className="relative flex justify-between items-center mb-4 px-4">
                  {["Pending", "Warden", "Chief Warden", "End"].map(
                    (label, idx) => {
                      const circleActive = !rejected && step >= idx + 1;
                      const lineActive = !rejected && step > idx + 1;
                      const isRejectedStep = rejected && idx + 1 === step;

                      return (
                        <div
                          key={label}
                          className="flex flex-col items-center flex-1 relative"
                        >
                          {/* Circle */}
                          <div
                            className={`h-6 w-6 rounded-full border-2 z-10 ${
                              rejected
                                ? "border-red-500 bg-red-500"
                                : circleActive
                                ? "border-green-500 bg-green-500"
                                : "border-gray-300 bg-white"
                            } ${isRejectedStep ? "animate-pulse" : ""}`}
                          ></div>

                          {/* Connecting Line */}
                          {idx < 3 && (
                            <div
                              className={`absolute top-3 left-1/2 w-full h-[2px] ${
                                rejected
                                  ? "bg-red-500"
                                  : lineActive
                                  ? "bg-green-500"
                                  : "bg-gray-300"
                              }`}
                            ></div>
                          )}

                          {/* Label */}
                          <span className="text-xs mt-2 font-semibold text-gray-700">
                            {label}
                          </span>
                        </div>
                      );
                    }
                  )}
                </div>

                {/* STATUS DETAILS */}
                <div className="text-sm text-gray-700 mt-2">
                  <p>
                    <strong>Warden:</strong>{" "}
                    {event.wardenApproval?.status || "Pending"}{" "}
                    {event.wardenApproval?.remark &&
                      `(${event.wardenApproval.remark})`}
                  </p>
                  <p>
                    <strong>Chief Warden:</strong>{" "}
                    {event.chiefApproval?.status || "Pending"}{" "}
                    {event.chiefApproval?.remark &&
                      `(${event.chiefApproval.remark})`}
                  </p>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-600">No requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Event;
