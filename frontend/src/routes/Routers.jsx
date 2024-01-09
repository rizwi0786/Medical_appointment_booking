import Home from "../pages/Home";
import Services from "../pages/Services";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Contact from "../pages/Contact";
import Doctors from "../pages/Doctors/Doctors";
import DoctorDetails from "../pages/Doctors/DoctorDetails";
import MyAccount from "../Dashboard/user-account/MyAccount";

import Dashboard from "../Dashboard/doctor-account/Dashboard";

import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/home" element={<Home />}></Route>
      <Route path="/services" element={<Services />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Signup />}></Route>
      <Route path="/contact" element={<Contact />}></Route>
      <Route path="/doctors" element={<Doctors />}></Route>
      <Route path="/doctors/:id" element={<DoctorDetails />}></Route>
      <Route
        path="/users/profile/me"
        element={
          <ProtectedRoute allowedRoles={["patient"]}>
            <MyAccount />
          </ProtectedRoute>
        }
      ></Route>
      <Route
        path="/doctor/profile/me"
        element={
          <ProtectedRoute allowedRoles={["doctor"]}>
            <Dashboard />
          </ProtectedRoute>
        }
      ></Route>
    </Routes>
  );
};

export default Routers;
