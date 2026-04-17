import { useState } from "react";
import { Link } from "react-router-dom";
import { SendHorizontal, RefreshCcw } from "lucide-react";
import OtpInput from "./OtpInput.jsx";

import AuthLayout from "../../Components/AuthLayout.jsx";

import "./Forms.css";

const businessName = import.meta.env.VITE_BUSINESS_NAME;

export default function ConfirmOtp() {
  const [formValues, setFormValues] = useState({ email: "" });
  const [errorMgs, setErrorMgs] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [isOtpComplete, setIsOtpComplete] = useState(true);

  const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    if (otp.length !== 4) {
      setIsOtpComplete(false);
      return;
    } else {
      setIsOtpComplete(true);
    }

    try {
      const res = "";
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeOtp = (newOtp) => {
    setOtp(newOtp);
  };

  return (
    <AuthLayout
      heading="Confirm Otp"
      tagline={`To protect your associate account, we need to verify this login attempt. Please enter the code sent to your email.`}
    >
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">Confirm Otp</h3>
        <p className="text-center text-muted">
          Enter the 4-digit code sent to your email address to confirm your
          associate account.
        </p>
        <br />
        <div className="input-wrapper">
          {
            <OtpInput
              length={4}
              onChangeOTP={handleChangeOtp}
              isOtpComplete={isOtpComplete}
            />
          }
        </div>
        <br />
        <button className="btn text-inverse bg-primary" id="submit-btn">
          Verify Code
          <SendHorizontal size={18} />
        </button>

        <button
          className="btn text-inverse bg-primary w-full bg-secondary "
          id="resend-btn"
        >
          Didn’t receive it? Resend
          <RefreshCcw size={18} />
        </button>
        <br />
        <br />
        <p className="text-muted text-center">Code expires in 10 minutes</p>
        <p className="text-center">
          <Link to="/sign-in" className="text-primary">
            ← Back to Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
