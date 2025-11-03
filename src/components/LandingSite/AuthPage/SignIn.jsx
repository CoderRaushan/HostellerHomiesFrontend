import { useState } from "react";
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
    rememberMe: false,
    isLoading: false,
  });

  if (localStorage.getItem("token")) {
    verifysession();
  }

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormState((prev) => ({ ...prev, isLoading: true }));

    try {
      const response = await fetch(`${mainUri}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formState.email,
          password: formState.password,
        }),
      });

      const result = await response.json();

      if (result.success) {
        localStorage.setItem("token", result.data.token);

        const studentRes = await fetch(`${mainUri}/api/student/get-student`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            isAdmin: result.data.user.isAdmin,
            token: result.data.token,
          }),
        });

        const studentResult = await studentRes.json();

        if (studentResult.success) {
          if (studentResult.isAdmin) {
            localStorage.setItem(
              "admin",
              JSON.stringify(studentResult.student)
            );
          } else {
            localStorage.setItem(
              "student",
              JSON.stringify(studentResult.student)
            );
          }

          toast.success("Login successful! Redirecting...", {
            position: "top-center",
            autoClose: 1500,
            theme: "colored",
            onClose: () => navigate("/student-dashboard"),
          });
        }
      } else {
        toast.error(result.errors[0].msg, {
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
      console.error(error);
    }

    setFormState((prev) => ({ ...prev, isLoading: false }));
  };

  return (
    <div className="min-h-screen w-full flex items-start justify-center mt-4 lg:mt-[22rem] backGroundColor ">
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
                  <div className="relative">
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
                </div>

                {/* Password Input */}
                <div>
                  <div className="flex justify-between">
                    <label className="block text-sm font-medium text-gray-700 mb-1 ml-1">
                      Password
                    </label>
                    {/* <a
                      href="#"
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      Forgot password?
                    </a> */}
                  </div>
                  <div className="relative">
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
                </div>
              </div>

              {/* Remember Me */}
              {/* <div className="flex items-center">
                <input
                  id="rememberMe"
                  name="rememberMe"
                  type="checkbox"
                  checked={formState.rememberMe}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="rememberMe"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div> */}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={formState.isLoading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-3 px-4 rounded-xl font-medium shadow-md hover:scale-95 transition-transform duration-150 disabled:opacity-70"
              >
                {formState.isLoading ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Divider and Social */}
            {/* <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-1">
                <button className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                  Google
                </button>
              </div>
            </div> */}

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
