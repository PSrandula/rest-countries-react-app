import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CountryProvider } from './context/CountryContext';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import AuthForm from './components/AuthForm';
import CountryDetail from './pages/CountryDetail';

function App() {
  const [user, setUser] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });
    
    return unsubscribe;
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <CountryProvider>
      <Router>
        {user && <Navbar />}
        <div className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ${user ? 'py-6' : ''}`}>
          <Routes>
            <Route 
              path="/login" 
              element={user ? <Navigate to="/" /> : <AuthForm />} 
            />
            <Route 
              path="/" 
              element={user ? <Home /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/favorites" 
              element={user ? <Favorites /> : <Navigate to="/login" />} 
            />
            <Route 
              path="/country/:code" 
              element={user ? <CountryDetail /> : <Navigate to="/login" />} 
            />
          </Routes>
        </div>
      </Router>
    </CountryProvider>
  );
}

export default App;