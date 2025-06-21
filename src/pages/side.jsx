import { useState } from "react";
import { FaUser, FaBox, FaPlus } from "react-icons/fa";
import { HiOutlineViewGridAdd } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import { logout } from "../service/userService/authService";
import "./sidebar.css";

const Side = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [addProduct, setAddProduct] = useState(false);
  const [toogleAddCategory, setToogleAddCategory] = useState(false);
  const [isSettings, setIsSettings] = useState(true);
  const [toogleSideBar, setToogleSideBar] = useState(true);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const toggleAddProduct = () => {
    setAddProduct(!addProduct);
  };

  const loggedOut = async () => {
    try {
      const response = await logout();
      console.log(response);
      if (response) {
        window.location.href = "/login";
        localStorage.removeItem("user");
      }
    } catch (err) {
      console.log(err);
    }
    window.location.href = "/login";
  };

  const dropSettings = () => {
    setIsSettings(!isSettings);
  };

  const toogleCategory = () => {
    setToogleAddCategory(!toogleAddCategory);
  };

  const handleSidebarToggle = () => {
    setToogleSideBar(!toogleSideBar);
  };

  return (
    <div>
      {!toogleSideBar ? (
        <div className="flex z-10 flex-col w-48  max-md:block max-2xl:hidden py-0 bg-gray-800" id="sidebar">
         
            <div onClick={handleSidebarToggle} className=" left-[80%] top-[1%] absolute">
              <i className="fa-solid fa-times cursor-pointer  text-white "></i>
            </div>
          <div className="pt-12 pb-4 text-white flex justify-center text-sm items-center">
            <i className="fa-solid fa-bounce fa-warehouse"></i> &nbsp; Inventory
            Management
          </div>
          <br />
          <Link onClick={handleSidebarToggle}
            to="/dashboard"
            className="hover:bg-slate-600 p-4 w-full flex items-center text-white mb-4"
          >
            <i
              className="fa-solid fa-gauge-high mr-2"
              style={{ color: "#ffffff" }}
            ></i>
            Dashboard
          </Link>
          <Link onClick={handleSidebarToggle}
            to="/profile"
            className="hover:bg-slate-600 p-4 w-full flex items-center text-white mb-4"
          >
            <FaUser className="mr-2" />
            Profile
          </Link>
          <Link onClick={handleSidebarToggle}
            to="/products"
            className="hover:bg-slate-600 p-4 w-full flex items-center text-white mb-4"
          >
            <FaBox className="mr-2" />
            Products
          </Link>
          <div
            onClick={toggleDropdown}
            className="flex items-center cursor-pointer hover:bg-slate-600 p-4 justify-between w-full text-white"
          >
            <div className="flex items-center" >
              <FaPlus className="mr-2" />
              Add
            </div>
            <IoIosArrowDown
              className={`${isDropdownOpen ? "transform rotate-180" : ""} ml-2`}
            />
          </div>
          {isDropdownOpen && (
            <>
              <div onClick={handleSidebarToggle} className="flex justify-center w-full hover-bg-gray-900 bg-gray-800">
                <Link
                  onClick={toggleAddProduct}
                  to="/add-product"
                  className="flex items-center px-4 py-2 text-white"
                >
                  <HiOutlineViewGridAdd className="mr-2" />
                  Add Product
                </Link>
              </div>
              <div onClick={handleSidebarToggle} className="flex justify-center hover-bg-gray-900 w-full bg-gray-800">
                <Link
                  onClick={toogleCategory}
                  to="/add-category"
                  className="flex items-center px-4 py-2 text-white"
                >
                  <HiOutlineViewGridAdd className="mr-2" />
                  Add Category
                </Link>
              </div>
            </>
          )}
          <div
            onClick={dropSettings}
            className="flex relative cursor-pointer mb-2 hover-bg-slate-600 justify-between p-4 items-center"
          >
            <div className="text-white">
              <i className="mr-2 fas fa-cog"></i> Settings
            </div>
            <IoIosArrowDown
              className={`${
                isSettings ? "transform rotate-180" : ""
              } text-white ml-2`}
            />
          </div>
          {isSettings && (
            <div className="w-full hover-bg-gray-900 py-2 cursor-pointer flex items-center justify-center">
              <h3
                className="hover-text-sky-700 font-sans text-white"
                onClick={loggedOut}
              >
                <i className="fa-solid fa-right-from-bracket"></i> {""} Logout
              </h3>
            </div>
          )}
        </div>
      ) : (
        <div onClick={handleSidebarToggle} className="flex z-10 flex-col w-48" id="sidebar">
         
         
            <div onClick={handleSidebarToggle} className=" hidden max-md:block">
              <i className="fa-solid fa-bars cursor-pointer left-[-8%] absolute text-black p-8"></i>
            </div>
        </div>
      )}
    </div>
  );
};

export default Side;
