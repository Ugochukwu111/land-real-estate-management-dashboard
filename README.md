# land real estate management dashboard

A web application built for **land real estate management** to manage associates, land listings, and client tracking within a real estate system in Nigeria.

---

## 📌 Project Overview
This system is designed to help land real estate manage their associates (agents/employees) efficiently. Associates are able to access a personalized dashboard where they can view assigned land properties, upload prospective clients, and track their performance.

> Note: This repository contains the frontend dashboard UI only. Backend services and integrations will be provided in a future repository.

The admin has full control over associates, land listings, and verification processes.

---

## 🚀 Features

### 👨‍💼 Admin
- Create and manage associates
- Verify associate accounts
- Assign land listings to associates
- View submitted prospective clients
- Monitor associate performance

### 👥 Associates
- Register and login securely
- Access personal dashboard
- View assigned land properties
- Upload prospective client information
- Track referral/client records

---

## 🛠️ Tech Stack

- Frontend: React
- Build Tool: Vite
- Styling: CSS
- Routing: React Router

> Frontend-only repository. Future backend and data services will be added in a separate repo.

---

## 📁 Project Structure
```text
root/
├── public/                  # Static public assets
├── src/                     # Main application source
│   ├── assets/              # Images and icon files
│   ├── Components/          # Reusable UI components
│   │   ├── Admin/
│   │   │   ├── DashBoardLayout.jsx
│   │   │   ├── DashBoardLayout.css
│   │   │   ├── UploadEditForm.jsx
│   │   │   └── UploadEditForm.css
│   │   ├── AuthLayout.jsx
│   │   ├── AuthLayout.css
│   │   ├── DropDown.jsx
│   │   ├── ListingCard.jsx
│   │   ├── ListingCard.css
│   │   ├── ListingDocuments.jsx
│   │   └── ListingDocuments.css
│   ├── Pages/
│   │   ├── Admin/
│   │   │   ├── AdminAssociatePage.jsx
│   │   │   ├── AdminAssociatePage.css
│   │   │   ├── AdminDashBoardPage.jsx
│   │   │   ├── AdminDashBoardPage.css
│   │   │   ├── AdminIntelligencePage.jsx
│   │   │   ├── AdminIntelligencePage.css
│   │   │   ├── AdminOpenDeals.jsx
│   │   │   ├── AdminSettingsPage.jsx
│   │   │   ├── AdminSettingsPage.css
│   │   │   ├── AdminSignIn.jsx
│   │   │   ├── AdminUploadListing.jsx
│   │   │   └── AdminUploadListing.css
│   │   └── Forms/
│   │       ├── ConfirmOtp.jsx
│   │       ├── ForgotPassword.jsx
│   │       ├── OtpInput.jsx
│   │       ├── OtpInput.css
│   │       ├── ResetPassword.jsx
│   │       ├── SignIn.jsx
│   │       ├── SignUp.jsx
│   │       └── Forms.css
│   ├── utils/
│   │   └── GetGreetings.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
└── vite.config.js
```

## installation & setup

 ### 1. Clone repository
  ```bash
  git clone https://github.com/Ugochukwu111/land-real-estate-management-dashboard.git

  npm install
