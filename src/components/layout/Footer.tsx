import React from 'react';
import { Link } from 'react-router-dom';
import { Map as Swap, Mail, Phone, MapPin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-neutral-800 text-white pt-12 pb-8 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Swap className="h-8 w-8 text-primary-300" />
              <span className="text-2xl font-bold text-white">SkillSwap</span>
            </div>
            <p className="text-neutral-300 mb-4">
              Connect with others to exchange skills and knowledge. Teach what you know, learn what you don't.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-neutral-300 hover:text-white">Home</Link>
              </li>
              <li>
                <Link to="/browse" className="text-neutral-300 hover:text-white">Browse Skills</Link>
              </li>
              <li>
                <Link to="/about" className="text-neutral-300 hover:text-white">About Us</Link>
              </li>
              <li>
                <Link to="/faq" className="text-neutral-300 hover:text-white">FAQ</Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="text-neutral-300 hover:text-white">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-neutral-300 hover:text-white">Privacy Policy</Link>
              </li>
              <li>
                <Link to="/cookies" className="text-neutral-300 hover:text-white">Cookie Policy</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2">
                <Mail className="h-5 w-5 mt-0.5 text-neutral-300" />
                <span className="text-neutral-300">contact@skillswap.com</span>
              </li>
              <li className="flex items-start space-x-2">
                <Phone className="h-5 w-5 mt-0.5 text-neutral-300" />
                <span className="text-neutral-300">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="h-5 w-5 mt-0.5 text-neutral-300" />
                <span className="text-neutral-300">
                  123 Skill Street<br />
                  San Francisco, CA 94103
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-neutral-700 mt-8 pt-8 text-center">
          <p className="text-neutral-400">
            &copy; {new Date().getFullYear()} SkillSwap. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;