import { useState } from "react";
import Modal from "react-modal";
import { motion, AnimatePresence } from "framer-motion";
import { container, item } from "./animation";
import { validateStep1, validateStep2 } from "./validate.js";
import { checkUserAvailability, completeProfile  } from "../../../services/endpoints.js";
import { toast } from "react-toastify";
import { ArrowRight, ArrowLeft, SendHorizontal } from "lucide-react";
import StepOne from "./StepOne";
import StepTwo from "./StepTwo";
import StepThree from "./StepThree";
import FormInput from "../../../Components/FormInput";
import DropDown from "../../../Components/DropDown";
import "./CompleteProfile.css";

export default function CompleteProfile() {
  const [isModal, setIsMOdal] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [checkingUsername, setCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formValues, setFormValues] = useState({
    fullName: "",
    username: "",
    phoneNumber: "",
    address: "",
    occupation: "",

    referralSource: "",
    marketingMode: [],
    visitedOffice: "",
  });

  const [errors, setErrors] = useState({});

  const handleNext = async () => {
    const currentErrors = validateCurrentStep();
    console.log("next clicked");
    setErrors(currentErrors);

    const hasErrors = Object.values(currentErrors).some((error) => error);

    if (hasErrors) return;

    // ✅ Step 0: username check
    if (currentStep === 0) {
      const isAvailable = await checkUserAvailability(formValues.username);

      if (!isAvailable) {
        setErrors((prev) => ({
          ...prev,
          username: "Username already taken",
        }));
        toast.error("Username already taken");
        return;
      }
    }

    setCurrentStep((prev) => prev + 1);
  };

  const validateCurrentStep = () => {
    let currentErrors = {};

    if (currentStep === 0) {
      currentErrors.fullName = validateStep1.validateFullName(
        formValues.fullName,
      );

      currentErrors.username = validateStep1.validateUserName(
        formValues.username,
      );

      currentErrors.address = validateStep1.validateAddressAndOccupation(
        formValues.address,
      );

      currentErrors.occupation = validateStep1.validateAddressAndOccupation(
        formValues.occupation,
      );
    }

    if (currentStep === 1) {
      currentErrors.referralSource = validateStep2.validateReferralSource(
        formValues.referralSource,
      );

      currentErrors.marketingMode = validateStep2.validateMarketingMode(
        formValues.marketingMode,
      );

      currentErrors.visitedOffice = validateStep2.validateVisitedOffice(
        formValues.visitedOffice,
      );
    }


    return currentErrors;
  };

  const handleSubmit = async () => {
    console.log("submit clicked");
  const currentErrors = validateCurrentStep();
  setErrors(currentErrors);

  const hasErrors = Object.values(currentErrors).some(
    (error) => error
  );
  console.log(hasErrors, currentErrors);
  if (hasErrors) return;

  try {
    setIsSubmitting(true);

    const res = await completeProfile(formValues);

    toast.success(res?.message || "Profile completed successfully");

    // IMPORTANT:
    // update user state so modal disappears
    // (this assumes /me returns updated hasCompletedProfile)
    window.location.reload();

  } catch (err) {
    console.error("complete profile error", err);
    toast.error(
      err?.response?.data?.message ||
        "Failed to complete profile"
    );
  } finally {
    setIsSubmitting(false);
  }
};

  const socials = [
    "faceBook",
    "Whats app",
    "Instagram",
    "TikTok",
    "A friend",
    "Dilux team",
    "website",
    "Advertisement",
  ];

  return (
    <>
      <Modal
        isOpen={isModal}
        onRequestClose={() => setIsMOdal(true)} // prevent closing the modal for not completed profile
        contentLabel="Upload listing form"
        className="modal "
        overlayClassName="overlay"
      >
        <form
          className=" flex  complete-profile-form bg-light flex-1 h-full w-full"
          action=""
        >
          <div className="flex input-wrapper flex-col   justify-between w-full">
            <div className="slider-wrapper">
              <motion.div
                className="multi-form-container flex w-full"
                animate={{
                  x: `-${currentStep * 100}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 20,
                }}
              >
                <StepOne
                  validateStep1={validateStep1}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  errors={errors}
                />

                <StepTwo
                  socials={socials}
                  formValues={formValues}
                  setFormValues={setFormValues}
                  errors={errors}
                />

                <StepThree
                  formValues={formValues}
                  setFormValues={setFormValues}
                  errors={errors}
                />
              </motion.div>
            </div>
            <br />
            <br />

            <div className="flex justify-between items-center">
              <AnimatePresence mode="wait">
                {/* BACK */}
                {currentStep > 0 && (
                  <motion.button
                    key="back"
                    type="button"
                    className="btn text-inverse bg-secondary"
                    onClick={() => setCurrentStep((prev) => prev - 1)}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    <ArrowLeft size={18} />
                    Back
                  </motion.button>
                )}

                {/* NEXT */}
                {currentStep < 2 && (
                  <motion.button
                    key="next"
                    type="button"
                    className="btn text-inverse bg-primary"
                    onClick={handleNext}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    Next
                    <ArrowRight size={18} />
                  </motion.button>
                )}

                {/* SUBMIT */}
                {currentStep === 2 && (
                  <motion.button
                    key="submit"
                    id="submit-btn"
                    type="button"
                    className={`btn text-inverse bg-success ${isSubmitting ? 'submitting': ''}`}
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                  >
                    {isSubmitting ? "Submitting..." : "Submit"}
                    <SendHorizontal size={18} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </div>
        </form>
      </Modal>
    </>
  );
}
