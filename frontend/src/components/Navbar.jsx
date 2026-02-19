import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully. See you soon! 👋');
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Micro Marketplace
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="navbar-link">
            Products
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/favorites" className="navbar-link">
                ❤️ Favorites
              </Link>
              <span className="navbar-user">👤 {user?.name}</span>
              <button onClick={handleLogout} className="navbar-btn logout-btn">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="navbar-btn login-btn">
                Login
              </Link>
              <Link to="/register" className="navbar-btn register-btn">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
