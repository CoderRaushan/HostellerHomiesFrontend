// import { useState, useEffect } from "react";
// import { Input } from "../../LandingSite/AuthPage/Input";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Suggestions() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [count, setCount] = useState(0);
//   const [history, setHistory] = useState([]);

//   const student = JSON.parse(localStorage.getItem("student"));

//   // Fetch today's suggestion count
//   const fetchCount = async () => {
//     try {
//       const response = await fetch(`${mainUri}/api/suggestion/count?student=${student._id}`);
//       const data = await response.json();
//       setCount(data.count);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // Fetch last 1 month’s history
//   const fetchHistory = async () => {
//     try {
//       const response = await fetch(`${mainUri}/api/suggestion/history?student=${student._id}`);
//       const data = await response.json();
//       setHistory(data.suggestions || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCount();
//     fetchHistory();
//   }, []);

//   const registerSuggestions = async (e) => {
//     e.preventDefault();

//     if (count >= 4) {
//       toast.error("You can only submit 4 suggestions per day!");
//       return;
//     }

//     try {
//       const response = await fetch(`${mainUri}/api/suggestion/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           student: student._id,
//           hostel: student.hostel,
//           title,
//           description: desc,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success("Suggestion registered successfully");
//         setTitle("");
//         setDesc("");
//         setCount(data.count);
//         fetchHistory(); // Refresh history after new submission
//       } else {
//         toast.error(data.msg || "Suggestion registration failed");
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   const suggestionTitle = {
//     name: "suggestion title",
//     placeholder: "Enter suggestion title",
//     req: true,
//     type: "text",
//     value: title,
//     onChange: (e) => setTitle(e.target.value),
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#f3e8ff] px-4 sm:px-6 md:px-8 py-6">
//       <div className="max-w-4xl mx-auto pt-16 sm:pt-20 md:pt-24">
//         <h1 className="text-[#4f46e5] font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-10">
//           Share Your Suggestions
//         </h1>

//         <p className="text-center text-lg font-medium mb-6 text-gray-700">
//           You’ve submitted{" "}
//           <span className="font-bold text-[#4f46e5]">{count}</span> of 4 suggestions today.
//         </p>

//         <div className="bg-white rounded-xl shadow-lg p-4 sm:p-6 md:p-8 max-w-2xl mx-auto">
//           <form onSubmit={registerSuggestions} className="space-y-6">
//             <div className="space-y-2">
//               <Input field={suggestionTitle} />
//             </div>

//             <div className="space-y-2">
//               <label htmlFor="suggestion" className="block text-sm font-medium text-[#4f46e5]">
//                 Suggestion Details
//               </label>
//               <textarea
//                 id="suggestion"
//                 placeholder="Describe your suggestion in detail..."
//                 rows="5"
//                 className="w-full p-3 border-2 border-[#4f46e5]/20 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/50"
//                 onChange={(e) => setDesc(e.target.value)}
//                 value={desc}
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-[#4f46e5] text-white py-2.5 sm:py-3 px-5 rounded-lg font-semibold hover:bg-[#4338ca] transition duration-200"
//               disabled={!title.trim() || !desc.trim() || count >= 4}
//             >
//               {count >= 4 ? "Daily Limit Reached" : "Submit Suggestion"}
//             </button>
//           </form>
//         </div>

//         {/* 🔹 Suggestion History (last 1 month) */}
//         <div className="mt-12 bg-white rounded-xl shadow-md p-6 max-w-2xl mx-auto">
//           <h2 className="text-[#4f46e5] font-semibold text-2xl mb-4 text-center">
//             Your Suggestions (Last 1 Month)
//           </h2>

//           {history.length === 0 ? (
//             <p className="text-center text-gray-500">No suggestions found.</p>
//           ) : (
//             <ul className="space-y-4">
//               {history.map((sugg, index) => (
//                 <li
//                   key={sugg._id || index}
//                   className="border border-[#4f46e5]/20 rounded-lg p-4 bg-[#f9f8ff]"
//                 >
//                   <h3 className="font-bold text-[#4f46e5]">{sugg.title}</h3>
//                   <p className="text-gray-700 mt-1">{sugg.description}</p>
//                   <p className="text-sm text-gray-500 mt-2">
//                     Status:{" "}
//                     <span
//                       className={
//                         sugg.status === "pending"
//                           ? "text-yellow-600"
//                           : sugg.status === "approved"
//                           ? "text-green-600"
//                           : "text-red-600"
//                       }
//                     >
//                       {sugg.status}
//                     </span>{" "}
//                     | {new Date(sugg.date).toLocaleDateString()}
//                   </p>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default Suggestions;





// import { useState, useEffect } from "react";
// import { Input } from "../../LandingSite/AuthPage/Input";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Suggestions() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [count, setCount] = useState(0);
//   const [history, setHistory] = useState([]);
//   const token = localStorage.getItem("token");
//   const student = JSON.parse(localStorage.getItem("Student"));

//   // 🔹 Fetch today's suggestion count
//   const fetchCount = async () => {
//     try {
//       const response = await fetch(
//         `${mainUri}/api/suggestion/count?student=${student.id}`,
//         {
//           headers: {
//             headers: {
//               contentType: "application/json",
//             },
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       setCount(data.count);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // 🔹 Fetch last 1 month’s history
//   const fetchHistory = async () => {
//     try {
//       const response = await fetch(
//         `${mainUri}/api/suggestion/history?student=${student.id}`,
//         {
//           headers: {
//             contentType: "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       setHistory(data.suggestions || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCount();
//     fetchHistory();
//   }, []);

//   // 🔹 Register a new suggestion
//   const registerSuggestions = async (e) => {
//     e.preventDefault();

//     if (count >= 4) {
//       toast.error("You can only submit 4 suggestions per day!");
//       return;
//     }

//     try {
//       const response = await fetch(`${mainUri}/api/suggestion/register`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`
//          },
//         body: JSON.stringify({
//           student: student.id,
//           hostel: student.hostel,
//           title,
//           description: desc,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success("Suggestion registered successfully");
//         setTitle("");
//         setDesc("");
//         setCount(data.count);
//         fetchHistory();
//       } else {
//         toast.error(data.msg || "Suggestion registration failed");
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   const suggestionTitle = {
//     name: "suggestion title",
//     placeholder: "Enter suggestion title",
//     req: true,
//     type: "text",
//     value: title,
//     onChange: (e) => setTitle(e.target.value),
//   };

//   return (
//     <div className="w-full min-h-screen bg-[#f3e8ff] px-4 sm:px-6 md:px-8 py-6">
//       <div className="max-w-6xl mx-auto pt-16 sm:pt-20 md:pt-24">
//         <h1 className="text-[#4f46e5] font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-10">
//           Share Your Suggestions
//         </h1>

//         <p className="text-center text-lg font-medium mb-6 text-gray-700">
//           You’ve submitted{" "}
//           <span className="font-bold text-[#4f46e5]">{count}</span> of 4
//           suggestions today.
//         </p>

//         {/* 🔹 Two components side-by-side */}
//         <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
//           {/* ✅ Suggestion Form */}
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full md:w-1/2 flex flex-col justify-between min-h-[500px]">
//             <form onSubmit={registerSuggestions} className="space-y-6">
//               <div className="space-y-2">
//                 <Input field={suggestionTitle} />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="suggestion"
//                   className="block text-sm font-medium text-[#4f46e5]"
//                 >
//                   Suggestion Details
//                 </label>
//                 <textarea
//                   id="suggestion"
//                   placeholder="Describe your suggestion in detail..."
//                   rows="5"
//                   className="w-full p-3 border-2 border-[#4f46e5]/20 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/50"
//                   onChange={(e) => setDesc(e.target.value)}
//                   value={desc}
//                   required
//                 />
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-[#4f46e5] text-white py-2.5 sm:py-3 px-5 rounded-lg font-semibold hover:bg-[#4338ca] transition duration-200"
//                 disabled={!title.trim() || !desc.trim() || count >= 4}
//               >
//                 {count >= 4 ? "Daily Limit Reached" : "Submit Suggestion"}
//               </button>
//             </form>
//           </div>

//           {/* ✅ Suggestion History */}
//           <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2 min-h-[500px] overflow-hidden flex flex-col">
//             <h2 className="text-[#4f46e5] font-semibold text-2xl mb-4 text-center">
//               Your Suggestions (Last 1 Month)
//             </h2>

//             {history.length === 0 ? (
//               <p className="text-center text-gray-500 flex-grow flex items-center justify-center">
//                 No suggestions found.
//               </p>
//             ) : (
//               <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//                 {history.map((sugg, index) => (
//                   <li
//                     key={sugg._id || index}
//                     className="border border-[#4f46e5]/20 rounded-lg p-4 bg-[#f9f8ff]"
//                   >
//                     <h3 className="font-bold text-[#4f46e5]">{sugg.title}</h3>
//                     <p className="text-gray-700 mt-1">{sugg.description}</p>
//                     <p className="text-sm text-gray-500 mt-2">
//                       Status:{" "}
//                       <span
//                         className={
//                           sugg.status === "pending"
//                             ? "text-yellow-600"
//                             : sugg.status === "approved"
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }
//                       >
//                         {sugg.status}
//                       </span>{" "}
//                       | {new Date(sugg.date).toLocaleDateString()}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default Suggestions;





// import { useState, useEffect } from "react";
// import { Input } from "../../LandingSite/AuthPage/Input";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// function Suggestions() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const [title, setTitle] = useState("");
//   const [desc, setDesc] = useState("");
//   const [count, setCount] = useState(0);
//   const [history, setHistory] = useState([]);
//   const token = localStorage.getItem("token");
//   const student = JSON.parse(localStorage.getItem("Student"));

//   // ✅ Word limit set to 50
//   const MAX_WORDS = 50;

//   // 🔹 Fetch today's suggestion count
//   const fetchCount = async () => {
//     try {
//       const response = await fetch(
//         `${mainUri}/api/suggestion/count?student=${student.id}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       setCount(data.count);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   // 🔹 Fetch last 1 month’s history
//   const fetchHistory = async () => {
//     try {
//       const response = await fetch(
//         `${mainUri}/api/suggestion/history?student=${student.id}`,
//         {
//           headers: {
//             "Content-Type": "application/json",
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );
//       const data = await response.json();
//       setHistory(data.suggestions || []);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchCount();
//     fetchHistory();
//   }, []);

//   // 🔹 Handle word limit in description
//   const handleDescChange = (e) => {
//     const text = e.target.value;
//     const words = text.trim().split(/\s+/);

//     if (words.length <= MAX_WORDS) {
//       setDesc(text);
//     } else {
//       toast.warning(`You can only enter up to ${MAX_WORDS} words.`);
//     }
//   };

//   // 🔹 Register a new suggestion
//   const registerSuggestions = async (e) => {
//     e.preventDefault();

//     if (count >= 2) {
//       toast.error("You can only submit 2 suggestions per day!");
//       return;
//     }

//     try {
//       const response = await fetch(`${mainUri}/api/suggestion/register`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           student: student.id,
//           hostel: student.hostel,
//           title,
//           description: desc,
//         }),
//       });

//       const data = await response.json();

//       if (data.success) {
//         toast.success("Suggestion registered successfully");
//         setTitle("");
//         setDesc("");
//         setCount(data.count);
//         fetchHistory();
//       } else {
//         toast.error(data.msg || "Suggestion registration failed");
//       }
//     } catch (error) {
//       toast.error("Something went wrong. Please try again.");
//     }
//   };

//   const suggestionTitle = {
//     name: "suggestion title",
//     placeholder: "Enter suggestion title",
//     req: true,
//     type: "text",
//     value: title,
//     onChange: (e) => setTitle(e.target.value),
//   };

//   // ✅ Word counter
//   const wordCount = desc.trim() === "" ? 0 : desc.trim().split(/\s+/).length;

//   return (
//     <div className="w-full min-h-screen bg-[#f3e8ff] px-4 sm:px-6 md:px-8 py-6">
//       <div className="max-w-6xl mx-auto pt-16 sm:pt-20 md:pt-24">
//         <h1 className="text-[#4f46e5] font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-10">
//           Share Your Suggestions
//         </h1>

//         <p className="text-center text-lg font-medium mb-6 text-gray-700">
//           You’ve submitted{" "}
//           <span className="font-bold text-[#4f46e5]">{count}</span> of 2
//           suggestions today.
//         </p>

//         {/* 🔹 Two sections side-by-side */}
//         <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
//           {/* ✅ Suggestion Form */}
//           <div className="bg-white rounded-xl shadow-lg p-6 w-full md:w-1/2 flex flex-col justify-between min-h-[500px]">
//             <form onSubmit={registerSuggestions} className="space-y-6">
//               <div className="space-y-2">
//                 <Input field={suggestionTitle} />
//               </div>

//               <div className="space-y-2">
//                 <label
//                   htmlFor="suggestion"
//                   className="block text-sm font-medium text-[#4f46e5]"
//                 >
//                   Suggestion Details (Max {MAX_WORDS} words)
//                 </label>
//                 <textarea
//                   id="suggestion"
//                   placeholder="Describe your suggestion in detail..."
//                   rows="5"
//                   className="w-full p-3 border-2 border-[#4f46e5]/20 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/50"
//                   onChange={handleDescChange}
//                   value={desc}
//                   required
//                 />
//                 {/* ✅ Live word counter */}
//                 <p
//                   className={`text-sm mt-1 ${
//                     wordCount > MAX_WORDS - 10
//                       ? "text-red-500"
//                       : "text-gray-600"
//                   }`}
//                 >
//                   {wordCount}/{MAX_WORDS} words
//                 </p>
//               </div>

//               <button
//                 type="submit"
//                 className="w-full bg-[#4f46e5] text-white py-2.5 sm:py-3 px-5 rounded-lg font-semibold hover:bg-[#4338ca] transition duration-200"
//                 disabled={!title.trim() || !desc.trim() || count >= 2}
//               >
//                 {count >= 2 ? "Daily Limit Reached" : "Submit Suggestion"}
//               </button>
//             </form>
//           </div>

//           {/* ✅ Suggestion History */}
//           <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2 min-h-[500px] overflow-hidden flex flex-col">
//             <h2 className="text-[#4f46e5] font-semibold text-2xl mb-4 text-center">
//               Your Suggestions (Last 1 Month)
//             </h2>

//             {history.length === 0 ? (
//               <p className="text-center text-gray-500 flex-grow flex items-center justify-center">
//                 No suggestions found.
//               </p>
//             ) : (
//               <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
//                 {history.map((sugg, index) => (
//                   <li
//                     key={sugg._id || index}
//                     className="border border-[#4f46e5]/20 rounded-lg p-4 bg-[#f9f8ff]"
//                   >
//                     <h3 className="font-bold text-[#4f46e5]">{sugg.title}</h3>
//                     <p className="text-gray-700 mt-1">{sugg.description}</p>
//                     <p className="text-sm text-gray-500 mt-2">
//                       Status:{" "}
//                       <span
//                         className={
//                           sugg.status === "pending"
//                             ? "text-yellow-600"
//                             : sugg.status === "approved"
//                             ? "text-green-600"
//                             : "text-red-600"
//                         }
//                       >
//                         {sugg.status}
//                       </span>{" "}
//                       | {new Date(sugg.date).toLocaleDateString()}
//                     </p>
//                   </li>
//                 ))}
//               </ul>
//             )}
//           </div>
//         </div>
//       </div>

//       <ToastContainer position="top-right" autoClose={3000} />
//     </div>
//   );
// }

// export default Suggestions;





import { useState, useEffect } from "react";
import { Input } from "../../LandingSite/AuthPage/Input";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Suggestions() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [suggestionFor, setSuggestionFor] = useState(""); // ✅ new dropdown
  const [count, setCount] = useState(0);
  const [history, setHistory] = useState([]);
  const token = localStorage.getItem("token");
  const student = JSON.parse(localStorage.getItem("Student"));

  // ✅ Word limit set to 50
  const MAX_WORDS = 50;

  // 🔹 Fetch today's suggestion count
  const fetchCount = async () => {
    try {
      const response = await fetch(
        `${mainUri}/api/suggestion/count?student=${student.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setCount(data.count);
    } catch (error) {
      console.error(error);
    }
  };

  // 🔹 Fetch last 1 month’s history
  const fetchHistory = async () => {
    try {
      const response = await fetch(
        `${mainUri}/api/suggestion/history?student=${student.id}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.json();
      setHistory(data.suggestions || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCount();
    fetchHistory();
  }, []);

  // 🔹 Handle word limit in description
  const handleDescChange = (e) => {
    const text = e.target.value;
    const words = text.trim().split(/\s+/);

    if (words.length <= MAX_WORDS) {
      setDesc(text);
    } else {
      toast.warning(`You can only enter up to ${MAX_WORDS} words.`);
    }
  };

  // 🔹 Register a new suggestion
  const registerSuggestions = async (e) => {
    e.preventDefault();

    if (count >= 2) {
      toast.error("You can only submit 2 suggestions per day!");
      return;
    }

    if (!suggestionFor) {
      toast.error("Please select whether this suggestion is for Hostel or Mess!");
      return;
    }

    try {
      const response = await fetch(`${mainUri}/api/suggestion/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          student: student.id,
          hostel: student.hostel,
          title,
          description: desc,
          suggestionFor, // ✅ added field
        }),
      });

      const data = await response.json();

      if (data.success) {
        toast.success("Suggestion registered successfully");
        setTitle("");
        setDesc("");
        setSuggestionFor(""); // ✅ reset dropdown
        setCount(data.count);
        fetchHistory();
      } else {
        toast.error(data.msg || "Suggestion registration failed");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const suggestionTitle = {
    name: "suggestion title",
    placeholder: "Enter suggestion title",
    req: true,
    type: "text",
    value: title,
    onChange: (e) => setTitle(e.target.value),
  };

  // ✅ Word counter
  const wordCount = desc.trim() === "" ? 0 : desc.trim().split(/\s+/).length;

  return (
    <div className="w-full min-h-screen bg-[#f3e8ff] px-4 sm:px-6 md:px-8 py-6">
      <div className="max-w-6xl mx-auto pt-16 sm:pt-20 md:pt-24">
        <h1 className="text-[#4f46e5] font-bold text-3xl sm:text-4xl md:text-5xl text-center mb-8 sm:mb-10">
          Share Your Suggestions
        </h1>

        <p className="text-center text-lg font-medium mb-6 text-gray-700">
          You’ve submitted{" "}
          <span className="font-bold text-[#4f46e5]">{count}</span> of 2
          suggestions today.
        </p>

        {/* 🔹 Two sections side-by-side */}
        <div className="flex flex-col md:flex-row gap-8 justify-center items-start">
          {/* ✅ Suggestion Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 w-full md:w-1/2 flex flex-col justify-between min-h-[500px]">
            <form onSubmit={registerSuggestions} className="space-y-6">
              <div className="space-y-2">
                <Input field={suggestionTitle} />
              </div>

              {/* ✅ Suggestion For dropdown */}
              <div className="space-y-2">
                <label className="block text-sm font-medium text-[#4f46e5]">
                  Suggestion For
                </label>
                <select
                  value={suggestionFor}
                  onChange={(e) => setSuggestionFor(e.target.value)}
                  className="w-full p-3 border-2 border-[#4f46e5]/20 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/50"
                  required
                >
                  <option value="">-- Select Option --</option>
                  <option value="Hostel">Hostel</option>
                  <option value="Mess">Mess</option>
                </select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="suggestion"
                  className="block text-sm font-medium text-[#4f46e5]"
                >
                  Suggestion Details (Max {MAX_WORDS} words)
                </label>
                <textarea
                  id="suggestion"
                  placeholder="Describe your suggestion in detail..."
                  rows="5"
                  className="w-full p-3 border-2 border-[#4f46e5]/20 rounded-lg focus:ring-2 focus:ring-[#4f46e5]/50"
                  onChange={handleDescChange}
                  value={desc}
                  required
                />
                {/* ✅ Live word counter */}
                <p
                  className={`text-sm mt-1 ${
                    wordCount > MAX_WORDS - 10
                      ? "text-red-500"
                      : "text-gray-600"
                  }`}
                >
                  {wordCount}/{MAX_WORDS} words
                </p>
              </div>

              <button
                type="submit"
                className="w-full bg-[#4f46e5] text-white py-2.5 sm:py-3 px-5 rounded-lg font-semibold hover:bg-[#4338ca] transition duration-200"
                disabled={!title.trim() || !desc.trim() || count >= 2}
              >
                {count >= 2 ? "Daily Limit Reached" : "Submit Suggestion"}
              </button>
            </form>
          </div>

          {/* ✅ Suggestion History */}
          <div className="bg-white rounded-xl shadow-md p-6 w-full md:w-1/2 min-h-[500px] overflow-hidden flex flex-col">
            <h2 className="text-[#4f46e5] font-semibold text-2xl mb-4 text-center">
              Your Suggestions (Last 1 Month)
            </h2>

            {history.length === 0 ? (
              <p className="text-center text-gray-500 flex-grow flex items-center justify-center">
                No suggestions found.
              </p>
            ) : (
              <ul className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                {history.map((sugg, index) => (
                  <li
                    key={sugg._id || index}
                    className="border border-[#4f46e5]/20 rounded-lg p-4 bg-[#f9f8ff]"
                  >
                    <h3 className="font-bold text-[#4f46e5]">{sugg.title}</h3>
                    <p className="text-gray-700 mt-1">{sugg.description}</p>
                    <p className="text-sm text-gray-500 mt-2">
                      For: <b>{sugg.suggestionFor}</b> |{" "}
                      Status:{" "}
                      <span
                        className={
                          sugg.status === "pending"
                            ? "text-yellow-600"
                            : sugg.status === "approved"
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {sugg.status}
                      </span>{" "}
                      | {new Date(sugg.date).toLocaleDateString()}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default Suggestions;
