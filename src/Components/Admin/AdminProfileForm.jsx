import { useState } from "react";
import { User, Mail, Phone, Save } from "lucide-react";

export default function AdminProfileForm() {
  const [formValues, setFormValues] = useState({ name: "", email: "", number: "" });
  const [errorMgs, setErrorMgs] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Simple regex for Nigerian phone numbers or general format
  const phoneRegex = /^[0-9+]{11,14}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const validateName = (value) => {
    if (value.trim() === "") return "Name is required";
    if (value.length < 3) return "Name is too short";
    return "";
  };

  const validateEmail = (value) => {
    if (value === "") return "Email cannot be empty";
    if (!emailRegex.test(value)) return "Enter a valid email";
    return "";
  };

  const validateNumber = (value) => {
    if (value === "") return "Phone number is required";
    if (!phoneRegex.test(value)) return "Enter a valid phone number";
    return "";
  };

  const validateField = (name, value) => {
    if (name === "name") return validateName(value);
    if (name === "email") return validateEmail(value);
    if (name === "number") return validateNumber(value);
    return "";
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const message = validateField(name, value);
    setErrorMgs((prev) => ({ ...prev, [name]: message }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errors = {
      name: validateName(formValues.name),
      email: validateEmail(formValues.email),
      number: validateNumber(formValues.number),
    };

    setErrorMgs(errors);
    const hasErrors = Object.values(errors).some((msg) => msg !== "");
    if (hasErrors) return;

    setSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      console.log("Profile Updated:", formValues);
      setSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className=" box admin-settings-form">
      <h3 className="text-left">Admin Profile Settings</h3>
      <p className="text-muted">Update your personal information and contact details</p>
      
      <div className="input-wrapper">
        {/* Full Name Field */}
        <div className="flex flex-col input-container">
          <div className="flex justify-between items-center">
            <label htmlFor="name">Full Name</label>
            <span className="errorMsg text-fail">{errorMgs.name}</span>
          </div>
          <input
            type="text"
            placeholder="e.g. John Doe"
            name="name"
            id="name"
            value={formValues.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <User size={18} />
        </div>

        {/* Email Field */}
        <div className="flex flex-col input-container">
          <div className="flex justify-between items-center">
            <label htmlFor="email">Email Address</label>
            <span className="errorMsg text-fail">{errorMgs.email}</span>
          </div>
          <input
            type="email"
            placeholder="admin@dilux.com"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Mail size={18} />
        </div>

        {/* Phone Number Field */}
        <div className="flex flex-col input-container">
          <div className="flex justify-between items-center">
            <label htmlFor="number">Phone Number</label>
            <span className="errorMsg text-fail">{errorMgs.number}</span>
          </div>
          <input
            type="tel"
            placeholder="08012345678"
            name="number"
            id="number"
            value={formValues.number}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <Phone size={18} />
        </div>
      </div>

      <br />
      
      <button 
        disabled={submitting} 
        className="btn text-inverse bg-primary w-full" 
        id="submit-btn"
      >
        {submitting ? "Saving..." : "Update Profile"}
        <Save size={18} />
      </button>
    </form>
  );
}