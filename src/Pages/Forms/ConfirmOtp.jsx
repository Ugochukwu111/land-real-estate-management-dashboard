import { useState, useEffect } from "react";
import { Link, useSearchParams, useNavigate } from "react-router-dom";
import { SendHorizontal, RefreshCcw } from "lucide-react";
import OtpInput from "./OtpInput.jsx";

import AuthLayout from "../../Components/AuthLayout.jsx";
import redLogo from "../../assets/logo.png";

import { confirmOTP, resendOTP } from "../../services/endpoints.js";

import { toast } from "react-toastify";

import "./Forms.css";

const businessName = import.meta.env.VITE_BUSINESS_NAME;

export default function ConfirmOtp() {
  const [formValues, setFormValues] = useState({ email: "" });
  const [errorMgs, setErrorMgs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResendingOtp, setIsResendingOtp] = useState(false);
  const [isOtpComplete, setIsOtpComplete] = useState(true);

  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const email = searchParams.get("email");
  const purpose = searchParams.get("purpose");

  const handleVerifyOtp = async () => {
    setIsSubmitting(true);
    try {
      const res = await confirmOTP(otp, email);
      toast.success(res?.message || "OTP confirmed successfully!");
      setTimeout(() => {
        if (purpose === "forgot-password") {
          navigate("/reset-password");
        } else {
          navigate("/associate");
        }
      }, 2000);
    } catch (error) {
      toast.error(
        error.response?.error ||
          "Failed to confirm OTP. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setIsResendingOtp(true);
    try {
      const res = await resendOTP(email);
      toast.success(res?.message || "OTP resent successfully!");
    } catch (error) {
      toast.error(
        error.response?.error || "Failed to resend OTP. Please try again.",
      );
    } finally {
      setIsResendingOtp(false);
    }
  };

  useEffect(() => {
    if (!email) {
      navigate("/sign-in");
    }
  }, [email, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (otp.length !== 4) {
      setIsOtpComplete(false);
      return;
    } else {
      setIsOtpComplete(true);
      handleVerifyOtp();
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
        <figure className="logo">
          <img src={redLogo} alt={`${businessName} logo`} />
        </figure>
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
        <button
          disabled={isSubmitting}
          className={`btn text-inverse  bg-primary ${isSubmitting ? "submitting" : ""}  `}
          id="submit-btn"
        >
          {isSubmitting ? "Verifying..." : "Verify OTP"}
          <SendHorizontal size={18} />
        </button>

        <button
          disabled={isResendingOtp}
          className={`btn text-inverse bg-secondary w-full ${isResendingOtp ? "submitting" : ""}  `}
          id="resend-btn"
          onClick={handleResendOtp}
        >
          {isResendingOtp ? "Resending..." : "Didn’t receive it? Resend"}
          <RefreshCcw size={18} />
        </button>
        <br />
        <br />
        <p className="text-muted text-center">Code expires in 15 minutes</p>
        <p className="text-center">
          <Link to="/sign-in" className="text-primary">
            ← Back to Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
