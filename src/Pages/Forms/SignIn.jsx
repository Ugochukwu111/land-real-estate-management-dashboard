import { useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Mail, SendHorizontal } from "lucide-react";

import AuthLayout from "../../Components/AuthLayout.jsx";

import "./Forms.css";

const businessName = import.meta.env.VITE_BUSINESS_NAME;

export default function SignIn() {
  const [formValues, setFormValues] = useState({ email: "", password: "" });
  const [errorMgs, setErrorMgs] = useState({});
  const [submitting, setSubmitting] = useState(false);

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

  const validate = (formValues) => {
    let errors = {};
    errors.email = validateEmail(formValues.email);
    errors.password = validatePassword(formValues.password);

    return errors;
  };

  const validateField = (name, value) => {
    if (name === "email") return validateEmail(value);
    if (name === "password") return validatePassword(value);
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
    let errors = validate(formValues);
    setErrorMgs(errors);

    const hasErrors = Object.values(errors).some((msg) => msg !== "");
    if (hasErrors) return;
    setSubmitting(true);

    try {
      const res = "";
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout
      heading="Welcome Back to"
      tagline={`Access your ${businessName} dashboard to manage your listings and track your growth.`}
    >
      <form onSubmit={handleSubmit}>
        <h3 className="text-center">Welcome Back</h3>
        <p className="text-center text-muted">
          Enter your credentials to access your associate account
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
          <div className="flex flex-col input-container">
            <div className="flex justify-between items-center">
              <label htmlFor="password">Password</label>
              <span className="errorMsg text-fail">{errorMgs.password}</span>
            </div>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a strong Password"
              autoComplete="new-password"
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <Lock size={18} />
          </div>
        </div>
        <br />
        <button className="btn text-inverse bg-primary" id="submit-btn">
          Access Dashboard
          <SendHorizontal size={18} />
        </button>
        <p className="text-center">
          Don't have an Associate account ?
          <Link to="/sign-in" className="text-primary">
            Sign Up
          </Link>
        </p>
        <p className="text-center">
          Forgot password  ?
          <Link to="/reset-password" className="text-primary">
            reset password
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
