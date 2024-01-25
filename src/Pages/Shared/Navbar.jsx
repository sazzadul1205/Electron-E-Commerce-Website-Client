import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from '../../assets/title.png';

const Navbar = () => {
    const [isTransparent, setIsTransparent] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY;

            // You can adjust the threshold value based on your banner height
            const threshold = 200;

            setIsTransparent(scrollPosition <= threshold);
        };

        // Attach the scroll event listener
        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const navLinks = [
        { to: '/', label: 'Home' },
        { to: '/Product', label: 'Product' },
        { to: '/Category', label: 'Category' },
        { to: '/Shopping', label: 'Shopping' },
        { to: '/ContactUs', label: 'Contact Us' },
        { to: '/About Us', label: 'About Us' },
        { to: '/FAQs', label: 'FAQ' },
        { to: '/Blog', label: 'Blog' },
    ];

    const nav = navLinks.map((link) => (
        <li key={link.to}>
            <NavLink
                to={link.to}
                exact
                className={({ isActive }) => `
                    text-md font-medium p-2 transition-colors duration-300
                    ${isActive ? 'text-blue-500' : 'hover:text-blue-500 text-black'}
                `}
            >
                {link.label}
            </NavLink>
        </li>
    ));

    return (
        <div
            className={`navbar fixed z-50 lg:px-[200px] mx-auto py-5 transition-all duration-300 ${isTransparent ? 'bg-transparent' : 'bg-white shadow'
                }`}
        >
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-white rounded-box w-52">
                        {nav}
                    </ul>
                </div>
                <Link to={'/'}>
                    <a className="text-xl hidden md:flex gap-1 ">
                        <img src={logo} alt="" className="w-60" />
                    </a>
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="flex gap-8 px-1">
                    {nav}
                </ul>
            </div>
            <div className="navbar-end flex ">
                <Link to={'/login'}>
                    <button className="text-blue-500 hover:bg-blue-300 p-3 w-28 text-sm rounded-l-xl hover:text-white">Login</button>
                </Link>
                <Link to={'/Register'}>
                    <button className="w-28 bg-blue-500 hover:bg-blue-400 text-sm text-white p-3 rounded-r-xl">Sign UP</button>
                </Link>
            </div>
        </div>
    );
};

export default Navbar;
