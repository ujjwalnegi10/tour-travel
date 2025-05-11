import { Link } from "react-router-dom";
import { Menu, X, Heart, ShoppingCart, User } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const mainLinks = [
    { to: "/", label: "Home" },
    { to: "/destination", label: "Destination" },
    { to: "/gallery", label: "Gallery" },
    { to: "/contact", label: "Contact Us" },
  ];

  return (
    <nav className="backdrop-blur-sm border-white/10 shadow-xl/20  bg-white/70 px-6 py-5 fixed left-0 right-0 top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold text-blue-600">
          <Link to="/">TravelSphere</Link>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center justify-end w-full ml-10">
          <div className="flex space-x-6 text-gray-700 text-lg">
            {mainLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="hover:text-blue-500 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-6 ml-10">
            <Link to="/wishlist" className="hover:text-red-500">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="hover:text-blue-500">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              {/* Replace this with user image after sign in */}
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2 px-2">
          {mainLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className="block px-4 py-2 rounded-md text-gray-700 hover:bg-blue-100"
            >
              {link.label}
            </Link>
          ))}
          <div className="flex items-center gap-4 px-4 pt-2 border-t mt-2">
            <Link to="/wishlist" className="hover:text-red-500">
              <Heart className="w-5 h-5" />
            </Link>
            <Link to="/cart" className="hover:text-blue-500">
              <ShoppingCart className="w-5 h-5" />
            </Link>
            <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center overflow-hidden">
              <User className="w-4 h-4 text-white" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
