import { Link } from "react-router-dom";
import logo from '../assets/logo3.jpeg'

const Footer = () => {
  return (
    <div className="mx-4 sm:mx-[10%]">
    <footer className="mx-4 md:mx-10 mt-40">

      {/* Top Section */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 text-sm">

        {/* Logo + Description */}
        <div>
          <img
            src={logo}
            alt="logo"
            className="w-36 mb-5"
          />
          <p className="text-gray-600 leading-6 md:w-2/3">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4">COMPANY</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About us</Link></li>
            <li><Link to="/delivery">Delivery</Link></li>
            <li><Link to="/privacy">Privacy policy</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-4">GET IN TOUCH</h3>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li>+0-000-000-000</li>
            <li>Dr.Hub@gmail.com</li>
          </ul>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-10 border-t pt-5 text-center text-sm text-gray-500">
        <p>
          © {new Date().getFullYear()} Dr Hub - All Rights Reserved.
        </p>
      </div>
    </footer>
    </div>
  );
};

export default Footer;