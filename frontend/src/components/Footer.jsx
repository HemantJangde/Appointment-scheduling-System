import { Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative mt-16 border-t border-gray-200 bg-white text-gray-800 overflow-hidden">
      
      {/* Light Gradient Glow */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 via-purple-100 to-pink-100 opacity-40 blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        
        {/* Logo / About */}
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent">
            Dr Hub
          </h2>
          <p className="mt-4 text-gray-600 text-sm leading-relaxed">
            Simplifying appointment scheduling for doctors and patients.
            Book appointments, manage schedules, and stay organized — all in one place.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Quick Links</h3>
          <ul className="space-y-2 text-gray-600 text-sm">
            <li className="hover:text-blue-500 transition cursor-pointer">Home</li>
            <li className="hover:text-blue-500 transition cursor-pointer">Doctors</li>
            <li className="hover:text-blue-500 transition cursor-pointer">Appointments</li>
            <li className="hover:text-blue-500 transition cursor-pointer">Contact</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-lg font-semibold mb-4 text-gray-900">Contact</h3>
          <ul className="space-y-3 text-gray-600 text-sm">
            <li className="flex items-center gap-2">
              <Mail size={16} /> support@Dr Hub.com
            </li>
            <li className="flex items-center gap-2">
              <Phone size={16} /> +91 98765 43210
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={16} /> India
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-gray-200 text-center py-4 text-sm text-gray-500">
        © {new Date().getFullYear()} Dr Hub. All rights reserved.
      </div>
    </footer>
  );
}