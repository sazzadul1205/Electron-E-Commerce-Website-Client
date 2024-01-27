import { NavLink, Outlet } from "react-router-dom";
import logo from "../assets/title.png";

const DashboardLayout = () => {
  // Public Links
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
        className={({ isActive }) =>
          `text-lg font-semibold text-black hover:bg-gray-200${
            isActive ? "" : ""
          }`
        }
      >
        {link.label}
      </NavLink>
    </li>
  ));

  // Admin Links
  const AdminNavLink = [
    { to: "allSubscribers", label: "All subscribers", color: "blue" },
    { to: "allTrainers", label: "All Trainers:", color: "green" },
    { to: "appliedTrainer", label: "Applied Trainer:", color: "orange" },
    { to: "balance", label: "Balance", color: "purple" },
    { to: "addNewForum", label: "Add new Forum", color: "teal" },
  ];

  const adminNav = AdminNavLink.map((link) => (
    <li key={link.to}>
      <NavLink
        to={link.to}
        exact
        className={({ isActive }) =>
          `text-lg font-semibold relative group ${
            isActive ? `text-${link.color}-500` : "text-black hover:text-white"
          }`
        }
      >
        {link.label}
        <span
          className={`absolute inset-y-0 left-0 w-0 bg-${link.color}-500 group-hover:w-full transition-all duration-300 -z-10`}
        ></span>
      </NavLink>
    </li>
  ));

  return (
    <div className="bg-gray-200">
      <div className="flex mx-[200px] ">
        {/* Dashboard side bar */}
        <div className="w-64 min-h-screen pt-10 fixed border border-black bg-white">
          <img src={logo} alt="" className="w-52 mx-auto" />
          <h1 className="text-center text-2xl font-bold  ">Electron</h1>
          <ul className="menu p-4">
            <ul className="menu menu-vertical px-1 text-blue-800 ">
              {adminNav}
            </ul>
            <div className="divider">OR</div>
            {/* shared nav link */}
            <ul className="menu menu-vertical px-1 text-blue-800 ">{nav}</ul>
          </ul>
        </div>
        {/* Dashboard Content */}
        <div className="flex-1 ml-64 overflow-y-auto  min-h-screen">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
