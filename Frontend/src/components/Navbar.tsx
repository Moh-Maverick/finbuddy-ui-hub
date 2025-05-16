
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Home, MessageSquare, Calculator, Table, PieChart, Calendar, BookOpen } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  
  const navItems = [
    { name: "Home", path: "/", icon: <Home className="mr-2 h-4 w-4" /> },
    { name: "Chatbot", path: "/chatbot", icon: <MessageSquare className="mr-2 h-4 w-4" /> },
    { name: "Loan Eligibility", path: "/loan-eligibility", icon: <Calculator className="mr-2 h-4 w-4" /> },
    { name: "Loan Comparison", path: "/loan-comparison", icon: <Table className="mr-2 h-4 w-4" /> },
    { name: "CIBIL Score", path: "/cibil-score", icon: <PieChart className="mr-2 h-4 w-4" /> },
    { name: "EMI Reminder", path: "/emi-reminder", icon: <Calendar className="mr-2 h-4 w-4" /> },
    { name: "Financial Quiz", path: "/financial-quiz", icon: <BookOpen className="mr-2 h-4 w-4" /> },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-finbuddy-600 font-bold text-xl">Fin<span className="text-finbuddy-400">Buddy</span></span>
            </Link>
          </div>
          
          {/* Desktop navigation */}
          <div className="hidden md:flex md:items-center md:space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium flex items-center ${
                  location.pathname === item.path
                    ? "bg-finbuddy-100 text-finbuddy-700"
                    : "text-gray-600 hover:bg-finbuddy-50 hover:text-finbuddy-600"
                }`}
              >
                {item.icon}
                {item.name}
              </Link>
            ))}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-finbuddy-500 hover:text-finbuddy-700 hover:bg-finbuddy-100 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="block h-6 w-6" /> : <Menu className="block h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      <div className={`md:hidden ${isOpen ? "block" : "hidden"}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`block px-3 py-2 rounded-md text-base font-medium flex items-center ${
                location.pathname === item.path
                  ? "bg-finbuddy-100 text-finbuddy-700"
                  : "text-gray-600 hover:bg-finbuddy-50 hover:text-finbuddy-600"
              }`}
              onClick={closeMenu}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
