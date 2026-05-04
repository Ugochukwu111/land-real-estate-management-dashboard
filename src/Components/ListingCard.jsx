import { Link } from "react-router-dom";
import { ArrowUpFromLine, Trash2, Pencil, MapPin,ArrowRight , CheckCheck} from "lucide-react";
import ListingDocuments from "./ListingDocuments";

import "./ListingCard.css";

export default function ListingCard({ isOpenDeal = false }) {
  return (
    <div className=" flex gap-1 listing-card box">
      <figure className="listing-image skeleton">
        <img src="" alt="" />
      </figure>
      <div className="listing-details-container  flex  flex-col justify-between gap-2">
        <div>
          <p className=" fw700 text-red listing-name">100 by 100 Leki Estate</p>
          <p className="listing-description">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur
            cumque voluptate hic eveniet quidem quibusdam, dolorem quod, eaque
            non ad nesciunt!
          </p>
          <div className="flex items-center justify-between">
            <p className="text-secondary fw700">$20,000</p>
            <p className="text-muted fs-small text-end">
              <MapPin size={12} /> Benin City | Ugbowo
            </p>
          </div>
        </div>
        <ListingDocuments documents={["C of O", "surveyed"]} />
        <div className=" flex gap-1 btn-container">
          {!isOpenDeal && (
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
        </div>
      </div>
    </div>
  );
}
