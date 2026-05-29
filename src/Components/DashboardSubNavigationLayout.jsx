import { NavLink, Outlet } from "react-router-dom";
import "./DashboardSubNavigationLayout.css";


/**
 * Shared intelligence navigation layout used across
 * both Admin and Associate dashboard sections.
 *
 * This component dynamically renders role-based
 * navigation links while preserving a unified
 * dashboard experience and consistent UI structure.
 *
 * Responsibilities:
 * - Render contextual dashboard sub-navigation
 * - Support role-based route switching
 * - Provide nested route rendering via <Outlet />
 * - Reuse the same layout for multiple dashboard roles
 *
 * Recommended Rename:
 * DashboardSubNavigationLayout
 *
 * Why?
 * - More scalable than "AdminIntelligencePage"
 * - No longer admin-specific
 * - Clearly describes its responsibility
 * - Suitable for Admin, Associate, Manager, etc.
 */

export default function DashboardSubNavigationLayout({ isAdmin = false }) {
  

  return (
    <section className="h-full">
      <nav className="admin-intelligence-page-navigation box container">
        <ul className="flex gap-2 ">
          <li>
            <NavLink
              to={`${isAdmin ? "upload-listing" : "listings"} `}
              className="fw700 text-red"
            >
              {`${isAdmin ? "upload listing" : "listings"} `}
            </NavLink>
          </li>
          <li>
            <NavLink
              to={`${isAdmin ? "open-deals" : "open-deal"}  `}
              className="fw700 text-red"
            >
              {`${isAdmin ? "open deals" : "open deal"} `}
            </NavLink>
          </li>
        </ul>
      </nav>
      <div>
        <Outlet />
      </div>
    </section>
  );
}
