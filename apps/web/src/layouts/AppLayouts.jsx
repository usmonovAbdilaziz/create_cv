import { NavLink } from "react-router-dom";
import CvLayouts from "../components/CvLayouts";

function AppLayouts() {
  return (
    <div style={{ backgroundColor: "white", margin: "20px", height: "100vh", fontFamily:"sans-serif"}}>
      <div style={{ padding: "20px 0" }}>
        <span className="block" style={{ color: "black" }}>
          <NavLink
            to="/profile"
            style={{
              border: "1px solid black",
              padding: "3px",
              borderRadius: "5px",
              marginLeft: "5px",
              textDecoration: "none",
              color: "black",
              fontSize: "14px",
            }}
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
          <NavLink
            to="/listOne"
            style={{
              border: "1px solid black",
              padding: "3px",
              borderRadius: "5px",
              marginLeft: "5px",
              textDecoration: "none",
              color: "black",
              fontSize: "14px",
            }}
            className={({ isActive }) =>
              `block  rounded-lg text-center no-underline ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`
            }
          >
            List One
          </NavLink>
          <NavLink
            to="/listTwo"
            style={{
              border: "1px solid black",
              padding: "3px",
              borderRadius: "5px",
              marginLeft: "5px",
              textDecoration: "none",
              color: "black",
              fontSize: "14px",
            }}
            className={({ isActive }) =>
              `block  rounded-lg text-center no-underline ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`
            }
          >
            List Two
          </NavLink>
          <NavLink
            to="/listThree"
            style={{
              border: "1px solid black",
              padding: "3px",
              borderRadius: "5px",
              marginLeft: "5px",
              textDecoration: "none",
              color: "black",
              fontSize: "14px",
            }}
            className={({ isActive }) =>
              `block  rounded-lg text-center no-underline ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`
            }
          >
            List Three
          </NavLink>
          <NavLink
            to="/listFour"
            style={{
              border: "1px solid black",
              padding: "3px",
              borderRadius: "5px",
              marginLeft: "5px",
              textDecoration: "none",
              color: "black",
              fontSize: "14px",
            }}
            className={({ isActive }) =>
              `block  rounded-lg text-center no-underline ${
                isActive
                  ? "bg-gray-900 text-white"
                  : "bg-black text-white hover:bg-gray-800"
              }`
            }
          >
            List Four
          </NavLink>
        </span>
      </div>
      <CvLayouts />
    </div>
  );
}

export default AppLayouts;
