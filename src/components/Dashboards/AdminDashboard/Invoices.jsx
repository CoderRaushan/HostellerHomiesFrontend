import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoadingBar from "react-top-loading-bar";

function Invoices() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const genInvoices = async () => {
    setProgress(30);
    let hostels = JSON.parse(localStorage.getItem("admin"));
    try {
      const res = await fetch(`${mainUri}/api/invoice/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostel: hostels.hostel }),
      });
      setProgress(60);
      const data = await res.json();
      if (data.success) {
        toast.success("Invoices generated successfully!", { theme: "dark" });
        getInvoices();
      } else {
        toast.error(data.errors, { theme: "dark" });
      }
    } catch (err) {
      toast.error(err.errors, { theme: "dark" });
    }
    setProgress(100);
  };

  const approveInvoice = async (id) => {
    setProgress(30);
    try {
      const res = await fetch(`${mainUri}/api/invoice/update`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ student: id, status: "approved" }),
      });
      setProgress(60);
      const data = await res.json();
      if (data.success) {
        toast.success("Invoice approved successfully!", { theme: "dark" });
        getInvoices();
      } else {
        toast.error("Something went wrong!", { theme: "dark" });
      }
    } catch (err) {
      toast.error("Something went wrong!", { theme: "dark" });
    }
    setProgress(100);
  };

  const getInvoices = async () => {
    setProgress(30);
    let hostels = JSON.parse(localStorage.getItem("admin"));
    try {
      const res = await fetch(`${mainUri}/api/invoice/getbyid`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hostel: hostels.hostel }),
      });
      setProgress(60);
      const data = await res.json();
      if (data.success) {
        setAllInvoices(data.invoices);
        setPendingInvoices(
          data.invoices.filter((invoice) => invoice.status === "pending")
        );
      } else {
        toast.error(data.errors, { theme: "dark" });
      }
    } catch (err) {
      toast.error(err.errors, { theme: "dark" });
    }
    setProgress(100);
  };

  const [Progress, setProgress] = useState(0);
  const [allInvoices, setAllInvoices] = useState([]);
  const [pendingInvoices, setPendingInvoices] = useState([]);

  useEffect(() => {
    getInvoices();
  }, [allInvoices.length, pendingInvoices.length]);

  return (
    <div
      className="w-full min-h-screen flex flex-col gap-5 items-center justify-start py-28"
      style={{ backgroundColor: "#f3e8ff" }}
    >
      <LoadingBar
        color="#4f46e5"
        progress={Progress}
        onLoaderFinished={() => setProgress(0)}
      />

      <h1 className="text-5xl font-extrabold" style={{ color: "#4f46e5" }}>
        Invoices
      </h1>

      <button
        onClick={genInvoices}
        className="py-3 px-8 rounded-lg font-bold text-white bg-[#4f46e5] hover:bg-[#4338ca] transition-all"
      >
        Generate Invoices
      </button>

      <div
        className="px-10 py-6 rounded-xl shadow-2xl sm:w-[50%] sm:min-w-[500px] w-full mt-5 max-h-96 overflow-auto"
        style={{ backgroundColor: "#ffffff" }}
      >
        <span className="font-bold text-2xl" style={{ color: "#4f46e5" }}>
          Pending Invoices
        </span>
        <ul role="list" className="divide-y divide-gray-300 mt-4">
          {pendingInvoices.length === 0 ? (
            <p className="text-center text-gray-700 py-10">No Students Found</p>
          ) : (
            pendingInvoices.map((invoice) => (
              <li
                className="py-4 px-5 rounded-md hover:bg-[#ede9fe] hover:scale-[1.02] transition-all cursor-pointer"
                key={invoice.id}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-[#4f46e5]">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-7 h-7"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p
                        className="text-lg font-bold"
                        style={{ color: "#000000" }}
                      >
                        {invoice.student.name}
                      </p>
                      <p className="text-sm text-gray-600">
                        Room: {invoice.student.room_no} | Amount: Rs.{" "}
                        {invoice.amount}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => approveInvoice(invoice.student._id)}
                    className="flex items-center justify-center bg-[#4f46e5] hover:bg-[#4338ca] p-2 rounded-full"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="white"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </div>
  );
}

export default Invoices;
