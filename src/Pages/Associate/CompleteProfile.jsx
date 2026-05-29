import { useState } from "react";
import Modal from "react-modal";
import { User, Phone ,UserRoundKey, MapPinHouse ,UserCheck} from "lucide-react";
import FormInput from "../../Components/FormInput";
import DropDown from "../../Components/DropDown";
import './CompleteProfile.css'


import "./CompleteProfile.css";

export default function CompleteProfile() {
  const [isModal, setIsMOdal] = useState(true);
  const [selected , setSelected] = useState('');

  const socials = [
    'faceBook',
    'Whats app',
    'Instagram',
    'TikTok',
    'A friend',
    'Dilux team',
    'website',
    'Advertisement',
  ]

  return (
    <>
      <Modal
        isOpen={isModal}
        onRequestClose={() => setIsMOdal(false)}
        contentLabel="Upload listing form"
        className="modal"
        overlayClassName="overlay"
      >
         <form className=" flex  complete-profile-form bg-light h-full" action="">

   <div className="flex flex-col justify-between ">
        <div className="input-wrapper  flex flex-col gap-1">
                    <div>
        <h4 className="text-center flex flex-col"> <span className="text-center text-success step">Step 1</span> <span> <UserCheck /> Complete Profile </span></h4>
        <p className="text-muted text-center">Complete your basic profile information to help us personalize and secure your account experience.</p>
        </div>
          <FormInput
            label="Full Name"
            type="text"
            name="full-name"
            id="clientName"
            placeholder="Enter Full Name Eg: Daniel Kelechi"
            autoComplete="name"
            value={''}
            error={''}
            onChange={()=>{}}
            onBlur={()=>{}}
            icon={<User size={18} />}
          />
          <div className="flex gap-2 ">
          <FormInput
            className = 'flex-1'
            label="User Name"
            type="text"
            name="user-name"
            id="user-name"
            placeholder="IgweRealEstate"
            autoComplete=""
            value={''}
            error={''}
            onChange={()=>{}}
            onBlur={()=>{}}
            icon={<UserRoundKey size={18} />}
          />
         <FormInput
         className = 'flex-1'
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="234 801 234 5678"
          autoComplete="tel"
          value={''}
          error={''}
          onChange={()=>{}}
          onBlur={()=>{}}
          icon={<Phone size={18} />}
        />
          </div>

          <FormInput
            label=" Residential  Address"
            type="text"
            name="address"
            id="address"
            placeholder="Enter Residential  Address  Eg: No 10 , ekosodin ugbowo road"
            autoComplete="name"
            value={''}
            error={''}
            onChange={()=>{}}
            onBlur={()=>{}}
            icon={<MapPinHouse size={18}/>}
          />
            <FormInput
            label="Occupation/School"
            type="text"
            name="address"
            id="address"
            placeholder="Enter School name or Occupation"
            autoComplete="name"
            value={''}
            error={''}
            onChange={()=>{}}
            onBlur={()=>{}}
            icon={<MapPinHouse size={18}/>}
          />
        </div>
                   <div className="flex justify-between items-center">
            <button className="btn text-inverse">Back</button>
            <button className="btn text-inverse bg-primary">Next</button>
           </div>
        </div>
        {/* <div>
         <label htmlFor="">Where did you hear about us?</label>
          <DropDown setSelected={setSelected} selected={selected} list={socials}/>
        </div> */}

           {/* <div className="flex flex-col justify-between gap-1 border">
        <div className="input-wrapper  flex flex-col gap-1">
                    <div>
        <h4 className="text-center flex flex-col"> <span className="text-center text-success step">Step 1</span> <span> <UserCheck /> Complete Profile </span></h4>
        <p className="text-muted text-center">Complete your basic profile information to help us personalize and secure your account experience.</p>
        </div>
          <FormInput
            label="Full Name"
            type="text"
            name="full-name"
            id="clientName"
            placeholder="Enter Full Name Eg: Daniel Kelechi"
            autoComplete="name"
            value={''}
            error={''}
            onChange={()=>{}}
            onBlur={()=>{}}
            icon={<User size={18} />}
          />
          <div className="flex gap-2 ">
          <FormInput
            className = 'flex-1'
            label="User Name"
            type="text"
            name="user-name"
            id="user-name"
            placeholder="IgweRealEstate"
            autoComplete=""
            value={''}
            error={''}
            onChange={()=>{}}
            onBlur={()=>{}}
            icon={<UserRoundKey size={18} />}
          />
         <FormInput
         className = 'flex-1'
          label="Phone Number"
          type="tel"
          name="phoneNumber"
          id="phoneNumber"
          placeholder="234 801 234 5678"
          autoComplete="tel"
          value={''}
          error={''}
          onChange={()=>{}}
          onBlur={()=>{}}
          icon={<Phone size={18} />}
        />
          </div>

          <FormInput
            label=" Residential  Address"
            type="text"
            name="address"
            id="address"
            placeholder="Enter Residential  Address  Eg: No 10 , ekosodin ugbowo road"
            autoComplete="name"
            value={''}
            error={''}
            onChange={()=>{}}
            onBlur={()=>{}}
            icon={<MapPinHouse size={18}/>}
          />
            <FormInput
            label="Occupation/School"
            type="text"
            name="address"
            id="address"
            placeholder="Enter School name or Occupation"
            autoComplete="name"
            value={''}
            error={''}
            onChange={()=>{}}
            onBlur={()=>{}}
            icon={<MapPinHouse size={18}/>}
          />
        </div>
                   <div className="flex justify-between items-center">
            <button className="btn text-inverse">Back</button>
            <button className="btn text-inverse bg-primary">Next</button>
           </div>
        </div> */}

        

        </form>
      </Modal>
    </>
  );
}
