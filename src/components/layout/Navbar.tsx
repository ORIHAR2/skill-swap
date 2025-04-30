import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Map as Swap, Search, MessageCircle, User, Menu, X } from 'lucide-react';

const Navbar: React.FC = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-white shadow-md py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
          <Swap className="h-8 w-8 text-primary-500" />
          <span className="text-2xl font-bold text-primary-500">SkillSwap</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-8">
          {currentUser ? (
            <>
              <Link to="/browse" className="text-neutral-600 hover:text-primary-500 flex items-center">
                <Search className="h-5 w-5 mr-1" />
                <span>Browse Skills</span>
              </Link>
              <Link to="/messages" className="text-neutral-600 hover:text-primary-500 flex items-center">
                <MessageCircle className="h-5 w-5 mr-1" />
                <span>Messages</span>
              </Link>
              <Link to="/swaps" className="text-neutral-600 hover:text-primary-500 flex items-center">
                <Swap className="h-5 w-5 mr-1" />
                <span>My Swaps</span>
              </Link>
              <div className="relative group">
                <div className="flex items-center cursor-pointer space-x-2 group-hover:text-primary-500">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="h-8 w-8 rounded-full object-cover"
                  />
                  <span>{currentUser.name}</span>
                </div>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 hidden group-hover:block">
                  <Link 
                    to="/profile" 
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                  >
                    Profile
                  </Link>
                  <Link 
                    to="/dashboard" 
                    className="block px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                  >
                    Dashboard
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-neutral-700 hover:bg-primary-50 hover:text-primary-500"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline">Login</Link>
              <Link to="/register" className="btn btn-primary">Sign Up</Link>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-neutral-700"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 shadow-inner animate-fade-in">
          <div className="flex flex-col space-y-4">
            {currentUser ? (
              <>
                <div className="flex items-center space-x-2 border-b border-neutral-200 pb-4">
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="h-10 w-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium">{currentUser.name}</p>
                    <p className="text-sm text-neutral-500">{currentUser.email}</p>
                  </div>
                </div>
                <Link 
                  to="/dashboard" 
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link 
                  to="/browse" 
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Search className="h-5 w-5" />
                  <span>Browse Skills</span>
                </Link>
                <Link 
                  to="/messages" 
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <MessageCircle className="h-5 w-5" />
                  <span>Messages</span>
                </Link>
                <Link 
                  to="/swaps" 
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <Swap className="h-5 w-5" />
                  <span>My Swaps</span>
                </Link>
                <Link 
                  to="/profile" 
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </Link>
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-neutral-700 hover:text-primary-500"
                >
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="btn btn-outline w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="btn btn-primary w-full"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;