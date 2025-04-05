// import { useState } from "react";
// import { Input } from "./Input";
// import { Button } from "../Common/PrimaryButton";
// import { Loader } from "../Common/Loader";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';

// function RegisterStudent() {
//   const registerStudent = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       let student = {
//         name: name,
//         urn: urn,
//         room_no: room_no,
//         batch: batch,
//         dept: dept,
//         course: course,
//         email: email,
//         father_name: fatherName,
//         contact: contact,
//         address: address,
//         dob: dob,
//         uidai: uidai,
//         hostel: hostel,
//         password: password
//       };
//       console.log(student);
//       const res = await fetch("http://localhost:3000/api/student/register-student", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(student),
//       })
//       const data = await res.json();
//       if (data.success) {
//         toast.success(
//           'Student ' + data.student.name + ' Registered Successfully!', {
//           position: "top-right",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "dark",
//         })
//         seturn("");
//         setName("");
//         setRoomNo("");
//         setBatch("");
//         setDept("");
//         setCourse("");
//         setEmail("");
//         setFatherName("");
//         setContact("");
//         setAddress("");
//         setDob("");
//         setuidai("");
//         setPassword("");
//         setLoading(false);
//       } else {
       
//         data.errors.forEach((err) => {
//           toast.error(
//             err.msg, {
//             position: "top-right",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//           })
//         })
//         setLoading(false);

//       }
//     } catch (err) {
//       toast.error(
//         err, {
//         position: "top-right",
//         autoClose: 3000,
//         hideProgressBar: false,
//         closeOnClick: true,
//         pauseOnHover: true,
//       }
//       )
//       setLoading(false);
//     }
//   };

//   const hostel="Hostel No 1";
//   const [urn, seturn] = useState();
//   const [name, setName] = useState();
//   const [room_no, setRoomNo] = useState();
//   const [batch, setBatch] = useState();
//   const [dept, setDept] = useState();
//   const [course, setCourse] = useState();
//   const [email, setEmail] = useState();
//   const [fatherName, setFatherName] = useState();
//   const [contact, setContact] = useState();
//   const [address, setAddress] = useState();
//   const [dob, setDob] = useState();
//   const [uidai, setuidai] = useState();
//   const [password, setPassword] = useState();

//   const [loading, setLoading] = useState(false);

//   return (
//     <div className="w-full max-h-screen pt-20 flex flex-col items-center justify-center">
//       <h1 className="text-white font-bold text-5xl mt-10 mb-5">
//         Register Student
//       </h1>
//       <div className="md:w-[60vw] w-full p-10 bg-neutral-950 rounded-lg shadow-xl mb-10 overflow-auto">
//         <form method="post" onSubmit={registerStudent} className="flex flex-col gap-3">
//           <div className="flex gap-5 flex-wrap justify-center md:w-full sw-[100vw]">
//             <Input
//               field={{
//                 name: "name",
//                 placeholder: "Student Name",
//                 type: "text",
//                 req: true,
//                 value: name,
//                 onChange: (e) => setName(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "urn",
//                 placeholder: "Student urn",
//                 type: "number",
//                 req: true,
//                 value: urn,
//                 onChange: (e) => seturn(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "dob",
//                 placeholder: "Student dob",
//                 type: "date",
//                 req: true,
//                 value: dob,
//                 onChange: (e) => setDob(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "uidai",
//                 placeholder: "Student uidai",
//                 type: "text",
//                 req: true,
//                 value: uidai,
//                 onChange: (e) => setuidai(e.target.value),
//               }}
//             />
//           </div>
//           <div className="flex gap-5 w-full flex-wrap justify-center">
//             <Input
//               field={{
//                 name: "email",
//                 placeholder: "Student Email",
//                 type: "email",
//                 req: true,
//                 value: email,
//                 onChange: (e) => setEmail(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "contact",
//                 placeholder: "Student Contact",
//                 type: "text",
//                 req: true,
//                 value: contact,
//                 onChange: (e) => setContact(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "father_name",
//                 placeholder: "Student's Father Name",
//                 type: "text",
//                 req: true,
//                 value: fatherName,
//                 onChange: (e) => setFatherName(e.target.value),
//               }}
//             />
//           </div>
//           <div className="mx-12">
//             <label
//               htmlFor="address"
//               className="block mb-2 text-sm font-medium text-white"
//             >
//               Address
//             </label>
//             <textarea
//               name="address"
//               placeholder="Student Address"
//               required
//               value={address}
//               onChange={(e) => setAddress(e.target.value)}
//               className="border flex-grow sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
//             />
//           </div>
//           <div className="flex flex-wrap gap-5 w-full justify-center">
//             <Input
//               field={{
//                 name: "room",
//                 placeholder: "Student Room",
//                 type: "number",
//                 req: true,
//                 value: room_no,
//                 onChange: (e) => setRoomNo(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "hostel",
//                 placeholder: "Student Hostel",
//                 type: "text",
//                 req: true,
//                 value: hostel,
//                 disabled: true,
//               }}
//             />
//             <Input
//               field={{
//                 name: "dept",
//                 placeholder: "Student Department",
//                 type: "text",
//                 req: true,
//                 value: dept,
//                 onChange: (e) => setDept(e.target.value),
//               }}
//             />
//           </div>
//           <div className="flex flex-wrap justify-center gap-5">
//             <Input
//               field={{
//                 name: "course",
//                 placeholder: "Student Course",
//                 type: "text",
//                 req: true,
//                 value: course,
//                 onChange: (e) => setCourse(e.target.value),
//               }}
//             />
//             <Input
//               field={{
//                 name: "batch",
//                 placeholder: "Student Batch",
//                 type: "number",
//                 req: true,
//                 value: batch,
//                 onChange: (e) => setBatch(e.target.value),
//               }}
//             />
//           </div>
//           <div className="mx-12">
//             <Input
//               field={{
//                 name: "password",
//                 placeholder: "Student Password",
//                 type: "password",
//                 req: true,
//                 value: password,
//                 onChange: (e) => setPassword(e.target.value),
//               }}
//             />
//           </div>
//           <div className="mt-5">
//             <Button>
//               {loading ? (
//                 <>
//                   <Loader /> Registering...
//                 </>
//               ) : (
//                 <span>Register Student</span>
//               )}
//             </Button>
//             <ToastContainer
//               position="top-right"
//               autoClose={3000}
//               hideProgressBar={false}
//               newestOnTop={false}
//               closeOnClick
//               rtl={false}
//               pauseOnFocusLoss
//               draggable
//               pauseOnHover
//               theme="dark"
//             />
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default RegisterStudent;
import { useState } from "react";
import { Input } from "./Input";
import { Button } from "../Common/PrimaryButton";
import { Loader } from "../Common/Loader";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterStudent() {
  const [urn, seturn] = useState("");
  const [name, setName] = useState("");
  const [room_no, setRoomNo] = useState("");
  const [batch, setBatch] = useState("");
  const [dept, setDept] = useState("");
  const [course, setCourse] = useState("");
  const [email, setEmail] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [dob, setDob] = useState("");
  const [uidai, setuidai] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const hostel = "Hostel No 1";

  const registerStudent = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const student = {
        name, urn, room_no, batch, dept, course, email,
        father_name: fatherName, contact, address, dob, uidai, hostel, password
      };

      const res = await fetch("http://localhost:3000/api/student/register-student", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(`Student ${data.student.name} Registered Successfully!`);
        seturn(""); setName(""); setRoomNo(""); setBatch(""); setDept("");
        setCourse(""); setEmail(""); setFatherName(""); setContact("");
        setAddress(""); setDob(""); setuidai(""); setPassword("");
      } else {
        data.errors.forEach(err => toast.error(err.msg));
      }
    } catch (err) {
      toast.error(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="ml-64 max-h-screen pt-20 flex flex-col items-center justify-center mt-12">
      <h1 className="text-white font-bold text-5xl mt-10 mb-5">
        Register Student
      </h1>
      <div className="md:w-[60vw] w-full p-10 bg-neutral-950 rounded-lg shadow-xl mb-10">
        <form onSubmit={registerStudent} className="flex flex-col gap-5">
          {/* Row 1 */}
          <div className="flex flex-wrap gap-12 justify-center mr-8">
            <Input field={{ name: "name", placeholder: "Student Name", type: "text", req: true, value: name, onChange: (e) => setName(e.target.value) }} />
            <Input field={{ name: "urn", placeholder: "URN", type: "number", req: true, value: urn, onChange: (e) => seturn(e.target.value) }} />
            <Input field={{ name: "dob", placeholder: "DOB", type: "date", req: true, value: dob, onChange: (e) => setDob(e.target.value) }} />
          </div>

          {/* Row 2 */}
          <div className="flex flex-wrap gap-12 justify-center">
            <Input field={{ name: "uidai", placeholder: "UIDAI", type: "text", req: true, value: uidai, onChange: (e) => setuidai(e.target.value) }} />
            <Input field={{ name: "email", placeholder: "Email", type: "email", req: true, value: email, onChange: (e) => setEmail(e.target.value) }} />
            <Input field={{ name: "contact", placeholder: "Contact", type: "text", req: true, value: contact, onChange: (e) => setContact(e.target.value) }} />
          </div>

          {/* Row 3 */}
          <div className="flex flex-wrap gap-12 justify-center">
            <Input field={{ name: "father_name", placeholder: "Father's Name", type: "text", req: true, value: fatherName, onChange: (e) => setFatherName(e.target.value) }} />
            <Input field={{ name: "room", placeholder: "Room No", type: "number", req: true, value: room_no, onChange: (e) => setRoomNo(e.target.value) }} />
            <Input field={{ name: "hostel", placeholder: "Hostel", type: "text", req: true, value: hostel, disabled: true }} />
          </div>

          {/* Row 4 */}
          <div className="flex flex-wrap gap-12 justify-center">
            <Input field={{ name: "dept", placeholder: "Department", type: "text", req: true, value: dept, onChange: (e) => setDept(e.target.value) }} />
            <Input field={{ name: "course", placeholder: "Course", type: "text", req: true, value: course, onChange: (e) => setCourse(e.target.value) }} />
            <Input field={{ name: "batch", placeholder: "Batch", type: "number", req: true, value: batch, onChange: (e) => setBatch(e.target.value) }} />
          </div>

          {/* Address */}
          <div className="mx-12">
            <label htmlFor="address" className="block mb-2 text-sm font-medium text-white">
              Address
            </label>
            <textarea
              name="address"
              placeholder="Student Address"
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="border flex-grow sm:text-sm rounded-lg block w-full p-2.5 bg-neutral-700 border-neutral-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Password */}
          <div className="mx-12">
            <Input field={{ name: "password", placeholder: "Password", type: "password", req: true, value: password, onChange: (e) => setPassword(e.target.value) }} />
          </div>

          {/* Submit */}
          <div className="mt-5 text-center">
            <Button>
              {loading ? (<><Loader /> Registering...</>) : (<span>Register Student</span>)}
            </Button>
            <ToastContainer theme="dark" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default RegisterStudent;

