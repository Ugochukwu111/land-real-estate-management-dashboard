import {
  User,
  UserRoundKey,
  MapPinHouse,
} from "lucide-react";
import FormInput from "../../../Components/FormInput";
import { motion } from "framer-motion";
import ProgressBar from "./ProgressBar";
import { container, item } from "./animation.js";
import { useState } from "react";

export default function StepOne({
  formValues,
  setFormValues,
  validateStep1,
  errors,
}) {
  const [errorMgs, setErrorMgs] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateField = (name, value) => {
    if (name === "fullName") {
      return validateStep1.validateFullName(value);
    }

    if (name === "username") {
      return validateStep1.validateUserName(value);
    }

    if (name === "address") {
      return validateStep1.validateAddressAndOccupation(value);
    }

    if (name === "occupation") {
      return validateStep1.validateAddressAndOccupation(value);
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

  return (
    <div className="flex flex-col gap-1">
      <div>
        <div className="flex items-center justify-between">
          <h4 className="flex flex-col">
            Personal Profile
          </h4>

          <ProgressBar
            active1={true}
            active2={false}
            active3={false}
          />
        </div>

        <p className="text-muted info">
          Provide your personal and contact details so
          we can properly identify and set up your
          account.
        </p>
      </div>

      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col gap-1"
      >
        <motion.div
          variants={item}
          className="flex gap-2"
        >
          <FormInput
            className="flex-1"
            label="Full Name"
            type="text"
            name="fullName"
            id="clientName"
            placeholder="Enter Full Name Eg: Daniel Kelechi"
            autoComplete="name"
            value={formValues.fullName}
            error={
              errorMgs.fullName || errors?.fullName
            }
            onChange={handleChange}
            onBlur={handleBlur}
            icon={<User size={18} />}
          />

          <FormInput
            label="User Name"
            type="text"
            name="username"
            id="username"
            placeholder="IgweRealEstate"
            value={formValues.username}
            error={
              errorMgs.username || errors?.username
            }
            onChange={handleChange}
            onBlur={handleBlur}
            icon={<UserRoundKey size={18} />}
          />
        </motion.div>

        <motion.div variants={item}>
          <FormInput
            label="Residential Address"
            type="text"
            name="address"
            id="address"
            placeholder="Enter Residential Address Eg: No 10, Ekosodin Ugbowo Road"
            autoComplete="street-address"
            value={formValues.address}
            error={
              errorMgs.address || errors?.address
            }
            onChange={handleChange}
            onBlur={handleBlur}
            icon={<MapPinHouse size={18} />}
          />

          <FormInput
            label="Occupation / School"
            type="text"
            name="occupation"
            id="occupation"
            placeholder="Enter School Name or Occupation"
            autoComplete="organization"
            value={formValues.occupation}
            error={
              errorMgs.occupation ||
              errors?.occupation
            }
            onChange={handleChange}
            onBlur={handleBlur}
            icon={<MapPinHouse size={18} />}
          />
        </motion.div>
      </motion.div>
    </div>
  );
}