import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, Mail, SendHorizontal } from "lucide-react";
import { toast } from "react-toastify";

import AuthLayout from "../../Components/AuthLayout.jsx";
import redLogo from "../../assets/logo.png";

import { forgotPassword } from "../../services/endpoints.js";

import "./Forms.css";

const businessName = import.meta.env.VITE_BUSINESS_NAME;

export default function ForgotPassword() {
  const [formValues, setFormValues] = useState({ email: "" });
  const [errorMgs, setErrorMgs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues({ ...formValues, [name]: value });
  };

  const validateEmail = (value) => {
    if (value === "") {
      return "field can not be empty";
    }
    if (!emailRegex.test(value)) {
      return "enter a valid email";
    }
    return "";
  };

  const validate = (formValues) => {
    let errors = {};
    errors.email = validateEmail(formValues.email);

    return errors;
  };

  const validateField = (name, value) => {
    if (name === "email") return validateEmail(value);
    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;

    const message = validateField(name, value);

    setErrorMgs((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = validate(formValues);
    setErrorMgs(errors);

    const hasErrors = Object.values(errors).some((msg) => msg !== "");
    if (hasErrors) return;
    setIsSubmitting(true);

    try {
      const res = await forgotPassword(formValues.email);
      toast.success(
        res?.message || "Password reset instructions sent to your email!",
      );
      setTimeout(() => {
        navigate(
          `/confirm-otp?email=${encodeURIComponent(res?.email || formValues.email)}&purpose=forgot-password`,
        );
      }, 2000);
    } catch (err) {
      toast.error(
        err.response?.error ||
          "Failed to send reset instructions. Please try again.",
      );
      console.error(err.response);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heading="Password Recovery"
      tagline={`Regain secure access to your ${businessName} admin account.`}
    >
      <form onSubmit={handleSubmit}>
        <figure className="logo">
          <img src={redLogo} alt={`${businessName} logo`} />
        </figure>
        <h3 className="text-center">Reset Your Password</h3>
        <p className="text-center text-muted">
          Enter your registered admin email and we’ll send you instructions to
          reset your password.
        </p>
        <div className="input-wrapper">
          <div className="flex flex-col input-container">
            <div className="flex justify-between items-center">
              <label htmlFor="email">Email Address</label>
              <span className="errorMsg text-fail">{errorMgs.email}</span>
            </div>
            <input
              type="email"
              placeholder="johndoe@gmail.com"
              name="email"
              id="email"
              autoComplete="email"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Mail size={18} />
          </div>
        </div>
        <br />
        <button
          disabled={isSubmitting}
          className={`btn text-inverse bg-primary ${isSubmitting ? "submitting" : ""}  `}
          id="submit-btn"
        >
          Send Reset Code
          <SendHorizontal size={18} />
        </button>
        <p className="text-center">
          Remember your password?
          <Link to="/sign-in" className="text-primary">
            Back to sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
