
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-finbuddy-100">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center md:justify-start">
          <span className="text-finbuddy-600 font-bold text-xl">Fin<span className="text-finbuddy-400">Buddy</span></span>
        </div>
        <div className="mt-4 md:mt-0">
          <p className="text-center text-sm text-gray-500">
            &copy; {new Date().getFullYear()} FinBuddy. All rights reserved.
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-6 justify-center md:justify-start">
          <Link to="/" className="text-gray-500 hover:text-finbuddy-500">
            Privacy Policy
          </Link>
          <Link to="/" className="text-gray-500 hover:text-finbuddy-500">
            Terms of Service
          </Link>
          <Link to="/" className="text-gray-500 hover:text-finbuddy-500">
            Contact Us
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
