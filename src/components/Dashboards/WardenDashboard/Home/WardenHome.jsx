import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mainUri = import.meta.env.VITE_MAIN_URI;
function WardendHome() {
  // const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const warden=JSON.parse(localStorage.getItem("Warden"));
  return (
    <div className="min-h-screen w-full bg-[#f3e8ff] px-4 sm:px-8 md:px-16 pt-10 pb-20 overflow-x-hidden overflow-y-auto lg:pl-64">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6 mt-10">
        <h1 className="text-black font-bold text-4xl sm:text-5xl text-center">
          Welcome <span className="text-[#4f46e5]">{warden?.name} Hostel No.{warden?.hostelNo}</span>
        </h1>
          <div className=" flex justify-center sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
            {
              <div
                key={warden?.id}
                className="bg-white shadow-lg w-[400px]  rounded-2xl p-12 border border-gray-200 hover:shadow-xl transition duration-300"
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={
                      warden?.profilePhoto || "https://via.placeholder.com/150"
                    }
                    alt={warden?.name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500 shadow-md"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {warden?.name}
                  </h2>

                  <div className="text-gray-700 space-y-1 text-center">
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {warden?.email || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {warden?.phoneNo || "N/A"}
                    </p>
                
                    <p>
                      <span className="font-medium">Hostel No:</span>{" "}
                      {warden?.hostelNo || "N/A"}
                    </p>
                   
                  </div>
                </div>
              </div>
            }
          </div>
      </div>
    </div>
  );
}

export default WardendHome;
