import { useState } from "react";
import { User, Phone } from "lucide-react";

import FormInput from "../../Components/FormInput.jsx";

export default function ClientDetailsForm() {

  const [formValues, setFormValues] = useState({
    clientName: "",
    phoneNumber: "234",
  });

  const [errorMgs, setErrorMgs] = useState({
    clientName: "",
    phoneNumber: "",
  });

  /*
   =========================
    FIELD VALIDATION LOGIC
   =========================
  */

  const validateClientName = (value) => {
    if (value === "") {
      return "field can not be empty";
    }

    if (value.length < 3) {
      return "name too short";
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

  /*
   =========================
    FULL FORM VALIDATION
   =========================
  */

  const validate = (formValues) => {
    let errors = {};

    errors.clientName = validateClientName(
      formValues.clientName
    );

    errors.phoneNumber = validatePhoneNumber(
      formValues.phoneNumber
    );

    return errors;
  };

  /*
   =========================
    INPUT HANDLERS
   =========================
  */

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateField = (name, value) => {

    if (name === "clientName") {
      return validateClientName(value);
    }

    if (name === "phoneNumber") {
      return validatePhoneNumber(value);
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

  /*
   =========================
    SUBMIT HANDLER
   =========================
  */

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate(formValues);

    setErrorMgs(errors);

    const hasErrors = Object.values(errors).some(
      (msg) => msg !== ""
    );

    if (hasErrors) return;

    console.log(formValues);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col flex-1 justify-between ">
      <h3 className="text-center">Client Details</h3>
      <p className="text-center text-muted"> 
        Fill in the required information below to create an open deal
      </p>
 
      <div className="input-wrapper">
        <FormInput
          label="Client Name"
          type="text"
          name="clientName"
          id="clientName"
          placeholder="John Doe"
          autoComplete="name"
          value={formValues.clientName}
          error={errorMgs.clientName}
          onChange={handleInputChange}
          onBlur={handleBlur}
          icon={<User size={18} />}
        />

        <FormInput
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="234 801 234 5678"
          autoComplete="tel"
          value={formValues.phoneNumber}
          error={errorMgs.phoneNumber}
          onChange={handleInputChange}
          onBlur={handleBlur}
          icon={<Phone size={18} />}
        />

      </div>
      <br />

      <button className="btn bg-primary w-full text-inverse">
        Submit
      </button>

    </form>
  );
}