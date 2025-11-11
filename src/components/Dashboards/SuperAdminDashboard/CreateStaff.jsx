// import React, { useState } from "react";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";

// const CreateStaff = () => {
//   const [formState, setFormState] = useState({
//     name: "",
//     email: "",
//     password: "",
//     phone: "",
//     role: "",
//     hostelNo: "",
//     isLoading: false,
//   });
//   const mainUri = import.meta.env.VITE_MAIN_URI;

//   const handleInputChange = async (e) => {
//     const { name, value } = e.target;
//     setFormState({ ...formState, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormState((prev) => ({ ...prev, isLoading: true }));
//     try {
//       const res = await fetch(`${mainUri}api/auth/create-staff`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formState),
//       });

//       const result = await res.json();

//       if (result.success) {
//         toast.success("Staff Created Successful! ", {
//           position: "top-center",
//           autoClose: 1500,
//           theme: "colored",
//         });
//       } else {
//         toast.error(result?.errors?.[0]?.msg || "Invalid credentials.", {
//           position: "top-center",
//           autoClose: 3000,
//           theme: "colored",
//         });
//       }
//     } catch (error) {
//       toast.error("Connection error. Please try again.", {
//         position: "top-center",
//         theme: "colored",
//       });
//       console.error("Staff Creation error:", error);
//     }
//     setFormState((prev) => ({ ...prev, isLoading: false }));
//   };

//   return (
//     <div className="bg-white flex justify-center items-center min-h-screen">
//       <form
//         onSubmit={handleSubmit}
//         className="bg-gray-100 p-8 rounded-2xl shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
//           Create Staff
//         </h2>

//         <div className="space-y-4">
//           <input
//             type="text"
//             name="name"
//             placeholder="Full Name"
//             required
//             value={formState.name}
//             onChange={handleInputChange}
//             className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />

//           <input
//             type="email"
//             name="email"
//             placeholder="Email"
//             required
//             value={formState.email}
//             onChange={handleInputChange}
//             className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />

//           <input
//             type="password"
//             name="password"
//             placeholder="Password"
//             required
//             value={formState.password}
//             onChange={handleInputChange}
//             className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />

//           <input
//             type="tel"
//             name="phone"
//             placeholder="Phone Number"
//             required
//             value={formState.phone}
//             onChange={handleInputChange}
//             className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
//           />

//           {/* Role Dropdown */}
//           <select
//             name="role"
//             required
//             value={formState.role}
//             onChange={handleInputChange}
//             className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//           >
//             <option value="">-- Select Role --</option>
//             <option value="Caretaker">Caretaker</option>
//             <option value="Manager">Manager</option>
//             <option value="Warden">Warden</option>
//             <option value="Guard">Guard</option>
//             <option value="Student">Student</option>
//             <option value="PrivilegeStudent">PrivilegeStudent</option>
//           </select>

//           {/* Hostel No */}
//           <select
//             name="hostelNo"
//             required
//             value={formState.hostelNo}
//             onChange={handleInputChange}
//             className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//           >
//             <option value="">-- Select Hostel No --</option>
//             <option value="1">Hostel 1</option>
//             <option value="2">Hostel 2</option>
//             <option value="3">Hostel 3</option>
//             <option value="4">Hostel 4</option>
//             <option value="5">Hostel 5</option>
//           </select>

//           <button
//             type="submit"
//             disabled={formState.isLoading}
//             className="w-full bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all font-semibold"
//           >
//             Create Staff {formState.isLoading ? "Creating..." : "Create Staff"}
//           </button>
//         </div>
//       </form>
//       <ToastContainer />
//     </div>
//   );
// };

// export default CreateStaff;


import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const CreateStaff = () => {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    role: "",
    hostelNo: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const mainUri = import.meta.env.VITE_MAIN_URI;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await fetch(`${mainUri}/api/auth/create-staff`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
         },
        body: JSON.stringify({
            name: formState.name,
            email: formState.email,
            password: formState.password,
            phone: formState.phone,
            role: formState.role,
            hostelNo: formState.hostelNo,
        }),
      });
       console.log("entering2..")

      const result = await res.json();
      console.log("result", result);

      if (result.success) {
        toast.success("✅ Staff created successfully!", {
          position: "top-center",
          autoClose: 1500,
          theme: "colored",
        });

        // Reset form
        setFormState({
          name: "",
          email: "",
          password: "",
          phone: "",
          role: "",
          hostelNo: "",
        });
      } else {
        toast.error(result?.errors?.[0]?.msg || "❌ Invalid credentials.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Staff Creation error:", error);
      toast.error("⚠️ Connection error. Please try again.", {
        position: "top-center",
        theme: "colored",
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="bg-white flex justify-center items-center min-h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-100 p-8 rounded-2xl shadow-lg w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">
          Create Staff
        </h2>

        <div className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            required
            value={formState.name}
            onChange={handleInputChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            required
            value={formState.email}
            onChange={handleInputChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            required
            value={formState.password}
            onChange={handleInputChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            required
            value={formState.phone}
            onChange={handleInputChange}
            className="w-full px-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />

          {/* Role Dropdown */}
          <select
            name="role"
            required
            value={formState.role}
            onChange={handleInputChange}
            className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          >
            <option value="">-- Select Role --</option>
            <option value="Warden">Warden</option>
            <option value="Caretaker">Caretaker</option>
            <option value="Manager">Manager</option>
            <option value="SecurityIncharge">Security Incharge</option>
            <option value="PrivilegedStudent">Privileged Student</option>
          </select>

          {/* Hostel No */}
          <select
            name="hostelNo"
            required
            value={formState.hostelNo}
            onChange={handleInputChange}
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

          <button
            type="submit"
            disabled={isLoading}
            className={`w-full py-3 rounded-xl text-white font-semibold transition-all ${
              isLoading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Creating..." : "Create Staff"}
          </button>
        </div>
      </form>

      <ToastContainer />
    </div>
  );
};

export default CreateStaff;
