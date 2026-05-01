import { useState } from "react";
import { X, FolderPen, MessageSquareMore } from "lucide-react";
import DropDown from "../DropDown";
import ListingDocuments from "../ListingDocuments";

import "./UploadEditForm.css";

/*
------------------------------------------------------------
UploadEditForm Component
------------------------------------------------------------

This component is a reusable form used for BOTH:
- Uploading a new listing
- Editing an existing listing

It receives:
- formValues → the current form state (controlled by parent)
- setFormValues → function to update parent state
- isUpload → determines if form is in "create" or "edit" mode

All inputs (text fields + dropdowns) are controlled via formValues,
making this a single source of truth for the entire form.
------------------------------------------------------------
*/

export default function UploadEditForm({
  isUpload = true,
  setFormValues,
  formValues,
  onClose,
}) {
  const [errorMgs, setErrorMgs] = useState({}); // stores validation errors per field
  const [submitting, setSubmitting] = useState(false); // prevents double submit

  const locationList = ["benin | ugbowo", "benin | uselu", "lagos | lekki"];
  const documentList = ["C of O", "surveyed", "deed"];

  const handleDocumentChange = (documents) => {
    setFormValues((prev) => ({
      ...prev,
      documents,
    }));
  };

   /*
  Handles text/number input changes
  Updates formValues in parent state
  */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

    /*
  Runs validation when user leaves an input field (onBlur)
  */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const message = validateField(name, value);

    setErrorMgs((prev) => ({
      ...prev,
      [name]: message,
    }));
  };


  /*
  Validates entire form before submission
  */
  const validate = (formValues) => {
    let errors = {};
    errors.name = validateInput(formValues.name);
    errors.description = validateInput(formValues.description);

    return errors;
  };


    /*
  Field-specific validation router
  */
  const validateField = (name, value) => {
    if (name === "name") return validateInput(value);
    if (name === "description") return validateInput(value);
    return "";
  };

  /** used to validate listing name input and description**/
  const validateInput = (value) => {
    if (value === "") {
      return "field can not be empty";
    }
    return "";
  };

    /*
  Handles form submission:
  - validates form
  - blocks submit if errors exist
  - sends API request (future)
  */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validate(formValues);
    setErrorMgs(errors);

    const hasErrors = Object.values(errors).some((msg) => msg !== "");
    if (hasErrors) return;
    console.log(formValues);

    try {
      setSubmitting(true);
      // const res = await  axios.post(`api`)
    } catch (err) {
      console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-relative upload-edit-form">
      <h3 className="text-center">{isUpload ? "Upload" : "Edit"} listing</h3>
      <p className="text-muted text-center">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Obcaecati
        ipsam,
      </p>
      <button
        className="btn close-btn-X text-muted"
        aria-label={`close ${isUpload ? "Upload" : "Edit"} form`}
        type="button"
        onClick={onClose}
      >
        <X size={16} />
      </button>
      <br />
      <figure>
        <img src="" alt="" />
      </figure>

      <div className="input-wrapper">
        {/* name form input */}
        <div className="flex flex-col input-container">
          <div className="flex justify-between items-center">
            <label htmlFor="name">Name</label>
            <span className="errorMsg text-fail">{errorMgs.name}</span>
          </div>
          <input
            type="text"
            placeholder=" eg: 100 by 100 , ugbowo "
            name="name"
            id="name"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <FolderPen size={16} />
        </div>
        {/* description form input*/}
        <div className="flex flex-col input-container">
          <div className="flex justify-between items-center">
            <label htmlFor="description">Description</label>
            <span className="errorMsg text-fail">{errorMgs.description}</span>
          </div>
          <input
            type="text"
            placeholder=" eg: 100 by 100 , along ugbowo road"
            name="description"
            id="description"
            onChange={handleChange}
            onBlur={handleBlur}
          />
          <MessageSquareMore size={16} />
        </div>
        <div className=" flex gap-1 justify-between items-center price-location-container">
          <div className="flex flex-col input-container flex-1">
            <div className="flex justify-between items-end">
              <span className="errorMsg text-fail">{errorMgs.description}</span>
            </div>
            <input
              type="number"
              step={1}
              placeholder="Enter Price"
              name="price"
              id="price"
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>

          <div className="flex-1">
            <DropDown
              selected={formValues.location || "select location"}
              setSelected={(val) =>
                setFormValues((prev) => ({
                  ...prev,
                  location: val,
                }))
              }
              list={locationList}
            />
          </div>
        </div>
        <br />
        <div>
          <p className="text-muted">selected Documents:</p>
          <div>
            <DropDown
              multiple
              selected={formValues.documents || []}
              setSelected={handleDocumentChange}
              list={documentList}
            />
          </div>

          {Array.isArray(formValues.documents) && formValues.documents.length > 0 && (
            <div className="selected-documents-preview">
              <ListingDocuments documents={formValues.documents} />
            </div>
          )}
        </div>
        <button
          className="btn text-inverse bg-primary w-full"
          disabled={submitting}
        >
          Confirm {isUpload ? "Upload" : "Edit"}
        </button>
      </div>
    </form>
  );
}
