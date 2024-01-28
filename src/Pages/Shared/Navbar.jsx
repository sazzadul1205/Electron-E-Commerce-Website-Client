import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/title.png";
import useAuth from "../../Hooks/useAuth";

const Navbar = () => {
  const [isTransparent, setIsTransparent] = useState(true);
  const { user, logOut } = useAuth();
  const [dropdownVisible, setDropdownVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const threshold = 200;
      setIsTransparent(scrollPosition <= threshold);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSignOut = () => {
    logOut()
      .then(() => {
        console.log("User signed out successfully.");
      })
      .catch((error) => {
        console.error("Error signing out:", error);
      });
  };

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/Product", label: "Product" },
    { to: "/Category", label: "Category" },
    { to: "/Shopping", label: "Shopping" },
    { to: "/ContactUs", label: "Contact Us" },
    { to: "/About Us", label: "About Us" },
    { to: "/FAQs", label: "FAQ" },
    { to: "/Blog", label: "Blog" },
  ];

  const nav = navLinks.map((link) => (
    <li key={link.to}>
      <NavLink
        to={link.to}
        exact
        className={({ isActive }) => `
          text-md font-medium p-2 transition-colors duration-300
          ${isActive ? "text-blue-500" : "hover:text-blue-500 text-black"}
        `}
      >
        {link.label}
      </NavLink>
    </li>
  ));

  const handleClick = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleOutsideClick = (event) => {
    if (event.target.closest(".avatar") === null) {
      setDropdownVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  return (
    <div
      className={`navbar fixed z-50 lg:px-[350px] mx-auto py-5 transition-all duration-300 ${
        isTransparent ? "bg-transparent" : "bg-white shadow"
      }`}
    >
      <div className="navbar-start">
        <div className="dropdown relative">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost lg:hidden"
            onClick={handleClick}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          {dropdownVisible && (
            <ul
              className="menu menu-sm dropdown-content mt-3 z-[9999] absolute top-full p-2 shadow bg-white rounded-box w-52"
              onClick={(e) => e.stopPropagation()} 
            >
              {nav}
            </ul>
          )}
        </div>
        <Link to={"/"}>
          <a className="text-xl hidden md:flex gap-1">
            <img src={logo} alt="" className="w-60" />
          </a>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="flex gap-5 px-1">{nav}</ul>
      </div>
      <div className="navbar-end flex">
        {user ? (
          <div className="bg-white opacity-90 p-1 flex items-center">
            <Link to={"/Dashboard"}>
              <button className="w-28 p-2 bg-blue-200 hover:bg-blue-400 text-black hover:text-black rounded-xl">
                Dashboard
              </button>
            </Link>
            <div className="avatar flex-col ml-5 relative">
              <div
                className="w-14 h-14 rounded-full ring ring-primary mx-auto"
                onClick={handleClick}
              >
                <img
                  src={user?.photoURL}
                  alt="User Avatar"
                  className="object-cover rounded-full border-none cursor-pointer"
                />
              </div>
              {dropdownVisible && (
                <div className="dropdown bg-white text-black w-[200px] h-28 p-2 -right-20 absolute top-full rounded-xl shadow-lg opacity-90">
                  <ul className="list-none">
                    <li className="text-center mt-2">{user?.displayName}</li>
                    <li>
                      <button
                        className="w-full p-2 mt-2 bg-blue-500 hover:bg-blue-200 text-white hover:text-black rounded-xl"
                        onClick={handleSignOut}
                      >
                        Log out
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        ) : (
          <>
            <Link to={"/login"}>
              <button className="text-blue-500 hover:bg-blue-300 p-3 w-28 bg-white text-sm rounded-l-xl hover:text-white">
                Login
              </button>
            </Link>
            <Link to={"/SignUp"}>
              <button className="w-28 bg-blue-500 hover:bg-blue-400 text-sm text-white p-3 rounded-r-xl">
                Sign UP
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
