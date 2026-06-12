import { useState } from "react";
import { X, FolderPen, MessageSquareMore, SendHorizontal } from "lucide-react";
import DropDown from "../DropDown";
import ListingDocuments from "../ListingDocuments";
import ImageDropZone from "../ImageDropZone";
import FormInput from "../FormInput.jsx";
import { uploadListing } from "../../services/listing/endpoints.js";
import useListingStore from "../../store/listing.js";

import "./UploadEditForm.css";
import { toast } from "react-toastify";

import { editListings } from "../../services/listing/endpoints.js";

/**
 * UploadEditForm
 * * A reusable modal form component handling both the creation of new
 * listings and the editing of existing ones.
 * * Architecture:
 * - Operates as a fully controlled component.
 * - Relies entirely on the parent's `formValues` state as its single source of truth.
 * - Manages its own localized state for validation errors and submission status.
 * - Packs text inputs and binary files (images/documents) into a FormData
 * payload for backend submission.
 */

export default function UploadEditForm({
  isUpload = false,
  setFormValues,
  formValues,
  onClose,
  activeListingId = '',
}) {

  const [errorMgs, setErrorMgs] = useState({}); // stores validation errors per field
  const [submitting, setSubmitting] = useState(false); // prevents double submit

  const locationList = ["benin | ugbowo", "benin | uselu", "lagos | lekki"];
  const documentList = ["C of O", "surveyed", "deed"];

  const addListing = useListingStore((state) => state.addListing);

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
    // ALWAYS use 'prev' when dealing with complex shared state
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (newFile) => {
    setFormValues((prev) => ({
      ...prev,
      image: newFile,
    }));
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
    errors.price = validateInput(formValues.price);
    errors.commissionPrice = validateInput(formValues.commissionPrice);

    return errors;
  };

  /*
  Field-specific validation router
  */
  const validateField = (name, value) => {
    if (name === "name") return validateInput(value);
    if (name === "description") return validateInput(value);
    if (name === "price") return validateInput(value);
    if (name === "commissionPrice") return validateInput(value);
    return "";
  };

  /** used to validate listing name input and description**/
  const validateInput = (value) => {
    if (!value || String(value).trim() === "") {
      return "Field cannot be empty";
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

    try {
      setSubmitting(true);

      const formData = new FormData();

      formData.append("name", formValues.name);
      formData.append("description", formValues.description);
      formData.append("price", formValues.price);
      formData.append("commissionPrice", formValues.commissionPrice);
      formData.append("location", formValues.location);
      formData.append("documents", formValues.documents);

      if (formValues.image) {
        formData.append("image", formValues.image);
      }

      const res = await uploadListing(formData);
      addListing(res?.listing);
      toast.success(res?.data?.message || "success");

      setFormValues({
        name: "",
        description: "",
        price: "",
        commissionPrice: "",
        location: "",
        image: null,
        documents: [],
      });

      if (onClose) {
        onClose();
      }
    } catch (err) {
      toast.error(err?.response?.data?.message || "upload failed");
      console.error(err.response);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = async (e) =>{
    e.preventDefault();
    setSubmitting(true)//reuse submitting state in this type of given context  , because its the same btn calling upload and edit
     try{
       const res = await editListings(activeListingId,  formValues);
       toast.success(res?.message || 'edit listing Success');
     }catch(err){
      toast.error('Edit listing error try again later');
      console.error('Edit listing error :', err);
     }finally{
      setSubmitting(false);
     }
  }

  return (
    <form onSubmit={isUpload ?handleSubmit: handleEdit} className="p-relative upload-edit-form">
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
      {isUpload && (
        <figure>
          <ImageDropZone
            selectedImage={formValues.image}
            onImageSelect={handleImageChange}
          />
        </figure>
      )}

      <div className="input-wrapper">
        <FormInput
          label="Name"
          name="name"
          id="name"
          placeholder="eg: 100 by 100, ugbowo"
          value={formValues.name}
          error={errorMgs.name}
          icon={<FolderPen size={16} />}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <FormInput
          label="Description"
          name="description"
          id="description"
          placeholder="eg: 100 by 100, along ugbowo road"
          value={formValues.description || ''}
          error={errorMgs.description}
          icon={<MessageSquareMore size={16} />}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <div className=" flex gap-1 justify-between items-center price-location-container">
          <FormInput
            label="Price"
            type="number"
            step={1}
            name="price"
            id="price"
            placeholder="Enter Price"
            value={formValues.price || ''}
            error={errorMgs.price}
            onChange={handleChange}
            onBlur={handleBlur}
            className="flex-1"
          />

          <FormInput
            label="Commission"
            type="number"
            step={1}
            name="commissionPrice"
            id="commissionPrice"
            placeholder="Enter Commission"
            value={formValues.commissionPrice || ''}
            error={errorMgs.commissionPrice}
            onChange={handleChange}
            onBlur={handleBlur}
            className="flex-1"
          />
        </div>

        <br />

        <div className="flex-1">
          <DropDown
            selected={formValues.location || ''}
            setSelected={(val) =>
              setFormValues((prev) => ({
                ...prev,
                location: val,
              }))
            }
            list={locationList}
          />
        </div>
        <div>
          <p className="text-muted">selected Documents:</p>
          <div>
            <DropDown
              multiple
              selected={formValues.documents || ''}
              setSelected={handleDocumentChange}
              list={documentList}
            />
          </div>

          {Array.isArray(formValues.documents) &&
            formValues.documents.length > 0 && (
              <div className="selected-documents-preview">
                <ListingDocuments documents={formValues.documents} />
              </div>
            )}
        </div>
        <div className="confirm-btn-container">
          <button
            id="submit-btn"
            className={`btn text-inverse bg-primary w-full ${submitting ? "submitting" : ""}`}
            disabled={submitting}
          >
            {isUpload ? "Confirm Upload" : "Confirm Edit"}
            <SendHorizontal size={20} />
          </button>
        </div>
      </div>
    </form>
  );
}
