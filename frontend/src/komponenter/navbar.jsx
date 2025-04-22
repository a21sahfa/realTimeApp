import React from 'react';
import { useAuthStore } from '../store/useAuthStore';
import { Link } from 'react-router-dom';
import { LogOut, MessageSquare, Settings, User } from 'lucide-react';

const Navbar = () => {
  const { logout, authUser } = useAuthStore();

  return (
    <header className="bg-gradient-to-br from-slate-900 via-gray-900 to-gray-800 fixed w-full top-0 z-40 backdrop-blur-lg text-white">
      <div className="container mx-auto px-4 h-16">
        <div className="flex items-center justify-center h-full">
          
          {/* Centered: Logo */}
          <div className="flex items-center gap-2.5 hover:opacity-80 transition-all">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="size-9 rounded-lg bg-indigo-600/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-indigo-400" />
              </div>
              <h1 className="text-lg font-bold text-white">TTYL</h1>
            </Link>
          </div>

          {/* Right side: Navigation */}
          <div className="flex items-center gap-2 ml-8">
            
            {/* Settings always visible */}
            <Link
              to="/settings"
              className="btn btn-sm gap-2 transition-colors text-indigo-300 hover:bg-indigo-500/30"
            >
              <Settings className="w-4 h-4" />
              <span className="hidden sm:inline">Settings</span>
            </Link>

            {/* Only visible if logged in */}
            {authUser && (
              <>
                <Link to="/profile" className="btn btn-sm gap-2 text-indigo-300 hover:bg-indigo-500/30">
                  <User className="size-5" />
                  <span className="hidden sm:inline">Profile</span>
                </Link>

                <button
                  className="btn btn-sm gap-2 text-red-500 hover:bg-red-500/30"
                  onClick={logout}
                >
                  <LogOut className="size-5" />
                  <span className="hidden sm:inline">Logout</span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
