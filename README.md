# land real estate management dashboard

A web application built for **land real estate management** to manage associates, land listings, and client tracking within a real estate system in Nigeria.

---

## 📌 Project Overview
This system is designed to help land real estate manage their associates (agents/employees) efficiently. Associates are able to access a personalized dashboard where they can view assigned land properties, upload prospective clients, and track their performance.

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
- Backend: Node.js, Express.js
- Database: Superbase
- Authentication: JWT / Session-based auth

---

## 📁 Project Structure
```text
root/
├── public/              # Static assets (favicons,)
├── src/                 # Main application source
│   ├── assets/          # Images (ogo.png, icons etc)
│   ├── Components/      # Reusable UI pieces
│   │    ├── AuthLayout.jsx        # SignIn and SignUp Layout util
│   ├── Pages/           # Full page views
|   |    ├──Admin/       #AdminSignIn  page
|   |    ├──Forms/       #SignIn ,SignUp ,OTP, Forget Password , Reset Password pages  
│   ├── App.jsx          # Component tree
│   └── main.jsx         # Entry point & Routing
├── .gitignore           # Files to ignore in Git
├── package.json         # Dependencies and scripts
└── README.md            # 

## installation & setup

 ### 1. Clone repository
  ```bash
  git clone https://github.com/Ugochukwu111/land-real-estate-management-dashboard.git

  npm install
