
import { useEffect, useState } from "react";

function SAProfile() {
  const Sadmin = JSON.parse(localStorage.getItem("SuperAdmin"));

  return (
    <div className="min-h-screen w-full bg-[#f3e8ff] px-4 sm:px-8 md:px-16 pt-10 pb-20 overflow-x-hidden overflow-y-auto lg:pl-64">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6 mt-10">

        {/* Welcome Header */}
        <h1 className="text-black font-bold text-4xl sm:text-5xl text-center">
          Welcome{" "}
          <span className="text-[#4f46e5]">
            {Sadmin?.name || "Admin"}!
          </span>
        </h1>

        {/* Admin Info Card */}
        {Sadmin && (
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl mt-6 border border-gray-200">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              {/* Profile Photo */}
              <img
                src={Sadmin.profilePhoto}
                alt="Admin Profile"
                className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500 shadow-md"
              />

              {/* Admin Details */}
              <div className="flex flex-col items-center sm:items-start">
                <h2 className="text-2xl font-semibold text-gray-800">{Sadmin.name}</h2>
                <p className="text-sm text-indigo-600 font-medium mb-2">{Sadmin.role}</p>

                <div className="text-gray-700 space-y-1">
                  <p><span className="font-medium">Email:</span> {Sadmin.email}</p>
                  <p><span className="font-medium">Phone:</span> {Sadmin.phoneNo}</p>
                  <p><span className="font-medium">Address:</span> {Sadmin.address}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* If no admin found */}
        {!Sadmin && (
          <p className="text-red-500 text-lg mt-4">No admin data found. Please log in again.</p>
        )}
      </div>
    </div>
  );
}

export default SAProfile;
