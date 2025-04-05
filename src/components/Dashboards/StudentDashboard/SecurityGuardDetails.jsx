// import { useState, useEffect } from "react";
// import axios from "axios";

// function SecurityGuardDetails() {
//   const [guardDetails, setGuardDetails] = useState([]);
//   // const [emergencyContacts, setEmergencyContacts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/guard/guards");
//         console.log("API Response:", response.data);

//         // Assuming response.data is an object with `guards` and `emergencyContacts`
//         setGuardDetails(response.data || []);
//         // setEmergencyContacts(response.data.emergencyContacts || []);
//       } catch (err) {
//         setError("Failed to fetch security guard details.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   if (loading) {
//     return <div className="flex justify-center items-center h-screen text-lg font-semibold">Loading...</div>;
//   }

//   if (error) {
//     return <div className="flex justify-center items-center h-screen text-red-500 text-lg">{error}</div>;
//   }

//   return (
//     <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
//       <div className="bg-white shadow-lg rounded-2xl p-6 max-w-2xl w-full">
//         <h2 className="text-2xl font-semibold text-gray-800 text-center mb-6">
//           Security Guard Details
//         </h2>

//         {guardDetails.map((guard, index) => (
//           <div key={index} className="border-b pb-4 mb-4">
//           {guard.onDuty ? <div> 
//             <p className="text-lg"><strong>Guard ID:</strong> {guard.guardId}</p>
//             <p className="text-lg"><strong>Name:</strong> {guard.name}</p>
//             <p className="text-lg"><strong>Shift:</strong> {guard.shift}</p>
//             <p className="text-lg"><strong>Contact:</strong> {guard.contact}</p>
//             <p className="text-lg"><strong>Post:</strong> {guard.post}</p>
//             <p className="text-lg">
//               <strong>On Duty:</strong> 
//               <span className={guard.onDuty ? "text-green-600 ml-1" : "text-red-600 ml-1"}>
//                 {guard.onDuty ? "Yes" : "No"}
//               </span>
//             </p>
//           </div>: null }
          
//           </div>
//         ))}

//         {/* {emergencyContacts.length > 0 && (
//           <>
//             <h3 className="text-xl font-semibold text-gray-800 mb-2">Emergency Contacts</h3>
//             <ul className="list-disc pl-5 space-y-2">
//               {emergencyContacts.map((contact, index) => (
//                 <li key={index} className="text-lg">
//                   <strong>{contact.title}:</strong> {contact.phone}
//                 </li>
//               ))}
//             </ul>
//           </>
//         )} */}
//       </div>
//     </div>
//   );
// }

// export default SecurityGuardDetails;




import { useState, useEffect } from "react";
import axios from "axios";

function SecurityGuardDetails() {
  const [guardDetails, setGuardDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/guard/guards");
        console.log("API Response:", response.data);
        setGuardDetails(response.data || []);
      } catch (err) {
        setError("Failed to fetch security guard details.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-lg font-semibold text-white" style={{ backgroundColor: "#111828" }}>Loading...</div>;
  }

  if (error) {
    return <div className="flex justify-center items-center h-screen text-red-400 text-lg" style={{ backgroundColor: "#111828" }}>{error}</div>;
  }

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-6 ml-44"
      style={{ backgroundColor: "#111828" }}
    >
      <div className="rounded-2xl p-6 max-w-2xl w-full shadow-lg" style={{ backgroundColor: "#0a0a0a" }}>
        <h2 className="text-2xl font-semibold text-white text-center mb-6">
          Security Guard Details
        </h2>

        {guardDetails.map((guard, index) => (
          <div key={index} className="border-b border-gray-600 pb-4 mb-4">
            {guard.onDuty && (
              <div>
                <p className="text-lg text-gray-200"><strong>Guard ID:</strong> {guard.guardId}</p>
                <p className="text-lg text-gray-200"><strong>Name:</strong> {guard.name}</p>
                <p className="text-lg text-gray-200"><strong>Shift:</strong> {guard.shift}</p>
                <p className="text-lg text-gray-200"><strong>Contact:</strong> {guard.contact}</p>
                <p className="text-lg text-gray-200"><strong>Post:</strong> {guard.post}</p>
                <p className="text-lg text-gray-200">
                  <strong>On Duty:</strong>
                  <span className={guard.onDuty ? "text-green-400 ml-1" : "text-red-400 ml-1"}>
                    {guard.onDuty ? "Yes" : "No"}
                  </span>
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default SecurityGuardDetails;
