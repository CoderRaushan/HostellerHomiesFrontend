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

        setEvent(data);
        setStatus({
          status: data.status,
          eventDetails: data.eventDetails.eventDetails,
          fundRequired: data.eventDetails.fundRequired,
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-700 text-base">
        Loading...
      </div>
    );
  }

  const getStatusClass = (status) => {
    if (status === "In Progress") return "text-blue-600";
    if (status === "Accepted") return "text-green-600";
    if (status === "Rejected") return "text-red-600";
    return "text-gray-600";
  };

  return (
<div className="min-h-screen w-full bg-gray-100 px-3 sm:px-6 py-4">


     <div className="w-full bg-white rounded-lg shadow p-3 mt-4">



        <h2 className="text-center text-xl font-bold text-indigo-600 mb-4 ">
          Event Fund Request
        </h2>

        {/* Event Info */}
        <div className="space-y-4 text-base">
          <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
            <p><span className="font-semibold">Event Details:</span> {status?.eventDetails}</p>
            <p><span className="font-semibold">Fund Required:</span> ₹{status?.fundRequired}</p>
          </div>

          <div className="bg-purple-100 p-4 rounded-lg shadow-sm">
            <p>
              <span className="font-semibold">Status:</span>{' '}
              <span className={`font-bold ${getStatusClass(status?.status)}`}>
                {status?.status}
              </span>
            </p>
          </div>  
        </div>

        {/* Status Summary */}
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-indigo-600 mb-2">Current Status</h3>
          <div className={`text-base font-medium ${getStatusClass(status?.status)}`}>
            {status?.status}
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;


