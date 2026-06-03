import {
  User,
  Phone,
  UserRoundKey,
  MapPinHouse,
  UserCheck,
} from "lucide-react";
import FormInput from "../../../Components/FormInput";
import ProgressBar from "./ProgressBar";

const businessName = import.meta.env.VITE_BUSINESS_NAME;

export default function StepThree() {
  return (
    <div className="input-wrapper flex flex-col gap-1 w-full">
      <div>
        <div className="flex items-center justify-between">
          <h4 className="flex flex-col">Declaration & Agreement</h4>
          <ProgressBar active1={true} active2={true} active3={true} />
        </div>
        <p className="text-muted info">
          Please review your responsibilities as an associate and confirm your
          agreement before submitting your profile.
        </p>
      </div>

      <h6 className="text-success">Declaration</h6>
      <p>
        I understand that as a {businessName} Associate, my primary
        responsibility is to market {businessName} and introduce clients. I also
        understand that {businessName} will handle client reception, site
        inspection documentation and deal closure while i earn commission on
        successful transactions.
      </p>
      <br />
    </div>
  );
}
