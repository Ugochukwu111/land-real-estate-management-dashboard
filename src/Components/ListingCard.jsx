import { Link } from "react-router-dom";
import {
  ArrowUpFromLine,
  Trash2,
  Pencil,
  MapPin,
  ArrowRight,
  CheckCheck,
  ContactRound,
  Download,
  Copy,
} from "lucide-react";
import ListingDocuments from "./ListingDocuments";

import "./ListingCard.css";

/**
 * Reusable listing card component used across
 * admin and associate dashboard workflows.
 *
 * This component dynamically adapts its UI based on:
 * - listing workflow state
 * - user dashboard context
 * - role-based interaction requirements
 *
 * Features:
 * - Shared listing presentation layout
 * - Conditional admin management actions
 * - Associate utility actions (download/copy)
 * - Open-deal workflow actions
 * - Context-aware rendering using lightweight UI props
 * - Reusable document attachment section
 *
 * Props:
 * @param {boolean} isAdmin
 * Controls admin-specific management actions ui
 * such as editing and deleting listings.
 *
 * @param {boolean} isOpenDeal
 * Enables open-deal workflow actions such as
 * follow-up and deal closing interactions.
 *
 * Architectural Notes:
 * - UI behavior is prop-driven for flexibility
 * - Business/security authorization should still
 *   be enforced on the backend layer
 * - Designed for reuse across multiple dashboard roles
 *   without duplicating component logic
 */

export default function ListingCard({ 
  isOpenDeal = false, 
  isAdmin = false ,
  openModal 
}) {
  return (
    <div className=" flex gap-1 listing-card box">
      <figure className="listing-image skeleton">
        <img src="" alt="" />
        {!isAdmin && (
          <div className=" flex flex-col gap-2 btn-container">
            <button
              aria-label={`download listing picture `}
              className=" text-inverse "
            >
              <Download size={22} />
            </button>
            <button aria-label={`copy listing `} className="text-inverse ">
              <Copy size={22} />
            </button>
          </div>
        )}
      </figure>
      <div className="listing-details-container  flex  flex-col justify-between gap-2">
        <div>
          <p className=" fw700 text-red listing-name">100 by 100 Leki Estate</p>
          <p className="listing-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            cumque voluptate hic eveniet quidem quibusdam, dolorem quod, eaque
            non ad nesciunt!
          </p>

          {isOpenDeal && (
            <p className="flex items-center gap-1 fw700 text-muted">
              <ContactRound size={18} /> Mr Richard
            </p>
          )}

          <div className="flex items-center justify-between">
            <p className="text-secondary fw700">$20,000</p>
            <p className="text-muted fs-small text-end">
              <MapPin size={12} /> Benin City | Ugbowo
            </p>
          </div>
        </div>
        <ListingDocuments documents={["C of O", "surveyed"]} />
        <div className=" flex gap-1 btn-container">
          {!isOpenDeal && isAdmin && (
            <>
              <button className="btn flex-1 bg-success-light text-success">
                edit <Pencil size={15} />
              </button>
              <button className="btn flex-1 bg-danger text-inverse">
                Delete <Trash2 size={15} />
              </button>
            </>
          )}
          {isOpenDeal && (
            <>
              <Link className="btn flex-1 bg-success-light text-success">
                follow Up <ArrowRight size={17} />
              </Link>
              <button className="btn flex-1 bg-success text-success-light">
                Close Deal
                <CheckCheck size={17} />
              </button>
            </>
          )}

          {
            !isAdmin && !isOpenDeal &&
            <button onClick={() => openModal(true)} className="btn flex-1 bg-secondary text-inverse">
              Open Deal
            </button>
          }
        </div>
      </div>
    </div>
  );
}
