import OpenDealCard from "../../Components/OpenDealCard";



export default function AssociateOpenDeals() {

  return (
    <div className= {` open-deals-card-container  `}>
      <div>
      <h2>my deals</h2>
      <div>
        <OpenDealCard/>
        <OpenDealCard/>
        <OpenDealCard/>
      </div>
      </div>
      <br />
            <div>
      <h2>All Deals</h2>
      <div>
        <OpenDealCard/>
        <OpenDealCard/>
        <OpenDealCard/>
      </div>
      </div>
    </div>
  );
}
