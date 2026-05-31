import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Lock, Mail, Phone, SendHorizontal } from "lucide-react";
import AuthLayout from "../../Components/AuthLayout.jsx";
import "./Forms.css";

import redLogo from '../../assets/logo.png';

const businessName = import.meta.env.VITE_BUSINESS_NAME;
const baseAPI = import.meta.env.VITE_API_ENDPOINT;


/*
  SignUp Form (Controlled React Form with Validation)
 
  This component implements a controlled form using React state for form values
  and a separate error state for validation messages.
 
  Key features:
  - Controlled inputs via `formValues` state
  - Field-level validation onBlur for real-time feedback per input
  - Full form validation on submit using a centralized `validate(formValues)` function
  - Reusable per-field validator functions (email, password, phone, terms)
  - Prevents submission if any validation errors exist
  - Submission state handled with `submitting` flag
 
  Validation strategy:
  - onBlur: validates individual field using `validateField`
  - onSubmit: validates entire form object before API request
 
  This structure ensures clean separation between UI state, validation logic,
 and submission logic, making the form scalable and easy to maintain.

 */
 

export default function SignUp() {
  const navigate = useNavigate();

  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
    phoneNumber: "234",
    termsAndCondition: false,
  });

  const [errorMgs, setErrorMgs] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


  /*
   ================
    SINGLE INPUT  VALIDATION FUNCTIONS STARTS HERE
      PS: more inputs in the future add them here 👇
   =================
   */

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

  const validatePhoneNumber = (value) => {
    if (value === "") {
      return "field can not be empty";
    }
    if (/[a-z]/i.test(value)) {
      return "invalid phone number";
    }
    if (!value.startsWith("234")) {
      return "Phone number must start with 234";
    }
    if (value.length !== 13) {
      return "not up to standard length";
    }
    return "";
  };

  const validateTerms = (value) => {
    if (!value) {
      return "you must accept terms and conditions to continue";
    }
    return "";
  };

  const validate = (formValues) => {
    let errors = {};

    errors.email = validateEmail(formValues.email);
    errors.password = validatePassword(formValues.password);
    errors.phoneNumber = validatePhoneNumber(formValues.phoneNumber);
    errors.termsAndCondition = validateTerms(formValues.termsAndCondition);

    return errors;
  };

    /*
   ================
    SINGLE INPUT  VALIDATION FUNCTIONS STARTS HERE
     PS: more inputs in the future add them here 👆
   =================
   */

  const handleInputChange = (e) => {
    const { name, type, value, checked } = e.target;

    const newValue = type === "checkbox" ? checked : value;

    setFormValues((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setErrorMgs(errors);

    const hasErrors = Object.values(errors).some((msg) => msg !== "");
    if (hasErrors) return;
    try {
      setIsSubmitting(true);
      const res = await  axios.post(`${baseAPI}/api/auth/register`, formValues);

      toast.success( res.message || "Registration successful");

      setTimeout(()=>{
        navigate(`/confirm-otp?email=${encodeURIComponent(res.email || formValues.email)}`);
      },2000)

    } catch (err) {
      toast.error(  err.response.data.error || "Error something went wrong");
      console.error(err.response.data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const validateField = (name, value) => {
    if (name === "email") return validateEmail(value);
    if (name === "password") return validatePassword(value);
    if (name === "phoneNumber") return validatePhoneNumber(value);
    if (name === "termsAndCondition") return validateTerms(value);
    return "";
  };

  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;

    const val = type === "checkbox" ? checked : value;

    const message = validateField(name, val);

    setErrorMgs((prev) => ({
      ...prev,
      [name]: message,
    }));
  };

  return (
    <AuthLayout
      heading="Build Wealth with"
      tagline="Empowering associates with premium land banking opportunities across Nigeria. "
    >
      <form onSubmit={handleSubmit}>
        <div className="flex items-center justify-center">
          <figure className="logo">
            <img src={redLogo} alt={`${businessName} logo`} />
          </figure>
        </div>
        <br />
        <h3 className="text-center">Become an Associate</h3>
        <p className="text-center text-muted">
          Secure your future. Start earning through strategic property
          partnerships.
        </p>
        <div className="input-wrapper">
          <div className="flex flex-col input-container">
            <div className="flex justify-between items-center">
              <label htmlFor="email">Email Address</label>
              <span className="errorMsg text-fail">{errorMgs.email}</span>
            </div>
            <input
              value={formValues.email}
              type="email"
              placeholder="johndoe@gmail.com"
              name="email"
              id="email"
              autoComplete="email"
              onChange={handleInputChange}
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
              value={formValues.password}
              type="password"
              id="password"
              name="password"
              placeholder="Create a strong Password"
              autoComplete="new-password"
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <Lock size={18} />
          </div>
          <div className="flex flex-col input-container">
            <div className="flex justify-between items-center">
              <label htmlFor="phoneNumber">Phone Number</label>
              <span className="errorMsg text-fail">{errorMgs.phoneNumber}</span>
            </div>
            <input
              value={formValues.phoneNumber}
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              placeholder="Enter Phone Number"
              autoComplete="tel"
              maxLength="13"
              onChange={handleInputChange}
              onBlur={handleBlur}
            />
            <Phone size={18} />
          </div>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="termsAndCondition"
            checked={formValues.termsAndCondition}
            onChange={handleInputChange}
            onBlur={handleBlur}
          />
          &nbsp; &nbsp;
          <p>
            I agree to the
            <span className="text-secondary fw700"> Terms of Service </span> and
            <span className=" text-secondary fw700"> Privacy Policy </span>
          </p>
        </div>
        <span className="errorMsg text-fail text-end">
          {errorMgs.termsAndCondition}
        </span>
        <br />
        <button 
         disabled = {isSubmitting}
         className={`btn text-inverse bg-primary ${isSubmitting ? 'submitting' : ''}  `} 
         id="submit-btn">
          {
            isSubmitting ? 'Registering...' : 'Register Now'
          }
          <SendHorizontal size={18} />
        </button>
        <p className="text-center">
          Already have an Associate account ?
          <Link to="/sign-in" className="text-primary">
            Sign in
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}
