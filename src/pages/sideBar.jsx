import { useState } from "react";
import { FaUser, FaBox, FaPlus } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { logout } from "../service/userService/authService";
import { FaUserGraduate } from "react-icons/fa";

import "./sidebar.css";

const Sidebar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addStudent, setAddStudent] = useState(false);
  const [isSettings, setIsSettings] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleCreateStudent = () => {
    setAddStudent(!addStudent);
  };

  const dropSettings = () => {
    setIsSettings(!isSettings);
  };

  const loggedOut = async () => {
    try {
      const response = await logout();
      console.log(response);
      if (response) {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    } catch (err) {
      console.log(err);
    }
    window.location.href = "/login";
  };

  return (
    <>
      <div
        className="flex max-md:hidden flex-col w-48 top-0 left-0 h-[calc(100vh+100px)] bg-gray-800"
        id="sidebar"
      >
        <div className="pt-12 pb-4 text-white flex justify-center text-sm items-center">
          <i className="fa-solid fa-user-graduate"></i> &nbsp; Student Management
        </div>
        <br />
        <Link
          to="/profile"
          className="hover:bg-slate-600 p-4 w-full flex items-center text-white mb-4"
        >
          <FaUser className="mr-2" />
          Profile
        </Link>
        <Link
          to="/students"
          className="hover:bg-slate-600 p-4 w-full flex items-center text-white mb-4"
        >
          <FaUserGraduate className="mr-2" />
          Students
        </Link>

        <div
          onClick={toggleDropdown}
          className="flex items-center cursor-pointer hover:bg-slate-600 p-4 justify-between w-full text-white"
        >
          <div className="flex items-center">
            <FaPlus className="mr-2" />
            Create
          </div>
          <IoIosArrowDown
            className={`${isDropdownOpen ? "transform rotate-180" : ""} ml-2`}
          />
        </div>

        {isDropdownOpen && (
          <div className="flex justify-center w-full hover:bg-gray-900 bg-gray-800">
            <Link
              onClick={toggleCreateStudent}
              to="/add-student"
              className="flex items-center px-4 py-2 text-white"
            >
              <i className="fas fa-user-plus mr-2"></i> Create Student
            </Link>
          </div>
        )}

        <div
          onClick={dropSettings}
          className="flex relative cursor-pointer mb-2 hover:bg-slate-600 justify-between p-4 items-center"
        >
          <div className="text-white">
            <i className="mr-2 fas fa-cog"></i> Settings
          </div>
          <IoIosArrowDown
            className={`${isSettings ? "transform rotate-180" : ""} text-white ml-2`}
          />
        </div>

        {isSettings && (
          <div className="w-full hover:bg-gray-900 py-2 cursor-pointer flex items-center justify-center">
            <h3
              className="hover:text-sky-700 font-sans text-white"
              onClick={loggedOut}
            >
              <i className="fa-solid fa-right-from-bracket"></i> Logout
            </h3>
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
