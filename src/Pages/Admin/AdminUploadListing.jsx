import { useState } from "react";
import Modal from "react-modal";
import { ArrowUpFromLine, Upload } from "lucide-react";

import ListingCard from "../../Components/ListingCard";
import UploadEditForm from "../../Components/Admin/UploadEditForm";


/*
------------------------------------------------------------
AdminUploadListing Component
------------------------------------------------------------

This component acts as the ADMIN listing dashboard.

It handles:
- Displaying all listings (ListingCard components)
- Opening a modal form to upload a new listing
- Editing existing listings (via shared UploadEditForm)

Key idea:
👉 formValues is the single source of truth for both
   upload and edit operations.

Modal is used to show the UploadEditForm as an overlay UI.
------------------------------------------------------------
*/



const businessName = import.meta.env.VITE_BUSINESS_NAME;

import "./AdminUploadListing.css";

export default function AdminUploadListing() {
    /*
  Global form state shared with UploadEditForm:
  - Used for both creating and editing listings
  - Ensures consistent data handling across the app
  */
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    price: 5000,
    location: '',
    documents: [],
  });
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <>
      <Modal
        isOpen={isFormOpen}
        onRequestClose={() => setIsFormOpen(false)}
        contentLabel="Upload listing form"
        className="modal"
        overlayClassName="overlay"
      >
        <UploadEditForm 
          formValues={formValues}
          setFormValues={setFormValues}
          onClose={() => setIsFormOpen(false)}
        />
      </Modal>

      <div className="container  flex-1">
        <div className="flex justify-between items-center">
          <h2>{businessName} listings</h2>
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn bg-secondary  text-inverse">
            Upload listings <ArrowUpFromLine size={15} />
          </button>
        </div>
        <br />
        <div className="card-container bg-muted ">
          <ListingCard />
          <ListingCard />
        </div>
      </div>
    </>
  );
}
