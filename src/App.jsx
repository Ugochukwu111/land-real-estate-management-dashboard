import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import { DashBoardLayout } from "./Components/Admin/DashBoardLayout";

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
import AdminDashBoardPage from "./Pages/Admin/AdminDashBoardPage";
import AdminAssociatePage from "./Pages/Admin/AdminAssociatePage";
import DashboardSubNavigationLayout from "./Components/DashboardSubNavigationLayout";
import AdminSettingsPage from "./Pages/Admin/AdminSettingsPage";

import AdminUploadListing from "./Pages/Admin/AdminUploadListing";
import AdminOpenDeals from "./Pages/Admin/AdminOpenDeals";

/*
=================
ASSOCIATE PAGES
=================
 */
import AssociateDashBoardPage from "./Pages/Associate/AssociateDashboardPage";
import AssociateViewListings from "./Pages/Associate/AssociateViewListings";
import AssociateOpenDeals from "./Pages/Associate/AssociateOpenDeals";
import CompleteProfile from "./Pages/Associate/CompleteProfile";

import NotFound from "./Pages/NotFound";

function App() {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/confirm-otp" element={<ConfirmOtp />} />
        <Route path="/admin/sign-in" element={<AdminSignIn />} />
        <Route path="*" element={<NotFound />} />

        <Route path="/admin" element={<DashBoardLayout isAdmin={true} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashBoardPage />} />
          <Route path="associate" element={<AdminAssociatePage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route
            path="intelligence"
            element={<DashboardSubNavigationLayout isAdmin={true} />}
          >
            <Route index element={<Navigate to="upload-listing" replace />} />
            <Route path="upload-listing" element={<AdminUploadListing />} />
            <Route path="open-deals" element={<AdminOpenDeals />} />
          </Route>
        </Route>

        {/* associates navigation */}

        <Route path="/associate" element={<DashBoardLayout isAdmin={false} />}>
          <Route index element={<Navigate to="dashboard" replace />} />
          <Route path="dashboard" element={<CompleteProfile />} />
          <Route path="edith" element={<AdminDashBoardPage />} />
          <Route path="associate" element={<AdminAssociatePage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route
            path="acquisition"
            element={<DashboardSubNavigationLayout isAdmin={false} />}
          >
            <Route index element={<Navigate to="listings" replace />} />
            <Route path="listings" element={<AssociateViewListings />} />
            <Route path="open-deal" element={<AssociateOpenDeals />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
