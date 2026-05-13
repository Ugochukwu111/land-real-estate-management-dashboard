import { useState } from "react";

import {
  MapPin,
  Save,
  FileText,
  Globe,
  Building2,
  BadgeDollarSign,
} from "lucide-react";

import SettingsListManager from "./SettingsListManager";

/*
  =========================================================
  MANAGEMENT SETTINGS FORM
  =========================================================

  This form manages all global listing settings.

  Examples:
  - Locations
  - Required Documents
  - Property Features
  - Property Types
  - Payment Plans

  These settings can later be reused when:
  - Creating listings
  - Filtering properties
  - Building dropdowns
  - Search functionality

  =========================================================
*/

export default function ManagementSettingsForm() {
  /*
    -------------------------------------------------------
    GLOBAL SETTINGS STATE
    -------------------------------------------------------
  */

  const [formValues, setFormValues] = useState({
    /*
      ---------------------------------------------------
      Available Listing Locations
      ---------------------------------------------------
    */

    locations: [
      "Ibeju-Lekki",
      "Epe",
      "Abuja",
      "Mowe-Ofada",
    ],

    /*
      ---------------------------------------------------
      Required Listing Documents
      ---------------------------------------------------
    */

    documents: [
      "Survey Plan",
      "Deed of Assignment",
      "Receipt",
    ],


  });

  /*
    -------------------------------------------------------
    SUBMISSION STATE
    -------------------------------------------------------
  */
  const [submitting, setSubmitting] = useState(false);

  /*
    -------------------------------------------------------
    SAVE SETTINGS
    -------------------------------------------------------

    Later:
    - Replace console.log with API request
    - Save to MongoDB
    - Persist globally

    -------------------------------------------------------
  */

  const handleSubmit = async () => {
    try {
      setSubmitting(true);

      /*
        =================================================
        API REQUEST HERE
        =================================================
      */

      console.log("Updated Management Settings:");
      console.log(formValues);

      /*
        Simulate API Request
      */

      setTimeout(() => {
        setSubmitting(false);
      }, 1500);

    } catch (error) {
      console.log(error);

      setSubmitting(false);
    }
  };

  return (
    <div className="admin-settings-form box">
      {/* ================================================= */}
      {/* PAGE HEADER */}
      {/* ================================================= */}

      <h3 className="text-left">
        Admin Management Settings
      </h3>

      <p className="text-muted">
        Manage global listing parameters and reusable
        listing data.
      </p>

      {/* ================================================= */}
      {/* LOCATIONS */}
      {/* ================================================= */}

      <SettingsListManager
        title="Add New Listing Location"
        placeholder="e.g. Sangotedo"
        items={formValues.locations}
        setItems={(updater) =>
          setFormValues((prev) => ({
            ...prev,

            locations:
              typeof updater === "function"
                ? updater(prev.locations)
                : updater,
          }))
        }
        icon={<MapPin size={18} />}
      />

      <br />

      {/* ================================================= */}
      {/* REQUIRED DOCUMENTS */}
      {/* ================================================= */}

      <SettingsListManager
        title="Add Required Document"
        placeholder="e.g. Survey Plan"
        items={formValues.documents}
        setItems={(updater) =>
          setFormValues((prev) => ({
            ...prev,

            documents:
              typeof updater === "function"
                ? updater(prev.documents)
                : updater,
          }))
        }
        icon={<FileText size={18} />}
      />

      <br />

      {/* ================================================= */}
      {/* SAVE BUTTON */}
      {/* ================================================= */}

      <button
        type="button"
        onClick={handleSubmit}
        disabled={submitting}
        className="btn text-inverse bg-success w-full"
        id="submit-btn"
      >
        {submitting
          ? "Synchronizing..."
          : "Apply Global Changes"}

        <Save size={18} />
      </button>
    </div>
  );
}