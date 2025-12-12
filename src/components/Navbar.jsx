import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "../App.css";
import "../assets/css/plugin.css";
import "../assets/css/style.css";
import { FaOpencart, FaRegHeart } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { RxCross2 } from "react-icons/rx";
import { RiMenu3Fill } from "react-icons/ri";
import Logo from "/images/logo.png";

const Navbar = () => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg py-3 px-2 px-sm-0">
      <div className="container p-0">
        {/* Logo */}
        <Link className="navbar-brand ms-0 ml-2 p-0 w-25" to="/">
          <img
            src={Logo}
            alt="logo"
            className="logo-img img-fluid  w-md-75"
          />
        </Link>

        <div className="d-flex align-items-center gap-4">
          {/* Mobile Icons */}
          <div className="menu-btn d-block d-lg-none">
            <ul className="user-btn mb-0 p-0">
              <li>
                <NavLink to="/">
                  <FaOpencart className="" color="#018bc8" size={25} />
                </NavLink>
                {/* <span>3</span> */}
              </li>
              <li>
                <NavLink to="/">
                  <FaRegHeart className="navbar-icons" color="#018bc8" size={20} />
                </NavLink>
                {/* <span>0</span> */}
              </li>
              <li>
                <NavLink to="/">
                  <LuUser className="navbar-icons user-icon" color="#018bc8" size={25} />
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Mobile Toggle Button */}
          <button
            onClick={() => setIsOpenSidebar(true)}
            type="button"
            className="bg-transparent border-0 d-block d-lg-none"
          >
            <RiMenu3Fill className="menu-icon" size={30} color="#018bc8" />
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="collapse navbar-collapse d-none d-lg-flex">
          <ul className="navbar-nav m-auto d-flex gap-4 gap-xl-5">
            <li><NavLink className="nav-link p-0" to="/">Home</NavLink></li>
            <li><NavLink className="nav-link p-0" to="/products">Products</NavLink></li>
            <li><NavLink className="nav-link p-0" to="javascript:void(0)">My Account</NavLink></li>
            <li><NavLink className="nav-link p-0" to="javascript:void(0)">Shopping Cart</NavLink></li>
            <li><NavLink className="nav-link p-0" to="/blogs">Blogs</NavLink></li>
            <li><NavLink className="nav-link p-0" to="/contact-us">Contact Us</NavLink></li>
          </ul>

          <div className="menu-btn">
            <ul className="user-btn mb-0 p-0">
              <li>
                <NavLink to="/">
                  <FaOpencart color="#018bc8" size={25} />
                </NavLink>
                {/* <span>3</span> */}
              </li>
              <li>
                <NavLink to="/">
                  <FaRegHeart color="#018bc8" size={20} />
                </NavLink>
                {/* <span>0</span> */}
              </li>
              <li>
                <NavLink to="/">
                  <LuUser color="#018bc8" size={25} />
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        {/* Mobile Sidebar Menu */}
        <div className={`mobile-sidebar ${isOpenSidebar ? "open" : ""}`}>
          <div className="sidebar-header">
            <RxCross2
              onClick={() => setIsOpenSidebar(false)}
              size={28}
              color="white"
              className="close-btn"
            />
          </div>
          <ul className="sidebar-menu list-unstyled mt-4">
            <li><NavLink onClick={() => setIsOpenSidebar(false)} to="/">Home</NavLink></li>
            <li><NavLink onClick={() => setIsOpenSidebar(false)} to="/products">Products</NavLink></li>
            <li><NavLink onClick={() => setIsOpenSidebar(false)} to="javascript:void(0)">My Account</NavLink></li>
            <li><NavLink onClick={() => setIsOpenSidebar(false)} to="javascript:void(0)">Shopping Cart</NavLink></li>
            <li><NavLink onClick={() => setIsOpenSidebar(false)} to="/blogs">Blogs</NavLink></li>
            <li><NavLink onClick={() => setIsOpenSidebar(false)} to="/contact-us">Contact Us</NavLink></li>
          </ul>
        </div>

        {/* Background Overlay */}
        {isOpenSidebar && <div className="overlay"></div>}
      </div>
    </nav>
  );
};

export default Navbar;
