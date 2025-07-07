// src/components/Navbar.js
import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const [currentUser, setCurrentUser] = useState(null);

  // Track authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, [auth]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <nav className="bg-blue-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold">🌐 Country Explorer</span>
          </div>
          
          {currentUser && (
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/' 
                    ? 'bg-blue-800' 
                    : 'hover:bg-blue-600'
                }`}
              >
                Home
              </Link>
              <Link
                to="/favorites"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  location.pathname === '/favorites' 
                    ? 'bg-blue-800' 
                    : 'hover:bg-blue-600'
                }`}
              >
                Favorites
              </Link>

              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-3 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;