import { NavLink,Outlet  } from "react-router-dom";

import { 
  LayoutDashboard,
  Crown,
  ChevronDown,
  House,
  UserRoundCog,
  Brain,
  Cog,
  Bell,
  ArrowUpFromLine ,
  TrendingUp,
  UserRoundCheck
 } from "lucide-react"

 import dayjs from "dayjs";

 import { GetGreeting } from "../../utils/GetGreetings";
 
 import profileIcon from '../../assets/icons/profile.png';


import "./DashBoardLayout.css";


const businessName = import.meta.env.VITE_BUSINESS_NAME;

 const todaysDate = dayjs().format('MMMM D, YYYY');
 const greeting = GetGreeting()



export  function DashBoardLayout({children,  isAdmin = false}) {

  return (
    <div className="dashboard-layout-container">
      <div className="dashboard-layout-container-sidebar">
        <nav>
          <h1>
            <Crown />
             <span>{businessName}</span> 
            <span className="text-muted d-block" >{isAdmin?'Administrator': 'Associate'}</span>
          </h1>
          {/* admin Navigation */}
          { (isAdmin && <ul>
              <li>
              <NavLink 
                to="dashboard" 
               className='text-red fw500'
              >
                <LayoutDashboard />
                <span>
                  Overview
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink 
              to="associate"
               className='text-red fw500'
              >
                <UserRoundCog />
                <span>
                  Associates
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink 
               className='text-red fw500'
              to="intelligence">
                <Brain />
                <span>
                  Intelligence
                </span> 
              </NavLink>
            </li>
            <li>
              <NavLink 
               className='text-red fw500'
              to="settings">
                <Cog />
                 <span>
                   Settings
                  </span> 
              </NavLink>
            </li>
          </ul> ) }
          

          {/* associate navigation */}
          {(!isAdmin && <ul>
              <li>
              <NavLink 
              to="dashboard"
               className='text-red fw500'
              >
                <LayoutDashboard />
                <span>
                  Overview
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink 
              to="/admin/dashboard"
               className='text-red fw500'
              >
                <ArrowUpFromLine />
                <span>
                  Acquisition
                </span>
              </NavLink>
            </li>
            <li>
              <NavLink 
               className='text-red fw500'
              to="/admin/orders">
                <TrendingUp />
                <span>
                  Growth
                </span> 
              </NavLink>
            </li>
            <li>
              <NavLink 
               className='text-red fw500'
              to="/admin/users">
                <UserRoundCheck />
                 <span>
                   Recognition
                  </span> 
              </NavLink>
            </li>
          </ul>)}
          
        </nav>


        <div className="dashboard-layout-container-side-bar-adminstrator-container">
          <figure>
            <img src={profileIcon} alt="admin profile "/>
          </figure>
          <p>
            <span className="FWB">
               User
            </span>
       
            <span className="text-muted">
              {isAdmin?'Administrator': 'Associate'}
            </span>
          </p>
        </div>
      </div>

      <div className="dashboard-layout-container-header-main-container">
        <header className="header f-wrap items-center">
          <p>
            <span className="text-muted fs-smallest">
              {todaysDate}
            </span>
            <br />
            <span className="d-block fw500">
              {greeting}!
            </span>
          </p>


         <div className="flex items-center gap-2">
          <button className="btn" aria-label="notifications" title="notifications">
            <Bell />
          </button>

          <button className="btn header-profile-btn">
            <figure>
                <img src={profileIcon} alt="profile "/>
            </figure>
            <p className="flex  items-center remove-mobile">
              <span className="text-muted d-block">
                {isAdmin?'Administrator': 'Associate'}
              </span>
               <ChevronDown />
            </p>
          </button>
          </div>
        </header>

        <main className="bg-muted">
         <Outlet />
        </main>
      </div>
    </div>
  );
}
