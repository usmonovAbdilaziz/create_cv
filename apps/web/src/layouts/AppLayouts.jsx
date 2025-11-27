import { NavLink } from "react-router-dom";
import CvLayouts from "../components/CvLayouts";

function AppLayouts() {
  return (
    <div className="absolute top-0 left-0 w-full bg-white text-black p-3">
      <div className="absolute top-0 left-0 w-full bg-white text-black p-3 flex flex-col gap-2 z-50">
          <span  className="block" style={{margin:"10px 20px"}}>
            <NavLink
              to="/profile"
              style={{border:"none", textDecoration:"none"}}
              className={({ isActive }) =>
                `block  rounded-lg text-center no-underline ${
                  isActive
                    ? "bg-gray-900 text-white"
                    : "bg-black text-white hover:bg-gray-800"
                }`
              }
            >
              Profile
            </NavLink>
          </span>
      </div>
      <CvLayouts/>
    </div>
  );
}

export default AppLayouts;
