import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import About from "./components/LandingSite/About/index";
import Contact from "./components/LandingSite/Contact/index";
import LandingSite from "./components/LandingSite/Index";
import LandingPage from "./components/LandingSite/LandingPage/index";
import Auth from "./components/LandingSite/AuthPage/Index";
import SignIn from "./components/LandingSite/AuthPage/SignIn";
import RequestAcc from "./components/LandingSite/AuthPage/Request";
import AdminSignIn from "./components/LandingSite/AuthPage/AdminSignIn";
import Index from "./components/Dashboards/StudentDashboard/Index";
import Home from "./components/Dashboards/StudentDashboard/Home";
import Mess from "./components/Dashboards/StudentDashboard/Mess";
import Attendance from "./components/Dashboards/StudentDashboard/Attendance";
import Invoices from "./components/Dashboards/StudentDashboard/Invoices";
import Suggestions from "./components/Dashboards/StudentDashboard/Suggestions";
import Complaints from "./components/Dashboards/StudentDashboard/Complaints";
import Settings from "./components/Dashboards/StudentDashboard/Settings";
import AdminIndex from "./components/Dashboards/AdminDashboard/Index";
import AdminHome from "./components/Dashboards/AdminDashboard/Home/Home";

import CaretakerSuggestions from "./components/Dashboards/CaretakerDashboard/Suggestions";

import AdminAttendance from "./components/Dashboards/AdminDashboard/Attendance";
import AdminComplaints from "./components/Dashboards/AdminDashboard/Complaints";
import AdminInvoices from "./components/Dashboards/AdminDashboard/Invoices";
import AdminSuggestions from "./components/Dashboards/AdminDashboard/Suggestions";
import AdminSettings from "./components/Dashboards/AdminDashboard/Settings";

import AdminMess from "./components/Dashboards/AdminDashboard/MessOff";
import RulesAndGuidelines from "./components/LandingSite/rulesAndGuidelines/RulesAndGuidelines";

import NoticeBoard from "./components/LandingSite/NoticeBoard/NoticeBoard";
import Event from "./components/Dashboards/StudentDashboard/Event";
import EventRequestVerification from "./components/Dashboards/AdminDashboard/EventRequestVerification";
import SecurityGuardDetails from "./components/Dashboards/StudentDashboard/SecurityGuardDetails";
import SecurityGuardSelector from "./components/Dashboards/AdminDashboard/SecurityGuardSelector";

import Room from "./components/Dashboards/Common/Room";
import SuperAdminIndex from "./components/Dashboards/SuperAdminDashboard/SuperAdminIndex.jsx";
import SAHome from "./components/Dashboards/SuperAdminDashboard/Home/SAHome.jsx";
import { useEffect } from "react";
import CreateStaff from "./components/Dashboards/SuperAdminDashboard/CreateStaff.jsx";
import SAProfile from "./components/Dashboards/SuperAdminDashboard/SAProfile.jsx";
import ManagerIndex from "./components/Dashboards/ManagerDashboard/ManagerIndex.jsx";
import ManagerHome from "./components/Dashboards/ManagerDashboard/Home/ManagerHome.jsx";

import CaretakerIndex from "./components/Dashboards/CaretakerDashboard/CaretakerIndex.jsx";
import CaretakerHome from "./components/Dashboards/CaretakerDashboard/Home/CaretakerHome.jsx";
import RegisterStudent from "./components/Dashboards/CaretakerDashboard/RegisterStudent.jsx";
import StudentEditForm from "./components/Dashboards/CaretakerDashboard/StudentEditForm.jsx";
import AllStudents from "./components/Dashboards/CaretakerDashboard/AllStudents.jsx";
import GuardIndex from "./components/Dashboards/Guard/GuardIndex.jsx";
import GuardHome from "./components/Dashboards/Guard/Home/GuardHome.jsx";
import WardenIndex from "./components/Dashboards/WardenDashboard/GuardIndex.jsx";
import WardendHome from "./components/Dashboards/WardenDashboard/Home/WardenHome.jsx";
import SIIndex from "./components/Dashboards/SecurityInchargeDashboard/SIIndex.jsx";
import SIHome from "./components/Dashboards/SecurityInchargeDashboard/SIHome.jsx";
import Rooms from "./components/Dashboards/SuperAdminDashboard/Rooms.jsx";
import CreateGuard from "./components/Dashboards/SecurityInchargeDashboard/CreateGuard.jsx";
import UpdateGuard from "./components/Dashboards/SecurityInchargeDashboard/UpdateGuard.jsx";
import StudentRooms from "./components/Dashboards/StudentDashboard/StudentRooms.jsx";
import SARooms from "./components/Dashboards/SuperAdminDashboard/SARooms.jsx";
import SAAllStudent from "./components/Dashboards/SuperAdminDashboard/SAAllStudent.jsx";
import ChiefWardenEventVerification from "./components/Dashboards/SuperAdminDashboard/ChiefWardenEventVerification.jsx"
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<LandingSite />}>
          <Route index element={<LandingPage />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="rules" element={<RulesAndGuidelines />} />
          <Route path="notices" element={<NoticeBoard />} />
          <Route path="auth" element={<Auth />}>
            <Route index element={<SignIn />} />
            <Route path="login" element={<SignIn />} />
            <Route path="request" element={<RequestAcc />} />
            <Route path="admin-login" element={<AdminSignIn />} />
          </Route>
        </Route>
        {/* student dashboard */}
        <Route path="/student-dashboard" element={<Index />}>
          <Route index element={<Home />} />
          <Route path="mess" element={<Mess />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="complaints" element={<Complaints />} />
          <Route path="suggestions" element={<Suggestions />} />
          <Route path="invoices" element={<Invoices />} />
          <Route path="settings" element={<Settings />} />
          <Route path="event" element={<Event />} />
          <Route path="rooms" element={<StudentRooms />} />
          <Route
            path="security-guard-detail"
            element={<SecurityGuardDetails />}
          />
        </Route>

        {/* superadmin-dashboard */}
        <Route path="/superadmin-dashboard" element={<SuperAdminIndex />}>
          <Route index element={<SAHome />} />
          <Route path="create-staff" element={<CreateStaff />} />
          <Route path="profile" element={<SAProfile />} />
          <Route path="rooms" element={<SARooms />} />
          <Route path="all-student" element={<SAAllStudent />} />
          <Route path="all-student" element={<SAAllStudent/>} />
          <Route path="event-fund" element={<ChiefWardenEventVerification/>} />
        </Route>
        {/* manager-dashboard */}
        <Route path="/manager-dashboard" element={<ManagerIndex />}>
          <Route index element={<ManagerHome />} />
          <Route path="create-staff" element={<CreateStaff />} />
          <Route path="mess" element={<AdminMess />} />
          <Route path="complaints" element={<AdminComplaints />} />
          <Route path="suggestions" element={<AdminSuggestions />} />
        </Route>

        {/* caretaker-dashboard */}
        <Route path="/caretaker-dashboard" element={<CaretakerIndex />}>
          <Route index element={<CaretakerHome />} />
          <Route path="register-student" element={<RegisterStudent />} />
          <Route path="all-students" element={<AllStudents />} />
          <Route path="student/:id" element={<StudentEditForm />} />
          <Route path="rooms" element={<Room />} />
          <Route
            path="/caretaker-dashboard/suggestions"
            element={<CaretakerSuggestions />}
          />
        </Route>
        {/* Guard Dashboard */}
        <Route path="/guard-dashboard" element={<GuardIndex />}>
          <Route index element={<GuardHome />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="rooms" element={<Room />} />
        </Route>

        {/* Warden Dashboard */}
        <Route path="/warden-dashboard" element={<WardenIndex />}>
          <Route index element={<WardendHome />} />
          <Route
            path="event-request-verification"
            element={<EventRequestVerification />}
          />
          <Route path="rooms" element={<Room />} />

        </Route>

        {/* SecurityIncharge dashboard */}
        <Route path="/securityincharge-dashboard" element={<SIIndex />}>
          <Route index element={<SIHome />} />
          <Route path="create-guard" element={<CreateGuard />} />
          <Route path="update-guard" element={<UpdateGuard />} />
          <Route path="manage-guard" element={<SecurityGuardSelector />} />
        </Route>

        <Route path="/admin-dashboard" element={<AdminIndex />}>
          <Route index element={<AdminHome />} />
          <Route path="register-student" element={<RegisterStudent />} />
          <Route path="attendance" element={<AdminAttendance />} />
          <Route path="complaints" element={<AdminComplaints />} />
          {/* <Route path="invoices" element={<AdminInvoices/>} /> */}
          <Route path="suggestions" element={<AdminSuggestions />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="all-students" element={<AllStudents />} />
          <Route path="mess" element={<AdminMess />} />
          <Route
            path="event-request-verification"
            element={<EventRequestVerification />}
          />
          <Route
            path="security-guard-selector"
            element={<SecurityGuardSelector />}
          />
          <Route path="rooms" element={<Room />} />
          <Route path="student/:id" element={<StudentEditForm />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
