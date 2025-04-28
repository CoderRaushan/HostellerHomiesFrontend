import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EventStatus from './EventStatus';

const Event = () => {
  const studentId = JSON.parse(localStorage.getItem("student"))?._id || '';
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [formData, setFormData] = useState({
    student: studentId,
    name: '',
    urn: '',
    roomNumber: '',
    hostelNumber: '',
    eventDetails: '',
    fundRequired: '',
  });

  const [eventList, setEventList] = useState([]);

  const fetchEvents = async () => {
    try {
      const res = await axios.post(`${mainUri}/api/Event/EventFund/student/get`, {
        studentId
      });
      if (res.data.success) {
        setEventList(res.data.eventDetails);
      }
    } catch (err) {
      console.error("Error fetching events:", err);
      toast.error("Failed to load event data.");
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${mainUri}/api/Event/EventFund`, formData);
      if (response.data.success) {
        setFormData({
          student: studentId,
          name: '',
          urn: '',
          roomNumber: '',
          hostelNumber: '',
          eventDetails: '',
          fundRequired: '',
        });
        toast.success("Event Fund submitted Successfully!", {
          position: "top-right",
          autoClose: 3000,
          theme: "colored",
        });
        fetchEvents();
      } else {
        toast.error(response.data.errors || "Something went wrong!", {
          position: "top-right",
          autoClose: 3000,
          theme: "dark",
        });
      }
    } catch (error) {
      toast.error(error.response?.data?.errors || "Server Error!", {
        position: "top-right",
        autoClose: 3000,
        theme: "dark",
      });
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-[#f3e8ff] p-24 w-500">
      <ToastContainer />
      <div className="w-full max-w-4xl p-6 rounded-lg border border-gray-300 bg-white mb-10 shadow-lg">
        <h2 className="text-3xl font-bold text-[#4f46e5] text-center mb-4">Event Fund Request</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-black font-semibold mb-1">Name</label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">URN</label>
            <input
              type="text"
              name="urn"
              className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
              value={formData.urn}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-black font-semibold mb-1">Room No.</label>
              <input
                type="text"
                name="roomNumber"
                className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
                value={formData.roomNumber}
                onChange={handleChange}
                required
              />
            </div>
            <div className="w-1/2">
              <label className="block text-black font-semibold mb-1">Hostel No.</label>
              <input
                type="text"
                name="hostelNumber"
                className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
                value={formData.hostelNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">Event Details</label>
            <textarea
              name="eventDetails"
              rows="3"
              className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
              value={formData.eventDetails}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <div>
            <label className="block text-black font-semibold mb-1">Fund Required (₹)</label>
            <input
              type="number"
              name="fundRequired"
              className="w-full px-3 py-2 border border-gray-400 bg-transparent text-black rounded-md"
              value={formData.fundRequired}
              onChange={handleChange}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#4f46e5] hover:bg-indigo-700 text-white font-semibold py-2 px-4 rounded-md"
            >
              Submit
            </button>
          </div>
        </form>
      </div>

      {/* Display Event Status */}
      <div className="w-full max-w-4xl text-black">
        <h2 className="text-xl font-bold mb-4 text-[#4f46e5]">Your Event Fund Requests</h2>
        {eventList.length > 0 ? (
          eventList.map((event) => (
            <EventStatus key={event._id} currentStatus={event} />
          ))
        ) : (
          <p>No event requests found.</p>
        )}
      </div>
    </div>
  );
};

export default Event;
