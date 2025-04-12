import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Navbar() {
  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-card/80 backdrop-blur-md shadow-sm fixed w-full z-50"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-text-primary">
              <span className="text-accent">X</span>penZify
            </Link>
          </div>
          <div className="flex items-center space-x-6">
            <Link to="/" className="text-text-secondary hover:text-accent transition-colors duration-300">
              Home
            </Link>
            <Link to="/about" className="text-text-secondary hover:text-accent transition-colors duration-300">
              About Us
            </Link>
            <Link 
              to="/login" 
              className="bg-accent text-white px-6 py-2 rounded-full hover:shadow-hover transition-all duration-300"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;