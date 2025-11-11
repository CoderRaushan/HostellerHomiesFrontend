import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const mainUri = import.meta.env.VITE_MAIN_URI;
function GuardHome() {
  const [guards, setGuards] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const guard=JSON.parse(localStorage.getItem("Guard"));
  useEffect(() => {
    const fetchGuards = async () => {
      try {
        const res = await fetch(`${mainUri}/api/guard/guardbyid`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({id:guard.id}),
        });
        const data = await res.json();
        console.log(data.guard);
        if (data.success) {
          setGuards(data.guard);
        } else {
          toast.error(data.message||"Failed to load guard data");
        }
      } catch (err) {
        console.log(err)
        toast.error("Error fetching guard data");
      } finally {
        setLoading(false);
      }
    };

    fetchGuards();
  }, []);

  return (
    <div className="min-h-screen w-full bg-[#f3e8ff] px-4 sm:px-8 md:px-16 pt-10 pb-20 overflow-x-hidden overflow-y-auto lg:pl-64">
      <ToastContainer position="top-center" autoClose={2000} />
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6 mt-10">
        <h1 className="text-black font-bold text-4xl sm:text-5xl text-center">
          Welcome <span className="text-[#4f46e5]">Guard Portal</span>
        </h1>

        {loading ? (
          <p className="text-gray-700 text-lg mt-6">Loading guards...</p>
        ) : guards?.length === 0 ? (
          <p className="text-red-500 text-lg mt-6">No guards found.</p>
        ) : (
          <div className=" flex justify-center sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10 w-full">
            {
              <div
                key={guards?._id}
                className="bg-white shadow-lg w-[400px]  rounded-2xl p-12 border border-gray-200 hover:shadow-xl transition duration-300"
              >
                <div className="flex flex-col items-center gap-2">
                  <img
                    src={
                      guards?.profilePhoto || "https://via.placeholder.com/150"
                    }
                    alt={guards?.name}
                    className="w-32 h-32 object-cover rounded-full border-4 border-indigo-500 shadow-md"
                  />
                  <h2 className="text-2xl font-semibold text-gray-800">
                    {guards?.name}
                  </h2>
                  <p className="text-sm text-indigo-600 font-medium mb-2">
                    {guards?.role || "Security Guard"}
                  </p>

                  <div className="text-gray-700 space-y-1 text-center">
                    <p>
                      <span className="font-medium">Email:</span>{" "}
                      {guards?.email || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {guards?.phone || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Status:</span>{" "}
                      {guards?.status || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Hostel No:</span>{" "}
                      {guards?.hostelNo || "N/A"}
                    </p>
                    <p>
                      <span className="font-medium">Shift:</span>{" "}
                      {guards?.shift || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            }
          </div>
        )}
      </div>
    </div>
  );
}

export default GuardHome;
