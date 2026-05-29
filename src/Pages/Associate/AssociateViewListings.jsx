import Modal from "react-modal";


import ListingCard from "../../Components/ListingCard";

import "../Admin/AdminUploadListing.css";

const businessName = import.meta.env.VITE_BUSINESS_NAME;
import ClientDetailsForm from "./ClientDetailsForm";
import { useState } from "react";


export default function AssociateViewListings() {
  const [isModalOpen , setIsModalOpen] = useState(false);
  return (
    <section>

            <Modal
              isOpen={isModalOpen}
              onRequestClose={() => setIsModalOpen(false)}
              contentLabel="Example Modal"
              className="modal p-relative flex flex-col justify-between"
              overlayClassName="overlay"
            >
              <ClientDetailsForm/>

            </Modal>
      <br />
      <h2 className="text-center  w-full">{businessName} listings</h2>
      <br />
      <div className="card-container bg-muted ">
        <ListingCard openModal = {setIsModalOpen} />
      </div>
    </section>
  );
}
