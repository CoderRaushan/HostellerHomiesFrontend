import { useEffect, useState } from "react";
import { Modal } from "./Modal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Loader } from "../../Dashboards/Common/Loader";

function Suggestions() {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const getSuggestions = async () => {
    const hostels = JSON.parse(localStorage.getItem("admin"));
    const response = await fetch(`${mainUri}/api/suggestion/hostel`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ hostel: hostels.hostel }),
    });

    const data = await response.json();
    if (data.success) {
      setSuggestions(data.suggestions.filter((suggestion) => suggestion.status === "pending"));
      setLoading(false);
    } else {
      toast.error("Something failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
  };

  const updateSuggestion = async (id) => {
    setLoader(true);
    const response = await fetch(`${mainUri}/api/suggestion/update`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({id, status: "approved"}),
    });

    const data = await response.json();
    if (data.success) {
      toast.success("Suggestion Approved", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
      getSuggestions();
    } else {
      toast.error("Something failed", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
      });
    }
    setLoader(false);
  };

  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(true);
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleModal = (suggestion = {}) => {
    setModalData(suggestion);
    setShowModal((showModal) => !showModal);
  };

  const filteredSuggestions = suggestions.filter(suggestion => 
    suggestion.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    suggestion.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    getSuggestions();
  }, []);

  return (
    <div className="w-full min-h-screen bg-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-10">
          <h1 className="text-gray-800 font-bold text-4xl mb-2">Suggestions</h1>
          <div className="h-1 w-24 bg-blue-500 mx-auto rounded-full"></div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg sm:w-full w-full mb-6 overflow-hidden border border-gray-100">
          <div className="flex flex-col md:flex-row items-center justify-between p-6 bg-gray-50 border-b border-gray-100">
            <h2 className="text-gray-800 font-semibold text-xl mb-4 md:mb-0">All Student Suggestions</h2>
            <div className="relative w-full md:w-64">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg>
              </div>
              <input 
                type="search" 
                className="block w-full p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500" 
                placeholder="Search suggestions"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className="p-6 max-h-96 overflow-auto">
            {loading ? (
              <div className="flex justify-center items-center h-32">
                <Loader />
              </div>
            ) : (
              <ul role="list" className="divide-y divide-gray-200">
                {filteredSuggestions.length === 0 ? (
                  <div className="text-center py-10">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">No suggestions found</p>
                  </div>
                ) : (
                  filteredSuggestions.map((suggestion) => (
                    <li
                      key={suggestion._id}
                      className="py-5 px-4 hover:bg-gray-50 transition-colors duration-150 rounded-lg my-2"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6 text-blue-600"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                            />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {suggestion.title}
                          </p>
                          <p className="text-sm text-gray-500 truncate">
                            {suggestion.description}
                          </p>
                          <button
                            className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800 inline-flex items-center"
                            onClick={() => toggleModal(suggestion)}
                          >
                            Read more
                            <svg className="ml-1 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </button>
                        </div>
                        <button 
                          className="group relative bg-blue-500 hover:bg-blue-600 text-white p-2 rounded-full transition-colors duration-150 shadow-sm"
                          onClick={() => updateSuggestion(suggestion._id)}
                        >
                          {loader ? (
                            <Loader />
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
                              />
                            </svg>
                          )}
                          <span className="absolute opacity-0 group-hover:opacity-100 px-2 py-1 text-xs bg-gray-800 text-white rounded-md -bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-200">
                            Acknowledge
                          </span>
                        </button>
                      </div>
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
        
        <div className="flex justify-between items-center w-full px-6">
          <p className="text-sm text-gray-500">
            Showing {filteredSuggestions.length} of {suggestions.length} suggestions
          </p>
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg shadow-sm transition-colors duration-150">
            Refresh
          </button>
        </div>
      </div>
      
      {showModal && <Modal closeModal={toggleModal} suggestion={modalData} />}
      
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default Suggestions;