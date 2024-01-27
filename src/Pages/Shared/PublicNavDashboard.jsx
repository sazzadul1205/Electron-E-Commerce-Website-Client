import { NavLink } from "react-router-dom";

const PublicNavDashboard = () => {
  // Public Links
  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/Product", label: "Product" },
    { to: "/Category", label: "Category" },
    { to: "/Shopping", label: "Shopping" },
    { to: "/ContactUs", label: "Contact Us" },
    { to: "/AboutUs", label: "About Us" }, // Corrected to "/AboutUs"
    { to: "/FAQs", label: "FAQ" },
    { to: "/Blog", label: "Blog" },
  ];

  const nav = navLinks.map((link) => (
    <li key={link.to}>
      <NavLink
        to={link.to}
        exact
        className="text-lg font-semibold text-black hover:bg-gray-200 p-2 inline-block"
        activeClassName="bg-gray-200"
      >
        {link.label}
      </NavLink>
    </li>
  ));

  return <ul className="flex space-x-4 menu">{nav}</ul>;
};

export default PublicNavDashboard;
