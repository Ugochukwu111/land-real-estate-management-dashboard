import OpenDealCard from "../../Components/OpenDealCard";


import "./AdminOpenDeals.css";

export default function AdminOpenDeals() {

  return (
    <div className= {` open-deals-card-container  `}>
      <div>
        <OpenDealCard/>
        <OpenDealCard/>
        <OpenDealCard/>
      </div>
    </div>
  );
}
