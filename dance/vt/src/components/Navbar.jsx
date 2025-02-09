import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiBell, HiMenu, HiX } from "react-icons/hi";
import { Dropdown, Avatar } from "flowbite-react";
import { signoutSuccess } from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import apiClient from "../utils/clientApi";

const notifications = [
  {
    id: 1,
    message: "Ballet class starts at 6 PM.",
    timestamp: "2025-01-08T18:00:00",
  },
  {
    id: 2,
    message: "Don't miss today's Hip-Hop class.",
    timestamp: "2025-01-08T19:00:00",
  },
];

const Navbar = () => {
  const { currentUser } = useSelector((state) => state?.user);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();

  const handleSignout = async () => {
    setLogoutLoading(true);
    try {
      const res = await apiClient.get("/user/logout");
      if (res.status === 200) {
        dispatch(signoutSuccess());
        window.location.href = "/";
      } else {
        console.error(res.data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error.message || error);
    }
  };

  return (
    <nav className="bg-gray-900 bg-opacity-90 fixed text-white mb-fixed top-0 w-full z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex items-center">
            <img
              src="https://th.bing.com/th/id/OIP.8eWhC6pSzyfI9IRTmnYSdQHaJT?w=146&h=184&c=7&r=0&o=5&pid=1.7"
              alt="Logo"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-3 text-xl font-bold tracking-wide">
              Dance Academy
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="hover:text-yellow-400 transition duration-200"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-yellow-400 transition duration-200"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="hover:text-yellow-400 transition duration-200"
            >
              Contact
            </Link>
          </div>

          {/* Notification & User Section */}
          <div className="flex items-center space-x-6">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="relative"
              >
                <HiBell className="w-6 h-6 hover:text-yellow-400 transition duration-200" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-xs text-white rounded-full w-5 h-5 flex items-center justify-center">
                    {notifications.length}
                  </span>
                )}
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-3 w-64 bg-white text-black shadow-lg rounded-lg overflow-hidden">
                  <div className="p-3 text-sm">
                    {notifications.map((notif) => (
                      <div key={notif.id} className="mb-2 border-b pb-2">
                        <p>{notif.message}</p>
                        <span className="block text-xs text-gray-500">
                          {new Date(notif.timestamp).toLocaleString()}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Profile Dropdown */}
            {currentUser ? (
              <Dropdown
                arrowIcon={false}
                inline
                label={
                  <Avatar
                    alt="User settings"
                    img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                    rounded
                  />
                }
              >
                <Dropdown.Header>
                  <span className="block text-sm">{currentUser.name}</span>
                  <span className="block truncate text-sm font-medium">
                    {currentUser.email}
                  </span>
                </Dropdown.Header>
                <Dropdown.Item href="/">Dashboard</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleSignout}>
                  {logoutLoading ? "Logging out..." : "Logout"}
                </Dropdown.Item>
              </Dropdown>
            ) : (
              <Link
                to="/login"
                className="hover:text-yellow-400 transition duration-200"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white focus:outline-none"
            >
              {isMenuOpen ? (
                <HiX className="w-6 h-6" />
              ) : (
                <HiMenu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 bg-opacity-95 p-4">
          <Link
            to="/"
            className="block py-2 text-center hover:text-yellow-400 transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/about"
            className="block py-2 text-center hover:text-yellow-400 transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            to="/contact"
            className="block py-2 text-center hover:text-yellow-400 transition duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
