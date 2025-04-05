// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// const SecurityGuardSelector = () => {
//   const [guards, setGuards] = useState([]);
//   const [selectedGuardId, setSelectedGuardId] = useState('');
//   const [onDutyGuard, setOnDutyGuard] = useState(null);

//   // Fetch all guards on mount
//   useEffect(() => {
//     const fetchGuards = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/guard/guards');
//         setGuards(response.data);
//         const currentOnDuty = response.data.find((g) => g.onDuty);
//         if (currentOnDuty) {
//           setSelectedGuardId(currentOnDuty.guardId);
//           setOnDutyGuard(currentOnDuty);
//         }
//       } catch (error) {
//         console.error('Error fetching guards:', error);
//       }
//     };

//     fetchGuards();
//   }, []);

//   // Handle dropdown selection
//   const handleSelectGuard = async (e) => {
//     const guardId = e.target.value;
//     setSelectedGuardId(guardId);
//     try {
//       const response = await axios.put('http://localhost:3000/api/guard/guards/on-duty', { guardId });
//       setOnDutyGuard(response.data);
//     } catch (error) {
//       console.error('Error setting guard on duty:', error);
//     }
//   };

//   return (
//     <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg">
//       <h2 className="text-xl font-semibold mb-4 text-center">Assign Security Guard on Duty</h2>

//       <select
//         className="w-full p-2 border border-gray-300 rounded-lg mb-4"
//         value={selectedGuardId}
//         onChange={handleSelectGuard}
//       >
//         <option value="">-- Select Security Guard --</option>
//         {guards.map((guard) => (
//           <option key={guard.guardId} value={guard.guardId}>
//             {guard.name} ({guard.shift})
//           </option>
//         ))}
//       </select>

//       {onDutyGuard && (
//         <div className="p-4 border border-green-300 rounded-xl bg-green-50">
//           <h3 className="text-lg font-semibold mb-2">Guard on Duty</h3>
//           <p><strong>Name:</strong> {onDutyGuard.name}</p>
//           <p><strong>ID:</strong> {onDutyGuard.guardId}</p>
//           <p><strong>Shift:</strong> {onDutyGuard.shift}</p>
//           <p><strong>Post:</strong> {onDutyGuard.post}</p>
//           <p><strong>Contact:</strong> {onDutyGuard.contact}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default SecurityGuardSelector;



import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SecurityGuardSelector = () => {
  const [guards, setGuards] = useState([]);
  const [selectedGuardId, setSelectedGuardId] = useState('');
  const [onDutyGuard, setOnDutyGuard] = useState(null);
  const [loading, setLoading] = useState(false);

  // Fetch guards on mount
  useEffect(() => {
    fetchGuards();
  }, []);

  const fetchGuards = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/guard/guards');
      const guardList = response.data;
      setGuards(guardList);

      const currentOnDuty = guardList.find((g) => g.onDuty);
      if (currentOnDuty) {
        setSelectedGuardId(currentOnDuty.guardId);
        setOnDutyGuard(currentOnDuty);
      } else {
        setSelectedGuardId('');
        setOnDutyGuard(null);
      }
    } catch (error) {
      console.error('Error fetching guards:', error);
    }
  };

  const handleSelectGuard = async (e) => {
    const guardId = e.target.value;
    setSelectedGuardId(guardId);
    setLoading(true);

    try {
      // Set new guard on duty
      await axios.put('http://localhost:3000/api/guard/guards/on-duty', { guardId });

      // Refresh the guards list and update the on-duty guard
      await fetchGuards();
    } catch (error) {
      console.error('Error setting guard on duty:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-lg mt-10">
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Assign Security Guard on Duty</h2>

      <select
        className="w-full p-2 border border-gray-300 rounded-lg mb-4"
        value={selectedGuardId}
        onChange={handleSelectGuard}
      >
        <option value="">-- Select Security Guard --</option>
        {guards.map((guard) => (
          <option key={guard.guardId} value={guard.guardId}>
            {guard.name} ({guard.shift})
          </option>
        ))}
      </select>

      {loading && (
        <div className="text-center text-blue-500 mb-4">Updating on-duty guard...</div>
      )}

      {onDutyGuard && !loading && (
        <div className="p-4 border border-green-300 rounded-xl bg-green-50">
          <h3 className="text-lg font-semibold mb-2 text-green-800">Guard on Duty</h3>
          <p><strong>Name:</strong> {onDutyGuard.name}</p>
          <p><strong>ID:</strong> {onDutyGuard.guardId}</p>
          <p><strong>Shift:</strong> {onDutyGuard.shift}</p>
          <p><strong>Post:</strong> {onDutyGuard.post}</p>
          <p><strong>Contact:</strong> {onDutyGuard.contact}</p>
        </div>
      )}
    </div>
  );
};

export default SecurityGuardSelector;
