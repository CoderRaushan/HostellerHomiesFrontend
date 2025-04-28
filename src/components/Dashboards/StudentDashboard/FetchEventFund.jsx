// import React from 'react'
// import ForComponent from '../components/forComponent';
// import Progress from '../components/Progress';
// const About = () => {
//      const[event , setEvent] = useState('');
//       const [status, setStatus] = useState(['']);
  
//       useEffect(() => {
//           const fetchData = async () => {
//               try {
//                   const res = await fetch('https://hostellerhomesbackend.onrender.com/api/Event/EventFund/student/get');
//                   const data = await res.json();
//                   console.log(data);
//               } catch (error) {
//                   console.error('Error fetching data:', error);
//               }
//           };
//           fetchData();
//           setEvent(fetchData);
//           setStatus(event.status , event.eventDetails.eventDetails);
          
//       }, []);
//   return (
//     <div>
//       <Progress currentStatus={status} />
//     </div>
//   )
// }

// export default About;

import React, { useState, useEffect } from 'react';

const About = () => {
  const mainUri = import.meta.env.VITE_MAIN_URI;
  const [event, setEvent] = useState(null);
  const [status, setStatus] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${mainUri}/api/Event/EventFund/student/get`);
        const data = await res.json();
        console.log(data);
        
        // Set the fetched data to state
        setEvent(data);
        
        // Set the status and event details for progress tracking
        setStatus({
          status: data.status, // Assuming the API provides the status as a string
          eventDetails: data.eventDetails.eventDetails, // Assuming event details are in this format
          fundRequired: data.eventDetails.fundRequired, // Assuming fundRequired is part of eventDetails
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
  }, []); // Empty dependency array to run only once on mount

  if (!event) return <div>Loading...</div>; // Loading state while data is being fetched

  // Function to get the color class for status
  const getStatusClass = (status) => {
    if (status === "In Progress") return "text-blue-400"; // Blue for In Progress
    if (status === "Accepted") return "text-green-400"; // Green for Accepted
    if (status === "Rejected") return "text-red-400"; // Red for Rejected
    return "text-black/60"; // Default text color
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <div className="p-6 shadow-lg rounded-xl bg-white text-black border mb-4">
        <h2 className="text-2xl font-semibold mb-4 text-[#4f46e5]">Event Fund Request</h2>

        {/* Event Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
          <div className="flex flex-col gap-1 border p-4 rounded-lg shadow-sm bg-[#f3e8ff]">
            <p><strong>Event Details:</strong> {status?.eventDetails}</p>
            <p><strong>Fund Required:</strong> ₹{status?.fundRequired}</p>
          </div>
          <div className="border p-4 rounded-lg shadow-sm bg-[#f3e8ff]">
            <p><strong>Status:</strong> <span className={`font-semibold ${getStatusClass(status?.status)}`}>{status?.status}</span></p>
          </div>
        </div>

        {/* Status Display */}
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2 text-[#4f46e5]">Current Status</h3>
          <div className="flex gap-4">
            <div className={`text-lg font-medium ${getStatusClass(status?.status)}`}>
              {status?.status}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
