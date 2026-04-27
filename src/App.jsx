import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

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
import { DashBoardLayout } from "./Components/Admin/DashBoardLayout";

/*
=================
ADMIN PAGES
=================
 */
import AdminSignIn from "./Pages/Admin/AdminSignIn";
import AdminDashBoardPage from "./Pages/Admin/AdminDashBoardPage";
import AdminAssociatePage from "./Pages/Admin/AdminAssociatePage";
import AdminIntelligencePage from "./Pages/Admin/AdminIntelligencePage";
import AdminSettingsPage from "./Pages/Admin/AdminSettingsPage";

import AdminUploadListing from "./Pages/Admin/AdminUploadListing";
import AdminOpenDeals from "./Pages/Admin/AdminOpenDeals";

function App() {
  return (
    <>
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-otp" element={<ConfirmOtp />} />
        <Route path="/admin/sign-in" element={<AdminSignIn />} />

        <Route path="/admin" element={<DashBoardLayout isAdmin={true} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashBoardPage />} />
          <Route path="associate" element={<AdminAssociatePage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="intelligence" element={<AdminIntelligencePage />}>
            <Route index element={<Navigate to="upload-listing" replace />} />
            <Route path="upload-listing" element={<AdminUploadListing />} />
            <Route path="open-deals" element={<AdminOpenDeals />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
