import { ArrowLeft } from "lucide-react";
import deleteIcon from "../assets/icons/delete-icon.png";
import deleteUserIcon from "../assets/icons/delete-user-icon.png";

import "./DeletePopUp.css";

/*
------------------------------------------------------------
DeletePopUp Component
------------------------------------------------------------

This component acts as a highly reusable confirmation modal 
for deleting entities across the platform.

It handles:
- Displaying specific entity details (_id, name) to ensure the admin verifies the action.
- Toggling UI context (text and custom icons) between "Listing" and "User" via the `isUser` flag.
- Preventing duplicate API requests via the `isDeleting` disabled state.

Props:
- onClose (func): Triggered to close the modal overlay.
- activeData (object): The specific item being targeted for deletion.
- isDeleting (bool): Loading state passed from the parent to disable the confirm button.
- handleDelete (func): The external function responsible for executing the API call.
- isUser (bool): Toggles the UI context (default: false for Listings).

Key idea:
This component is purely presentational and entity-agnostic. It handles 
the UI friction and confirmation steps, while delegating the actual state 
management and destructive API execution back to the parent component.
------------------------------------------------------------
*/

export default function DeletePopUp({
  onClose,
  activeData,
  isDeleting,
  handleDelete,
  isUser = false,
}) {
  return (
    <div className=" flex flex-col gap-2 justify-between  h-full items-center delete-container text-center">
      <figure>
        <img src={ isUser ?deleteUserIcon: deleteIcon } alt="delete icon" />
      </figure>
      <h5 className="">Delete {isUser ? "User" : "Listing"}</h5>
      <p className="w-full details">
        <span className="fw700 ">
          {isUser ? "User" : "Listing "} Id: &nbsp;{" "}
          <span className=" fw-400">{activeData?._id}</span>
        </span>
        <br />
        <span className="fw500">
          name: <span className=" fw-400">{activeData?.name}</span>
        </span>
      </p>
      <p className="text-muted">
        This {isUser ? "User" : "Listing "} will be permanently deleted and
        cannot be recovered
      </p>
      <div className="flex w-full gap-3">
        <button onClick={onClose} className="btn flex-1 text-fail cancel-btn">
          {" "}
          <ArrowLeft size={20} /> Cancel
        </button>
        <button
          disabled={isDeleting}
          onClick={handleDelete}
          className="btn bg-danger text-inverse flex-1"
        >
          {isDeleting ? "Deleting..." : "Confirm"}
        </button>
      </div>
    </div>
  );
}
