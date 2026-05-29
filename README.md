# Land Real Estate Management Dashboard

A React + Vite frontend for a land real estate management dashboard. The app is built around two main roles:

- **Admin**: manage associates, view analytics, upload land listings, review open deals, and update management settings.
- **Associate**: complete profile details, view assigned listings, submit client details, and track open deals.

This repository currently contains the frontend UI only. Most data is still static or stored in local component state while backend/API integration is being prepared.

## Tech Stack

- React 19
- Vite 8
- React Router 7
- Axios
- Chart.js and React Chart.js 2
- Day.js
- Lucide React icons
- React Modal
- CSS modules by feature/page
- ESLint

## Features

- Associate authentication screens: sign up, sign in, forgot password, reset password, and OTP confirmation.
- Admin sign-in screen.
- Shared dashboard shell with role-based navigation.
- Admin overview dashboard with line, bar, and doughnut analytics charts.
- Admin associate management page with summary cards, associate table, and associate action modal.
- Admin listing upload/edit modal.
- Admin open deals view.
- Admin settings forms for profile and management configuration.
- Associate profile completion modal.
- Associate listings view with client details modal.
- Associate open deals view.
- Shared listing, document, open-deal, form-input, dropdown, chart, and settings components.

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_BUSINESS_NAME="Dilux Properties"
VITE_API_ENDPOINT="https://your-api-url.example"
```

Current usage:

- `VITE_BUSINESS_NAME` is used across dashboard headings, auth copy, and navigation branding.
- `VITE_API_ENDPOINT` is reserved for API integration.

### Development

```bash
npm run dev
```

### Production Build

```bash
npm run build
```

### Preview Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Routes

### Public / Authentication

| Route | Page |
| --- | --- |
| `/sign-up` | Associate registration |
| `/sign-in` | Associate sign in |
| `/forgot-password` | Forgot password |
| `/reset-password` | Reset password |
| `/confirm-otp` | OTP confirmation |
| `/admin/sign-in` | Admin sign in |
| `*` | Not found page |

### Admin Dashboard

All admin dashboard routes render inside `DashBoardLayout` with `isAdmin={true}`.

| Route | Page |
| --- | --- |
| `/admin` | Redirects to `/admin/dashboard` |
| `/admin/dashboard` | Admin analytics overview |
| `/admin/associate` | Associate management |
| `/admin/settings` | Admin settings |
| `/admin/intelligence` | Redirects to `/admin/intelligence/upload-listing` |
| `/admin/intelligence/upload-listing` | Upload/manage listings |
| `/admin/intelligence/open-deals` | Admin open deals |

### Associate Dashboard

All associate dashboard routes render inside `DashBoardLayout` with `isAdmin={false}`.

| Route | Page |
| --- | --- |
| `/associate` | Redirects to `/associate/dashboard` |
| `/associate/dashboard` | Complete profile flow |
| `/associate/acquisition` | Redirects to `/associate/acquisition/listings` |
| `/associate/acquisition/listings` | Listing cards and client details form |
| `/associate/acquisition/open-deal` | Associate open deals |

## Project Structure

```text
land-real-estate/
+-- public/
|   +-- favicon.svg
|   +-- icons.svg
+-- src/
|   +-- assets/
|   |   +-- icons/
|   |   |   +-- profile.png
|   |   +-- logo-white.webp
|   |   +-- logo.png
|   +-- Components/
|   |   +-- Admin/
|   |   |   +-- AdminProfileForm.jsx
|   |   |   +-- DashBoardLayout.css
|   |   |   +-- DashBoardLayout.jsx
|   |   |   +-- ManagementSettingsForm.jsx
|   |   |   +-- SettingsCard.css
|   |   |   +-- SettingsCard.jsx
|   |   |   +-- SettingsListManager.jsx
|   |   |   +-- UploadEditForm.css
|   |   |   +-- UploadEditForm.jsx
|   |   +-- Charts/
|   |   |   +-- AnalyticsBarChart.jsx
|   |   |   +-- AnalyticsDashboardLayout.css
|   |   |   +-- AnalyticsDashBoardLayout.jsx
|   |   |   +-- AnalyticsLineChart.jsx
|   |   |   +-- AnalyticsPieChart.jsx
|   |   +-- AuthLayout.css
|   |   +-- AuthLayout.jsx
|   |   +-- DashboardSubNavigationLayout.css
|   |   +-- DashboardSubNavigationLayout.jsx
|   |   +-- DropDown.jsx
|   |   +-- FormInput.jsx
|   |   +-- ListingCard.css
|   |   +-- ListingCard.jsx
|   |   +-- ListingDocuments.css
|   |   +-- ListingDocuments.jsx
|   |   +-- OpenDealCard.css
|   |   +-- OpenDealCard.jsx
|   +-- Pages/
|   |   +-- Admin/
|   |   |   +-- AdminAssociatePage.css
|   |   |   +-- AdminAssociatePage.jsx
|   |   |   +-- AdminDashBoardPage.jsx
|   |   |   +-- AdminOpenDeals.css
|   |   |   +-- AdminOpenDeals.jsx
|   |   |   +-- AdminSettingsPage.css
|   |   |   +-- AdminSettingsPage.jsx
|   |   |   +-- AdminSignIn.jsx
|   |   |   +-- AdminUploadListing.css
|   |   |   +-- AdminUploadListing.jsx
|   |   +-- Associate/
|   |   |   +-- AssociateDashboardPage.jsx
|   |   |   +-- AssociateOpenDeals.jsx
|   |   |   +-- AssociateViewListings.jsx
|   |   |   +-- ClientDetailsForm.jsx
|   |   |   +-- CompleteProfile.css
|   |   |   +-- CompleteProfile.jsx
|   |   +-- Forms/
|   |   |   +-- ConfirmOtp.jsx
|   |   |   +-- ForgotPassword.jsx
|   |   |   +-- Forms.css
|   |   |   +-- OtpInput.css
|   |   |   +-- OtpInput.jsx
|   |   |   +-- ResetPassword.jsx
|   |   |   +-- SignIn.jsx
|   |   |   +-- SignUp.jsx
|   |   +-- NotFound.jsx
|   +-- utils/
|   |   +-- GetGreetings.jsx
|   +-- App.jsx
|   +-- index.css
|   +-- main.jsx
+-- .env
+-- .gitignore
+-- eslint.config.js
+-- index.html
+-- package-lock.json
+-- package.json
+-- README.md
+-- vite.config.js
```

## Architecture Notes

- `src/main.jsx` mounts the app and wraps it in `BrowserRouter`.
- `src/App.jsx` owns the route tree for public, admin, and associate routes.
- `DashBoardLayout` is the shared dashboard shell. The `isAdmin` prop switches sidebar navigation and role labels.
- `DashboardSubNavigationLayout` renders nested sub-navigation for admin intelligence and associate acquisition pages.
- Forms currently validate mostly on the client and use local component state.
- Dashboard analytics and listing/deal content are currently static placeholders.
- `react-modal` is used for upload/edit listings, associate actions, client details, and profile completion flows.

## Known Development Notes

- Backend integration is not complete yet.
- Some routes/components are placeholders or still evolving, such as associate growth/recognition links and static dashboard values.
- Several components use mock content until API data is connected.
