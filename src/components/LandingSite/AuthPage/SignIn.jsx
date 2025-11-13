// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { verifysession } from "../../../utils/";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { motion } from "framer-motion";
// import "./SignIn.css";

// export default function SignIn() {
//   const mainUri = import.meta.env.VITE_MAIN_URI;
//   const navigate = useNavigate();
//   const [formState, setFormState] = useState({
//     email: "",
//     password: "",
//     role: "",
//     isLoading: false,
//   });

//   if (localStorage.getItem("token")) {
//     verifysession();
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormState((prevState) => ({
//       ...prevState,
//       [name]: value,
//     }));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setFormState((prev) => ({ ...prev, isLoading: true }));

//     try {
//       const response = await fetch(`${mainUri}/api/auth/login`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email: formState.email,
//           password: formState.password,
//           role: formState.role,
//         }),
//       });

//       // const result = await response.json();

//       if (response.success) {
//         localStorage.setItem("token", response.data.token);
//         localStorage.setItem(
//           response.data.Detail.role,
//           JSON.stringify(response.data.Detail)
//         );
//         toast.success("Login successful! Redirecting...", {
//           position: "top-center",
//           autoClose: 1500,
//           theme: "colored",
//           // onClose: () => navigate("/student-dashboard"),
//         });
//       } else {
//         toast.error(response?.errors[0]?.msg, {
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
//       console.log(error);
//     }
//     setFormState((prev) => ({ ...prev, isLoading: false }));
//   };

//   return (
//     <div className="min-h-screen w-full flex items-start justify-center mt-4 lg:mt-[22rem] backGroundColor ">
//       <div className="w-full sm:max-w-md relative">
//         {/* Background Circles */}
//         <div className="absolute -top-10 -left-10 w-20 h-20 bg-indigo-600 rounded-full opacity-10 hidden sm:block"></div>
//         <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-600 rounded-full opacity-10 hidden sm:block"></div>
//         <div className="absolute top-1/4 right-0 w-16 h-16 bg-purple-500 rounded-full opacity-10 transform translate-x-1/2 hidden sm:block"></div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white border border-indigo-100 shadow-xl rounded-3xl overflow-hidden"
//         >
//           {/* Header */}
//           <div className="bg-indigo-700 zero text-center">
//             <h1 className="text-2xl sm:text-3xl font-extrabold text-white bg-[#4438c9]">
//               Welcome Back
//             </h1>
//             <p className="text-indigo-200 mt-1 sm:mt-2 bg-[#4438c9]">
//               Sign in to continue your journey
//             </p>
//           </div>

//           {/* Form */}
//           <div className="p-6 sm:p-8">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Email Input */}
//               <div className="space-y-4">
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
//                     Email Address
//                   </label>
//                   <div className="relative">
//                     <input
//                       type="email"
//                       name="email"
//                       required
//                       value={formState.email}
//                       onChange={handleInputChange}
//                       placeholder="your.email@example.com"
//                       className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                     />
//                   </div>
//                 </div>

//                 {/* Password Input */}
//                 <div>
//                   <div className="flex justify-between">
//                     <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
//                       Password
//                     </label>
//                   </div>
//                   <div className="relative">
//                     <input
//                       type="password"
//                       name="password"
//                       required
//                       value={formState.password}
//                       onChange={handleInputChange}
//                       placeholder="••••••••"
//                       className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
//                     Role
//                   </label>
//                   <div className="relative">
//                     <select
//                       name="role"
//                       required
//                       value={formState.role}
//                       onChange={handleInputChange}
//                       className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
//                     >
//                       <option value="">-- Select Role --</option>
//                       <option value="SuperAdmin">SuperAdmin</option>
//                       <option value="Caretaker">Caretaker</option>
//                       <option value="Manager">Manager</option>
//                       <option value="Warden">Warden</option>
//                       <option value="Guard">Guard</option>
//                       <option value="Student">Student</option>
//                       <option value="PrivilegeStudent">PrivilegeStudent</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 disabled={formState.isLoading}
//                 className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl font-medium shadow-md hover:scale-95 transition-transform duration-150 disabled:opacity-70"
//               >
//                 {formState.isLoading ? "Signing in..." : "Sign in"}
//               </button>
//             </form>

//             {/* Footer */}
//             <p className="mt-6 text-sm text-center text-gray-600">
//               Don't have an account?{" "}
//               <Link
//                 to="/signup"
//                 className="text-blue-600 font-semibold hover:underline"
//               >
//                 Sign up
//               </Link>
//             </p>
//           </div>
//         </motion.div>
//       </div>

//       <ToastContainer />
//     </div>
//   );
// }

import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { verifysession } from "../../../utils/";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";
import "./SignIn.css";

export default function SignIn() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    role: "",
    isLoading: false,
  });

  // ✅ Verify session once on component mount
  useEffect(() => {
    if (localStorage.getItem("token")) {
      verifysession();
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, isLoading: true }));

    try {
      const res = await fetch(`${mainUri}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
          role: formState.role,
        }),
      });

      const result = await res.json(); // ✅ Parse response JSON

      if (result.success) {
        // ✅ Save token and user details
        localStorage.setItem("token", result.data.token);
        localStorage.setItem(
          result.data.Detail.role,
          JSON.stringify(result.data.Detail)
        );

        toast.success("Login successful! Redirecting...", {
          position: "top-center",
          autoClose: 1500,
          theme: "colored",
          onClose: () => {
            if (result.data.Detail.role === "Manager") {
              navigate("/manager-dashboard");
            } else if (result.data.Detail.role === "SuperAdmin") {
              navigate("/superadmin-dashboard");
            } 
            else if (result.data.Detail.role === "Guard") {
              navigate("/guard-dashboard");
            }
            else if (result.data.Detail.role === "Warden") {
              navigate("/warden-dashboard");
            } 
            else if (result.data.Detail.role === "Caretaker") {
              navigate("/caretaker-dashboard");
            }
            else if (result.data.Detail.role === "PrivilegedStudent") {
              navigate("/privileged-student-dashboard");
            }
             else if (result.data.Detail.role === "SecurityIncharge") {
              navigate("/securityincharge-dashboard");
            }
            else if (result.data.Detail.role === "Butler") {
              navigate("/butler-dashboard");
            }
            else {
              navigate("/student-dashboard");
            }
          },
        });
      } else {
        toast.error(result?.errors?.[0]?.msg || "Invalid credentials.", {
          position: "top-center",
          autoClose: 3000,
          theme: "colored",
        });
      }
    } catch (error) {
      toast.error("Connection error. Please try again.", {
        position: "top-center",
        theme: "colored",
      });
      console.error("Login error:", error);
    }

    setFormState((prev) => ({ ...prev, isLoading: false }));
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center mt-4 lg:mt-[22rem] backGroundColor">
      <div className="w-full sm:max-w-md relative">
        {/* Background Circles */}
        <div className="absolute -top-10 -left-10 w-20 h-20 bg-indigo-600 rounded-full opacity-10 hidden sm:block"></div>
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-indigo-600 rounded-full opacity-10 hidden sm:block"></div>
        <div className="absolute top-1/4 right-0 w-16 h-16 bg-purple-500 rounded-full opacity-10 transform translate-x-1/2 hidden sm:block"></div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white border border-indigo-100 shadow-xl rounded-3xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-indigo-700 zero text-center">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white bg-[#4438c9]">
              Welcome Back
            </h1>
            <p className="text-indigo-200 mt-1 sm:mt-2 bg-[#4438c9]">
              Sign in to continue your journey
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Input */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formState.email}
                    onChange={handleInputChange}
                    placeholder="your.email@example.com"
                    className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Password Input */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    required
                    value={formState.password}
                    onChange={handleInputChange}
                    placeholder="••••••••"
                    className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                    Role
                  </label>
                  <select
                    name="role"
                    required
                    value={formState.role}
                    onChange={handleInputChange}
                    className="pl-3 w-full pr-3 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                  >
                    <option value="">-- Select Role --</option>
                    <option value="SuperAdmin">Super Admin</option>
                    <option value="Caretaker">Caretaker</option>
                    <option value="Manager">Manager</option>
                    <option value="Warden">Warden</option>
                    <option value="SecurityIncharge">Security Incharge</option>
                    <option value="Guard">Guard</option>
                    <option value="Student">Student</option>
                    <option value="Butler">Butler</option>
                    <option value="PrivilegeStudent">Privileged Student</option>
                  </select>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState.isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl font-medium shadow-md hover:scale-95 transition-transform duration-150 disabled:opacity-70"
              >
                {formState.isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Footer */}
            <p className="mt-6 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="text-blue-600 font-semibold hover:underline"
              >
                Sign up
              </Link>
            </p>
          </div>
        </motion.div>
      </div>

      <ToastContainer />
    </div>
  );
}
