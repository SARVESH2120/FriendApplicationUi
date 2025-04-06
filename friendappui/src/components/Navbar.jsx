import React from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
    } catch (err) {
      console.log("Error from logout" + err.message);
    }
  };

  return (
    <nav className="bg-gradient-to-r from-gray-900 to-black border-b border-white/10 px-6 py-4 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2 group">
          <svg
            width="32"
            height="32"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            className="fill-amber-500"
          >
            <path d="M12 2L4 12l8 10 8-10-8-10zm0 2.5L18.5 12 12 19.5 5.5 12 12 4.5z" />
            <path d="M12 7.5L9.5 12l2.5 4.5 2.5-4.5-2.5-4.5zm0 2.5L13.5 12 12 14.5 10.5 12 12 10z" />
          </svg>
          <span className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            EliteConnect
          </span>
        </Link>

        {/* User Section */}
        {user && (
          <div className="flex items-center space-x-6">
            <div className="hidden md:block">
              <p className="text-white/80 font-medium">
                Welcome,{" "}
                <span className="text-amber-400">{user.firstName}</span>
              </p>
            </div>

            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="group flex items-center space-x-2 cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full border-2 border-amber-500/30 overflow-hidden transition-all group-hover:border-amber-500">
                  <img
                    alt="User profile"
                    src={user.photoUrl}
                    className="w-full h-full object-cover"
                  />
                </div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/60 group-hover:text-amber-400 transition-colors"
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </div>

              <ul
                tabIndex={0}
                className="dropdown-content menu p-2 shadow-lg bg-gray-900 border border-white/10 rounded-box w-52 mt-4 z-50"
              >
                <li>
                  <Link
                    to="/profile"
                    className="text-white/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                  >
                    Profile
                    <span className="badge badge-sm bg-amber-500/20 text-amber-400 border-amber-500/30">
                      New
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="text-white/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                  >
                    Connections
                  </Link>
                </li>
                <li>
                  <Link
                    to="/chat"
                    className="text-white/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                  >
                    Chat
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className="text-white/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                  >
                    Connection Requests
                  </Link>
                </li>
                <li className="border-t border-white/10 mt-1 pt-1">
                  <Link
                    to="/login"
                    onClick={handleLogOut}
                    className="text-white/80 hover:text-amber-400 hover:bg-white/5 transition-colors"
                  >
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
