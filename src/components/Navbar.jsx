import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Navbar = () => {
  // Hole user und logout-Funktion aus dem Context
  const { user, logout } = useContext(AuthContext);
  return (
    <header>
      <nav>
        <ul className="flex text-lg p-4 space-x-2">
          <li className="p-2">
            <NavLink
              to={"/"}
              // style={({ isActive }) => {
              //   return {
              //     color: isActive ? "red" : "",
              //   };
              // }}
            >
              Home
            </NavLink>
          </li>
          {/* Wenn der user eingeloggt ist, zeige die geschützten Seiten an */}
          {user ? (
            <li className="p-2">
              <NavLink to={"user/post-stuff"}>Post Stuff</NavLink>
            </li>
          ) : (
            // Wenn kein User eingeloggt ist, zeige login und signup Seiten an
            <>
              <li className="p-2">
                <NavLink to={"login"}>Login</NavLink>
              </li>
              <li className="p-2">
                <NavLink to={"signup"}>Sign Up</NavLink>
              </li>
            </>
          )}
        </ul>
        {/* Wenn ein user eingeloggt ist, zeige den Logout-Button an */}
        {user && (
          <button
            onClick={logout}
            className="bg-[#4848b6] p-2 my-4 rounded-lg font-bold hover:shadow-md hover:shadow-[#535bf2]"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
