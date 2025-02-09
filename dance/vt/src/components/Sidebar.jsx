import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Dropdown, Navbar, Sidebar } from "flowbite-react";
import {
  HiChartPie,
  HiInbox,
  HiShoppingBag,
  HiUser,
  HiBell,
  HiShieldCheck,
} from "react-icons/hi";

const SideBar = () => {
  return (
    <aside className="w-64 bg-black text-white z-10 fixed top-16 h-full">
      <Sidebar aria-label="Sidebar">
        <Sidebar.Items>
          <Sidebar.ItemGroup>
            <Sidebar.Item icon={HiChartPie} className="hover:bg-gray-800">
              <Link to="/" className="block w-full h-full">
                {" "}
                Dashboard
              </Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiInbox} className="hover:bg-gray-800">
              <Link to="/categories" className="block w-full h-full">
                {" "}
                categories
              </Link>
            </Sidebar.Item>
            <Sidebar.Item icon={HiUser} className="hover:bg-gray-800">
            <Link to="/instructors" className="block w-full h-full">
                {" "}
                Instructors
              </Link>
            </Sidebar.Item>

            <Sidebar.Item icon={HiShieldCheck} className="hover:bg-gray-800">
              <Link to="/skill" className="block w-full h-full">
                Skill
              </Link>
            </Sidebar.Item>
          </Sidebar.ItemGroup>
        </Sidebar.Items>
      </Sidebar>
    </aside>
  );
};

export default SideBar;
