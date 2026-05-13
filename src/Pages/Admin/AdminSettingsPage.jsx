import { useState } from "react";
import { UserRoundCog, Users, FileCog } from "lucide-react";
import AdminProfileForm from "../../Components/Admin/AdminProfileForm";
import ManagementSettingsForm from "../../Components/Admin/ManagementSettingsForm";

import SettingsCard from "../../Components/Admin/SettingsCard";

import "./AdminSettingsPage.css";

const businessName = import.meta.env.VITE_BUSINESS_NAME;

export default function AdminSettingsPage() {
  const [profileFormInitialValues, setProfileFormInitialValues] = useState({
    name: "",
    email: "",
    number: "",
  });

  const [associateFormInitialValues, setAssociateFormInitialValues] = useState({
    ranks: [
      { rankName: "Associate", minSales: 0 },
      { rankName: "Partner", minSales: 10 },
      { rankName: "Senior Partner", minSales: 50 },
    ],
    isAutoApproved: false,
  });

  const [managementFormInitialValues, setManagementFormInitialValues] =
    useState({
      locations: ["Ibeju-Lekki", "Epe", "Abuja", "Mowe-Ofada"],
    });

  const [activeSetting, setActiveSetting] = useState("profile");



  return (
    <section>
      <div className="container">
        <h2>{businessName} Settings</h2>
        <div className="flex gap-2 justify-between items-start settings-card-form-container">
          <div className=" flex flex-col gap-2 box settings-card-container">
            <SettingsCard
              icon={<UserRoundCog size={20} />}
              name="Admin Profile Settings"
              borderColor="var(--color-primary)"
              toggleSettings={() => setActiveSetting("profile")}
            />
            <SettingsCard
              icon={<FileCog size={20} />}
              name="Admin Management Settings"
              borderColor="var(--color-success)"
              toggleSettings={() => setActiveSetting("management")}
            />
          </div>

          <div>
            {activeSetting === "profile"  && (
              <AdminProfileForm
                initialValues={profileFormInitialValues}
                setInitialValues={setProfileFormInitialValues}
              />
            )}

            {activeSetting === "management"  && (
              <ManagementSettingsForm
                initialValues={managementFormInitialValues}
                setInitialValues={setManagementFormInitialValues}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
