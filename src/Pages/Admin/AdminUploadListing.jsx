import { useState } from "react";
import Modal from "react-modal";
import { ArrowUpFromLine, Upload } from "lucide-react";
import ListingCard from "../../Components/ListingCard";
import UploadEditForm from "../../Components/Admin/UploadEditForm";
import useListingStore from "../../store/listing";
import DeletePopUp from "../../Components/DeletePopUp";
import {  deleteListings } from '../../services/listing/endpoints.js';
import { toast } from "react-toastify";


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
formValues is the single source of truth for both
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
    image: "",
    name: "",
    description: "",
    price: 5000,
    commissionPrice: 5000,
    location: "",
    documents: [],
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModal, setIsDeleteModal] = useState(false);
  const listings = useListingStore((state) => state.listing);

  const [isDeleting, setIsDeleting] = useState(false);
  const removeListing = useListingStore((state) => state.removeListing);

  const [activeListing, setActiveListing] = useState({});

  const handleCloseForm = () => {
  setIsFormOpen(false);
  setFormValues({
    image: "",
    name: "",
    description: "",
    price: 5000,
    commissionPrice: 5000,
    location: "",
    documents: [],
  });
};

  const handleDeleteListing = async () => {
    setIsDeleting(true);
    try {
      const res = await deleteListings(activeListing._id);
      removeListing(activeListing._id);//update state in zustand for fast ui update
      toast.success(res?.message || "success");
      setIsDeleteModal(false)  // close delete pop up after success
    } catch (err) {
      toast.error("Error Deleting listing");
      console.error(`error deleting listing: ${err.response}`);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Modal
        isOpen={isFormOpen}
        onRequestClose={handleCloseForm }
        contentLabel="Upload listing form"
        className="modal"
        overlayClassName="overlay"
      >
        <UploadEditForm
          formValues={formValues}
          setFormValues={setFormValues}
          onClose={handleCloseForm}
        />
      </Modal>

      <Modal
        isOpen={isDeleteModal}
        onRequestClose={() => setIsDeleteModal(false)}
        contentLabel="Delete Listing"
        className="modal delete-modal"
        overlayClassName="overlay"
      >
        <DeletePopUp 
         isDeleting={isDeleting}
         handleDelete = {handleDeleteListing}
         activeData={activeListing}
         onClose={() => setIsDeleteModal(false)}
          />
      </Modal>

      <div className="container  flex-1">
        <div className="flex justify-between items-center">
          <h2>{businessName} listings</h2>
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn bg-secondary  text-inverse"
          >
            Upload listings <ArrowUpFromLine size={15} />
          </button>
        </div>
        <br />
        <div className="card-container bg-muted ">
          {listings?.map((listing) => (
            <ListingCard
              key={listing?._id}
              listing={listing}
              isAdmin={true}
              setIsDeleteModal={setIsDeleteModal}
              setActiveListing={setActiveListing}
            />
          ))}
        </div>
      </div>
    </>
  );
}
