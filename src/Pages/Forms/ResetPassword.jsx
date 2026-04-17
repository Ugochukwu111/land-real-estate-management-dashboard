import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, SendHorizontal } from "lucide-react";

import AuthLayout from "../../Components/AuthLayout.jsx";
import "./Forms.css";

const businessName = import.meta.env.VITE_BUSINESS_NAME;

export default function ResetPassword() {
  const [formValues, setFormValues] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errorMgs, setErrorMgs] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validatePassword = (value) => {
    if (value === "") {
      return "field can not be empty";
    }
    if (value.length <= 6) {
      return "too short";
    }
    if (!/[a-z]/i.test(value)) {
      return "password must contain at least an alphabet";
    }
    return "";
  };

  const validate = (values) => {
    let errors = {};

    const passwordError = validatePassword(values.password);

    if (passwordError) {
      errors.password = passwordError;
    }

    if (values.confirmPassword === "") {
      errors.confirmPassword = "confirm your password";
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = "passwords do not match";
    }

    return errors;
  };

  const validateField = (name, value) => {
    if (name === "password") return validatePassword(value);

    if (name === "confirmPassword") {
      if (value === "") return "confirm your password";
      if (value !== formValues.password) return "passwords do not match";
    }

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

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(formValues);
    setErrorMgs(errors);

    const hasErrors = Object.values(errors).some((msg) => msg !== "");
    if (hasErrors) return;

    setSubmitting(true);

    try {
      console.log("New Password:", formValues.password);
      // await axios.post('/reset-password', { password: formValues.password, token })
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heading="Reset Your Password"
      tagline={`Create a new password to regain access to your ${businessName}  account.`}
    >
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">Set New Password</h3>
        <p className="text-center text-muted">
          Choose a strong password to secure your account.
        </p>

        <div className="input-wrapper">
          {/* PASSWORD */}
          <div className="flex flex-col input-container">
            <div className="flex justify-between items-center">
              <label htmlFor="password">New Password</label>
              <span className="errorMsg text-fail">
                {errorMgs.password}
              </span>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter new password"
              autoComplete="new-password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Lock size={18} />
          </div>

          {/* CONFIRM PASSWORD */}
          <div className="flex flex-col input-container">
            <div className="flex justify-between items-center">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <span className="errorMsg text-fail">
                {errorMgs.confirmPassword}
              </span>
            </div>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Confirm new password"
              autoComplete="new-password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Lock size={18} />
          </div>
        </div>

        <br />

        <button className="btn text-inverse bg-primary" id="submit-btn">
          Reset Password
          <SendHorizontal size={18} />
        </button>

        <p className="text-center">
          Remember your password?{" "}
          <Link to="/sign-in" className="text-primary">
            Back to Associate Login
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}