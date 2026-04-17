import { useState } from "react";
import { Routes, Route } from "react-router-dom";


/*
=================
AUTHENTICATION PAGES
=================
 */
import SignUp from "./Pages/Forms/SignUp";
import SignIn from "./Pages/Forms/SignIn";
import ForgotPassword from "./Pages/Forms/ForgotPassword";
import ResetPassword from "./Pages/Forms/ResetPassword";
import ConfirmOtp from "./Pages/Forms/ConfirmOtp";

/*
=================
ADMIN PAGES
=================
 */
import AdminSignIn from "./Pages/Admin/AdminSignIn";


function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/admin-sign-in" element={<AdminSignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-otp" element={<ConfirmOtp />} />
      </Routes>
    </>
  );
}

export default App;
