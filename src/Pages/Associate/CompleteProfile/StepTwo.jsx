import { motion } from "framer-motion";
import DropDown from "../../../Components/DropDown";
import { container, item } from "./animation";
import ProgressBar from "./ProgressBar";

export default function StepTwo({
  socials,
  formValues,
  setFormValues,
  errors,
}) {
  const handleReferralSource = (value) => {
    setFormValues((prev) => ({
      ...prev,
      referralSource: value,
    }));
  };

  const toggleCheckbox = (value) => {
    const updatedModes = formValues.marketingMode.includes(value)
      ? formValues.marketingMode.filter((item) => item !== value)
      : [...formValues.marketingMode, value];

    setFormValues((prev) => ({
      ...prev,
      marketingMode: updatedModes,
    }));
  };

  const handleVisitedOffice = (e) => {
    setFormValues((prev) => ({
      ...prev,
      visitedOffice: e.target.value,
    }));
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="input-wrapper flex flex-col gap-1 w-full"
    >
      <div>
        <div className="flex items-center justify-between">
          <h4 className="flex flex-col">Marketing Preferences</h4>

          <ProgressBar active1={true} active2={true} active3={false} />
        </div>

        <p className="text-muted info">
          Share how you heard about us, how you plan to market our properties,
          and whether you have visited our office.
        </p>
      </div>

      {/* REFERRAL SOURCE */}

      <motion.div variants={item} className=" flex flex-col">
        <small className="error text-end fw500  w-full text-fail">
          {errors.referralSource}
        </small>
        <DropDown
          list={socials}
          selected={formValues.referralSource}
          setSelected={handleReferralSource}
          placeholder="How did you hear about us?"
        />
      </motion.div>

      {/* MARKETING MODE */}

     <small className="text-fail text-end">{errors.marketingMode}</small>
      <motion.div
        variants={item}
        className="flex flex-col gap-2 how-to-market-container"
      >
        
        <label className="font-medium text-success fw700">
          How will you market our properties?
        </label>

        <label>
          <input
            type="checkbox"
            checked={formValues.marketingMode.includes("online")}
            onChange={() => toggleCheckbox("online")}
          />
          Online (Social Media, WhatsApp)
        </label>

        <label>
          <input
            type="checkbox"
            checked={formValues.marketingMode.includes("local")}
            onChange={() => toggleCheckbox("local")}
          />
          To people around me
        </label>

        <label>
          <input
            type="checkbox"
            checked={formValues.marketingMode.includes("both")}
            onChange={() => toggleCheckbox("both")}
          />
          Both
        </label>

        
      </motion.div>

      {/* VISIT CONFIRMATION */}

      <motion.div variants={item} className="flex flex-col gap-2">
        <label className="font-medium">
          Have you visited our branch office to complete registration?
        </label>

        <div className="flex flex-col gap-4">
          <small className="text-fail text-end">{errors.visitedOffice}</small>
          <div>
            <label>
              <input
                type="radio"
                name="visitedOffice"
                value="yes"
                checked={formValues.visitedOffice === "yes"}
                onChange={handleVisitedOffice}
              />
              Yes
            </label>

            <label>
              <input
                type="radio"
                name="visitedOffice"
                value="no"
                checked={formValues.visitedOffice === "no"}
                onChange={handleVisitedOffice}
              />
              No
            </label>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
