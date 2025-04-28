import { useEffect, useState } from "react";

// Input component included for the demo
const Input = ({ field }) => {
  return (
    <div className="mb-2">
      <label 
        htmlFor={field.name} 
        className="block mb-2 text-sm font-medium text-gray-800"
      >
        {field.name.charAt(0).toUpperCase() + field.name.slice(1)}
      </label>
      <input
        type={field.type}
        id={field.name}
        placeholder={field.placeholder}
        required={field.req}
        onChange={field.onChange}
        value={field.value}
        className="border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-300 text-black-800 focus:ring-indigo-500 focus:border-indigo-500"
      />
    </div>
  );
};

// Custom notification component to replace react-toastify
const Notification = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-4 right-4 z-50 animate-fade-in">
      <div className={`p-4 rounded-lg shadow-lg flex items-center justify-between ${
        type === 'success' ? 'bg-indigo-600 text-white' : 'bg-red-600 text-white'
      }`}>
        <div className="flex items-center">
          {type === 'success' ? (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          )}
          <span>{message}</span>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

function Complaints() {
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [type, setType] = useState("Electric");
  const [regComplaints, setRegComplaints] = useState([]);
  const [notification, setNotification] = useState(null);

  const types = ["Electric", "Furniture", "Cleaning", "Others"];

  // Mock data for registered complaints
  useEffect(() => {
    // Simulating fetched data
    const mockComplaints = [
      {
        title: "Broken Light",
        status: "Pending",
        date: "April 20, 2025",
        type: "Electric"
      },
      {
        title: "Chair Repair",
        status: "Resolved",
        date: "April 15, 2025",
        type: "Furniture"
      },
      {
        title: "Room Cleaning",
        status: "Pending",
        date: "April 18, 2025",
        type: "Cleaning"
      }
    ];
    setRegComplaints(mockComplaints);
  }, []);

  const registerComplaint = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Mock API call
    setTimeout(() => {
      // Add new complaint to the list
      const newComplaint = {
        title: title,
        status: "Pending",
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' }),
        type: type
      };
      
      setRegComplaints([newComplaint, ...regComplaints]);
      
      // Show success notification
      setNotification({
        message: "Complaint Registered Successfully!",
        type: "success"
      });
      
      setTitle("");
      setDesc("");
      setType("Electric");
      setLoading(false);
    }, 1000);
  };

  function chngType(e) {
    setType(e.target.value);
  }

  function titleChange(e) {
    setTitle(e.target.value);
  }
  
  function descChange(e) {
    setDesc(e.target.value);
  }

  const complaintTitle = {
    name: "complaint title",
    placeholder: "Title",
    req: true,
    type: "text",
    value: title,
    onChange: titleChange,
  };
  
  const complaintType = {
    name: "complaint type",
    placeholder: "Type...",
    req: true,
    type: "text",
    value: type,
    onChange: chngType,
  };

  return (
    <div style={{ backgroundColor: "#fff" }} className="min-h-screen w-full p-6 mt-10 flex flex-col items-center justify-start">
      <h1 className="font-bold text-4xl mt-6 mb-8" style={{ color: "#4f46e5" }}>Complaints</h1>
      
      <div className="flex gap-8 flex-wrap items-start justify-center max-w-5xl">
        {/* Complaint Form */}
        <form
          method="POST"
          onSubmit={registerComplaint}
          className="w-full md:w-96 py-5 pb-7 px-6 bg-white rounded-xl shadow-lg flex flex-col gap-5 border border-indigo-100"
        >
          <h2 className="text-xl font-semibold" style={{ color: "#4f46e5" }}>Register New Complaint</h2>
          
          <div>
            <label
              htmlFor="type"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Complaint Type
            </label>
            <select
              className="border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-300 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
              onChange={chngType}
              value={type}
            >
              {types.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            
            {type.toLowerCase() === "others" && (
              <div className="mt-4">
                <Input field={complaintType} />
              </div>
            )}
          </div>
          
          <Input field={complaintTitle} />
          
          <div>
            <label
              htmlFor="description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Complaint Description
            </label>
            <textarea
              name="description"
              placeholder="Details of complaint"
              className="border text-sm rounded-lg block w-full p-2.5 bg-white border-gray-300 text-gray-800 focus:ring-indigo-500 focus:border-indigo-500 outline-none min-h-24"
              onChange={descChange}
              value={desc}
            ></textarea>
            
            <button
              type="submit"
              className="w-full hover:scale-95 transition-all duration-200 text-white rounded-lg px-5 py-2.5 mt-5 text-center focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium"
              disabled={loading}
              style={{ backgroundColor: "#4f46e5" }}
            >
              {loading ? 'Registering Complaint...' : 'Register Complaint'}
            </button>
          </div>
        </form>

        {/* Registered Complaints List */}
        <div className="w-full md:w-96 max-h-96 p-5 rounded-xl shadow-lg bg-white border border-indigo-100 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold" style={{ color: "#4f46e5" }}>
              Registered Complaints
            </h2>
          </div>
          
          <div className="flow-root">
            <ul role="list" className="divide-y divide-gray-200">
              {regComplaints.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No complaints registered</p>
              ) : (
                regComplaints.map((complain, index) => (
                  <li className="py-3" key={index}>
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        {complain.status.toLowerCase() === "pending" ? (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="#4f46e5"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
                            />
                          </svg>
                        ) : (
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="#16a34a"
                            className="w-6 h-6"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4.5 12.75l6 6 9-13.5"
                            />
                          </svg>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate text-gray-800">
                          {complain.title}
                        </p>
                        <p className="text-sm truncate text-gray-500">
                          {complain.date}
                        </p>
                      </div>
                      <div className="inline-flex items-center text-sm font-medium px-2.5 py-0.5 rounded-full bg-indigo-100 text-indigo-600">
                        {complain.type}
                      </div>
                    </div>
                  </li>
                ))
              )}
            </ul>
          </div>
        </div>
      </div>
      
      {/* Custom notification */}
      {notification && (
        <Notification 
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}
    </div>
  );
}

export default Complaints;