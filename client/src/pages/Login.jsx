import { motion } from 'framer-motion';
import { FiMail, FiLock } from 'react-icons/fi';
import SignUp from './SignUp';

function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="absolute inset-0 bg-gradient-radial from-purple-50 via-background to-background"></div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card p-8 rounded-2xl shadow-lg w-full max-w-md mx-4 relative z-10"
      >
        <h2 className="text-3xl font-bold text-text-primary mb-8 text-center">Welcome Back</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-text-secondary mb-2 text-sm">
              Email Address
            </label>
            <div className="relative">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="email"
                id="email"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-text-secondary mb-2 text-sm">
              Password
            </label>
            <div className="relative">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" />
              <input
                type="password"
                id="password"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300"
                placeholder="Enter your password"
                required
              />
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-accent text-white py-4 rounded-xl hover:shadow-hover transition-all duration-300"
          >
            Sign In
          </motion.button>

          <div className="text-center text-sm text-text-secondary mt-4">
            Don’t have an account?{' '}
            <a href="/signup" className="text-accent font-medium hover:underline">
              <SignUp/>
            </a>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Login;